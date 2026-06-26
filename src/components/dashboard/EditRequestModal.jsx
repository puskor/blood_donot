"use client";

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function EditRequestModal({ isOpen, onClose, requestData, onUpdate }) {
  const [formData, setFormData] = useState({
    patientName: requestData?.patientName || '',
    bloodGroup: requestData?.bloodGroup || '',
    hospitalName: requestData?.hospitalName || '',
    neededDate: requestData?.neededDate || '',
    status: requestData?.status || 'Pending'
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // এখানে আপনার ব্যাকএন্ড অ্যাকশন কল করতে পারেন (যেমন: await UpdateBloodRequest(requestData._id, formData))
    if (onUpdate) {
      await onUpdate(requestData._id, formData);
    }
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-poppins">Edit Blood Request</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full h-10 px-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 transition-all font-medium bg-white"
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-10 px-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 transition-all font-medium bg-white"
              >
                {['Pending', 'In Progress', 'Completed', 'Rejected'].map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 transition-all font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Needed Date</label>
            <input
              type="date"
              name="neededDate"
              value={formData.neededDate}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-600 transition-all font-medium"
            />
          </div>

          {/* Buttons Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 h-10 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md shadow-rose-600/10 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}