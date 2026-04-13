import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useCharacterById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($characterId: String) {
   characterById(characterId: $characterId) {
    character {id userId name aspectLevel  aspects1 aspects2 specialty1 specialty2 ancestryTrait ancestryName baseFitness baseTechnique baseFocus baseSense proficiencies gold silver copper}
    inventory { inventory {id characterId itemId equipped proficiency quantity} item {id name itemType size equippable size weight description1 description2 description3 attack1String attack2String attack3String effectId baseCost rarity}
    }
  }
}`,
        variables: { "characterId": "69dbcd6128827027b2ab8b40" }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config);
}