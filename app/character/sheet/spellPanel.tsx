"use client"
import { SpellDAO } from "@/types/spellTypes";
import "./spellPanel.css";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalculatedState } from "@/types/characterTypes";


export default function spellPanel(characterState : CalculatedState, characterSpells : SpellDAO[]) {
    function buildCurrentSpellTable() {
        return (
            <div className="spellTable">
                {characterSpells.map((spelld: SpellDAO) => (
                    <div className="spellRow" key={spelld.spell.name}>
                        <details className="spellCell">
                            <summary>
                                <div className="cellContentName">{spelld.spell.name}</div>
                                <div className="cellContentShort">{spelld.spell.manaCost} Mana</div>
                                <div className="cellContentShort">{spelld.spell.actionCost}</div>
                                <div className="cellContentShort">{spelld.spell.range}</div>
                                <div className="cellContentShort">{spelld.spell.spellType}</div>
                                <div className="cellContentShort">{spelld.spell.source}</div>
                            </summary>
                            <div className="cellDescription">
                                {spelld.spell.description}
                            </div>
                        </details>
                    </div>
                ))}
            </div>)
    }
    return (
        <div className="spellPanel">
            <div className="spellTitle">
                Spells and Abilities
            </div>
            <div className="spellInfo1">
                Spells Capacity: {characterState.spellCapacity}
            </div>
            <div className="spellInfo2">
                Spells Learned: {characterSpells.length}
            </div>
            <div className="spellFilter">
                spell filter
            </div>
            {buildCurrentSpellTable()}
        </div>
    )
}