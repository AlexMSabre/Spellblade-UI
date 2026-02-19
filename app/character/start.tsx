import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Character from "@/types/characterTypes";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function Start(characterData: Character, setCharacterData: Function) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const transferInputData = (e: any) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;

    setCharacterData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const transferSelectData = (e: any) => {
    let newLevel = parseInt(e)> characterData.aspectLevel;
    setCharacterData((prev: any) => ({
      ...prev,
      aspectLevel: parseInt(e),
      aspects1: newLevel ? prev.aspects1 : 0,
      aspects2: newLevel ? prev.aspects2 : 0,
    }));
  }

  return (
    <div className="flex flex-row gap-5">
      <div className="flew-grow">
        <Field>
          <FieldLabel>Character Name</FieldLabel>
          <Input
            name="name"
            placeholder="E.G. Timmy Dragon-Slayer"
            autoComplete="off"
            value={characterData?.name?.toString()}
            onChange={transferInputData}
          />
        </Field>
      </div>
      <div className="flex-shrink">
        <Field>
          <FieldLabel>Aspect Level</FieldLabel>
          <Select name="aspectLevel" value={characterData?.aspectLevel?.toString()} 
              onValueChange={transferSelectData}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select aspect level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Aspect Level</SelectLabel>
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
        </Field>
      </div>
    </div>
  );
}