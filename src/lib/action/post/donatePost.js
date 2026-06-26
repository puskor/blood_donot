// import { PostData } from "@/lib/core/post"
import { serverMutation } from "@/lib/core/secure";

export const DonatePost = async (details) => {
    // console.log(details)
    const api = "api/donate"
    const res = await serverMutation(api, details)
    return res;
}