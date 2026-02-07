'use client'

import React, { useState } from 'react'
import { useApp } from '@/lib/AppContext'
import { Shield, Zap, Info, Percent } from 'lucide-react'

export default function ProtectionPanel() {
  const { rloBalance, activateProtection } = useApp()
  const [collateral, setCollateral] = useState<string>('')
  const [protectionLevel, setProtectionLevel] = useState<number>(50)
  const [selectedCurrency, setSelectedCurrency] = useState('BRL')

  const handleActivate = () => {
    const val = parseFloat(collateral)
    if (!isNaN(val) && val > 0 && val <= rloBalance) {
      activateProtection(selectedCurrency, val, protectionLevel)
      setCollateral('')
    }
  }

  const currencies = ['BRL', 'MXN', 'EUR']
  const levels = [20, 50, 80]

  const fundingFee = parseFloat(collateral) ? (parseFloat(collateral) * 0.01) : 0
  const borrowedAmount = parseFloat(collateral) ? (parseFloat(collateral) * (protectionLevel / 100)) : 0

  return (
    <div className="card bg-white border-black/10 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-black flex items-center uppercase tracking-wider">
            <Shield className="w-5 h-5 mr-3 text-black" />
            Shield Configuration
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Configure your collateral-backed protection</p>
        </div>
        <div className="bg-black px-3 py-1 rounded-lg border border-black shadow-lg">
          <span className="text-[10px] font-semibold text-[#E6E4D5] tracking-wide">Active protocol</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Currency Selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-medium text-slate-500 uppercase tracking-widest px-1">Target Currency</label>
          <div className="grid grid-cols-3 gap-3">
            {currencies.map(curr => (
              <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedCurrency === curr 
                  ? 'bg-black border-black text-[#E6E4D5] shadow-xl' 
                  : 'bg-white border-black/10 text-slate-400 hover:border-black/30'
                }`}
              >
                <div className="font-semibold text-lg uppercase tracking-tighter">{curr}</div>
                <div className="text-[9px] font-semibold uppercase tracking-widest opacity-60">Hedge</div>
              </button>
            ))}
          </div>
        </div>

        {/* Collateral Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-end px-1">
            <label className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">RLO Collateral</label>
            <div className="text-[10px] font-medium text-slate-400">
              Avail: <span className="text-black font-semibold">{rloBalance.toFixed(2)} RLO</span>
            </div>
          </div>
          <div className="relative group">
            <input
              type="number"
              value={collateral}
              onChange={(e) => setCollateral(e.target.value)}
              placeholder="0.00"
              className="w-full bg-white border border-black/10 rounded-xl px-6 py-4 text-xl font-semibold text-black outline-none focus:border-black transition-all shadow-inner"
            />
            <button 
              onClick={() => setCollateral(rloBalance.toString())}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black text-[#E6E4D5] hover:brightness-110 rounded-lg text-[10px] font-semibold transition-colors"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Protection Level Selection */}
        <div className="space-y-3">
           <label className="text-[10px] font-medium text-slate-500 uppercase tracking-widest px-1">Protection Level (% of Collateral)</label>
           <div className="grid grid-cols-3 gap-3">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setProtectionLevel(level)}
                  className={`py-3 rounded-xl border font-semibold text-sm transition-all ${
                    protectionLevel === level 
                    ? 'bg-black border-black text-[#E6E4D5] shadow-lg' 
                    : 'bg-white border-black/10 text-slate-400 hover:border-black/30'
                  }`}
                >
                  {level}%
                </button>
              ))}
           </div>
        </div>

        {/* Summary */}
        <div className="p-5 rounded-xl bg-black/5 border border-black/10 space-y-3">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-500 font-medium uppercase tracking-widest text-[9px]">Protocol Funding Fee (1%)</span>
            <span className="text-red-600 font-semibold">-{fundingFee.toFixed(2)} RLO</span>
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-500 font-medium uppercase tracking-widest text-[9px]">System Issued Debt</span>
            <span className="text-black font-semibold">{borrowedAmount.toFixed(2)} {selectedCurrency}-equiv</span>
          </div>
        </div>

        <button
          disabled={!collateral || parseFloat(collateral) <= 0 || parseFloat(collateral) > rloBalance}
          onClick={handleActivate}
          className="w-full py-4 bg-black text-[#E6E4D5] rounded-xl font-semibold text-base hover:brightness-110 active:scale-[0.98] disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center space-x-2 shadow-2xl"
        >
          <span className="uppercase tracking-widest">Enable Protection</span>
          <Zap className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
