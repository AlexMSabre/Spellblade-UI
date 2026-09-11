"use client";
import appHeader from "@/components/appHeader";
import { useCharacterByAccId } from "@/hooks/useCharacterByAccId";
import { Character } from "@/types/characterTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "./page.css";
import { useDeleteCharacter } from "@/hooks/useDeleteCharacter";
import { useRouter } from "next/navigation";

export default function characterSelect() {

  const [characterList, setCharacterList] = useState<Character[]>([]);
  //gets the user data, bounces them if they aren't signed in

  const { data: session, status } = useSession({ required: true });
  const [characterLoad, setCharacterLoad] = useState(false);
  const [deleteQueue, setDeleteQueue] = useState("");
  const router = useRouter();

  function confirmDelete() {
    useDeleteCharacter(deleteQueue || "").then((data)=>{
      if(data.data.data.deleteCharacter==true){
        setCharacterList(characterList.filter(i=>i.id!=deleteQueue))
      }
    });
    setDeleteQueue("");
  }

  //gets all the characters associated with the user
  useEffect(() => {
    let user = session?.user

    if (user) {
      useCharacterByAccId(user.id).then((result) => {
        setCharacterList(result.data.charactersByUserId);
      });
    }

  }, [session]);

  useEffect(() => {
    setCharacterLoad(true);
  }, [characterList]);

  function openCharacter(place: string) {
    router.push(place);
  }

  if (status != "authenticated") { return (<p>Is loading</p>) };


  return (
    <div>
      <main className="main">
        {appHeader(session, status)}
        <div className="page">
          <div className="utilityPanel">
            <button className="newCharacter" onClick={()=>openCharacter("/character/builder")}>
              New Character
            </button>
          </div>
          <div className="myCharactersContainer">
            <div className="myChars">My Characters</div>
            {characterLoad && characterList?.map((character) => (
              <button className="characterCard" key={character.id}>
                <div className="cardName" onClick={()=>openCharacter("/character/sheet?id=" + character.id)}>{character.name}</div>
                <div className="cardLevel" onClick={()=>openCharacter("/character/sheet?id=" + character.id)}>Level {character.attributeLevel}</div>
                <div className="cardAncestry" onClick={()=>openCharacter("/character/sheet?id=" + character.id)}>{character.ancestry.name}</div>
                <div className="cardTalent1" onClick={()=>openCharacter("/character/sheet?id=" + character.id)}>{character.talent1.name}</div>
                <div className="cardTalent2" onClick={()=>openCharacter("/character/sheet?id=" + character.id)}>{character.talent2.name}</div>
                <details className="cardSettings">
                  <summary>
                    O
                  </summary>
                  <div>
                    Modify <br/> Duplicate <br/>
                    <div className="deleteChar" onClick={()=>setDeleteQueue(character.id || "")}>Delete</div>
                  </div>
                </details>
              </button>
            ))}
          </div>
          <div className="confirmDelete" hidden={deleteQueue == ""}>
            <div className="interface">
              Are you sure? <br/>
              <button onClick={()=>confirmDelete()}> Yeah </button> <br/>
              <button onClick={()=>setDeleteQueue("")}> Nah </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}