import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center z-50 bg-slate-800/80 w-screen text-slate-100 h-screen items-center fixed'>
        <img className='animate-spin ' width={90} height={90} src="/loading.png" alt="" />
    </div>
  )
}

export default Loader