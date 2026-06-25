import { getData } from "@/lib/core/get"

export const GetUserDetailsById = async (id) => {
    const api = `api/user/save-details/${id}`
    const result = await getData(api)
    return result;
}


