export interface Item {
    id: string
    name: string
    itemType: string
    equippable: boolean
    size: string
    weight: number
    description: string
    properties: string
    attack1String: string
    attack2String: string
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