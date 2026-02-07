'use client'

import React, { useState } from 'react'
import { useMock } from '@/lib/mockContext'
import { Droplets, Plus, Info, Lock, Wallet, PieChart } from 'lucide-react'

export default function AddLiquidity() {
  const { rloBalance, addLiquidity, poolMetrics } = useMock()
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
          { label: 'Available', value: poolMetrics.availableFunds.toLocaleString() + ' RLO', color: 'text-green-400' },
          { label: 'Reserved', value: poolMetrics.reservedFunds.toLocaleString() + ' RLO', color: 'text-yellow-500' },
          { label: 'LP Capital', value: poolMetrics.totalLPCapital.toLocaleString() + ' RLO', color: 'text-purple-400' },
        ].map((m, i) => (
          <div key={i} className="card bg-white/[0.03] border-white/5 p-4 py-6 text-center">
            <div className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-2">{m.label}</div>
            <div className={`text-sm font-black ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Add Form */}
        <div className="card bg-gradient-to-br from-indigo-900/40 to-purple-950/40 border-indigo-500/20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center">
                <Droplets className="w-6 h-6 mr-2 text-indigo-400" />
                Provide Liquidity
              </h2>
              <p className="text-white/40 text-sm font-medium">Earn fees by providing RLO to the pool</p>
            </div>
            <div className="bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">RLO Pool</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Amount to Deposit (RLO)</label>
                <div className="text-xs font-bold text-white/40">
                  Balance: <span className="text-purple-400">{rloBalance.toFixed(2)} RLO</span>
                </div>
              </div>
              <div className="relative group">
                <input
                  type="number"
                  value={rloAmount}
                  onChange={(e) => setRloAmount(e.target.value)}
                  placeholder="Min. 1,000"
                  className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-6 py-5 text-2xl font-black text-white outline-none focus:border-indigo-500/50 transition-all font-mono"
                />
                <button 
                  onClick={() => setRloAmount(rloBalance.toString())}
                  className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-2xl flex items-center space-x-3 border border-white/5">
                  <Lock className="w-5 h-5 text-indigo-400" />
                  <div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Lock period</div>
                    <div className="text-sm font-black text-white">7 Days</div>
                  </div>
               </div>
               <div className="bg-white/5 p-4 rounded-2xl flex items-center space-x-3 border border-white/5">
                  <PieChart className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Est. APY</div>
                    <div className="text-sm font-black text-green-400">12.4%</div>
                  </div>
               </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start space-x-3">
              <Info className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div className="text-xs text-indigo-300/80 leading-relaxed font-medium">
                Minimum deposit is <b>1,000 RLO</b>. LPs earn <b>80%</b> of the 1% funding fees gathered by the protocol.
              </div>
            </div>

            <button
              disabled={!rloAmount || parseFloat(rloAmount) < 1000 || parseFloat(rloAmount) > rloBalance}
              onClick={handleAdd}
              className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-lg shadow-xl hover:shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:pointer-events-none"
            >
              Deposit to Pool
            </button>
          </div>
        </div>

        {/* Right Column - Info/Stats */}
        <div className="space-y-6">
           <div className="card bg-white/[0.03] border-white/5">
              <h3 className="text-lg font-black text-white mb-6 flex items-center">
                 <Wallet className="w-5 h-5 mr-2 text-purple-400" />
                 Your LP Summary
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Your Share</span>
                    <span className="text-sm font-black text-white">
                       {userLP ? ((userLP.amount / poolMetrics.totalLPCapital) * 100).toFixed(4) : '0.00'}%
                    </span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Total LP Staked</span>
                    <span className="text-sm font-black text-white">{userLP?.amount.toLocaleString() || '0'} RLO</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Rewards Earned</span>
                    <span className="text-sm font-black text-green-400">{userLP?.rewards.toFixed(2) || '0.00'} RLO</span>
                 </div>
                 <div className="flex justify-between items-center py-3 text-center md:text-left flex-col md:flex-row space-y-2 md:space-y-0">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Unlock Date</span>
                    <span className="text-xs font-black text-indigo-300 font-mono">
                       {userLP ? new Date(userLP.unlockDate).toLocaleDateString() + ' ' + new Date(userLP.unlockDate).toLocaleTimeString() : 'No active deposit'}
                    </span>
                 </div>
              </div>
           </div>

           <div className="p-6 rounded-[2rem] border border-white/5 bg-indigo-600/10">
              <h4 className="text-sm font-black text-white mb-2 uppercase tracking-tight">Fee Mechanism</h4>
              <p className="text-xs text-white/50 leading-relaxed font-medium">
                 The protocol charges a 1% fee on every protection activation. 80% of these fees are redistributed to LPs, 20% goes to the protocol treasury.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
