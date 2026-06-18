"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAddEffect } from "@/hooks/useAddEffect";
import { useCharacterSave } from "@/hooks/useCharacterSave";
import { useFullCharacterById } from "@/hooks/useFullCharacterById";
import { CalculatedState, Character, CharacterState, emptyCalculatedState, emptyCharacter, emptyCharacterState } from "@/types/characterTypes";
import { InventoryDAO, proficiencyDAO } from "@/types/itemTypes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { check } from "zod";

export default function characterSelect() {
    //gets the user data, bounces them if they aren't signed in
    // const { user } = useAuth();
    const loading = "Loading...."
    const [characterLoad, setCharacterLoad] = useState(false);
    const [characterData, setCharacterData] = useState<Character>(emptyCharacter);
    const [inventoryData, setInventoryData] = useState<InventoryDAO[]>([]);
    const [characterState, setCharacterState] = useState<CharacterState>(emptyCharacterState);
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);
    const [allData, setAllData] = useState({ aspects: [{ talentName: loading, name: loading, description: loading }], talents: [{ name: loading, description: loading, hpBonus: 2 }, { name: loading, description: loading, hpBonus: 2 }] });

    const searchParams = useSearchParams();
    const searchId = searchParams.get('id')

    const appendProficiencies = (profs: proficiencyDAO[]) => {
        let result = "";
        let first = true;
        profs.forEach((prof) => {
            let mastery = prof.mastery ? " (Mastered)" : ""
            result += (first ? "" : ", ") + prof.item.name + mastery;
            first = false;
        })
        return result;
    }

    useEffect(() => {
        if (searchId) {
            useFullCharacterById(searchId).then((result: any) => {
                let data = result.data.data.fullCharacterById
                let character = data.character;
                setCharacterData(character);
                setInventoryData(data.inventory);
                setCalculatedState(data.calculatedState);
                setCharacterState(data.characterState);
                setAllData(data);
                console.log(data);
            });
            setCharacterLoad(true);
        }
    }, [searchId]);

    const handleEquipChange = (item: InventoryDAO, checked: boolean | string) => {
        let value = false;
        console.log(checked);
        switch(typeof checked){
            case "string": value = checked == "true";
            case "boolean": value = checked == true
        }
        setInventoryData((prev) => {
            prev.forEach((a) => {
                if (a.inventory.itemId === item.item.id)
                    a.inventory.equipped = value;
            })
            console.log(prev);
            return prev;
        });

        console.log("Equip triggered: " + item.item.effectName + "; " + value);
        if(item.item.effectName != ""){
            console.log("adding effect")
            useAddEffect(item.item.effectName, characterState).then((data)=>{
                console.log("effect added");
                setCalculatedState(data.data.data.addEffect.calculatedState);
                setCharacterState(data.data.data.addEffect.characterState);
            })
        }
    }

    useEffect(()=> {
        console.log("saving...");
        useCharacterSave(characterData, inventoryData, characterState).then(()=>{console.log("saved")});
    }, [characterState]);


    if (!characterLoad) { return (<p>Is loading</p>) };


    return (
        <div>
            <h1> Character Stats</h1>
            <div className="grid grid-cols-4 gap-7">
                {characterLoad && Object.keys(characterData).map((key: string) => (

                    <Field key={key}>
                        <FieldLabel>{key}</FieldLabel>
                        <Input
                            name={key}
                            key={key}
                            value={characterData[key] || ""}
                            readOnly={true}></Input>
                    </Field>
                ))}
            </div>
            <h1>State Stats</h1>
            <div className="grid grid-cols-4 gap-7">
                {characterLoad && Object.keys(calculatedState).map((key: string) => (
                    <Field key={key}>
                        <FieldLabel>{key}</FieldLabel>
                        <Input
                            name={key}
                            key={key}
                            value={calculatedState[key] || ""}
                            readOnly={true}></Input>
                    </Field>
                ))}
            </div>

            {allData.talents[0] != null && (
                <div>
                    <h1>{allData.talents[0].name}</h1>
                    <p>{allData.talents[0].description}</p>
                    <div className="grid grid-cols-4 gap-7">
                        {characterLoad && allData.aspects.filter((aspect) => aspect.talentName == allData.talents[0].name)
                            .map((aspect) => (
                                <Card key={aspect.name}>
                                    <CardHeader>{aspect.name}</CardHeader>
                                    {aspect.description}
                                </Card>
                            ))}
                    </div>
                </div>
            )}

            {allData.talents[1] != null && (
                <div>
                    <h1>{allData.talents[1].name}</h1>
                    <p>{allData.talents[1].description}</p>
                    <div className="grid grid-cols-4 gap-7">
                        {characterLoad && allData.aspects.filter((aspect) => aspect.talentName == allData.talents[1].name)
                            .map((aspect) => (
                                <Card key={aspect.name}>
                                    <CardHeader>{aspect.name}</CardHeader>
                                    {aspect.description}
                                </Card>
                            ))}
                    </div>
                </div>
            )}
            <h1>Inventory</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Equipped</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {characterLoad && inventoryData.map((item: InventoryDAO) => (
                        <TableRow key={item.item.name}>
                            <TableCell key={item.item.name}>
                                <Checkbox key={item.item.name + " equip"} 
                                defaultChecked={item.inventory.equipped} 
                                disabled = {!item.item.equippable}
                                onCheckedChange={(checked)=>{handleEquipChange(item, checked);}
                                }></Checkbox>
                            </TableCell>
                            <TableCell>
                                {item.item.name}
                            </TableCell>
                            <TableCell>
                                {item.inventory.quantity}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}