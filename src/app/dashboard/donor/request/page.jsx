import SearchDonors from '@/components/dashboard/donor/SearchDonors';
import RequestCard from '@/components/sheard/card/RequestCard';
import { GetRequest } from '@/lib/action/get/request';
import Link from 'next/link';
import React from 'react';

const DonorRequest =async () => {

    const requests =await GetRequest()

    // console.log(requests)

    return (
        <section className="w-full bg-pink-100 pb-20  px-6">
            <h1 className='py-7 text-center font-bold text-3xl'>REQUEST</h1>
            <div className="max-w-7xl mx-auto space-y-10">
                <SearchDonors />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {requests.map((req) => (
                        <RequestCard key={req._id} req={req} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DonorRequest;