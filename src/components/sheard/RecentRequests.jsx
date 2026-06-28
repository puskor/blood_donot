import Link from 'next/link';
import RequestCard from './card/RequestCard';
import { GetRequest } from '@/lib/action/get/request';


export default async function RecentRequests() {
    const request = await GetRequest({}, 1, 3)
    // console.log(request.data)

    const requests = request.data ;

    return (
        <section className="w-full bg-pink-100 py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-950 font-poppins">Recent Donation Requests</h2>
                    <Link href="/request" className="text-sm font-semibold text-rose-600 hover:text-rose-700 font-inter transition-colors">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {requests.map((req) => (
                        <RequestCard key={req._id} req={req} />
                    ))}
                </div>
            </div>
        </section>
    );
}