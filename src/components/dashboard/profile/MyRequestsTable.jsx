"use client";

import StatusConfirmModal from '@/components/sheard/StatusConfirmModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaClockRotateLeft } from 'react-icons/fa6';

export default function MyRequestsTable({ requests, onStatusChange }) {

    const router = useRouter()
    // console.log(requests)
    // 🌟 মোডাল ওপেন/ক্লোজ এবং কোন রিকোয়েস্ট সিলেক্ট করা হয়েছে তা ট্র্যাক করার স্টেট
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // বাটনে ক্লিক করলে মোডাল ট্রিগার হবে এবং ঐ রোর ডাটা স্টেটে সেভ হবে
    const handleStatusUpdateClick = (req) => {
        setSelectedRequest(req);
        setIsModalOpen(true);
    };

    // মোডালে "Yes" কনফার্ম করলে এই ফাংশনটি রান হবে
    const handleConfirmUpdate = () => {
        if (!selectedRequest) return;

        const { _id, id, status } = selectedRequest;
        const requestId = id || _id;

        // টগল লজিক: Pending থাকলে Completed হবে, অন্যথায় Pending হবে
        const newStatus = status === 'Pending' ? 'Completed' : 'Pending';

        if (onStatusChange) {
            onStatusChange(requestId, newStatus);
        }

        setIsModalOpen(false); // মোডাল বন্ধ করা
        setSelectedRequest(null); // স্টেট ক্লিয়ার করা
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-poppins mb-2 flex items-center gap-2">
                <FaClockRotateLeft className="text-slate-400" /> Blood Requests History
            </h3>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-400 font-bold h-11">
                            <th className="px-4">Patient Name</th>
                            <th className="px-4">Blood Group</th>
                            <th className="px-4">Hospital</th>
                            <th className="px-4">Needed Date</th>
                            <th className="px-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                        {requests?.map((req) => (
                            <tr key={req.id || req._id} className="h-12 hover:bg-slate-50/30">
                                <td className="px-4 font-bold text-slate-900">{req.patientName}</td>
                                <td className="px-4 text-rose-600 font-bold">{req.bloodGroup}</td>
                                <td className="px-4 text-slate-500">{req.hospital || req.hospitalName}</td>
                                <td className="px-4 text-slate-500">{req.date || req.neededDate}</td>
                                <td className="px-4 text-center">
                                    {/* 🌟 ফিক্স: onChange-এর বদলে onClick ব্যবহার করা হয়েছে */}
                                    <button
                                        disabled={req?.status === "Pending" || req?.status === "Completed"}
                                        onClick={() => handleStatusUpdateClick(req)}
                                        className={`text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider border cursor-pointer outline-none transition-all ${req.status === 'Pending'
                                                ? 'text-amber-600 bg-amber-50 border-amber-200 focus:ring-1 focus:ring-amber-300'
                                                : 'text-emerald-600 bg-emerald-50 border-emerald-200 focus:ring-1 focus:ring-emerald-300'
                                            }`}
                                    >
                                        {req.status}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🌟 রিইউজেবল কনফার্মেশন মোডাল */}
            <StatusConfirmModal
                requests={selectedRequest}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedRequest(null);
                    router.refresh()
                }}
                onConfirm={handleConfirmUpdate}
                currentStatus={selectedRequest?.status}
            />
        </div>
    );
}