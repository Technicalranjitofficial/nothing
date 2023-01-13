import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import style from "../../../Components/styles/verification.module.scss";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BlockIcon from "@mui/icons-material/Block";
const UniqueId = () => {
  const router = useRouter();
  const [message, setMessage] = useState("Message");
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [c, setc] = useState(false);
  const [passnotmatch, setPassnotmatch] = useState(false);
  let host;
  const { userId, uniqueId } = router.query;
  host="http://localhost:3000/api";
  useEffect(() => {
    // host = window.location.origin + "/api";
    if (!host) {
      return;
    }
    if (!userId) {
      return;
    }
    // getdata();
  }, [userId]);

  const clickToLogin = () => {
    router.replace("/login");
  };

  if (newPass.length > 0 && newPassConfirm.length > 0) {
    console.log("true");
    if (newPassConfirm.length >= newPass.length && newPass != newPassConfirm) {
      if (!passnotmatch) {
        setPassnotmatch(true);
        console.log(passnotmatch);
      }
    } else {
      if (passnotmatch) {
        setPassnotmatch(false);
        console.log(passnotmatch);
      }
    }
  }

  const handleOnsubmit = () => {
    if(newPass.length>0 && newPassConfirm.length>0 && newPass==newPassConfirm){
        getdata();
    }
  };
  const getdata = () => {
    setc(true);
    setLoading(true);
    console.log("userId:", userId,uniqueId);
    const url = `${host}/passwordreset/${userId}/${uniqueId}`;
    axios.post(url, { password: newPass }).then(function (response) {
      console.log(response.data.message);
      if (response.data.success) {
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
            <span>Update</span>
          </div>
          <div className={style.loader}>
            {c ? (
              <>
                {loading ? (
                  <div class={`spinner-border`} role="status"></div>
                ) : (
                  <>
                    <div
                      className={`${style.sucess} ${
                        sucess ? "bg-sucess" : "bg-danger"
                      } ${loading ? "" : style.s}`}
                    >
                      {sucess ? (
                        <TaskAltIcon
                          className={`${style.done} ${loading ? "" : style.d}`}
                        />
                      ) : (
                        <BlockIcon
                          className={`${style.done} ${loading ? "" : style.d}`}
                        />
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className={style.input}>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </div>
                <div className={style.input}>
                  <input
                    type="password"
                    security="true"
                    value={newPassConfirm}
                    onChange={(e) => setNewPassConfirm(e.target.value)}
                  />
                </div>
                {passnotmatch && (
                  <span className={style.passnotmatch}>
                    Password donot match
                  </span>
                )}
                <div className={style.submitbtn}>
                  <button disabled={newPass.length==0 || newPassConfirm.length==0} onClick={handleOnsubmit}>Update</button>
                </div>
              </>
            )}
          </div>
         {c?<>
            <span className={style.active}>
            {loading ? "Please wait while we are updating..." : message} Login{" "}
            <span onClick={clickToLogin}>here</span>
          </span>
         </>:
          <span className={style.active}>
         {sucess?message:<p>If you have any problem contact@gmail.com</p>}
          </span>
         }
        </div>
      </div>
    </>
  );
};

export default UniqueId;
