'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, Lock, Zap, BarChart3, ChevronRight, Globe, Layers } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#E6E4D5] text-black selection:bg-black/10 overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-2 max-w-7xl mx-auto border-b border-black/10">
          <Link href="/" className="flex items-center transition-transform hover:scale-105">
            <img src="/favicon.jpg" alt="Logo" className="w-[140px] h-[102px] object-contain" />
          </Link>
        <div className="hidden md:flex items-center space-x-10 text-base font-medium tracking-wide text-black/60">
          <a href="#features" className="hover:text-black transition-colors">Features</a>
          <a href="#protection" className="hover:text-black transition-colors">Protocol</a>
          <a href="#liquidity" className="hover:text-black transition-colors">Ecosystem</a>
        </div>
        <Link href="/dashboard" className="group flex items-center space-x-2 bg-black text-[#E6E4D5] px-5 py-2.5 rounded-xl transition-all active:scale-95 hover:brightness-110">
          <span className="text-sm font-semibold tracking-wide">Launch App</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-32 px-6 max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-12">
          <img src="/favicon.jpg" alt="Logo" className="w-[280px] h-[204px] object-contain" />
        </div>
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-slate-600 text-xs font-semibold tracking-widest mb-10">
          <Zap className="w-3 h-3 text-black" />
          <span>Institutional FX Protection</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
          Secure Your Digital Wealth <br />
          <span className="text-black/60">Against FX Volatility</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
          The first decentralized FX protection protocol. Safeguard your stablecoin holdings from currency fluctuations with automated, collateral-backed hedging.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-black text-[#E6E4D5] rounded-2xl font-bold text-lg shadow-2xl hover:brightness-110 transition-all active:scale-95 flex items-center justify-center space-x-2">
            <span>Launch Dashboard</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link href="/docs" className="w-full sm:w-auto px-10 py-5 bg-transparent border border-black text-black rounded-2xl font-bold text-lg hover:bg-black/5 transition-all active:scale-95 flex items-center justify-center">
            View Protocol Docs
          </Link>
        </div>

        {/* Floating Preview */}
        <div className="mt-24 relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-black/10 bg-white overflow-hidden shadow-2xl">
            <div className="h-1.5 w-full bg-black" />
            <div className="p-4 flex items-center space-x-4 border-b border-black/10 bg-white/50">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              </div>
              <div className="bg-white px-4 py-1.5 rounded-lg text-xs font-mono text-slate-400 flex-1 flex justify-center border border-black/10">
                app.rialoshield.io
              </div>
            </div>
            <div className="p-12 grid grid-cols-3 gap-8 opacity-20">
               <div className="h-32 rounded-2xl bg-slate-100 border border-black/5" />
               <div className="h-32 rounded-2xl bg-slate-100 border border-black/5" />
               <div className="h-32 rounded-2xl bg-slate-100 border border-black/5" />
               <div className="col-span-2 h-48 rounded-2xl bg-slate-100 border border-black/5" />
               <div className="h-48 rounded-2xl bg-slate-100 border border-black/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-y border-black/10 bg-white/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Total Volume Locked', value: '$254M+' },
            { label: 'Network Users', value: '18,400+' },
            { label: 'Hedge Positions', value: '42.5K' },
            { label: 'Yield Distributed', value: '$12.8M' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black mb-2 text-black">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-black text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for Security</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Built on fundamental economic principles to provide sustainable FX hedging for everyone.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Globe className="w-6 h-6" />, 
              title: "Market Access", 
              desc: "Direct access to BRL, MXN, and EUR protection markers with decentralized oracle feeds." 
            },
            { 
              icon: <Layers className="w-6 h-6" />, 
              title: "Capital Efficiency", 
              desc: "Optimized collateral management ensures maximum protection with minimal capital lock-up." 
            },
            { 
              icon: <Lock className="w-6 h-6" />, 
              title: "Secured by Design", 
              desc: "Non-custodial and transparent. Every position is verified on-chain to ensure system integrity." 
            }
          ].map((feature, i) => (
            <div key={i} className="p-10 rounded-3xl bg-white border border-black/10 hover:border-black/30 transition-all shadow-sm">
              <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center mb-8 text-black">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-16 md:p-24 rounded-[3rem] bg-black relative overflow-hidden text-center shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-[#E6E4D5]">Hedge Your Risk Today.</h2>
          <p className="text-xl text-[#E6E4D5]/70 mb-12 max-w-xl mx-auto font-medium">
            Don't let currency volatility erode your stablecoin value. Activate your shield in seconds.
          </p>
          <Link href="/dashboard" className="inline-flex items-center space-x-3 px-10 py-5 bg-[#E6E4D5] text-black rounded-2xl font-black text-xl hover:shadow-2xl transition-all active:scale-95">
            <span>Get Started Now</span>
            <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-black/10 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
        <p>© 2026 Rialo Shield Protocol • All Rights Reserved</p>
      </footer>
    </div>
  )
}
