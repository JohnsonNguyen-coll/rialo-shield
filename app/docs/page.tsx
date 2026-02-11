'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft, Shield, Book, Zap, Database, Globe, Lock, Info } from 'lucide-react'
import Footer from '@/components/Footer'

export default function ProtocolDocs() {
  return (
    <div className="min-h-screen bg-[#E6E4D5] text-black selection:bg-black/10 font-sans">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <Link href="/" className="group flex items-center space-x-2 text-black/60 hover:text-black transition-colors">
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-semibold tracking-wide">Back to Home</span>
        </Link>
        <div className="flex items-center">
            <img src="/favicon.jpg" alt="Logo" className="w-[80px] h-[58px] object-contain" />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black text-[#E6E4D5] text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg">
            <Book className="w-3 h-3" />
            <span>Documentation v1.0</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Protocol Documentation</h1>
          <p className="text-xl text-black/60 leading-relaxed font-medium">
            Welcome to the Rialo Shield technical reference. Learn how we are building the future of decentralized FX protection.
          </p>
        </header>

        <div className="space-y-16">
          {/* Section: Overview */}
          <section id="introduction">
            <h2 className="text-2xl md:text-3xl font-black mb-8 flex items-center space-x-3">
              <span className="w-8 h-8 bg-black text-[#E6E4D5] rounded-lg flex items-center justify-center text-sm">01</span>
              <span>Introduction</span>
            </h2>
            <div className="prose prose-slate max-w-none space-y-6 text-black/80 font-medium">
              <p>
                Rialo Shield is a decentralized finance (DeFi) protocol designed to address one of the most significant risks in the global digital economy: <span className="font-bold text-black underline decoration-black/20">Foreign Exchange (FX) Volatility.</span>
              </p>
              <p>
                While stablecoins pegged to the US Dollar (USDC, USDT) have solved crypto volatility, they expose international users to the risk of their local currency fluctuating against the Dollar. Rialo Shield provides automated, on-chain hedging mechanisms to protect the purchasing power of global users.
              </p>
            </div>
          </section>

          {/* Section: How it Works */}
          <section id="how-it-works">
            <h2 className="text-2xl md:text-3xl font-black mb-8 flex items-center space-x-3">
              <span className="w-8 h-8 bg-black text-[#E6E4D5] rounded-lg flex items-center justify-center text-sm">02</span>
              <span>How it Works</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-sm">
                <Shield className="w-10 h-10 mb-6 text-black" />
                <h3 className="text-xl font-black mb-4">Protection Vaults</h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  Users deposit RLO into Protection Vaults. These vaults interact with our liquidity layer to create synthetic short positions against specific local currencies (BRL, EUR, MXN).
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-sm">
                <Zap className="w-10 h-10 mb-6 text-black" />
                <h3 className="text-xl font-black mb-4">Autonomous Resolution</h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  Utilizing decentralized oracle feeds, Rialo Shield automatically adjusts your protection cover based on real-time market data, ensuring your hedge remains effective.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Protocol Mechanisms */}
          <section id="mechanisms" className="p-10 md:p-12 rounded-[2.5rem] bg-black text-[#E6E4D5] shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black mb-8">Protocol Architecture</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="mt-1 bg-[#E6E4D5]/10 p-3 rounded-xl">
                    <Database className="w-6 h-6 text-[#E6E4D5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-2">Liquidity Provisioning</h4>
                    <p className="text-[#E6E4D5]/60 text-sm leading-relaxed">
                      Liquidity providers supply the capital required for hedging actions. In return, they earn a portion of the protection fees and potential yield generated by the underlying collateral.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="mt-1 bg-[#E6E4D5]/10 p-3 rounded-xl">
                    <Globe className="w-6 h-6 text-[#E6E4D5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-2">Oracle Integration</h4>
                    <p className="text-[#E6E4D5]/60 text-sm leading-relaxed">
                      Our protocol integrates with premium decentralized oracles to fetch sub-second FX rate data, preventing arbitrage and ensuring fair pricing for all users.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="mt-1 bg-[#E6E4D5]/10 p-3 rounded-xl">
                    <Lock className="w-6 h-6 text-[#E6E4D5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-2">Collateral Ratio</h4>
                    <p className="text-[#E6E4D5]/60 text-sm leading-relaxed">
                      A dynamic collateralization ratio (CR) is maintained to ensure the protocol remains solvent even during extreme market volatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[120px] rounded-full -mr-32 -mt-32" />
          </section>

          {/* Section: Risk & Safety */}
          <section id="safety">
            <h2 className="text-2xl md:text-3xl font-black mb-8 flex items-center space-x-3">
              <span className="w-8 h-8 bg-black text-[#E6E4D5] rounded-lg flex items-center justify-center text-sm">03</span>
              <span>Risk & Safety</span>
            </h2>
            <div className="bg-white/50 border border-black/10 rounded-3xl p-8 flex items-start space-x-6">
              <div className="bg-black/5 p-4 rounded-2xl">
                <Info className="w-8 h-8 text-black" />
              </div>
              <div className="prose prose-slate max-w-none text-sm text-black/70 font-medium space-y-4">
                <p>
                  DeFi involves inherent risks. While Rialo Shield is built with security as its primary focus, users should be aware of smart contract risks and market risks.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Smart contract audits are ongoing but do not guarantee complete safety.</li>
                  <li>Extreme currency devaluations may trigger liquidation events for under-collateralized positions.</li>
                  <li>Users are encouraged to maintain a healthy <span className="text-black font-bold italic underline">Health Factor</span> above 1.5.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

      </main>
      <Footer />
    </div>
  )
}
