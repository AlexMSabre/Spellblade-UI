"use client"
import { CalculatedState, Character } from "@/types/characterTypes"
import "./mainPanel.css"




export default function mainPanel(character : Character, setCharacter : Function, characterState : CalculatedState, setCharacterState : Function) {
    return (
        <div className="mainPanel">
            <div className="characterName">
                {character.name}
            </div>
            <div className="picture"></div>
            <div className="mana">
                <div className="manaPoints"> MP:{" "}
                    <input value={character.state.manaPoints} 
                                  onChange={(e)=>setCharacter((prev:Character)=>({...prev, state: {...prev.state, manaPoints: (Number(e.target.value) || prev.state.manaPoints)}}))} 
                                  className="w-[35px]"/>/{characterState.manaMax}</div>
                <div className="wounds"> Wounds:{" "}
                    <input value={character.state.wounds} 
                                  onChange={(e)=>setCharacter((prev:Character)=>({...prev, state: {...prev.state, wounds: (Number(e.target.value) || prev.state.wounds)}}))} 
                                  className="w-[35px]"/>/{characterState.woundsMax} </div>
                <div className="movement">Movement: {characterState.movement}</div>
            </div>
            <div className="health">
                <div className="hitPoints"> 
                    HP:{" "}
                    <input value={character.state.hitPoints} 
                                  onChange={(e)=>setCharacter((prev:Character)=>({...prev, state: {...prev.state, hitPoints: (Number(e.target.value) || prev.state.hitPoints)}}))} 
                                  className="w-[35px]"/>/{characterState.hitPointsMax}
                </div>
                
                <div className="currentArmor">  
                    Armor:{" "}
                    <input value={character.state.armor} 
                                  onChange={(e)=>setCharacter((prev:Character)=>({...prev, state: {...prev.state, armor: (Number(e.target.value) || prev.state.armor)}}))} 
                                  className="w-[35px]"/>/{characterState.armorMax}

                </div>
                <div className="minArmor">Min Armor: {characterState.armorMin}</div>
            </div>
            <div className="mainSkills">
                <div className="skillsTitle">Skills</div>
                <div className="skillCell">Awareness: {characterState.awareness}</div>
                <div className="skillCell">Celerity: {characterState.celerity}</div>
                <div className="skillCell">Dexterity: {characterState.dexterity}</div>
                <div className="skillCell">Evasion: {characterState.evasion}</div>
                <div className="skillCell">Subtlety: {characterState.subtlety}</div>
                <div className="skillCell">Tenacity: {characterState.tenacity}</div>
                <div className="skillCell"> Fitness: {characterState.fitness}</div>
                <div className="skillCell"> Focus: {characterState.focus} </div>
                <div className="skillCell"> Precision: {characterState.precision}</div>
                <div className="skillCell"> Sense: {characterState.sense} </div>
            </div>
            <div className="conditions">
                Conditions
                <textarea/>
            </div>
            <div className="talent1Name">{character.talent1.name}</div>
            <div className="talent2Name">{character.talent2.name}</div>
            <div className="talent1Attributes">
                {character.attributes1[0]?.name || ""}<br/>{character.attributes1[0]?.description1 || ""} <br/>
                {character.attributes1[1]?.name || ""}<br/>{character.attributes1[1]?.description1 || ""} <br/>
                {character.attributes1[2]?.name || ""}<br/>{character.attributes1[2]?.description1 || ""} <br/>
                {character.attributes1[3]?.name || ""}<br/>{character.attributes1[3]?.description1 || ""}
            </div>
            <div className="talent2Attributes">
                {character.attributes2[0]?.name || ""}<br/>{character.attributes2[0]?.description1 || ""} <br/>
                {character.attributes2[1]?.name || ""}<br/>{character.attributes2[1]?.description1 || ""} <br/>
                {character.attributes2[2]?.name || ""}<br/>{character.attributes2[2]?.description1 || ""} <br/>
                {character.attributes2[3]?.name || ""}<br/>{character.attributes2[3]?.description1 || ""}
            </div>
        </div>
    )
}