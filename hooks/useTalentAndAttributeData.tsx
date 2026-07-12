import axios from "axios";

//calls the endpoint to get all of the characters associated with the current user.
export const useTalentAndAttributeData = async (talent1Name: String, talent2Name: String) => {
    let data = JSON.stringify({
        query: `query Query($talent1Name: String, $talent2Name: String) {
   getTalentAndAttributeData(talent1Name: $talent1Name, talent2Name: $talent2Name) {
    talent { name ability1 ability2 description hpBonus prioritySkills role complexity keystone capstone}
    attributes { name talentName flag description }
  }
}`,
        variables: { "talent1Name": talent1Name, "talent2Name": talent2Name }
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