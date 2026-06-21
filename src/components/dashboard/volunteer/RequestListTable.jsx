"use client";

import { FiCheck, FiX } from 'react-icons/fi';

export default function RequestListTable({ filteredRequests, onAccept, onReject }) {
  
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Completed': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Rejected': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider h-12 bg-slate-50/50">
              <th className="py-3 px-6">Recipient</th>
              <th className="py-3 px-6">Blood Group</th>
              <th className="py-3 px-6">Location</th>
              <th className="py-3 px-6">Needed Date</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-50/40 transition-colors h-16">
                  <td className="py-3 px-6 font-bold text-slate-900">{request.recipient}</td>
                  <td className="py-3 px-6 text-rose-600 font-extrabold font-poppins">{request.bloodGroup}</td>
                  <td className="py-3 px-6 text-slate-500">{request.location}</td>
                  <td className="py-3 px-6 text-slate-600 font-semibold">{request.date}</td>
                  <td className="py-3 px-6">
                    <span className={`text-[10px] sm:text-xs font-bold border px-2.5 py-0.5 rounded-md ${getStatusStyle(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  
                  {/* Action Column Box with Accept/Reject Buttons */}
                  <td className="py-3 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onAccept(request.id)}
                        disabled={request.status !== 'Pending'}
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                          request.status === 'Pending'
                            ? 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300'
                            : 'border-slate-100 text-slate-300 bg-slate-50/50 cursor-not-allowed'
                        }`}
                        title="Accept Request"
                      >
                        <FiCheck className="h-4 w-4 stroke-[2.5]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onReject(request.id)}
                        disabled={request.status !== 'Pending'}
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                          request.status === 'Pending'
                            ? 'border-rose-100 text-rose-600 bg-white hover:bg-rose-50/60'
                            : 'border-slate-100 text-slate-300 bg-slate-50/50 cursor-not-allowed'
                        }`}
                        title="Reject Request"
                      >
                        <FiX className="h-4 w-4 stroke-[2.5]" />
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
    </div>
  );
}