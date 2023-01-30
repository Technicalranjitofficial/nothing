import React from "react";

const CodingMenu = ({name,img,description}) => {
  return (
    <div 

              
    
    className="mt-3 hover:scale-95 md:hover:scale-105  duration-150 bg-slate-900 border-2 border-slate-800 relative group cursor-pointer  flex items-center rounded-md md:flex-row   flex-col w-full "
  >
    <div className="flex flex-col md:flex-row items-center md:py-2">
     
      <img
        className="max-h-32   max-w-96 hover:translate-y-1 cursor-pointer"
        src={img}
        alt="img"
      />

      <div className="md:ml-3 rounded-2xl">
        <div className="flex items-center rounded-md md:flex-row sm:flex-col flex-col lg:flex-row md:mt-0 mt-2">
          <span className="text-slate-300 pl-2 font-Alegreya font-bold text-center text-2xl ">
            {name}
          </span>
          
        
        </div>
        <div className="">
        <p className="mt-2 p-2  text-gray-300 md:text-sm text-xs font-Lato">
          {description}
        </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CodingMenu;
