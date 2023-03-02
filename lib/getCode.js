import axios from "axios";

const host = `${process.env.host}`;
// const host = "https://kiitconnect.netlify.app";
const URL = `${host}/api/drive/getCode`;
export default async function getCode(id) {
 return axios
    .post(URL, {
      id: id,
    })
    
}
