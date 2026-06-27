import getUser from '@/lib/sheard/getUser';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {

    const user = await getUser()
    const role = user?.role
    console.log(role)

    if (role === "donor" || role === "user") {
        redirect("/dashboard/donor");
    }

    if (role === "volunteer") {
        redirect("/dashboard/volunteer");
    }

    if (role === "admin") {
        redirect("/dashboard/admin");
    }

    redirect("/login");
};

export default Dashboard;