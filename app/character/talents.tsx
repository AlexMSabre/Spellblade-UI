// React
import { useEffect, useState } from "react";
// Hooks
import { Character } from "@/types/characterTypes";
import { useGetTalentScreen } from "@/hooks/useGetTalentScreen";
import { useModifyEffect } from "@/hooks/operations/effectOperations";
import { useGetAttributeList } from "@/hooks/useGetAttributeList";
// Types
import { Attribute, Talent } from "@/types/talentTypes";
import { DamageTypes } from "@/types/Enums";
import { Effect } from "@/types/stateTypes";
// CSS
import "./talents.css";

export default function talents(character:Character,setCharacterData:Function) {
    //switch flipped on first talent select
    const [talentSelection, setTalentSelection] = useState(true);
    const [readySelection, setReadySelection] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [talentList, setTalentList] = useState<Talent[]>([]);
    const [effectList, setEffectList] = useState<Effect[]>([]);
    const [attributeList, setAttributeList] = useState<Attribute[]>([]);

    useEffect(()=>{
        useGetTalentScreen().then((data)=>{
            setTalentList(data.data.data.getTalentScreen.talents.sort((a: Talent, b: Talent) => a.caster === b.caster ? 0 : a.caster? -1 : 1));
            setEffectList(data.data.data.getTalentScreen.effects);
        })
        useGetAttributeList().then(data => {
            setAttributeList(data.data.data.getAttributeList);
        })
    },[])

    const setTalent = (e:Talent)=> {
        let effects = effectList.filter(e=>e.name.includes(e.name));
        let state = character.state;
        //if removing talent 1
        if (e.name == character.talent1.name) {
            //remove the associated effects
            state.activeEffects = state.activeEffects.filter(ae=>!ae.name.includes(character.talent1.name));
            state.inactiveEffects = state.inactiveEffects.filter(ie=>!ie.name.includes(character.talent1.name));
            //update the characterData
            setCharacterData((prev: any) => ({
            ...prev,
            attributes1: [],
            talent1: "",
            state: {...state}
            }))
            //set talent1 indicator
            setTalentSelection(true);
        }
        //if removing talent 2
        else if (e.name == character.talent2.name) {
            state.activeEffects = state.activeEffects.filter(ae=>!ae.name.includes(character.talent2.name));
            state.inactiveEffects = state.inactiveEffects.filter(ie=>!ie.name.includes(character.talent2.name));
            //update the characterData
            setCharacterData((prev: any) => ({
            ...prev,
            attributes2: [],
            talent2: "",
            state: {...state}
            }))
            //set talent 2 indicator
            setReadySelection(false);
        }
        //if adding first talent
        else if (talentSelection) {
            //add any associated effects.
            state = effects.length > 0 ? useModifyEffect(character.state, false, ...effects) : character.state;
            setCharacterData((prev: any) => ({
            ...prev,
            talent1: e,
            state: {...state}
            }))
            //set talent 1 indicator
            setTalentSelection(false);
        }
        else if (!readySelection) {
            state = effects.length > 0 ? useModifyEffect(character.state, false, ...effects) : character.state;
            setCharacterData((prev: any) => ({
            ...prev,
            talent2: e,
            state: {...state}
            }))
            //set talent 2 indicator
            setReadySelection(true);
        }

    }

    function buildDamageTypeSelector(damageType: string){
        return (
            DamageTypes.filter(d=>d.type===damageType).map(d=>(
                <option key={d.name} value={d.name}>{d.name}</option>
            ))
        )
    }

    function handleChangeDamageType(value: string, talent: string){
        if (value != "Damage") {
            if(talent==="Covenant")
                setCharacterData((prev: Character)=>({...prev, patronDamageType: value}));
            else
                setCharacterData((prev: Character)=>({...prev, elementDamageType: value}));
        }
    }

    function buildTalentCards() {
        return(<div className="talentChoices">
            <div className="covDamageSelect" hidden={character.talent1.name!="Covenant" && character.talent2.name!="Covenant"}>
                <select className="covSelect"
                    onChange={ e=> handleChangeDamageType(e.currentTarget.value, "Covenant")}
                    defaultValue={character.patronDamageType}>
                        <option>Damage</option>
                        {buildDamageTypeSelector("Soul")}
                        {buildDamageTypeSelector("Elemental")}
                </select>
            </div>
            <div className="elemTypeText" hidden={character.talent1.name!="Elemental" && character.talent2.name!="Elemental"}>
                <input className="elemInput" placeholder="Material Type" defaultValue={character.elementName} onChange={(e)=>(setCharacterData((prev:Character)=>({...prev, elementName: e.target.value})))}/>
            </div>
            <div className="elemDamageSelect" hidden={character.talent1.name!="Elemental" && character.talent2.name!="Elemental"}>
                <select className="elemSelect"
                    onChange={ e=> handleChangeDamageType(e.currentTarget.value, "Elemental")} 
                    defaultValue={character.elementDamageType}>
                        <option>Damage</option>
                        {buildDamageTypeSelector("Elemental")}
                </select>
            </div>
            {talentList.map((talent:Talent)=>( //selector view
                <button key={talent.name} className={((character.talent1.name === talent.name)||(character.talent2.name === talent.name)) ? 
                    ("cardBack"): ((!talentSelection)&&(readySelection) ? "disabledTalentCard" : "talentCard")}
                    onClick={()=>{ setTalent(talent)}}>
                    {!((character.talent1.name === talent.name)||(character.talent2.name === talent.name)) ? (
                        <div className="cardGrid">
                            <div className="talentName">
                                {talent.name}
                            </div>
                            <div className="talentIcon">
                                Icon
                            </div>
                            <div className="talentType">
                                {talent.caster ? "Spellcaster" : "Blademaster"}
                            </div>
                            <div className="talentRole">
                                Role: {talent.role}
                            </div>
                            <div className="talentCompl">
                                Complexity: { talent.complexity}/5
                            </div>
                            <div className="talentSplash">
                                Splash
                            </div>
                        </div>
                    ): /* selected version */ (<div className="cardBackGrid"> 
                            <div className="cardBackName">
                                {talent.name}
                            </div>
                            <div className="cardBackIcon">icon</div>
                            <div className="cardBackDesc">
                                {talent.description}
                            </div>
                    </div>)}
                </button>
            ))}
        </div>)
    }

    return (
    <div className="talents">
        <div className="header" onClick={()=>{ setShowSelected(!showSelected)}}>
            {(!showSelected) ? (((!talentSelection)&&(readySelection)) ? "Click to View Talents" : ("Choose Two Talents (" + ((Number(!talentSelection) + Number(readySelection))) + "/2)")) : "Click to Return"}
        </div>
        { !showSelected ? (
            <div>
                {buildTalentCards()}
            </div>
        ): ( //details view
        <div className="selected">
            <div className="viewTalent1">
                <div className="selectedName">
                    { character.talent1.name }
                </div>
                <div className="selectedType">
                    <div className="underline">Talent Type</div> {character.talent1.caster ? "Spellcaster" : "Blademaster"}
                </div>
                <div className="selectedFlavor">
                    {character.talent1.description}
                </div>
                <div className="selectedRoles">
                    <div className="underline">Roles</div> {character.talent1.role}
                </div>
                <div className="selectedComplexity">
                    <div className="underline">Complexity</div> {character.talent1.complexity}/5
                </div>
                <div className="selectedSkills">
                    <div className="underline">Preferred Skills</div> {character.talent1.prioritySkills}
                </div>
                <div className="selectedBonus">
                    <div className="underline">Bonuses</div> +{character.talent1.hpBonus} Hit Point Maximum{character.talent1.caster && " | +3 Mana Bonus"}
                </div>
                <div className="selectedAbility">
                   <u>Abilities:</u> <br/> {character.talent1.ability1}
                </div>
                <div className="selectedAtts">
                    <u>Attributes</u>
                </div>
                {/*TODO*/}
                <div className="selectedAttributes">
                    <div className="att1">
                        <u>{attributeList.filter(a => a.talentName === character.talent1.name)[0]?.name || ""}</u> <br/> {attributeList.filter(a => a.talentName === character.talent1.name)[0]?.description1 || ""}
                    </div>
                    <div className="att2">
                        <u>{attributeList.filter(a => a.talentName === character.talent1.name)[1]?.name || ""}</u> <br/> {attributeList.filter(a => a.talentName === character.talent1.name)[1]?.description1 || ""}
                    </div>
                    <div className="att3">
                        <u>{attributeList.filter(a => a.talentName === character.talent1.name)[2]?.name || ""}</u> <br/> {attributeList.filter(a => a.talentName === character.talent1.name)[2]?.description1 || ""}
                    </div>
                    <div className="att4">
                        <u>{attributeList.filter(a => a.talentName === character.talent1.name)[3]?.name || ""}</u> <br/> {attributeList.filter(a => a.talentName === character.talent1.name)[3]?.description1 || ""}
                    </div>
                </div>
            </div>
            <div className="viewTalent2">
                <div className="selectedName">
                    { character.talent2.name }
                </div>
                <div className="selectedType">
                    <div className="underline">Talent Type</div> {character.talent2.caster ? "Spellcaster" : "Blademaster"}               
                    </div>
                <div className="selectedFlavor">
                    {character.talent2.description}
                </div>
                <div className="selectedRoles">
                    <div className="underline">Roles</div> {character.talent2.role}
                </div>
                <div className="selectedComplexity">
                    <div className="underline">Complexity</div> {character.talent2.complexity}/5
                </div>
                <div className="selectedSkills">
                    <div className="underline">Preferred Skills</div> {character.talent2.prioritySkills}
                </div>
                <div className="selectedBonus">
                    <div className="underline">Bonuses</div> +{character.talent2.hpBonus} Hit Point Maximum{character.talent2.caster && " | +3 Mana Bonus"}
                </div>
                <div className="selectedAbility">
                    <u>Abilities:</u> <br/> {character.talent2.ability1}
                </div>
                <div className="selectedAtts">
                    <u>Attributes</u>
                </div>
                <div className="selectedAttributes"> 
                    <div className="att1">
                        <u>{attributeList.filter(a => a.talentName === character.talent2.name)[0]?.name || ""}</u> <br/> {attributeList.filter(a => a.talentName === character.talent2.name)[0]?.description1 || ""}
                    </div>
                    <div className="att2">
                        <u>{attributeList.filter(a => a.talentName === character.talent2.name)[1]?.name || ""}</u> <br/> {attributeList.filter(a => a.talentName === character.talent2.name)[1]?.description1 || ""}
                    </div>
                    <div className="att3">
                        <u>{attributeList.filter(a => a.talentName === character.talent2.name)[2]?.name || ""}</u> <br/> {attributeList.filter(a => a.talentName === character.talent2.name)[2]?.description1 || ""}
                    </div>
                    <div className="att4">
                        <u>{attributeList.filter(a => a.talentName === character.talent2.name)[3]?.name || ""}</u> <br/> {attributeList.filter(a => a.talentName === character.talent2.name)[3]?.description1 || ""}
                    </div>
                </div>
            </div>
        </div>)}
    </div>
)
}