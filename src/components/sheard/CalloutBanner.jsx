import Link from 'next/link';

export default function CalloutBanner() {
    return (
        <section className="w-full py-8 px-6 bg-pink-100">
            <div className="max-w-7xl mx-auto">
                <div className="w-full bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg shadow-rose-600/10">
                    <div className="absolute right-1/3 top-1/2 -translate-y-1/2 opacity-10 hidden md:block select-none pointer-events-none">
                        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>

                    <div className="text-center md:text-left space-y-1 z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white font-poppins tracking-tight">
                            Every Drop Counts
                        </h2>
                        <p className="text-sm text-rose-100 font-medium font-inter">
                            Be a donor. Be a hero.
                        </p>
                    </div>

                    <div className="z-10 w-full md:w-auto">
                        <Link
                            href="/register"
                            className="block w-full md:w-auto text-center px-8 py-3.5 bg-white text-rose-600 font-bold text-sm rounded-xl hover:bg-rose-50 transition-all shadow-md shadow-black/5 font-inter"
                        >
                            Donate Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}