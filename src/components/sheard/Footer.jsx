import Link from 'next/link';
import { FaDroplet, FaPhone, FaEnvelope, FaMapPin, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Search Donors', path: '/donors' },
        { name: 'Donation Requests', path: '/requests' },
        { name: 'Funding', path: '/funding' },
        { name: 'About Us', path: '/about' },
    ];

    const supportLinks = [
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms & Conditions', path: '/terms' },
    ];

    return (
        <footer className="w-full bg-pink-100 border-slate-100 pt-16 pb-8 px-6 font-inter">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">

                    <div className="md:col-span-4 flex flex-col space-y-5">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="p-1.5 bg-rose-600 rounded-lg flex items-center justify-center">
                                <FaDroplet className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-950 font-poppins">
                                Blood<span className="text-rose-600">Donor</span>
                            </span>
                        </Link>

                        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                            A platform dedicated to connecting blood donors with those in need. Together, we can save more lives.
                        </p>

                        <div className="flex items-center gap-4 text-slate-400">
                            <a href="#" className="hover:text-rose-600 transition-colors"><FaFacebookF className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-rose-600 transition-colors"><FaTwitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-rose-600 transition-colors"><FaInstagram className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-rose-600 transition-colors"><FaLinkedinIn className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 tracking-wide font-poppins">Quick Links</h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.path} className="text-sm text-slate-500 hover:text-rose-600 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 tracking-wide font-poppins">Support</h3>
                        <ul className="space-y-2.5">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.path} className="text-sm text-slate-500 hover:text-rose-600 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 tracking-wide font-poppins">Contact Us</h3>
                        <ul className="space-y-3.5 text-sm text-slate-600">
                            <li className="flex items-center gap-3">
                                <FaPhone className="h-4 w-4 text-rose-600 shrink-0" />
                                <span className="font-medium">+880 1234 567890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="h-4 w-4 text-rose-600 shrink-0" />
                                <span className="font-medium">info@blooddonor.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaMapPin className="h-4 w-4 text-rose-600 shrink-0" />
                                <span className="font-medium">Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 text-center">
                    <p className="text-xs text-slate-400">
                        &copy; {currentYear} BloodDonor. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}