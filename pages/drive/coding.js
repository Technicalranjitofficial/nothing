import axios from 'axios';
import React, { useState } from 'react'
import getCode from '../../lib/getCode'
import { GetCodeQuery } from '../../lib/getCodeQuery'
import { readFile } from '../../lib/readfile';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
import style from "../../Components/styles/Coding.module.scss"
import Program from '../../Components/layouts/View/program';
const Coding = () => {

  const {data,error,isLoading} = GetCodeQuery("1m_YmCkpkapRUiS6P8mSbuvj-MRj9rLpO");
  console.log(data && data.data)



 
  if(isLoading){
    return <h1>Loding...</h1>
  }
  return (
    <div className={style.coding}>
      <div className={style.codingWrapper}>

     
        {/* <Program/> */}

        {data && <Program t2={data}/>}
      </div>
      

      {/* {data && data.data.map((val,index)=>{
        return <h1 onClick={()=>getData(val.id)} key={index}>{val.name}</h1>
      })} */}
    </div>
  )
}

export default Coding
