import axios from "axios";

const host = "http://localhost:3000";
// const host = "https://kiitconnect.netlify.app";
const URL = `${host}/api/drive/getfoldersonly`;
export default async function getDrive(id) {
 return axios
    .post(URL, {
      id: id,
    })
    
}
