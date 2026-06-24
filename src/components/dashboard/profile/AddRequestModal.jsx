"use client";

import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { bdGeographicData } from '@/lib/data/bd-data'; // ডেটা ফাইলটি ইম্পোর্ট করুন

export default function AddRequestModal({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        patientName: '',
        bloodGroup: '',
        age: '',
        hospitalName: '',
        division: '',   // নতুন যুক্ত করা হয়েছে
        district: '',
        upazila: '',
        neededDate: '',
        neededTime: '',
        phone: '',
        description: '',
        status: 'Pending'
    });

    if (!isOpen) return null;

    // সাধারণ চেঞ্জ হ্যান্ডলার
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Division পরিবর্তন হলে District এবং Upazila রিসেট হবে
    const handleDivisionChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            division: value,
            district: '',
            upazila: ''
        }));
    };

    // District পরিবর্তন হলে কেবল Upazila রিসেট হবে
    const handleDistrictChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            district: value,
            upazila: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // ফর্ম ক্লিয়ার স্টেট
        setFormData({
            patientName: '', bloodGroup: '', age: '', hospitalName: '',
            division: '', district: '', upazila: '', neededDate: '', neededTime: '',
            phone: '', description: '', status: 'Pending'
        });
        onClose();
    };

    // ডাইনামিক অপশন খোঁজার লজিক
    const availableDistricts = formData.division ? Object.keys(bdGeographicData[formData.division]?.districts || {}) : [];
    const availableUpazilas = (formData.division && formData.district) ? bdGeographicData[formData.division]?.districts[formData.district] || [] : [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-100 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-base font-bold text-slate-900 font-poppins tracking-tight">Create Blood Request</h2>
                    <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <IoCloseOutline className="h-5 w-5" />
                    </button>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Patient Name */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Patient Name</label>
                            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required placeholder="Enter patient name" className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800" />
                        </div>

                        {/* Blood Group */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 text-slate-800 bg-white font-medium cursor-pointer">
                                <option value="" disabled>Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>

                        {/* Age */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Patient Age</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="e.g. 22" className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800" />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Phone Number</label>
                            <input type="text" inputMode="numeric" name="phone" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') }))} minLength={11} maxLength={11} required placeholder="01XXXXXXXXX" className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800" />
                        </div>

                        {/* Hospital Name */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Hospital Name</label>
                            <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} required placeholder="e.g. Square Hospital" className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800" />
                        </div>

                        {/* 1. Division Dropdown */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Division</label>
                            <select name="division" value={formData.division} onChange={handleDivisionChange} required className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 text-slate-800 bg-white font-medium cursor-pointer">
                                <option value="" disabled>Select Division</option>
                                {Object.keys(bdGeographicData).map(div => <option key={div} value={div}>{div}</option>)}
                            </select>
                        </div>

                        {/* 2. District Dropdown */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">District</label>
                            <select name="district" value={formData.district} onChange={handleDistrictChange} required disabled={!formData.division} className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 text-slate-800 bg-white font-medium cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed">
                                <option value="" disabled>Select District</option>
                                {availableDistricts.map(dis => <option key={dis} value={dis}>{dis}</option>)}
                            </select>
                        </div>

                        {/* 3. Upazila Dropdown */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Upazila</label>
                            <select name="upazila" value={formData.upazila} onChange={handleChange} required disabled={!formData.district} className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 text-slate-800 bg-white font-medium cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed">
                                <option value="" disabled>Select Upazila</option>
                                {availableUpazilas.map(upz => <option key={upz} value={upz}>{upz}</option>)}
                            </select>
                        </div>

                        {/* Donation Date */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Donation Date</label>
                            <input type="date" name="neededDate" value={formData.neededDate} onChange={handleChange} required className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800 cursor-pointer" />
                        </div>

                        {/* Donation Time */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Donation Time</label>
                            <input type="time" name="neededTime" value={formData.neededTime} onChange={handleChange} required className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800 cursor-pointer" />
                        </div>

                    </div>

                    {/* Request Details Description */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 tracking-wide">Request Description (Optional)</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={2} placeholder="Add any clinical reason or extra info..." className="w-full p-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800 resize-none" />
                    </div>

                    {/* Actions Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="px-4 h-10 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">Cancel</button>
                        <button type="submit" className="px-5 h-10 text-xs font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors shadow-md shadow-rose-600/10">Submit Request</button>
                    </div>
                </form>

            </div>
        </div>
    );
}