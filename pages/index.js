import { KeyboardReturnSharp } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect } from "react";

import axios from "axios";
import { NextResponse } from "next/server";
import Users from "model/Users";
import { useQuery } from "react-query";
import Link from "next/link";

const jwt = require("jsonwebtoken");
// require("dotenv").config();

function Home() {
  const host = "https://kiitconnect.netlify.app";
  // const host = "http://localhost:3000";
  const router = useRouter();
  
  
  const {data,isError,isLoading} = useQuery('user',()=>{
    return axios.post(`${host}/api/Auth/getuser`);
  });
  console.log(data)

 if(isLoading){
  return <h1>Loading...</h1>
 }

  // const {data} = query; 
  //   useEffect(() => {}, []);

  // const logout = async () => {
  //   axios
  //     .post(`${host}/api/Auth/logout`)
  //     .then((response) => {
  //       if (response.data.success) {
  //         router.replace("/login");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
     <div className="index">
      <div className="indexWrapper">
        <span>{data.data.user.email}</span>
        <Link href="/drive/filemanager">FileManager</Link>
      </div>
     </div>
    </>
  );
}

export default Home;

// export async function getServerSideProps({ req, res }) {
//   try {
//     if (req.cookies.AuthToken) {
//       const response = await axios.post(
//         "https://kiitconnect.netlify.app/api/Auth/getuser",
//         {
//           cookies: req.cookies.AuthToken,
//         }
//       );

//       const data = await response.data;
//       console.log(data)
//       if (data) {
//         return {
//           props: {
//             data: data,
//           },
//         };
//       }

//       return {
//         redirect: {
//           destination: "/login",
//         },
//       };
//     }

//     return {
//       redirect: {
//         destination: "/login",
//       },
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       redirect: {
//         destination: "/login",
//       },
//     };
//   }
// }

// export async function getServerSideProps({ req, res }) {
//   const cookies = req ? req.headers.cookie : null;
//   if (!cookies) {
//     // return {
//     //   redirect: {
//     //     destination: "/login",
//     //   },
//     // };

//     return NextResponse.redirect("/login");
//   }
//   return {props:{sucess:true}};
// }

// export async function getServerSideProps({ req, res }) {
//    const data = await axios.post("http://localhost:3000/api/Auth/getuser",{
//       token:req.cookies.AuthToken
//      }).catch((err)=>{
//       return {
//         props:{
//           error:"Internal Error Occured"
//         }
//       }
//     })

//   //  const query = useQuery('users',()=>{
//   //   return axios.post("http://localhost:3000/api/Auth/getuser",{
//   //     token:req.cookies.AuthToken,
//   //   });
//   //  })
//     return {
//       props:{
//         data:data.data.user
//       }
//     }
// }
