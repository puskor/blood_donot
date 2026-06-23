import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';


const RequestCard = ({ req }) => {
    // console.log(req)
    return (
        <div key={req.id} className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <span className="text-4xl font-black text-rose-600 font-poppins tracking-tight">
                    {req.bloodGroup}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full font-inter ${req.status === 'Urgent Need'
                    ? 'bg-rose-50 text-rose-600 border border-rose-100'
                    : 'bg-green-50 text-green-700 border border-green-100'
                    }`}>
                    {req.status}
                </span>
            </div>

            <div className="mt-4 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900 font-poppins">{req.name}</h3>
                <div className="space-y-1.5 text-xs text-slate-500 font-inter">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{req.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{req.date}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <Link
                    href={`/dashboard/donor/request/${req.id}`}
                    className="block w-full text-center py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all font-inter"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RequestCard;