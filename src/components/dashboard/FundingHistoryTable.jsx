"use client";

export default function FundingHistoryTable({ historyData }) {
    // Fallback static array matching your UI design screenshot exactly
    const records = historyData || [
        { id: 1, date: "20 May, 2024", name: "Tanvir Ahmed", amount: "$50.00", method: "Stripe", status: "Completed" },
        { id: 2, date: "18 May, 2024", name: "Sadia Islam", amount: "$30.00", method: "Stripe", status: "Completed" },
        { id: 3, date: "16 May, 2024", name: "Arman Hossain", amount: "$100.00", method: "Stripe", status: "Completed" },
        { id: 4, date: "15 May, 2024", name: "Nusrat Jahan", amount: "$20.00", method: "Stripe", status: "Completed" },
        { id: 5, date: "14 May, 2024", name: "Rafikul Islam", amount: "$50.00", method: "Stripe", status: "Completed" },
    ];

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