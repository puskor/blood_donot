import React from 'react';

export default function PremiumLoader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6 bg-slate-100 p-8 rounded-2xl">
            {/* Outer Glow Container */}
            <div className="relative flex  justify-center w-24 h-24">

                {/* Layer 1: Ambient Outer Glow (Blurred) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 opacity-30 blur-xl animate-pulse"></div>

                {/* Layer 2: Fast Outer Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-indigo-500 animate-spin" style={{ animationDuration: '0.8s' }}></div>

                {/* Layer 3: Slow Inner Ring (Reverse Direction) */}
                <div className="absolute inset-2 rounded-full border border-transparent border-b-purple-500 border-l-pink-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>

                {/* Layer 4: Center Core Pulse */}
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(34,211,238,0.7)] animate-ping"></div>
            </div>


        </div>
    );
}