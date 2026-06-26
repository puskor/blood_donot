import { PostData } from "@/lib/core/post"

export const paymentPost = async (details) => {
    // console.log(details)
    const api = "api/payment"
    const res = await PostData(api, details)
    return await res.json();
}