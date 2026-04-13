"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCharacterById } from "@/hooks/useCharacterById";
import { Character } from "@/types/characterTypes";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

export default function characterSelect() {

    const [characterList, setCharacterList] = useState<Character[]>([]);
    //gets the user data, bounces them if they aren't signed in
    const { user } = useAuth({ ensureSignedIn: true });
    const [characterLoad, setCharacterLoad] = useState(false);

    const searchParams = useSearchParams();
    const searchId = searchParams.get('id')


    //gets all the characters associated with the user
    useEffect(() => {
        if (user && searchId !== null) {
            useCharacterById(searchId).then((result: { data: { charactersById: SetStateAction<Character[]>; }; }) => {
                setCharacterList(result.data.charactersById);
                console.log(result);
            });
        }
    }, [user]);

    useEffect(() => {
        setCharacterLoad(true);
        console.log(characterList);
    }, [characterList]);

    if (!characterLoad) { return (<p>Is loading</p>) };


    return (
        <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            
        </div>
    )
}