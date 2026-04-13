export interface Item {
    id: string
    name: string
    itemType: string
    equippable: Boolean
    size: string
    weight: number
    description1: string
    description2: string
    description3: string
    attack1String: string
    attack2String: string
    attack3String: string
    effectId: string
    baseCost: number
    rarity: string
}

export interface Inventory {
    id: string
    characterId: string | null
    itemId: string
    equipped: Boolean
    proficiency: number
    quantity: number
}

export interface InventoryDAO {
    inventory: Inventory
    item: Item
}