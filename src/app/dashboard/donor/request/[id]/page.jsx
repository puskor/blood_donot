import Image from 'next/image';

export default function RequestDetails({ requestData }) {
    // Fallback fallback static object values matches your UI design screenshot
    const data = requestData || {
        patientName: "Rasel Ahmed",
        bloodGroup: "O+",
        age: "28 Years",
        phone: "+880 1712 345678",
        location: "Dhaka, Dhanmondi",
        neededDate: "20 May, 2024",
        neededTime: "10:00 AM",
        hospitalName: "Square Hospital",
        district: "Dhaka",
        upazila: "Dhanmondi",
        status: "Pending",
        description: "Need blood for my surgery. Please help me.",
        avatar: "/donor-placeholder.jpg" // Place your asset inside the public folder
    };

    return (
        <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                {/* Left Card: Recipient Summary Profile Panel */}
                <div className="md:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center relative">

                    {/* Circular Blood Group Badge Overlay */}
                    <div className="absolute top-6 right-6 flex flex-col items-center justify-center border border-rose-200/60 rounded-full w-14 h-14 bg-rose-50/30">
                        <span className="text-sm font-extrabold text-rose-600 font-poppins leading-none">{data.bloodGroup}</span>
                        <span className="text-[8px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">Blood Group</span>
                    </div>

                    <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 relative mt-4 shadow-sm">
                        <Image
                            src={data.avatar}
                            alt={data.patientName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <h2 className="text-base font-bold text-slate-900 font-poppins mt-4 tracking-tight">
                        {data.patientName}
                    </h2>

                    {/* Recipient Information Vertical Stack */}
                    <div className="w-full mt-6 space-y-4 border-t border-slate-100 pt-5">
                        <h3 className="text-xs font-bold text-slate-900 tracking-wide font-poppins uppercase">
                            Recipient Information
                        </h3>

                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-400">Age</span>
                            <span className="text-slate-800 font-semibold">{data.age}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-400">Phone</span>
                            <span className="text-slate-800 font-semibold">{data.phone}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-400">Location</span>
                            <span className="text-slate-800 font-semibold">{data.location}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-400">Needed Date</span>
                            <span className="text-slate-800 font-semibold">{data.neededDate}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-400">Needed Time</span>
                            <span className="text-slate-800 font-semibold">{data.neededTime}</span>
                        </div>
                    </div>

                    {/* Request Description Block Section */}
                    <div className="w-full mt-6 border-t border-slate-100 pt-5 text-left">
                        <h3 className="text-xs font-bold text-slate-900 tracking-wide font-poppins uppercase mb-2.5">
                            Request Description
                        </h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50/50 border border-slate-100/60 p-3 rounded-xl">
                            {data.description}
                        </p>
                    </div>

                </div>

                {/* Right Card: Full Details Grid System Data Layout Frame */}
                <div className="md:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col space-y-6">
                    <h1 className="text-lg font-bold text-slate-900 font-poppins tracking-tight">
                        Donation Request Details
                    </h1>

                    {/* Systematic Table/Grid Structure Module List */}
                    <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Blood Group</span>
                            <span className="text-slate-800 font-semibold">{data.bloodGroup}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Patient Name</span>
                            <span className="text-slate-800 font-semibold">{data.patientName}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Hospital Name</span>
                            <span className="text-slate-800 font-semibold">{data.hospitalName}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">District</span>
                            <span className="text-slate-800 font-semibold">{data.district}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Upazila</span>
                            <span className="text-slate-800 font-semibold">{data.upazila}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Donation Date</span>
                            <span className="text-slate-800 font-semibold">{data.neededDate}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Donation Time</span>
                            <span className="text-slate-800 font-semibold">{data.neededTime}</span>
                        </div>

                        <div className="grid grid-cols-2 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Status</span>
                            <div>
                                <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg">
                                    {data.status}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Main Core Form Action Run Button */}
                    <div className="pt-2">
                        <button
                            type="button"
                            className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-rose-600/10 font-poppins tracking-wide uppercase"
                        >
                            I Want to Donate
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}