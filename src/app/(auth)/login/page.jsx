"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaDroplet } from 'react-icons/fa6';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function Login() {

    const router = useRouter();
    const [redirectTo, setRedirectTo] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect');
        if (redirect) {
            setRedirectTo(redirect);
        }
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await signIn.email({
            email: formData.email,
            password: formData.password
        });

        if (data) {
            toast.success("Login successfully");

            // 🌟 যদি URL-এ কোনো নির্দিষ্ট রিডিরেক্ট পাথ থাকে তবে সেখানে যাবে, নাহলে ডিফল্ট ড্যাশবোর্ডে যাবে
            if (redirectTo) {
                router.push(redirectTo);
            } else {
                router.push("/dashboard");
            }
        }
        if (error) {
            toast.error("Something is wrong");
        }
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col md:flex-row font-inter">

            {/* Left Side: Illustration Panel */}
            <div className="w-full md:w-[40%] bg-rose-50/50 flex flex-col items-center justify-center p-8 relative overflow-hidden border-r border-slate-100">
                <div className="absolute w-72 h-72 bg-rose-100/40 rounded-full blur-3xl" />
                <div className="relative w-full max-w-[320px] aspect-[4/5] hidden md:block">
                    <Image
                        src="/image/login_img.png"
                        alt="Blood Bag Illustration"
                        fill
                        priority
                        className="object-contain select-none pointer-events-none"
                    />
                </div>
            </div>

            {/* Right Side: Form Handler */}
            <div className="w-full md:w-[60%] flex flex-col justify-center items-center p-8 sm:p-12 lg:p-20">
                <div className="w-full max-w-md space-y-8">

                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="p-1.5 bg-rose-600 rounded-lg">
                                <FaDroplet className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-950 font-poppins">
                                Blood<span className="text-rose-600">Donor</span>
                            </span>
                        </Link>

                        <div className="text-center md:text-left space-y-1">
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 font-poppins tracking-tight">
                                Welcome Back!
                            </h1>
                            <p className="text-sm text-slate-400 font-medium">
                                Login to your account
                            </p>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 placeholder-slate-300 transition-all font-medium text-slate-800"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700 tracking-wide">Password</label>
                                <Link href="/forgot-password" className="text-xs font-semibold text-rose-600 hover:text-rose-700">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 placeholder-slate-300 transition-all font-medium text-slate-800"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <HiOutlineEye className="h-5 w-5" /> : <HiOutlineEyeOff className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors shadow-md shadow-rose-600/10 text-sm mt-2"
                        >
                            Login
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-sm text-slate-400 font-medium">
                            Don't have an account?{' '}
                            <Link href={redirectTo ? `/register?redirect=${redirectTo}` : `/register`} className="text-rose-600 font-bold hover:text-rose-700 transition-colors">
                                Register here
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}