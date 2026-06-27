"use client";
import React from 'react';
import { Lock, LogIn, ChevronRight, Home, RefreshCw, HelpCircle } from 'lucide-react';

const Unauthorized = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen mt-20 bg-[#070a12] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
            
            {/* Cinematic Background Light Matrix */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
            
            {/* Cyber Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="w-full max-w-2xl relative z-10">
                {/* Outer Glass Container */}
                <div className="bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-2xl border border-white/[0.08] rounded-[32px] p-8 sm:p-14 shadow-[0_24px_80px_rgba(0,0,0,0.50)] relative overflow-hidden group">
                    
                    {/* Decorative Edge Glow */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

                    {/* Top Security Status Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-6 mb-8 text-xs font-mono tracking-widest uppercase text-slate-500">
                        <span className="flex items-center gap-2 text-amber-500/80 font-bold">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                            Authentication Required
                        </span>
                        <span>Error Code: 401 // Unauthorized</span>
                    </div>

                    {/* Hero Graphic & Huge Code */}
                    <div className="relative flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                            {/* Nested Glowing Rings */}
                            <div className="absolute inset-0 bg-amber-600/20 rounded-2xl blur-xl scale-125" />
                            <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center justify-center shadow-inner">
                                <Lock className="w-7 h-7 text-amber-500" />
                            </div>
                        </div>

                        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-slate-400">
                            UNVERIFIED
                        </h1>
                    </div>

                    {/* Explanatory Message */}
                    <div className="text-center space-y-3 max-w-lg mx-auto mb-10">
                        <h2 className="text-xl font-semibold tracking-tight text-white">
                            Session Token Missing or Expired
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed font-normal">
                            We could not verify your identity. Access to this domain matrix requires a valid security token handshake. Please sign in to verify your credentials.
                        </p>
                    </div>

                    {/* Metadata Console Terminal */}
                    <div className="bg-black/40 border border-white/[0.05] rounded-2xl p-5 mb-10 font-mono text-xs text-slate-400 space-y-2.5 shadow-inner">
                        <div className="flex items-start gap-3">
                            <HelpCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="text-slate-200 font-bold uppercase block mb-1">Handshake Diagnostics</span>
                                <span className="text-[11px] text-slate-500 leading-normal block">
                                    HTTP header attribute 'Authorization' is empty, null, or corrupted. Re-authenticating via the secure gateway route is recommended.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Clean Multi-Action Cluster */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                        <a 
                            href="/dashboard" 
                            className="w-full sm:w-auto h-12 px-6 rounded-xl border border-white/[0.08] hover:border-white/[0.15] text-slate-300 hover:text-white font-medium text-sm transition-all bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center gap-2 template-btn"
                        >
                            <Home className="w-4 h-4" />
                            Return Home
                        </a>

                        <button 
                            onClick={handleRefresh}
                            className="w-full sm:w-auto h-12 px-4 rounded-xl border border-white/[0.08] hover:border-white/[0.15] text-slate-400 hover:text-white font-medium text-sm transition-all bg-transparent flex items-center justify-center"
                            title="Retry Secure Socket Handshake"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>

                        <a 
                            href="/login" 
                            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-500 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 group"
                        >
                            <LogIn className="w-4 h-4 transition-transform group-hover:scale-110" />
                            Secure Sign In
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Unauthorized;