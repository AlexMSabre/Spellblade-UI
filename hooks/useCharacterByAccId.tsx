import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useCharacterByAccId = async (userId: String) => {
    const data = await axios({
        method: 'post',
        url: "http://localhost:8080/graphql",
        data: {
            query: 'query Query($userId: String) { charactersByUserId(userId: $userId) {id userId name aspectLevel  aspects1 aspects2 talent1 talent2 ancestryTrait ancestryName baseFitness baseTechnique baseFocus baseSense gold silver copper}}',
            variables: {
                userId
            }
        }
    });

    return data.data
}