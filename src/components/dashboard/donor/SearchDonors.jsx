"use client";

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function SearchDonors({ onSearch }) {
    const [filters, setFilters] = useState({
        bloodGroup: '',
        district: '',
        upazila: '',
    });

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(filters);
    };

    return (
        <div className="w-full  bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row items-end gap-5">

                {/* Blood Group Select Filter */}
                <div className="w-full lg:w-1/4 space-y-2 text-left">
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

                {/* District Select Filter */}
                <div className="w-full lg:w-1/4 space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-700 tracking-wide font-inter">District</label>
                    <div className="relative">
                        <select
                            name="district"
                            value={filters.district}
                            onChange={handleSelectChange}
                            className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white appearance-none cursor-pointer focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 transition-all font-inter"
                        >
                            <option value="">Select District</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none h-4 w-4" />
                    </div>
                </div>

                {/* Upazila Select Filter */}
                <div className="w-full lg:w-1/4 space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-700 tracking-wide font-inter">Upazila</label>
                    <div className="relative">
                        <select
                            name="upazila"
                            value={filters.upazila}
                            onChange={handleSelectChange}
                            className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white appearance-none cursor-pointer focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600/20 transition-all font-inter"
                        >
                            <option value="">Select Upazila</option>
                            <option value="Dhanmondi">Dhanmondi</option>
                            <option value="Agrabad">Agrabad</option>
                            <option value="Zindabazar">Zindabazar</option>
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none h-4 w-4" />
                    </div>
                </div>

                {/* Submit Search Trigger CTA Box */}
                <div className="w-full lg:w-1/4">
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