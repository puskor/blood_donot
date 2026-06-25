"use client";

import { useState, useEffect } from 'react';
import SearchDonors from '@/components/dashboard/donor/SearchDonors';
import RequestCard from '@/components/sheard/card/RequestCard';
import { GetRequest } from '@/lib/action/get/request';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DonorRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // পেজিনেশন এবং ফিল্টার স্টেটসমূহ
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeFilters, setActiveFilters] = useState({});
    const itemsPerPage = 9; // ৩ কলাম গ্রিডের জন্য ৯টি কার্ড পারফেক্ট

    // ডাটা লোড করার মেইন ফাংশন
    const fetchRequests = async (filters = {}, page = 1) => {
        setLoading(true);
        const response = await GetRequest(filters, page, itemsPerPage);

        if (response && response.success) {
            setRequests(response.data || []);
            setTotalPages(response.pagination?.totalPages || 1);
            setCurrentPage(response.pagination?.currentPage || 1);
        } else {
            setRequests([]);
            setTotalPages(1);
        }
        setLoading(false);
    };

    // প্রথমবার পেজ লোড হলে কল হবে
    useEffect(() => {
        fetchRequests({}, 1);
    }, []);

    // ইউজার সার্চ বাটনে ক্লিক করলে
    const handleSearchSubmit = async (filters) => {
        setActiveFilters(filters);
        fetchRequests(filters, 1); // নতুন সার্চে সবসময় ১ নম্বর পেজ থেকে শুরু হবে
    };

    // পেজ পরিবর্তন করার হ্যান্ডলার
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            fetchRequests(activeFilters, pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-pink-100/40 pb-20 px-4 sm:px-6 font-inter">
            <h1 className='py-10 text-center font-bold text-3xl md:text-4xl text-slate-800 font-poppins'>
                BLOOD REQUESTS
            </h1>
            <div className="max-w-7xl mx-auto space-y-10">

                {/* সার্চ ফিল্টার */}
                <SearchDonors onSearch={handleSearchSubmit} />

                {/* লোডিং ও ডাটা রেন্ডারিং কন্ডিশন */}
                {loading ? (
                    <div className="text-center py-20 font-medium text-rose-600 font-poppins animate-pulse">
                        Loading Requests from Database...
                    </div>
                ) : requests.length > 0 ? (
                    <>
                        {/* রিকোয়েস্ট কার্ড গ্রিড */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {requests.map((req) => (
                                <RequestCard key={req._id || req.id} req={req} />
                            ))}
                        </div>

                        {/* পেজিনেশন বাটনসমূহ */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-8">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 bg-white hover:border-rose-600 hover:text-rose-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
                                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 bg-white hover:border-rose-600 hover:text-rose-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    <FiChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* কোনো রিকোয়েস্ট না থাকলে */
                    <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm max-w-md mx-auto">
                        <p className="text-slate-400 font-medium text-sm">
                            No active blood requests found matching the filters.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DonorRequest;