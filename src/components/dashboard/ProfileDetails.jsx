"use client";

import Image from 'next/image';
import { FaPhone, FaLocationDot, FaDroplet } from 'react-icons/fa6';

export default function ProfileDetails({ user }) {
  // ডাটা সেফটি ফলব্যাক (Props থেকে ডাটা না আসলে যেন ক্র্যাশ না করে)
  const userDetails = {
    name: "donor7",
    email: "donor7@gmail.com",
    phone: "00030300300",
    bloodGroup: "O+",
    division: "Rajshahi",
    district: "Dhaka",
    upazila: "Agrabad",
    image: "https://i.ibb.co/35yCMBBT/Screenshot-2026-06-21-at-9-30-55-AM.png"
  };

  return (
    <div className="w-full mx-auto max-w-md overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300">
      {/* Cover */}
      <div className="h-28 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 relative">
        <div className="absolute -bottom-12 left-6">
          <Image
            src={userDetails.image}
            alt={userDetails.name}
            width={96}
            height={96}
            className="rounded-full border-4 border-white object-cover w-24 h-24"
          />
        </div>

        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
          <span className="text-white text-sm font-semibold">
            Donor
          </span>
        </div>
      </div>

      <div className="pt-16 px-6 pb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          {userDetails.name}
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          {userDetails.email}
        </p>

        {/* Blood Group */}
        <div className="mt-4 inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full">
          <FaDroplet />
          <span className="font-bold">
            {userDetails.bloodGroup}
          </span>
        </div>

        {/* Info */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 text-slate-600">
            <FaPhone className="text-rose-500" />
            <span>{userDetails.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <FaLocationDot className="text-rose-500" />
            <span>
              {userDetails.upazila}, {userDetails.district}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400">
              Division
            </p>
            <p className="font-semibold text-slate-700">
              {userDetails.division}
            </p>
          </div>

          <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl font-medium transition">
            Request Blood
          </button>
        </div>
      </div>
    </div>
  );
}