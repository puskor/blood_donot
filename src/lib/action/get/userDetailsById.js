import { protectedFetch } from "@/lib/core/secure";

export const GetUserDetailsById = async (id) => {
    // console.log(id)
    const api = `api/user/save-details/${id}`
    const result = await protectedFetch(api)
    return result;
}


