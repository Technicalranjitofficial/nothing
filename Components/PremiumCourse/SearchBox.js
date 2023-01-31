import Image from 'next/image'
import React from 'react'

const SearchBox = ({search}) => {
  return (
    <div className='w-full mt-3'>
        <div className='max-w-screen-lg  mx-2  items-center justify-center flex border-2 border-slate-800 flex-row'>
            <input className='font-Montserrat text-xs md:text-sm text-center font-bold py-3 outline-none text-slate-300 bg-slate-900  w-full' onChange={(e)=>search(e.target.value)} placeholder='Search Courses....'  type="text" />
            <Image className='mr-2 mt-2 animate-pulse' src="/search.png" width={40} height={40} />
        </div>
    </div>
  )
}

export default SearchBox