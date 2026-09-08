import { InventoryDAO} from "@/types/itemTypes";
import "./preview.css";
import { CalculatedState, Character } from "@/types/characterTypes";
import { SpellDAO } from "@/types/spellTypes";
import inventoryPanel from "../sheet/inventoryPanel";
import mainPanel from "../sheet/mainPanel";
import spellPanel from "../sheet/spellPanel";


export default function preveiw(character : Character, characterState : CalculatedState, characterInventory : InventoryDAO[], characterSpells : SpellDAO[]) {

    function placeHolder() {

    }

    return (
    <div className="preview">
        <div className="panel">{inventoryPanel(characterInventory, placeHolder, true)}</div>
        <div className="panel">{mainPanel(character, placeHolder, characterState, placeHolder)}</div>
        <div className="panel">{spellPanel(characterState, characterSpells)}</div>
    </div>
)
}