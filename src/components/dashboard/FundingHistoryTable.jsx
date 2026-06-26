"use client";

export default function FundingHistoryTable({ historyData }) {
    // সরাসরি মেইন পেজ থেকে আসা রিয়েল-টাইম স্টেট রিড করবে
    const records = historyData || [];

    return (
        <div className="space-y-4 font-inter">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-poppins tracking-tight">
                    Funding History
                </h3>
            </div>

            <div className="w-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider h-12 bg-slate-50/50">
                                <th className="py-3 px-6">Date</th>
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Amount</th>
                                <th className="py-3 px-6">Payment Method</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
                            {records.length > 0 ? (
                                records.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors h-14">
                                        <td className="py-3 px-6 text-slate-500 font-semibold">{item.date}</td>
                                        <td className="py-3 px-6 font-bold text-slate-900">{item.name}</td>
                                        <td className="py-3 px-6 font-extrabold text-slate-900 font-poppins">{item.amount}</td>
                                        <td className="py-3 px-6 text-slate-500">{item.method}</td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="text-[10px] sm:text-xs font-extrabold text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2.5 py-1 rounded-lg tracking-wide uppercase">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-slate-400 font-medium">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}