"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaDroplet, FaCloudArrowUp } from 'react-icons/fa6';

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        bloodGroup: '',
        email: '',
        district: '',
        upazila: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [avatar, setAvatar] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Registration Data:', formData, avatar);
    };

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

                        {/* Blood Group Select Box */}
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
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        {/* Email Input */}
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

                        {/* District Select Box */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">District</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 text-slate-800 bg-white font-medium transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select District</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Sylhet">Sylhet</option>
                            </select>
                        </div>

                        {/* Avatar Input File Uploader */}
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

                        {/* Upazila Select Box */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Upazila</label>
                            <select
                                name="upazila"
                                value={formData.upazila}
                                onChange={handleInputChange}
                                required
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 text-slate-800 bg-white font-medium transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Upazila</option>
                                <option value="Dhanmondi">Dhanmondi</option>
                                <option value="Agrabad">Agrabad</option>
                                <option value="Zindabazar">Zindabazar</option>
                            </select>
                        </div>

                        {/* Password Input */}
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

                        {/* Confirm Password Input */}
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

                    {/* Terms Agreement Checkbox */}
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
                            I agree to the <Link href="/terms" className="text-rose-600 font-bold hover:underline">Terms & Conditions</Link>
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

                <div className="text-center pt-2 border-t border-slate-100">
                    <p className="text-sm text-slate-400 font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-rose-600 font-bold hover:text-rose-700 transition-colors">
                            Login here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}