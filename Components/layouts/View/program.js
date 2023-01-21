import Head from "next/document";
import React, { useEffect } from "react";

import style from "./program.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import hljs from "highlight.js";
import javascript from "../../../node_modules/highlight.js/lib/languages/javascript";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import MobMenuPrev from "./mobMenuPrev";
import Search2 from "../search/search2";
// import Search from "../search/search";
hljs.registerLanguage("javascript", javascript);
// import Highlight from "react-highlight";
const Program = ({ t2, loading }) => {
  // console.log("data", data);
  useEffect(() => {
    hljs.initHighlighting();
  });

  const initial = {
    name: t2.data[0].name,
    id: t2.data[0].id,
    index: 0,
  };

  const [mainData, setMainData] = useState(initial);
  // const [name,setName] = useState('');
  const [message, setMessage] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [searchEnabled,setSearchEnabled] = useState(false);

  const handleOnDownload = () => {
    window.open(
      `https://drive.google.com/uc?export=download&id=${mainData.id}`
    );
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["codes", mainData.id],
    () =>
      axios.get(
        `https://www.googleapis.com/drive/v3/files/${mainData.id}?alt=media&key=AIzaSyCdVB-50SIiRTLwDDuwuHgtEPR-eEopMls`
      ),
    {
      // enabled:false,
      // manual:true,
      staleTime:300000,
      // refetchOnMount:"always",
      
      refetchOnWindowFocus:false,
    }
  );

  const [d,setD] = useState(t2.data);
 
  const handleOncopy = () => {
    if (data) {
      navigator.clipboard.writeText(data.data);
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 2000);
    }
  };

  console.log(error, data);

  // if(isLoading){
  //   return <h1>loading...</h1>
  // }
  const getdata = (il, nam, idx,mob=false) => {
    if(mob){
      setMenuOpen(false);
      setSearchEnabled(false);
    }
    // console.log(id,il);
    if (mainData.id) {
      setMainData({ id: il, name: nam, index: idx });
      // setName(nam)
      refetch();
    }
  };

  const handleOnpenMenu=()=>{
    setMenuOpen(prev=>!prev);
  }

  return (
    <>
      <div className={style.program}>
        <div className={style.programWrapper}>
          {/* <pre>{loading?"Loading........":`${data}`}</pre> */}
          {/* {!loading? <> <div className={style.options}>
        <button onClick={handleOncopy}>Copy</button>
            <button onClick={handleOnDownload}>Download</button>
            <button onClick={handleOnClose}>Close</button>
        </div>
        <pre><code className="">
        {`${data}
`}
</code></pre></>:"Loding files....."} */}

          <div className={style.left}>
            <div className={style.leftWrapper}>
              <div className={style.title}>
                <span>Topic : C</span>
              </div>
              <Search2  t2={t2} setD={setD} />
              <div className={style.list}>
                {d &&
                  d.map((val, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => getdata(val.id, val.name, index)}
                      >
                        {val.id === mainData.id ? (
                          <span className="text-danger">
                            {index + 1}) {val.name}
                          </span>
                        ) : (
                          <span>
                            {index + 1}) {val.name}
                          </span>
                        )}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className={style.right}>
            <div className={style.rightWrapper}>
              {/* <pre>{loading?"Loading........":`${data}`}</pre> */}

              {/* <div className={style.title}>
               
              </div> */}

              <span className={`${style.message} ${message && style.copied}`}>
                Copied to clipboard.
              </span>
              {!loading ? (
                <>
                  {" "}
                  <div className={style.options}>
                  {/* <span>{mainData.name && mainData.name}</span> */}
                  <span className={style.mobMenuBtn} onClick={handleOnpenMenu}>{menuOpen?<MenuOpenIcon/>:<MenuIcon/>}</span>
                    <div className={style.buttons}>
                      <button
                        disabled={mainData.index < 1}
                        onClick={() => {
                          if (mainData.index > 0)
                            getdata(
                              t2.data[mainData.index - 1].id,
                              t2.data[mainData.index - 1].name,
                              mainData.index - 1
                            );
                        }}
                      >
                        <ArrowBackIosIcon />
                      </button>
                      <button onClick={handleOncopy}>
                        <ContentCopyIcon />
                      </button>
                      <button onClick={handleOnDownload}>
                        <DownloadIcon />
                      </button>
                      <button
                        disabled={t2 && t2.data.length - 1 === mainData.index}
                        onClick={() => {
                          if (t2 && mainData.index < t2.data.length - 1)
                            getdata(
                              t2.data[mainData.index + 1].id,
                              t2.data[mainData.index + 1].name,
                              mainData.index + 1
                            );
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </button>
                   
                    </div>
                  </div>
                  {menuOpen&&<div className={style.mob}> <MobMenuPrev t2={t2} mainData={mainData} getdata={getdata} /></div>}
                    {mainData.name && <div className={style.mobTitle}>{mainData.name} </div>}

                    {/* {searchEnabled?<Search t2={t2} mainData={mainData} getdata={getdata}/>:""} */}
                  <pre>
                    {isLoading && (
                      <div className={style.loading}>
                        <span>Loading..</span>
                      </div>
                    )}
                    <code className="c++">
                      {/* {isLoading && "Loading...."} */}
                      {/* {isLoading?"Loading...":<> */}

                      {data && data.data}
                      {/* </>} */}
                    </code>
                  </pre>
                </>
              ) : (
                "Loding files....."
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Program;
