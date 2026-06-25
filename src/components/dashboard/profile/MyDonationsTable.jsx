import { FaHandHoldingHand } from 'react-icons/fa6';

export default function MyDonationsTable({ donations }) {

    // ডাটা ঠিকঠাক আসছে কিনা তা ট্র্যাক করার জন্য
    // console.log("Donations in Table Component:", donations);

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-poppins mb-2 flex items-center gap-2">
                <FaHandHoldingHand className="text-slate-400" /> Total Contribution Logs
            </h3>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-400 font-bold h-11">
                            <th className="px-4">Patient Name</th>
                            <th className="px-4">Blood Group</th>
                            <th className="px-4">Donation Date</th>
                            <th className="px-4">Location Venues</th>
                            <th className="px-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                        {/* 🌟 সেফটি চেক: ডাটা যদি থাকে তবেই ম্যাপ হবে */}
                        {donations && donations.length > 0 ? (
                            donations.map((don, index) => (
                                <tr key={don._id || don.id || index} className="h-12 hover:bg-slate-50/30">

                                    {/* ১. রোগীর নাম (patientName: "khaico") */}
                                    <td className="px-4 font-bold text-slate-900">
                                        {don.patientName || "Unknown"}
                                    </td>

                                    {/* ২. রক্তের গ্রুপ (bloodGroup: "AB-") */}
                                    <td className="px-4 font-bold text-rose-600">
                                        {don.bloodGroup || "—"}
                                    </td>

                                    {/* ৩. ডোনেশন তারিখ (date: "2026-06-20") */}
                                    <td className="px-4 text-slate-500">
                                        {don.date || "N/A"}
                                    </td>

                                    {/* ৪. হাসপাতালের নাম/লোকেশন (location: "safvsdv") */}
                                    <td className="px-4 text-slate-500">
                                        <div className="font-semibold text-slate-700">{don.location || "Not Specified"}</div>
                                        {/* যদি উপজেলা/জেলা ম্যাপ করা অবজেক্টে থাকে তবে দেখাবে, না থাকলে হাইড থাকবে */}
                                        {don.upazila && (
                                            <div className="text-[10px] text-slate-400">{don.upazila}, {don.district}</div>
                                        )}
                                    </td>

                                    {/* ৫. ডোনেশন স্ট্যাটাস (status: "Completed") */}
                                    <td className="px-4 text-center">
                                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                                            don.status === 'Pending' || don.status === 'In Progress'
                                                ? 'text-amber-600 bg-amber-50 border-amber-100'
                                                : 'text-emerald-600 bg-emerald-50 border-emerald-100'
                                        }`}>
                                            {don.status}
                                        </span>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            /* ডোনেশন লিস্ট একদম ফাঁকা থাকলে এই মেসেজটি দেখাবে */
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-slate-400 font-medium">
                                    No donation history available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}