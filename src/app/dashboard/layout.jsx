"use client";

import { useState } from 'react';
import TopNavbar from '@/components/dashboard/TopNavbar';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
    // 🌟 মোবাইল সাইডবার ওপেন/ক্লোজ স্টেট
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* ১. টপ নেববার (মেনু ক্লিক করলে স্টেট true হবে) */}
            <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />

            {/* মেইন কন্টেন্ট এরিয়া */}
            <div className="flex pt-20  mx-auto w-full">
                
                {/* ২. সাইডবার (স্টেট ভ্যালু এবং ক্লোজ করার ফাংশন পাস করা হলো) */}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* ৩. পেজের মেইন চাইল্ড কন্টেন্ট */}
                <main className="flex-1 min-w-0 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}