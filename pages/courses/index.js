import React from "react";

import CourseCard from "../../Components/PremiumCourse/CourseCard";
import NavBar from "../../Components/Navbar";
import { createClient } from "next-sanity";
import Link from "next/link";
import SearchBox from "../../Components/PremiumCourse/SearchBox";
import { useState } from "react";
const client = createClient({
  projectId: "fsu412nu",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
});

const Index = ({ course }) => {
  const [data,setData]= useState(course);
  const filter = (input)=>{
    if(input.length>0){
      const newData = course.filter(prev=>{
        return Object.values(prev).join('').toLowerCase().includes(input.toLowerCase());
      })
      setData(newData);
    }else{
      setData(course);
    }
  }
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-screen-lg  bg-slate-900 mx-auto ">
        <NavBar  />
        <SearchBox search={filter} />
        <div className="mt-3 grid grid-cols-1 gap-3 p-2 md:p-0">
          {data && data.length>0?
            data.map((val, index) => {
              return (
                <Link key={index}
                  className="no-underline"
                  href={`/courses/${val.slug.current}`}
                >
                  <CourseCard  course={val} />
                </Link>
              );
            }):<span className="text-slate-300 text-center items-center font-Alegreya">Result matches : 0</span>}
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps() {
  const course = await client.fetch(`*[_type == "Course"]`);

  console.log("project", course);
  return {
    props: {
      course,
    },
  };
}
