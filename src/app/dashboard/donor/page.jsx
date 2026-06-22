import DonorCard from '@/components/dashboard/donor/DonorCard';
import SearchDonors from '@/components/dashboard/donor/SearchDonors';
import React from 'react';

const Donor = () => {
    return (
        <div>
            <div >
                <h1 className='text-xl md:text-xl lg:text-3xl pb-5 font-bold text-center'>All Donor</h1>

                <SearchDonors />
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4 mx-2' >
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