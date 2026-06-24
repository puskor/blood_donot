"use client";

import ProfileCard from '@/components/dashboard/profile/ProfileCard';
import EditProfileModal from '@/components/dashboard/profile/EditProfileModal'; // ১. এডিট মডালটি ইম্পোর্ট করা হলো
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage(userDetails) {
    const router = useRouter();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // ২. এডিট প্রোফাইল মডাল স্টেট

    // ৩. ইউজারের ডেটাকে রিঅ্যাক্ট স্টেটে নেওয়া হলো যেন এডিট করলে সাথে সাথে UI-তে আপডেট দেখায়
    const [userData, setUserData] = useState({
        ...userDetails

    });


    // নতুন রিকোয়েস্ট সাবমিট হ্যান্ডলার
    const handleAddRequestSubmit = (newRequestData) => {
        const formattedRequest = {
            id: myRequests.length + 1,
            patientName: newRequestData.patientName,
            bloodGroup: newRequestData.bloodGroup,
            hospital: newRequestData.hospitalName,
            date: newRequestData.neededDate,
            status: newRequestData.status
        };

        setMyRequests(prev => [formattedRequest, ...prev]);
        console.log("Newly Saved Data to push in Backend:", newRequestData);
    };

    // ৪. প্রোফাইল সাকসেসফুলি আপডেট হওয়ার পর মেইন পেজের স্টেট আপডেট করার ফাংশন
    const handleProfileUpdateComplete = (updatedDetails) => {
        setUserData(prev => ({
            ...prev,
            ...updatedDetails
        }));
    };

    // ৫. লগআউট হ্যান্ডলার ফাংশন
    const handleLogout = () => {
        // এখানে আপনার সেশন বা কুকি ডিলিট করার কোড বসবে
        // উদাহরণ: await authClient.signOut();
        router.push('/login');
    };

    return (
        <div className="w-full min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 font-inter">
            <div className="w-full max-w-6xl mx-auto space-y-8">

                {/* Top Profile Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins tracking-tight">My Profile</h1>
                    </div>
                </div>


                {/* ProfileCard এ ফাংশনগুলো পাস করা হলো */}
                <ProfileCard
                    user={userData}
                    onEditClick={() => setIsEditModalOpen(true)}
                    onLogout={handleLogout}
                />
            </div>

            {/* ২. এডিট প্রোফাইল পপআপ মডাল (নতুন যুক্ত করা হয়েছে) */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userData={userData}
                onUpdateComplete={handleProfileUpdateComplete}
            />
        </div>
    );
}