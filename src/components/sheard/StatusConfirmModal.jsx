"use client"

import { statusUpdate } from "@/lib/action/update/statusUpdate";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function StatusConfirmModal({ requests, isOpen, onClose, onConfirm, currentStatus }) {
    if (!isOpen) return null;
    const { data: session } = useSession()
    const userId = session?.user?.id
    const requestId = requests._id
    const router = useRouter()
    
    // console.log(requests.status)



    const handelStatusChange = async () => {
        const status = "Completed"
        const donorId = userId
        const result = statusUpdate(requestId, donorId, status)
        onConfirm()
        onClose()
        router.refresh()

    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 max-w-sm w-full shadow-xl flex flex-col items-center text-center space-y-4">

                {/* Warning Icon */}
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                    <span className="text-xl text-amber-500">⚠️</span>
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-base font-bold text-slate-900 font-poppins">Are you sure?</h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                        Do you really want to change the status from <span className="font-bold text-slate-600">{currentStatus}</span>?
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-3 w-full pt-2">
                    {/* No Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 h-10 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors uppercase font-poppins tracking-wider"
                    >
                        No
                    </button>

                    {/* Yes Button */}
                    <button
                        type="button"
                        onClick={handelStatusChange}
                        className="flex-1 h-10 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-rose-600/10 uppercase font-poppins tracking-wider"
                    >
                        Yes
                    </button>
                </div>

            </div>
        </div>
    );
}