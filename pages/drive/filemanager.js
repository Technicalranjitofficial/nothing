import axios from "axios";
import React, { useEffect, useState } from "react";
import FileItem from "../../Components/layouts/fileItem";
import style from "../../Components/styles/filemanager.module.scss";

const list2 = () => {
  const [arr, setArr] = useState([]);
  const [id, setId] = useState();
  const [path, setPath] = useState([]);
  const [loader, setLoader] = useState(false);
  const url = "http://localhost:3000/api/drive/getfoldersonly";

  const get = (id) => {
    fetch1(id);
  };

  const deletehandle = () => {
    if(path.length<=1){
        return console.log("First file");
    }
    setLoader(true);
    path.pop();
    if (path) {
      axios
        .post(url, { id: path[path.length - 1] })
        .then((data) => {
          setArr(data.data);
          setLoader(false);
        })
        .catch((err) => {
          console.log("erro");
          setLoader(false);
        });
    }
  };

  const fetch2 = async (id) => {
    axios.post(url, { id: id }).then((data) => {
      setArr(data.data);
    });
  };

  const fetch1 = async (id) => {
    setLoader(true);
    setPath(path.concat(id));
    axios.post(url, { id: id }).then((data) => {
      setArr(data.data);
      setLoader(false);
    });
  };

  return (
    <div className={style.files}>
      <button onClick={() => get("0AB3auOFRmDb9Uk9PVA")}>
        get
      </button>
      <button onClick={() => deletehandle()}>delete</button>

      <div className={style.filesWrapper}>
      {loader ? (
        "Loading"
      ) : (
        <>
          {arr &&
            arr.map((val, ind) => {
              return (
               <a onClick={()=>get(val.id)}> <FileItem key={ind} val = {val}/></a>
              );
            })}
        </>
      )}
      </div>

    
    </div>
  );
};

export default list2;
