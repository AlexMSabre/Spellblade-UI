"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import  Character  from "@/types/characterTypes";
import { useCharacterSave } from "@/hooks/useCharacterSave";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Specialties from "./specialties";
import {useForm } from "react-hook-form";
import Skills from "./skills";
import Start from "./start";

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

export default function characterForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const [characterData, setCharacterData] = useState<Character>({
    id: null,
    name: "",
    accountId: "6995e6db04874e9b6ba233a4",
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
    gold: 0,
    silver: 0,
    copper: 0
  })

  const apiTrigger = async ()=>{
    await useCharacterSave(characterData).then(data=>{
    console.log(data);
    setCharacterData((prev)=>({
        ...prev,
        id: data?.createCharacter?.id
    }))
  })
  };

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to the Spell Blade character creator!
          </h1>
          <Tabs defaultValue="start" orientation="vertical">
            <TabsList>
              <TabsTrigger value="start">Start</TabsTrigger>
              <TabsTrigger value="specialties">Specialties</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="background">Background</TabsTrigger>
            </TabsList>
            <TabsContent value="specialties">{Specialties(characterData, setCharacterData)}</TabsContent>
            <TabsContent value="start">{Start(characterData, setCharacterData)}</TabsContent>
            <TabsContent value="skills">{Skills(characterData, setCharacterData)}</TabsContent>
            <TabsContent value="equipment">Equipment</TabsContent>
            <TabsContent value="background">Background</TabsContent>
          </Tabs>
        </div>
        <Button onClick={apiTrigger}>submit</Button>
      </main>
    </div>
  );
}

