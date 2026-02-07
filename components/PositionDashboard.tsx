'use client'

import React from 'react'
import { useApp, ShieldPosition } from '@/lib/AppContext'
import { BarChart3, TrendingUp, AlertCircle, CheckCircle2, ShieldOff } from 'lucide-react'

export default function PositionDashboard() {
  const { positions } = useApp()

  return (
    <div className="card bg-white border-black/10 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-black flex items-center uppercase tracking-tighter">
            <BarChart3 className="w-5 h-5 mr-3 text-black" />
            Active Positions
          </h2>
          <p className="text-slate-500 text-sm font-bold mt-1">Monitoring your debt and collateral</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Debt</div>
          <div className="text-xl font-black text-black">
            ${positions.reduce((acc: number, p: ShieldPosition) => acc + p.borrowedAmount, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-black/10 rounded-2xl">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-black/10">
            <ShieldOff className="w-7 h-7 text-black/20" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-400 uppercase tracking-widest">No positions found</h3>
            <p className="text-slate-500 text-[10px] font-black uppercase max-w-[200px] mt-1">Use collateral to activate your first shield.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((pos: ShieldPosition) => (
            <div key={pos.id} className="p-5 rounded-xl bg-white border border-black/10 hover:border-black/30 transition-all group shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black/5 border border-black/10 rounded-lg flex items-center justify-center transition-colors">
                    <span className="font-black text-black text-sm">{pos.currency}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                       <span className="font-black text-black px-2 py-0.5 bg-black/5 rounded text-[10px] font-mono border border-black/10">#{pos.id}</span>
                       <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-[9px] font-black uppercase tracking-widest flex items-center border border-green-200">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Active
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Level: {pos.protectionLevel}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-black">{pos.borrowedAmount.toLocaleString()} {pos.currency}-equiv</div>
                  <div className={`text-[10px] font-black flex items-center justify-end ${pos.healthFactor > 1.5 ? 'text-green-600' : 'text-yellow-600'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" /> HF: {pos.healthFactor.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-black/5 p-2 rounded-lg border border-black/10">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5 text-center">Collateral</div>
                  <div className="text-[11px] font-black text-black text-center">{pos.collateralAmount.toLocaleString()} RLO</div>
                </div>
                <div className="bg-black/5 p-2 rounded-lg border border-black/10">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5 text-center">Entry Price</div>
                  <div className="text-[11px] font-black text-black text-center">${pos.entryRate.toFixed(4)}</div>
                </div>
                <div className="bg-black/5 p-2 rounded-lg border border-black/10">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5 text-center">Liability</div>
                  <div className="text-[11px] font-black text-red-600 text-center">${pos.borrowedAmount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
