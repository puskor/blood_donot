"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaDroplet, FaCloudArrowUp } from 'react-icons/fa6';
import { signUp } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation'; // 🌟 useSearchParams ইম্পোর্ট করা হলো
import { uploadImage } from '@/lib/uploadImage';
import { UserDetailsPost } from '@/lib/action/post/userDetails';
import { bdGeographicData } from '@/lib/data/bd-data';

export default function SignUp() {
    const router = useRouter();
    const searchParams = useSearchParams(); // 🌟 সার্চ প্যারামস অবজেক্ট তৈরি

    // URL থেকে 'redirect' প্যারামিটার রিড করা হচ্ছে (যেমন: /dashboard/donor/donor_list/...)
    const redirectTo = searchParams.get('redirect');
    console.log(redirectTo)

    const [formData, setFormData] = useState({
        name: '',
        bloodGroup: '',
        email: '',
        phone: '',
        division: '',
        district: '',
        upazila: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [avatar, setAvatar] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'phone') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            setFormData((prev) => ({
                ...prev,
                [name]: onlyNums,
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDivisionChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            division: value,
            district: '',
            upazila: ''
        }));
    };

    const handleDistrictChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            district: value,
            upazila: ''
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match");
        }

        if (formData.phone.length !== 11) {
            return alert("Phone number must be exactly 11 digits");
        }

        try {
            let avatarUrl = "";

            if (avatar) {
                avatarUrl = await uploadImage(avatar);
            }

            const { data, error } = await signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: avatarUrl,
            });

            if (error) {
                console.log(error);
                return alert(error.message);
            }

            const details = {
                userId: data?.user?.id || data?.id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                bloodGroup: formData.bloodGroup,
                division: formData.division,
                district: formData.district,
                upazila: formData.upazila,
                image: avatarUrl,
                createdAt: new Date()
            };

            const serverResult = await UserDetailsPost(details);

            if (serverResult.success) {
                console.log("Database Sync Successful:", serverResult);
                alert("Registration successful!");

                // 🌟 যদি URL-এ কোনো নির্দিষ্ট রিডিরেক্ট পাথ থাকে তবে সেখানে যাবে, নাহলে ডিফল্ট ড্যাশবোর্ডে যাবে
                if (redirectTo) {
                    router.push(redirectTo);
                } else {
                    router.push("/dashboard");
                }
            } else {
                alert(serverResult.message || "Auth cleared but DB sync failed.");
            }

        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }
    };

    const availableDistricts = formData.division ? Object.keys(bdGeographicData[formData.division]?.districts || {}) : [];
    const availableUpazilas = (formData.division && formData.district) ? bdGeographicData[formData.division]?.districts[formData.district] || [] : [];

    return (
        <div className="w-full min-h-screen bg-slate-50/30 flex items-center justify-center p-6 sm:p-10 font-inter">
            <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-100 p-8 sm:p-12 shadow-sm space-y-8">

                <div className="flex flex-col items-center space-y-4 text-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-1.5 bg-rose-600 rounded-lg">
                            <FaDroplet className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-950 font-poppins">
                            Blood<span className="text-rose-600">Donor</span>
                        </span>
                    </Link>

                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-950 font-poppins tracking-tight">
                            Create an Account
                        </h1>
                        <p className="text-xs text-slate-400 font-medium">
                            Register to get started
                        </p>
                    </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                        {/* Name Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 placeholder-slate-300 transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Blood Group */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Blood Group</label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleInputChange}
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 text-slate-800 bg-white font-medium transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 placeholder-slate-300 transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter 11 digit number"
                                minLength={11}
                                maxLength={11}
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 placeholder-slate-300 transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Division */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Division</label>
                            <select
                                name="division"
                                value={formData.division}
                                onChange={handleDivisionChange}
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 text-slate-800 bg-white font-medium transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Division</option>
                                {Object.keys(bdGeographicData).map(div => (
                                    <option key={div} value={div}>{div}</option>
                                ))}
                            </select>
                        </div>

                        {/* District */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">District</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleDistrictChange}
                                disabled={!formData.division}
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 text-slate-800 bg-white font-medium transition-all appearance-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
                            >
                                <option value="" disabled>Select District</option>
                                {availableDistricts.map(dis => (
                                    <option key={dis} value={dis}>{dis}</option>
                                ))}
                            </select>
                        </div>

                        {/* Upazila */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Upazila</label>
                            <select
                                name="upazila"
                                value={formData.upazila}
                                onChange={handleInputChange}
                                disabled={!formData.district}
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 text-slate-800 bg-white font-medium transition-all appearance-none cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed"
                            >
                                <option value="" disabled>Select Upazila</option>
                                {availableUpazilas.map(upz => (
                                    <option key={upz} value={upz}>{upz}</option>
                                ))}
                            </select>
                        </div>

                        {/* Avatar */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Avatar</label>
                            <label className="w-full h-11 border border-dashed border-slate-200 hover:border-rose-600 rounded-xl px-4 flex items-center justify-start gap-2.5 cursor-pointer bg-white transition-colors group">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                <FaCloudArrowUp className="h-4 w-4 text-rose-600 shrink-0 group-hover:scale-105 transition-transform" />
                                <div className="flex flex-col text-left truncate">
                                    <span className="text-xs font-bold text-rose-600 truncate">
                                        {avatar ? avatar.name : 'Upload Photo'}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">PNG, JPG up to 2MB</span>
                                </div>
                            </label>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 placeholder-slate-300 transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 placeholder-slate-300 transition-all font-medium text-slate-800"
                            />
                        </div>

                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2 pt-1">
                        <input
                            type="checkbox"
                            id="terms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-600/20 mt-0.5 cursor-pointer accent-rose-600"
                        />
                        <label htmlFor="terms" className="text-xs font-medium text-slate-500 select-none cursor-pointer leading-relaxed">
                            I agree to the <Link href="#" className="text-rose-600 font-bold hover:underline">Terms & Conditions</Link>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full h-11 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors shadow-md shadow-rose-600/10 text-sm"
                    >
                        Register
                    </button>
                </form>

                {/* 🌟 ফিক্স: নিচের লগইন লিংকেও যেন রিডিরেক্ট প্যারামিটার পাস হয় */}
                <div className="text-center pt-2 border-t border-slate-100">
                    <p className="text-sm text-slate-400 font-medium">
                        Already have an account?{' '}
                        <Link
                            href={redirectTo ? `/login?redirect=${redirectTo}` : "/login"}
                            className="text-rose-600 font-bold hover:text-rose-700 transition-colors"
                        >
                            Login here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}