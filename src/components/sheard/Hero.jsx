import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="w-full min-h-screen bg-pink-100 mt-20 flex items-center overflow-hidden">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center py-12">

                {/* Left Side Content */}
                <div className="md:col-span-6 flex flex-col justify-center text-left space-y-6">

                    {/* Small Top Tagline */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-inter">
                            Save Lives,
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 font-inter">
                            Donate Blood
                        </span>
                    </div>

                    {/* Main Typography Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 font-poppins leading-[1.15]">
                        Be a Hero.<br />
                        Donate Blood.<br />
                        <span className="text-rose-600">Save Lives.</span>
                    </h1>

                    {/* Subtext Paragraph */}
                    <p className="text-base sm:text-lg text-slate-500 max-w-lg font-inter leading-relaxed">
                        Your single donation can save up to three lives. Join our community of lifesavers today!
                    </p>

                    {/* Action CTA Buttons */}
                    <div className="flex items-center gap-4 pt-2">
                        <Link
                            href="/register"
                            className="px-8 py-3.5 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 font-inter text-center min-w-[140px]"
                        >
                            Donate Now
                        </Link>

                        <Link
                            href="/about"
                            className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 font-semibold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all font-inter text-center min-w-[140px] shadow-sm"
                        >
                            Learn More
                        </Link>
                    </div>

                </div>

                {/* Right Side Illustration */}
                <div className="md:col-span-6 flex justify-center items-center relative">
                    {/* Decorative Background Glow */}
                    <div className="absolute w-72 h-72 bg-rose-100 rounded-full blur-3xl opacity-40 -z-10 animate-pulse" />

                    <div className="w-full max-w-[500px] h-auto relative aspect-square">
                        <Image
                            src="/image/hero_image.png" // public/hero-image.png ফোল্ডারে ইমেজটি রাখুন
                            alt="Blood Donation Illustration"
                            fill
                            priority
                            className="object-contain select-none pointer-events-none drop-shadow-sm"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}