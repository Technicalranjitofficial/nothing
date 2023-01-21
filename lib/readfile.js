import axios from "axios"

export const readFile=async(id)=>{
    return axios.get(id);
}