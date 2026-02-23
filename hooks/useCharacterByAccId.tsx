import Character from "@/types/characterTypes";
import axios from "axios";

export const useCharacterByAccId = async (userId: String) => {
    const data = await axios({
        method: 'post',
        url: "http://localhost:8080/graphql",
        data: {
            query: 'query Query($userId: String) { charactersByAccId(userId: $userId) {id userId name aspectLevel  aspects1 aspects2 specialty1 specialty2 ancestryTrait ancestryName baseFitness baseTechnique baseFocus baseSense gold silver copper}}',
            variables: {
                userId
            }
        }
    }).then(response => {
    const {data} = response;

    return data;
    });

    return data.data
}