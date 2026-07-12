import axios from "axios";

//calls the endpoint to save the character
export const useWeaponList = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
   getWeaponList {
    id name itemType size equippable size weight description properties attack1String attack2String effectName baseCost rarity
  }
}`,
        variables: {}
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://spellblade-load-balancers-1960527954.us-east-2.elb.amazonaws.com:443/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config);
}
