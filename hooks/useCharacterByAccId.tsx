import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useCharacterByAccId = async (userId: String) => {
    const data = await axios({
        method: 'post',
        url: "https://spellblade-load-balancers-1960527954.us-east-2.elb.amazonaws.com:443/graphql",
        data: {
            query: 'query Query($userId: String) { charactersByUserId(userId: $userId) {id userId name attributeLevel attribute1 attribute2 talent1 talent2 ancestryTrait ancestryName baseFitness baseTechnique baseFocus baseSense size}}',
            variables: {
                userId
            }
        }
    });

    return data.data
}