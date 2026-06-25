"use client";

import { useState, useEffect } from 'react';
import DonorCard from '@/components/dashboard/donor/DonorCard';
import SearchDonors from '@/components/dashboard/donor/SearchDonors';
import { getAllDonor } from '@/lib/action/get/donate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AllDonorList = () => {

    
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🌟 পেজিনেশন এবং ফিল্টার স্টেটসমূহ
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeFilters, setActiveFilters] = useState({}); // কারেন্ট ফিল্টার মনে রাখার জন্য
    const itemsPerPage = 8; // প্রতি পেজে কয়টি কার্ড দেখাবে

    // ডাটা লোড করার মেইন ফাংশন
    const fetchDonors = async (filters = {}, page = 1) => {
        setLoading(true);
        const response = await getAllDonor(filters, page, itemsPerPage);

        if (response && response.success) {
            setDonors(response.data || []);
            setTotalPages(response.pagination?.totalPages || 1);
            setCurrentPage(response.pagination?.currentPage || 1);
        } else {
            setDonors([]);
            setTotalPages(1);
        }
        setLoading(false);
    };

    // প্রথমবার পেজ লোড হলে কল হবে
    useEffect(() => {
        fetchDonors({}, 1);
    }, []);

    // ইউজার সার্চ বাটনে ক্লিক করলে
    const handleSearchSubmit = async (filters) => {
        setActiveFilters(filters); // ফিল্টারটি সেভ করে রাখা হলো
        fetchDonors(filters, 1);   // সার্চ করলে সবসময় ১ নম্বর পেজ থেকে শুরু হবে
    };

    // পেজ পরিবর্তন করার হ্যান্ডলার
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            fetchDonors(activeFilters, pageNumber); // সেভ থাকা ফিল্টার ও নতুন পেজ নম্বর দিয়ে ফেচ
            // স্ক্রল করে উপরে নিয়ে যাওয়ার জন্য (ইউজার এক্সপেরিয়েন্স ভালো করতে)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className='pb-20 font-inter px-10'>
            <div>
                <h1 className='text-2xl md:text-4xl lg:text-5xl pb-10 font-bold text-center font-poppins'>
                    All Donors
                </h1>
                <SearchDonors onSearch={handleSearchSubmit} />
            </div>

            {/* লোডিং স্টেট হ্যান্ডলার */}
            {loading ? (
                <div className="text-center py-20 font-medium text-rose-600 font-poppins animate-pulse">
                    Loading Donors from Database...
                </div>
            ) : donors.length > 0 ? (
                <>
                    {/* ডোনর কার্ড গ্রিড ভিউ */}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-4 mx-2'>
                        {donors.map((donor) => (
                            <DonorCard key={donor._id || donor.id} donor={donor} />
                        ))}
                    </div>

                    {/* 🌟 পেজিনেশন কন্ট্রোল ইউআই (Pagination UI) */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            {/* Previous Button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:border-rose-600 hover:text-rose-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all bg-white"
                            >
                                <FiChevronLeft className="h-5 w-5" />
                            </button>

                            {/* Page Numbers */}
                            {[...Array(totalPages)].map((_, idx) => {
                                const pageNum = idx + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-10 h-10 rounded-xl text-sm font-bold font-poppins transition-all ${currentPage === pageNum
                                                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/10'
                                                : 'bg-white border border-slate-200 text-slate-600 hover:border-rose-600 hover:text-rose-600'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* Next Button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:border-rose-600 hover:text-rose-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all bg-white"
                            >
                                <FiChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                /* কোনো ডোনর খুঁজে না পাওয়া গেলে */
                <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl mt-10 shadow-sm max-w-md mx-auto">
                    <p className="text-slate-400 font-medium text-sm">
                        No donors found matching your search criteria.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllDonorList;