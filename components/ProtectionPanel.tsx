'use client'

import React, { useState } from 'react'
import { useMock } from '@/lib/mockContext'
import { Shield, Zap, Info, Percent } from 'lucide-react'

export default function ProtectionPanel() {
  const { rloBalance, activateProtection } = useMock()
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
    <div className="card bg-gradient-to-br from-purple-900/40 to-indigo-950/40 border-purple-500/20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center">
            <Shield className="w-6 h-6 mr-2 text-purple-400" />
            Active Protection
          </h2>
          <p className="text-white/40 text-sm font-medium">Use RLO collateral to hedge currency risk</p>
        </div>
        <div className="bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Mock Protection</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Currency Selection */}
        <div className="grid grid-cols-3 gap-3">
          {currencies.map(curr => (
            <button
              key={curr}
              onClick={() => setSelectedCurrency(curr)}
              className={`p-4 rounded-2xl border transition-all ${
                selectedCurrency === curr 
                ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              <div className="font-black text-lg">{curr}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Currency</div>
            </button>
          ))}
        </div>

        {/* Collateral Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-end px-1">
            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">RLO Collateral</label>
            <div className="text-xs font-bold text-white/40">
              Balance: <span className="text-purple-400">{rloBalance.toFixed(2)} RLO</span>
            </div>
          </div>
          <div className="relative group">
            <input
              type="number"
              value={collateral}
              onChange={(e) => setCollateral(e.target.value)}
              placeholder="0.00"
              className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-6 py-5 text-2xl font-black text-white outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all font-mono"
            />
            <button 
              onClick={() => setCollateral(rloBalance.toString())}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-xs font-black text-purple-400 transition-colors"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Protection Level Selection */}
        <div className="space-y-3">
           <label className="text-xs font-bold text-white/60 uppercase tracking-widest px-1">Protection Level (% of Collateral)</label>
           <div className="grid grid-cols-3 gap-3">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setProtectionLevel(level)}
                  className={`py-3 rounded-xl border font-black text-sm transition-all ${
                    protectionLevel === level 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                    : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {level}%
                </button>
              ))}
           </div>
        </div>

        {/* Fee & Debt Summary */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-white/40">Funding Fee (1% Entry)</span>
            <span className="text-red-400">-{fundingFee.toFixed(2)} RLO</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-white/40">Borrowed Amount</span>
            <span className="text-white/80">{borrowedAmount.toFixed(2)} {selectedCurrency}-equiv</span>
          </div>
          <div className="pt-2 border-t border-white/5 flex justify-between text-sm font-black">
            <span className="text-white/60">Estimated Health Factor</span>
            <span className="text-green-400">~ {(2).toFixed(2)}</span>
          </div>
        </div>

        <button
          disabled={!collateral || parseFloat(collateral) <= 0 || parseFloat(collateral) > rloBalance}
          onClick={handleActivate}
          className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-black text-lg shadow-xl hover:shadow-purple-500/20 transition-all active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:pointer-events-none flex items-center justify-center space-x-2 group"
        >
          <span>Activate Protection</span>
          <Zap className="w-5 h-5 group-hover:animate-pulse" />
        </button>
      </div>
    </div>
  )
}
