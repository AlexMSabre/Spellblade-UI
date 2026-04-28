"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFullCharacterById } from "@/hooks/useFullCharacterById";
import { useProficiencyNames } from "@/hooks/useProficiencyNames";
import { Character, CharacterDAO, emptyCharacter } from "@/types/characterTypes";
import { InventoryDAO, proficiencyDAO } from "@/types/itemTypes";
import { Aspect } from "@/types/talentTypes";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

export default function characterSelect() {
    //gets the user data, bounces them if they aren't signed in
    // const { user } = useAuth();
    const loading = "Loading...."
    const [characterLoad, setCharacterLoad] = useState(false);
    const [characterData, setCharacterData] = useState<Character>(emptyCharacter);
    const [inventoryData, setInventoryData] = useState<InventoryDAO[]>([]);
    const [allData, setAllData] = useState({aspects: [{talentName: loading, name:loading, description: loading}], talents: [{name: loading, description: loading}, {name: loading, description: loading}]});

    const searchParams = useSearchParams();
    const searchId = searchParams.get('id')

    const appendProficiencies = (profs: proficiencyDAO[]) =>{
        let result = "";
        let first = true;
        profs.forEach((prof)=>{
            let mastery = prof.mastery ? " (Mastered)" : ""
            result += (first ? "" : ", ") + prof.item.name + mastery;
            first = false;
        })
        return result;
    }

    useEffect(() => {
        if(searchId){
            useFullCharacterById(searchId).then((result:any) => {
                let data = result.data.data.fullCharacterById
                let character = data.character;
                character.proficiencies = appendProficiencies(data.proficiencies);
                setCharacterData(character);
                setInventoryData(data.inventory);
                setAllData(data);
                console.log(data);
            });
            setCharacterLoad(true);
        }
    }, [searchId]);

    if (!characterLoad) { return (<p>Is loading</p>) };


    return (
        <div>
            <h1> Character Stats</h1>
            <div className="grid grid-cols-4 gap-7">
            {characterLoad && Object.keys(characterData).map((key: string)=>(
            
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
            {allData.talents[0] != null && (
                <div>
                <h1>{allData.talents[0].name}</h1>
                <p>{allData.talents[0].description}</p>
                <div className="grid grid-cols-4 gap-7">
                    {characterLoad && allData.aspects.filter((aspect)=>aspect.talentName == allData.talents[0].name)
                    .map((aspect)=>(
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
                    {characterLoad && allData.aspects.filter((aspect)=>aspect.talentName == allData.talents[1].name)
                    .map((aspect)=>(
                    <Card key={aspect.name}>
                        <CardHeader>{aspect.name}</CardHeader>
                        {aspect.description}
                    </Card>
                ))}
                </div>
            </div>
            )}
            <h1>Inventory</h1>
            <div className="grid grid-cols-4 gap-7">
            {characterLoad && inventoryData.map((item: InventoryDAO)=>(
                <Card key={item.item.name}>
                    {item.item.name}
                </Card>
            ))}
            </div>
        </div>
    )
}