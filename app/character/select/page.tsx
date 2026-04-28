"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCharacterByAccId } from "@/hooks/useCharacterByAccId";
import { Character } from "@/types/characterTypes";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useEffect, useState } from "react";

export default function characterSelect() {

    const [characterList, setCharacterList] = useState<Character[]>([]);
    //gets the user data, bounces them if they aren't signed in
    const { user, loading } = useAuth({ ensureSignedIn: true });
    const [characterLoad, setCharacterLoad] = useState(false);


    //gets all the characters associated with the user
    useEffect(() => {
        if (user) {
            useCharacterByAccId(user.id).then((result) => {
                setCharacterList(result.data.charactersByUserId);
                console.log(result);
            });
        }

    }, [user]);

    useEffect(() => {
        setCharacterLoad(true);
    }, [characterList]);

    if (!characterLoad) { return (<p>Is loading</p>) };


    return (
        <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Aspect Level</TableHead>
                        <TableHead>talent 1</TableHead>
                        <TableHead>talent 2</TableHead>
                        <TableHead>Ancestry Name</TableHead>
                        <TableHead>Fitness</TableHead>
                        <TableHead>Tech</TableHead>
                        <TableHead>Focus</TableHead>
                        <TableHead>Sense</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* dynamically stuffs each character into a table.  needs to be changed to a set of cards or sum */}
                    {characterLoad && characterList?.map((character) => (
                        <TableRow key={character.name}>
                            <TableCell><a href={"http://localhost:3000/character/sheet?id="+character.id}>{character.name}</a></TableCell>
                            <TableCell>{character.aspectLevel}</TableCell>
                            <TableCell>{character.talent1}</TableCell>
                            <TableCell>{character.talent2}</TableCell>
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