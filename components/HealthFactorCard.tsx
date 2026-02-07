'use client'

import React from 'react'
import { useMock } from '@/lib/mockContext'
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react'

export default function HealthFactorCard() {
  const { positions } = useMock()
  
  // Mock health factor calculation - ideally it would be (Collateral * LP Price) / (Borrowed * Rate)
  const avgHealthFactor = positions.length > 0 
    ? positions.reduce((acc, p) => acc + p.healthFactor, 0) / positions.length 
    : 0

  const getStatusColor = (hf: number) => {
    if (hf === 0) return 'text-white/20'
    if (hf < 1.1) return 'text-red-500'
    if (hf < 1.5) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getStatusBg = (hf: number) => {
    if (hf === 0) return 'bg-white/5'
    if (hf < 1.1) return 'bg-red-500/10 border-red-500/20'
    if (hf < 1.5) return 'bg-yellow-500/10 border-yellow-500/20'
    return 'bg-green-500/10 border-green-500/20'
  }

  return (
    <div className="card bg-white/[0.03] border-white/5 overflow-hidden relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-pink-500" />
          Health Factor
        </h3>
        <ShieldCheck className="w-5 h-5 text-white/20" />
      </div>

      <div className="text-center py-6">
        <div className={`text-6xl font-black mb-2 transition-all duration-700 ${getStatusColor(avgHealthFactor)}`}>
          {avgHealthFactor === 0 ? '--' : avgHealthFactor.toFixed(2)}
        </div>
        <div className={`inline-flex items-center px-4 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusBg(avgHealthFactor)} ${getStatusColor(avgHealthFactor)}`}>
          {avgHealthFactor === 0 ? 'No Data' : avgHealthFactor < 1.1 ? 'DANGER' : avgHealthFactor < 1.5 ? 'WARNING' : 'SECURE'}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-white/40">Liquidation Threshold</span>
          <span className="text-white/80">1.05</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${avgHealthFactor < 1.5 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min((avgHealthFactor / 2.5) * 100, 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-white/30 font-medium leading-tight">
          If your health factor drops below 1.05, your RLO collateral will be liquidated to repay the debt.
        </p>
      </div>

      {avgHealthFactor > 0 && avgHealthFactor < 1.2 && (
        <div className="absolute top-0 right-0 p-2">
           <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />
        </div>
      )}
    </div>
  )
}
