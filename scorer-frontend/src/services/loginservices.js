import axios from "axios";
import { API_PORT, baseURL } from "../constants/appConstants";

export const login = (email, password) => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `query LogIn($email:String!,$password:String!){
                login(email:$email,password:$password){
                    token
                    userId
                    tokenExpiration
                }
            }`,
      variables: {
        email: email,
        password: password,
      },
    },
  });
  return res;
};

export const signup = (email, password) => {
  const res = axios({
    url: `${baseURL}:${API_PORT}/graphql`,
    method: "post",
    data: {
      query: `mutation CreateUser($email:String!,$password:String!){
                    createUser(userInput:{email:$email,password:$password}){
                        _id
                        email
                    }
                }`,
      variables: {
        email: email,
        password: password,
      },
    },
  });
  return res;
};
