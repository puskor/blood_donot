"use client";

import MyDonationsTable from '@/components/dashboard/profile/MyDonationsTable';
import MyRequestsTable from '@/components/dashboard/profile/MyRequestsTable';
import AddRequestModal from '@/components/dashboard/profile/AddRequestModal';
import { useState } from 'react';
import { FaDroplet, FaHandHoldingHand, FaPlus } from 'react-icons/fa6';

// 🌟 ফিক্স ১: প্যারামিটারে কার্লি ব্র্যাকেট { } দিয়ে প্রপস ডিস্ট্রাকচার করা হয়েছে
export default function DonorDashboard({ requestData, donationsData }) {

    // 🌟 ফিক্স ২: এখন donationsData সরাসরি এখান থেকেই পাওয়া যাবে
    // console.log("Processed donationsData inside Component:", donationsData);

    // requestData অবজেক্টের ভেতর থেকে আসল অ্যারেটি বের করে আনা হচ্ছে
    const requests = requestData?.data || requestData || [];

    const [activeTab, setActiveTab] = useState('requests');
    const [isModalOpen, setIsModalOpen] = useState(false); // অ্যাড রিকোয়েস্ট মডাল স্টেট

    // লোকাল রিঅ্যাক্ট স্টেট রিকোয়েস্টের জন্য
    const [myRequests, setMyRequests] = useState(requests);

    // নতুন রিকোয়েস্ট সাবমিট হ্যান্ডলার
    const handleAddRequestSubmit = (newRequestData) => {
        const formattedRequest = {
            id: myRequests.length + 1,
            patientName: newRequestData.patientName,
            bloodGroup: newRequestData.bloodGroup,
            hospital: newRequestData.hospitalName,
            date: newRequestData.neededDate,
            status: newRequestData.status || "Pending"
        };

        setMyRequests(prev => [formattedRequest, ...prev]);
        console.log("Newly Saved Data to push in Backend:", newRequestData);
    };

    return (
        <div className="w-full min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 font-inter">
            <div className="w-full max-w-6xl mx-auto space-y-8">

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

                <div className='mt-10'>
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
                    <div className="bg-white border border-slate-100 mt-5 rounded-2xl p-6 shadow-sm min-h-[300px]">
                        {activeTab === 'requests' ? (
                            <MyRequestsTable requests={myRequests} />
                        ) : (
                            /* 🌟 ফিক্স ৩: সঠিক donationsData প্রপ্সটি টেবিলে পাস করা হলো */
                            <MyDonationsTable donations={donationsData} />
                        )}
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