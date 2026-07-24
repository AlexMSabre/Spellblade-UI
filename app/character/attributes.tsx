import { Character } from "@/types/characterTypes"
import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { Plus, Minus } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const attributeList1 = [];
const attributeList2 = [];

export default function attributes(character:Character,setCharacterData:Function) {
    const [attrib1Counter, setattrib1Counter] = useState(0);
    const [attrib2Counter, setattrib2Counter] = useState(0);

    function addAttribute(talent:boolean, flag:number) {
        if (!talent){
            setCharacterData((prev: any) => ({
            ...prev,
            attribute1: character.attribute1 | flag
            }))
            setattrib1Counter(attrib1Counter+1);
        }
        else {
            setCharacterData((prev: any) => ({
            ...prev,
            attribute2: character.attribute2  | flag
            }))
            setattrib2Counter(attrib2Counter+1);
        }
    }

    function removeAttribute(talent:boolean, flag:number) {
        if (!talent){
            setCharacterData((prev: any) => ({
            ...prev,
            attribute1: character.attribute1 & ~flag
            }))
            setattrib1Counter(attrib1Counter-1);
        }
        else {
            setCharacterData((prev: any) => ({
            ...prev,
            attribute2: character.attribute2 & ~flag
            }))
            setattrib2Counter(attrib2Counter-1);
        }
    }
    
    var points = (6 - character.baseFitness - character.baseFocus - character.basePrecision - character.baseSense - (-character.attributeLevel));

    const setCharacterLevel = (e:any) => {
        if (e < attrib1Counter + attrib2Counter) {
            setattrib1Counter(0);
            setattrib2Counter(0);
            setCharacterData((prev: any) => ({
            ...prev,
            attribute1: 0,
            attribute2: 0
        }))
        }
        setCharacterData((prev: any) => ({
        ...prev,
        attributeLevel: e
        }))
    }


    const increaseSkill = (e:any) => {
        let name = character[e];
        if (typeof name == "number") {
            setCharacterData((prev: any) => ({
            ...prev,
            [e]: name + 1
        }))}
    }

    const decreaseSkill = (e:any) => {
        let name = character[e];
        if (typeof name == "number") {
            setCharacterData((prev: any) => ({
            ...prev,
            [e]: name - 1
        }))}
    }

    return (
        <div className="attributes">
            <div className="talent1name">
                { character.talent1 }
            </div>
            <div className="level">
                Level
                <Select value={character?.attributeLevel?.toString()} onValueChange={setCharacterLevel}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Level"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">0</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="talent2name">
                { character.talent2 }
            </div>
            <div className="talent1attributes">
                <div>
                    {((character.attribute1 & 1) == 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib1Counter - attrib2Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(false,1)}}>
                            Attribute 1
                        </div>): (
                        <div className="attributeDisallowed">
                            Attribute 1
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(false,1)}}>
                        Attribute 1 (but evil)
                    </div>)}
                </div>
                <div>
                    {((character.attribute1 & 2) == 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib1Counter - attrib2Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(false,2)}}>
                            Attribute 2
                        </div>): (
                        <div className="attributeDisallowed">
                            Attribute 2
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(false,2)}}>
                        Attribute 2 (but evil)
                    </div>)}
                </div>
                <div>
                    {((character.attribute1 & 4) == 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib1Counter - attrib2Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(false,4)}}>
                            Attribute 3
                        </div>): (
                        <div className="attributeDisallowed">
                            Attribute 3
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(false,4)}}>
                        Attribute 3 (but evil)
                    </div>)}
                </div>
                <div>
                    {((character.attribute1 & 8) == 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib1Counter - attrib2Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(false,8)}}>
                            Attribute 4
                        </div>): (
                        <div className="attributeDisallowed">
                            Attribute 4
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(false,8)}}>
                        Attribute 4 (but evil)
                    </div>)}
                </div>
            </div>
            <div className="talent1stones">
                stones1
                {attrib1Counter}
            </div>
            <div className="talent2attributes">
                <div>
                    {((character.attribute2 & 1) == 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib2Counter - attrib1Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(true,1)}}>
                            Attribute 1
                        </div>): (
                        <div className="attributeDisallowed">
                            Attribute 1
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(true,1)}}>
                        Attribute 1 (but evil)
                    </div>)}
                </div>
                <div>
                    {((character.attribute2 & 2) == 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib2Counter - attrib1Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(true,2)}}>
                            Attribute 2
                        </div>): (
                        <div className="attributeDisallowed">
                            Attribute 2
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(true,2)}}>
                        Attribute 2 (but evil)
                    </div>)}
                </div>
                <div>
                    {((character.attribute2 & 4) == 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib2Counter - attrib1Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(true,4)}}>
                            Attribute 3
                        </div>): (
                        <div className="attributeDisallowed">
                            Attribute 3
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(true,4)}}>
                        Attribute 3 (but evil)
                    </div>)}
                </div>
                <div>
                    {((character.attribute2 & 8) == 0) ? ((((attrib1Counter + attrib2Counter < character.attributeLevel) && (attrib2Counter - attrib1Counter < 2)) ? (
                        <div className="attributeNotSelected" onClick={()=>{addAttribute(true,8)}}>
                            Attribute 4
                        </div>): (
                        <div className="attributeDisallowed">
                            Attribute 4
                        </div>
                        ))
                    ):(<div className="attributeSelected" onClick={()=>{removeAttribute(true,8)}}>
                        Attribute 4 (but evil)
                    </div>)}
                </div>
            </div>
            <div className="talent2stones">
                stones2
                Points Remaining:
                {points}
            </div>
            <div className="fitness">
                <Field>
                    <FieldLabel>Fitness</FieldLabel>
                    <ButtonGroup>
                        <Button size="icon" variant="outline" onClick={()=>{decreaseSkill("baseFitness")}} disabled={character.baseFitness == 0}><Minus /></Button>
                        <div className="w-[100px] border-1 border-white">{character?.baseFitness}</div>
                        <Button size="icon" variant="outline" onClick={()=>{increaseSkill("baseFitness")}} disabled={(character.baseFitness == 6) || (points <= 0)}><Plus /></Button>
                    </ButtonGroup>
                </Field>
            </div>
            <div className="focus">
                <Field>
                    <FieldLabel>Focus</FieldLabel>
                    <ButtonGroup>
                        <Button size="icon" variant="outline" onClick={()=>{decreaseSkill("baseFocus")}} disabled={character.baseFocus == 0}><Minus /></Button>
                        <div className="w-[100px] border-1 border-white">{character?.baseFocus}</div>
                        <Button size="icon" variant="outline" onClick={()=>{increaseSkill("baseFocus")}} disabled={(character.baseFocus == 6) || (points <= 0)}><Plus /></Button>
                    </ButtonGroup>
                </Field>
            </div>
            <div className="precision">
                <Field>
                    <FieldLabel>Precision</FieldLabel>
                    <ButtonGroup>
                        <Button size="icon" variant="outline" onClick={()=>{decreaseSkill("basePrecision")}} disabled={character.basePrecision == 0}><Minus /></Button>
                        <div className="w-[100px] border-1 border-white">{character?.basePrecision}</div>
                        <Button size="icon" variant="outline" onClick={()=>{increaseSkill("basePrecision")}} disabled={(character.basePrecision == 6) || (points <= 0)}><Plus /></Button>
                    </ButtonGroup>
                </Field>
            </div>
            <div className="sense">
                <Field>
                    <FieldLabel>Sense</FieldLabel>
                    <ButtonGroup>
                        <Button size="icon" variant="outline" onClick={()=>{decreaseSkill("baseSense")}} disabled={character.baseSense == 0}><Minus /></Button>
                        <div className="w-[100px] border-1 border-white">{character?.baseSense}</div>
                        <Button size="icon" variant="outline" onClick={()=>{increaseSkill("baseSense")}} disabled={(character.baseSense == 6) || (points <= 0)}><Plus /></Button>
                    </ButtonGroup>
                </Field>
            </div>
            <div className="skills1">
                skills1
            </div>
            <div className="skills2">
                skills2
            </div>
            <div className="skills3">
                skills3
            </div>
            <div className="skills4">
                skills4
            </div>
        </div>
)
}