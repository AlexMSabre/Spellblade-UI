"use client";
// React
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// ShadCN
import {Tabs, TabsTrigger, TabsList, TabsContent} from "@/components/ui/tabs";
// Hooks
import { useCharacterSave } from "@/hooks/useCharacterSave";
import { useCharacterById } from "@/hooks/useCharacterById";
import { useGetEffects } from "@/hooks/useGetEffectsList";
// Types
import { CalculatedState, Character, emptyCalculatedState, emptyCharacter } from "@/types/characterTypes";
import { InventoryDAO } from "@/types/itemTypes";
import { SpellDAO } from "@/types/spellTypes";
import { Effect } from "@/types/stateTypes";
// Functions
import useCalculateState from "@/hooks/useCalculateState";
// Pages
import appHeader from "@/components/appHeader";
import background from "./background";
import talents from "./talents";
import attributes from "./attributes";
import skills from "./skills";
import spells from "./spells";
import equipment from "./equipment";
import story from "./story";
import preview from "./preview";
// CSS
import "./page.css";

  //create an empty character, for now.   this will be the master data that everything will update or reference

const tabs = ["background", "talents", "attributes", "skills", "spells", "equipment", "story", "sheet"];

export default function Builder({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchId = useSearchParams().get('id');
    const searchLevel = useSearchParams().get('level');

    const [currentTab, setCurrentTab] = useState("background");
    const [characterData, setCharacterData] = useState<Character>(emptyCharacter)
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);
    const [characterInventory, setCharacterInventory] = useState<InventoryDAO[]>([]);
    const [characterSpells, setCharacterSpells] = useState<SpellDAO[]>([]);
    const [effectList, setEffectList] = useState<Effect[]>([]);
    const [saveStatus, setSaveStatus] = useState("Unsaved");

    const { data: session, status } = useSession();

    useEffect(()=>{
      useGetEffects().then(data=>{
        setEffectList(data.data.data.getEffectList);
        if (searchId) {
          useCharacterById(searchId).then(result=>{
            console.log(result);
            setCharacterData(result.data.data.fullCharacterById.character);
            setCharacterInventory(result.data.data.fullCharacterById.inventory);
            setCharacterSpells(result.data.data.fullCharacterById.spells);
        });
        }
        else if (searchLevel && (Number(searchLevel)<=8)) {
          setCharacterData(prev=>({...prev, attributeLevel: Number(searchLevel)}))
        }
      })
    },[]);

    useEffect(()=>setCharacterData(prev=>({...prev, userId: session?.user.id})),[session]);

    useEffect(() => {
      let calcState = useCalculateState(characterData);
      setCalculatedState(calcState);
      setCharacterData(prev=>({...prev, state: {...prev.state, hitPoints: calcState.hitPointsMax, manaPoints: calcState.manaMax, armor: calcState.armorMax}}));
      
    }, [currentTab])

    //sets current tab when navigating from tabs menu
    function moveTab(tab:string) {
      setCurrentTab(tab);
    }

    function nextTab() {
      let place = tabs.indexOf(currentTab);
      if ((place != -1) && (place != (tabs.length-1))) {
        setCurrentTab(tabs[place+1]);
      }
    }

    function prevTab() {
      let place = tabs.indexOf(currentTab);
      if (place != -1 && place != 0) {
        setCurrentTab(tabs[place-1]);
      }
    }

    //saves the character via the backend
    function handleSave(){
      setSaveStatus("Saving...");
      if(status==="authenticated"){
        useCharacterSave(characterData, characterInventory, characterSpells).then(data=>{
          let characterDAO = data.data.data.saveCharacter;
          if (characterDAO) {
            let characterDAO = data.data.data.saveCharacter;
            //updates the character data to have the newly generated ID
            setCharacterData(prev=>({...prev, id: characterDAO.character.id}));
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
      <div className="page">
        <div className="prevButton" onClick={()=>{prevTab()}}>
            Prev
        </div>
        <div className="saveButton" onClick={handleSave}>
          Save
        </div>
        <div className="saveStatus">
          Status: {saveStatus}
        </div>
        <div className="goto" hidden={!(currentTab=="preview" && saveStatus=="Saved")}>
          <a href={"/character/sheet?id=" + characterData.id}>Go to Character Sheet</a>
        </div>
        <div className="nextButton" onClick={()=>{nextTab()}}>
            Next
        </div>
        <Tabs className="tabsContainer" defaultValue="background" orientation="vertical" value={currentTab} onValueChange={(e:string)=>{moveTab(e)}}>
            <TabsList className="tabsList">
                <TabsTrigger className="tab" value="background">Background</TabsTrigger>
                <TabsTrigger className="tab" value="talents">Talents</TabsTrigger>
                <TabsTrigger className="tab" value="attributes">Features</TabsTrigger>
                <TabsTrigger className="tab" value="skills">Skills</TabsTrigger>
                <TabsTrigger className="tab" value="spells">Spells</TabsTrigger>
                <TabsTrigger className="tab" value="equipment">Equipment</TabsTrigger>
                <TabsTrigger className="tab" value="story">Story</TabsTrigger>
                <TabsTrigger className="tab" value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="background">{background(characterData,setCharacterData)}</TabsContent>
            <TabsContent value="talents">{talents(characterData,setCharacterData)}</TabsContent>
            <TabsContent value="attributes">{attributes(characterData,setCharacterData, currentTab, setCalculatedState)}</TabsContent>
            <TabsContent value="skills">{skills(characterData,setCharacterData, currentTab, setCalculatedState)}</TabsContent>
            <TabsContent value="spells">{spells(characterData, currentTab, calculatedState, characterSpells, setCharacterSpells)}</TabsContent>
            <TabsContent value="equipment">{equipment(characterData, setCharacterData, characterInventory, setCharacterInventory, effectList)}</TabsContent>
            <TabsContent value="story">{story()}</TabsContent>
            <TabsContent value="preview">{preview(characterData, calculatedState, characterInventory, characterSpells)}</TabsContent>
        </Tabs>
      </div>
      <div className="footerbar">
          footer
      </div>
    </main>
  );
}