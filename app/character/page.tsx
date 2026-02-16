"use client"
import { Card } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, PlusIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import useCharacterSave from "@/hooks/useCharacterSave";

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

  const [characterData, setCharacterData] = useState({
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
    gold: 0,
    silver: 0,
    copper: 0
  })

  const [ancestorOther, setAncestorOther] = useState(false);
  const [fitness, setFitness] = useState(0);
  const [technique, setTechnique] = useState(0);
  const [focus, setFocus] = useState(0);
  const [sense, setSense] = useState(0);

  useEffect(()=>{
    
  }, [characterData]);


  const specialtyList = (<SelectContent>
    <SelectGroup>
      <SelectLabel>Specialties</SelectLabel>
      <SelectItem value="1">Witch</SelectItem>
      <SelectItem value="2">Wayfarer</SelectItem>
    </SelectGroup>
  </SelectContent>);

  const handleAncestryChange = (value: string) =>{
    if(value === "other"){
      setAncestorOther(true);
    } else {
      setAncestorOther(false);
    }
  }

  const transferFormData = (e: any) =>{
   setCharacterData({
    name: e.get('name'),
    specialty1: e.get('specialty1'),
    specialty2: e.get('specialty2'),
    aspectLevel: 0,
    aspects1: 0,
    aspects2: 0,
    ancestryName: e.get('ancestryName'),
    ancestryTrait: e.get('ancestryTrait'),
    baseFitness: e.get('fitness'),
    baseTechnique: e.get('technique'),
    baseFocus: e.get('focus'),
    baseSense: e.get('sense'),
    gold: 0,
    silver: 0,
    copper: 0
   })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to the Spell Blade character creator!
          </h1>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="Character Creator">
                <form action={transferFormData}>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Character Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      name="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="E.G. Timmy Dragon-Slayer"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                  <p><br /></p>
                  <h2>Specialities</h2>
                  <p>Choose your Specialites.</p>
                  <div className="flex flex-row gap-7">
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Specialty One</FieldLabel> 
                      <Select name="specialty1">
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue placeholder="Select a Specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialtyList}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                    <Field>
                      <FieldLabel htmlFor={field.name}>Specialty Two</FieldLabel>
                      <Select name="specialty2">
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue placeholder="Select a Specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialtyList}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <h3>Aspects</h3>
                  <p> please choose your aspects.  we will make this menu dynamic and collapsible later</p>
                  <div className="flex flex-row gap-4">
                    <Card>
                      <Field>
                        <div className="flex flex-row gap-1">
                          <Switch id="aspect 1" name="aspect1-1"/> <Label htmlFor={field.name}>Aspect 1</Label>
                        </div>
                        <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
                      </Field>
                    </Card>
                    <Card>
                      <Field>
                        <div className="flex flex-row gap-1">
                          <Switch id="aspect 1" name="aspect2-1"/> <Label htmlFor={field.name}>Aspect 1</Label>
                        </div>
                        <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
                      </Field>
                    </Card>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Card>
                      <Field>
                        <div className="flex flex-row gap-1">
                          <Switch id="aspect 2" name="aspect1-2"/> <Label htmlFor={field.name}>Aspect 2</Label>
                        </div>
                        <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
                      </Field>
                    </Card>
                    <Card>
                      <Field>
                        <div className="flex flex-row gap-1">
                          <Switch id="aspect 2" name="aspect2-2"/> <Label htmlFor={field.name}>Aspect 2</Label>
                        </div>
                        <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
                      </Field>
                    </Card>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Card>
                      <Field>
                        <div className="flex flex-row gap-1">
                          <Switch id="aspect 3" name="aspect1-3"/> <Label htmlFor={field.name}>Aspect 3</Label>
                        </div>
                        <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
                      </Field>
                    </Card>
                    <Card>
                      <Field>
                        <div className="flex flex-row gap-1">
                          <Switch id="aspect 3" name="aspect2-3"/> <Label htmlFor={field.name}>Aspect 3</Label>
                        </div>
                        <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
                      </Field>
                    </Card>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Card>
                      <Field>
                        <div className="flex flex-row gap-1">
                          <Switch id="aspect 4" name="aspect1-4"/> <Label htmlFor={field.name}>Aspect 4</Label>
                        </div>
                        <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
                      </Field>
                    </Card>
                    <Card>
                      <Field>
                        <div className="flex flex-row gap-1">
                          <Switch id="aspect 4" name="aspect2-4"/> <Label htmlFor={field.name}>Aspect 4</Label>
                        </div>
                        <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
                      </Field>
                    </Card>
                  </div>
                <Separator/>
                <h2>ancestry</h2>
                <Select onValueChange={handleAncestryChange} name="ancestrySelect">
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select an ancestry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elf">Elf</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {ancestorOther && (
                  <div>
                    <div className="flex flex-row gap-1">
                      <Field>
                        <FieldLabel>Other Ancestor Name</FieldLabel>
                        <Input placeholder="E.g. Orc, Goblin, Troll" name="ancestryName"/>
                      </Field>
                      <Field>
                        <FieldLabel>Ancestry Creature Trait</FieldLabel>
                        <Select name="creatureTrait">
                          <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="Select a creature trait" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="large">large</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                  </div>
                )}
                <p>description of the ancestry or creature trait that will dynamically populate</p>

                <h2>Skills</h2>
                <div className="flex flex-row gap-1">
                  <Field>
                    <FieldLabel>Fitness</FieldLabel>
                    <ButtonGroup>
                    <Button size="icon" variant="outline" type="button" aria-label="fit-up" onClick={()=>{setFitness(fitness+1)}}><Plus/></Button>
                    <Input defaultValue={fitness}></Input>
                    <Button size="icon" variant="outline" type="button" aria-label="fit-down" onClick={()=>{setFitness(fitness-1)}}><Minus/></Button>
                    </ButtonGroup>
                  </Field>
                  <Field>
                    <FieldLabel>Technique</FieldLabel>
                    <ButtonGroup>
                    <Button size="icon" variant="outline" type="button" aria-label="tech-up" onClick={()=>{setTechnique(technique+1)}}><Plus/></Button>
                    <Input defaultValue={technique}></Input>
                    <Button size="icon" variant="outline" type="button" aria-label="tech-down" onClick={()=>{setTechnique(technique-1)}}><Minus/></Button>
                    </ButtonGroup>
                  </Field>       
                  <Field>
                    <FieldLabel>Focus</FieldLabel>
                    <ButtonGroup>
                    <Button size="icon" variant="outline" type="button" aria-label="foc-up" onClick={()=>{setFocus(focus+1)}}><Plus/></Button>
                    <Input defaultValue={focus}></Input>
                    <Button size="icon" variant="outline" type="button" aria-label="foc-down" onClick={()=>{setFocus(sense-1)}}><Minus/></Button>
                    </ButtonGroup>
                  </Field>       
                  <Field>
                    <FieldLabel>Sense</FieldLabel>
                    <div className="flex flex-row gap-1">
                      <ButtonGroup orientation="vertical">
                    <ButtonGroup>
                      <Button size="icon" variant="outline" type="button" aria-label="sen-up" onClick={()=>{setSense(sense+1)}}><Plus/></Button>
                    <Input defaultValue={sense}></Input>
                      <Button size="icon" variant="outline" type="button" aria-label="sen-down" onClick={()=>{setSense(sense-1)}}><Minus/></Button>
                    </ButtonGroup>
                    </ButtonGroup>
                    </div>
                  </Field>
                </div>
                  <div className="flex flex-row gap-16">
                    <Input readOnly/>
                    <Input readOnly/>
                    <Input readOnly/>
                    <Input readOnly/>
                  </div>
                  <div className="flex flex-row gap-16">
                    <Input readOnly name="fitness"/>
                    <Input readOnly name="technique"/>
                    <Input readOnly name="focus"/>
                    <Input readOnly name="sense"/>
                  </div>
                  <Button size="default" variant="outline">Submit</Button>
                </form>
              </div>
            )}
          />
        </div>
      </main>
    </div>
  );
}

