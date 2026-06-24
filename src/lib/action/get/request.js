import { getData } from "@/lib/core/get";

export const GetRequestById = async (id) => {
    const api = `api/request-by-id?userId=${id}`
    const result = await getData(api)
    return result;
}

export const GetRequest = async (id) => {
    const api = `api/request`
    const result = await getData(api)
    return result;
}
