import { CharacterState } from '@/types/characterTypes';
import axios from 'axios';

export const useAddEffect = async (effectName: string, state: CharacterState) => {
let data = JSON.stringify({
  query: `query Query($CharacterState: inputCharacterState, $effectName: String){
    addEffect(effectName: $effectName, state: $CharacterState){
        characterState { id characterId hitPoints armor manaPoints inactiveEffects activeEffects}
        calculatedState {characterId hitPointsMax hitPoints armorMax armorMin armor manaMax manaPoints evasion hexResist movement encumbrance fitness technique focus sense wounds woundsMax }
    }
}`,
  variables: {"CharacterState": state, "effectName":effectName}
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/graphql',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

    return await axios.request(config);
}
