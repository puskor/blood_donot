import { getData } from "@/lib/core/get"

export const GetUserDetailsById =async (id)=>{
    const api =`api/user/save-details?userId=${id}`
    const result =await getData(api) 
    return result ;
}