"use client";

import Image from 'next/image';
import { FaPhone, FaLocationDot, FaDroplet, FaEnvelope } from 'react-icons/fa6';

export default function ProfileDetails({ donor }) {
  // ডেবুট করার জন্য কনসোল লগ
  // console.log("Donor Props Data:", donor);

  // প্রপ্স থেকে ডাটা ডেস্ট্রাকচার করা হলো (ডাটা না থাকলে ক্র্যাশ এড়াতে ডিফল্ট ফলব্যাক ভ্যালু সেট করা হয়েছে)
  const name = donor?.name || "Unknown Donor";
  const email = donor?.email || "No Email Provided";
  const phone = donor?.phone || "No Phone Number";
  const bloodGroup = donor?.bloodGroup || "N/A";
  const division = donor?.division || "Not Specified";
  const district = donor?.district || "Not Specified";
  const upazila = donor?.upazila || "Not Specified";
  
  // ডেনর ইমেজ না থাকলে একটি ডিফল্ট প্লেসহোল্ডার অ্যাভাটার ইমেজ সেট হবে
  const donorImage = donor?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150";

  return (
    <div className="w-full mx-auto max-w-md overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 font-inter">
      
      {/* Cover Background */}
      <div className="h-28 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 relative">
        
        {/* Profile Image Container */}
        <div className="absolute -bottom-12 left-6">
          <img
            src={donorImage}
            alt={name}
            className="rounded-full border-4 border-white object-cover w-24 h-24 shadow-md bg-white"
            onError={(e) => {
              // কোনো কারণে ইমেজ লিঙ্ক ব্রোকেন হলে ফলব্যাক অ্যাভাটার লোড হবে
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150";
            }}
          />
        </div>

        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-white text-xs font-bold uppercase tracking-wider font-poppins">
            Donor
          </span>
        </div>
      </div>

      {/* Profile Details Body */}
      <div className="pt-16 px-6 pb-6">
        
        {/* Name */}
        <h2 className="text-2xl font-bold text-slate-800 font-poppins tracking-tight">
          {name}
        </h2>

        {/* Email */}
        <p className="text-slate-500 text-sm mt-1 flex items-center gap-1.5 font-medium">
          <FaEnvelope className="text-slate-400 text-xs" />
          {email}
        </p>

        {/* Blood Group Badge */}
        <div className="mt-4 inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">
          <FaDroplet className="animate-pulse" />
          <span className="font-extrabold font-poppins tracking-wide">
            {bloodGroup}
          </span>
        </div>

        {/* Info Fields */}
        <div className="mt-5 space-y-3 font-medium text-slate-600 text-sm">
          {/* Phone */}
          <div className="flex items-center gap-3 hover:text-slate-900 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
              <FaPhone className="text-rose-500 text-xs" />
            </div>
            <span className="tracking-wide">{phone}</span>
          </div>

          {/* Location (Upazila & District) */}
          <div className="flex items-center gap-3 hover:text-slate-900 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
              <FaLocationDot className="text-rose-500 text-xs" />
            </div>
            <span>
              {upazila}, {district}
            </span>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Division
            </p>
            <p className="font-bold text-slate-700 text-sm mt-0.5">
              {division}
            </p>
          </div>

          {/* Action Button */}
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl font-bold text-xs font-poppins shadow-md shadow-rose-600/10 active:scale-[0.98] transition">
            Request Blood
          </button>
        </div>

      </div>
    </div>
  );
}