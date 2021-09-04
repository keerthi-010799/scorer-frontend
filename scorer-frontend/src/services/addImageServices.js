import axios from "axios";
import {FILE_PORT, baseURL } from "../constants/appConstants";

export const addImage=(data)=>{
const res = axios({
    url: `${baseURL}:${FILE_PORT}/single`,
    method: "post",
    data: data,
  })
  return res;
}