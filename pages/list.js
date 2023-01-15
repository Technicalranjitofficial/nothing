import axios from 'axios'
import { useEffect, useState } from 'react'

// const List = ({data}) => {
//     const [datas,setDatas]= useState([]);
//     const [loading,setLoading] = useState(false);


//     useEffect(()=>{
//         console.log(data.props.data);
//         setDatas(data.props.data)
//     },[])

//    window.onpopstate((e)=>{
//     console.log("back pressed");
//    })
//     const handleOnclick=async(id)=>{
//         setLoading(true);
//         console.log("hello")
//         // setDatas([]);
//         axios.post("http://localhost:3000/api/drive/getfoldersonly",{id:id}).then(async (data)=>{
//         const result = await Promise.all(data.data.map((list)=>{
//             // console.log(list);
//             return list;
//         }))
//         console.log("list",result);
//         setDatas(result);
//         setLoading(false);
//         }).catch((err)=>{
//             console.log(err);
//         })
//     }
//   return (
//     <div className='files'>
//      {loading?"Loading":<> {data  && datas.map((rd,index)=>{
//         return <a onClick={()=>{handleOnclick(rd.id)}}>{rd.name}&</a>
//       })}</>}
//     </div>
//   )
// }

// export default List



import React, { Component } from 'react'

export default class list extends Component {

    constructor(props){
        super(props);
   this.state={
       arr:[],
       loading:false,
       prev:"",
       next:"",
       current:"1E8fVXMIlHhPhhWDR1h1Gi6AxKmeR-0MO",
       path:[],
       counter:0,
       url:"http://localhost:3000/api/drive/getfoldersonly"
    }
       
    // this.handleOnback= this.handleOnback.bind(this);
    this.fetch = this.fetch.bind(this);
}


componentDidMount(){

    this.startup("1E8fVXMIlHhPhhWDR1h1Gi6AxKmeR-0MO");
    // if(this.state.path.length>0){
    //     console.log(this.state.path);
    // }

}

startup=async(id)=>{
    this.setState({loading:true})
    axios.post(this.state.url,{
        id:id
    }).then((data)=>{
        this.setState(prev=>({
            arr:data.data,loading:false,prev:id,current:id,
        }))
    })
}

fetch=async(id)=>{
    this.setState({loading:true})
    axios.post(this.state.url,{
        id:id
    }).then((data)=>{
        const add = this.state.path.push(this.state.prev);
        this.setState(prev=>({
            arr:data.data,loading:false,prev:id,current:id,path:[...prev.path,add],counter:prev.counter+1
        }));

        // console.log(this.state.counter);

        console.log(this.state.path);
    })
}


handleOnBack=async(id)=>{

    // if(this.state.path.length<3){
    //     return;
    // }

   console.log("prin")
    this.setState({loading:true})
    axios.post(this.state.url,{
        id:id
    }).then((data)=>{
        const remove = this.state.path.filter(prev=>prev!=id);
        console.log(remove);
        this.setState(prev=>({
            arr:data.data,loading:false,prev:id,current:id,path:prev.path=null,counter:prev.counter-1
        }));

       
    })
    

}
  render() {
    return (
        <div className='files'>
            
              {this.state.loading?"Loading":<> {this.state.arr  && this.state.arr.map((rd,index)=>{
                // console.log(rd)
                return <a key={index} onClick={()=>{this.fetch(rd.id,)}}>{rd.name}</a>
              })}</>}
              <button onClick={()=>this.fetch(this.state.path[this.state.path.length-2])}>back</button>
            </div>

     
    )
  }
}




// export async function getServerSideProps({req,res}){
//    const data = await axios.post("http://localhost:3000/api/drive/listfiles").then((data)=>{
//         return{
//             props:{
//                 data:data.data
//             }
//         }
//     }).catch((err)=>{
//         console.log(err);
//         return{
//             props:{err:err}
//         }
//     })

//     return {
//         props:{
//             data:JSON.parse(JSON.stringify(data))
//         }
//     }


// }
