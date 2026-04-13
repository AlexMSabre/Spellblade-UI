import { InventoryDAO } from "./itemTypes"

//defines the character type for the whole app 
export interface Character {
    [key: string]: string | number | null,
    id: string | null,
    userId: string,
    name: string,
    specialty1: number,
    specialty2: number,
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