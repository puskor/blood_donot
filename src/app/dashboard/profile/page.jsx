import ProfileDetails from '@/components/dashboard/ProfileDetails';
import getUser from '@/lib/sheard/getUser';
import React from 'react';

const Profile = async () => {
    const user = await getUser()
    return (
        <div>
            <ProfileDetails user={user} />
        </div>
    );
};

export default Profile;