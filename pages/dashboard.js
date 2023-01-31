import Link from 'next/link'
import React from 'react'
import Card from '../Components/Card.js/CardMenu'
import Navbar from '../Components/Navbar'

const Dashboard = () => {
  return (
    <div className='bg-slate-900 min-h-screen' >


      <div className='max-w-screen-lg  bg-slate-900 mx-auto '>
        <Navbar/>
        <h1 className='text-slate-300 font-Alegreya font-bold p-2.5'>Dashboard</h1>
       <div className='grid grid-cols-1 md:grid-cols-3 p-2 md:pd-0 gap-5'>
       <Link className='no-underline' href="/Coding"> <Card name="Coding Section" img="./code.png"/></Link>
       <Link className='no-underline' href="/drive/filemanager"> <Card name="Academic Resources" img="./academic.png" /></Link>
       <Link className='no-underline' href="/courses"><Card name="Online Courses" img="onlineCourse.png"/></Link>
        <Card name="Something Coming.."/>
        <Card name="Something Coming.."/>
      
      
        
       </div>
      </div>
      </div>
  )
}

export default Dashboard