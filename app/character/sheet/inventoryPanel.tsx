import { emptyInventoryDAO, getInventoryItemQTY, InventoryDAO, unarmedInventoryDAO } from "@/types/itemTypes";
import { proficiencyTypes } from "@/types/Enums";
import { useEffect, useState } from "react";
// ShadUI
import { Toggle } from "@/components/ui/toggle";
import "./inventoryPanel.css"


const displayFilters = ["Supplies", "Currency"];

export default function inventoryPanel(characterInventory : InventoryDAO[], setInventory : Function, viewOnly = false) {
    const [expandInventory, setExpandInventory] = useState(true);
    const [equippedItem1, setEquippedItem1] = useState(getEquippedWeapon()[0]);
    const [equippedItem2, setEquippedItem2] = useState((getEquippedWeapon()[1] || unarmedInventoryDAO));
    var equippedInner = emptyInventoryDAO;
    var equippedOuter = emptyInventoryDAO;

    useEffect(()=>{
        setEquippedItem1(getEquippedWeapon()[0]);
        setEquippedItem2((getEquippedWeapon()[1] || unarmedInventoryDAO));
    },[characterInventory]);

    function changeItemQuantity(itemName: String, quantity: number) {
        if (!viewOnly) {
        let item = characterInventory.find(i=>i.item.name===itemName);
        if (item) {
            let index = characterInventory.indexOf(item)
            item.inventory.quantity = quantity;
            let newInventoryDAO = [...characterInventory];
            if (quantity <= 0 && !(item.item.itemType == "Currency" || item.item.itemType == "Supplies")) {
                newInventoryDAO.splice(index, 1);
            }
            else {
                newInventoryDAO.splice(index, 1, item);
            }
            setInventory(newInventoryDAO);
        }
        }
    }

    function toggleItemEquip(itemName: String) {
        if (!viewOnly) {
        let item = characterInventory.find(i=>i.item.name===itemName);
        if (item) {
            if (!(item.item.itemType == "Innerwear" && equippedInner != emptyInventoryDAO && !item.inventory.equipped) && !(item.item.itemType == "Outerwear" && equippedOuter != emptyInventoryDAO && !item.inventory.equipped)) {
                let index = characterInventory.indexOf(item)
                item.inventory.equipped = !item?.inventory.equipped;
                let newInventoryDAO = [...characterInventory];
                newInventoryDAO.splice(index, 1, item);
                setInventory(newInventoryDAO);
            } 
        }
        }
    }

    function toggleItemPinned(itemName: String) {
        if (!viewOnly) {
        let item = characterInventory.find(i=>i.item.name===itemName);
        if (item) {
            let index = characterInventory.indexOf(item)
            item.inventory.pinned = !item?.inventory.pinned;
            let newInventoryDAO = [...characterInventory];
            newInventoryDAO.splice(index, 1, item);
            setInventory(newInventoryDAO);
        }
        }
    }
    
    function makeInventoryRows() {
        return (
            <div className="itemTable">
                <details className="tableRow">
                    <summary className="tableSummary">
                        <div className="tableCellName">Name</div>
                        <div className="tableCellContent">Type</div>
                        <div className="tableCellContent">Quantity</div>
                        <div className="tableCellContent">Equip</div>
                        <div className="tableCellContent">Pin</div>
                    </summary>
                </details>
                {characterInventory.filter(i=>!displayFilters.includes(i.item.itemType)).map((item: InventoryDAO) => (
                    <details className="tableRow" key={item.item.name}>
                        <summary className="tableSummary">
                            <div className="tableCellName">{item.item.name}</div>
                            <div className="tableCellContent">{item.item.itemType}</div>
                            <div className="tableCellContent">{item.inventory.quantity}</div>
                            <div className="tableCellButton">
                                {item.item.equippable?
                                    (<Toggle variant="outline" pressed={item.inventory.equipped} onPressedChange={()=>toggleItemEquip(item.item.name)}>
                                        {item.inventory.equipped? "[X]": "[O]"}
                                    </Toggle>) : (
                                    <div>/</div>
                                )}
                            </div>
                            <div className="tableCellButton">
                                <Toggle variant="outline" pressed={item.inventory.pinned} onPressedChange={()=>toggleItemPinned(item.item.name)}>
                                    {item.inventory.pinned? "[X]": "[O]"}
                                </Toggle>
                            </div>
                        </summary>
                        <div className="tableCellDesc">
                            Quantity: <button onClick={()=>changeItemQuantity(item.item.name, item.inventory.quantity-1)} className="tableCellButton">-</button>
                            <input value={item.inventory.quantity || "N/A"} onChange={(e)=>{changeItemQuantity(item.item.name, Number(e.target.value || item.inventory.quantity))}} className="tableCellInput"/> 
                            <button onClick={()=>changeItemQuantity(item.item.name, item.inventory.quantity+1)} className="tableCellButton">+</button> | Rarity: {item.item.rarity} | Weight: {item.item.weight} <br/>
                            {item.item.description}
                        </div>
                    </details>
                ))}
            </div>
        )
    }

    function makePinnedRows() {
        return (
            <div className="pinnedTable">
                <details className="tableRow">
                        <summary className="pinnedSummary">
                            <div className="tableCellName">Name</div>
                            <div className="tableCellContent">Qty</div>
                            <div className="tableCellContent">Eq</div>
                            <div className="tableCellContent">Pin</div>
                        </summary>
                </details>
                {characterInventory.filter(i=>!displayFilters.includes(i.item.itemType) && i.inventory.pinned).map((item: InventoryDAO) => (
                    <details className="tableRow" key={item.item.name}>
                        <summary className="pinnedSummary">
                            <div className="tableCellName">{item.item.name}</div>
                            <div className="tableCellContent">{item.inventory.quantity}</div>
                            <div className="tableCellButton">
                                {item.item.equippable?
                                    (<Toggle variant="outline" pressed={item.inventory.equipped} onPressedChange={()=>toggleItemEquip(item.item.name)} className="w-[20px] hover:bg-gray">
                                        {item.inventory.equipped? "[X]": "[O]"}
                                    </Toggle>) : (
                                    <div>/</div>
                                )}
                            </div>
                            <div className="tableCellButton">
                                <Toggle variant="outline" pressed={item.inventory.pinned} onPressedChange={()=>toggleItemPinned(item.item.name)}>
                                    {item.inventory.pinned? "[X]": "[O]"}
                                </Toggle>
                            </div>
                        </summary>
                        <div className="tableCellDesc">
                            Quantity: <button onClick={()=>changeItemQuantity(item.item.name, item.inventory.quantity-1)} className="tableCellButton">-</button>
                            <input value={item.inventory.quantity || "0"} onChange={(e)=>{changeItemQuantity(item.item.name, Number(e.target.value || item.inventory.quantity))}} className="tableCellInput"/> 
                            <button onClick={()=>changeItemQuantity(item.item.name, item.inventory.quantity+1)} className="tableCellButton">+</button> Rarity: {item.item.rarity} <br/>
                            {item.item.description}
                        </div>
                    </details>
                ))}
            </div>
        )
    }

    function getEquippedWeapon() {
        let inventoryDAOs = characterInventory.filter(i=>i.inventory.equipped==true);
        let items = inventoryDAOs.filter((e)=>proficiencyTypes.some((f)=>e.item.itemType.includes(f)));
        if (items.length == 0) {
            return [unarmedInventoryDAO];
        }
        else return items;
    }

    function getEquippedInnerwear() {
        let inventoryDAOs = characterInventory.filter(i=>(i.item.itemType=="Innerwear"));
        let items = inventoryDAOs.filter(i=>i.inventory.equipped==true);
        if (items.length == 0) {
            equippedInner = emptyInventoryDAO;
            return emptyInventoryDAO;
        }
        
        else {
            equippedInner = items[0];
            return items[0];
        }
    }

    function getEquippedOuterwear() {
        let inventoryDAOs = characterInventory.filter(i=>(i.item.itemType=="Outerwear"));
        let items = inventoryDAOs.filter(i=>i.inventory.equipped==true);
        if (items.length == 0) {
            equippedOuter = emptyInventoryDAO;
            return emptyInventoryDAO;
        }
        else {
            equippedOuter = items[0];
            return items[0];
        }
    }

    return (
        <div className="invPanel">
            <div className="invTitle">
                Inventory
            </div>
            <button className="expand" onClick={()=>setExpandInventory(!expandInventory)}> Expand </button>
            {!expandInventory ? (makeInventoryRows()):(<div></div>)}
            <div className="currencies">
                <div className="currencyTotal">
                    Currency : {getInventoryItemQTY(characterInventory, "Platinum")*1000+getInventoryItemQTY(characterInventory, "Gold")*100+getInventoryItemQTY(characterInventory, "Silver")*10+getInventoryItemQTY(characterInventory, "Copper")}c
                </div>
                <div className="currencyDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Platinum"))} onChange={(e)=>changeItemQuantity("Platinum", Number(e.currentTarget.value))} className="lgInput"/>p
                    <div className="toolTip">Platinum</div>
                </div>
                <div className="currencyDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Gold"))} onChange={(e)=>changeItemQuantity("Gold", Number(e.currentTarget.value))} className="lgInput"/>g
                    <div className="toolTip">Gold</div>
                </div>
                <div className="currencyDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Silver"))} onChange={(e)=>changeItemQuantity("Silver", Number(e.currentTarget.value))} className="lgInput"/>s
                    <div className="toolTip">Silver</div>
                </div>
                <div className="currencyDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Copper"))} onChange={(e)=>changeItemQuantity("Copper", Number(e.currentTarget.value))} className="lgInput"/>c
                    <div className="toolTip">Copper</div>
                </div>
            </div>
            <div className="supplies">
                <div className="supplyTotal">
                    Supplies: {getInventoryItemQTY(characterInventory, "Food (kg)")} Day's Rations
                </div>
                <div className="supplyDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Food (kg)"))} onChange={(e)=>changeItemQuantity("Food (kg)", Number(e.currentTarget.value))} className="smInput"/>d Food
                    <div className="toolTip">Day's worth of food rations</div>
                </div>
                <div className="supplyDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Water (kg)"))} onChange={(e)=>changeItemQuantity("Water (kg)", Number(e.currentTarget.value))} className="smInput"/>d Water
                    <div className="toolTip">Day's worth of water rations</div>
                </div>
                <div className="supplyDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Healing Salve"))} onChange={(e)=>changeItemQuantity("Healing Salve", Number(e.currentTarget.value))} className="smInput"/> Salves
                    <div className="toolTip">Healing Salves</div>
                </div>
            </div>
            <div className="reagents">
                <div className="reagentTotal">
                    Reagents: {getInventoryItemQTY(characterInventory, "Ordinary Reagent") + getInventoryItemQTY(characterInventory, "Uncommon Reagent") + getInventoryItemQTY(characterInventory, "Rare Reagent") + getInventoryItemQTY(characterInventory, "Legendary Reagent")}
                </div>
                <div className="reagentDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Ordinary Reagent"))} onChange={(e)=>changeItemQuantity("Ordinary Reagent", Number(e.currentTarget.value))} className="smInput"/> Or
                    <div className="toolTip">Ordinary Reagents</div>
                </div>
                <div className="reagentDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Uncommon Reagent"))} onChange={(e)=>changeItemQuantity("Uncommon Reagent", Number(e.currentTarget.value))} className="smInput"/> Un
                    <div className="toolTip">Uncommon Reagents</div>
                </div>
                <div className="reagentDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Rare Reagent"))} onChange={(e)=>changeItemQuantity("Rare Reagent", Number(e.currentTarget.value))} className="smInput"/> Ra
                    <div className="toolTip">Rare Reagents</div>
                </div>
                <div className="reagentDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Legendary Reagent"))} onChange={(e)=>changeItemQuantity("Legendary Reagent", Number(e.currentTarget.value))} className="smInput"/> Le
                    <div className="toolTip">Legendary Reagents</div>
                </div>
            </div>
            <div className="materials">
                <div className="materialTotal">
                    Materials: {getInventoryItemQTY(characterInventory, "Ordinary Crafting Material") + getInventoryItemQTY(characterInventory, "Uncommon Crafting Material") + getInventoryItemQTY(characterInventory, "Rare Crafting Material") + getInventoryItemQTY(characterInventory, "Legendary Crafting Material")}
                </div>
                <div className="materialDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Ordinary Crafting Material"))} onChange={(e)=>changeItemQuantity("Ordinary Crafting Material", Number(e.currentTarget.value))} className="smInput"/> Or
                    <div className="toolTip">Ordinary Crafting Material</div>
                </div>
                <div className="materialDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Uncommon Crafting Material"))} onChange={(e)=>changeItemQuantity("Uncommon Crafting Material", Number(e.currentTarget.value))} className="smInput"/> Un
                    <div className="toolTip">Uncommon Crafting Material</div>
                </div>
                <div className="materialDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Rare Crafting Material"))} onChange={(e)=>changeItemQuantity("Rare Crafting Material", Number(e.currentTarget.value))} className="smInput"/> Ra
                    <div className="toolTip">Rare Crafting Material</div>
                </div>
                <div className="materialDesc">
                    <input type="text" inputMode="numeric" min="0" step="1" value={(getInventoryItemQTY(characterInventory, "Legendary Crafting Material"))} onChange={(e)=>changeItemQuantity("Legendary Crafting Material", Number(e.currentTarget.value))} className="smInput"/> Le
                    <div className="toolTip">Legendary Crafting Material</div>
                </div>
            </div>
            <div className="equip1">
                <div className="weaponName">{equippedItem1?.item.name || "None Equipped"}</div>
                <div className="weaponAttackName">{equippedItem1?.item.attack?.name || "Attack"}</div>
                <div className="weaponAttackCost">{(equippedItem1?.item.attack?.action + " Action") || "None"}</div>
                <div className="weaponAttackRange">{equippedItem1?.item.attack?.range || "None"}</div>
                <div className="weaponAttackEffect">{(equippedItem1?.item.attack?.damage + " " + equippedItem1?.item.attack?.damageType) || "None"}</div>
                <div className="weaponPropertyName">{equippedItem1?.item.special?.name || "None"}</div>
                <div className="weaponPropertyCost">{(equippedItem1?.item.special?.action  || "F") + "A"}</div>
                <div className="weaponPropertyEffect">{equippedItem1?.item.special?.description || "None"}</div>
                <div className="weaponSpecial">{equippedItem1?.item.properties || "None"}</div>
            </div>
            <div className="equip2">
                <div className="weaponName">{equippedItem2?.item.name || "None Equipped"}</div>
                <div className="weaponAttackName">{equippedItem2?.item.attack?.name || "None"}</div>
                <div className="weaponAttackCost">{(equippedItem2?.item.attack?.action + " Action") || "None"}</div>
                <div className="weaponAttackRange">{equippedItem2?.item.attack?.range || "None"}</div>
                <div className="weaponAttackEffect">{(equippedItem2?.item.attack?.damage + " " + equippedItem1?.item.attack?.damageType) || "None"}</div>
                <div className="weaponPropertyName">{equippedItem2?.item.special?.name || "None"}</div>
                <div className="weaponPropertyCost">{(equippedItem2?.item.special?.action  || "F") + "A"}</div>
                <div className="weaponPropertyEffect">{equippedItem2?.item.special?.description || "None"}</div>
                <div className="weaponSpecial">{equippedItem2?.item.properties || "None"}</div>
            </div>
            <div className="innerwear">
                <div className="innerName">{getEquippedInnerwear()?.item.name || "No Innerwear Equipped"}</div>
                <div className="innerDesc">{getEquippedInnerwear()?.item.description || "-"}</div>
            </div>
            <div className="outerwear">
                <div className="outerName">{getEquippedOuterwear()?.item.name || "No Outerwear Equipped"}</div>
                <div className="outerDesc">{getEquippedOuterwear()?.item.description || "-"}</div>
            </div>
            <div className="pinned">
                Pinned Items:
            </div>
            <div className="pinnedTable">
                {makePinnedRows()}
            </div>
        </div>
    )
}