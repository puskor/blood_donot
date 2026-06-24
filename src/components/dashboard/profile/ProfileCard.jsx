"use client";

import Image from 'next/image';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit3, FiLogOut } from 'react-icons/fi';

export default function ProfileCard({ user , onEditClick, onLogout }) {
    // console.log("user",user)
    const bloodGroup = user.userDetails.bloodGroup 
    const name = user.userDetails.name
    const email = user.userDetails.email
    const phone = user.userDetails.phone 
    const image = user.userDetails.image 
    const createdAt = user.userDetails.createdAt 
    const role = user.userDetails.role 

    const upazila = user.userDetails.upazila 
    const district = user.userDetails.district 
    const division = user.userDetails.division 

    // ISO Date বা নরমাল ডেট ফরম্যাট সুন্দর করার লজিক
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
        <div className="w-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center relative">
            {/* Blood Group Badge Top-Right */}
            <div className="absolute top-6 right-6 flex flex-col items-center justify-center border border-rose-100 rounded-full w-14 h-14 bg-rose-50/40">
                <span className="text-sm font-extrabold text-rose-600 font-poppins leading-none">{bloodGroup}</span>
                <span className="text-[7px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">Blood</span>
            </div>

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-rose-100 relative mt-4 shadow-sm bg-slate-50">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>

            <h2 className="text-lg font-bold text-slate-900 font-poppins mt-4 tracking-tight">
                {name}
            </h2>
            <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider mt-1.5">
                {role}
            </span>

            {/* User Information Matrix Details */}
            <div className="w-full mt-8 space-y-3.5 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <FiMail className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate">{email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <FiPhone className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{phone}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <FiMapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate">{`${upazila}, ${district}, ${division}`}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <FiCalendar className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Joined: {formatDate(createdAt)}</span>
                </div>
            </div>

            {/* অ্যাকশন বাটন সেকশন যা মডাল স্টেট ট্রिগার করবে */}
            <div className="w-full grid grid-cols-2 gap-3 mt-8 pt-4 border-t border-slate-50">

                {/* Edit Button */}
                <button
                    type="button"
                    onClick={onEditClick}
                    className="flex items-center justify-center gap-2 h-10 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-all font-poppins active:scale-[0.98] bg-white hover:bg-slate-50"
                >
                    <FiEdit3 className="h-3.5 w-3.5 text-slate-500" />
                    Edit Profile
                </button>

                {/* Logout Button */}
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 h-10 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-all font-poppins active:scale-[0.98]"
                >
                    <FiLogOut className="h-3.5 w-3.5" />
                    Logout
                </button>

            </div>

        </div>
    );
}