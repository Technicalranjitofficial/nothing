import { useQuery } from 'react-query'
import getDrive from './getdrive';


export const GetQuery=(id)=>{
   return useQuery(['data',id],()=>getDrive(id),{
        staleTime:300000,
        // refetchOnMount:"always",
        
        refetchOnWindowFocus:false,
        
    });
}