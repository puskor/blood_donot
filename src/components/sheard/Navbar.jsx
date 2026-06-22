"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplet } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Donors', path: '/#' },
        { name: 'Requests', path: '/#' },
        // { name: 'Funding', path: '/funding' },
        { name: 'About Us', path: '/#' },
        { name: 'Contact', path: '/#' },
    ];

    return (
        <header className="w-full h-20 bg-white/80 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-slate-100 flex items-center">
            <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-1.5 bg-rose-600 rounded-lg shadow-sm group-hover:bg-rose-700 transition-colors">
                        <Droplet className="h-6 w-6 text-white fill-current" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-slate-950 font-poppins">
                        Blood<span className="text-rose-600">Donor</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-sm font-medium transition-colors font-inter ${isActive
                                    ? 'text-rose-600 font-semibold'
                                    : 'text-slate-600 hover:text-rose-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Action Button */}
                <div>
                    <Link
                        href="/login"
                        className="px-6 py-2.5 bg-rose-600 text-white font-medium text-sm rounded-xl hover:bg-rose-700 transition-all shadow-md shadow-rose-600/10 font-inter"
                    >
                        Get Started
                    </Link>
                </div>

            </div>
        </header>



    );
}