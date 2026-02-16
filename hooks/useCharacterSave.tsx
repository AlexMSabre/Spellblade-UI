import axios from "axios";

export default function useCharacterSave() {
    const response = axios({
        method: 'post',
        url: "http://localhost:8080/graphql",
        data: {
            query: 'Query($character: inputCharacter) { createCharacter(character: $character) { name aspectLevel aspects1 aspects2 specialty1 specialty2 ancestryTrait ancestryName accountId baseFitness baseTechnique baseFocus baseSense gold silver copper}}',
            variables: {
                "character":{
                    "name": "Jeff",
                    "accountId": "123b2v242v3",
                    "aspectLevel": 1,
                    "specialty1": 1,
                    "specialty2": 2,
                    "aspects1":1001,
                    "aspects2":1100,
                    "ancestryName":"goblin",
                    "ancestryTrait": 1,
                    "baseFitness": 2,
                    "baseTechnique": 3,
                    "baseFocus": 1,
                    "baseSense": 4,
                    "gold": 2,
                    "silver":6,
                    "copper": 22
                }
            }
        }
    })

    return response;
}