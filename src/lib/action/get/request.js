import { getData } from "@/lib/core/get";

export const GetRequestById = async (id) => {
    const api = `api/request-by-id?userId=${id}`
    const result = await getData(api)
    return result;
}


export const GetRequest = async (filters = {}, page = 1, limit = 9) => {
    try {
        const { bloodGroup = '', division = '', district = '', upazila = '' } = filters;

        // কোয়েরি স্ট্রিং তৈরি
        const queryString = new URLSearchParams({
            bloodGroup,
            division,
            district,
            upazila,
            page: page.toString(),
            limit: limit.toString()
        }).toString();

        const api = `api/request?${queryString}`; // আপনার রিকোয়েস্ট এন্ডপয়েন্ট অনুযায়ী (যেমন: api/requests)

        const resData = await getData(api);
        return resData; // সম্পূর্ণ রেসপন্স অবজেক্ট রিটার্ন হবে (success, data, pagination সহ)

    } catch (error) {
        console.error("GetRequest Action Error:", error);
        return null;
    }
};


export const GetRequestOne = async (id) => {
    const api = `api/request/${id}`
    const result = await getData(api)
    return result;
}
