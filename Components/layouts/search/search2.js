import React from 'react'
import style from "./search.module.scss"
const Search2 = ({setD,t2}) => {


  const handleOnSearch=(e)=>{


    

    if(e.target.value!==''){
      const filtereddata = t2.data.filter((item)=>{
       return Object.values(item).join('').toLowerCase().includes(e.target.value.toLowerCase());
      });

      setD(filtereddata);

      console.log(filtereddata);
    }else{
      setD(t2.data);
    }


    
  }
  return (
    <div className={style.input}>
    <input type="text" placeholder='Search topic related codes...'  onChange={(e)=>handleOnSearch(e)} />
   
   </div>
  )
}

export default Search2