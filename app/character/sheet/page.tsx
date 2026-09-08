"use client"
import { useSearchParams } from "next/navigation";
import { useCharacterById } from "@/hooks/useCharacterById";
import { useEffect, useState } from "react";
import { CalculatedState, Character, emptyCalculatedState, emptyCharacter } from "@/types/characterTypes";
import { InventoryDAO } from "@/types/itemTypes";
import { SpellDAO } from "@/types/spellTypes";
import "./page.css";
import mainPanel from "./mainPanel";
import inventoryPanel from "./inventoryPanel";
import itemSearch from "@/app/itemSearch";
import useCalculateState from "@/hooks/useCalculateState";
import { useSession } from "next-auth/react";
import appHeader from "@/components/appHeader";
import spellPanel from "./spellPanel";
import { useModifyEffect } from "@/hooks/operations/effectOperations";
import { useGetEffects } from "@/hooks/useGetEffectsList";
import { Effect } from "@/types/stateTypes";
import { useCharacterSave } from "@/hooks/useCharacterSave";


export default function Sheet({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { data: session, status } = useSession();
    const searchId = useSearchParams().get('id');

    const [waitForLoad, setWaitForLoad] = useState<boolean>(true);
    const [validCharacter, setValidCharacter] = useState<boolean>(true);
    const [character, setCharacter] = useState<Character>(emptyCharacter);
    const [characterInventory, setCharacterInventory] = useState<InventoryDAO[]>([]);
    const [characterSpells, setCharacterSpells] = useState<SpellDAO[]>([]);
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);
    const [effectList, setEffectList] = useState<Effect[]>([]);
    const [itemSearchMenu, setItemSearchMenu] = useState(false);
    const [saveStatus, setSaveStatus] = useState("Unsaved");

    useEffect(()=>{
        if (searchId){
            useGetEffects().then(data=>{
                setEffectList(data.data.data.getEffectList);
            })
            useCharacterById(searchId).then(result=>{
                if (result.data.data.fullCharacterById) {
                    setWaitForLoad(false);
                    setCharacter(result.data.data.fullCharacterById.character);
                    setCharacterInventory(result.data.data.fullCharacterById.inventory);
                    setCharacterSpells(result.data.data.fullCharacterById.spells);
                    console.log(result);
                }
                else {
                    setWaitForLoad(false);
                    setValidCharacter(false);
            }
        })}
    },[])

    useEffect(()=>{
        let calcState = useCalculateState(character);
        setCalculatedState({...calcState, hitPoints: calcState.hitPointsMax, manaPoints: calcState.manaMax, armor: calcState.armorMax});
    },[character])

    useEffect(()=>{
        let copyState = {...character.state};
        copyState.activeEffects=copyState.activeEffects.filter(ae=>ae.effectType!=1);
        copyState.inactiveEffects=copyState.inactiveEffects.filter(ie=>ie.effectType!=1);
        let resultEffects = [];
        for (const invDAO of characterInventory) {
            let effectFromItem = effectList.find(i=>i.name===invDAO.item.name);
            if (effectFromItem && invDAO.inventory.equipped) {
                resultEffects.push(effectFromItem);
            }
        }
        copyState = useModifyEffect(copyState, true, ...resultEffects);
        setCharacter(
            (prev : Character)=>({
                ...prev,
                state: copyState
            })
        );
        },[characterInventory])

        //saves the character via the backend
        function handleSave(){
            setSaveStatus("Saving...");
            if(status==="authenticated"){
                useCharacterSave(character, characterInventory, characterSpells).then(data=>{
                    console.log(data);
                    let characterDAO = data.data.data.saveCharacter;
                    if (characterDAO) {
                        let characterDAO = data.data.data.saveCharacter;
                        //updates the character data to have the newly generated ID
                        setCharacter(prev=>({...prev, id: characterDAO.character.id}));
                        //updates the inventory and spells to also have their newly generated IDs, plus the characterId
                        setCharacterInventory(characterDAO.inventory);
                        setCharacterSpells(characterDAO.spells);
                        setSaveStatus("Saved");
                    }
                    else {
                        setSaveStatus("Error Saving Character!");
                    }
                });
            }
            else {
                setSaveStatus("Cannot Save Character! Must be logged in.");
            }
        }


    return (
        <main className="main">
            {appHeader(session, status)}
            <div>
                <div className="panels" hidden={waitForLoad || !validCharacter}>
                    <div className="saveButton"><a href={"/character/builder?id=" + character?.id}>Go Back to Builder!</a></div>
                    <div>        
                        <span className="saveButton" onClick={handleSave}>
                            --Save--
                        </span>
                        <span className="saveStatus">
                            Status: {saveStatus}
                        </span>
                    </div>
                    <div onClick={()=>setItemSearchMenu(!itemSearchMenu)} className="saveButton">Add Items</div>
                    <div>{inventoryPanel(characterInventory, setCharacterInventory)}</div>
                    <div>{mainPanel(character, setCharacter, calculatedState, setCalculatedState)}</div>
                    <div>
                        <div hidden={!itemSearchMenu} >{itemSearch(character, characterInventory, setCharacterInventory)}</div>
                        <div hidden={itemSearchMenu}>{spellPanel(calculatedState, characterSpells)}</div>
                    </div>
                </div>
                <div hidden={!waitForLoad && validCharacter}>{(validCharacter) ? "Please wait...": "Invalid Character Id!"}</div>
            </div>
            <div className="footerbar">
                footer
            </div>
        </main>
    )
}