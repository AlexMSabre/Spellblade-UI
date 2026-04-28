import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useTalentAndAspectsData = async (talent1Name: String, talent2Name: String) => {
    let data = JSON.stringify({
        query: `query Query($talent1Name: String, $talent2Name: String) {
   getTalentAndAspectsData(talent1Name: $talent1Name, talent2Name: $talent2Name) {
    talent { name abilities description hpBonus prioritySkills role complexity keystone capstone}
    aspects { name talentName flag description }
  }
}`,
        variables: { "talent1Name": talent1Name, "talent2Name": talent2Name }
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