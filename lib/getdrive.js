import axios from "axios";

const URL = "https://kiitconnect.netlify.app/api/drive/getfoldersonly";
export default async function getDrive(id) {
 return axios
    .post(URL, {
      id: id,
    })
    
}
