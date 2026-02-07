'use client'

import React, { useState, useEffect } from 'react'
import { Shield, Settings, Wallet, Droplets, LayoutDashboard, Coins, Zap, RefreshCw, LogOut } from 'lucide-react'
import { useApp } from '@/lib/AppContext'
import ProtectionPanel from '@/components/ProtectionPanel'
import PositionDashboard from '@/components/PositionDashboard'
import HealthFactorCard from '@/components/HealthFactorCard'
import PriceDisplay from '@/components/PriceDisplay'
import AddLiquidity from '@/components/AddLiquidity'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

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
    <main className="min-h-screen bg-black text-white selection:bg-[#E6E4D5]/30 pb-20 font-sans">
      {faucetMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-[#E6E4D5] text-black px-6 py-3 rounded-xl shadow-2xl font-bold text-sm animate-fade-in">
          {faucetMessage}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#1F1F1F] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-[#E6E4D5] p-2 rounded-lg shadow-lg">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-none text-white">Rialo</h1>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3]">Shield Protocol</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <>
                <div className="hidden md:flex items-center space-x-4 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-2">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Your Balance</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-[#E6E4D5]">{rloBalance.toFixed(2)} RLO</span>
                      <span className="text-sm font-bold text-green-400">{usdcBalance.toFixed(2)} USDC</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleFaucet}
                    className="p-2 bg-[#E6E4D5]/10 hover:bg-[#E6E4D5]/20 rounded-lg text-[#E6E4D5] transition-colors"
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
             <div className="w-20 h-20 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <Shield className="w-10 h-10 text-[#E6E4D5]" />
             </div>
             <h2 className="text-3xl font-bold mb-4">Connect to RialoShield</h2>
             <p className="text-slate-400 max-w-sm mx-auto mb-10 text-base leading-relaxed">
               Secure your digital assets against currency volatility. Connect your wallet via RainbowKit to begin.
             </p>
             <div className="flex justify-center py-4">
                <ConnectButton />
             </div>
             <p className="mt-8 text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Secure Mainnet Environment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Left Sidebar Col - Status */}
            <div className="lg:col-span-4 space-y-6">
              <HealthFactorCard />
              
              {/* Oracle Price Feed Card */}
               <div className="card border-[#1F1F1F] bg-[#0A0A0A]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-white flex items-center">
                    <RefreshCw className={`w-4 h-4 mr-2 text-[#E6E4D5] ${isRefreshing ? 'animate-spin' : ''}`} />
                    Market Exchange Rates
                  </h3>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded">Live</span>
                </div>
                <div className="space-y-4">
                  <PriceDisplay currency="BRL" />
                  <PriceDisplay currency="MXN" />
                  <PriceDisplay currency="EUR" />
                </div>
                <div className="mt-6 pt-6 border-t border-[#1F1F1F]">
                  <p className="text-[10px] text-slate-500 font-medium text-center uppercase tracking-widest">
                    Oracle Data provided by ExchangeRate-API
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#1F1F1F]">
                <h4 className="font-bold text-white mb-2">Need RLO?</h4>
                <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">Use our faucet to get RLO tokens for testing the protection protocol.</p>
                <button 
                  onClick={handleFaucet}
                  className="w-full py-3 bg-[#E6E4D5] text-black rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg"
                >
                  Claim 1,000 RLO
                </button>
              </div>
            </div>

            {/* Right Main Col - Tabs & Actions */}
            <div className="lg:col-span-8 space-y-8">
              {/* Custom Tabs */}
               <div className="flex p-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl w-fit">
                <button 
                  onClick={() => setActiveTab('position')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'position' 
                    ? 'bg-[#E6E4D5] text-black shadow-xl' 
                    : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Protection</span>
                </button>
                <button 
                  onClick={() => setActiveTab('liquidity')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === 'liquidity' 
                    ? 'bg-[#E6E4D5] text-black shadow-xl' 
                    : 'text-slate-500 hover:text-white'
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

      <footer className="mt-20 py-8 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
        Rialo Shield • Powered by RLO • Mainnet Environment
      </footer>
    </main>
  )
}