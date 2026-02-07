'use client'

import React, { useState, useEffect } from 'react'
import { Shield, Settings, Wallet, Droplets, LayoutDashboard, Coins, Zap, RefreshCw, LogOut } from 'lucide-react'
import { useMock } from '@/lib/mockContext'
import ProtectionPanel from '@/components/ProtectionPanel'
import PositionDashboard from '@/components/PositionDashboard'
import HealthFactorCard from '@/components/HealthFactorCard'
import PriceDisplay from '@/components/PriceDisplay'
import AddLiquidity from '@/components/AddLiquidity'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Dashboard() {
  const { isConnected, rloBalance, usdcBalance, faucet, refreshRates, address } = useMock()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'position' | 'liquidity'>('position')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [faucetMessage, setFaucetMessage] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshRates()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handleFaucet = () => {
    const error = faucet()
    if (error) {
      setFaucetMessage(error)
      setTimeout(() => setFaucetMessage(null), 3000)
    } else {
      setFaucetMessage("Success! +1,000 RLO")
      setTimeout(() => setFaucetMessage(null), 3000)
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[#05010d] text-white selection:bg-purple-500/30 pb-20">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {faucetMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-black text-sm animate-fade-in">
          {faucetMessage}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#05010d]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none text-white">Rialo</h1>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 opacity-80">Shield Protocol</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                <div className="hidden md:flex items-center space-x-4 bg-white/5 border border-white/5 rounded-2xl px-4 py-2">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Your Balance</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-black text-purple-400">{rloBalance.toFixed(2)} RLO</span>
                      <span className="text-sm font-black text-green-400">{usdcBalance.toFixed(2)} USDC</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleFaucet}
                    className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-purple-400 transition-colors"
                    title="Get RLO from Faucet"
                  >
                    <Droplets className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : null}
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-12 relative z-10">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
             <div className="w-24 h-24 bg-purple-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 ring-1 ring-purple-500/20">
                <Shield className="w-12 h-12 text-purple-500" />
             </div>
             <h2 className="text-4xl font-black mb-4">Connect to RialoShield</h2>
             <p className="text-white/40 max-w-md mx-auto mb-10 font-medium">
               To start protecting your digital assets or providing liquidity, please connect your wallet via RainbowKit.
             </p>
             <div className="flex justify-center scale-150 py-4">
                <ConnectButton />
             </div>
             <p className="mt-8 text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Persistent Mock Environment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Left Column (Main Tab Content) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between mb-2">
                <nav className="flex space-x-2 bg-white/5 p-1.5 rounded-[1.5rem] border border-white/5">
                  <button
                    onClick={() => setActiveTab('position')}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
                      activeTab === 'position' 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-950' 
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Protection</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('liquidity')}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
                      activeTab === 'liquidity' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950' 
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                    <span>Liquidity</span>
                  </button>
                </nav>

                <button 
                  onClick={handleRefresh}
                  className={`p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                >
                  <RefreshCw className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {activeTab === 'position' ? (
                <>
                  <ProtectionPanel />
                  <PositionDashboard />
                </>
              ) : (
                <AddLiquidity />
              )}
            </div>

            {/* Right Column (Side Panels) */}
            <div className="lg:col-span-4 space-y-8">
              <HealthFactorCard />

              <div className="card bg-white/[0.03] border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Market Rates
                  </h3>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">Live</span>
                </div>
                <div className="space-y-4">
                  <PriceDisplay currency="BRL" />
                  <PriceDisplay currency="MXN" />
                  <PriceDisplay currency="EUR" />
                </div>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-[10px] text-white/30 font-medium text-center uppercase tracking-widest">
                    Oracle Data provided by ExchangeRate-API
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-white/5">
                <h4 className="font-black text-white mb-2">Need RLO?</h4>
                <p className="text-xs text-white/60 font-medium mb-6">Use our faucet to get mock RLO tokens for testing the protection protocol.</p>
                <button 
                  onClick={faucet}
                  className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Claim 100 RLO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-20 py-8 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
        Rialo Shield • Powered by RLO • Mock Environment
      </footer>
    </main>
  )
}