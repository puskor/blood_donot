import RequestDetails from '@/components/dashboard/donor/RequestDetails';
import { GetRequestOne } from '@/lib/action/get/request';
import { GetUserDetailsById } from '@/lib/action/get/userDetailsById';
import Image from 'next/image';

export default async function RequestDetailsPage({ params }) {
    const { id } = await params;

    // ডাটাবেজ থেকে ডেটা লোড
    const requestData = await GetRequestOne(id);
    const requesterDetails = await GetUserDetailsById(requestData?.userId);

    // ডেট ফরম্যাটিং ফাংশন (যেমন: 20 June, 2026)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            return date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    const userAvatar = requesterDetails?.image || "/donor-placeholder.jpg";

    return (
        <div>
            <RequestDetails requestData={requestData} requesterDetails={requesterDetails}/>
        </div>
    );
}