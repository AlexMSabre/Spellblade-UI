import { Character, CharacterState } from '@/types/characterTypes';
import axios from 'axios';

export const useCalculateState = async (state: CharacterState, character: Character) => {
    let data = JSON.stringify({
        query: `query Query($state: inputCharacterState, $character: inputCharacterObject){
    calculateState(state: $state, character: $character){
        characterId hitPointsMax hitPoints armorMax armorMin armor manaMax manaPoints evasion hexResist movement encumbrance fitness technique focus sense wounds woundsMax 
    }
}`,
        variables: {"state": state, "character": character}
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://ec2-3-21-168-246.us-east-2.compute.amazonaws.com:8443/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config)
}
