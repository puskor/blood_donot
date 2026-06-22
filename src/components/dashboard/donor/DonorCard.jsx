import Image from 'next/image';
import Link from 'next/link';

export default function DonorCard({ donor }) {
    // Configured default fallback values if props ecosystem object block metrics values missing
    const {
        id = 1,
        name = "Tanvir Ahmed",
        bloodGroup = "A+",
        location = "Dhaka, Dhanmondi",
        avatar = "/donor-placeholder.jpg"
    } = donor || {};

    return (
        <div className="bg-white rounded-2xl border max-w-[600px] border-slate-100 p-6 flex flex-col items-center relative shadow-sm hover:shadow-md transition-shadow font-inter">

            {/* Badge Frame Group Indicator Context */}
            <div className="absolute top-6 right-6">
                <span className="text-xl font-extrabold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-xl font-poppins">
                    {bloodGroup}
                </span>
            </div>

            {/* Avatar Dynamic Box View Container Frame */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-50 relative mt-2 shadow-inner">
                <Image
                    src={avatar}
                    alt={`${name}'s avatar profile configuration`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Profile Metrics Label Info Context Grid Area */}
            <div className="text-center mt-5 space-y-1 w-full px-2">
                <h3 className="text-base font-bold text-slate-900 font-poppins tracking-tight truncate">
                    {name}
                </h3>
                <p className="text-xs text-slate-400 font-medium font-inter truncate">
                    {location}
                </p>
            </div>

            {/* Router Link Handler Controller Target Trigger CTA Link */}
            <div className="w-full mt-6">
                <Link
                    href={`/dashboard/donor/donor_list/${id}`}
                    className="block w-full text-center py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all font-inter shadow-sm"
                >
                    View Profile
                </Link>
            </div>

        </div>
    );
}