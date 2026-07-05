import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useGetCharacterStateById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($id: String){
    getCharacterStateById(id: $id){
        id characterId hitPointsMax hitPoints armorMax armorMin armor manaMax manaPoints evasionBonus hexResistBonus movementBonus encumbrance fitnessBonus techniqueBonus focusBonus senseBonus inactiveEffects activeEffects
    }
}`,
        variables: { "characterId": characterId }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ec2-3-21-168-246.us-east-2.compute.amazonaws.com:8443/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config)

}
