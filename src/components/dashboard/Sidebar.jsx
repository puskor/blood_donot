"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { RxDashboard } from 'react-icons/rx';
import { FiUser, FiUsers, FiFileText, FiX } from 'react-icons/fi'; // 🌟 FiX ক্রস আইকন যুক্ত হয়েছে
import { AiOutlineDollar } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { authClient, useSession } from '@/lib/auth-client';
import { useEffect } from 'react';

export default function Sidebar({ isOpen, onClose }) { // 🌟 মোবাইল ড্রয়ার কন্ট্রোল প্রপ্স
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const role = session?.user?.role;

    // 🌟 লিংক এ ক্লিক করলে মোবাইল স্ক্রিনে সাইডবার যেন অটো বন্ধ হয়ে যায়
    useEffect(() => {
        if (isOpen && onClose) onClose();
    }, [pathname]);

    const DonorItems = [
        { name: 'Dashboard', path: '/dashboard/donor', icon: RxDashboard },
        { name: 'Profile', path: '/dashboard/profile', icon: FiUser },
        { name: 'Donors', path: '/dashboard/donor/donor_list', icon: FiUsers },
        { name: 'Donation Requests', path: '/dashboard/donor/request', icon: FiFileText },
    ];

    const AdminItems = [
        { name: 'Dashboard', path: '/dashboard/admin', icon: RxDashboard },
        { name: 'Profile', path: '/dashboard/profile', icon: FiUser },
        { name: 'Users', path: '/dashboard/admin/donor', icon: FiUsers },
        { name: 'Donation Requests', path: '/dashboard/admin/request', icon: FiFileText },
        { name: 'Funding Management', path: '/dashboard/funding', icon: AiOutlineDollar },
    ];

    const VolunteerItems = [
        { name: 'Dashboard', path: '/dashboard/volunteer', icon: RxDashboard },
        { name: 'Profile', path: '/dashboard/profile', icon: FiUser },
        { name: 'Donation Requests', path: '/dashboard/volunteer/request', icon: FiFileText },
        { name: 'Funding Management', path: '/dashboard/funding', icon: AiOutlineDollar },
    ];

    const menuItems = role === "admin" ? AdminItems : role === "volunteer" ? VolunteerItems : DonorItems;

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <>
            {/* 🌟 ১. মোবাইল ব্যাকড্রপ (ডার্ক ব্যাকগ্রাউন্ড শ্যাডো - শুধু মোবাইলে ওপেন হলে দেখাবে) */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* 🌟 ২. রেসপনসিভ ডাইনামিক সাইডবার কন্টেইনার */}
            <aside className={`
                fixed top-0 bottom-0 left-0 z-50 md:z-30 w-64 bg-white border-r border-slate-100 py-6 px-4 flex flex-col justify-between font-inter transition-transform duration-300 ease-in-out
                md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:translate-x-0 shrink-0 overflow-y-auto
                ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
            `}>
                
                <div className="space-y-6">
                    {/* 🌟 মোবাইল স্ক্রিনের জন্য ক্লোজ বাটন */}
                    <div className="flex items-center justify-between md:hidden pb-2 border-b border-slate-50">
                        <span className="font-bold text-slate-800 text-sm">Navigation</span>
                        <button onClick={onClose} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500">
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Menu Links */}
                    <nav className="flex flex-col gap-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`w-full h-12 px-4 rounded-xl flex items-center gap-3.5 text-sm font-semibold transition-all group ${
                                        isActive
                                        ? 'bg-rose-50/60 border-l-[3px] border-rose-600 text-rose-600 rounded-l-none'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? 'text-rose-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                    <span className="truncate">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full border-red-200 border-2 h-12 px-4 rounded-xl flex items-center gap-3.5 text-sm font-semibold text-slate-500 hover:bg-rose-50/40 hover:text-rose-600 transition-all group"
                    >
                        <IoLogOutOutline className="h-5 w-5 text-slate-400 group-hover:text-rose-600 shrink-0 transition-colors" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}