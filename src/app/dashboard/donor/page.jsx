import DonorCard from '@/components/dashboard/donor/DonorCard';
import SearchDonors from '@/components/dashboard/donor/SearchDonors';
import React from 'react';

const Donor = () => {
    return (
        <div>
            <div className='pt-10'>
                <h1 className='text-2xl md:text-4xl lg:text-5xl pb-10 font-bold text-center'>All Donor</h1>

                <SearchDonors />
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4 mx-2 md:mx-4 lg:mx-8' >
                <DonorCard />
                <DonorCard />
                <DonorCard />
                <DonorCard />
                <DonorCard />
                <DonorCard />

            </div>

        </div>
    );
};

export default Donor;