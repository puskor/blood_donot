import DonorCard from '@/components/dashboard/donor/DonorCard';
import SearchDonors from '@/components/dashboard/donor/SearchDonors';
import { getAllDonor } from '@/lib/action/get/donate';

const DonorList = async() => {
    const donors = await getAllDonor()

    // console.log(donors) 

    return (
        <div>
            <div >
                <h1 className='text-2xl md:text-4xl lg:text-5xl pb-10 font-bold text-center'>All Donor</h1>

                <SearchDonors />
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4 mx-2' >
               {donors.map((donor)=> <DonorCard key={donor._id} donor={donor}/>)}

            </div>

        </div>
    );
};

export default DonorList;