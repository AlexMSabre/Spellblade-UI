import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { emptySpell, Spell } from "@/types/spellTypes";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";


const max0spells = 3;
const max1spells = 2;
const maxSpells = 6;
var current0spells = 0;
var current1spells = 0;




function generateSpellList() {
    var spells = [];
    for (let i = 0; i < 50; i++) {
        spells.push({...emptySpell});
        spells[i].name = i.toString();
        spells[i].manaCost = Math.round(i/10);
        spells[i].actionCost = Math.round(i/15).toString();
        spells[i].range = Math.round(i/3).toString();
        spells[i].description = "lala";
    }
    return spells;
}

const filterList = ["0", "1", "2", "3", "4", "5"];

function generateToggleStates(filterList:string[]) {
    let states : boolean[] = [];
    for (let i = 0; i < filterList.length; i++) {
        states.push(false);
    }
    return states;
}

const toggleList : boolean[] = generateToggleStates(filterList);

export default function spells() {
    
    const [currentSpellList, setCurrentSpellList] = useState<Spell[]>([]);
    const [availableSpellList, setAvailableSpellList] = useState(generateSpellList());
    const [activeCurrentSpells, setActiveCurrentSpells] = useState<Spell[]>([]);
    const [activeAvailableSpells, setActiveAvailableSpells] = useState<Spell[]>([]);

    const [availableSpellsTable, setAvailableSpellsTable] = useState(spellsMapper(generateSpellList()));
    const [activeCurrentSpellsTable, setActiveCurrentDisplayTable] = useState(currentSpellsMapper(currentSpellList));
    
    const [allFilters, setAllFitlers] = useState(filterList);
    const [activeFilters, setActiveFilters] = useState(filterList);

    const [filterChecks, setFilterChecks] = useState(new Map());



    function validSpell(spell:Spell) {
        let spellSource = spell.actionCost;
        if (spellSource == "0") {
            return (max0spells > current0spells);
        }
        else if (spellSource == "1") {
            return (max1spells > current1spells);
        }
        else {
            return (maxSpells > currentSpellList.length);
        }
    }

    function spellsMapper(spellList: Spell[]) {
        return (
        <div className="">{
            spellList.map((spell: Spell) => (
                <div key={spell.name} className="flex hover:bg-black" >
                    <div onClick={()=>{addSpell(spell)}} className={(validSpell(spell)) ? ("w-[30px] bg-[#cccccc] hover:bg-[#aaaaaa]") : ("w-[30px] bg-[#cccccc] hover:bg-[#ff0000]")}>
                        
                    </div>
                    <Accordion>
                        <AccordionItem>
                            <AccordionTrigger>
                                <div className="w-[100] rounded-md border" >{spell.name}</div>
                                <div className="w-[100] rounded-md border">{spell.manaCost}</div>
                                <div className="w-[100] rounded-md border">{spell.actionCost}</div>
                                <div className="w-[100] rounded-md border">{spell.range}</div>
                                <div className="row-span-full w-[100] rounded-md border">{spell.description}</div>
                            </AccordionTrigger>
                            <AccordionContent>
                                Secrets are Here
                            </AccordionContent>
                        </AccordionItem>
                       
                    </Accordion>
                </div>

                ))}
        </div>)
    }

    function currentSpellsMapper(spellList: Spell[]) {
        return (
        <div className="">{
            spellList.map((spell: Spell) => (
                <div key={spell.name} className="flex hover:bg-black" onClick={()=>{removeSpell(spell)}}>
                    <div className="w-[100] rounded-md border">{spell.name}</div>
                    <div className="w-[100] rounded-md border">{spell.manaCost}</div>
                    <div className="w-[100] rounded-md border">{spell.actionCost}</div>
                    <div className="w-[100] rounded-md border">{spell.range}</div>
                    <div className="row-span-full w-[100] rounded-md border">{spell.description}</div>
                </div>
                ))}
        </div>)
    }

    function addSpell(spell:Spell) {
        if ((currentSpellList.indexOf(spell) == -1) && (validSpell(spell))) {
            let temp = currentSpellList;
            temp.push(spell);
            setCurrentSpellList(temp);
            updateCurrentSpellTable();
            if (spell.actionCost == "0") {
                current0spells += 1;
                if (current0spells >= max0spells){updateAvailableSpellTable();}
            }
            else if (spell.actionCost == "1") {
                current1spells += 1;
                if (current1spells >= max1spells){updateAvailableSpellTable();}
            }
            if (currentSpellList.length >= maxSpells){updateAvailableSpellTable();}
        }
    }

    function removeSpell(spell:Spell) {
        let index = currentSpellList.indexOf(spell);
        if ( index != -1) {
            let temp = currentSpellList;
            temp.splice(index, 1);
            setCurrentSpellList(temp);
            updateCurrentSpellTable();
            if (spell.actionCost == "0") {
                current0spells -= 1;
                if (current0spells == max0spells - 1){updateAvailableSpellTable();}
                
            }
            else if (spell.actionCost == "1") {
                current1spells -= 1;
                if (current1spells == max1spells - 1){updateAvailableSpellTable();}
                
            }
            if (currentSpellList.length == maxSpells - 1){updateAvailableSpellTable();}
        }
    }

    function filterAvailableSpells(e:boolean, filter:string) {
        if (e) {
            if (activeFilters.indexOf(filter) == -1) {
                let temp = [...activeFilters];
                temp.push(filter);
                setActiveFilters(temp);
            }
        }
        else {
            let index = activeFilters.indexOf(filter);
            if (index != -1) {
                let temp = [...activeFilters];
                temp.splice(index, 1);
                setActiveFilters(temp);
            }
        }
        let tempMap = new Map(filterChecks);
        tempMap.set(filter, !e);
        setFilterChecks(tempMap);
    }

    useEffect(() => {updateAvailableSpellTable()},[activeFilters]);
    useEffect(() => {
        let checks = new Map();
        allFilters.forEach(filter=>checks.set(filter, false));
        setFilterChecks(checks);
    }, [])

    function availableFilterDivs() {
        let temps = [];
        for (let i = 0; i < allFilters.length; i++) {
            let fil = allFilters[i];
            let temp = (
                <Toggle key={fil} variant="outline" onPressedChange={(pressed) => (filterAvailableSpells(!pressed, fil))} pressed={filterChecks.get(fil)} className="bg-[#aaaaaa]">
                    {fil}
                </Toggle>
            )
            temps.push(temp);
        }
        return temps;
    }

    function updateCurrentSpellTable() {
        setActiveCurrentDisplayTable(currentSpellsMapper(currentSpellList));
    }

    function updateAvailableSpellTable() {
        console.log("x");
        let filteredSpells : Spell[] = [];
        for (let i = 0; i < availableSpellList.length; i++) {
            if (activeFilters.includes(availableSpellList[i].actionCost)) {
                filteredSpells.push(availableSpellList[i]);
            }
        }
        setActiveAvailableSpells(filteredSpells);
        setAvailableSpellsTable(spellsMapper(filteredSpells));
    }

    function resetFilters() {
        setActiveFilters(allFilters);
        let tempMap = new Map(filterChecks);
        [...tempMap.keys()].forEach(key=>{tempMap.set(key, false)});
        setFilterChecks(tempMap);
    }

    return (
    <div className="spells">
        <div className="selectedList">
            Selected Spells Table
            <ScrollArea className="h-[500px]">
                {activeCurrentSpellsTable}
            </ScrollArea>
        </div>
        <div className="info justify-self-center justify-text-center">
            Current Spell Number: {current0spells} / {current1spells} / {currentSpellList.length} 
        </div>
        <div className="filter">
            Filters: {activeFilters}
        </div>
        <div className="choices">
            Spell Options Table
            <div className="flex">
                <div className="w-[100px]" onClick={() => (resetFilters())}>
                    Reset
                </div>
                {availableFilterDivs()}
            </div>
            <ScrollArea className="h-[500px]" id="availSpellsTable">
                {availableSpellsTable}
            </ScrollArea>
        </div>
        <div className="free">
            Free
        </div>
    </div>
)
}