import DonorCard from '@/components/dashboard/donor/DonorCard';
import SearchDonors from '@/components/dashboard/donor/SearchDonors';
import React from 'react';

const Donor = () => {
    return (
        <div>
            <SearchDonors/>
            <DonorCard/>
        </div>
    );
};

export default Donor;