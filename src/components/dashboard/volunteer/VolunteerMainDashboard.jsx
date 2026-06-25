"use client";

import { getAllDonor } from '@/lib/action/get/donate';
import { GetRequest } from '@/lib/action/get/request';
import { useState, useEffect } from 'react';
import RequestListTable from './RequestListTable';
import DashboardOverview from '../DashboardOverview';

export default function VolunteerMainDashboard() {
    const [donorsData, setDonorsData] = useState({ total: 0 });
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // ১. ব্যাকএন্ড এপিআই অ্যাকশন থেকে সব কম্বাইন্ড ডাটা লোড করা
    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setIsLoading(true);
                
                // সমান্তরালভাবে (Parallel) ডোনার এবং রিকোয়েস্ট ফেচ করা
                const [donorRes, requestRes] = await Promise.all([
                    getAllDonor({}, 1, 1), // শুধু টোটাল কাউন্ট জানার জন্য লিমিট ১ রাখা হয়েছে
                    GetRequest({}, 1, 100) // ড্যাশবোর্ড অ্যানালিটিক্স এর জন্য সর্বোচ্চ রিকোয়েস্ট লোড করা
                ]);

                if (donorRes && donorRes.success) {
                    // যদি রেসপন্সে pagination-এর ভেতর total থাকে (যেমন: donorRes.pagination.total)
                    setDonorsData({ total: donorRes.pagination?.total || donorRes.data?.length || 0 });
                }

                if (requestRes && requestRes.success) {
                    setRequests(requestRes.data || []);
                }

            } catch (error) {
                console.error("Dashboard Loading Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);



    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50">
                <div className="text-sm font-semibold text-slate-400 animate-pulse">
                    Preparing dashboard diagnostics...
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50/30 min-h-screen p-6 sm:p-10 space-y-10 font-inter">
            
            {/* ড্যাশবোর্ড হেডার */}
            <div className="flex flex-col gap-1">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins tracking-tight">Volunteer Command Center</h1>
                <p className="text-xs sm:text-sm text-slate-500">Real-time breakdown of blood donor database and urgency matrices.</p>
            </div>

            {/* 🌟 পাই-চার্ট, বার-চার্ট এবং ৪টি অ্যানালিটিক্স কার্ড কন্টেইনার */}
            <DashboardOverview
                totalDonors={donorsData.total} 
                requests={requests} 
            />

          
        </div>
    );
}