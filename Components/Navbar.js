import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-slate-900'>
        <div className='pt-2 flex justify-between h-20  '>
        <div className='flex items-center justify-center'>
            <span className='text-slate-300 font-Alegreya font-bold text-3xl ml-2 '>KIIT- <span className='text-teal-500 animate-pulse'>CONNECT</span></span>
        </div>
        <div className='text-slate-300  items-center hidden md:flex'>
            {/* <li className='ml-3 list-none font-Alegreya cursor-pointer hover:text-slate-400 text-lg'>Home</li> */}
           <Link className='no-underline hover:text-slate-400 text-lg text-slate-300' href="/dashboard"><li className='ml-3 list-none font-Alegreya cursor-pointer '>Dashboard</li></Link> 

        </div>

        </div>
    
    </div>
  )
}

export default Navbar