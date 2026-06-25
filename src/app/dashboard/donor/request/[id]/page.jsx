import RequestDetails from '@/components/dashboard/donor/RequestDetails';
import { GetRequestOne } from '@/lib/action/get/request';
import { GetUserDetailsById } from '@/lib/action/get/userDetailsById';
import Image from 'next/image';

export default async function RequestDetailsPage({ params }) {
    const { id } = await params;

    // ডাটাবেজ থেকে ডেটা লোড
    const requestData = await GetRequestOne(id);
    const requesterDetails = await GetUserDetailsById(requestData?.userId);

   

    return (
        <div>
            <RequestDetails requestData={requestData} requesterDetails={requesterDetails}/>
        </div>
    );
}