import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

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

export default function Skills() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const [ancestorOther, setAncestorOther] = useState(false);
    const [fitness, setFitness] = useState(0);
    const [technique, setTechnique] = useState(0);
    const [focus, setFocus] = useState(0);
    const [sense, setSense] = useState(0);
    

  const handleAncestryChange = (value: string) =>{
    if(value === "other"){
      setAncestorOther(true);
    } else {
      setAncestorOther(false);
    }
  }

  return (
    <Controller
      name="title"
      control={form.control}
      render={({ field, fieldState }) => (
        <div>
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
                  <Input placeholder="E.g. Orc, Goblin, Troll" name="ancestryName" />
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
                <Button size="icon" variant="outline" type="button" aria-label="fit-up" onClick={() => { setFitness(fitness + 1) }}><Plus /></Button>
                <Input defaultValue={fitness}></Input>
                <Button size="icon" variant="outline" type="button" aria-label="fit-down" onClick={() => { setFitness(fitness - 1) }}><Minus /></Button>
              </ButtonGroup>
            </Field>
            <Field>
              <FieldLabel>Technique</FieldLabel>
              <ButtonGroup>
                <Button size="icon" variant="outline" type="button" aria-label="tech-up" onClick={() => { setTechnique(technique + 1) }}><Plus /></Button>
                <Input defaultValue={technique}></Input>
                <Button size="icon" variant="outline" type="button" aria-label="tech-down" onClick={() => { setTechnique(technique - 1) }}><Minus /></Button>
              </ButtonGroup>
            </Field>
            <Field>
              <FieldLabel>Focus</FieldLabel>
              <ButtonGroup>
                <Button size="icon" variant="outline" type="button" aria-label="foc-up" onClick={() => { setFocus(focus + 1) }}><Plus /></Button>
                <Input defaultValue={focus}></Input>
                <Button size="icon" variant="outline" type="button" aria-label="foc-down" onClick={() => { setFocus(sense - 1) }}><Minus /></Button>
              </ButtonGroup>
            </Field>
            <Field>
              <FieldLabel>Sense</FieldLabel>
              <div className="flex flex-row gap-1">
                <ButtonGroup orientation="vertical">
                  <ButtonGroup>
                    <Button size="icon" variant="outline" type="button" aria-label="sen-up" onClick={() => { setSense(sense + 1) }}><Plus /></Button>
                    <Input defaultValue={sense}></Input>
                    <Button size="icon" variant="outline" type="button" aria-label="sen-down" onClick={() => { setSense(sense - 1) }}><Minus /></Button>
                  </ButtonGroup>
                </ButtonGroup>
              </div>
            </Field>
          </div>
          <div className="flex flex-row gap-16">
            <Input defaultValue="0" readOnly />
            <Input defaultValue="0" readOnly />
            <Input defaultValue="0" readOnly />
            <Input defaultValue="0" readOnly />
          </div>
          <div className="flex flex-row gap-16">
            <Input readOnly defaultValue="0" name="fitness" />
            <Input readOnly defaultValue="0" name="technique" />
            <Input readOnly defaultValue="0" name="focus" />
            <Input readOnly defaultValue="0" name="sense" />
          </div>
        </div>
      )}
    />
  );
}