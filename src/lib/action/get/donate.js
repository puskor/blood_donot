import { getData } from "@/lib/core/get";

export const GetDonorDataById = async (id) => {
    const api = `api/donate/${id}`
    const result = await getData(api)
    return result;
}

export const getAllDonor =async()=>{
    const api = `api/user/save-details`
    const result = await getData(api)
    return result ;
}