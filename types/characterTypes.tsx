import { InventoryDAO } from "./itemTypes"

//defines the character type for the whole app 
export interface Character {
    [key: string]: string | number | null | undefined,
    id: string | null,
    userId: string,
    name: string,
    talent1: string,
    talent2: string,
    aspectLevel: number,
    aspects1: number,
    aspects2: number,
    ancestryName: string,
    ancestryTrait: number,
    baseFitness: number,
    baseTechnique: number,
    baseFocus: number,
    baseSense: number,
    proficiencies: string,
    gold: number,
    silver: number,
    copper: number
}

export interface CharacterDAO {
    character: Character,
    inventory: InventoryDAO[]
}

export var emptyCharacter = {
    id: null, 
    userId: "",
    name: "",
    talent1: "",
    talent2: "",
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
  }