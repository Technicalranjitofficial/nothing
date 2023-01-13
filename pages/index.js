import { KeyboardReturnSharp } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect } from "react";

import axios from "axios";

const jwt = require("jsonwebtoken");
// require("dotenv").config();

function Home({ data, path, res }) {
  const host = "https://kiitconnect.netlify.app";
  const handleOnSignup = () => {
    window.open(`${host}/api/google`);
  };

  const router = useRouter();

  useEffect(() => {}, []);

  const logout = async () => {
    axios
      .post(`${host}/api/Auth/logout`)
      .then((response) => {
        if (response.data.success) {
          router.replace("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={handleOnSignup}>{data && data.user.email}</button>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Home;

export async function getServerSideProps({ req, res }) {
  try {
    if (req.cookies.AuthToken) {
      const response = await axios.post(
        "https://kiitconnect.netlify.app/api/Auth/getuser",
        {
          cookies: req.cookies.AuthToken,
        }
      );

      const data = await response.data;
      console.log(data)
      if (data) {
        return {
          props: {
            data: data,
          },
        };
      }

      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    return {
      redirect: {
        destination: "/login",
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/login",
      },
    };
  }
}
