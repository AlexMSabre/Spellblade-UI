import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { useState } from "react";
import { emptyItem, Item } from "@/types/itemTypes";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


const alchemistPack = [];
const hunterPack = [];
const adventurerPack = [];

const healthPotion = {...emptyItem};
healthPotion.name = "Health Potion";
healthPotion.itemType = "Potion";
healthPotion.description = "Target creature restores 4d4 hit points.";
const torch = {...emptyItem};
torch.name = "Torch";
torch.itemType = "Equipment";
torch.description = "Equipment used to provide illumination for up to 15m when lit.";
const rope = {...emptyItem};
rope.name = "Rope";
rope.itemType = "Equipment";
rope.description = "Woven hemp that can be used to climb, secure an object, or restrain a creature. DC 15 Dexterity to escape.";
const grapplingHook = {...emptyItem};
grapplingHook.name = "Grappling Hook";
grapplingHook.itemType = "Tool";
grapplingHook.description = "A tool used to climb up to 8m.";

const itemList = [healthPotion, torch, rope, grapplingHook];


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
}


export default function equipment() {

    const [inventory, setInventory] = useState(itemList);
    const [inventoryDivs, setInventoryDivs] = useState(makeInventoryRows(inventory));

    function makeInventoryRows(inventoryList: Item[]) {
        return (
            <TableBody>
                {inventoryList.map((item: Item) => (
                    <TableRow key={item.name}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="w-[75px]"><Input placeholder="1"/></TableCell>
                        <TableCell>{item.itemType}</TableCell>
                        <TableCell className="w-[300px] whitespace-normal break-words text-left">{item.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    const inventoryRows = makeInventoryRows(itemList);

    return (
    <div className="equipment">
        <div className="inventory">
            Inventory
            <Field className="Starting Pack">
                <FieldLabel>Pack Choice</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Starting Pack"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose Ancestry</SelectLabel>
                            <SelectItem value="1">0</SelectItem>
                            <SelectItem value="2">1</SelectItem>
                            <SelectItem value="3">2</SelectItem>
                            <SelectItem value="4">3</SelectItem>
                            <SelectItem value="5">4</SelectItem>
                            <SelectItem value="6">4</SelectItem>
                            <SelectItem value="7">4</SelectItem>
                            <SelectItem value="8">4</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <div className="inventoryHeader">
                <div className="currency">
                    currency
                </div>
                <div className="supplies">
                    supplies
                </div>
                <div className="reagents">
                    reagents
                </div>
                <div className="materials">
                    materials
                </div>
                <div className="innerwear">
                    innerwear
                    <Field className="Innerwear">
                        <FieldLabel>Innerwear Choice</FieldLabel>
                        <Select>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select Innerwear"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Choose Innerwear</SelectLabel>
                                    <SelectItem value="1">0</SelectItem>
                                    <SelectItem value="2">1</SelectItem>
                                    <SelectItem value="3">2</SelectItem>
                                    <SelectItem value="4">3</SelectItem>
                                    <SelectItem value="5">4</SelectItem>
                                    <SelectItem value="6">4</SelectItem>
                                    <SelectItem value="7">4</SelectItem>
                                    <SelectItem value="8">4</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <div className="outerwear">
                    outerwear
                    <Field className="Outerwear">
                        <FieldLabel>Outerwear Choice</FieldLabel>
                        <Select>
                            <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Outerwear"/>
                        </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Choose Outerwear</SelectLabel>
                                    <SelectItem value="1">0</SelectItem>
                                    <SelectItem value="2">1</SelectItem>
                                    <SelectItem value="3">2</SelectItem>
                                    <SelectItem value="4">3</SelectItem>
                                    <SelectItem value="5">4</SelectItem>
                                    <SelectItem value="6">4</SelectItem>
                                    <SelectItem value="7">4</SelectItem>
                                    <SelectItem value="8">4</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                     </Field>
                </div>
            </div>

            <div>
                Inventory
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px] text-center">Item Name</TableHead>
                            <TableHead className="w-[50px] text-center">Qty</TableHead>
                            <TableHead className="text-center">Item Type</TableHead>
                            <TableHead className="text-center">Description</TableHead>
                            <TableHead className="text-center">Weight</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <ScrollArea>
                    <Table>
                        {inventoryRows}
                    </Table>
                </ScrollArea>
            </div>
        </div>
        <div className="proficiencies">
            Proficiency 1
            <Field className="WeaponClass">
                <FieldLabel>Weapon Class Choice</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Weapon Class"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose Outerwear</SelectLabel>
                            <SelectItem value="1">0</SelectItem>
                            <SelectItem value="2">1</SelectItem>
                            <SelectItem value="3">2</SelectItem>
                            <SelectItem value="4">3</SelectItem>
                            <SelectItem value="5">4</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Field className="WeaponList">
                <FieldLabel>Outerwear Choice</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Weapon"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose Outerwear</SelectLabel>
                            <SelectItem value="1">0</SelectItem>
                            <SelectItem value="2">1</SelectItem>
                            <SelectItem value="3">2</SelectItem>
                            <SelectItem value="4">3</SelectItem>
                            <SelectItem value="5">4</SelectItem>
                            <SelectItem value="6">4</SelectItem>
                            <SelectItem value="7">4</SelectItem>
                            <SelectItem value="8">4</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            Proficiency 2
            <Field className="WeaponClass">
                <FieldLabel>Weapon Class Choice</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Weapon Class"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose Outerwear</SelectLabel>
                            <SelectItem value="1">0</SelectItem>
                            <SelectItem value="2">1</SelectItem>
                            <SelectItem value="3">2</SelectItem>
                            <SelectItem value="4">3</SelectItem>
                            <SelectItem value="5">4</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Field className="WeaponList">
                <FieldLabel>Outerwear Choice</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Weapon"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose Outerwear</SelectLabel>
                            <SelectItem value="1">0</SelectItem>
                            <SelectItem value="2">1</SelectItem>
                            <SelectItem value="3">2</SelectItem>
                            <SelectItem value="4">3</SelectItem>
                            <SelectItem value="5">4</SelectItem>
                            <SelectItem value="6">4</SelectItem>
                            <SelectItem value="7">4</SelectItem>
                            <SelectItem value="8">4</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            Proficiency 3
            <Field className="WeaponClass">
                <FieldLabel>Weapon Class Choice</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Weapon Class"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose Outerwear</SelectLabel>
                            <SelectItem value="1">0</SelectItem>
                            <SelectItem value="2">1</SelectItem>
                            <SelectItem value="3">2</SelectItem>
                            <SelectItem value="4">3</SelectItem>
                            <SelectItem value="5">4</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Field className="WeaponList">
                <FieldLabel>Outerwear Choice</FieldLabel>
                <Select>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Weapon"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose Outerwear</SelectLabel>
                            <SelectItem value="1">0</SelectItem>
                            <SelectItem value="2">1</SelectItem>
                            <SelectItem value="3">2</SelectItem>
                            <SelectItem value="4">3</SelectItem>
                            <SelectItem value="5">4</SelectItem>
                            <SelectItem value="6">4</SelectItem>
                            <SelectItem value="7">4</SelectItem>
                            <SelectItem value="8">4</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </div>
        <div className="search">
            <div>
                Item Search
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px] text-center">Item Name</TableHead>
                        <TableHead className="w-[50px] text-center">Qty</TableHead>
                        <TableHead className="text-center">Item Type</TableHead>
                        <TableHead className="text-center">Description</TableHead>
                        <TableHead className="text-center">Weight</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </div>
    </div>
)
}