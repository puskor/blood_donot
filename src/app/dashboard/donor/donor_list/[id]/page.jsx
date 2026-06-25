
import ProfileDetails from '@/components/dashboard/ProfileDetails';
import { GetUserDetailsById } from '@/lib/action/get/userDetailsById';

export default async function DonarDetails({params}) {
    const {id} = await params
    // UI ডিজাইন অনুযায়ী স্ট্যাটিক ডাটা অবজেক্ট
    const getUserDetails = await GetUserDetailsById(id)
    return (
        <div>
            <ProfileDetails donor={getUserDetails}/>
        </div>
    );
}