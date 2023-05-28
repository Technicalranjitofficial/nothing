import React, { useState } from "react";

const AcademicLeft = ({ getData }) => {
  const [branch, setBranch] = useState("0");
  const [sems,setSemester] = useState(0);

  const options = [
    {
      label: "CSE",
      value: "0",
    },
    {
      label: "CSCE",
      value: "1",
    },
    {
      label: "CSSE",
      value: "2",
    },
    {
      label: "IT",
      value: "3",
    },
  ];


  const semester=[
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",

]

  return (
    <div className="text-white  w-full flex flex-col">
      <div className="mt-36 ">
        <div className="flex flex-col items-center">
          <label htmlFor="section" className="font-bold text-lg font-Roboto  ">
            Choose Course :
          </label>
          <select
            name=""
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              
            }}
            id="section"
            className="text-slate-200  py-2 px-8 my-2 rounded-md bg-slate-700"
          >
            {options.map((op, index) => {
              return <option key={index} value={op.value}>{op.label}</option>;
            })}
          </select>
        </div>

        <br />
        <span className="flex pl-5 border-slate-500 py-3 border-t border-b  font-bold text-xl ">
          Notes
        </span>
        <ul className="px-2 py-2">
         
        {semester.map((sem,index)=>{
          return  <li key={index} onClick={()=>{getData(index,branch);
            setSemester(index);
          
          }} className={`py-3 hover:bg-slate-700 rounded-md pl-3 cursor-pointer font-Roboto text-lg font-bold text-slate-300  ${index==sems?"bg-cyan-700":""}`}>
          {sem}
        </li>
       
        })}
        </ul>
      </div>

      <div>
        <span className="flex border-slate-500 py-3 border-t border-b pl-5 font-bold text-xl">
          PYQ
        </span>
        <ul className="px-2 py-2">
          <li className="py-3 hover:bg-slate-700 rounded-md pl-3 cursor-pointer font-Roboto text-lg font-bold text-slate-300">
            1st Semester
          </li>
          <li className="py-3 hover:bg-slate-700 rounded-md pl-3  cursor-pointer font-Roboto text-lg font-bold text-slate-300">
            2nd Semester
          </li>
          <li className="py-3 hover:bg-slate-700 rounded-md pl-3  cursor-pointer font-Roboto text-lg font-bold text-slate-300">
            3rd Semester
          </li>
          <li className="py-3 hover:bg-slate-700 rounded-md pl-3  cursor-pointer">
            4th Semester
          </li>
          <li className="py-3 hover:bg-slate-700 rounded-md pl-3  cursor-pointer font-Roboto text-lg font-bold text-slate-300">
            5th Semester
          </li>
          <li className="py-3 hover:bg-slate-700 rounded-md pl-3  cursor-pointer font-Roboto text-lg font-bold text-slate-300">
            6th Semester
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AcademicLeft;
