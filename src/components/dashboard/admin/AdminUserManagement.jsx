"use client";
import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { authClient } from "@/lib/auth-client"; // আপনার BetterAuth ক্লায়েন্ট পাথ
import AdminUserTable from './AdminUserTable';
import AdminEditUserModal from './AdminEditUserModal';
import { uploadImage } from '@/lib/uploadImage';
import toast from 'react-hot-toast';

export default function AdminUserManagement() {
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // ১. BetterAuth দিয়ে সব ইউজার লোড করা (Read)
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const res = await authClient.admin.listUsers({
                query: { limit: 50 }
            });

            if (res?.data?.users) {
                setUsersList(res.data.users);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 🔄 ২. ROLE TOGGLE HANDLER (Donor <-> Volunteer)
    const handleToggleRole = async (userId, currentRole) => {
        const newRole = currentRole === 'donor' ? 'volunteer' : 'donor';

        try {
            const res = await authClient.admin.setRole({
                userId: userId,
                role: newRole
            });

            if (res?.error) {
                toast.error(res.error.message);
                return;
            }

            // রিয়েল-টাইম স্টেট আপডেট
            setUsersList(prev => prev.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            console.error("Role toggle error:", error);
        }
    };

    // ➕ ৩. CREATE & UPDATE HANDLER
 // AdminUserManagement.jsx এর ভেতরের ক্রিয়েট-আপডেট ফাংশনটি রিপ্লেস করুন:
const handleCreateOrUpdate = async (userId, formData, avatarFile) => {
    try {
        let avatarUrl = selectedUser?.image || ""; // এক্সিস্টিং ইমেজ বা ডিফল্ট ফাকা

        // ১. কোনো নতুন ছবি মডাল থেকে আপলোড করা হলে ক্লাউডিনারি/সার্ভারে পুশ করা
        if (avatarFile) {
            avatarUrl = await uploadImage(avatarFile);
        }

        if (userId) {
            // 📝 UPDATE MODE
            // BetterAuth রোল সিনক্রোনাইজেশন
            await authClient.admin.setRole({
                userId: userId,
                role: formData.role
            });

            // আপনার কাস্টম ডাটাবেজ আপডেট করার জন্য কাস্টম সার্ভার অ্যাকশন (যদি থাকে)
            // await UserDetailsUpdate({ userId, ...formData, image: avatarUrl });

            setUsersList(prev => prev.map(u => u.id === userId ? { ...u, ...formData, image: avatarUrl } : u));
            toast.success("User updated successfully!");
        } else {
            // ➕ CREATE MODE: ঠিক সাইন-আপ পেইজের মতোই সিকোয়েন্সিয়াল ডাটা স্টোরিং
            
            // প্রথম ধাপ: BetterAuth এ অ্যাকাউন্ট তৈরি
            const res = await authClient.admin.createUser({
                name: formData.name,
                email: formData.email,
                password: formData.password, // মডাল থেকে জেনারেট হওয়া পাসওয়ার্ড
                image: avatarUrl,
                role: formData.role
            });

            if (res?.error) {
                toast.error(res.error.message);
                return;
            }

            // দ্বিতীয় ধাপ: আপনার মেইন মঙ্গোডিবি/পোস্টগ্রেস ডাটাবেজে ইউজার ডিটেইলস পোস্ট করা
            const details = {
                userId: res.data?.id || res.data?.user?.id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                bloodGroup: formData.bloodGroup,
                division: formData.division,
                district: formData.district,
                upazila: formData.upazila,
                image: avatarUrl,
                role: formData.role, // নতুন রোল ট্র্যাক করা
                createdAt: new Date()
            };

            const serverResult = await UserDetailsPost(details);

            if (serverResult.success) {
                setUsersList(prev => [details, ...prev]);
                toast.error("New user created & synced to database!");
            } else {
                toast.error(serverResult.message || "Auth created but database sync broke down.");
            }
        }
    } catch (error) {
        // console.error("CRUD Lifecycle Failure:", error);
        toast.error("Operation failed!");
    }
};
    // 🚨 ৪. DELETE HANDLER
    const handleDeleteUser = async (userId, name) => {
        if (!confirm(`Are you sure you want to permanently delete ${name}?`)) return;

        try {
            const res = await authClient.admin.removeUser({ userId });

            if (res?.error) {
                toast.error(res.error.message);
                return;
            }

            setUsersList(prev => prev.filter(user => user.id !== userId));
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    return (
        <div className="p-6 sm:p-10 space-y-6 w-full font-inter">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 font-poppins">User Control Center</h1>
                    <p className="text-xs sm:text-sm text-slate-400">BetterAuth secure user role switching and credential lifecycle management.</p>
                </div>

                <button
                    onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 px-4 h-11 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-rose-600/10"
                >
                    <FiPlus className="w-4 h-4 stroke-[2.5]" /> Add New User
                </button>
            </div>

            {/* লোডিং ও টেবিল রেন্ডারিং */}
            {isLoading ? (
                <div className="text-center py-10 text-sm font-medium text-slate-400 animate-pulse">
                    Fetching secure user registries...
                </div>
            ) : (
                <AdminUserTable
                    users={usersList}
                    onToggleRole={handleToggleRole}
                    onEdit={(user) => { setSelectedUser(user); setIsModalOpen(true); }}
                    onDelete={handleDeleteUser}
                />
            )}

            {/* 🌟 CRUD পপআপ মডাল (প্রপস নাম মেলানো হয়েছে) */}
            <AdminEditUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
                onUpdateComplete={handleCreateOrUpdate}
            />
        </div>
    );
}