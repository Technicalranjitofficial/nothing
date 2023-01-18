import axios from "axios";

const URL = "http://localhost:3000/api/drive/getfoldersonly";
export default async function getDrive(id) {
 return axios
    .post(URL, {
      id: id,
    })
    
}
