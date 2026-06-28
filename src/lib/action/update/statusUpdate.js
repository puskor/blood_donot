import { serverMutation } from "@/lib/core/secure"


export const statusUpdate = async (requestId, donorId, status) => {

    const api = `api/request/update/${requestId}`
    const data = {
        donorId: donorId,
        status: status
    }

    const result = await serverMutation(api, data,"PATCH")
    return result

}


// ১. রিকোয়েস্ট আপডেট করার ফাংশন
export const UpdateRequest = async (id, updateData) => {
    const api = `api/request/update/${id}`
    const result = await serverMutation(api, updateData, "PATCH")
    return result;

};


export const UpdateUser = async (id, updateData) => {
    const api = `api/user/save-details/${id}`
    const result = await serverMutation(api, updateData, "PATCH")
    return result;
}