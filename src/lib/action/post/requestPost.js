// import { PostData } from "@/lib/core/post"
import { serverMutation } from "@/lib/core/secure";

export const RequestPost = async (details) => {
    // console.log(details)
    const api = "api/request"
    const res = await serverMutation(api, details)
    return res;
}