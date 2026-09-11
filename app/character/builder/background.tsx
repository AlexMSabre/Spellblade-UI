"use client"
// React
import React from "react";
import { useEffect, useState } from "react";
// ShadUI
import { Combobox, ComboboxContent, ComboboxList, ComboboxItem, ComboboxInput, ComboboxEmpty, ComboboxChips, ComboboxChip, ComboboxValue, ComboboxChipsInput, useComboboxAnchor } from "@/components/ui/combobox";
// Hooks
import { useModifyEffect } from "@/hooks/operations/effectOperations";
import { useGetBackgroundScreen } from "@/hooks/useGetBackgroundScreen";
// Types
import { Character } from "@/types/characterTypes";
import { Ancestry, Background, Effect, Trait } from "@/types/stateTypes";
// CSS
import "./background.css";


export default function background(character:Character,setCharacterData:Function) {

    
    //ancestries and backgrounds are divided between "parent" categories.  specific children can be selected after the parent is selected
    const [ancestryParentList, setAncestryParentList] = useState<Ancestry[]>([]);
    const [backgroundParentList, setBackgroundParentList] = useState<Background[]>([]);
    //switches that flip to show either the parent list or child menu
    const [ancestrySelection, setAncestrySelection] = useState(false);
    const [backgroundSelection, setBackgroundSelection] = useState(false);
    //list of children that belong to the current parent. referred to as "variants" in the UI
    const [ancVariantSelector, setAncVariantSelector] = useState(<div></div>);
    const [backVariantSelector, setBackVariantSelector] = useState(<div></div>);
    //master lists, should not be changed except by the API call.
    const [ancestryList, setAncestryList] = useState<Ancestry[]>([]);
    const [backgroundList, setBackgroundList] = useState<Background[]>([]);
    const [traitsList, setTraitsList] = useState<Trait[]>([]);
    const [effectList, setEffectList] = useState<Effect[]>([]);

    const [sourceFilter, setSourceFilter] = useState<string[]>(["Core"]);
    const anchor = useComboboxAnchor();
    

    //gets all data from backend for screen
    useEffect(()=>{
        useGetBackgroundScreen("").then(data=>{
            let response = data.data.data.getBackgroundScreen;
            //list of the children
            setAncestryList(response.ancestries);
            setBackgroundList(response.backgrounds);
            setTraitsList(response.traits);
            setEffectList(response.effects);
            //filters the child list down to 1 entry per parent for display.  This may need to be changed to allow for generic descriptions
            let parentList = response.ancestries.filter((value: Ancestry, index: Number, self:Ancestry[])=>self.findIndex(a=>a.parent===value.parent)===index);
            setAncestryParentList(parentList);
            parentList = response.backgrounds.filter((value: Background, index: Number, self:Background[])=>self.findIndex(a=>a.parentTrait===value.parentTrait)===index);
            setBackgroundParentList(parentList);
        })
    },[])

    useEffect(()=>{
        setAncVariantSelector(buildAncestryVariants(character.ancestry.parent));
        setBackVariantSelector(buildBackgroundVariants(character.background.parentTrait.name));
    },[sourceFilter])

    //step 3 of 3, save variant/child selection to character data
    function saveAncestrytoCharacter(e:string){
        let value = ancestryList.find(a=>a.name===e);
        //get new effects from master list
        let effects = effectList.filter(e=>e.name===value?.trait1 || e.name===value?.trait2);
        //add new effects to state
        let state = effects.length > 0 ? useModifyEffect(character.state, true, ...effects) : character.state;
        //remove old effects from state
        state.activeEffects = state.activeEffects.filter(ae=>ae.name!=character.ancestry.trait1?.name && ae.name!=character.ancestry.trait2?.name);
        state.inactiveEffects = state.inactiveEffects.filter(ie=>ie.name!=character.ancestry.trait1?.name && ie.name!=character.ancestry.trait2?.name);
        //save to character
        if(value)
            setCharacterData((prev: Character)=>({
                ...prev,
                ancestry: buildAncestryInner(value),
                state: {...state}
            }))
    }
    
    //step 3/3
    function saveBackgroundtoCharacter(e:string){
        let value = backgroundList.find(b=>b.name===e);
        //no effects needed for background,  just add.
        if(value)
            setCharacterData((prev: Character)=>({
                ...prev,
                background: buildBackgroundInner(value)
            }))
    }

    //builder functions that allow for the traits to be stored directly in the character data.  allows for easy access
    function buildAncestryInner(ancestry: Ancestry){
        return{
            ...ancestry,
            trait1: findTraitByName(ancestry.trait1),
            trait2: findTraitByName(ancestry.trait2),
        }
    }
    //builder function
    function buildBackgroundInner(background: Background){
        return{
            ...background,
            parentTrait: findTraitByName(background.parentTrait),
            childTrait: findTraitByName(background.childTrait),
        }
    }

    //see tin
    function findTraitByName(name:string){
        return traitsList.find(t=>t.name===name);
    }

    //step 2.5 of 3, build the select element for the child menu
    function buildAncestryVariants(parent:string) {
        let variants = ancestryList?.filter(a=>a.parent===parent && sourceFilter.includes(a.source));
        return <select defaultValue={character.ancestry?.name} onChange={(e)=>(saveAncestrytoCharacter(e.currentTarget.value))}>Choose Variant
            {variants.map((variant: Ancestry)=>(
                <option value = {variant.name} key={variant.name}>
                    Variant: {variant.name}
                </option>
            ))}
        </select>
    }
    
    //step 2.5/3
    function buildBackgroundVariants(parentTrait: string) {
        let variants = backgroundList.filter(b=>(b.parentTrait===parentTrait && sourceFilter.includes(b.source)));
        return <select defaultValue={character.background?.name} onChange={(e)=>(saveBackgroundtoCharacter(e.currentTarget.value))}>Choose Variant
            {variants.map((variant: Background)=>(
                <option value = {variant.name} key={variant.name}>
                    {variant.name}
                </option>
            ))}
        </select>
    }

    //resets back to parent list view.
    const ancestryReturn = ()=> {
        setAncestrySelection(false);
    }
    const backgroundReturn = ()=> {
        setBackgroundSelection(false);
    }

    //step 2 of 3: parent selection has been made
    const ancestryChoice = (ancestry:Ancestry) => {
        //flip switch to set child menu view
        setAncestrySelection(true);
        setAncVariantSelector(buildAncestryVariants(ancestry.parent));
        //if the Parent selection has changed, set the default child as the variant
        if (character.ancestry?.parent != ancestry.parent) {
            saveAncestrytoCharacter(ancestry.name);
        }
    }
    
    //step 2/3
    const backgroundChoice = (background:Background) => {
        //backVariants will be chosen with background choice
        setBackgroundSelection(true);
        setBackVariantSelector(buildBackgroundVariants(background.parentTrait));
        if (character.background?.parentTrait.name != background.parentTrait) {
            setCharacterData((prev: any) => ({
            ...prev,
            background: buildBackgroundInner(background)
            }))
        }
    }

    //Step 1 of 3: build the initial display lists 
    function buildAncestryList() {
        let filteredAncestryList = ancestryParentList.filter(anc=>sourceFilter.includes(anc.source));
        return <div>{filteredAncestryList.map((ancestry: Ancestry) => (
            <div className="cell" key={ancestry.parent} onClick={()=>{ancestryChoice(ancestry)}}>
                <div className="cellName">
                    {ancestry.parent}
                </div>
                <div className="cellDescription">
                    {ancestry.description}
                </div>
                <div className="cellWorld">
                    {ancestry.source}
                </div>
                <div className="cellImage">

                </div>                
            </div>
        ))}</div>
    }
    //step 1/3
    function buildBackgroundList() {
        return <div>{backgroundParentList.map((background: Background) => (
            <div className="cell" key={background.parentTrait} onClick={()=>{backgroundChoice(background)}}>
                <div className="cellName">
                    {background.parentTrait}
                </div>
                <div className="cellDescription">
                    {background.description}
                </div>
                <div className="cellImage">

                </div>
            </div>
        ))}</div>
    }
    
    return (
    <div className="background">
        <div className="name">
            <input className="nameBox" type="text" placeholder="Character Name" value={character.name} onChange={(e)=>(setCharacterData((prev:Character)=>({...prev, name: e.target.value})))}/>
            <div className="worlds">
                World Sources:
                <Combobox
                    multiple
                    autoHighlight
                    items={["Core","Ribean","Zaub"]}
                    defaultValue={["Core"]}
                    onValueChange={(value : string[])=>(setSourceFilter(value))}>

                    <ComboboxChips ref={anchor} className="h-[60px]">
                        <ComboboxValue>
                        {(values) => (
                            <React.Fragment>
                                {values.map((value: string) => (
                                    <ComboboxChip className="chip" key={value}>{value}</ComboboxChip>
                                ))}
                                <ComboboxChipsInput />
                            </React.Fragment>
                        )}
                        </ComboboxValue>
                    </ComboboxChips>
                    <ComboboxContent anchor={anchor}>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                        {(item) => (
                            <ComboboxItem className="worldOption" key={item} value={item}>
                            {item}
                            </ComboboxItem>
                        )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>
            <div className="image">
                
            </div>
        </div>
        
        <div className="ancestry">
            {ancestrySelection ? (
                //child view
            <div>
                Ancestry
                <div onClick={()=>{ ancestryReturn()}} className="return">
                    {character.ancestry?.parent}
                </div>
                <div className="variants">
                    {ancVariantSelector}
                </div>
                Traits: {character.ancestry?.trait1?.name + ", " + character.ancestry?.trait2?.name}
                <div className="description">
                    {character.ancestry?.description}
                </div>
            </div>
            //parent view
        ): (<div className="scrollContainer">
                <div className="scrollTitle">Choose an Ancestry</div>
                <div className="scrollList">
                    {buildAncestryList()}
                </div>
            </div>)}
        </div>
        
        <div className="faction">
            {backgroundSelection ? (
                //child view
            <div>
                Background
                <div onClick={()=>{ backgroundReturn()}} className="return">
                    {character.background?.parentTrait.name}
                </div>
                <div className="variants">
                    {backVariantSelector}
                </div>
                Traits: {character.background?.childTrait?.name}
                <div className="description">
                    {character.background?.description}
                </div>
            </div>
            //parent view
        ): (<div className="scrollContainer">
                <div className="scrollTitle">Choose a Background</div>
                <div className="scrollList">
                    {buildBackgroundList()}
                </div>
            </div>
            )}
    </div>
    </div>
)
}