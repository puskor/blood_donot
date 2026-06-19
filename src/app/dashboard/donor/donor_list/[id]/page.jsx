"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaDroplet } from 'react-icons/fa6';
import { IoNotificationsOutline } from 'react-icons/io5';

export default function DonationRequestDetails() {
    // UI ডিজাইন অনুযায়ী স্ট্যাটিক ডাটা অবজেক্ট
    const data = {
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
        avatar: "/user-avatar.jpg" // public ফোল্ডারে আপনার ইমেজ অ্যাসেট রাখুন
    };

    return (
        <div className="w-full min-h-screen bg-slate-50/50 font-inter">

            {/* Navbar Module Layout */}

            {/* Main Core Main Panel Layout Grid */}
            <main className="max-w-6xl mx-auto py-12 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Panel Frame Card Component */}
                    <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center relative">
                        <div className="absolute top-6 right-6 flex flex-col items-center justify-center border border-rose-100 rounded-full w-14 h-14 bg-rose-50/40">
                            <span className="text-sm font-extrabold text-rose-600 font-poppins leading-none">{data.bloodGroup}</span>
                            <span className="text-[7px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">Blood Group</span>
                        </div>

                        <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 relative mt-4 shadow-sm">
                            <Image src={data.avatar} alt={data.patientName} fill className="object-cover" />
                        </div>

                        <h2 className="text-base font-bold text-slate-900 font-poppins mt-4 tracking-tight">
                            {data.patientName}
                        </h2>

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

                        <div className="w-full mt-6 border-t border-slate-100 pt-5 text-left">
                            <h3 className="text-xs font-bold text-slate-900 tracking-wide font-poppins uppercase mb-2">
                                Request Description
                            </h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50/50 border border-slate-100/60 p-3 rounded-xl">
                                {data.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Panel Table Structure Block Component */}
                    <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col space-y-6">
                        <h1 className="text-base font-bold text-slate-900 font-poppins tracking-tight">
                            Donation Request Details
                        </h1>

                        <div className="border border-slate-100 rounded-xl overflow-hidden text-xs sm:text-sm">
                            <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-5 font-medium">
                                <span className="text-slate-400 font-semibold text-xs">Blood Group</span>
                                <span className="text-slate-800 font-semibold">{data.bloodGroup}</span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-5 font-medium">
                                <span className="text-slate-400 font-semibold text-xs">Patient Name</span>
                                <span className="text-slate-800 font-semibold">{data.patientName}</span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-5 font-medium">
                                <span className="text-slate-400 font-semibold text-xs">Hospital Name</span>
                                <span className="text-slate-800 font-semibold">{data.hospitalName}</span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-5 font-medium">
                                <span className="text-slate-400 font-semibold text-xs">District</span>
                                <span className="text-slate-800 font-semibold">{data.district}</span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-5 font-medium">
                                <span className="text-slate-400 font-semibold text-xs">Upazila</span>
                                <span className="text-slate-800 font-semibold">{data.upazila}</span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-5 font-medium">
                                <span className="text-slate-400 font-semibold text-xs">Donation Date</span>
                                <span className="text-slate-800 font-semibold">{data.neededDate}</span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-slate-100 h-12 items-center px-5 font-medium">
                                <span className="text-slate-400 font-semibold text-xs">Donation Time</span>
                                <span className="text-slate-800 font-semibold">{data.neededTime}</span>
                            </div>
                            <div className="grid grid-cols-2 h-12 items-center px-5 font-medium">
                                <span className="text-slate-400 font-semibold text-xs">Status</span>
                                <div>
                                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50/60 border border-amber-100 px-2.5 py-1 rounded-lg">
                                        {data.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="button"
                                className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-rose-600/10 font-poppins tracking-wide"
                            >
                                I Want to Donate
                            </button>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    );
}