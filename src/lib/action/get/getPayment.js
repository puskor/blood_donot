import { getData } from "@/lib/core/get";

export const GetPayment = async () => {
    const api = "api/payment"
    const result = await getData(api)
    return result;
}
