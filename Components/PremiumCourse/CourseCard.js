import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from 'next-sanity'
const client = createClient({
  projectId: "fsu412nu",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true
});
const CourseCard = ({ course }) => {



  const builder = imageUrlBuilder(client);
// const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);

}



  return (
    <div className="w-full border-2 cursor-pointer hover:scale-95 md:hover:scale-105 duration-100 rounded-md border-slate-800 bg-slate-900  flex flex-col md:flex-row">
    <img
      className="bg-slate-400 md:h-40 rounded-md self-center md:ml-2  md:w-52 w-full h-48 object-cover"
      src={urlFor(course.poster)
        .image(course.poster)
       
        .url()}
      alt=""
    />

    <div
      className="flex flex-col
      md:ml-3
      justify-center
      pl-1
      "
    >
      <span className="text-slate-300 mt-2 text-sm md:text-md font-Alegreya font-semibold">
        {course.title}
      </span>
     
        <p className="text-slate-300 line-clamp-2 mt-1 font-serif text-xs">
          {course.description}
        </p>
   
      <span className="text-slate-400 text-xs font-Montserrat m-0 ">
        {course.Seller}
      </span>
      <span className="text-slate-400 text-xs font-Montserrat mt-1">{course.Rating}</span>
      <div className="flex gap-1 mt-1 lis">
        <span className="text-slate-400 text-xs font-Montserrat">
          {course.hour} total hrs
        </span>
        <span className="text-slate-400 text-xs font-Montserrat">
        {course.lecture} lecture
        </span>
        <span className="text-slate-400 text-xs font-Montserrat">
          {course.Level} Level
        </span>
      </div>
    </div>
  </div>
   
  );
};

export default CourseCard;
