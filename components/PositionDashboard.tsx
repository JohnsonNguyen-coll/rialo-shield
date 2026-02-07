'use client'

import React from 'react'
import { useMock } from '@/lib/mockContext'
import { BarChart3, TrendingUp, AlertCircle, CheckCircle2, ShieldOff } from 'lucide-react'

export default function PositionDashboard() {
  const { positions } = useMock()

  return (
    <div className="card bg-white/[0.03] border-white/5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-indigo-400" />
            Active Positions
          </h2>
          <p className="text-white/40 text-sm font-medium">Monitoring your debt and collateral</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Total Debt</div>
          <div className="text-xl font-black text-white">
            ${positions.reduce((acc, p) => acc + p.borrowedAmount, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-white/5 rounded-3xl">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
            <ShieldOff className="w-8 h-8 text-white/20" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white/60">No positions found</h3>
            <p className="text-white/30 text-sm font-medium max-w-[200px]">Use collateral to activate your first shield.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((pos) => (
            <div key={pos.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                    <span className="font-black text-white group-hover:text-purple-400">{pos.currency}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-white px-2 py-0.5 bg-white/5 rounded-lg text-xs font-mono">#{pos.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-wider flex items-center">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Hedged
                      </span>
                    </div>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Level: {pos.protectionLevel}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-white">{pos.borrowedAmount.toLocaleString()} {pos.currency}-equiv</div>
                  <div className={`text-xs font-bold flex items-center justify-end ${pos.healthFactor > 1.5 ? 'text-green-400' : 'text-yellow-500'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" /> HF: {pos.healthFactor.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 p-2 px-3 rounded-lg border border-white/5">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-0.5 text-center">Collateral</div>
                  <div className="text-xs font-black text-white/80 text-center">{pos.collateralAmount.toLocaleString()} RLO</div>
                </div>
                <div className="bg-white/5 p-2 px-3 rounded-lg border border-white/5">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-0.5 text-center">Entry Rate</div>
                  <div className="text-xs font-black text-white/80 text-center">${pos.entryRate.toFixed(4)}</div>
                </div>
                <div className="bg-white/5 p-2 px-3 rounded-lg border border-white/5">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-0.5 text-center">Total Debt</div>
                  <div className="text-xs font-black text-red-400/80 text-center">${pos.borrowedAmount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
