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
  url: 'https://ec2-3-21-168-246.us-east-2.compute.amazonaws.com:8443/graphql',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

return await axios.request(config)
}