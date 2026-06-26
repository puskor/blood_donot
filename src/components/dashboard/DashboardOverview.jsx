"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiUsers, FiDroplet, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function DashboardOverview({ totalDonors = 0, requests = [] }) {

    // ১. ডাটা প্রসেসিং: স্ট্যাটাস অনুযায়ী কাউন্ট বের করা
    const pendingCount = requests.filter(r => r.status?.toLowerCase() === 'pending').length;
    const inProgressCount = requests.filter(r => r.status?.toLowerCase() === 'in progress' || r.status?.toLowerCase() === 'inprogress').length;
    const completedCount = requests.filter(r => r.status?.toLowerCase() === 'completed').length;
    const totalRequests = requests.length;

    // ২. পাই-চার্টের জন্য ডাটা ফরম্যাট (Request Breakdown)
    const pieData = [
        { name: 'Pending', value: pendingCount, color: '#f59e0b' },      // Amber
        { name: 'In Progress', value: inProgressCount, color: '#3b82f6' }, // Blue
        { name: 'Completed', value: completedCount, color: '#10b981' },   // Emerald
    ].filter(item => item.value > 0); // শুধু যেগুলোর ডাটা আছে সেগুলো দেখাবে

    // ৩. বার-চার্টের জন্য ডাটা ফরম্যাট (Blood Group Breakdown)
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    const barData = bloodGroups.map(group => ({
        name: group,
        Requests: requests.filter(r => r.bloodGroup === group).length,
    })).filter(item => item.Requests > 0); // ০ টি রিকোয়েস্ট থাকা গ্রুপ হাইড রাখবে

    // ৪. স্ট্যাটস কার্ডের কনফিগারেশন
    const stats = [
        { title: 'Total Donors', value: totalDonors, icon: FiUsers, bg: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
        { title: 'Total Requests', value: totalRequests, icon: FiDroplet, bg: 'bg-rose-50 text-rose-600 border-rose-100' },
        { title: 'Pending Support', value: pendingCount, icon: FiClock, bg: 'bg-amber-50 text-amber-600 border-amber-100' },
        { title: 'Successful Donation', value: completedCount, icon: FiCheckCircle, bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    ];

    return (
        <div className="space-y-8 w-full p-5 md:p-10">

            {/* 📊 Top Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                                <h3 className="text-2xl font-bold text-slate-800 font-poppins">{stat.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.bg}`}>
                                <Icon className="w-5 h-5 stroke-[2.2]" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 📈 Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Bar Chart: Blood Group Demand (Takes 3/5 width) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-3">
                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-slate-800 font-poppins uppercase tracking-wide">Blood Group Demand</h3>
                        <p className="text-xs text-slate-400">Total requests submitted by blood type</p>
                    </div>
                    <div className="w-full h-64 text-xs font-semibold">
                        {barData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                                    <Bar dataKey="Requests" fill="#e11d48" radius={[6, 6, 0, 0]} maxBarSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-normal">No request history found</div>
                        )}
                    </div>
                </div>

                {/* Pie Chart: Request Status Breakdown (Takes 2/5 width) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 font-poppins uppercase tracking-wide">Request Status</h3>
                        <p className="text-xs text-slate-400">Current status breakdown of total requests</p>
                    </div>

                    <div className="w-full h-48 my-2 flex items-center justify-center font-sans">
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-slate-400 font-normal">No tracking stats available</div>
                        )}
                    </div>

                    {/* Custom Pie Legends */}
                    <div className="grid grid-cols-3 gap-2 border-t border-slate-50 pt-4 text-center">
                        {pieData.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                                    {item.name}
                                </div>
                                <span className="text-sm font-bold text-slate-700 mt-0.5">{item.value}</span>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
}