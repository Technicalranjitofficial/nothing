import Link from 'next/link'
import React from 'react'
import CodingMenu from '../../Components/Card.js/CodingSection/CodingMenu'
import Navbar from '../../Components/Navbar'
import data from "../../data.json"

const index = () => {
    console.log(data.data)
  return (
    <div className='bg-slate-900 min-h-screen ' >


      <div className='max-w-screen-lg  bg-slate-900 px-2 mx-auto '>
        <Navbar/>
        <h1 className='text-slate-300 font-bold font-Alegreya text-2xl md:text-3xl pt-4'>Coding Section</h1>
       <div className='grid grid-cols-1 gap-0'>
       {data && data.data.map((val,index)=>{
        return  <Link key={index} className='no-underline' href={`/Coding/${val.name}`}><CodingMenu name={`${val.name}`}  img={`${val.img}`} description={`${val.description}`}/></Link>
       })}

       </div>
      </div>
      </div>
  )
}

export default index