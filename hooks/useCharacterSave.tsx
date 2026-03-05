import Character from "@/types/characterTypes";
import axios from "axios";

//calls the endpoint to save the character
export const useCharacterSave = async (character: Character) => {

    const data = await axios({
        method: 'post',
        url: "http://localhost:8080/graphql",
        data: {
            query: 'query Query($character: inputCharacterDAO) { createCharacter(characterDAO: $character) { id userId name aspectLevel aspects1 aspects2 specialty1 specialty2 ancestryTrait ancestryName baseFitness baseTechnique baseFocus baseSense gold silver copper}}',
            variables: {
                character
            }
        }
    });

    return data.data
}
