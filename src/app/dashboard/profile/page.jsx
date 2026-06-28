import React from 'react';
import ProfilePage from './ProfilePage';
import { getUserSession } from '@/lib/core/getSession';
import { GetUserDetailsById } from '@/lib/action/get/userDetailsById';

const Profile = async() => {
    const user = await getUserSession()
    const userId = user?.id
    const userRole = user?.role

    const userDetails = await GetUserDetailsById(userId)
    // console.log(userRole);
    
    return (
        <div>
            <ProfilePage userDetails={userDetails} userRole={userRole}/>
        </div>
    );
};

export default Profile;