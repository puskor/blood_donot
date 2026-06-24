"use client";

import { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaCloudArrowUp } from 'react-icons/fa6';
import { bdGeographicData } from '@/lib/data/bd-data'; 
import { uploadImage } from '@/lib/uploadImage'; // আপনার ইমেজ আপলোড ফাংশন
import { UserDetailsPost } from '@/lib/action/post/userDetails'; // আপনার ডাটাবেজ আপডেট অ্যাকশন

export default function EditProfileModal({ isOpen, onClose, user, onUpdateComplete }) {
    const [formData, setFormData] = useState({
        name: '',
        bloodGroup: '',
        phone: '',
        division: '',
        district: '',
        upazila: '',
        image: ''
    });
    const [avatar, setAvatar] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // মডাল ওপেন হলে ইউজারের কারেন্ট ডাটা লোড হবে
    useEffect(() => {
        if (user && isOpen) {
            setFormData({
                name: user.name || '',
                bloodGroup: user.bloodGroup || '',
                phone: user.phone || '',
                division: user.division || '',
                district: user.district || '',
                upazila: user.upazila || '',
                image: user.image || ''
            });
            setAvatar(null);
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: onlyNums }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDivisionChange = (e) => {
        setFormData(prev => ({
            ...prev,
            division: e.target.value,
            district: '',
            upazila: ''
        }));
    };

    const handleDistrictChange = (e) => {
        setFormData(prev => ({
            ...prev,
            district: e.target.value,
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
        if (formData.phone.length !== 11) {
            return alert("Phone number must be exactly 11 digits");
        }

        setIsSubmitting(true);
        try {
            let finalImageUrl = formData.image;

            // ১. যদি নতুন কোনো ছবি সিলেক্ট করা হয়, তবে সেটি আপলোড হবে
            if (avatar) {
                finalImageUrl = await uploadImage(avatar);
            }

            // নতুন এবং আপডেটেড ডেটা অবজেক্ট তৈরি
            const updatedDetails = {
                userId: user.userId, // প্যারেন্ট থেকে আসা মেইন আইডি
                name: formData.name,
                bloodGroup: formData.bloodGroup,
                phone: formData.phone,
                division: formData.division,
                district: formData.district,
                upazila: formData.upazila,
                image: finalImageUrl,
                createdAt: user.createdAt // আগের টাইমস্ট্যাম্প ঠিক রাখা হলো
            };

            // ২. সার্ভার অ্যাকশন বা API দিয়ে ডাটাবেজে সেভ করা
            const serverResult = await UserDetailsPost(updatedDetails);

            if (serverResult.success) {
                alert("Profile updated successfully!");
                // প্যারেন্ট কম্পোনেন্টের স্টেট আপডেট করার ফাংশন কল
                if (onUpdateComplete) {
                    onUpdateComplete(updatedDetails);
                }
                onClose(); // মডাল বন্ধ করা
            } else {
                alert(serverResult.message || "Failed to sync updates with database.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong while updating profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableDistricts = formData.division ? Object.keys(bdGeographicData[formData.division]?.districts || {}) : [];
    const availableUpazilas = (formData.division && formData.district) ? bdGeographicData[formData.division]?.districts[formData.district] || [] : [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-100 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-base font-bold text-slate-900 font-poppins tracking-tight">Edit Profile</h2>
                    <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <IoCloseOutline className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Name */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800" />
                        </div>

                        {/* Blood Group */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 text-slate-800 bg-white font-medium cursor-pointer">
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Phone Number</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} minLength={11} maxLength={11} required className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 font-medium text-slate-800" />
                        </div>

                        {/* Avatar Upload */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Profile Photo</label>
                            <label className="w-full h-10 border border-dashed border-slate-200 hover:border-rose-600 rounded-xl px-4 flex items-center justify-start gap-2.5 cursor-pointer bg-white transition-colors group">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                <FaCloudArrowUp className="h-4 w-4 text-rose-600 shrink-0" />
                                <span className="text-xs font-bold text-rose-600 truncate">
                                    {avatar ? avatar.name : 'Change Photo'}
                                </span>
                            </label>
                        </div>

                        {/* Division */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Division</label>
                            <select name="division" value={formData.division} onChange={handleDivisionChange} required className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 text-slate-800 bg-white font-medium cursor-pointer">
                                <option value="" disabled>Select Division</option>
                                {Object.keys(bdGeographicData).map(div => <option key={div} value={div}>{div}</option>)}
                            </select>
                        </div>

                        {/* District */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">District</label>
                            <select name="district" value={formData.district} onChange={handleDistrictChange} required disabled={!formData.division} className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 text-slate-800 bg-white font-medium disabled:bg-slate-50 disabled:cursor-not-allowed">
                                <option value="" disabled>Select District</option>
                                {availableDistricts.map(dis => <option key={dis} value={dis}>{dis}</option>)}
                            </select>
                        </div>

                        {/* Upazila */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-bold text-slate-700 tracking-wide">Upazila</label>
                            <select name="upazila" value={formData.upazila} onChange={handleChange} required disabled={!formData.district} className="w-full h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-600 text-slate-800 bg-white font-medium disabled:bg-slate-50 disabled:cursor-not-allowed">
                                <option value="" disabled>Select Upazila</option>
                                {availableUpazilas.map(upz => <option key={upz} value={upz}>{upz}</option>)}
                            </select>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="px-4 h-10 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-5 h-10 text-xs font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors shadow-md disabled:bg-rose-400">
                            {isSubmitting ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}