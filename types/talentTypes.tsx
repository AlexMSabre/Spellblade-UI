export interface Aspect {
    [key: string]: string | number | null | undefined,
    id: string
    name: string
    talentName: string
    flag: number
    description: string
}

export interface Talent { 
    id: string
    name: string
    abilities: string
    description: string
    hpBonus: number
    prioritySkills: string
    role: string
    complexity: number
    keystone: string
    capstone: string
    effectId: string
    keystoneEffectId: string
}

export interface TalentDAO {
    talent: Talent
    aspects: Aspect[]
}