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
  url: process.env.NEXT_PUBLIC_BACKEND_URI,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

return await axios.request(config)
}