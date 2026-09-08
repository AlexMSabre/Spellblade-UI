import "./itemSearch.css";
import { InventoryDAO, Inventory, Item, emptyItem, getInventoryItemQTY } from "@/types/itemTypes";
import { useGetItemListByType } from "@/hooks/useGetItemListByType";
import { useEffect, useState } from "react";
import { Character } from "@/types/characterTypes";

const filterList = ["Ammunition", "Consumable", "Currency", "Deployable", "Magic Item", "Poison", "Potion", "Shield", "Spellcasting Tool", "Supplies", "Tool", "Weapon", "wear"];

export default function itemSearch(character : Character, inventory : InventoryDAO[], setInventory : Function) {
    const [itemList, setItemList] = useState<Item[]>([]);
    const [searchFilter, setSearchFilter] = useState<string>(filterList[0]);
    const [quantityMap, setQuantityMap] = useState(new Map());
    const [currencyItems, setCurrencyItems] = useState([emptyItem]);

    useEffect(()=>{
        useGetItemListByType("Currency").then((result)=>{
            setCurrencyItems(result.data.data.getItemListByType);
        })
    }, [])

    useEffect(()=>{
        useGetItemListByType(searchFilter).then((result)=>{
            setItemList(result.data.data.getItemListByType);
        })
    },[searchFilter])

    useEffect(()=>{
        var tempMap = new Map();
        itemList.forEach(item=>tempMap.set(item.name, 1));
        setQuantityMap(tempMap);
    },[itemList])

    function setItemQuantity(itemName: String, quantity: number) {
        if (quantity >= 1){
            var tempMap = new Map(quantityMap);
            tempMap.set(itemName, quantity);
            setQuantityMap(tempMap);
        }
    }

    function buyItem(item: Item) {
        var itemCost = item.baseCost * quantityMap.get(item.name);
        var playerGold = getInventoryItemQTY(inventory, "Gold");
        var playerSilver = getInventoryItemQTY(inventory, "Silver");
        var playerCopper = getInventoryItemQTY(inventory, "Copper");
        var goldCost = Math.floor(itemCost/100 % 100);
        var silverCost = Math.floor(itemCost/10 % 10);
        var copperCost = Math.floor(itemCost % 10);
        if (playerGold >= goldCost && playerSilver >= silverCost && playerCopper >= copperCost) {
            var newGoldItemDAO =   newItemDAO(currencyItems.find(i=>i.name=="Gold")   || emptyItem, playerGold - goldCost);
            console.log(currencyItems);
            var newSilverItemDAO = newItemDAO(currencyItems.find(i=>i.name=="Silver") || emptyItem, playerSilver - silverCost);
            var newCopperItemDAO = newItemDAO(currencyItems.find(i=>i.name=="Copper") || emptyItem, playerCopper - copperCost);

            var newInv = [...inventory];

            var goldIndex = newInv.findIndex(i=>i.item.name=="Gold");
            var silverIndex = newInv.findIndex(i=>i.item.name=="Silver");
            var copperIndex = newInv.findIndex(i=>i.item.name=="Copper");
            newInv.splice(goldIndex, 1, newGoldItemDAO);
            newInv.splice(silverIndex, 1, newSilverItemDAO);
            newInv.splice(copperIndex, 1, newCopperItemDAO);

            var newIndex = newInv.findIndex(i=>i.item.name===item.name);
            var oldQty = 0;
            if (newIndex != -1) {
                oldQty = newInv[newIndex].inventory.quantity;
            }

            var newBoughtItemDAO = newItemDAO(item, quantityMap.get(item.name) + oldQty);
            if (newIndex != -1) {
                newInv.splice(newIndex, 1, newBoughtItemDAO);
            }
            else {
                newInv.push(newBoughtItemDAO);
            }
            
            setInventory(newInv);
        }
    }

    function newItemDAO(item: Item, quantity: number, equipped = false, pinned = false) {
        let newInventory : Inventory = {
            id: null,
            characterId: character.id || null,
            itemId: item?.id || "",
            equipped: false,
            quantity: quantity,
            pinned: false
        };
        let newInventoryDAO : InventoryDAO = {
            inventory: newInventory,
            item: item || emptyItem
        }
        return newInventoryDAO;
    }

    function sendItemtoInventory(item: Item) {
        var readyQuantity = (quantityMap.get(item.name) || 0);
        var isEquipped = false;
        var isPinned = false;
        var index = -1;
        let currentInv : InventoryDAO[] = [];
        if (inventory.length > 0){
            currentInv = [...inventory];
            index = currentInv.findIndex(i=>(i.item.name === item.name));
        }
        if (index != -1) {
            readyQuantity = readyQuantity + currentInv[index].inventory.quantity;
            isEquipped = currentInv[index].inventory.equipped;
            isPinned = currentInv[index].inventory.pinned;
        }
        var newInventoryDAO = newItemDAO(item, readyQuantity);
        if (index != -1) {
            currentInv.splice(index, 1, newInventoryDAO);
        }
        else {
            currentInv.push(newInventoryDAO);
        }
        setInventory(currentInv);
    }

    function buildSearchTable(itemList : Item[]) {
        return (
            <div className="searchTable">
                <details className="searchTableRow">
                        <summary className="searchTableSummary">
                            <div className="tableCellName">Name</div>
                            <div className="tableCellContent">Type</div>
                            <div className="tableCellContent">Rarity</div>
                            <div className="tableCellContent">Weight</div>
                            <div className="tableCellContent">Cost</div>
                        </summary>
                </details>
                {itemList.map(item=>(
                    <details className="searchTableRow" key={item.name}>
                        <summary className="searchTableSummary">
                            <div className="tableCellName">{item.name}</div>
                            <div className="tableCellContent">{item.itemType}</div>
                            <div className="tableCellContent">{item.rarity}</div>
                            <div className="tableCellContent">{item.weight}</div>
                            <div className="tableCellContent">{item.baseCost}c</div>
                        </summary>
                        <div className="tableCellDesc">
                            Quantity: 
                            <button onClick={()=>setItemQuantity(item.name, quantityMap.get(item.name)-1)} className="searchCellButton">-</button>
                            <input value={quantityMap.get(item.name) || "N/A"} onChange={(e)=>setItemQuantity(item.name, Number(e.currentTarget.value) || quantityMap.get(item.name))} className="searchInput"/>
                            <button onClick={()=>setItemQuantity(item.name, quantityMap.get(item.name)+1)} className="searchCellButton">+</button>
                            <button onClick={()=>sendItemtoInventory(item)} className="searchCellButton">Add Item</button>
                            {<button onClick={()=>buyItem(item)} className="searchCellButton">Buy Item</button>}
                            <br/>
                            {item.description}
                        </div>
                    </details>
                ))}
            </div>
        )
    }
    function buildSearchFilterList() {
        return (
            <div className="searchFilter">
                <select onClick={(e)=>setSearchFilter(e.currentTarget.value)} defaultValue={filterList[0]}>
                    {filterList.map(filter=>(
                        <option key={filter} value={filter}>{filter}</option>
                    ))}
                </select>
            </div>
        )
    }

    return (
    <div className="itemSearch">
        <div className="searchTitle">
            Item Search
        </div>
        {buildSearchFilterList()}
        {buildSearchTable(itemList)}
    </div>
    )
}