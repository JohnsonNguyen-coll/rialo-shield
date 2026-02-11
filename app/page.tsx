'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, Lock, Zap, BarChart3, ChevronRight, Globe, Layers } from 'lucide-react'
import Footer from '@/components/Footer'

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
      <section className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
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

        {/* Realistic Dashboard Floating Preview */}
        <div className="mt-24 relative max-w-6xl mx-auto px-4 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-black/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          
          {/* Scaling Wrapper */}
          <div className="transform origin-top scale-[0.85] mb-[-100px]">
            <div className="relative rounded-[3rem] border border-black/10 bg-white shadow-[0_32px_128px_-32px_rgba(0,0,0,0.15)] overflow-hidden">
              {/* Browser Header */}
              <div className="h-14 flex items-center px-8 border-b border-black/5 bg-slate-50/50 backdrop-blur-md">
                <div className="flex space-x-2 mr-10">
                  <div className="w-3 h-3 rounded-full bg-black/10" />
                  <div className="w-3 h-3 rounded-full bg-black/10" />
                  <div className="w-3 h-3 rounded-full bg-black/10" />
                </div>
                <div className="bg-white/80 border border-black/5 px-8 py-2 rounded-full text-[10px] font-mono text-black/40 flex-1 flex justify-center items-center space-x-3">
                  <Lock className="w-3 h-3" />
                  <span>rialoshield.netlify.app</span>
                </div>
              </div>

              <div className="flex h-[680px] bg-[#E6E4D5]/20">
                {/* Left Sidebar Content */}
                <div className="w-[320px] p-6 space-y-6 border-r border-black/5">
                  {/* Health Factor Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center space-x-2">
                         <Zap className="w-4 h-4 text-black/40" />
                         <span className="text-[10px] font-black uppercase tracking-wider text-black">Health Factor</span>
                      </div>
                      <Shield className="w-4 h-4 text-black/10" />
                    </div>
                    <div className="text-center py-4">
                      <div className="text-6xl font-black text-[#22C55E] tracking-tighter">5.00</div>
                      <div className="mt-3">
                        <span className="text-[9px] bg-[#22C55E]/10 text-[#22C55E] px-4 py-1 rounded-full font-black uppercase">Secure</span>
                      </div>
                    </div>
                    <div className="mt-8 space-y-2">
                      <div className="flex justify-between text-[9px] font-black uppercase text-black/40">
                        <span>Liquidation threshold</span>
                        <span>1.05</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#22C55E] w-full rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Market Rates Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5">
                    <div className="flex items-center justify-between mb-6">
                       <span className="text-[10px] font-black uppercase tracking-wider text-black">Market Exchange Rates</span>
                       <span className="text-[8px] bg-[#22C55E]/10 text-[#22C55E] px-2 py-0.5 rounded-md font-black">LIVE</span>
                    </div>
                    <div className="space-y-5">
                      {[
                        { icon: 'B', name: 'BRL', rate: '$0.1901', trend: 'UP', color: 'text-[#22C55E]' },
                        { icon: 'M', name: 'MXN', rate: '$0.0578', trend: 'DOWN', color: 'text-red-500' },
                        { icon: 'E', name: 'EUR', rate: '$1.1806', trend: 'UP', color: 'text-[#22C55E]' }
                      ].map((m, i) => (
                        <div key={i} className="flex items-center justify-between group/row">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-black text-[#E6E4D5] text-xs flex items-center justify-center rounded-xl font-black">{m.icon}</div>
                            <div>
                              <div className="text-xs font-black">{m.name}</div>
                              <div className="text-[8px] font-bold text-black/30">USD ORACLE</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs font-black`}>{m.rate}</div>
                            <div className={`text-[8px] font-black ${m.color}`}>↑ {m.trend}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main App Content */}
                <div className="flex-1 p-8">
                  <div className="flex space-x-3 mb-8">
                    <div className="bg-black text-[#E6E4D5] px-6 py-2.5 rounded-2xl text-[11px] font-black flex items-center space-x-2">
                       <Shield className="w-3.5 h-3.5" />
                       <span>My Protection</span>
                    </div>
                    <div className="bg-white text-black/40 px-6 py-2.5 rounded-2xl text-[11px] font-black border border-black/5">Earn Yield</div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-xl p-10 mb-8 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8">
                        <div className="bg-black text-[#E6E4D5] px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest leading-none">Active protocol</div>
                     </div>
                     
                     <div className="mb-10">
                        <h4 className="text-xl font-black uppercase tracking-tight mb-2">Shield Configuration</h4>
                        <p className="text-sm text-black/30 font-medium">Configure your collateral-backed protection</p>
                     </div>

                     <div className="space-y-10">
                        <div>
                          <label className="text-[10px] font-black uppercase text-black/40 tracking-widest block mb-4">Target Currency</label>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-black rounded-2xl p-6 text-center shadow-lg transform transition-transform group-hover:scale-[1.02]">
                              <div className="text-lg font-black text-[#E6E4D5]">BRL</div>
                              <div className="text-[9px] font-black text-[#E6E4D5]/40 tracking-widest">HEDGE</div>
                            </div>
                            <div className="bg-[#E6E4D5]/20 rounded-2xl p-6 text-center opacity-40">
                              <div className="text-lg font-black text-black">MXN</div>
                              <div className="text-[9px] font-black text-black/40 tracking-widest">HEDGE</div>
                            </div>
                            <div className="bg-[#E6E4D5]/20 rounded-2xl p-6 text-center opacity-40">
                              <div className="text-lg font-black text-black">EUR</div>
                              <div className="text-[9px] font-black text-black/40 tracking-widest">HEDGE</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          <div className="bg-slate-50/50 rounded-3xl p-8 border border-black/5 flex flex-col items-center justify-center text-center">
                             <div className="text-[10px] font-black text-black/30 mb-2 uppercase tracking-widest uppercase">Collateral Amount</div>
                             <div className="text-5xl font-black text-black/10">0.00</div>
                          </div>
                          
                          <div className="w-full bg-[#000000]/20 h-16 rounded-[1.5rem] flex items-center justify-center text-white/50 text-sm font-black uppercase tracking-[0.2em] border border-white/10">
                             Enable Protection
                          </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white/40 rounded-[2rem] border border-black/5 p-8 flex items-center justify-between">
                     <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase text-black/40 tracking-widest">Active Positions</div>
                        <div className="text-xs font-black">Real-time protection status</div>
                     </div>
                     <div className="flex-1 max-w-[200px] h-10 px-6">
                        <svg className="w-full h-full opacity-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                           <path d="M0 15 Q 25 5, 50 15 T 100 5" fill="none" stroke="black" strokeWidth="2" />
                        </svg>
                     </div>
                  </div>
                </div>
              </div>
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

      <Footer />
    </div>
  )
}
