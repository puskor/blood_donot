// import { PostData } from "@/lib/core/post"
import { protectedFetch, serverMutation } from "@/lib/core/secure";

export const paymentPost = async (details) => {
    // console.log(details)
    const api = "api/payment"
    const res = await serverMutation(api, details)
    return res;
}