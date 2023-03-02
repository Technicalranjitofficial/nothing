import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'



const Navbar = () => {
  const router = useRouter();
  return (
    <div className='bg-slate-900'>
        <div className='pt-2 flex justify-between h-20  '>
        <div className='flex items-center justify-center'>
            <span className='text-slate-300 font-Alegreya font-bold text-3xl ml-2 '>KIIT- <span className='text-teal-500 animate-pulse'>CONNECT</span></span>
        </div>
        <div className='text-slate-300  items-center hidden md:flex'>
            {/* <li className='ml-3 list-none font-Alegreya cursor-pointer hover:text-slate-400 text-lg'>Home</li> */}
           <Link className='no-underline hover:text-slate-400 text-lg text-slate-300' href="/dashboard"><li className='ml-3 list-none font-Alegreya cursor-pointer '>Dashboard</li></Link> 
           <button onClick={()=>{
            axios.post(`${process.env.host}/api/Auth/logout`).then((res)=>{
              if(res.data.success){
                router.replace("/login");
              }
            })

            // console.log(process.env.host);
           }} className='no-underline hover:text-slate-400 text-lg text-slate-300' href="/dashboard"><li className='ml-3 list-none font-Alegreya cursor-pointer '>Logout</li></button> 

        </div>

        </div>
    
    </div>
  )
}

export default Navbar