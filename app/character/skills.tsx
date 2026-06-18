import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculateState } from "@/hooks/useCalculateState";
import { useGetAncestryList } from "@/hooks/UseGetAncestryList";
import { Ancestry, CalculatedState, Character, CharacterState, emptyCalculatedState } from "@/types/characterTypes";
import { Item } from "@/types/itemTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { effect } from "zod/v3";

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

export default function Skills(characterData: Character, setCharacterData: Function, characterState: CharacterState, setCharacterState: Function) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })


  const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);

  //this controls the dynamic fields for "Other" Ancestry
  const [ancestorOther, setAncestorOther] = useState(false);
  const [ancestryList, setAncestryList] = useState(<SelectContent></SelectContent>);
  const [effectMods, setEffectMods] = useState<number[]>([
    Math.max(calculatedState?.fitness - characterData.baseFitness, 0),
    Math.max(calculatedState?.technique - characterData.baseTechnique, 0),
    Math.max(calculatedState?.focus - characterData.baseFocus, 0),
    Math.max(calculatedState?.sense - characterData.baseSense, 0)
  ]);

  useEffect(() => {
    useCalculateState(characterState, characterData).then((data) => {
      let newCalc = data.data.data.calculateState
      setCalculatedState(newCalc);
      setEffectMods([
        Math.max(newCalc?.fitness - characterData.baseFitness, 0),
        Math.max(newCalc?.technique - characterData.baseTechnique, 0),
        Math.max(newCalc?.focus - characterData.baseFocus, 0),
        Math.max(newCalc?.sense - characterData.baseSense, 0)
      ]);
    });
  }, [characterState]);

  useEffect(() => {
    useGetAncestryList().then((ancestries) => {
      setAncestryList(
        <SelectContent>
          <SelectGroup>
            {ancestries.data.data.getAncestryList.map((ancestry: Ancestry) => (
              <SelectItem key={ancestry.name.toString()} value={ancestry.name.toString()}>{ancestry.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>);
    });
  }, [])

  const handleAncestryChange = (value: string) => {
    if (value === "other") {
      setAncestorOther(true);
    } else {
      setAncestorOther(false);
    }
    //TODO: Ancestry
  }

  //keeps point totals up to date and within bounds
  const handleSkillChanges = (e: any) => {
    //parses field names
    let name = e.currentTarget.name.split("-");
    let oldValue = characterData["base" + name[0]];
    let direction = name[1].includes("up");
    let validChange = false;
    //checks to see if the newly proposed value is valid
    if (typeof oldValue == "number") {
      let newValue = direction ? oldValue + 1 : oldValue - 1;
      validChange = (direction && newValue <= 6) || (!direction && newValue >= 0);

      //if valid, update, otherwise dont change
      if (validChange) {
        setCharacterData((prev: any) => ({
          ...prev,
          ["base" + name[0]]: newValue
        }));
      }
    }
  }

  return (
    <div>
      <h2>ancestry</h2>
      <Select onValueChange={handleAncestryChange} name="ancestrySelect">
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select an ancestry" />
        </SelectTrigger>
        {ancestryList}
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
            <Input value={characterData?.baseFitness + effectMods[0]} readOnly></Input>
            <Button size="icon" variant="outline" type="button" name="Fitness-down" onClick={handleSkillChanges}><Minus /></Button>
          </ButtonGroup>
        </Field>
        <Field>
          <FieldLabel>Technique</FieldLabel>
          <ButtonGroup>
            <Button size="icon" variant="outline" type="button" name="Technique-up" onClick={handleSkillChanges}><Plus /></Button>
            <Input value={characterData?.baseTechnique + effectMods[1]} readOnly></Input>
            <Button size="icon" variant="outline" type="button" name="Technique-down" onClick={handleSkillChanges}><Minus /></Button>
          </ButtonGroup>
        </Field>
        <Field>
          <FieldLabel>Focus</FieldLabel>
          <ButtonGroup>
            <Button size="icon" variant="outline" type="button" name="Focus-up" onClick={handleSkillChanges}><Plus /></Button>
            <Input value={characterData?.baseFocus + effectMods[2]} readOnly></Input>
            <Button size="icon" variant="outline" type="button" name="Focus-down" onClick={handleSkillChanges}><Minus /></Button>
          </ButtonGroup>
        </Field>
        <Field>
          <FieldLabel>Sense</FieldLabel>
          <div className="flex flex-row gap-1">
            <ButtonGroup orientation="vertical">
              <ButtonGroup>
                <Button size="icon" variant="outline" type="button" name="Sense-up" onClick={handleSkillChanges}><Plus /></Button>
                <Input value={characterData?.baseSense + effectMods[3]} readOnly></Input>
                <Button size="icon" variant="outline" type="button" name="Sense-down" onClick={handleSkillChanges}><Minus /></Button>
              </ButtonGroup>
            </ButtonGroup>
          </div>
        </Field>
      </div>
      <div className="flex flex-row gap-16">
        <Input value={characterData.baseFitness} aria-label="fit-points" readOnly />
        <Input value={characterData.baseTechnique} aria-label="fit-points" readOnly />
        <Input value={characterData.baseFocus} aria-label="fit-points" readOnly />
        <Input value={characterData.baseSense} aria-label="fit-points" readOnly />
      </div>
      <div className="flex flex-row gap-16">
        <Input readOnly value={"+" + effectMods[0]} name="fitness" />
        <Input readOnly value={"+" + effectMods[1]} name="technique" />
        <Input readOnly value={"+" + effectMods[2]} name="focus" />
        <Input readOnly value={"+" + effectMods[3]} name="sense" />
      </div>
    </div>
  );
}