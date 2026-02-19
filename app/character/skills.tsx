import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Character from "@/types/characterTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Minus } from "lucide-react";
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

export default function Skills(characterData: Character, setCharacterData: Function) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const [ancestorOther, setAncestorOther] = useState(false);
  //the order is always fitness, technique, focus, sense
  const [ancestorBonus, setAncestorBonus] = useState<number[]>([0, 0, 0, 0]);
  const [specBonuses, setSpecBonuses] = useState<number[]>([0, 0, 0, 0]);
  const [totalBonuses, setTotalBonuses] = useState<number[]>([
    ancestorBonus[0] + specBonuses[0],
    ancestorBonus[1] + specBonuses[1],
    ancestorBonus[2] + specBonuses[2],
    ancestorBonus[3] + specBonuses[3]
  ]);
  const [skillPointAllocation, setSkillPointAllocation] = useState<number[]>([
    Math.max(characterData.baseFitness - totalBonuses[0], 0),
    Math.max(characterData.baseTechnique - totalBonuses[1], 0),
    Math.max(characterData.baseFocus - totalBonuses[2], 0),
    Math.max(characterData.baseSense - totalBonuses[3], 0)
  ]);

  const handleAncestryChange = (value: string) => {
    if (value === "other") {
      setAncestorOther(true);
    } else {
      setAncestorOther(false);
    }
  }

  const handleSkillChanges = (e: any) => {
    let name = e.currentTarget.name.split("-");
    let oldValue = characterData["base" + name[0]];
    let direction = name[1].includes("up");
    let validChange = false;
    if (typeof oldValue == "number") {
      let newValue = direction ? oldValue + 1 : oldValue - 1;
      switch (name[0]) {
        case "Fitness":
          validChange = (direction && newValue - totalBonuses[0] <= 6) || (!direction && newValue >= totalBonuses[0]);
          break;
        case "Technique":
          validChange = (direction && newValue - totalBonuses[1] <= 6) || (!direction && newValue >= totalBonuses[1]);
          break;
        case "Focus":
          validChange = (direction && newValue - totalBonuses[2] <= 6) || (!direction && newValue >= totalBonuses[2]);
          break;
        case "Sense":
          validChange = (direction && newValue - totalBonuses[3] <= 6) || (!direction && newValue >= totalBonuses[3]);
          break;
      }
      if (validChange) {
        setCharacterData((prev: any) => ({
          ...prev,
          ["base" + name[0]]: newValue
        }));
      }
    }
  }

  useEffect(() => {
    setSkillPointAllocation([
      Math.max(characterData.baseFitness - totalBonuses[0], 0),
      Math.max(characterData.baseTechnique - totalBonuses[1], 0),
      Math.max(characterData.baseFocus - totalBonuses[2], 0),
      Math.max(characterData.baseSense - totalBonuses[3], 0)
    ]);
  }, [characterData])

  return (
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
            <Button size="icon" variant="outline" type="button" aria-label="Fitness-up" name="Fitness-up" onClick={handleSkillChanges}><Plus /></Button>
            <Input value={characterData?.baseFitness} readOnly></Input>
            <Button size="icon" variant="outline" type="button" name="Fitness-down" onClick={handleSkillChanges}><Minus /></Button>
          </ButtonGroup>
        </Field>
        <Field>
          <FieldLabel>Technique</FieldLabel>
          <ButtonGroup>
            <Button size="icon" variant="outline" type="button" name="Technique-up" onClick={handleSkillChanges}><Plus /></Button>
            <Input value={characterData?.baseTechnique} readOnly></Input>
            <Button size="icon" variant="outline" type="button" name="Technique-down" onClick={handleSkillChanges}><Minus /></Button>
          </ButtonGroup>
        </Field>
        <Field>
          <FieldLabel>Focus</FieldLabel>
          <ButtonGroup>
            <Button size="icon" variant="outline" type="button" name="Focus-up" onClick={handleSkillChanges}><Plus /></Button>
            <Input value={characterData?.baseFocus} readOnly></Input>
            <Button size="icon" variant="outline" type="button" name="Focus-down" onClick={handleSkillChanges}><Minus /></Button>
          </ButtonGroup>
        </Field>
        <Field>
          <FieldLabel>Sense</FieldLabel>
          <div className="flex flex-row gap-1">
            <ButtonGroup orientation="vertical">
              <ButtonGroup>
                <Button size="icon" variant="outline" type="button" name="Sense-up" onClick={handleSkillChanges}><Plus /></Button>
                <Input value={characterData?.baseSense} readOnly></Input>
                <Button size="icon" variant="outline" type="button" name="Sense-down" onClick={handleSkillChanges}><Minus /></Button>
              </ButtonGroup>
            </ButtonGroup>
          </div>
        </Field>
      </div>
      <div className="flex flex-row gap-16">
        <Input value={"+" + skillPointAllocation[0]} aria-label="fit-points" readOnly />
        <Input value={"+" + skillPointAllocation[1]} aria-label="fit-points" readOnly />
        <Input value={"+" + skillPointAllocation[2]} aria-label="fit-points" readOnly />
        <Input value={"+" + skillPointAllocation[3]} aria-label="fit-points" readOnly />
      </div>
      <div className="flex flex-row gap-16">
        <Input readOnly defaultValue="0" name="fitness" />
        <Input readOnly defaultValue="0" name="technique" />
        <Input readOnly defaultValue="0" name="focus" />
        <Input readOnly defaultValue="0" name="sense" />
      </div>
    </div>
  );
}