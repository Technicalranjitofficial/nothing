import React from 'react'

const Card = ({name}) => {
  return (
    <div className='w-full rounded-lg cursor-grab duration-300 border-2 border-slate-700 h- md:min-h-96 bg-slate-900 hover:scale-105 '>
        <div className='flex justify-center rounded-md items-center w-full md:max-h-72 aspect-w-3 aspect-h-2 '>
            <img className='rounded-t-md object-cover w-full h-full object-center'  src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="image" />
        </div>

        <div className='p-4  flex justify-center'>
           <span className='text-xl text-center font-Alegreya text-slate-300 font-semibold'>{name}</span>
        </div>
    </div>
  )
}

export default Card