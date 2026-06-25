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
    ability1: string
    ability2: string
    description: string
    hpBonus: number
    prioritySkills: string
    role: string
    complexity: number
    keystone: string
    capstone: string
    caster: boolean
}

export interface TalentDAO {
    talent: Talent
    attributes: Aspect[]
}