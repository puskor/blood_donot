import { getData } from "@/lib/core/get";
import { protectedFetch } from "@/lib/core/secure";

export const GetDonorDataById = async (id) => {
    const api = `api/donate/${id}`
    const result = await protectedFetch(api)
    return result;
}

export const getTotalDonor = async () => {
    const api = `api/donors`;
    const resData = await getData(api);
    return resData;
}

export const getAllDonor = async (filters = {}, page = 1, limit = 8) => {
    try {
        const { bloodGroup = '', division = '', district = '', upazila = '' } = filters;

        // ইউআরএল কোয়েরি স্ট্রিং তৈরি (পেজ এবং লিমিট সহ)
        const queryString = new URLSearchParams({
            bloodGroup,
            division,
            district,
            upazila,
            page: page.toString(),
            limit: limit.toString()
        }).toString();

        const api = `api/donors?${queryString}`;
        const resData = await getData(api);

        return resData;

    } catch (error) {
        console.error("getAllDonor Action Error:", error);
        return null;
    }
};