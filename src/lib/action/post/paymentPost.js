import { serverMutation } from "@/lib/core/secure";

export const paymentPost = async (details) => {
    const api = "api/payment"
    const res = await serverMutation(api, details)
    return res;
}