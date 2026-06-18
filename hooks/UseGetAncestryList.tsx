import axios from 'axios';

export const useGetAncestryList = async ()=>{
let data = JSON.stringify({
  query: `query Query {
   getAncestryList {
    id name description
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
  data : data
};

return await axios.request(config)
}