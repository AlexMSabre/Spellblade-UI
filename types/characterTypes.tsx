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
    ancestryTrait: string,
    baseFitness: number,
    baseTechnique: number,
    baseFocus: number,
    baseSense: number,
    proficiencies: string,
}

export interface CalculatedState {
    [key: string]: string | number | null | undefined,
    characterId: string
    hexResistBonus: number
    evasionBonus: number
    armorMax: number
    armorMin: number
    armor: number
    manaMax: number
    manaPoints: number
    fitness: number
    technique: number
    focus: number
    sense: number
    hitPointsMax: number
    hitPoints: number
    wounds: number
    woundsMax: number
    movement: number
}

export interface CharacterDAO {
    character: Character,
    inventory: InventoryDAO[]
}

export interface CharacterState {
    id: string
    characterId: string
    hitPoints: number
    armor: number
    manaPoints: number
    activeEffects: string
    inactiveEffects: string
}

export interface Ancestry {
    id: string
    name: string
    description: string
}

export var emptyCharacter = {
    id: null, 
    userId: "",
    name: "",
    talent1: " ",
    talent2: " ",
    aspectLevel: 0,
    aspects1: 0,
    aspects2: 0,
    ancestryName: "",
    ancestryTrait: "",
    baseFitness: 0,
    baseTechnique: 0,
    baseFocus: 0,
    baseSense: 0,
    size: "Medium",
    proficiencies: "null,null,null"
}

export var emptyCalculatedState = {
    characterId: "",
    hexResistBonus: 10,
    evasionBonus: 10,
    armorMax: 0,
    armorMin: 0,
    armor: 0,
    manaMax: 0,
    manaPoints: 0,
    fitness: 0,
    technique: 0,
    focus: 0,
    sense: 0,
    hitPointsMax: 40,
    hitPoints: 40,
    wounds: 0,
    woundsMax: 6,
    movement: 6,
}

export var emptyCharacterState = {
    id: "",
    characterId:"",
    hitPoints: 40,
    armor: 0,
    manaPoints: 0,
    activeEffects: "",
    inactiveEffects: ""
  }