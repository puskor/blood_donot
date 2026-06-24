"use client";

import { FaHandHoldingHand } from 'react-icons/fa6';

export default function MyDonationsTable({ donations }) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-poppins mb-2 flex items-center gap-2">
                <FaHandHoldingHand className="text-slate-400" /> Total Contribution Logs
            </h3>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-400 font-bold h-11">
                            <th className="px-4">Recipient Name</th>
                            <th className="px-4">Donation Date</th>
                            <th className="px-4">Location Venues</th>
                            <th className="px-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                        {donations.map((don) => (
                            <tr key={don.id} className="h-12 hover:bg-slate-50/30">
                                <td className="px-4 font-bold text-slate-900">{don.recipientName}</td>
                                <td className="px-4 text-slate-500">{don.date}</td>
                                <td className="px-4 text-slate-500">{don.location}</td>
                                <td className="px-4 text-center">
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md text-emerald-600 bg-emerald-50 border border-emerald-100 uppercase tracking-wider">
                                        {don.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}