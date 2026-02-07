'use client'

import React from 'react'
import { useApp, ShieldPosition } from '@/lib/AppContext'
import { BarChart3, TrendingUp, AlertCircle, CheckCircle2, ShieldOff } from 'lucide-react'

export default function PositionDashboard() {
  const { positions } = useApp()

  return (
    <div className="card bg-[#0A0A0A] border-[#1F1F1F]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-3 text-[#E6E4D5]" />
            Active Positions
          </h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Monitoring your debt and collateral</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Debt</div>
          <div className="text-xl font-bold text-white">
            ${positions.reduce((acc: number, p: ShieldPosition) => acc + p.borrowedAmount, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-[#1F1F1F] rounded-2xl">
          <div className="w-14 h-14 bg-[#000000] rounded-full flex items-center justify-center border border-[#1F1F1F]">
            <ShieldOff className="w-7 h-7 text-[#E6E4D5]/20" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-400">No positions found</h3>
            <p className="text-slate-600 text-xs font-medium max-w-[200px] mt-1">Use collateral to activate your first shield.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((pos: ShieldPosition) => (
            <div key={pos.id} className="p-5 rounded-xl bg-[#000000] border border-[#1F1F1F] hover:border-[#E6E4D5]/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg flex items-center justify-center transition-colors">
                    <span className="font-bold text-white text-sm">{pos.currency}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white px-2 py-0.5 bg-[#0A0A0A] rounded text-[10px] font-mono border border-[#1F1F1F]">#{pos.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[9px] font-bold uppercase tracking-wider flex items-center border border-green-500/20">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Active
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Level: {pos.protectionLevel}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-white">{pos.borrowedAmount.toLocaleString()} {pos.currency}-equiv</div>
                  <div className={`text-[10px] font-bold flex items-center justify-end ${pos.healthFactor > 1.5 ? 'text-green-500' : 'text-yellow-500'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" /> HF: {pos.healthFactor.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#0A0A0A] p-2 rounded-lg border border-[#1F1F1F]">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5 text-center">Collateral</div>
                  <div className="text-[11px] font-bold text-slate-300 text-center">{pos.collateralAmount.toLocaleString()} RLO</div>
                </div>
                <div className="bg-[#0A0A0A] p-2 rounded-lg border border-[#1F1F1F]">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5 text-center">Entry Price</div>
                  <div className="text-[11px] font-bold text-slate-300 text-center">${pos.entryRate.toFixed(4)}</div>
                </div>
                <div className="bg-[#0A0A0A] p-2 rounded-lg border border-[#1F1F1F]">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5 text-center">Liability</div>
                  <div className="text-[11px] font-bold text-red-400 text-center">${pos.borrowedAmount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
