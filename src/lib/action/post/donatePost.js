import { PostData } from "@/lib/core/post"

export const DonatePost = async (details) => {
    // console.log(details)
    const api = "api/donate"
    const res = await PostData(api, details)
    return await res.json();
}