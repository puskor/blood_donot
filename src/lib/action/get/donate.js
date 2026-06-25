import { getData } from "@/lib/core/get";

export const GetDonorDataById = async (id) => {
    const api = `api/donate/${id}`
    const result = await getData(api)
    return result;
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

        // 🌟 এবার আমরা পুরো রেসপন্স অবজেক্টটাই রিটার্ন করব, কারণ আমাদের pagination ডাটা লাগবে
        return resData;

    } catch (error) {
        console.error("getAllDonor Action Error:", error);
        return null;
    }
};