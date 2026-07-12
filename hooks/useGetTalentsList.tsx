import axios from "axios";

//calls the endpoint to save the character
export const getTalentsList = async () => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query {
               getTalentsList  
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
