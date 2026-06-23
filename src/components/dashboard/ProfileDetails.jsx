"use client";

import Image from 'next/image';

export default function ProfileDetails({ user }) {
  // ডাটা সেফটি ফলব্যাক (Props থেকে ডাটা না আসলে যেন ক্র্যাশ না করে)
  const userData = user || {
    name: "Rasel Ahmed",
    email: "donor1@gmail.com",
    image: "https://i.ibb.co/ymcG1wz0/Screenshot-2026-06-21-at-9-39-03-AM.png",
    role: "donor",
    id: "6a38b58abdeae3373bf6fa8d"
  };

  return (
    <div className="w-full max-w-[50%] mx-auto bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm font-inter">
      
      {/* Top Section: Avatar and Blood Group Info Row */}
      <div className="flex items-center justify-between">
        {/* Profile Image Circle */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 ring-4 ring-slate-50">
          <Image
            src={userData?.image || "https://i.ibb.co/ymcG1wz0/Screenshot-2026-06-21-at-9-39-03-AM.png"}
            alt={userData?.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Dynamic Badge Block based on Role or Blood Group Placeholder */}
        <div className="w-16 h-16 rounded-full border border-rose-100 bg-rose-50/40 flex flex-col items-center justify-center">
          <span className="text-sm font-black text-rose-600 font-poppins leading-none">O+</span>
        </div>
      </div>

      {/* User Core Bio Header */}
      <div className="mt-5 space-y-1">
        <h2 className="text-lg font-bold text-slate-900 font-poppins tracking-tight">
          {userData?.name}
        </h2>
      </div>

      {/* Recipient / User Information List Matrix */}
      <div className="mt-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          User Information
        </h3>

        <div className="space-y-3.5">
          {/* Email Info Data Field */}
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-slate-400">Email Address</span>
            <span className="text-slate-700 truncate max-w-[200px]" title={userData?.email}>
              {userData?.email}
            </span>
          </div>

          {/* Account Role Data Field */}
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-slate-400">Account Role</span>
            <span className="text-rose-600 font-bold capitalize bg-rose-50 px-2 py-0.5 rounded-md text-xs">
              {userData?.role}
            </span>
          </div>

          {/* District Location Placeholder Field */}
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-slate-400">Location</span>
            <span className="text-slate-700">Dhaka, Dhanmondi</span>
          </div>

          {/* System Hash Node ID Code */}
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-slate-400">Profile ID</span>
            <span className="text-slate-500 font-mono text-xs">
              {userData?.id?.substring(0, 10)}...
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Context Message Box Block */}
      <div className="mt-6 pt-5 border-t border-slate-50 space-y-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Status Note
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
          Registered and ready for active support within the ecosystem panel framework.
        </p>
      </div>

    </div>
  );
}