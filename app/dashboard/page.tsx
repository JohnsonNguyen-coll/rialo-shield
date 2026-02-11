'use client'

import React, { useState, useEffect } from 'react'
import { Shield, Settings, Wallet, Droplets, LayoutDashboard, Coins, Zap, RefreshCw, LogOut } from 'lucide-react'
import { useApp } from '@/lib/AppContext'
import ProtectionPanel from '../../components/ProtectionPanel'
import PositionDashboard from '../../components/PositionDashboard'
import HealthFactorCard from '../../components/HealthFactorCard'
import PriceDisplay from '../../components/PriceDisplay'
import AddLiquidity from '../../components/AddLiquidity'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Footer from '@/components/Footer'

export default function Dashboard() {
  const { isConnected, rloBalance, usdcBalance, faucet, refreshRates, address } = useApp()
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
    <main className="min-h-screen bg-[#E6E4D5] text-black selection:bg-black/10 font-sans">
      {faucetMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-black text-[#E6E4D5] px-6 py-3 rounded-xl shadow-2xl font-semibold text-sm animate-fade-in">
          {faucetMessage}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#E6E4D5]/90 backdrop-blur-md border-b border-black/10 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center transition-transform hover:scale-105">
            <img src="/favicon.jpg" alt="Logo" className="w-[140px] h-[102px] object-contain" />
          </Link>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                <div className="hidden md:flex items-center space-x-3 bg-white border border-black/10 rounded-xl px-3 py-1.5 shadow-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Balance</span>
                    <span className="text-xs font-black text-black">{rloBalance.toFixed(2)} RLO</span>
                  </div>
                  <div className="w-px h-6 bg-black/10 mx-1" />
                  <button 
                    onClick={handleFaucet}
                    className="p-1.5 bg-white border border-black/10 text-black hover:bg-black/5 rounded-lg transition-all active:scale-95 shadow-sm"
                    title="Get RLO from Faucet"
                  >
                    <Droplets className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : null}
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pb-32 relative z-10">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
             <div className="mb-8 flex items-center justify-center">
                <img src="/favicon.jpg" alt="Logo" className="w-[200px] h-[146px] object-contain" />
             </div>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Connect to RialoShield</h2>
              <p className="text-slate-600 max-w-sm mx-auto mb-10 text-base font-medium leading-relaxed">
                Secure your digital assets against currency volatility. Connect your wallet via RainbowKit to begin.
              </p>
              <div className="flex justify-center py-4">
                 <ConnectButton />
              </div>
              <p className="mt-8 text-[10px] font-medium text-slate-600 uppercase tracking-[0.3em]">Secure Mainnet Environment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Left Sidebar Col - Status */}
            <div className="lg:col-span-4 space-y-6">
              <HealthFactorCard />
              
              {/* Oracle Price Feed Card */}
               <div className="card border-black/10 bg-white shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-black flex items-center uppercase tracking-wider">
                    <RefreshCw className={`w-4 h-4 mr-2 text-black ${isRefreshing ? 'animate-spin' : ''}`} />
                    Market exchange rates
                  </h3>
                  <span className="text-[10px] font-medium text-green-500 tracking-wide bg-green-500/10 px-2 py-0.5 rounded">Live</span>
                </div>
                <div className="space-y-4">
                  <PriceDisplay currency="BRL" />
                  <PriceDisplay currency="MXN" />
                  <PriceDisplay currency="EUR" />
                </div>
                <div className="mt-6 pt-6 border-t border-black/10">
                  <p className="text-[10px] text-slate-500 font-medium text-center tracking-wide">
                    Oracle data provided by ExchangeRate-API
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-black/10 shadow-xl">
                <h4 className="font-bold text-black mb-2 uppercase tracking-wider">Need RLO?</h4>
                <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">Use our faucet to get RLO tokens for testing the protection protocol.</p>
                <button 
                  onClick={handleFaucet}
                  className="w-full py-3 bg-black text-[#E6E4D5] rounded-xl font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg"
                >
                  Claim 1,000 RLO
                </button>
              </div>
            </div>

            {/* Right Main Col - Tabs & Actions */}
            <div className="lg:col-span-8 space-y-8">
              {/* Custom Tabs */}
               <div className="flex p-1 bg-white border border-black/10 rounded-2xl w-fit shadow-lg">
                <button 
                  onClick={() => setActiveTab('position')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'position' 
                    ? 'bg-black text-[#E6E4D5] shadow-xl' 
                    : 'text-slate-400 hover:text-black'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Protection</span>
                </button>
                <button 
                  onClick={() => setActiveTab('liquidity')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'liquidity' 
                    ? 'bg-black text-[#E6E4D5] shadow-xl' 
                    : 'text-slate-400 hover:text-black'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  <span>Earn Yield</span>
                </button>
              </div>

              {activeTab === 'position' ? (
                <div className="grid grid-cols-1 gap-8 animate-fade-in">
                  <ProtectionPanel />
                  <PositionDashboard />
                </div>
              ) : (
                <div className="animate-fade-in">
                  <AddLiquidity />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}