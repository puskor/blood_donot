import { headers } from 'next/headers';
import React from 'react';
import { auth } from '../auth';

const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user
    return user ;
};

export default getUser;