"use client";

import { BiGitPullRequest } from 'react-icons/bi';
import { FiClock, FiActivity, FiCheckCircle } from 'react-icons/fi';

export default function DashboardStats({ counts, activeFilter, setActiveFilter }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Total Requests Card Button */}
            <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${activeFilter === 'all'
                        ? 'bg-white border-rose-500 shadow-sm ring-1 ring-rose-500/20 scale-[1.01]'
                        : 'bg-white border-slate-100 shadow-sm hover:border-slate-200'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeFilter === 'all' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-600'}`}>
                        <BiGitPullRequest className="h-4 w-4" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                        {String(counts.all).padStart(2, '0')}
                    </span>
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-wide mt-2">Total Requests</span>
            </button>

            {/* Pending Card Button */}
            <button
                type="button"
                onClick={() => setActiveFilter('pending')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${activeFilter === 'pending'
                        ? 'bg-white border-amber-500 shadow-sm ring-1 ring-amber-500/20 scale-[1.01]'
                        : 'bg-white border-slate-100 shadow-sm hover:border-slate-200'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600'}`}>
                        <FiClock className="h-4 w-4" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                        {String(counts.pending).padStart(2, '0')}
                    </span>
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-wide mt-2">Pending</span>
            </button>

            {/* In Progress Card Button */}
            <button
                type="button"
                onClick={() => setActiveFilter('inProgress')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${activeFilter === 'inProgress'
                        ? 'bg-white border-blue-500 shadow-sm ring-1 ring-blue-500/20 scale-[1.01]'
                        : 'bg-white border-slate-100 shadow-sm hover:border-slate-200'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeFilter === 'inProgress' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        <FiActivity className="h-4 w-4" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                        {String(counts.inProgress).padStart(2, '0')}
                    </span>
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-wide mt-2">In Progress</span>
            </button>

            {/* Completed Card Button */}
            <button
                type="button"
                onClick={() => setActiveFilter('completed')}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${activeFilter === 'completed'
                        ? 'bg-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20 scale-[1.01]'
                        : 'bg-white border-slate-100 shadow-sm hover:border-slate-200'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeFilter === 'completed' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                        <FiCheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                        {String(counts.completed).padStart(2, '0')}
                    </span>
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-wide mt-2">Completed</span>
            </button>

        </div>
    );
}