import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Link } from "@mui/material";
import AcademicLeft from "../../Components/AcademicSection/AcademicLeft";
import axios from "axios";
import { GiCircularSaw } from "react-icons/gi";

const data = require("/testkiit.json");

const index = () => {
  const [section, setSection] = useState([]);
  const [hidden,setHidden] = useState(true);
  const [mMode,setMMode] = useState(true);
  const [branch,setBranch] = useState(0);
  const [semester,setSemenster] = useState(1);

  const [indexPage,setIndexPage] = useState([]);
  const [loading,setLoading] = useState(true);


  const helper = {
    "0":"cse",
    "1":"csce",
    "2":"csse",
    "3":"it"
  }

  useEffect(async () => {

   
     const d = await axios.get(
      "https://raw.githubusercontent.com/amitpandey-github/data/main/index.json"
    ).then(async(d)=>{
      setIndexPage(d.data);
      console.log(d.data);
      // if(indexPage.length>0){
      //   console.log(d.data[0])
      // }

      const p = await axios.get(d.data[branch][helper[branch]][semester]['link']);
      console.log();
      setSection(p.data[0]['First']);

      setLoading(false);
      // console.log();

     
    })


    // console.log(d.data[0][branch][semester])
    


    
  

    // setSection(d.data[0]["First"]);

    // console.log(d.data[0]);

    // const p = d.data[0];

    // const t = p["First"];

    // console.log(d.data[0]["First"]);
  }, []);

  const h = "jjs";


  const getData=async(semes,brch)=>{
    setLoading(true);

    const p = await axios.get(indexPage[brch][helper[brch]][semes]['link']);


    console.log(indexPage[brch][helper[brch]][semes]['link']);
    setSection(p.data[0]['First']);
    console.log(p.data[0]['First']);
    setLoading(false);
  }

  const menuClick=()=>{
    setHidden(d=>!d);
  }

  
  return (
    <div className="bg-slate-900 min-h-screen relative ">
      <div className="w-full z-40  fixed bg-red-400 ">
        
         <Navbar ik={false} menu={"md:hidden"} hidden={hidden} menuClick={menuClick}/>
         
        </div>
      <div className={` overflow-y-auto z-30 ease-linear duration-500 ${hidden?"-left-full":"w-1/2"} md:left-0 md:w-1/6 fixed my-auto max-h-min  h-full bg-gray-800 rounded-lg`}>
        <AcademicLeft getData={getData} />
      </div>

      <div className="max-w-screen-lg relative bg-slate-900 mx-auto ">
        
        
    
        {/* <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr> */}

        <div className="academic pt-28 w-full min-h-screen  text-white ">


         {loading?<GiCircularSaw className="fixed top-1/2 left-1/2 animate-spin" size={50}/> : section.length > 0 &&
            section.map((data, index) => {
              return (
                <>
                  <h2 className="justify-center flex bg-slate-700 py-2">
                    {data["name"]}
                  </h2>

                  <table class="table-auto border-collapse border-gray-700  w-full">
                    <thead>
                      <tr className="">
                        <th className=" border-t border-b px-2 py-2 font-bold   border-gray-700">
                          Year
                        </th>
                        <th className="border-t border-b px-2  py-2 font-bold   border-gray-700">
                          Type
                        </th>
                        <th className="border-t border-b px-2  py-2 font-bold  border-gray-700">
                          Quetion{" "}
                        </th>
                        <th className="border-t border-b  py-2 px-2 font-bold  border-gray-700">
                          Solution
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data["pyqs"].map((d, i) => {
                        return (
                          <tr className="">
                            <td className="border-t border-b  py-2 px-2  border-gray-700">
                              {d["year"]}
                            </td>
                            <td className="border-t border-b  py-2 px-2 border-gray-700">
                              {d["type"]}
                            </td>
                            <a href={`/academic/view/${d['id']}`} 
                            target="_blank"
                            className="no-underline">
                              {" "}
                              
                              <td className="border-t border-b py-2 px-2 text-cyan-500 hover:text-cyan-600  border-gray-700">
                                {d["name"]}
                              </td>
                            </a>
                            <td className="border-t border-b  py-2 px-2 border-gray-700">
                              {d["solution"] != null ? (
                                <a
                                  href={`/academic/view/${d['solution']}`}
                                  className="no-underline text-blue-500" target="_blank"
                                >
                                  View
                                </a>
                              ) : (
                                "Not Available"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <br />
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default index;
