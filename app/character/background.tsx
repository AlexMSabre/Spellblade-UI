import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Character } from "@/types/characterTypes";

const ancestries = ["Honi","Hyvani","Machina","Meliades","Merrow","Nagani","Phalaena","Ullik","Human","Orc","Elf","Dwarf","Halfling","Pixie"];
const backgrounds = ["Velari Truth-Seeker", "Mahoken Institute Affiliate", "Jennite Follower", "Bolnean Citizen","Nagen-Tei", "Saile Trader","Fionn Shaman","Wanderer"];

export default function background(character:Character,setCharacterData:Function) {

    const [ancestrySelection, setAncestrySelection] = useState(false);
    const [backgroundSelection, setBackgroundSelection] = useState(false);


    const ancestryReturn = ()=> {
        setAncestrySelection(false);
    }
    const backgroundReturn = ()=> {
        setBackgroundSelection(false);
    }
    const ancestryChoice = (ancestry:string) => {
        setAncestrySelection(true);
        setCharacterData((prev: any) => ({
        ...prev,
        ancestryName: ancestry
        }))
    }
    const backgroundChoice = (background:string) => {
        setBackgroundSelection(true);
        setCharacterData((prev: any) => ({
        ...prev,
        backgroundName: background
        }))
    }

    function buildAncestryList(ancestries:string[]) {
    return <div>{ancestries.map((ancestry: string) => (
        <div className="ancestryCell" key={ancestry} onClick={()=>{ancestryChoice(ancestry)}}>
            {ancestry}
        </div>
    ))}</div>
    }

    function buildBackgroundList(backgrounds:string[]) {
    return <div>{backgrounds.map((background: string) => (
        <div className="ancestryCell" key={background} onClick={()=>{backgroundChoice(background)}}>
            {background}
        </div>
    ))}</div>
    }

    return (
    <div className="background">
        <div className="name">
            Character Name
            <Field>
                <Input name="name"
                />
            </Field>
        </div>
        
        <div className="ancestry">
            {ancestrySelection ? (
            <div>
                <div onClick={()=>{ ancestryReturn()}}>Back</div>
                Ancestry: {character.ancestryName}
                <Field>
                    <FieldLabel>Variant</FieldLabel>
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="Select Variant"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Choose Variant</SelectLabel>
                                <SelectItem value="1">0</SelectItem>
                                <SelectItem value="2">1</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                Traits:
                Charasmatic
                Magical
                <div className="description">
                    Lorem Ipsum
                </div>
            </div>
        ): (<div>
                Choose Ancestry
                <ScrollArea className={"h-[85vh]"}> 
                    {buildAncestryList(ancestries)}
                </ScrollArea>
            </div>)}
        </div>
        
        <div className="faction">
            {backgroundSelection ? (
            <div>
                <div onClick={()=>{ backgroundReturn()}}>Back</div>
                Background: {character.backgroundName}
                <Field>
                    <FieldLabel>Variant</FieldLabel>
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="Select Variant"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Choose Variant</SelectLabel>
                                <SelectItem value="1">0</SelectItem>
                                <SelectItem value="2">1</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                Traits:
                Charasmatic
                Magical
                <div className="description">
                    Lorem Ipsum
                </div>
            </div>
        ): (<div>
                Choose Background
                <ScrollArea className={"h-[85vh]"}> 
                    {buildBackgroundList(backgrounds)}
                </ScrollArea>
            </div>)}
    </div>
    </div>
)
}