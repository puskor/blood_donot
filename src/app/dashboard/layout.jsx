import Sidebar from '@/components/dashboard/Sidebar';
import TopNavbar from '@/components/dashboard/TopNavbar';
import React from 'react';

const MainDashboard = ({ children }) => {
    return (
        <div>
            <TopNavbar />
            <div className="flex ">
                <Sidebar />
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    {children}
                </main>

            </div>
        </div>
    );
};

export default MainDashboard;