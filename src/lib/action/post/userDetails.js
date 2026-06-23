import { PostData } from "@/lib/core/post"

export const UserDetailsPost=async(details)=>{
    // console.log(details)
    const api = "api/user/save-details"
    const res = await PostData(api,details)
    return res.json() ;

}