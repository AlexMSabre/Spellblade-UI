import "./skills.css";
import { CalculatedState, Character, emptyCalculatedState, emptyLimitedState } from "@/types/characterTypes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Plus, Minus } from "lucide-react";
import useCalculateState, { applyLimitedEffects } from "@/hooks/useCalculateState";

export default function skills(character: Character, setCharacterData: Function, currentTab: string, setCharacterState : Function) {
    const [calculatedState, setCalculatedState] = useState<CalculatedState>(emptyCalculatedState);
    const [ancestryBonuses, setAncestryBonuses] = useState({ ...emptyLimitedState });
    const [keyBonuses, setkeyBonuses] = useState({ ...emptyLimitedState });

    var points = (6 - character.baseFitness - character.baseFocus - character.basePrecision - character.baseSense - (-character.attributeLevel));

    useEffect(() => {
        if (currentTab === "skills") {
            setCalculatedState(useCalculateState(character));
            let limitedEffects = character.state.activeEffects.filter(ae => ae.description === "Ancestry");
            if (limitedEffects.length > 0)
                setAncestryBonuses(applyLimitedEffects(limitedEffects))
            limitedEffects = character.state.activeEffects.filter(ae => ae.description === "Keystone")
            if (limitedEffects.length > 0)
                setkeyBonuses(applyLimitedEffects(limitedEffects));
        }
    }, [currentTab, character])

    //whenever a skill is changed via point buy. value is negative if reducing  
    const handleSkillChange = (e: string, value: number) => {
        //get current value of associated skill
        let skill = character[e];
        //type of check to remove warnings
        if (typeof skill == "number") {
            setCharacterData((prev: any) => ({
                ...prev,
                [e]: skill + value
            }))
        }
    }

    return (
        <div className="skills">
            <div className="skillPoints">
                Remaining Skill Points: {points}
            </div>
            <div className="skillInfo">
                Info
            </div>
            <div className="fitness">
                Fitness
                <ButtonGroup className="w-full p-[4px]">
                    <Button size="lg" onClick={() => { handleSkillChange("baseFitness", -1) }} disabled={character.baseFitness == 0}><Minus /></Button>
                    <div className="adder">{character?.baseFitness}</div>
                    <Button size="lg" onClick={() => { handleSkillChange("baseFitness", 1) }} disabled={(character.baseFitness == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="adder"> Ancestry: {ancestryBonuses.fitness}</div>
                +
                <div className="adder">Keystones: {keyBonuses.fitness}</div>
                =
                <div className="adderTotal">Total: +{calculatedState.fitness}</div>

            </div>
            <div className="focus">
                Focus
                <ButtonGroup className="w-full p-[4px]">
                    <Button size="lg" onClick={() => { handleSkillChange("baseFocus", -1) }} disabled={character.baseFocus == 0}><Minus /></Button>
                    <div className="adder">{character?.baseFocus}</div>
                    <Button size="lg" onClick={() => { handleSkillChange("baseFocus", 1) }} disabled={(character.baseFocus == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="adder"> Ancestry: {ancestryBonuses.focus}</div>
                +
                <div className="adder">Keystones: {keyBonuses.focus}</div>
                =
                <div className="adderTotal">Total: +{calculatedState.focus}</div>
            </div>
            <div className="precision">
                Precision
                <ButtonGroup className="w-full p-[4px]">
                    <Button size="lg" onClick={() => { handleSkillChange("basePrecision", -1) }} disabled={character.basePrecision == 0}><Minus /></Button>
                    <div className="adder">{character?.basePrecision}</div>
                    <Button size="lg" onClick={() => { handleSkillChange("basePrecision", 1) }} disabled={(character.basePrecision == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="adder"> Ancestry: {ancestryBonuses.precision}</div>
                +
                <div className="adder">Keystones: {keyBonuses.precision}</div>
                =
                <div className="adderTotal">Total: +{calculatedState.precision}</div>
            </div>
            <div className="sense">
                Sense
                <ButtonGroup className="w-full p-[4px]">
                    <Button size="lg" onClick={() => { handleSkillChange("baseSense", -1) }} disabled={character.baseSense == 0}><Minus /></Button>
                    <div className="adder">{character?.baseSense}</div>
                    <Button size="lg" onClick={() => { handleSkillChange("baseSense", 1) }} disabled={(character.baseSense == 6) || (points <= 0)}><Plus /></Button>
                </ButtonGroup>
                +
                <div className="adder"> Ancestry: {ancestryBonuses.sense}</div>
                +
                <div className="adder">Keystones: {keyBonuses.sense}</div>
                =
                <div className="adderTotal">Total: +{calculatedState.sense}</div>
            </div>
            <div className="skillList">
                <div className="listAwareness">Awareness: <br/>+{calculatedState.awareness}<br/>
                    <div className="listDesc">
                        <div className="text-center underline">(Focus + Sense)/2</div> A creature's ability to sense their surroundings and make careful observations.
                    </div>
                </div>
                <div className="listCelerity">Celerity: <br/>+{calculatedState.celerity}<br/>
                    <div className="listDesc">
                        <div className="text-center underline">(Focus + Precision)/2</div> A creature's ability to precisely execute delicate performances, such as casting spells.
                    </div>
                </div>
                <div className="listDexterity">Dexterity: <br/>+{calculatedState.dexterity}<br/>
                    <div className="listDesc">
                        <div className="text-center underline">(Fitness + Precision)/2</div> A creature's ability to perform physical actions using weapons, tools, or their body.
                    </div>
                </div>
                <div className="listEvasion">Evasion: <br/>+{calculatedState.evasion}<br/>
                    <div className="listDesc">
                        <div className="text-center underline">(Fitness + Sense)/2</div> A creature's ability to sense and avoid danger, such as dodging attacks.
                    </div>
                </div>
                <div className="listSubtlety">Subtlety: <br/>+{calculatedState.subtlety}<br/>
                    <div className="listDesc">
                        <div className="text-center underline">(Focus + Precision)/2</div> A creature's ability to conceal themselves or their actions from other creatures.
                    </div>
                </div>
                <div className="listTenacity">Tenacity: <br/>+{calculatedState.tenacity}<br/>
                    <div className="listDesc">
                        <div className="text-center underline">(Fitness + Focus)/2</div> A creature's ability to resist changes made against them, such as poison or spell effects.
                    </div>
                </div>
                <div className="listMisc">
                    <div className="text-center">Other Values</div>
                    Maximum Mana: {calculatedState.manaMax} <br/> 
                    Spell Capacity: {calculatedState.spellCapacity} <br/> 
                    Wound Tolerance: {calculatedState.woundsMax}
                </div>
            </div>
        </div>
    )
}