export interface Spell {
    id: string
    name: string
    spellType: string
    source: string
    actionCost: string
    manaCost: number
    range: string
    duration: string
    description: string
    effectAmount: string
    effectConditional: string
    effectType: string
    tags: string
}

export var emptySpell = {
    id: "",
    name: "",
    spellType: "",
    source: "",
    actionCost: "",
    manaCost: 0,
    range: "",
    duration: "",
    description: "",
    effectAmount: "",
    effectConditional: "",
    effectType: "",
    tags: ""
}