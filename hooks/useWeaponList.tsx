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
        url: 'ec2-13-59-16-57.us-east-2.compute.amazonaws.com:8080/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config);
}
