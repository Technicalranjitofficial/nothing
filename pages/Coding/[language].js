import { useRouter } from 'next/router'
import React from 'react'
import { GetCodeQuery } from '../../lib/getCodeQuery';
import style from "../../Components/styles/Coding.module.scss"
import Program from '../../Components/layouts/View/program';
const Language = () => {

    const router = useRouter();
    const {language} = router.query;
    if(language==="C"){
        console.log("true")
    }
    const {data,error,isLoading} = GetCodeQuery(language==="C"?`${process.env.C_ID}`:language==="C++"?process.env.CP_ID:process.env.JAVA_ID);
    console.log(data && data.data)
  
  
  
   
  
    return (
      <div className={style.coding}>
        <div className={style.codingWrapper}>
  
       
          {/* <Program/> */}
  
          {data && <Program t2={data} language={language}/>}
        </div>
        
  
        {/* {data && data.data.map((val,index)=>{
          return <h1 onClick={()=>getData(val.id)} key={index}>{val.name}</h1>
        })} */}
      </div>
    )
}

export default Language