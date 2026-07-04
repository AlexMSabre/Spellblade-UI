import axios from "axios";

//calls the endpoint to save the character
export const useProficiencyNames = async (proficiencies: String) => {

    const axios = require('axios');
    let data = JSON.stringify({
        query: `query Query($proficiencies: String) {
            getProficiencyNames(proficiencies: $proficiencies) {
                item {id name }
                mastery
                }
            }`,
        variables: {proficiencies}
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

    return await axios.request(config);
}
