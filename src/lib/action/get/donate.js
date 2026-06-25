import { getData } from "@/lib/core/get";

export const GetDonorDataById = async (id) => {
    const api = `api/donate/${id}`
    const result = await getData(api)
    return result;
}
