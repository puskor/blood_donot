"use client";

import MyDonationsTable from '@/components/dashboard/profile/MyDonationsTable';
import MyRequestsTable from '@/components/dashboard/profile/MyRequestsTable';
import ProfileCard from '@/components/dashboard/profile/ProfileCard';
import AddRequestModal from '@/components/dashboard/profile/AddRequestModal';
import { useState } from 'react';
import { FaDroplet, FaHandHoldingHand, FaPlus } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

export default function ProfilePage() {
    // const {data:session} = useSession()
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('requests');
    const [isModalOpen, setIsModalOpen] = useState(false); // এড রিকোয়েস্ট মডাল স্টেট
    // const userId = session?.user?.id ;
    // console.log(userId) ;


    // ৩. ইউজারের ডেটাকে রিঅ্যাক্ট স্টেটে নেওয়া হলো যেন এডিট করলে সাথে সাথে UI-তে আপডেট দেখায়
    const [userData, setUserData] = useState({
        userId: "6a3a7aadc92dc921989ab98f", // আপনার আগের প্রোভাইড করা আইডি ফরম্যাট
        name: "Rasel Ahmed",
        email: "donor1@gmail.com",
        phone: "01712345678",
        bloodGroup: "O+",
        division: "Dhaka",
        district: "Dhaka",
        upazila: "Dhanmondi",
        image: "https://i.ibb.co/ymcG1wz0/Screenshot-2026-06-21-at-9-39-03-AM.png",
        role: "donor",
        createdAt: "2026-06-22T12:23:09.481Z"
    });

    // লোকাল রিঅ্যাক্ট স্টেট রিকোয়েস্টের জন্য
    const [myRequests, setMyRequests] = useState([
        { id: 1, patientName: "Sumon Ali", bloodGroup: "O+", hospital: "Square Hospital", date: "25 June, 2026", status: "Pending" },
        { id: 2, patientName: "Karim Uddin", bloodGroup: "O+", hospital: "Dhaka Medical", date: "10 May, 2026", status: "Completed" },
    ]);

    const myDonations = [
        { id: 1, recipientName: "Abir Hossain", date: "12 Feb, 2026", location: "Enam Medical", status: "Successful" },
        { id: 2, recipientName: "Mitu Akter", date: "05 Nov, 2025", location: "Labaid Hospital", status: "Successful" },
    ];

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
                        <p className="text-xs text-slate-400 mt-1 font-medium">Dashboard / Profile</p>
                    </div>
                    {/* + Add Request Trigger Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 h-10 px-5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-600/10 font-poppins active:scale-[0.98] self-start sm:self-auto"
                    >
                        <FaPlus className="h-3.5 w-3.5" />
                        Add Request
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Grid Section */}
                    <div className="lg:col-span-4 w-full">
                        {/* ProfileCard এ ফাংশনগুলো পাস করা হলো */}
                        <ProfileCard
                            user={userData}
                            onEditClick={() => setIsEditModalOpen(true)}
                            onLogout={handleLogout}
                        />
                    </div>

                    {/* Right Grid Section */}
                    <div className="lg:col-span-8 space-y-6 w-full">

                        {/* Tab Switch Buttons */}
                        <div className="flex border border-slate-100 bg-white p-1.5 rounded-xl shadow-sm gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab('requests')}
                                className={`flex-1 h-11 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all font-poppins ${activeTab === 'requests'
                                    ? 'bg-rose-600 text-white shadow-sm'
                                    : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/60'
                                    }`}
                            >
                                <FaDroplet className="h-4 w-4" />
                                My Requests
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('donations')}
                                className={`flex-1 h-11 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all font-poppins ${activeTab === 'donations'
                                    ? 'bg-rose-600 text-white shadow-sm'
                                    : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/60'
                                    }`}
                            >
                                <FaHandHoldingHand className="h-4 w-4" />
                                My Donations
                            </button>
                        </div>

                        {/* Condition-based Table Switch Container */}
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm min-h-[300px]">
                            {activeTab === 'requests' ? (
                                <MyRequestsTable requests={myRequests} />
                            ) : (
                                <MyDonationsTable donations={myDonations} />
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* ১. ক্রিয়েট ব্লাড রিকোয়েস্ট মডাল */}
            <AddRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddRequestSubmit}
            />

          
        </div>
    );
}