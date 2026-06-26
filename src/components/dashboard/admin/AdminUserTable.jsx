"use client";
import Image from 'next/image';
import { FiEdit, FiTrash2, FiRefreshCw } from 'react-icons/fi';

export default function AdminUserTable({ users, onToggleRole, onEdit, onDelete }) {
    return (
        <div className="rounded-xl border border-slate-100 bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm md:mx-10">
                <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold uppercase h-12 border-b border-slate-100">
                        <th className="px-6 py-3">User Details</th>
                        <th className="px-6 py-3">Current Role</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="h-16 hover:bg-slate-50/40 transition-colors">
                                
                                {/* 🌟 কলাম ১: প্রথমে ইমেজ সহ নেম এবং ইমেইল */}
                                <td className=" py-3">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-rose-100 flex items-center justify-center text-rose-600 font-bold border border-rose-200">
                                            {user.image ? (
                                                <Image 
                                                    src={user.image} 
                                                    alt={user.name || "User"} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span>{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{user.name}</div>
                                            <div className="text-xs text-slate-400 font-normal">{user.email}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* কলাম ২: রোল ব্যাজ */}
                                <td className="px-6 py-3">
                                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase border ${
                                        user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                        user.role === 'volunteer' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                        'bg-amber-50 text-amber-600 border-amber-100'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>

                     
                                {/* কলাম ৫: অ্যাকশনস বাটন */}
                                <td className="px-6 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="p-2 border rounded-lg text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                            title="Edit User"
                                        >
                                            <FiEdit className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id, user.name)}
                                            className="p-2 border border-rose-100 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                            title="Delete User"
                                        >
                                            <FiTrash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-10 text-slate-400 font-medium">
                                No users found in the database.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}