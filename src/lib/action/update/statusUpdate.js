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


const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5001"; // আপনার ব্যাকএন্ড পোর্ট দিন

// ১. রিকোয়েস্ট আপডেট করার ফাংশন
export const UpdateRequest = async (id, updateData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/request/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        return await response.json();
    } catch (error) {
        console.error("Update Request Frontend Error:", error);
        return { success: false, message: "Network Error" };
    }
};