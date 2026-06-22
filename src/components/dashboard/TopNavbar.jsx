"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaDroplet } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";


const TopNavbar = () => {
    const { data: session } = useSession()
    const user = session?.user;
    // console.log(user)
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white border-b border-slate-100 px-6 flex items-center justify-between">
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
                    <Link href="/">Home</Link>
                    <Link href="/donors">Donors</Link>
                    <Link href="/requests">Requests</Link>
                    <Link href="/funding">Funding</Link>
                    <Link href="/about">About Us</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors relative">
                        <IoNotificationsOutline className="h-5 w-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-600 rounded-full" />
                    </button>

                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user?.name || "User avatar"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <Image
                                src="/default-avatar.png"
                                alt="Default avatar"
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;