import { useQuery } from 'react-query'
import getCode from './getCode';
import getDrive from './getdrive';


export const GetCodeQuery=(id)=>{
   return useQuery(['data',id],()=>getCode(id),{
        staleTime:300000,
        // refetchOnMount:"always",
        
        refetchOnWindowFocus:false,
        
    });
}