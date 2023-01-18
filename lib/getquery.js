import { useQuery } from 'react-query'
import getDrive from './getdrive';


export const getQuery=(id)=>{
   return useQuery(['data',id],()=>getDrive(id),{
        staleTime:300000,
        // refetchOnMount:"always",
        
        refetchOnWindowFocus:false,
        
    });
}