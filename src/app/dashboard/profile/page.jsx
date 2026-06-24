import React from 'react';
import ProfilePage from './ProfilePage';
import { getUserSession } from '@/lib/core/getSession';
import { GetUserDetailsById } from '@/lib/action/get/userDetailsById';

const Profile = async() => {
    const user = await getUserSession()
    const userId = user?.id

    const userDetails = await GetUserDetailsById(userId)
    console.log(userDetails);
    
    return (
        <div>
            <ProfilePage />
        </div>
    );
};

export default Profile;