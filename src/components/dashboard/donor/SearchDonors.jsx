"use client";

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { bdGeographicData } from '@/lib/data/bd-data'; // আপনার ডেটা ফাইলটি এখানে ইম্পোর্ট করুন

export default function SearchDonors({ onSearch }) {
    const [filters, setFilters] = useState({
        bloodGroup: '',
        division: '', // নতুন যুক্ত করা হয়েছে
        district: '',
        upazila: '',
    });

    // সাধারণ এবং Upazila চেঞ্জ হ্যান্ডলার
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Division পরিবর্তন হলে নিচের দুটো রিসেট হবে
    const handleDivisionChange = (e) => {
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            division: value,
            district: '',
            upazila: ''
        }));
    };

    // District পরিবর্তন হলে কেবল Upazila রিসেট হবে
    const handleDistrictChange = (e) => {
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            district: value,
            upazila: ''
        }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(filters);
    };

    // ডাইনামিক ফিল্টারিং অপশন খোঁজার লজিক
    const availableDistricts = filters.division ? Object.keys(bdGeographicData[filters.division]?.districts || {}) : [];
    const availableUpazilas = (filters.division && filters.district) ? bdGeographicData[filters.division]?.districts[filters.district] || [] : [];

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row items-end gap-4">

                {/* Blood Group Select Filter */}
                <div className="w-full lg:flex-1 space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-700 tracking-wide font-inter">Blood Group</label>
                    <div className="relative">
                        <select
                            name="bloodGroup"
                            value={filters.bloodGroup}
                            onChange={handleSelectChange}
                            className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white appearance-none cursor-pointer focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 transition-all font-inter"
                        >
                            <option value="">All Groups</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none h-4 w-4" />
                    </div>
                </div>

                {/* 1. Division Select Filter */}
                <div className="w-full lg:flex-1 space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-700 tracking-wide font-inter">Division</label>
                    <div className="relative">
                        <select
                            name="division"
                            value={filters.division}
                            onChange={handleDivisionChange}
                            className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white appearance-none cursor-pointer focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 transition-all font-inter"
                        >
                            <option value="">All Divisions</option>
                            {Object.keys(bdGeographicData).map(div => (
                                <option key={div} value={div}>{div}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none h-4 w-4" />
                    </div>
                </div>

                {/* 2. District Select Filter */}
                <div className="w-full lg:flex-1 space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-700 tracking-wide font-inter">District</label>
                    <div className="relative">
                        <select
                            name="district"
                            value={filters.district}
                            onChange={handleDistrictChange}
                            disabled={!filters.division}
                            className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white appearance-none cursor-pointer focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 transition-all font-inter disabled:bg-slate-50 disabled:cursor-not-allowed"
                        >
                            <option value="">Select District</option>
                            {availableDistricts.map(dis => (
                                <option key={dis} value={dis}>{dis}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none h-4 w-4" />
                    </div>
                </div>

                {/* 3. Upazila Select Filter */}
                <div className="w-full lg:flex-1 space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-700 tracking-wide font-inter">Upazila</label>
                    <div className="relative">
                        <select
                            name="upazila"
                            value={filters.upazila}
                            onChange={handleSelectChange}
                            disabled={!filters.district}
                            className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white appearance-none cursor-pointer focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 transition-all font-inter disabled:bg-slate-50 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Upazila</option>
                            {availableUpazilas.map(upz => (
                                <option key={upz} value={upz}>{upz}</option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none h-4 w-4" />
                    </div>
                </div>

                {/* Submit Search Button */}
                <div className="w-full lg:w-36">
                    <button
                        type="submit"
                        className="w-full h-12 bg-rose-600 text-white font-bold text-sm rounded-xl hover:bg-rose-700 transition-colors shadow-md shadow-rose-600/10 font-poppins tracking-wide"
                    >
                        Search
                    </button>
                </div>

            </form>
        </div>
    );
}