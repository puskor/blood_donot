"use client";

import { useState } from 'react';
import DashboardStats from './DashboardStats';
import RequestListTable from './RequestListTable';

export default function VolunteerDashboardPage() {
    const [requests, setRequests] = useState([
        { id: 1, recipient: "Rasel Ahmed", bloodGroup: "O+", location: "Dhaka, Dhanmondi", date: "20 May, 2024", status: "Pending" },
        { id: 2, recipient: "Nusrat Jahan", bloodGroup: "A+", location: "Chattogram, Agrabad", date: "21 May, 2024", status: "In Progress" },
        { id: 3, recipient: "Shakib Hossain", bloodGroup: "B-", location: "Sylhet, Zindabazar", date: "22 May, 2024", status: "Pending" },
    ]);

    const [activeFilter, setActiveFilter] = useState('all');

    const counts = {
        all: requests.length,
        pending: requests.filter(r => r.status === 'Pending').length,
        inProgress: requests.filter(r => r.status === 'In Progress').length,
        completed: requests.filter(r => r.status === 'Completed').length,
    };

    const filteredRequests = requests.filter(req => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'pending') return req.status === 'Pending';
        if (activeFilter === 'inProgress') return req.status === 'In Progress';
        if (activeFilter === 'completed') return req.status === 'Completed';
        return true;
    });

    return (
        <div className="w-full space-y-10">
            {/* 1st Component Call */}
            <DashboardStats
                counts={counts}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            {/* 2nd Component Call */}
            <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 font-poppins uppercase">All Donation Requests</h2>
                <RequestListTable
                    filteredRequests={filteredRequests}
                    onAccept={(id) => console.log('Accepted', id)}
                    onReject={(id) => console.log('Rejected', id)}
                />
            </div>
        </div>
    );
}