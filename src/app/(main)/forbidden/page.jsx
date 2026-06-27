"use client";
import React from 'react';
import { ShieldX, AlertTriangle, ChevronRight, Home, LogOut, RefreshCw } from 'lucide-react';

const Forbidden = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    };

    return (
        <div className="min-h-screen bg-[#070a12] mt-20 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
            
            {/* Cinematic Background Light Matrix */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
            
            {/* Cyber Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="w-full max-w-2xl relative z-10">
                {/* Outer Glass Container */}
                <div className="bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-2xl border border-white/[0.08] rounded-[32px] p-8 sm:p-14 shadow-[0_24px_80px_rgba(0,0,0,0.50)] relative overflow-hidden group">
                    
                    {/* Decorative Edge Glow */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

                    {/* Top Security Status Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-6 mb-8 text-xs font-mono tracking-widest uppercase text-slate-500">
                        <span className="flex items-center gap-2 text-rose-500/80 font-bold">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                            Security Alert
                        </span>
                        <span>Error Code: 403 // Forbidden</span>
                    </div>

                    {/* Hero Graphic & Huge Code */}
                    <div className="relative flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                            {/* Nested Glowing Rings */}
                            <div className="absolute inset-0 bg-rose-600/20 rounded-2xl blur-xl scale-125" />
                            <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-rose-500/30 flex items-center justify-center shadow-inner">
                                <ShieldX className="w-8 h-8 text-rose-500" />
                            </div>
                        </div>

                        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-slate-400">
                            RESTRICTED
                        </h1>
                    </div>

                    {/* Explanatory Message */}
                    <div className="text-center space-y-3 max-w-lg mx-auto mb-10">
                        <h2 className="text-xl font-semibold tracking-tight text-white">
                            Inadequate Clearance Level
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed font-normal">
                            Your identity token has been processed, but your account role does not have permission to access this secure directory or resource ledger. 
                        </p>
                    </div>

                    {/* Metadata Console Terminal */}
                    <div className="bg-black/40 border border-white/[0.05] rounded-2xl p-5 mb-10 font-mono text-xs text-slate-400 space-y-2.5 shadow-inner">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="text-slate-200 font-bold uppercase block mb-1">System Exception Raised</span>
                                <span className="text-[11px] text-slate-500 leading-normal block">
                                    The request signature matched an active session, but access control vectors denied validation for this endpoint matrix.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Clean Multi-Action Cluster */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                        <button 
                            onClick={handleGoBack}
                            className="w-full sm:w-auto h-12 px-6 rounded-xl border border-white/[0.08] hover:border-white/[0.15] text-slate-300 hover:text-white font-medium text-sm transition-all bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center gap-2 group"
                        >
                            Back to Previous
                        </button>

                        <button 
                            onClick={handleRefresh}
                            className="w-full sm:w-auto h-12 px-4 rounded-xl border border-white/[0.08] hover:border-white/[0.15] text-slate-400 hover:text-white font-medium text-sm transition-all bg-transparent flex items-center justify-center"
                            title="Re-authenticate Token"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>

                        <a 
                            href="/dashboard" 
                            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 group"
                        >
                            <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
                            Return to Dashboard
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Forbidden;