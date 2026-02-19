import Character from "@/types/characterTypes";
import axios from "axios";

export const useCharacterSave = async (character: Character) => {
    const data = await axios({
        method: 'post',
        url: "http://localhost:8080/graphql",
        data: {
            query: 'query Query($character: inputCharacterDAO) { createCharacter(characterDAO: $character) { id name aspectLevel aspects1 aspects2 specialty1 specialty2 ancestryTrait ancestryName accountId baseFitness baseTechnique baseFocus baseSense gold silver copper}}',
            variables: {
                character
            }
        }
    }).then(response => {
    const {data} = response;

    return data;
    });

    return data.data
}