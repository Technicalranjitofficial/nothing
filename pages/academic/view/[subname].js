
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const test = () => {

 const router = useRouter();
 
 const [sub,setSub] = useState();
useEffect(()=>{
  const {subname} = router.query;
  setSub(subname);
// setSub()
})
 return (
    <iframe src= {`https://drive.google.com/file/d/${sub}/preview`} className='w-full h-full min-h-screen' allow="autoplay"></iframe>
  )
}

export default test