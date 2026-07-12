import axios from 'axios';

export const useGetAncestryList = async ()=>{
let data = JSON.stringify({
  query: `query Query {
   getAncestryList {
    id name trait size source
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
  data : data
};

return await axios.request(config)
}