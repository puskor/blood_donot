import { PostData } from "@/lib/core/post"

export const RequestPost = async (details) => {
    // console.log(details)
    const api = "api/request"
    const res = await PostData(api, details)
    return res.json();
}