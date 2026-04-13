"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import  {Character}  from "@/types/characterTypes";
import { useCharacterSave } from "@/hooks/useCharacterSave";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Specialties from "./specialties";
import {useForm } from "react-hook-form";
import Skills from "./skills";
import Start from "./start";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import Equipment from "./equipment";
import { Inventory, InventoryDAO, Item } from "@/types/itemTypes";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

//this page is the basic tab container system for the character creation menu.  
// all the character creation details are on the otherfiles in this folder
export default function characterForm() {

  //currently unused, but can be used to enforce restrictions on forms
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  //get the logged in user, if available
  const {user} = useAuth();

  const [inventoryData, setInventoryData] = useState<InventoryDAO[]>([]);

  //create an empty character, for now.   this will be the master data that everything will update or reference
  const [characterData, setCharacterData] = useState<Character>({
    id: null,
    //gets the user id if there is one, blank other wise. 
    userId: user?.id || "",
    name: "",
    specialty1: 0,
    specialty2: 0,
    aspectLevel: 0,
    aspects1: 0,
    aspects2: 0,
    ancestryName: "",
    ancestryTrait: 0,
    baseFitness: 0,
    baseTechnique: 0,
    baseFocus: 0,
    baseSense: 0,
    proficiencies: "null,null,null",
    gold: 0,
    silver: 0,
    copper: 0
  })

  //triggers when someone presses the submit button. just a simple API call to save the character and get the new character ID.
  const apiTrigger = ()=>{
    useCharacterSave(characterData, inventoryData).then((data)=>{
    let updates = data.data.data.saveCharacter;
    setCharacterData((prev)=>({
        ...prev,
        id: updates?.character.id
    }));
    setInventoryData(updates?.inventory);
  })
  };

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to the Spell Blade character creator!
          </h1>
          {/*sets up the tabs menu.  the tabs are just simple calls to other files that render on click */}
          <Tabs defaultValue="start" orientation="vertical">
            <TabsList>
              <TabsTrigger value="start">Start</TabsTrigger>
              <TabsTrigger value="specialties">Specialties</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="background">Background</TabsTrigger>
            </TabsList>
            {/*all the functions take the character data and its set function so they can update it */}
            <TabsContent value="specialties">{Specialties(characterData, setCharacterData)}</TabsContent>
            <TabsContent value="start">{Start(characterData, setCharacterData)}</TabsContent>
            <TabsContent value="skills">{Skills(characterData, setCharacterData)}</TabsContent>
            <TabsContent value="equipment">{Equipment(characterData, setCharacterData, inventoryData, setInventoryData)}</TabsContent>
            <TabsContent value="background">Background</TabsContent>
          </Tabs>
        </div>
        <Button onClick={apiTrigger}>submit</Button>
      </main>
    </div>
  );
}

