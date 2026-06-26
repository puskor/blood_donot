"use client";

export default function TotalFundCard({ totalAmount , onGiveFund }) {
    return (
        <div className="w-full bg-gradient-to-r from-rose-600 to-rose-500 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden items-center gap-4 font-inter">

            {/* Decorative Vector Heart Background Shape */}
            <div className="absolute right-1/4 bottom-0 opacity-10 pointer-events-none hidden md:block">
                <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </div>

            <div className="space-y-1">
                <span className="text-xs sm:text-sm font-bold tracking-wide text-rose-100 uppercase opacity-90">
                    Total Fund
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-poppins tracking-tight">
                    ${totalAmount}
                </h2>
            </div>

            {/* <button
                type="button"
                onClick={onGiveFund}
                className="bg-white hover:bg-rose-50 text-rose-600 font-extrabold text-xs sm:text-sm px-6 h-11 rounded-xl shadow-md active:scale-[0.98] transition-all font-poppins tracking-wide shrink-0"
            >
                Give Fund
            </button> */}

        </div>
    );
}