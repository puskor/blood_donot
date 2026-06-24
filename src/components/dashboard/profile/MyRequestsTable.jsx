"use client";

import { FaClockRotateLeft } from 'react-icons/fa6';

export default function MyRequestsTable({ requests, onStatusChange }) {
    
    const handleStatusUpdate = async (requestId, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
        
        // যদি প্যারেন্ট কম্পোনেন্ট থেকে কোনো অন-চেঞ্জ হ্যান্ডলার পাঠানো হয়
        if (onStatusChange) {
            onStatusChange(requestId, newStatus);
        }
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
                                    {/* স্ট্যাটাস চেঞ্জ করার জন্য কাস্টম সিলেক্ট ড্রপডাউন */}
                                    <select
                                        value={req.status}
                                        onChange={(e) => handleStatusUpdate(req.id || req._id, req.status)}
                                        className={`text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider border cursor-pointer outline-none transition-all ${
                                            req.status === 'Pending' 
                                                ? 'text-amber-600 bg-amber-50 border-amber-200 focus:ring-1 focus:ring-amber-300' 
                                                : 'text-emerald-600 bg-emerald-50 border-emerald-200 focus:ring-1 focus:ring-emerald-300'
                                        }`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}