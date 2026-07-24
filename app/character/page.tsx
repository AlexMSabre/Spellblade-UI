"use client";
import Image from "next/image";
import {Tabs, TabsTrigger, TabsList, TabsContent} from "@/components/ui/tabs";
import background from "./background";
import talents from "./talents";
import attributes from "./attributes";
import spells from "./spells";
import equipment from "./equipment";
import story from "./story";
import sheet from "./sheet";
import { useState } from "react";
import { Character } from "@/types/characterTypes";


  //create an empty character, for now.   this will be the master data that everything will update or reference



export default function Home() {
    const [characterData, setCharacterData] = useState<Character>({
    id: null, 
    userId: "",
    name: "",
    talent1: " ",
    talent2: " ",
    attributeLevel: 0,
    attribute1: 0,
    attribute2: 0,
    ancestryName: "",
    ancestryTrait: "",
    baseFitness: 0,
    basePrecision: 0,
    baseFocus: 0,
    baseSense: 0,
    size: "Medium",
    proficiencies: "null,null,null"
    })
  return (
    
    <div className="flex flex-col flex-1 items-left justify-left bg-zinc-50 font-sans dark:bg-black">
      <main className="main">
        <div className="headerBar">
          <ul>
            <li><a href="/">Spellblade TTRPG</a></li>
            <li><a href="/mycharacters">My Characters</a></li>
            <li><a href="/mygames">My Games</a></li>
            <li><a href="/rules">Rules</a></li>
          </ul>
        </div>

        <Tabs defaultValue="background" orientation="vertical">
            <TabsList>
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="talents">Talents</TabsTrigger>
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
                <TabsTrigger value="spells">Spells</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="sheet">Character Sheet</TabsTrigger>
            </TabsList>
            <TabsContent value="background">{background(characterData,setCharacterData)}</TabsContent>
            <TabsContent value="talents">{talents(characterData,setCharacterData)}</TabsContent>
            <TabsContent value="attributes">{attributes(characterData,setCharacterData)}</TabsContent>
            <TabsContent value="spells">{spells()}</TabsContent>
            <TabsContent value="equipment">{equipment()}</TabsContent>
            <TabsContent value="story">{story()}</TabsContent>
            <TabsContent value="sheet">{sheet()}</TabsContent>
        </Tabs>


      </main>
    </div>
  );
}