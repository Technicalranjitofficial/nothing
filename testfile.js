
const arr = [];

const next=(data)=>{
    arr.push(data);
}
const prev=()=>{
    // const newarr = arr.filter((prev,index)=>{return index!==arr.length-1});
    // console.log(newarr.length);

    arr.pop();

    
}

const display=()=>{
    console.log(arr);
}

next(2);
next(3);
next(4);
prev();

display();
