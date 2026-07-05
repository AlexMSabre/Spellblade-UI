import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useFullCharacterById = async (characterId: String) => {
    let data = JSON.stringify({
        query: `query Query($characterId: String) {
    fullCharacterById(characterId: $characterId) {
        character {id name attributeLevel talent1 talent2 ancestryTrait ancestryName baseFitness baseTechnique baseFocus baseSense proficiencies size}
        inventory { inventory {itemId equipped quantity} item {id name itemType size equippable size weight description properties attack1String attack2String effectName baseCost rarity}}
        attributes { id name talentName flag description }
        talents { id name ability1 ability2 description hpBonus prioritySkills role complexity keystone capstone}
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
        url: 'https://ec2-3-21-168-246.us-east-2.compute.amazonaws.com:8443/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config);
}