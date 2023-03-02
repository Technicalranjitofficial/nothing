import React from 'react'

import { createClient } from 'next-sanity';

// import NavBar from '@/Components/NavBar';
// import Post from '@/Components/post/Post';
// import NewsLetter from '@/Components/NewsLetter';
// import Copyright from '@/Components/Copyright';

// require("dotenv").config();

import Post from "../../Components/Post"
import Navbar from '../../Components/Navbar';
const client = createClient({
    projectId: `${process.env.projectId}`,
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: true
  });
  
const Posts = ({blogs,user}) => {



  return (
    <>
    <div className='bg-slate-900'>
      <div className='mx-auto max-w-screen-lg px-3 py-6 '>
        <Navbar/>
  <Post user={user && user} client={client} blogs={blogs}/>
  
  <div className='border-t mt-7 border-gray-600 '></div>
  <div className='border-t mt-7 border-gray-600 '></div>

      </div>
    </div>
      </>
  )
}

export default Posts



export async function getServerSideProps(context){
  const {courseId} = context.query;
    
    const blogs = await client.fetch(`*[_type=="Course" && slug.current=='${courseId}']`);
    
    return{
      props:{
        blogs:blogs[0]
      }
    }
  
  }