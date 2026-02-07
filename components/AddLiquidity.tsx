'use client'

import React, { useState } from 'react'
import { useApp } from '@/lib/AppContext'
import { Droplets, Plus, Info, Lock, Wallet, PieChart } from 'lucide-react'

export default function AddLiquidity() {
  const { rloBalance, addLiquidity, poolMetrics, userLP } = useApp()
  const [rloAmount, setRloAmount] = useState<string>('')

  const handleAdd = () => {
    const rlo = parseFloat(rloAmount)
    if (!isNaN(rlo) && rlo >= 500 && rlo <= rloBalance) {
      addLiquidity(rlo)
      setRloAmount('')
    }
  }

  return (
    <div className="space-y-8">
      {/* Pool Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Funds', value: poolMetrics.totalFunds.toLocaleString() + ' RLO', color: 'text-black' },
          { label: 'Available', value: poolMetrics.availableFunds.toLocaleString() + ' RLO', color: 'text-green-600' },
          { label: 'Reserved', value: poolMetrics.reservedFunds.toLocaleString() + ' RLO', color: 'text-yellow-600' },
          { label: 'LP Capital', value: poolMetrics.totalLPCapital.toLocaleString() + ' RLO', color: 'text-black/60' },
        ].map((m, i) => (
          <div key={i} className="card bg-white border-black/10 p-4 py-2 text-center shadow-xl">
            <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">{m.label}</div>
            <div className={`text-sm font-black ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Add Form */}
        <div className="card bg-white border-black/10 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-black flex items-center uppercase tracking-tighter">
                <Droplets className="w-5 h-5 mr-3 text-black" />
                Provide Liquidity
              </h2>
              <p className="text-slate-500 text-sm font-bold mt-1">Earn rewards by fueling the protocol</p>
            </div>
            <div className="bg-black px-3 py-1 rounded-lg border border-black shadow-lg">
              <span className="text-[10px] font-black text-[#E6E4D5] uppercase tracking-widest">RLO Pool</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deposit Amount (RLO)</label>
                <div className="text-[10px] font-bold text-slate-400">
                  Balance: <span className="text-black font-black">{rloBalance.toFixed(2)} RLO</span>
                </div>
              </div>
              <div className="relative group">
                <input
                  type="number"
                  value={rloAmount}
                  onChange={(e) => setRloAmount(e.target.value)}
                  placeholder="Min. 500"
                  className="w-full bg-white border border-black/10 rounded-xl px-6 py-4 text-xl font-black text-black outline-none focus:border-black transition-all shadow-inner"
                />
                <button 
                  onClick={() => setRloAmount(rloBalance.toString())}
                  className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black text-[#E6E4D5] hover:brightness-110 rounded-lg text-[9px] font-black transition-colors"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-4 rounded-xl flex items-center space-x-3 border border-black/10">
                  <Lock className="w-4 h-4 text-black" />
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Lock Period</div>
                    <div className="text-xs font-black text-black">7 Days</div>
                  </div>
               </div>
               <div className="bg-white p-4 rounded-xl flex items-center space-x-3 border border-black/10">
                  <PieChart className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Estimated APY</div>
                    <div className="text-xs font-black text-green-600">12.4%</div>
                  </div>
               </div>
            </div>

            <div className="p-4 rounded-xl bg-[#E6E4D5]/5 border border-[#E6E4D5]/10 flex items-start space-x-3">
              <Info className="w-4 h-4 text-[#E6E4D5] mt-0.5 shrink-0" />
              <div className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Rewards are calculated based on 80% protocol fees. Minimum deposit: 500 RLO.
              </div>
            </div>

            <button
              disabled={!rloAmount || parseFloat(rloAmount) < 500 || parseFloat(rloAmount) > rloBalance}
              onClick={handleAdd}
              className="w-full py-4 bg-black text-[#E6E4D5] rounded-xl font-black text-base hover:brightness-110 active:scale-[0.98] disabled:opacity-30 disabled:grayscale transition-all shadow-2xl uppercase tracking-widest"
            >
              Deposit to Pool
            </button>
          </div>
        </div>

        {/* Right Column - Info/Stats */}
        <div className="space-y-6">
            <div className="card bg-white border-black/10 shadow-xl">
              <h3 className="text-lg font-black text-black mb-6 flex items-center uppercase tracking-tighter">
                 <Wallet className="w-5 h-5 mr-3 text-black" />
                 Yield Dashboard
              </h3>
              <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-black/5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Share</span>
                    <span className="text-sm font-black text-black">
                       {userLP ? ((userLP.amount / poolMetrics.totalLPCapital) * 100).toFixed(4) : '0.00'}%
                    </span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-black/5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Stake</span>
                    <span className="text-sm font-black text-black">{userLP?.amount.toLocaleString() || '0'} RLO</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-black/5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Yield Earned</span>
                    <span className="text-sm font-black text-green-600">+{userLP?.rewards.toFixed(2) || '0.00'} RLO</span>
                 </div>
                 <div className="flex justify-between items-center py-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unstake Opportunity</span>
                    <span className="text-xs font-black text-black/60">
                       {userLP ? new Date(userLP.unlockDate).toLocaleDateString() : 'None'}
                    </span>
                 </div>
              </div>
           </div>

           <div className="p-6 rounded-2xl border border-black/10 bg-white shadow-xl">
              <h4 className="text-[10px] font-semibold text-slate-400 mb-2 tracking-tight">Reward Strategy</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                 Yield is generated from protocol fees (1% entry fee). 80% is distributed to LPs based on their share of the pool.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
