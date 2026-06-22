import UserProfile from '@/components/dashboard/UserProfile';
import getUser from '@/lib/sheard/getUser';
import React from 'react';

const Profile = async () => {
    const user = await getUser()
    return (
        <div>
            <UserProfile user={user} />
        </div>
    );
};

export default Profile;