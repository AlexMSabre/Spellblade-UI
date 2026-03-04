"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCharacterByAccId } from "@/hooks/useCharacterByAccId";
import Character from "@/types/characterTypes";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useEffect, useState } from "react";

export default function characterSelect() {

    const [characterList, setCharacterList] = useState<Character[]>([]);
    const { user, loading } = useAuth({ ensureSignedIn: true });

    useEffect(() => {
        if (user) {
            useCharacterByAccId(user.id).then((result) => {
                setCharacterList(result.charactersByAccId);
            });
        }

    })


    return (
        <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Aspect Level</TableHead>
                        <TableHead>Specialty 1</TableHead>
                        <TableHead>Specialty 2</TableHead>
                        <TableHead>Ancestry Name</TableHead>
                        <TableHead>Fitness</TableHead>
                        <TableHead>Tech</TableHead>
                        <TableHead>Focus</TableHead>
                        <TableHead>Sense</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {characterList.map((character) => (
                        <TableRow key={character.name}>
                            <TableCell>{character.name}</TableCell>
                            <TableCell>{character.aspectLevel}</TableCell>
                            <TableCell>{character.specialty1}</TableCell>
                            <TableCell>{character.specialty2}</TableCell>
                            <TableCell>{character.ancestryName}</TableCell>
                            <TableCell>{character.baseFitness}</TableCell>
                            <TableCell>{character.baseTechnique}</TableCell>
                            <TableCell>{character.baseFocus}</TableCell>
                            <TableCell>{character.baseSense}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>

            </Table>
        </div>
    )
}