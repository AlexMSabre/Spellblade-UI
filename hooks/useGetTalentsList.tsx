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
        url: 'https://ec2-18-226-97-249.us-east-2.compute.amazonaws.com:8443/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios.request(config);
}
