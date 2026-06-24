import { GetRequestOne } from '@/lib/action/get/request';
import { GetUserDetailsById } from '@/lib/action/get/userDetailsById';
import Image from 'next/image';

export default async function RequestDetails({ params }) {
    const { id } = await params;

    // ডাটাবেজ থেকে ডেটা লোড
    const requestData = await GetRequestOne(id);
    const requesterDetails = await GetUserDetailsById(requestData?.userId);

    // ডেট ফরম্যাটিং ফাংশন (যেমন: 20 June, 2026)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            return date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    const userAvatar = requesterDetails?.image || "/donor-placeholder.jpg";

    return (
        <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                {/* Left Card: Requester Profile Info Panel */}
                <div className="md:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center relative">

                    {/* Circular Blood Group Badge Overlay */}
                    <div className="absolute top-6 right-6 flex flex-col items-center justify-center border border-rose-200/60 rounded-full w-14 h-14 bg-rose-50/30">
                        <span className="text-sm font-extrabold text-rose-600 font-poppins leading-none">
                            {requestData?.bloodGroup}
                        </span>
                        <span className="text-[8px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">Blood Group</span>
                    </div>

                    {/* Requester Profile Image */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 relative mt-4 shadow-sm bg-slate-100">
                        <Image
                            src={userAvatar}
                            alt={requesterDetails?.name || "Requester"}
                            fill
                            className="object-cover"
                            unoptimized={userAvatar.startsWith('http')}
                        />
                    </div>

                    <h2 className="text-base font-bold text-slate-900 font-poppins mt-4 tracking-tight capitalize">
                        {requesterDetails?.name || "Unknown Requester"}
                    </h2>
                    <p className="text-[11px] text-slate-400 font-semibold -mt-0.5">Request Poster</p>

                    {/* Left Side: Requester Personal Details Stack */}
                    <div className="w-full mt-6 space-y-4 border-t border-slate-100 pt-5">
                        <h3 className="text-xs font-bold text-slate-900 tracking-wide font-poppins uppercase">
                            Poster Contact Details
                        </h3>

                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-400">Email</span>
                            <span className="text-slate-800 font-semibold">{requesterDetails?.email || 'N/A'}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-400">Phone</span>
                            <span className="text-slate-800 font-semibold">{requesterDetails?.phone || 'N/A'}</span>
                        </div>

                        <div className="flex items-start justify-between text-xs font-medium">
                            <span className="text-slate-400">Address</span>
                            <span className="text-slate-800 font-semibold text-right max-w-[60%]">
                                {`${requesterDetails?.upazila ? requesterDetails.upazila + ', ' : ''}${requesterDetails?.district || ''}`}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-400">Division</span>
                            <span className="text-slate-800 font-semibold">{requesterDetails?.division || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Description Block Section */}
                    {requestData?.description && (
                        <div className="w-full mt-6 border-t border-slate-100 pt-5 text-left">
                            <h3 className="text-xs font-bold text-slate-900 tracking-wide font-poppins uppercase mb-2.5">
                                Case Description
                            </h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50/50 border border-slate-100/60 p-3 rounded-xl whitespace-pre-line">
                                {requestData.description}
                            </p>
                        </div>
                    )}

                </div>

                {/* Right Card: Full Details Layout Frame */}
                <div className="md:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col space-y-6">
                    <h1 className="text-lg font-bold text-slate-900 font-poppins tracking-tight">
                        Donation Request Details
                    </h1>

                    {/* Systematic Table/Grid Structure Module List */}
                    <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Blood Group Needed</span>
                            <span className="text-rose-600 font-bold text-base">{requestData?.bloodGroup}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Patient Name</span>
                            <span className="text-slate-800 font-semibold capitalize">{requestData?.patientName}</span>
                        </div>

                        {/* রাইট সাইডে Patient Age যুক্ত করা হলো */}
                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Patient Age</span>
                            <span className="text-slate-800 font-semibold">{requestData?.age ? `${requestData.age} Years` : 'N/A'}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Hospital Name</span>
                            <span className="text-slate-800 font-semibold capitalize">{requestData?.hospitalName}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Area Location</span>
                            <span className="text-slate-800 font-semibold">
                                {`${requestData?.upazila ? requestData.upazila + ', ' : ''}${requestData?.district || ''}`}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Division</span>
                            <span className="text-slate-800 font-semibold">{requestData?.division}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Donation Date</span>
                            <span className="text-slate-800 font-semibold">{formatDate(requestData?.neededDate)}</span>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Donation Time</span>
                            <span className="text-slate-800 font-semibold">{requestData?.neededTime}</span>
                        </div>

                        <div className="grid grid-cols-2 h-12 items-center px-4 font-medium">
                            <span className="text-slate-400 text-xs font-semibold">Request Status</span>
                            <div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-lg ${requestData?.status === 'Pending'
                                        ? 'text-amber-600 bg-amber-50 border border-amber-100'
                                        : 'text-green-600 bg-green-50 border border-green-100'
                                    }`}>
                                    {requestData?.status}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Action Button */}
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