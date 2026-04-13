import { Character } from "@/types/characterTypes";
import { InventoryDAO } from "@/types/itemTypes";
import axios from "axios";

//calls the endpoint to save the character
export const useCharacterSave = async (character: Character, inventoryData: InventoryDAO[]) => {

    const characterDAO = {
        character: character,
        inventory: inventoryData
    }

    let result = await axios({
        method: 'post',
        url: 'http://localhost:8080/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            query: `query Query($characterDAO: inputCharacterDAO) {saveCharacter(characterDAO: $characterDAO) {character {id userId name aspectLevel  aspects1 aspects2 specialty1 specialty2 ancestryTrait ancestryName baseFitness baseTechnique baseFocus baseSense proficiencies gold silver copper}
    inventory { inventory {id characterId itemId equipped proficiency quantity} item {id name itemType size equippable size weight description1 description2 description3 attack1String attack2String attack3String effectId baseCost rarity}}}}`,
            variables: {characterDAO}
        }
    });

    return result
}
