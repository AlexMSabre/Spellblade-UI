import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useFullCharacterById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($characterId: String) {
    fullCharacterById(characterId: $characterId) {
        character {id name aspectLevel talent1 talent2 ancestryTrait ancestryName baseFitness baseTechnique baseFocus baseSense proficiencies size}
        inventory { inventory {itemId equipped proficiency quantity} item {id name itemType size equippable size weight description1 description2 description3 attack1String attack2String attack3String effectName baseCost rarity}}
        aspects { id name talentName flag description }
        talents { id name abilities description hpBonus prioritySkills role complexity keystone capstone}
        proficiencies { item {name} mastery}
        characterState { id characterId hitPoints armor manaPoints activeEffects inactiveEffects }
        calculatedState { hitPointsMax hitPoints armorMax armorMin armor manaMax manaPoints evasion hexResist movement encumbrance fitness technique focus sense wounds woundsMax}
   }
  }`,
        variables: { "characterId": characterId }
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