"use client";

import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export default function DeleteConfirmModal({ isOpen, onClose, requestId, patientName, onDeleteComplete }) {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        setLoading(true);
        // এখানে আপনার ডিলিট সার্ভার অ্যাকশন কল করবেন (যেমন: await DeleteRequestFromDB(requestId))
        if (onDeleteComplete) {
            await onDeleteComplete(requestId);
        }
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 p-6 text-center space-y-4">

                {/* Warning Icon Container */}
                <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mx-auto">
                    <FiAlertTriangle className="h-6 w-6" />
                </div>

                {/* Text Area */}
                <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 font-poppins">Are you sure?</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        You are about to delete the blood request for <span className="font-bold text-slate-800">"{patientName}"</span>. This action cannot be undone.
                    </p>
                </div>

                {/* Confirm Trigger Buttons */}
                <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="w-full h-10 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="w-full h-10 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md shadow-rose-600/10 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>

            </div>
        </div>
    );
}