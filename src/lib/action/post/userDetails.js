import { serverMutation } from "@/lib/core/secure";

export const UserDetailsPost=async(details)=>{
    const api = "api/user/save-details"
    const res = await serverMutation(api,details)
    return res;

}