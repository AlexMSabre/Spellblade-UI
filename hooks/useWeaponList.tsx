import Character from "@/types/characterTypes";
import axios from "axios";

//calls the endpoint to save the character
export const useWeaponList = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
   getWeaponList {
    id name itemType size equippable size weight description1 description2 description3 attack1String attack2String attack3String effectId baseCost rarity
  }
}`,
        variables: {}
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
