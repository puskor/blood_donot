"use client";
import { useState, useEffect } from 'react';
// import { FiX, FiCloudArrowUp } from 'react-icons/fi';
import { bdGeographicData } from '@/lib/data/bd-data';

export default function AdminEditUserModal({ isOpen, onClose, user, onUpdateComplete }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bloodGroup: '',
        division: '',
        district: '',
        upazila: '',
        role: 'donor',
        password: '',
        confirmPassword: ''
    });

    const [avatar, setAvatar] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = !!user;

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                // 📝 Edit Mode: এক্সিস্টিং ইউজারের ডাটা প্রি-ফিল করা (পাসওয়ার্ড ছাড়া)
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    bloodGroup: user.bloodGroup || '',
                    division: user.division || '',
                    district: user.district || '',
                    upazila: user.upazila || '',
                    role: user.role || 'donor',
                    password: '',
                    confirmPassword: ''
                });
                setAvatar(null);
            } else {
                // ➕ Create Mode: ফর্ম একদম ফ্রেশ বা রিসেট
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    bloodGroup: '',
                    division: '',
                    district: '',
                    upazila: '',
                    role: 'donor',
                    password: '',
                    confirmPassword: ''
                });
                setAvatar(null);
            }
        }
    }, [user, isOpen, isEditMode]);

    if (!isOpen) return null;

    // হ্যান্ডলারসমূহ (Geographic Data Filter)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: onlyNums }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDivisionChange = (e) => {
        setFormData(prev => ({ ...prev, division: e.target.value, district: '', upazila: '' }));
    };

    const handleDistrictChange = (e) => {
        setFormData(prev => ({ ...prev, district: e.target.value, upazila: '' }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ভ্যালিডেশন চেক (শুধু নতুন ইউজার ক্রিয়েট করার সময়)
        if (!isEditMode) {
            if (formData.password !== formData.confirmPassword) {
                return alert("Passwords do not match!");
            }
            if (formData.phone.length !== 11) {
                return alert("Phone number must be exactly 11 digits!");
            }
        }

        try {
            setIsSubmitting(true);
            
            // প্যারেন্ট কম্পোনেন্টের ক্রিয়েট/আপডেট মেথড ট্রিক করা হচ্ছে
            // নতুন ফাইল থাকলে তা প্যারেন্ট হ্যান্ডলারে 'avatar' ফাইল অবজেক্ট হিসেবে চালান করে দেওয়া হবে
            await onUpdateComplete(isEditMode ? user.id : null, formData, avatar);
            
            onClose();
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableDistricts = formData.division ? Object.keys(bdGeographicData[formData.division]?.districts || {}) : [];
    const availableUpazilas = (formData.division && formData.district) ? bdGeographicData[formData.division]?.districts[formData.district] || [] : [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 scrollbar-thin">
                
                {/* হেডার */}
                <div className="flex items-center justify-between border-b pb-3">
                    <div>
                        <h3 className="text-base font-bold text-slate-900 font-poppins">
                            {isEditMode ? "Modify User System Ledger" : "Onboard New Secure User"}
                        </h3>
                        <p className="text-xs text-slate-400">
                            {isEditMode ? `Account Email: ${user.email}` : "Fill down details to synchronize with BetterAuth & Database"}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
                        {/* <FiX className="h-5 w-5" /> */}
                    </button>
                </div>

                {/* ফর্ম ডাটা */}
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                            <input 
                                type="text" required name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name"
                                className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-medium text-slate-800 transition-colors" 
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                            <input 
                                type="email" required disabled={isEditMode} name="email" value={formData.email} onChange={handleInputChange} placeholder="......@gmail.com"
                                className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-medium text-slate-800 disabled:bg-slate-50 disabled:text-slate-400 transition-colors" 
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number</label>
                            <input 
                                type="tel" required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="01XXXXXXXX" minLength={11} maxLength={11}
                                className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-medium text-slate-800 transition-colors" 
                            />
                        </div>

                        {/* Blood Group */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Blood Group</label>
                            <select name="bloodGroup" required value={formData.bloodGroup} onChange={handleInputChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-semibold text-rose-600 focus:outline-none focus:border-rose-500">
                                <option value="" disabled>Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>

                        {/* Division */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Division</label>
                            <select name="division" required value={formData.division} onChange={handleDivisionChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:border-rose-500">
                                <option value="" disabled>Select Division</option>
                                {Object.keys(bdGeographicData).map(div => <option key={div} value={div}>{div}</option>)}
                            </select>
                        </div>

                        {/* District */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">District</label>
                            <select name="district" required disabled={!formData.division} value={formData.district} onChange={handleDistrictChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:border-rose-500 disabled:bg-slate-50">
                                <option value="" disabled>Select District</option>
                                {availableDistricts.map(dis => <option key={dis} value={dis}>{dis}</option>)}
                            </select>
                        </div>

                        {/* Upazila */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Upazila</label>
                            <select name="upazila" required disabled={!formData.district} value={formData.upazila} onChange={handleInputChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:border-rose-500 disabled:bg-slate-50">
                                <option value="" disabled>Select Upazila</option>
                                {availableUpazilas.map(upz => <option key={upz} value={upz}>{upz}</option>)}
                            </select>
                        </div>

                        {/* Role Control */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Role</label>
                            <select name="role" required value={formData.role} onChange={handleInputChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-semibold text-slate-700 focus:outline-none focus:border-rose-500">
                                <option value="donor">Donor</option>
                                <option value="volunteer">Volunteer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Avatar Picker */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Profile Image</label>
                            <label className="w-full h-12 border border-dashed border-slate-200 hover:border-rose-500 rounded-xl px-4 flex items-center gap-3 cursor-pointer bg-white transition-colors group">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                {/* <FiCloudArrowUp className="h-5 w-5 text-rose-500 group-hover:scale-110 transition-transform" /> */}
                                <span className="text-xs font-semibold text-slate-500 truncate">
                                    {avatar ? avatar.name : isEditMode ? 'Leave empty to keep existing picture' : 'Upload photo asset'}
                                </span>
                            </label>
                        </div>

                        {/* Passwords (নতুন ইউজার তৈরির জন্য প্রয়োজনীয়) */}
                        {!isEditMode && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Set Password</label>
                                    <input 
                                        type="password" required={!isEditMode} name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••"
                                        className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 text-slate-800 transition-colors" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Confirm Password</label>
                                    <input 
                                        type="password" required={!isEditMode} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••"
                                        className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 text-slate-800 transition-colors" 
                                    />
                                </div>
                            </>
                        )}

                    </div>

                    {/* ফুট বাটন */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="px-4 h-11 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-5 h-11 rounded-xl bg-rose-600 text-white font-semibold shadow-md shadow-rose-600/10 hover:bg-rose-700 disabled:opacity-50 transition-all">
                            {isSubmitting ? "Processing Storage..." : isEditMode ? "Update Identity" : "Provision Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}