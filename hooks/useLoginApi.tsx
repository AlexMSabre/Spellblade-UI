import User from "@/types/userTypes";
import axios from "axios";

export const useLoginApi = async (formData: FormData) => {
    if(formData != null){
    let user: User = {
        id: null,
        username: formData.get("username")?.toString(),
        email: "ll"
    }
    console.log(user);

    const data = await axios({
        method: 'post',
        url: "http://localhost:8080/graphql",
        data: {
            query: 'query Query($user: inputUserDAO) { createOrLoginUser(userDAO: $user) { id username email}}',
            variables: {
                user
            }
        }
    }).then(response => {
    const {data} = response;

    return data;
    });

    return data.data
}
}