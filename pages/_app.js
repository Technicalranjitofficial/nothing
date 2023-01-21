// import "../Components/styles/login.scss"
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

// import { PdfContainer } from 'react-files-viewer'
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools"
import 'highlight.js/styles/default.css';
import Link from "next/link";
const queryClinet = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <>
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
