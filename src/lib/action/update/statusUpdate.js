import { serverMutation } from "@/lib/core/secure"
import { updateData } from "@/lib/core/update"

export const statusUpdate = async (requestId, donorId, status) => {

    const api = `api/request/update/${requestId}`
    const data = {
        donorId: donorId,
        status: status
    }
    
    const result = await updateData(api, data)
    return result

}


// ১. রিকোয়েস্ট আপডেট করার ফাংশন
export const UpdateRequest = async (id, updateData) => {
    const api = `api/request/update/${id}`
    const result = await serverMutation(api,updateData,"PATCH")
    return result ;
    // try {
    //     const response = await fetch(`${BASE_URL}/api/request/update/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(updateData),
    //     });
    //     return await response.json();
    // } catch (error) {
    //     console.error("Update Request Frontend Error:", error);
    //     return { success: false, message: "Network Error" };
    // }
};