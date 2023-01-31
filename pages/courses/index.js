import React from "react";

import CourseCard from "../../Components/PremiumCourse/CourseCard";
import NavBar from "../../Components/Navbar";
import { createClient } from "next-sanity";
import Link from "next/link";
const client = createClient({
  projectId: "fsu412nu",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
});

const index = ({ course }) => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-screen-lg  bg-slate-900 mx-auto ">
        <NavBar />
        <div className="grid grid-cols-1 gap-3 p-2 md:p-0">
          {course &&
            course.map((val, index) => {
              return (
                <Link
                  className="no-underline"
                  href={`/courses/${val.slug.current}`}
                >
                  <CourseCard key={index} course={val} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default index;

export async function getServerSideProps() {
  const course = await client.fetch(`*[_type == "Course"]`);

  console.log("project", course);
  return {
    props: {
      course,
    },
  };
}
