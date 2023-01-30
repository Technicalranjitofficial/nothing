// import "../Components/styles/login.scss"
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

// import { PdfContainer } from 'react-files-viewer'
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools"
import 'highlight.js/styles/default.css';
import Link from "next/link";
import { useState } from "react";
const queryClinet = new QueryClient();
import Router from "next/router";
import Loader from "../Components/Loader"
export default function App({ Component, pageProps }) {
  const [loading,setLoading] = useState(false);



  Router.events.on("routeChangeStart",()=>{
    setLoading(true);
    console.log("changing")
  })



  Router.events.on("routeChangeComplete",()=>{
    setLoading(false);
    console.log("complete")
  })
  return (
    <>
    {loading && <Loader />}
      <QueryClientProvider client={queryClinet} contextSharing={true}>
        {/* <ul>
            <li><Link href="/normal">Normal</Link></li>
            <li><Link href="/test">React Query</Link> </li>
        </ul> */}
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
      {/* <PdfContainer url="https://www.googleapis.com/drive/v3/files/1zDQMBGe-kzgApt0Rwv7YbPWbW7bfxHHp?alt=media&key=AIzaSyCdVB-50SIiRTLwDDuwuHgtEPR-eEopMls"/> */}
    </>
  );
}
