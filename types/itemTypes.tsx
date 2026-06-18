export interface Item {
    id: string
    name: string
    itemType: string
    equippable: boolean
    size: string
    weight: number
    description1: string
    description2: string
    description3: string
    attack1String: string
    attack2String: string
    attack3String: string
    effectName: string
    baseCost: number
    rarity: string
}

export interface Inventory {
    [key: string]: string | number | boolean | null | undefined,
    id: string
    characterId: string | null
    itemId: string
    equipped: boolean
    proficiency: number
    quantity: number
}

export interface InventoryDAO {
    inventory: Inventory
    item: Item
}

export interface proficiencyDAO {
    item: Item
    mastery: boolean
}