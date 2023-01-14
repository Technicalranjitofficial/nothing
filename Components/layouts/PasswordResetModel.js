import React, { useState } from 'react'
import style from "./resetpass.module.scss"
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const PasswordResetModel = ({popupReset}) => {
const host = "http://localhost:3000";
  // const host = process.env.HOST;

  const [email,setEmail] = useState("");
  const [loader,setLoader] = useState(false);
  const [message,setMessage] = useState("");
  const [sucess,setSucess] = useState(false);
  const handleOnClick=()=>{
    console.log("heu");
    popupReset();
  }

  const handleOnSubmit =()=>{
    if(email.length>0){
      setMessage("Please wait while we are checking...");
      setLoader(true);
      try {
        axios.post(`${host}/api/Auth/ResetPassword`,{
          email:email
        }).then((response)=>{
          console.log(response.data);
          setLoader(false);
          setMessage(response.data.message);
          if(response.data.success){
            setSucess(true);
          }
        }).catch((err)=>{
          console.log(err);
          setLoader(false);
          setMessage("Something went wrong! Please try again!");
        })
      } catch (error) {
       console.log(error);
       setLoader(false); 
       setMessage("Internal Error!");
      }
    }
  }

  
  return (
    <div className={style.reset}>
        <div className={style.resetWrapper}>
          <span className={style.title}>
            Password Reset 
          </span>

          <button onClick={handleOnClick}>  <CancelIcon className={style.cancel} /></button>


          <span className={style.message}>
            <p className={`${sucess && "text-white" }`}>{message&& message}</p>
          </span>

          <span className={style.msg1}>Note: <span > Reset link will be sent to your mail.</span> </span>
          {sucess?<div className={`${style.sucess} ${sucess?"bg-sucess":"bg-danger"} ${loader?"":style.s}`}>
                  {sucess?<TaskAltIcon className={`${style.done} ${loader?"":style.d}`} />:<BlockIcon className={`${style.done} ${loader?"":style.d}`} />}
                </div>:<>
          {loader?<div
                    class={`spinner-border  ${style.loader}`}
                    role="status"
                  ></div>:<>
          <div className={style.input}>
            <span>Registered kiit mail id.</span>
            <input  type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className={style.submitbtn}>
            <button onClick={handleOnSubmit}>Submit</button>
          </div></>}
          </>}
         <span className={style.notemsg}>Dear Users,if you face any proble or if you have any query or feedback then please <span >contact@gmail.com</span></span>
          
        </div>
    </div>
  )
}

export default PasswordResetModel;
