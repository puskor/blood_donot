import { authClient } from "@/lib/auth-client";

// ➕ ১. নতুন ইউজার তৈরি (Create User via BetterAuth Admin)
export const AdminCreateUser = async (userData) => {
    try {
        // BetterAuth-এর বিল্ট-ইন admin.createUser মেথড
        const res = await authClient.admin.createUser({
            name: userData.name,
            email: userData.email,
            password: "TemporaryPassword123!", // ডিফল্ট পাসওয়ার্ড (ইউজার পরে চেঞ্জ করে নেবে)
            role: userData.role, // 'admin' | 'user' | 'volunteer'
        });

        if (res.error) return { success: false, message: res.error.message };
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
};

// 📝 ২. ইউজারের ইনফো বা রোল পরিবর্তন (Update User/Role)
export const AdminUpdateUser = async (userId, updateData) => {
    try {
        // BetterAuth-এ রোল চেঞ্জ করার জন্য setRole ব্যবহার করা হয়
        if (updateData.role) {
            await authClient.admin.setRole({
                userId: userId,
                role: updateData.role
            });
        }

        // অন্যান্য ইনফো (যেমন ব্যান করা বা ইউজার ডেটা মডিফাই করা) BetterAuth এর নিজস্ব ফাংশন দিয়ে করা যায়
        // অথবা সরাসরি আপনার ডাটাবেজ API কল করতে পারেন।
        return { success: true };
    } catch (error) {
        return { success: false, message: "Update failed" };
    }
};

// 🚨 ৩. ইউজার পুরোপুরি ডিলিট করা (Remove User)
export const AdminDeleteUser = async (userId) => {
    try {
        // BetterAuth-এর বিল্ট-ইন admin.removeUser মেthod
        const res = await authClient.admin.removeUser({
            userId: userId
        });

        if (res.error) return { success: false, message: res.error.message };
        return { success: true };
    } catch (error) {
        return { success: false, message: "Delete failed" };
    }
};