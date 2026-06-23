import DonorCard from '@/components/dashboard/donor/DonorCard';
import SearchDonors from '@/components/dashboard/donor/SearchDonors';
import VolunteerDashboardPage from '@/components/dashboard/volunteer/VolunteerDashboardPage';
import React from 'react';

const DonorList = () => {
    return (
        <div>
            <SearchDonors />
            <div className=' m-4 lg:mx-8'>
                <DonorCard />
            </div>
        </div>
    );
};

export default DonorList;