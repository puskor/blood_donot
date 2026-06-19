"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RxDashboard } from 'react-icons/rx';
import { FiUser, FiUsers, FiFileText } from 'react-icons/fi';
import { AiOutlineDollar } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';

export default function Sidebar() {
    const pathname = usePathname();

    // ডিজাইন সিস্টেমের সাইডবার মেনু অপশন সমূহ
    const menuItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: RxDashboard,
        },
        {
            name: 'Profile',
            path: '/dashboard/profile',
            icon: FiUser,
        },
        {
            name: 'Users',
            path: '/dashboard/users',
            icon: FiUsers,
        },
        {
            name: 'Donation Requests',
            path: '/dashboard/requests',
            icon: FiFileText,
        },
        {
            name: 'Funding Management',
            path: '/dashboard/funding',
            icon: AiOutlineDollar,
        },
    ];

    const handleLogout = () => {
        console.log('Logging out from dashboard context panel...');
    };

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-100 py-6 px-4 flex flex-col justify-between font-inter">
            <div className="space-y-6">

                {/* Navigation Menu Link Groups */}
                <nav className="flex flex-col gap-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`w-full h-12 px-4 rounded-xl flex items-center gap-3.5 text-sm font-semibold transition-all group ${isActive
                                        ? 'bg-rose-50/60 border-l-[3px] border-rose-600 text-rose-600 rounded-l-none'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? 'text-rose-600' : 'text-slate-400 group-hover:text-slate-600'
                                    }`} />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer Session Target Panel Action Box */}
            <div className="border-t border-slate-100 pt-4">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full h-12 px-4 rounded-xl flex items-center gap-3.5 text-sm font-semibold text-slate-500 hover:bg-rose-50/40 hover:text-rose-600 transition-all group"
                >
                    <IoLogOutOutline className="h-5 w-5 text-slate-400 group-hover:text-rose-600 shrink-0 transition-colors" />
                    <span>Logout</span>
                </button>
            </div>

        </aside>
    );
}