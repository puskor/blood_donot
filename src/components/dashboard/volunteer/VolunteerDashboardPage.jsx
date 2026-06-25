"use client";

import { useState, useEffect } from 'react';
import DashboardStats from './DashboardStats';
import RequestListTable from './RequestListTable';
import { UpdateRequest } from '@/lib/action/update/statusUpdate';
import { DeleteRequestFromDB } from '@/lib/action/delete/DeleteRequestFromDB';
import { GetRequest } from '@/lib/action/get/request';

export default function VolunteerDashboardPage() {
    const [requests, setRequests] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    // ব্যাকএন্ড থেকে ডাটা লোড করা
    const fetchRequests = async () => {
        try {
            setIsLoading(true);
            const response = await GetRequest();
            if (response && response.success) {
                setRequests(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // 🌟 ৩. ফ্রন্টএন্ড আপডেট হ্যান্ডলার (এডিট মডালের জন্য)
    const handleUpdate = async (id, updatedFormData) => {
        const response = await UpdateRequest(id, updatedFormData);
        if (response && response.success) {
            // স্টেট আপডেট: ম্যাচিং রিকোয়েস্টটিকে নতুন ডাটা দিয়ে রিপ্লেস করা হলো
            setRequests(prev => prev.map(req => req._id === id ? response.data : req));
            alert("Request updated successfully!");
        } else {
            alert(response?.message || "Failed to update");
        }
    };

    // 🌟 ৪. ফ্রন্টএন্ড ডিলিট হ্যান্ডলার (ডিলিট মডালের জন্য)
    const handleDeleteComplete = async (id) => {
        const response = await DeleteRequestFromDB(id);
        if (response && response.success) {
            // স্টেট থেকে রিমুভ: ফিল্টার করে ডিলিট হওয়া আইডিটি বাদ দেওয়া হলো
            setRequests(prev => prev.filter(req => req._id !== id));
            alert("Request deleted successfully!");
        } else {
            alert(response?.message || "Failed to delete");
        }
    };

    // কাউন্টস ক্যালকুলেশন
    const counts = {
        all: requests.length,
        pending: requests.filter(r => r.status?.toLowerCase() === 'pending').length,
        inProgress: requests.filter(r => r.status?.toLowerCase() === 'in progress' || r.status?.toLowerCase() === 'inprogress').length,
        completed: requests.filter(r => r.status?.toLowerCase() === 'completed').length,
    };

    // ফিল্টারিং
    const filteredRequests = requests.filter(req => {
        const status = req.status?.toLowerCase();
        if (activeFilter === 'all') return true;
        if (activeFilter === 'pending') return status === 'pending';
        if (activeFilter === 'inProgress') return status === 'in progress' || status === 'inprogress';
        if (activeFilter === 'completed') return status === 'completed';
        return true;
    });

    return (
        <div className="w-full space-y-10 p-10">
            <DashboardStats
                counts={counts}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 font-poppins uppercase">All Donation Requests</h2>
                
                {isLoading ? (
                    <div className="w-full h-32 flex items-center justify-center text-sm font-medium text-slate-400">
                        Loading...
                    </div>
                ) : (
                    <RequestListTable
                        filteredRequests={filteredRequests}
                        onUpdate={handleUpdate} // 🌟 পাস করা হলো
                        onDeleteComplete={handleDeleteComplete} // 🌟 পাস করা হলো
                    />
                )}
            </div>
        </div>
    );
}