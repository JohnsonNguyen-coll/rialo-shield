'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, Lock, Zap, BarChart3, ChevronRight, Globe, Layers } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E6E4D5]/30 overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-[#1F1F1F]">
        <div className="flex items-center space-x-2">
          <div className="bg-[#E6E4D5] p-2 rounded-lg shadow-lg">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Rialo Shield
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#protection" className="hover:text-white transition-colors">Protocol</a>
          <a href="#liquidity" className="hover:text-white transition-colors">Ecosystem</a>
        </div>
        <Link href="/dashboard" className="group flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg hover:brightness-90">
          <span className="text-sm font-bold">Launch App</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-32 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-[#1F1F1F] text-slate-400 text-xs font-bold uppercase tracking-widest mb-10">
          <Zap className="w-3 h-3 text-[#E6E4D5]" />
          <span>Institutional FX Protection</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
          Secure Your Digital Wealth <br />
          <span className="text-[#E6E4D5]">Against FX Volatility</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
          The first decentralized FX protection protocol. Safeguard your stablecoin holdings from currency fluctuations with automated, collateral-backed hedging.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-[#E6E4D5] text-black rounded-2xl font-bold text-lg shadow-2xl hover:brightness-110 transition-all active:scale-95 flex items-center justify-center space-x-2">
            <span>Launch Dashboard</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <button className="w-full sm:w-auto px-10 py-5 bg-[#0A0A0A] border border-[#1F1F1F] text-white rounded-2xl font-bold text-lg hover:bg-[#1F1F1F] transition-all active:scale-95">
            View Protocol Docs
          </button>
        </div>

        {/* Floating Preview */}
        <div className="mt-24 relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-[#1F1F1F] bg-[#0A0A0A] overflow-hidden shadow-[0_0_100px_rgba(230,228,213,0.1)]">
            <div className="h-1.5 w-full bg-[#E6E4D5]" />
            <div className="p-4 flex items-center space-x-4 border-b border-[#1F1F1F] bg-[#000000]/50">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#30363D]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#30363D]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#30363D]" />
              </div>
              <div className="bg-[#000000] px-4 py-1.5 rounded-lg text-xs font-mono text-slate-500 flex-1 flex justify-center border border-[#1F1F1F]">
                app.rialoshield.io
              </div>
            </div>
            <div className="p-12 grid grid-cols-3 gap-8 opacity-60">
               <div className="h-32 rounded-2xl bg-[#000000] border border-[#1F1F1F]" />
               <div className="h-32 rounded-2xl bg-[#000000] border border-[#1F1F1F]" />
               <div className="h-32 rounded-2xl bg-[#000000] border border-[#1F1F1F]" />
               <div className="col-span-2 h-48 rounded-2xl bg-[#000000] border border-[#1F1F1F]" />
               <div className="h-48 rounded-2xl bg-[#000000] border border-[#1F1F1F]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-y border-[#1F1F1F] bg-[#0A0A0A]/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Total Volume Locked', value: '$254M+' },
            { label: 'Network Users', value: '18,400+' },
            { label: 'Hedge Positions', value: '42.5K' },
            { label: 'Yield Distributed', value: '$12.8M' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
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
            <div key={i} className="p-10 rounded-3xl bg-[#0A0A0A] border border-[#1F1F1F] hover:border-[#E6E4D5]/30 transition-all">
              <div className="w-12 h-12 bg-[#E6E4D5]/10 rounded-xl flex items-center justify-center mb-8 text-[#E6E4D5]">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-16 md:p-24 rounded-[3rem] bg-[#E6E4D5] relative overflow-hidden text-center shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-black">Hedge Your Risk Today.</h2>
          <p className="text-xl text-black/70 mb-12 max-w-xl mx-auto font-medium">
            Don't let currency volatility erode your stablecoin value. Activate your shield in seconds.
          </p>
          <Link href="/dashboard" className="inline-flex items-center space-x-3 px-10 py-5 bg-black text-[#E6E4D5] rounded-2xl font-black text-xl hover:shadow-2xl transition-all active:scale-95">
            <span>Get Started Now</span>
            <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-[#1F1F1F] text-center text-slate-500 text-xs font-semibold uppercase tracking-widest">
        <p>© 2026 Rialo Shield Protocol • All Rights Reserved</p>
      </footer>
    </div>
  )
}
