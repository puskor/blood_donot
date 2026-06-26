import { getData } from "@/lib/core/get";
import { protectedFetch } from "@/lib/core/secure";

export const GetPayment = async () => {
    const api = "api/payment"
    const result = await protectedFetch(api)
    return result;
}
