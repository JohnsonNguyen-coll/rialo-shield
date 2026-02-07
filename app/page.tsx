'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, Lock, Zap, BarChart3, ChevronRight, Globe, Layers } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05010d] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-xl shadow-lg ring-1 ring-white/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Rialo Shield
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#protection" className="hover:text-white transition-colors">Protection</a>
          <a href="#liquidity" className="hover:text-white transition-colors">Liquidity</a>
        </div>
        <Link href="/dashboard" className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full border border-white/20 transition-all active:scale-95">
          <span className="text-sm font-semibold">Launch App</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
          <Zap className="w-3 h-3" />
          <span>Next-Gen FX Protection</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Protect Your Wealth from <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400">
            Currency Volatility
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The world's first decentralized FX protection protocol. Secure your digital assets against currency fluctuations with just one click. 
          Powered by RLO token.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all active:scale-95 flex items-center justify-center space-x-2">
            <span>Launch App</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-lg border border-white/10 transition-all active:scale-95">
            View Analytics
          </button>
        </div>

        {/* Floating Mockup Preview */}
        <div className="mt-24 relative max-w-5xl mx-auto group animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative rounded-3xl border border-white/10 bg-[#120a21]/80 backdrop-blur-3xl overflow-hidden shadow-2xl">
            <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500" />
            <div className="p-4 flex items-center space-x-4 border-b border-white/5">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="bg-white/5 px-4 py-1.5 rounded-lg text-xs font-mono text-white/40 flex-1 flex justify-center">
                rialoshield.app/dashboard
              </div>
            </div>
            <div className="p-8 grid grid-cols-3 gap-6 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
               <div className="h-32 rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="w-1/2 h-4 bg-white/10 rounded mb-4" />
                  <div className="w-full h-8 bg-white/5 rounded" />
               </div>
               <div className="h-32 rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="w-1/2 h-4 bg-white/10 rounded mb-4" />
                  <div className="w-full h-8 bg-white/5 rounded" />
               </div>
               <div className="h-32 rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="w-1/2 h-4 bg-white/10 rounded mb-4" />
                  <div className="w-full h-8 bg-white/5 rounded" />
               </div>
               <div className="col-span-2 h-64 rounded-2xl bg-white/5 border border-white/10 p-4" />
               <div className="h-64 rounded-2xl bg-white/5 border border-white/10 p-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 relative z-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Total Volume', value: '$254M+' },
            { label: 'Active Shields', value: '1,240' },
            { label: 'TVL Locked', value: '$84M' },
            { label: 'Network APY', value: '18.4%' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-20">
          Unparalleled <span className="text-purple-500">Protection</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Globe className="w-6 h-6" />, 
              title: "Global Coverage", 
              desc: "Protect against EUR, BRL, MXN and more with institutional-grade oracle data." 
            },
            { 
              icon: <Layers className="w-6 h-6" />, 
              title: "Smart Liquidity", 
              desc: "Automated market making for FX protection pairs using our unique RLO token ecosystem." 
            },
            { 
              icon: <Lock className="w-6 h-6" />, 
              title: "Non-Custodial", 
              desc: "You always maintain control over your funds. No intermediaries, no hidden risks." 
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-purple-600 to-indigo-700 relative overflow-hidden text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10">Ready to shield your assets?</h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto relative z-10">
            Join thousands of users who are already protecting their wealth from currency fluctuations.
          </p>
          <Link href="/dashboard" className="relative z-10 inline-flex items-center space-x-3 px-10 py-5 bg-white text-purple-700 rounded-2xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all active:scale-95">
            <span>Get Started Now</span>
            <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-white/40 text-sm font-medium">
        <p>© 2026 Rialo Shield Protocol. Built for the future of finance.</p>
      </footer>
    </div>
  )
}
