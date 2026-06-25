"use client"
import Link from 'next/link';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

const RequestCard =  ({ req }) => {

    const {data:session} = useSession()
    const user = session?.user 


    // // ডাটাবেজের আইডি রেন্ডার করার জন্য fallback লজিক
    // const requestId = req._id || req.id;

    // // ISO বা 'YYYY-MM-DD' ডেটকে সুন্দরভাবে রিডএবল করার ফাংশন
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

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow">
            
            {/* Blood Group & Status Badge */}
            <div className="flex justify-between items-start">
                <span className="text-4xl font-black text-rose-600 font-poppins tracking-tight">
                    {req.bloodGroup}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full font-inter uppercase tracking-wider ${
                    req.status === 'Urgent' || req.status === 'Urgent Need'
                        ? 'bg-rose-50 text-rose-600 border border-rose-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100' // 'Pending' এর জন্য সুন্দর একটি কালার
                }`}>
                    {req.status}
                </span>
            </div>

            {/* Request Core Details */}
            <div className="mt-4 space-y-2.5">
                {/* ১. req.name এর পরিবর্তে ডাটাবেজের req.patientName ব্যবহার করা হলো */}
                <h3 className="text-base font-bold text-slate-900 font-poppins capitalize">
                    {req.patientName}
                </h3>
                
                <div className="space-y-1.5 text-xs text-slate-500 font-inter">
                    {/* ২. হসপিটাল ও লোকেশন ডাইনামিক ম্যাপিং */}
                    <div className="flex items-start gap-1.5">
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                            {req.hospitalName ? `${req.hospitalName}, ` : ''}
                            {`${req.upazila || ''}, ${req.district || ''}`}
                        </span>
                    </div>

                    {/* ৩. ডেট ফরম্যাটিং */}
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>Needed: {formatDate(req.neededDate)}</span>
                    </div>

                    {/* ৪. টাইম ট্র্যাকিং (নতুন যুক্ত করা হয়েছে) */}
                    {req.neededTime && (
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                            <span>Time: {req.neededTime}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* View Details Link */}
            <div className="mt-6">
                {/* ৫. ডাইনামিক রাউটিং এর জন্য req.id এর বদলে req._id ব্যবহার করা হলো */}
                <Link
                    href={user ? `/dashboard/donor/request/${req?._id}` : `/login?redirect=/dashboard/donor/request/${req?._id}`}
                    className="block w-full text-center py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all font-inter"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RequestCard;