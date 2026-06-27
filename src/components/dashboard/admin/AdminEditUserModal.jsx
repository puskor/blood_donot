"use client";
import { useState, useEffect } from 'react';
import { bdGeographicData } from '@/lib/data/bd-data';
import { GetUserDetailsById } from '@/lib/action/get/userDetailsById';
import { UpdateUser } from '@/lib/action/update/statusUpdate'; // আপনার অ্যাকশন
import toast from 'react-hot-toast';

export default function AdminEditUserModal({ isOpen, onClose, user, onUpdateComplete }) {

    const [userDetails, setUserDetails] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const editUserId = userDetails?.userId;
    const isEditMode = !!user;

    // ১. ইউজার আইডি দিয়ে ডাটাবেজ থেকে ফুল প্রোফাইল ফেচ করা
    const fetchUsers = async () => {
        if (!user?.id) return;
        const data = await GetUserDetailsById(user?.id);
        setUserDetails(data);
    };

    useEffect(() => {
        if (isOpen && user?.id) {
            fetchUsers();
        }
    }, [user?.id, isOpen]);

    // ২. ডাটাবেজ থেকে userDetails আসার সাথে সাথে ফর্মের ডিফল্ট ভ্যালু সেট করা
    useEffect(() => {
        if (isOpen) {
            if (isEditMode && userDetails) {
                setFormData({
                    name: userDetails.name || '',
                    email: userDetails.email || '',
                    phone: userDetails.phone || '',
                    bloodGroup: userDetails.bloodGroup || '',
                    division: userDetails.division || '',
                    district: userDetails.district || '',
                    upazila: userDetails.upazila || '',
                    role: userDetails.role || 'donor',
                    password: '',
                    confirmPassword: ''
                });
                setAvatar(null);
                // ❌ এখান থেকে `UpdateUser(editUserId, formData)` মুছে ফেলা হয়েছে।
            } else if (!isEditMode) {
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
    }, [userDetails, isOpen, isEditMode]);

    if (!isOpen) return null;

    // ইনপুট হ্যান্ডলারসমূহ 
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

    // 💡 ৩. সাবমিট হ্যান্ডলার (এখানে UpdateUser কল করা হয়েছে)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phone && formData.phone.length !== 11) {
            return toast("Phone number must be exactly 11 digits!");
        }

        if (!isEditMode && formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        try {
            setIsSubmitting(true);
            const userId = user?.id || editUserId || null;

            if (isEditMode && userId) {
                // 🔄 ফর্ম সাবমিট করার সময় সার্ভার অ্যাকশন কল হবে
                await UpdateUser(userId, formData);
            }

            // প্যারেন্ট কম্পোনেন্টকে জানানো যে কাজ শেষ
            await onUpdateComplete(isEditMode ? userId : null, formData, avatar);
            onClose();
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to update user!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableDistricts = formData.division ? Object.keys(bdGeographicData[formData.division]?.districts || {}) : [];
    const availableUpazilas = (formData.division && formData.district) ? bdGeographicData[formData.division]?.districts[formData.district] || [] : [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto scrollbar-thin">

                <div className="flex items-center justify-between border-b pb-3">
                    <div>
                        <h3 className="text-base font-bold text-slate-900">
                            {isEditMode ? "Modify User System Ledger" : "Onboard New Secure User"}
                        </h3>
                        <p className="text-xs text-slate-400">
                            {isEditMode ? `Account Email: ${formData.email || user?.email}` : "Fill down details to synchronize"}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name"
                                className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-medium text-slate-800"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                            <input
                                type="email" disabled={isEditMode} name="email" value={formData.email} onChange={handleInputChange} placeholder="......@gmail.com"
                                className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-medium text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number</label>
                            <input
                                type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="01XXXXXXXX" maxLength={11}
                                className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-medium text-slate-800"
                            />
                        </div>

                        {/* Blood Group */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-semibold text-rose-600 focus:outline-none focus:border-rose-500">
                                <option value="">Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>

                        {/* Division */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Division</label>
                            <select name="division" value={formData.division} onChange={handleDivisionChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:border-rose-500">
                                <option value="">Select Division</option>
                                {Object.keys(bdGeographicData).map(div => <option key={div} value={div}>{div}</option>)}
                            </select>
                        </div>

                        {/* District */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">District</label>
                            <select name="district" value={formData.district} onChange={handleDistrictChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:border-rose-500">
                                <option value="">Select District</option>
                                {availableDistricts.map(dis => <option key={dis} value={dis}>{dis}</option>)}
                            </select>
                        </div>

                        {/* Upazila */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Upazila</label>
                            <select name="upazila" value={formData.upazila} onChange={handleInputChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:border-rose-500">
                                <option value="">Select Upazila</option>
                                {availableUpazilas.map(upz => <option key={upz} value={upz}>{upz}</option>)}
                            </select>
                        </div>

                        {/* System Role */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Role</label>
                            <select name="role" value={formData.role} onChange={handleInputChange} className="w-full h-11 px-2 border border-slate-200 rounded-xl bg-white font-semibold text-slate-700 focus:outline-none focus:border-rose-500">
                                <option value="donor">Donor</option>
                                <option value="volunteer">Volunteer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Profile Image */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Profile Image</label>
                            <label className="w-full h-12 border border-dashed border-slate-200 hover:border-rose-500 rounded-xl px-4 flex items-center gap-3 cursor-pointer bg-white transition-colors group">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                <span className="text-xs font-semibold text-slate-500 truncate">
                                    {avatar ? avatar.name : isEditMode ? 'Leave empty to keep existing picture' : 'Upload photo asset'}
                                </span>
                            </label>
                        </div>

                        {/* Passwords */}
                        {!isEditMode && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Set Password</label>
                                    <input
                                        type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••"
                                        className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 text-slate-800"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Confirm Password</label>
                                    <input
                                        type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••"
                                        className="w-full h-11 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 text-slate-800"
                                    />
                                </div>
                            </>
                        )}

                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onClose} className="px-4 h-11 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-5 h-11 rounded-xl bg-rose-600 text-white font-semibold shadow-md shadow-rose-600/10 hover:bg-rose-700 disabled:opacity-50">
                            {isSubmitting ? "Processing Storage..." : isEditMode ? "Update Identity" : "Provision Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}