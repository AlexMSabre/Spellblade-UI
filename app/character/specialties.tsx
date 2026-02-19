import { Card } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Character from "@/types/characterTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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

export default function Specialties(characterData: Character, setCharacterData: Function) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const flagCounter = (aspect: number) => {
    let total = 0;
    for (let i = 0; i < 4; i++)
      if ((1 << i) & aspect)
        total++;

    return total;
  }

  const [aspectDisable, setAspectDisable] = useState(0);
  const [aspectsChecked, setAspectsChecked] = useState(() => {
    let result = [];
    for (let i = 0; i < 4; i++) {
      result.push(!!(2 ** i & characterData.aspects1));
      result.push(!!(2 ** i & characterData.aspects2));
    }
    return result;
  })

  useEffect(() => {
    const count1 = flagCounter(characterData.aspects1);
    const count2 = flagCounter(characterData.aspects2);

    const aspectTotal = count1 + count2;
    const aspectDiff = count1 - count2;
    if (aspectTotal >= characterData.aspectLevel) {
      setAspectDisable(3);
    } else if (aspectDiff >= 2) {
      setAspectDisable(1);
    } else if (aspectDiff <= -2) {
      setAspectDisable(2);
    } else {
      setAspectDisable(0);
    }

    setAspectsChecked(() => {
      let result = [];
      for (let i = 0; i < 4; i++) {
        result.push(!!(2 ** i & characterData.aspects1));
        result.push(!!(2 ** i & characterData.aspects2));
      }
      return result;
    })
  }, [characterData]);

  const specialtyList = (<SelectContent>
    <SelectGroup>
      <SelectLabel>Specialties</SelectLabel>
      <SelectItem value="1">Witch</SelectItem>
      <SelectItem value="2">Wayfarer</SelectItem>
    </SelectGroup>
  </SelectContent>);

  const transferInputData = (e: any) => {
    let name = e.name;
    let value = e.value;

    if (name.includes)

      setCharacterData((prev: any) => ({
        ...prev,
        [name]: value,
      }))
  }

  const transferSpec1Data = (e: string) => {
    setCharacterData((prev: any) => ({
      ...prev,
      specialty1: parseInt(e),
      aspects1: 0
    }))
  }

  const transferSpec2Data = (e: string) => {
    setCharacterData((prev: any) => ({
      ...prev,
      specialty2: parseInt(e),
      aspects2: 0
    }))
  }


  return (
    <Controller
      name="title"
      control={form.control}
      render={({ field, fieldState }) => (
        <div>
          <h2>Specialities</h2>
          <p>Choose your Specialites.</p>
          <div className="flex flex-row gap-7">
            <Field>
              <FieldLabel>Specialty One</FieldLabel>
              <Select name="specialty1" onValueChange={transferSpec1Data} defaultValue={characterData?.specialty1?.toString()}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialtyList}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Specialty Two</FieldLabel>
              <Select name="specialty2" onValueChange={transferSpec2Data} defaultValue={characterData?.specialty2?.toString()}>
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
                  <Switch id="aspect 1" name="aspects1-1"
                    checked={aspectsChecked[0]}
                    disabled={[1, 3].includes(aspectDisable) && !(1 & characterData.aspects1)}
                    onCheckedChange={() => { transferInputData({ name: "aspects1", value: (1 ^ characterData.aspects1) }) }} /> <Label>Aspect 1</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 1" name="aspects2-1"
                    checked={aspectsChecked[1]}
                    disabled={[2, 3].includes(aspectDisable) && !(1 & characterData.aspects2)}
                    onCheckedChange={() => { transferInputData({ name: "aspects2", value: (1 ^ characterData.aspects2) }) }} />
                  <Label htmlFor={field.name}>Aspect 1</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
          </div>
          <div className="flex flex-row gap-4">
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 2" name="aspects1-2"
                    checked={aspectsChecked[2]}
                    disabled={[1, 3].includes(aspectDisable) && !(2 & characterData.aspects1)}
                    onCheckedChange={() => { transferInputData({ name: "aspects1", value: (2 ^ characterData.aspects1) }) }} />
                  <Label htmlFor={field.name}>Aspect 2</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 2" name="aspects2-2"
                    checked={aspectsChecked[3]}
                    disabled={[2, 3].includes(aspectDisable) && !(2 & characterData.aspects2)}
                    onCheckedChange={() => { transferInputData({ name: "aspects2", value: (2 ^ characterData.aspects2) }) }} />
                  <Label htmlFor={field.name}>Aspect 2</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
          </div>
          <div className="flex flex-row gap-4">
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 3" name="aspects1-3"
                    checked={aspectsChecked[4]}
                    disabled={[1, 3].includes(aspectDisable) && !(4 & characterData.aspects1)}
                    onCheckedChange={() => { transferInputData({ name: "aspects1", value: (4 ^ characterData.aspects1) }) }} />
                  <Label htmlFor={field.name}>Aspect 3</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 3" name="aspects2-3"
                    checked={aspectsChecked[5]}
                    disabled={[2, 3].includes(aspectDisable) && !(4 & characterData.aspects2)}
                    onCheckedChange={() => { transferInputData({ name: "aspects2", value: (4 ^ characterData.aspects2) }) }} />
                  <Label htmlFor={field.name}>Aspect 3</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
          </div>
          <div className="flex flex-row gap-4">
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 4" name="aspects1-4"
                    checked={aspectsChecked[6]}
                    disabled={[1, 3].includes(aspectDisable) && !(8 & characterData.aspects1)}
                    onCheckedChange={() => { transferInputData({ name: "aspects1", value: (8 ^ characterData.aspects1) }) }} />
                  <Label>Aspect 4</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
            <Card>
              <Field>
                <div className="flex flex-row gap-1">
                  <Switch id="aspect 4" name="aspects2-4"
                    checked={aspectsChecked[7]}
                    disabled={[2, 3].includes(aspectDisable) && !(8 & characterData.aspects2)}
                    onCheckedChange={() => { transferInputData({ name: "aspects2", value: (8 ^ characterData.aspects2) }) }} />
                  <Label>Aspect 4</Label>
                </div>
                <FieldDescription>This is a very long aspect description that we are enjoying the reading of, hippie yippeee hooray</FieldDescription>
              </Field>
            </Card>
          </div>
        </div>)}
    />
  );
}