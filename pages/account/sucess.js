import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
// import style from "Components/styles/verification.module.scss";
import style from "../../Components/styles/verification.module.scss"
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BlockIcon from '@mui/icons-material/Block';
const UniqueId = () => {

  const router  = useRouter();

  const {sucess} = router.query;
    useEffect(()=>{
        if(!sucess){
          router.replace("/");
        }
    })

  return (
    <>
      {sucess && <div className={style.verification}>
        <div className={style.verificationWrapper}>
          <div className={style.verify}>
            <span>Account Created!!!</span>
          </div>
          <div className={style.loader}>
            
              <>
                <div className={`${style.sucess} ${style.s}`}>
                  <TaskAltIcon className={`${style.done} ${style.d}`} />
                </div>
              </>
           
          </div>
          <span className={`${style.active} text-white`} >Please check your mail to verify your account!! </span>
        </div>
      </div>}
    </>
  );
};

export default UniqueId;
