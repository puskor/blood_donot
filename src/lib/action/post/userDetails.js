// import { PostData } from "@/lib/core/post"
import { serverMutation } from "@/lib/core/secure";

export const UserDetailsPost=async(details)=>{
    // console.log(details)
    const api = "api/user/save-details"
    const res = await serverMutation(api,details)
    return res;

}