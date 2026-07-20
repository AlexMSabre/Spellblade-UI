import { InventoryDAO } from "./itemTypes"

//defines the character type for the whole app 
export interface Character {
    [key: string]: string | number | null | undefined,
    id: string | null,
    userId: string,
    name: string,
    talent1: string,
    talent2: string,
    attributeLevel: number,
    attribute1: number,
    attribute2: number,
    ancestryName: string,
    ancestryTrait: string,
    baseFitness: number,
    basePrecision: number,
    baseFocus: number,
    baseSense: number,
    proficiencies: string,
}

export interface CalculatedState {
    [key: string]: string | number | null | undefined,
    characterId: string
    hitPointsMax: number
    hitPoints: number
    armorMax: number
    armorMin: number
    armor: number
    manaMax: number
    manaPoints: number
    spellCapacity: number
    dexterity: number
    celerity: number
    subtlety: number
    awareness: number
    tenacity: number
    evasion: number
    fitness: number
    precision: number
    focus: number
    sense: number
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
    attributeLevel: 0,
    attribute1: 0,
    attribute2: 0,
    ancestryName: "",
    ancestryTrait: "",
    baseFitness: 0,
    basePrecision: 0,
    baseFocus: 0,
    baseSense: 0,
    size: "Medium",
    proficiencies: "null,null,null"
}

export var emptyCalculatedState = {
    characterId: "",
    tenacity: 10,
    evasion: 10,
    armorMax: 0,
    armorMin: 0,
    armor: 0,
    manaMax: 0,
    manaPoints: 0,
    spellCapacity: 0,
    fitness: 0,
    precision: 0,
    focus: 0,
    sense: 0,
    dexterity: 0,
    celerity: 0,
    subtlety: 0,
    awareness: 0,
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