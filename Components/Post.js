import { PortableText } from "@portabletext/react";
import React, { useEffect } from "react";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import imageUrlBuilder from "@sanity/image-url";
// import PortableText from 'react-portable-text';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import Header from "../Components/Header";

// import  docco  from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

const Post = ({ blogs, client,user }) => {
  const builder = imageUrlBuilder(client);


  
  // console.log("blogs",blogs.content);
  // console.log("created",blogs.CreatedAt);
  // console.log("user",user.title)


   let info ={
      createdAt:blogs.createdAt&&blogs.createdAt,
      postedBy:blogs.Seller,
      title:blogs.title
  
    }
  
  

  function urlFor(source) {
    return builder.image(source);
  }
  const SampleImageComponent = (value) => {
   
    const { width, height } = getImageDimensions(value);

    // console.log("url", urlFor(value).url());
    return (
      <div className="justify-center flex rounded-md">
        <img className="rounded-md"
          src={urlFor(value)
            .image(value)
            .width('800')
            .fit("max")
            .auto("format")
            .url()}
          alt={value.alt || "hellow"}
          loading="lazy"
          style={{
            // Avoid jumping around with aspect-ratio CSS property
            aspectRatio: width / height,
          }}
        />
      </div>
    );
  };

  return (
    <div className="mt-8 ">
      {/* <div className="text-center text-white font-bold font-Montserrat text-2xl ">
        Post
      </div> */}

      <div className="">
        <Header urlFor={urlFor} value={blogs.poster} info={info && info}/>
      </div>
      <div className='border-t mt-7 border-slate-700 '></div>
      <div className="md:px-2 md:border-l-2 border-slate-800 md:border-r-2 md:border-b-2" >
      <PortableText
      
      value={blogs.content}
      components={{
        types: {
          image: (props) => SampleImageComponent(props.value),
          // code: (props) => (
          //     <SyntaxHighlighter className="rounded-md mt-2 mb-2"language="javascript" >
          //     {props.value.code}
          //   </SyntaxHighlighter>

          // ),

         
        },
        listItem: {
          // Ex. 1: customizing common list types
          bullet: ({children}) => <div className="md:ml-12  mt-1">
              <li className="font-Lato"  style={{listStyleType: 'circle'}}>{children}</li>
          </div>,
          number: ({children}) => <li style={{listStyleType: 'number'}} className="mt-lg ml-10 mb-1 text-white">{children}</li>,

          // Ex. 2: rendering custom list items
          checkmarks: ({children}) => <li>✅ {children}</li>,
        },
        list: {
          // Ex. 1: customizing common list types
          bullet: ({children}) => <ul  className="mt-xl text-white">{children}</ul>,
          number: ({children}) => <ol className="mt-lg text-white">{children}</ol>,
      
          // Ex. 2: rendering custom lists
          // checkmarks: ({children}) => <ol className="m-auto text-lg">{children}</ol>,
        },

        marks: {
          link: ({children, value}) => {
            
            const rel = !value.url.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
              <a className="text-blue-500" href={value.url} rel={rel}>
                {children}
              </a>
            )
          },
          color:(props)=>(
          //  props
          // console.log("present",props)
        <span style={{color:`${props.value.hex}`}}>{props.text}</span>
          )
        },

        
        block: {
          // Customize block types with ease
          h1: ({ children }) => (
            <h1 className="text-2xl md:text-3xl font-semibold mb-6 mt-6 font-Roboto text-slate-200">{children}</h1>
          ), 
          h2: ({ children }) => (
            <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-6 font-Roboto text-slate-200">{children}</h2>
          ),

          h3: ({ children }) => (
              <h3 className="text-lg md:text-xl font-semibold mb-5 mt-5 font-Roboto text-slate-200">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg md:text-lg font-semibold mb-2 mt-3 font-Roboto text-slate-200">{children}</h4>
            ),
           
            
          
          normal: ({ children }) => <p className="text-white mt-3 text-sm md:text-base font-OpenSans">{children}</p>,

          // Same applies to custom styles
          customHeading: ({ children }) => (
            <h2 className="text-lg text-primary text-purple-700">
              {children}
            </h2>
          ),
        },
      }}
    />

     <div className="flex justify-center mb-5 ">
     <a href={blogs.downloadLink} className="bg-teal-800 no-underline hover:text-slate-300 cursor-pointer px-8 rounded-sm hover:scale-105 hover:bg-teal-700 font-Alegreya py-2 mt-3 font-semibold text-slate-300 ">Download</a>
     </div>
      
      </div>

      

     
    </div>
  );
};

export default Post;
