import { Card } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWeaponList } from "@/hooks/useWeaponList";
import { Character } from "@/types/characterTypes";
import { Inventory, InventoryDAO, Item } from "@/types/itemTypes";
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

function weaponListmapper(masterWeaponList: Item[], weaponType: string) {
  if(weaponType==""){
    return (<SelectContent>
    <SelectGroup>
      <SelectLabel>Please Select a weapon type</SelectLabel>
    </SelectGroup>
  </SelectContent>);
  }

  return (<SelectContent>
    <SelectGroup>
      <SelectLabel>Weapons</SelectLabel>
      {masterWeaponList.filter((weapon: Item) => weapon.itemType.includes(weaponType)).map((weapon: Item) => (
        <SelectItem key={weapon.name.toString()} value={weapon.name.toString()}>{weapon.name}</SelectItem>
      )) }
    </SelectGroup>
  </SelectContent>);
}

export default function Equipment(characterData: Character, setCharacterData: Function,
  inventoryData: InventoryDAO[], setInventoryData: Function) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const [masterWeaponList, setMasterWeaponList] = useState<Item[]>([]);
  const [weaponTypes, setWeaponTypes] = useState<string[]>(["", "", ""]);
  const [weapon1List, setWeapon1List] = useState(() => {
    return weaponListmapper(masterWeaponList, weaponTypes[0]);
  });
  const [weapon2List, setWeapon2List] = useState(() => {
    return weaponListmapper(masterWeaponList, weaponTypes[1]);
  });
  const [weapon3List, setWeapon3List] = useState(() => {
    return weaponListmapper(masterWeaponList, weaponTypes[2]);
  });

  const emptyWeapon = {
    id: "null",
    name: "  ",
    itemType: "",
    equippable: true,
    size: "",
    weight: 0,
    description1: "",
    description2: "",
    description3: "",
    attack1String: "",
    attack2String: "",
    attack3String: "",
    effectId: "",
    baseCost: 0,
    rarity: "",
  }
  const [weaponData, setWeaponData] = useState<Item[]>([emptyWeapon, emptyWeapon, emptyWeapon]);

  //loader for API stuff.
  useEffect(() => {
    useWeaponList().then((weapons) => {
      let results = weapons.data.data.getWeaponList;
      results.push(emptyWeapon);
      let proficiencies = characterData.proficiencies.split(",");
      setMasterWeaponList(results);
      setWeaponData([results.find((e: Item) => e.id === proficiencies[0]),
        results.find((e: Item) => e.id === proficiencies[1]),
        results.find((e: Item) => e.id === proficiencies[2])]);
    })
  }, []);

  const handleWeapon1TypeChange = (e: string) => {
    setWeaponTypes((prev) => [e, prev[1], prev[2]]);
  }

  const handleWeaponSelect1change = (e: string) => {
    let newWeapon = masterWeaponList.find((weapon) => weapon.name === e)
    setWeaponData((prev) => {
      return [newWeapon || emptyWeapon, prev[1], prev[2]];
    });
  }

  const handleWeapon2TypeChange = (e: string) => {
    setWeaponTypes((prev) => [prev[0], e, prev[2]]);
  }

  const handleWeaponSelect2change = (e: string) => {
    let newWeapon = masterWeaponList.find((weapon) => weapon.name === e)
    setWeaponData((prev) => {
      return [prev[0], newWeapon || emptyWeapon, prev[2]];
    });
  }

  const handleWeapon3TypeChange = (e: string) => {
    setWeaponTypes((prev) => [prev[0], prev[1], e]);
  }

  const handleWeaponSelect3change = (e: string) => {
    let newWeapon = masterWeaponList.find((weapon) => weapon.name === e)
    setWeaponData((prev) => {
      return [prev[0], prev[1], newWeapon || emptyWeapon];
    });
  }

  useEffect(() => {
    setWeapon1List(weaponListmapper(masterWeaponList, weaponTypes[0]));
    setWeapon2List(weaponListmapper(masterWeaponList, weaponTypes[1]));
    setWeapon3List(weaponListmapper(masterWeaponList, weaponTypes[2]));
  }, [weaponTypes]);

  useEffect(() => {
    setWeaponTypes([weaponData[0]?.itemType?.split(" ")[0],
      weaponData[1].itemType.split(" ")[0],
      weaponData[2].itemType.split(" ")[0]]);
    setCharacterData((prev: Character) => ({
      ...prev,
      proficiencies: weaponData[0]?.id + "," + weaponData[1].id + "," + weaponData[2].id
    }));
  }, [weaponData]);



  const weaponTypesLkp = (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Weapon Category</SelectLabel>
        <SelectItem value="Heavy">Heavy</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="Light">Light</SelectItem>
        <SelectItem value="Ranged">Ranged</SelectItem>
        <SelectItem value="Shield">Shield</SelectItem>
        <SelectItem value="Spellcasting">Spellcasting Tool</SelectItem>
      </SelectGroup>
    </SelectContent>
  );

  return (
    <Controller
      name="title"
      control={form.control}
      render={({ field, fieldState }) => (
        <div>
          <h1> Weapons</h1>
          <Card>
            <Field data-invalid={fieldState.invalid}>
              <Select name="weaponType1" onValueChange={handleWeapon1TypeChange} defaultValue={weaponData[0].itemType.split(" ")[0]}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                {weaponTypesLkp}
              </Select>
            </Field>
            <Field data-invalid={fieldState.invalid}>
              <Select>
                <Select name="weaponSelect1" onValueChange={handleWeaponSelect1change} defaultValue={weaponData[0].name}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a Weapon" />
                  </SelectTrigger>
                  {weapon1List}
                </Select>
              </Select>
            </Field>
          </Card>
          <Card>
            <Field data-invalid={fieldState.invalid}>
              <Select name="weaponType1" onValueChange={handleWeapon2TypeChange} defaultValue={weaponData[0].itemType.split(" ")[0]}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                {weaponTypesLkp}
              </Select>
            </Field>
            <Field data-invalid={fieldState.invalid}>
              <Select>
                <Select name="weaponSelect1" onValueChange={handleWeaponSelect2change} defaultValue={weaponData[0].name}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a Weapon" />
                  </SelectTrigger>
                  {weapon2List}
                </Select>
              </Select>
            </Field>
          </Card>
          <Card>
            <Field data-invalid={fieldState.invalid}>
              <Select name="weaponType3" onValueChange={handleWeapon3TypeChange} defaultValue={weaponData[0].itemType.split(" ")[0]}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                {weaponTypesLkp}
              </Select>
            </Field>
            <Field data-invalid={fieldState.invalid}>
              <Select>
                <Select name="weaponSelect3" onValueChange={handleWeaponSelect3change} defaultValue={weaponData[0].name}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a Weapon" />
                  </SelectTrigger>
                  {weapon3List}
                </Select>
              </Select>
            </Field>
          </Card>
        </div>)}
    />
  );
}