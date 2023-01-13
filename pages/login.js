import style from "../Components/styles/login.module.scss";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PasswordResetModel from "Components/layouts/passwordResetModel";
const connectdb = require("../Components/connectdb");
const { getCookie,setCookie } = require("cookies-next");
import {motion} from "framer-motion"
const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);
  const [displayMessage,setDisplayMessage] = useState("");
  const router = useRouter();
  const [glogin,setGlogin] = useState(false);
  const [resetOpen,setResetOpen] = useState(false);

  const host = "https://kiitconnect.netlify.app";

  const popupReset =()=>{
    setResetOpen((prev)=>!prev);
  }
  const handleOnSubmit = async (e) => {
    
    e.preventDefault();
    setLoader(true);
    console.log(isLogin);

    if (email.length < 1 || password.length < 1) {
      setLoader(false);
      return;
    }

    

    const index = email.indexOf("@");
    const validate = email.slice(index);
    if (validate !== "@kiit.ac.in") {
      setMessage(true);
      setDisplayMessage("Invalid kiit mail id!")
      setTimeout(() => {
        setMessage(false);
      }, 2000);
      setLoader(false);
      return;
    }

    if (isLogin) {
      try {
        axios.post(`${host}/api/Auth/login`,{
          email:email,
          password:password,
        }).then((response)=>{
          setDisplayMessage(response.data.message);
          console.log(response.data)
          setMessage(true);
          setTimeout(() => {
            setMessage(false);
          }, 10000);
          if(response.data.sucess){
              setName("");
              setEmail("");
              setPassword("");
              console.log(response.data)
              router.replace("/");
          }
          setLoader(false);

        }).catch((err)=>{
          console.log(err);
        })
      } catch (error) {
        
      }
    } else {
      try {
        console.log("running");
        axios
          .post(`${host}/api/Auth/signup`, {
            name: name,
            email: email,
            password: password,
          })
          .then((data) => {
            setDisplayMessage(data.data.message);
            setMessage(true);
            setTimeout(() => {
              setMessage(false);
            }, 10000);
            if(data.data.sucess){
                setName("");
                setEmail("");
                setPassword("");
                return router.push({pathname:'/account/sucess',query:{sucess:true}});
            }
            setLoader(false);
          })
          .catch((err) => {
            console.log(err);
            setLoader(false);
          });
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    }
  };

  // useEffect(()=>{
  //   const token = getCookie("token");
  //   if(token){
  //     window.open("http:localhost:3000/dashboard");
  //   }
  // },[])

  const handleOnGoogleSignup = () => {
    setGlogin(true);
    window.open(`${host}/api/google`, "_self");
  };

  return (
    <div className={style.login}>
      <div className={`${style.loginWrapper} ${!isLogin ? style.sin : ""}`}>
        <div className={`${style.left}`}>
          <div className={style.leftWrapper}>
            <div className={`${style.message} ${message ? style.mes : ""}`}>
              <span>{displayMessage}</span>
            </div>

            <div className={style.title}>
              <LoginIcon className={style.logicon} /> Login
            </div>
            <p>
              <span>Note:</span>Login Accepted from only Kiit mail id.
            </p>
            <div className={style.google}>
              <button onClick={handleOnGoogleSignup}>
                {" "}
                {glogin?<div
                    class={`spinner-border ${style.loader}`}
                    role="status"
                  ><Image
                  className={style.gicon}
                  src="/gicon.png"
                  width={25}
                  height={25}
                  alt="gicon"
                /></div>:<><Image
                className={style.gicon}
                src="/gicon.png"
                width={25}
                height={25}
                alt="gicon"
              />Signup with google</>}
              </button>
            </div>
            <span className={style.or}>Or signin with email</span>
            <form className={style.form} onSubmit={handleOnSubmit}>
              {!isLogin && (
                <div className={style.input}>
                  <span>Name</span>
                  <input
                    className={style.in}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                    placeholder="Enter your Name"
                  />
                </div>
              )}

              <div className={style.input}>
                <span>Email</span>
                <input
                  className={style.in}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Enter your @kiit.ac.in"
                />
              </div>
              <div className={style.input}>
                <span>Password</span>
                <input
                  className={style.in}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div className={style.forget}>
                <span>
                  Forget password? <a onClick={popupReset}>Reset now</a>
                </span>
              </div>
              <button className={style.loginbtn}>
                {loader ? (
                  <div
                    class={`spinner-border ${style.loader}`}
                    role="status"
                  ></div>
                ) : (
                  "Login"
                )}
              </button>
              <span className={style.notregister}>
                {isLogin ? (
                  <>
                    Not registered yet?
                    <span
                      className={style.signup}
                      onClick={() => setIsLogin((prev) => !prev)}
                    >
                      Create an account!
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <span
                      className={style.signup}
                      onClick={() => setIsLogin((prev) => !prev)}
                    >
                      Login here!
                    </span>
                  </>
                )}
              </span>
            </form>
          </div>
        </div>
        <div className={style.right}>
          <img src="/right.png" className={style.rimage} />
          <h2>
            Welcome to <span className="text-danger">KIIT CONNECT</span>
          </h2>
        </div>
      </div>

      {resetOpen&& <div className={`${style.dark}`}>
     </div>}
    
     {resetOpen && <motion.div
  initial={{ scale: 0 }}
  animate={{ rotate: 360, scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }} className={style.passwordresetmodel} >
      <PasswordResetModel popupReset={popupReset}/>
     
     </motion.div>}
    </div>


  );
};

export default Login;


// export async function getInitialProps({req,res}){
//   if(req.cookies.AuthToken){
//     return{
//       redirect:{
//         destination:"/"
//       }
//     }
//   }
//   return{};
// }