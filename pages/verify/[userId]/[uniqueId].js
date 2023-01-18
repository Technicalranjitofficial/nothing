import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import style from "../../../Components/styles/verification.module.scss";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BlockIcon from '@mui/icons-material/Block';
const UniqueId = () => {
  const router = useRouter();
  const [message, setMessage] = useState("Message");
  const [sucess,setSucess] = useState(false);
  const [loading, setLoading] = useState(true);
  let host;
  const { userId, uniqueId } = router.query;
  useEffect(() => {
    host = "https://kiitconnect.netlify.app/api";
    // host="http://localhost:3000/api";
    if (!host) {
      return;
    }
    if (!userId) {
      return;
    }
    getdata();
  }, [userId]);

  const clickToLogin=()=>{
    router.replace("/login")
  }
  const getdata = () => {
    setLoading(true);
    console.log("userId:", userId);
    const url = `${host}/${userId}/${uniqueId}`;
    axios.get(url).then(function (response) {
      console.log(response.data.message);
      if(response.data.sucess){
        setSucess(true);
      }
      setMessage(response.data.message);
      setLoading(false);
    });
  };

  return (
    <>
      <div className={style.verification}>
        <div className={style.verificationWrapper}>
          <div className={style.verify}>
            <span>Verifying</span>
          </div>
          <div className={style.loader}>
            {loading ? (
              <div class={`spinner-border`} role="status"></div>
            ) : (
              <>
                <div className={`${style.sucess} ${sucess?"bg-sucess":"bg-danger"} ${loading?"":style.s}`}>
                  {sucess?<TaskAltIcon className={`${style.done} ${loading?"":style.d}`} />:<BlockIcon className={`${style.done} ${loading?"":style.d}`} />}
                </div>
              </>
            )}
          </div>
          <span className={style.active}>{loading?"Please wait while we are checking...":message} Login <span onClick={clickToLogin}>here</span></span>
        </div>
      </div>
    </>
  );
};

export default UniqueId;
