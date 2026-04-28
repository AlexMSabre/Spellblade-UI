import { Card, CardHeader } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Character } from "@/types/characterTypes";
import { Aspect, Talent, TalentDAO } from "@/types/talentTypes";
import { useTalentAndAspectsData } from "@/hooks/useTalentAndAspectsData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { getTalentsList } from "@/hooks/getTalentsList";

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

export default function Talents(characterData: Character, setCharacterData: Function) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  //checks counts the number of true bits in aspect flag number
  const flagCounter = (aspect: number) => {
    let total = 0;
    for (let i = 0; i < 4; i++)
      if ((1 << i) & aspect)
        total++;

    return total;
  }
  //a four-state variable that determines what aspects are disabled
  const [aspectDisable, setAspectDisable] = useState(0);
  //stores the generic data from the talents you have currently
  const [talentData, setTalentData] = useState<TalentDAO[]>([]);
  //stores the list of names of ALL talents as a dropdown menu selection
  const [talentList] = useState(getTalentsList().then((result) => {
    return (
      <SelectGroup>
        <SelectLabel>talents</SelectLabel>
        {result.data.data.getTalentsList.map((talent: string) => (
          <SelectItem key={talent} value={talent}>{talent}</SelectItem>
        ))}
      </SelectGroup>
    );
  }));

  //when character data is updated, make sure everything else is updated
  useEffect(() => {
    const count1 = flagCounter(characterData.aspects1);
    const count2 = flagCounter(characterData.aspects2);

    const aspectTotal = count1 + count2;
    const aspectDiff = count1 - count2;
    //if the aspect level is equal to the total number of aspects, disable all
    //else if the aspect difference is greater than/equal to 2 disable talent 1 aspects
    //else if the aspect difference is less than/equal to -2 disable talent 2 aspects 
    //else, disable none
    if (aspectTotal >= characterData.aspectLevel) {
      setAspectDisable(3);
    } else if (aspectDiff >= 2) {
      setAspectDisable(1);
    } else if (aspectDiff <= -2) {
      setAspectDisable(2);
    } else {
      setAspectDisable(0);
    }

    //gets the data for the currently selected talents
    useTalentAndAspectsData(characterData.talent1, characterData.talent2).then((result) => {
      setTalentData(result.data.data.getTalentAndAspectsData);
    });
  }, [characterData]);


  //sets character data to reflect newly changed talents and ancestries
  const transferInputData = (e: any) => {
    let name = e.name;
    let value = e.value;

    if (name.includes)
      setCharacterData((prev: any) => ({
        ...prev,
        [name]: value,
      }))
  }
  //when talent 1 is changed, set it in character data and wipe aspects
  const transferSpec1Data = (e: string) => {
    setCharacterData((prev: any) => ({
      ...prev,
      talent1: e,
      aspects1: 0
    }))
  }
  //when talent 2 is changed, set it in character data and wipe aspects
  const transferSpec2Data = (e: string) => {
    setCharacterData((prev: any) => ({
      ...prev,
      talent2: e,
      aspects2: 0
    }))

  }


  return (
    <Controller
      name="title"
      control={form.control}
      render={({ field }) => (
        <div>
          <h2>Specialities</h2>
          <p>Choose your Specialites.</p>
          <div className="flex flex-row gap-7">
            <div>
            </div>
            <Field>
              <FieldLabel>talent One</FieldLabel>
              <Select name="talent1" onValueChange={transferSpec1Data} defaultValue={characterData?.talent1?.toString()}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a talent" />
                </SelectTrigger>
                <SelectContent>
                  {talentList}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>talent Two</FieldLabel>
              <Select name="talent2" onValueChange={transferSpec2Data} defaultValue={characterData?.talent2?.toString()}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a talent" />
                </SelectTrigger>
                <SelectContent>
                  {talentList}
                </SelectContent>
              </Select>
            </Field>
          </div>
          {/**this is a touch complex*/}
          <div className="flex flex-row gap-4">
            <div className="grid grid-cols-1">
              {/**Start by Filtering talentData by talent name, using talent1 in the CharacterData object
               * Then get the list of aspects from the first(and only) result */}
              {talentData.filter((dao) => dao.talent?.name == characterData.talent1)[0]?.aspects?.map((aspect: Aspect) => (
                <Card key={aspect.name}>
                  <Field>
                    {/**log base 2 of the aspect.flag will give us an aspect number of 0-3 which we use as a name and key
                     * then, to see if it is currently selected we compare the aspect flag against the characterData aspects1
                     *   if it is not 0 it is checked
                     * then we check aspectsDisable to see if this field should be disabled. (see above for aspectDisable explanation)
                     *    The field should never be disabled if it is checked
                     * then whenever the switch is changed, flip the associated bit of the characterData.aspects1 and feed it into 
                     *   our changed value function 
                    */}
                    <Switch id={"aspect " + Math.log2(aspect.flag)} name={"aspects1-" + Math.log2(aspect.flag)}
                      checked={0 !== (characterData.aspects1 & aspect.flag)}
                      disabled={[1, 3].includes(aspectDisable) && (0 == (characterData.aspects1 & aspect.flag))}
                      onCheckedChange={() => { transferInputData({ name: "aspects1", value: (aspect.flag ^ characterData.aspects1) }) }} />
                    <Label>{aspect.name}</Label>

                    <FieldDescription>{aspect.description}</FieldDescription>
                  </Field>
                </Card>
              ))}

            </div>
            <div className="grid grid-cols-1">
              {talentData.filter((dao) => dao.talent?.name == characterData.talent2)[0]?.aspects?.map((aspect: Aspect) => (
                <Card key={aspect.name}>
                  <Field>
                    <Switch id={"aspect " + Math.log2(aspect.flag)} name={"aspects2-" + Math.log2(aspect.flag)}
                      checked={0 !== (characterData.aspects2 & aspect.flag)}
                      disabled={[2, 3].includes(aspectDisable) && (0 == (characterData.aspects2 & aspect.flag))}
                      onCheckedChange={() => { transferInputData({ name: "aspects2", value: (aspect.flag ^ characterData.aspects2) }) }} />
                    <Label>{aspect.name}</Label>

                    <FieldDescription>{aspect.description}</FieldDescription>
                  </Field>
                </Card>
              ))}

            </div>
          </div>

        </div>)}
    />
  );
}