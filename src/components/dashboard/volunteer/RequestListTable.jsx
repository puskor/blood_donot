"use client";

import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import DeleteConfirmModal from '../DeleteConfirmModal';
import EditRequestModal from '../EditRequestModal';

export default function RequestListTable({ filteredRequests, onUpdate, onDeleteComplete }) {
  
  // মডাল স্টেটসমূহ
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // স্ট্যাটাস কালার জেনারেটর (মঙ্গোডিবি কেস-সেন্সিটিভ সেফটিসহ)
  const getStatusStyle = (status) => {
    const currentStatus = status?.toLowerCase();
    switch (currentStatus) {
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'in progress':
      case 'inprogress': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'completed': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'rejected': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  // এডিট বাটন হ্যান্ডলার
  const openEditModal = (req) => {
    setSelectedRequest(req);
    setIsEditOpen(true);
  };

  // ডিলিট বাটন হ্যান্ডলার
  const openDeleteModal = (req) => {
    setSelectedRequest(req);
    setIsDeleteOpen(true);
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider h-12 bg-slate-50/50">
              <th className="py-3 px-6">Patient Name</th>
              <th className="py-3 px-6">Blood Group</th>
              <th className="py-3 px-6">Location</th>
              <th className="py-3 px-6">Needed Date/Time</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request._id} className="hover:bg-slate-50/40 transition-colors h-16">
                  {/* 🌟 রিয়েল ডাটা ম্যাপ করা হলো */}
                  <td className="py-3 px-6 font-bold text-slate-900">{request.patientName}</td>
                  <td className="py-3 px-6 text-rose-600 font-extrabold font-poppins">{request.bloodGroup}</td>
                  <td className="py-3 px-6 text-slate-500 max-w-[200px] truncate">
                    {request.upazila}, {request.district}
                  </td>
                  <td className="py-3 px-6 text-slate-600 font-semibold">
                    <div>{request.neededDate}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{request.neededTime || "N/A"}</div>
                  </td>
                  <td className="py-3 px-6">
                    <span className={`text-[10px] sm:text-xs font-bold border px-2.5 py-0.5 rounded-md ${getStatusStyle(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  
                  {/* 🛠️ নতুন অ্যাকশন কলাম: Edit এবং Delete বাটন */}
                  <td className="py-3 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => openEditModal(request)}
                        className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all shadow-sm"
                        title="Edit Request"
                      >
                        <FiEdit2 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(request)}
                        className="w-8 h-8 rounded-lg border border-rose-100 text-rose-600 bg-white hover:bg-rose-50 flex items-center justify-center transition-all shadow-sm"
                        title="Delete Request"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-400 font-medium">
                  No requests available for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📝 ২. এডিট মডাল পপআপ */}
      {isEditOpen && selectedRequest && (
        <EditRequestModal
          isOpen={isEditOpen}
          onClose={() => { setIsEditOpen(false); setSelectedRequest(null); }}
          requestData={selectedRequest}
          onUpdate={onUpdate}
        />
      )}

      {/* 🚨 ৩. ডিলিট কনফার্মেশন মডাল পপআপ */}
      {isDeleteOpen && selectedRequest && (
        <DeleteConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => { setIsDeleteOpen(false); setSelectedRequest(null); }}
          requestId={selectedRequest._id}
          patientName={selectedRequest.patientName}
          onDeleteComplete={onDeleteComplete}
        />
      )}
    </div>
  );
}