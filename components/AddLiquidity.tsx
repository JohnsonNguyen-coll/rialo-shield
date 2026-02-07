'use client'

import React, { useState } from 'react'
import { useApp } from '@/lib/AppContext'
import { Droplets, Plus, Info, Lock, Wallet, PieChart } from 'lucide-react'

export default function AddLiquidity() {
  const { rloBalance, addLiquidity, poolMetrics, userLP } = useApp()
  const [rloAmount, setRloAmount] = useState<string>('')

  const handleAdd = () => {
    const rlo = parseFloat(rloAmount)
    if (!isNaN(rlo) && rlo >= 1000 && rlo <= rloBalance) {
      addLiquidity(rlo)
      setRloAmount('')
    }
  }

  return (
    <div className="space-y-8">
      {/* Pool Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Funds', value: poolMetrics.totalFunds.toLocaleString() + ' RLO', color: 'text-white' },
          { label: 'Available', value: poolMetrics.availableFunds.toLocaleString() + ' RLO', color: 'text-green-500' },
          { label: 'Reserved', value: poolMetrics.reservedFunds.toLocaleString() + ' RLO', color: 'text-yellow-500' },
          { label: 'LP Capital', value: poolMetrics.totalLPCapital.toLocaleString() + ' RLO', color: 'text-[#E6E4D5]' },
        ].map((m, i) => (
          <div key={i} className="card bg-[#0A0A0A] border-[#1F1F1F] p-4 py-6 text-center">
            <div className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase mb-2">{m.label}</div>
            <div className={`text-sm font-bold ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Add Form */}
        <div className="card bg-[#0A0A0A] border-[#1F1F1F]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center">
                <Droplets className="w-5 h-5 mr-3 text-[#E6E4D5]" />
                Provide Liquidity
              </h2>
              <p className="text-slate-400 text-sm font-medium mt-1">Earn rewards by fueling the protocol</p>
            </div>
            <div className="bg-[#E6E4D5]/10 px-3 py-1 rounded-lg border border-[#E6E4D5]/20">
              <span className="text-[10px] font-bold text-[#E6E4D5] uppercase tracking-wider">RLO Pool</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deposit Amount (RLO)</label>
                <div className="text-[10px] font-bold text-slate-400">
                  Balance: <span className="text-white">{rloBalance.toFixed(2)} RLO</span>
                </div>
              </div>
              <div className="relative group">
                <input
                  type="number"
                  value={rloAmount}
                  onChange={(e) => setRloAmount(e.target.value)}
                  placeholder="Min. 1,000"
                  className="w-full bg-[#000000] border border-[#1F1F1F] rounded-xl px-6 py-4 text-xl font-bold text-white outline-none focus:border-[#E6E4D5] transition-all"
                />
                <button 
                  onClick={() => setRloAmount(rloBalance.toString())}
                  className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#0A0A0A] border border-[#1F1F1F] hover:bg-[#1F1F1F] rounded-lg text-[9px] font-bold text-white transition-colors"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-[#000000] p-4 rounded-xl flex items-center space-x-3 border border-[#1F1F1F]">
                  <Lock className="w-4 h-4 text-[#E6E4D5]" />
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Lock Period</div>
                    <div className="text-xs font-bold text-white">7 Days</div>
                  </div>
               </div>
               <div className="bg-[#000000] p-4 rounded-xl flex items-center space-x-3 border border-[#1F1F1F]">
                  <PieChart className="w-4 h-4 text-green-500" />
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Estimated APY</div>
                    <div className="text-xs font-bold text-green-500">12.4%</div>
                  </div>
               </div>
            </div>

            <div className="p-4 rounded-xl bg-[#E6E4D5]/5 border border-[#E6E4D5]/10 flex items-start space-x-3">
              <Info className="w-4 h-4 text-[#E6E4D5] mt-0.5 shrink-0" />
              <div className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Rewards are calculated based on 80% protocol fees. Minimum deposit: 1,000 RLO.
              </div>
            </div>

            <button
              disabled={!rloAmount || parseFloat(rloAmount) < 1000 || parseFloat(rloAmount) > rloBalance}
              onClick={handleAdd}
              className="w-full py-4 bg-[#E6E4D5] text-black rounded-xl font-bold text-base hover:brightness-110 active:scale-[0.98] disabled:opacity-30 disabled:grayscale transition-all shadow-lg"
            >
              Deposit to Pool
            </button>
          </div>
        </div>

        {/* Right Column - Info/Stats */}
        <div className="space-y-6">
           <div className="card bg-[#0A0A0A] border-[#1F1F1F]">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                 <Wallet className="w-5 h-5 mr-3 text-[#E6E4D5]" />
                 Yield Dashboard
              </h3>
              <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[#1F1F1F]">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Share</span>
                    <span className="text-sm font-bold text-white">
                       {userLP ? ((userLP.amount / poolMetrics.totalLPCapital) * 100).toFixed(4) : '0.00'}%
                    </span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-[#1F1F1F]">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Stake</span>
                    <span className="text-sm font-bold text-white">{userLP?.amount.toLocaleString() || '0'} RLO</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-[#1F1F1F]">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Yield Earned</span>
                    <span className="text-sm font-bold text-green-500">+{userLP?.rewards.toFixed(2) || '0.00'} RLO</span>
                 </div>
                 <div className="flex justify-between items-center py-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unstake Opportunity</span>
                    <span className="text-xs font-bold text-slate-400">
                       {userLP ? new Date(userLP.unlockDate).toLocaleDateString() : 'None'}
                    </span>
                 </div>
              </div>
           </div>

           <div className="p-6 rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A]">
              <h4 className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-tight">Reward Strategy</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                 Yield is generated from protocol fees (1% entry fee). 80% is distributed to LPs based on their share of the pool.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
