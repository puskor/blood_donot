"use client";

import FundingHistoryTable from "@/components/dashboard/FundingHistoryTable";
import TotalFundCard from "@/components/dashboard/TotalFundCard";

// import TotalFundCard from './TotalFundCard';
// import FundingHistoryTable from './FundingHistoryTable';

export default function FundingPage() {
    const handleGiveFundClick = () => {
        console.log("Trigger payment gateway context framework...");
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 font-inter">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins tracking-tight">Funding</h1>
                <p className="text-xs text-slate-400 mt-1 font-medium">Home / Funding</p>
            </div>

            {/* 1st Component View */}
            <TotalFundCard totalAmount="12,450.00" onGiveFund={handleGiveFundClick} />

            {/* 2nd Component View */}
            <FundingHistoryTable />
        </div>
    );
}