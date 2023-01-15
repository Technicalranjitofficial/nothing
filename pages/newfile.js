import React, { useEffect, useState } from "react";
import Nm from "../Components/Nm";
import LinkedList from "../node";

const Newfile = () => {

    const [data,setData] = useState("");
    const ll = new LinkedList();
    const [node,setNode] = useState({});


    // ll.insertFirst(20)
    // ll.insertFirst(30)
    // ll.insertFirst(40)
  useEffect(() => {
    console.log("running",ll.head);
  },[]);


const insert=(data)=>{
//  console.log(ll.head)
    ll.insertFirst(data);
    // setNode(ll.head);

    console.log(ll.head);
   
}

const display=()=>{
  console.log(ll.head);

}
const deleteNode=(data)=>{
    ll.deleteNode();
    console.log(ll.head);
    // setData(ll.head.data);
}

  return<>
  
{data && data}

{/* {data && data} */}
<Nm head={ll.head && ll.head.data}/>
  <button onClick={()=>display()}>display</button>
  <button onClick={()=>insert(data?data+20:20)}>insert</button>
  <button onClick={()=>deleteNode()}>insert</button>
  </>;
};

export default Newfile;
