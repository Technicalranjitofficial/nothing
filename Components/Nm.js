import React, { useState } from 'react'

const Nm = ({head,node}) => {
    const [data,setData]= useState("hello");

  return (
    <div>
        {data && data};
      <button onClick={()=>{console.log("running") ;console.log(head)}}>update</button>
    </div>
  )
}

export default Nm
