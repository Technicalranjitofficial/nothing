import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../../Components/Navbar";

import { GiSelfLove } from "react-icons/gi";
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";

const Index = ({ data }) => {
  const [fData, setFData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setDoneUploading] = useState(false);
  const [likedEmail, setLikedEmail] = useState([]);
  const [message,setMessage] = useState("");


  const [openDetele,setOpenDelete] = useState(false);
  const [deleteComplete,setDeleteComplete]= useState(false);

  const [toDeleteProject,setTodeleteProject] = useState({
    name:"",
    id:"",
    author:""
  })

  const [refresh, setRefresh] = useState(false);
  const[reload,setreload]= useState(false);

  // const reload = () => {
  //   console.log("Reloading");

  // };

  // const host = "http://localhost:5000";
  const host = "https://kiitconnect.herokuapp.com";

  const fetchData = () =>
    new Promise((resolve, reject) => {
      return fetch(`${host}/rand`)
        .then((d) => resolve(d.json()))
        .catch((err) => reject(err));
    });

  useEffect(() => {
    fetchData().then((d) => {
      setFData(d);
      console.log(d);
    });
    // randomizeArray();
    // console.log(data['user']['displayName']);
  }, [reload]);

  const [formData, setFormData] = useState({
    projectName: "",
    projectDesc: "",
    githubUrl: "",
    liveUrl: "",
    file: null, // Add a new property for the file
  });

  const projectName = useRef();
  const projectDesc = useRef();
  const githuburl = useRef();
  const liveUrl = useRef();
  const file = useRef();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.files[0], // Store the selected file object
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleLike = async (val, index) => {
    const copied = [...val["likedEmail"]];
    console.log(copied);
    const p = fData[index];
    if (copied.includes("21053420@kiit.ac.in")) {
      console.log("running first");
      const newArr = copied.filter((val) => {
        return val != "21053420@kiit.ac.in";
      });
      p["likedEmail"] = newArr;

      const pl = [...fData];

      const newpl = pl.map((val, i) => {
        if (i == index) {
          return p;
        }
        return val;
      });

      console.log(newpl);

      setFData(newpl);
      console.log("pppp" + newArr);

      axios
        .post(`${host}/like`, {
          id: val["_id"],
          likedEmail: newArr,
          event: 1,
        })
        .then((res) => {
          console.log(res);
        });

      console.log(newArr);
    } else {
      copied.push("21053420@kiit.ac.in");

      p["likedEmail"] = copied;

      const pl = [...fData];

      const newpl = pl.map((val, i) => {
        if (i == index) {
          return p;
        }
        return val;
      });

      console.log(newpl);
      setFData(newpl);

      axios
        .post(`${host}/like`, {
          id: val["_id"],
          likedEmail: copied,
          event: 1,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const handleOnDelete = async (val, index) => {
    setTodeleteProject({
      name:val['projectName'],
      id:val['_id'],
      author:val['email']
    })

    setOpenDelete(true);
  };


  const handleOnConfirmDelete=async()=>{

    setLoading(true);

    axios.post(`${host}/deleteProject`,{
      "id":toDeleteProject.id,
      "email":toDeleteProject.author
    }).then((res)=>{


      console.log(res);
      // setDoneUploading(false);
      setLoading(false);
      setDeleteComplete(true);
      setMessage(res.data['message']);
    }).catch((err)=>{
      console.log(err);
      setMessage(res['message']);
      setLoading(false);
    });

    // console.log(toDeleteProject);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (refresh) {
    //   return fetchData().then((d) => {
    //     setFData(d);
    //     setRefresh(false);
    //     // if(fData.length>0){
    //     //   // console.log("hello")
    //     // }
    //   });
    // }
    setMessage("");
    setDeleteComplete(false);

    setDoneUploading(true);
    setLoading(true);
    // setRefresh(false);
    console.log(file.current.files[0]);

    // Access the form data in the `formData` state object
    // console.log(formData);

    var formD = new FormData();
    // console.log(formD);
    formD.append("projectName", projectName.current.value);
    formD.append("projectDesc", projectDesc.current.value);
    formD.append("githubUrl", githuburl.current.value);
    formD.append("liveUrl", liveUrl.current.value);
    formD.append("profilePic",data['user']['profilePic']);
    formD.append("file", file.current.files[0]);
    formD.append("uploadedBy", data["user"]["displayName"]);
    formD.append("email", data["user"]["email"]);

    console.log(formD);

    const res = await fetch(`${host}/upload`, {
      method: "POST",
      body: formD,
    }).then(() => {
      setDoneUploading(false);

      projectName.current.value = "";
      projectDesc.current.value = "";
      githuburl.current.value = "";
      liveUrl.current.value = "";
      file.current.value = null;
      
      setreload((prev)=>prev+1);
      setLoading(false);
      
    });
    // Perform further actions with the form data
    // console.log(await res.json());
  };

  return (
    <>
      <div className="bg-slate-900 min-h-screen">

     {openDetele &&  <div className="w-full fixed justify-center items-center flex  h-screen bg-transparent">
            <div className="absolute bg-slate-600 
           border-2 border-cyan-500 border-dashed text-slate-300 rounded-lg w-2/3 
           md:w-2/3 lg:w-1/4 h-64 flex flex-col items-center justify-center">
              <h3 className="lg:text-xl text-sm font-bold font-Roboto
              animate-pulse ">Are you Sure want to delete ?</h3>
              <br />
             <p className="text-xs md:text-sm"> <span className="text-cyan-500 font-bold">Project</span>: {toDeleteProject.name}</p>
         

             { message.length>0 && <p>{message}</p>}
             <br />

        {loading? <div className="flex flex-col items-center">
          <AiOutlineLoading3Quarters className="animate-spin" size={30} />
          <br />
          <p className="text-xs md:text-sm">Please wait..</p>
        </div>: deleteComplete?<button className="bg-red-700 rounded-md font-Roboto font-bold hover:bg-red-800 px-4 py-2"  onClick={()=>{
          setOpenDelete(false);
          setreload((prevCount) => prevCount + 1);
        }}>OK</button> :   <div className="flex   flex-row w-full justify-evenly">
           <button className="bg-green-700 text-xs md:text-sm rounded-md font-Roboto font-bold hover:bg-green-800 px-4"
           onClick={()=>handleOnConfirmDelete()}
           
           >Yes</button>
             {/* <br /> */}
             <button className="bg-red-700 rounded-md font-Roboto font-bold hover:bg-red-800 px-4 py-2 text-xs md:text-sm"  onClick={()=>setOpenDelete(false)}>Cancel</button>
           </div>}


            </div>
          </div>}
        <div className="max-w-screen-lg   bg-slate-900 mx-auto ">
          <Navbar />

         

          <div
            className="text-slate-400
           text-sm md:text-base w-full
           font-Roboto flex flex-row justify-center"
          >
            <form
              onSubmit={handleSubmit}
              method="post"
              className="flex flex-col w-full p-3 md:p-0 md:w-5/6"
            >
              <label htmlFor="projectName">Project Name:</label>
              <input
                type="text"
                className="p-2 rounded-md focus:outline-none focus:border-2 focus:border-cyan-700 border-2 border-gray-500 bg-slate-800"
                id="projectName"
                // value={formData.projectName}
                // onChange={handleChange}
                ref={projectName}
                name="projectName"
              />
              <br /> <label htmlFor="projectDesc">Project Desc:</label>
              <textarea
                id="projectDesc"
                rows={6}
                className="p-2 rounded-md focus:outline-none focus:border-2 focus:border-cyan-700 border-2 border-gray-500 bg-slate-800"
                // value={formData.projectDesc}
                name="projectDesc"
                // onChange={handleChange}
                ref={projectDesc}
              />
              <br /> <label htmlFor="githubUrl">Github Url:</label>
              <input
                type="text"
                id="githubUrl"
                className="p-2 rounded-md focus:outline-none focus:border-2 focus:border-cyan-700 border-2 border-gray-500 bg-slate-800"
                // value={formData.githubUrl}
                ref={githuburl}
                name="githubUrl"
                // onChange={handleChange}
              />
              <br /> <label htmlFor="liveUrl">Live Url(optional):</label>
              <input
                type="text"
                id="liveUrl"
                className="p-2 rounded-md focus:outline-none focus:border-2 focus:border-cyan-700 border-2 border-gray-500 bg-slate-800"
                // value={formData.liveUrl}
                name="liveUrl"
                // onChange={handleChange}
                ref={liveUrl}
              />
              <br />
              {/* <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload file</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/> */}
              <label htmlFor="file">Image</label>
              <input
                type="file"
                name="file"
                accept="image/png, image/gif, image/jpeg"
                className="p-2 rounded-md focus:outline-none focus:border-2 focus:border-cyan-700 border-2 border-gray-500 bg-slate-800"
                id="file"
                // onChange={handleChange}
                ref={file}
              />
              <br />
              <div className="flex justify-center ">
                {uploading ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={30}
                  />
                ) : !uploading && loading ? (
                  <BsCheck2Circle size={30} />
                ) : (
                  <button
                    type="submit"
                    className="bg-slate-700 p-2 rounded-md w-1/2
              
              hover:bg-slate-800
              justify-self-center"
                  >
                    Upload
                  </button>
                )}
              </div>
              {/* <button onClick={()=>{
                console.log(shuffleArray(fData))
              }}>NNNNN</button> */}
            </form>
          </div>
          <br />

          <div className="w-full flex flex-row justify-center items-center ">
            <div className="md:w-5/6  p-3 text-white">
              {fData.map((val, index) => {
                return (
                  <div
                    key={index}
                    className="post border-2 
                mt-3
                rounded-md border-slate-700 w-full h-auto flex flex-col p-4"
                  >
                    <div className="header border-slate-600 border-b-2 flex flex-row justify-between">
                      <div className="left flex flex-row">
                        <img
                          src={val['profilePic']}
                          alt=""
                          className="md:w-20 md:h-20 w-12 h-12 aspect-square  rounded-full"
                        />

                        <div className="flex flex-col ml-4 items-left justify-center ">
                          <h4 className="text-sm md:text-base font-Roboto font-bold text-slate-300">{val["uploadedBy"] || "Ram"}</h4>

                          <div className="">
                            <span className="text-xs font-thin md:text-sm text-slate-100">{val["email"] && val["email"]}</span>
                            <br />
                            <span className="text-xs font-thin md:text-sm text-slate-200">Uploaded on {val["createdDate"]}</span>
                          </div>
                          <br />
                        </div>
                      </div>

                      <div className="right  flex flex-col justify-between items-center h-50 w-20">
                        {/* {} */}
                        <div className="flex flex-col justify-center items-center">
                          <GiSelfLove
                            onClick={() => {
                              handleLike(val, index);
                            }}
                            size={30}
                            className={`${
                              val["likedEmail"].includes("21053420@kiit.ac.in")
                                ? "text-red-500 animate-pulse"
                                : ""
                            }`}
                          />
                          <p>{val["likedEmail"] && val["likedEmail"].length}</p>
                        </div>

                        <div>
                          {val["email"] === data["user"]["email"] ? (
                            <AiFillDelete
                              onClick={() => handleOnDelete(val, index)}
                              className="text-red-300"
                              size={30}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <br />

                    <p className="w-full font-Alegreya text-xl font-bold text-slate-400 flex justify-center">
                      {val["projectName"] }
                    </p>

                    <p className="w-full text-slate-400 md:text-base text-xs font-serif">{val["projectDesc"]}</p>
                    {val["githubUrl"] && (
                      <p className="text-xs font-serif ">
                        {" "}
                        <span className="text-slate-300 md:text-sm">Github Link:</span> <a href="" className="text-blue-400 no-underline">{val["githubUrl"]}</a>
                      </p>
                    )}

                    {val["liveUrl"] && (
                      <p className="text-xs font-serif ">
                        {" "}
                       <span className="text-slate-300 text-sm"> Live Link: </span><a href="" className="text-blue-400 no-underline">{val["liveUrl"]}</a>
                      </p>
                    )}
                    <div className=" flex justify-center w-full">
                      <img
                        src={`https://drive.google.com/uc?export=download&id=${val["projectImage"]}`}
                        alt=""
                        className="object-contain w-full rounded-lg"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps({ req, res }) {
  if (req.cookies.AuthToken) {
    console.log("cookies" + req.cookies.AuthToken);
    const response = await axios.post(
      // "http://localhost:3000/api/Auth/getuser",
      "https://kiitconnect.live/api/Auth/getuser",
      {
        cookies: req.cookies.AuthToken,
      }
    );

    const data = await response.data;
    console.log(data);
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
  //   // } catch (error) {
  //   //   console.log(error);

  //   //   return {
  //   //     redirect: {
  //   //       destination: "/login",
  //   //     },
  //   //   };
  //   // }
}
