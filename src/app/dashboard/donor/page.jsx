import DonorDashboard from '@/components/dashboard/donor/Dashboard';
import { GetRequestById } from '@/lib/action/get/request';
import { getUserSession } from '@/lib/core/getSession';

const Donor = async () => {
    const user = await getUserSession()
    const userId = user?.id
    const requestData = await GetRequestById(userId)

    // console.log(requestData)

    return (
        <div>
            <DonorDashboard requestData={requestData}/>
        </div>
    );
};

export default Donor;