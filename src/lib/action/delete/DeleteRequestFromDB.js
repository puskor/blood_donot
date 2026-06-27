import { authHeader } from "@/lib/core/secure";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5001"; // আপনার ব্যাকএন্ড পোর্ট দিন

// ২. রিকোয়েস্ট ডিলিট করার ফাংশন
export const DeleteRequestFromDB = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/request/delete/${id}`, {
            method: 'DELETE',
            headers: await authHeader()
        });
        return await response.json();
    } catch (error) {
        console.error("Delete Request Frontend Error:", error);
        return { success: false, message: "Network Error" };
    }
};