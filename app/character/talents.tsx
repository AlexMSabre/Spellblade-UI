import { useEffect, useState } from "react";
import { Character } from "@/types/characterTypes";
import { Button } from "@/components/ui/button";

const talentList = ["Assassination", "Counteraction","Covenant","Dueling","Elemental","Fabrication","Occult","Psychic","Somatic","Theatrics","Vanguarding","Wayfaring"];

export default function talents(character:Character,setCharacterData:Function) {
    const [talentSelection, setTalentSelection] = useState(true);
    const [readySelection, setReadySelection] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [talent1, setTalent1] = useState("");
    const [talent2, setTalent2] = useState("");

    const setTalent = (e:string)=> {
        if (e == talent1) {
            setCharacterData((prev: any) => ({
            ...prev,
            attributes1: "",
            talent1: ""
            }))
            setTalentSelection(true);
            setTalent1("");
        }
        else if (e == talent2) {
            setCharacterData((prev: any) => ({
            ...prev,
            attributes2: "",
            talent2: ""
            }))
            setReadySelection(false);
            setTalent2("");
        }
        else if (talentSelection) {
            setCharacterData((prev: any) => ({
            ...prev,
            talent1: e
            }))
            setTalentSelection(false);
            setTalent1(e);
        }
        else if (!readySelection) {
            setCharacterData((prev: any) => ({
            ...prev,
            talent2: e
            }))
            setReadySelection(true);
            setTalent2(e);
        }

    }

    const buttonReturn = ()=> {
        setShowSelected(false);
    }


    return (
    <div className="talents">
        <div className="talent1">
            { !showSelected ? (
                <div className="talentSelect">
                <div className="buttonCol1">
                    <div className="choice" onClick={()=>{ setTalent("Assassination")}}>
                        {!((talent1 == "Assassination")||(talent2 == "Assassination")) ? (
                            <div>
                                Assassination Front
                            </div>
                        ): (<div className="cardBack">
                            Assassination Back
                        </div>)}
                    </div>
                    <div className="choice" onClick={()=>{ setTalent("Elemental") }}>
                        {!((talent1 == "Elemental")||(talent2 == "Elemental")) ? (
                            <div>
                                Elemental Front
                            </div>
                        ): (<div className="cardBack">
                            Elemental Back
                        </div>)}
                    </div>

                    <div className="choice" onClick={()=>{ setTalent("Somatic") }}>
                        {!((talent1 == "Somatic")||(talent2 == "Somatic")) ? (
                            <div>
                                Somatic Front
                            </div>
                        ): (<div className="cardBack">
                            Somatic Back
                        </div>)}
                    </div>
                </div>
                <div className="buttonCol2">
                    <div className="choice" onClick={()=>{ setTalent("Counteraction") }}>
                        {!((talent1 == "Counteraction")||(talent2 == "Counteraction")) ? (
                            <div>
                                Counteraction Front
                            </div>
                        ): (<div className="cardBack">
                            Counteraction Back
                        </div>)}
                    </div>

                    <div className="choice" onClick={()=>{ setTalent("Fabrication") }}>
                        {!((talent1 == "Fabrication")||(talent2 == "Fabrication")) ? (
                            <div>
                                Fabrication Front
                            </div>
                        ): (<div className="cardBack">
                            Fabrication Back
                        </div>)}
                    </div>

                    <div className="choice" onClick={()=>{ setTalent("Theatrics") }}>
                        {!((talent1 == "Theatrics")||(talent2 == "Theatrics")) ? (
                            <div>
                                Theatrics Front
                            </div>
                        ): (<div className="cardBack">
                            Theatrics Back
                        </div>)}
                    </div>
                </div>
                <div className="buttonCol3">
                    <div className="choice" onClick={()=>{ setTalent("Covenant") }}>
                        {!((talent1 == "Covenant")||(talent2 == "Covenant")) ? (
                            <div>
                                Covenant Front
                            </div>
                        ): (<div className="cardBack">
                            Covenant Back
                        </div>)}
                    </div>
                    <div className="choice" onClick={()=>{ setTalent("Occult") }}>
                        {!((talent1 == "Occult")||(talent2 == "Occult")) ? (
                            <div>
                                Occult Front
                            </div>
                        ): (<div className="cardBack">
                            Occult Back
                        </div>)}
                    </div>
                    <div className="choice" onClick={()=>{ setTalent("Vanguarding") }}>
                        {!((talent1 == "Vanguarding")||(talent2 == "Vanguarding")) ? (
                            <div>
                                Vanguarding Front
                            </div>
                        ): (<div className="cardBack">
                            Vanguarding Back
                        </div>)}
                    </div>
                </div>
                <div className="buttonCol4">
                    <div className="choice" onClick={()=>{ setTalent("Dueling") }}>
                        {!((talent1 == "Dueling")||(talent2 == "Dueling")) ? (
                            <div>
                                Dueling Front
                            </div>
                        ): (<div className="cardBack">
                            Dueling Back
                        </div>)}
                    </div>

                    <div className="choice" onClick={()=>{ setTalent("Psychic") }}>
                        {!((talent1 == "Psychic")||(talent2 == "Psychic")) ? (
                            <div>
                                Psychic Front
                            </div>
                        ): (<div className="cardBack">
                            Psychic Back
                        </div>)}
                    </div>

                    <div className="choice" onClick={()=>{ setTalent("Wayfaring") }}>
                        {!((talent1 == "Wayfaring")||(talent2 == "Wayfaring")) ? (
                            <div>
                                Wayfaring Front
                            </div>
                        ): (<div className="cardBack">
                            Wayfaring Back
                        </div>)}
                    </div>
                </div>
            </div>
            ): (
            <div className="selected">
                <div className="return" onClick={buttonReturn}>
                    Return
                </div>
                <div className="description">
                    { talent1 }
                </div>
                <div className="stats">
                    { talent2 }
                </div>
            </div>)}
        </div>
        <Button onClick={()=>{ setShowSelected((!talentSelection)&&(readySelection))}}>
            View Details
        </Button>
    </div>
)
}