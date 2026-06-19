"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FaDroplet } from 'react-icons/fa6';
import { IoNotificationsOutline } from 'react-icons/io5';


const TopNavbar = () => {
    return (
        <div>
            {/* Navbar Module Layout */}
            <nav className="w-full h-20 bg-white border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 z-50">
                <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-1.5 bg-rose-600 rounded-lg">
                            <FaDroplet className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-950 font-poppins">
                            Blood<span className="text-rose-600">Care</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 font-poppins">
                        <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
                        <Link href="/donors" className="hover:text-rose-600 transition-colors">Donors</Link>
                        <Link href="/requests" className="text-rose-600 transition-colors">Requests</Link>
                        <Link href="/funding" className="hover:text-rose-600 transition-colors">Funding</Link>
                        <Link href="/about" className="hover:text-rose-600 transition-colors">About Us</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors relative">
                            <IoNotificationsOutline className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-600 rounded-full" />
                        </button>
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200">
                            {/* <Image src={data.avatar} alt="User" fill className="object-cover" /> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default TopNavbar;