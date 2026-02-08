'use client'

import React, { useState } from 'react'
import { Shield, TrendingUp, AlertCircle, Activity, ShieldCheck, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react'
import { useApp } from '@/lib/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import PriceChart from './PriceChart'

export default function PositionDashboard() {
  const { positions, rates } = useApp()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const totalDebt = positions.reduce((acc, p) => acc + p.borrowedAmount, 0)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="card bg-white border-black/10 overflow-hidden relative shadow-xl">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <BarChart3 className="w-32 h-32 text-black" />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-black flex items-center uppercase tracking-wider">
            <Activity className="w-5 h-5 mr-3 text-black" />
            Active positions
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Real-time protection status</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-medium text-slate-400 tracking-wide mb-1">Total liability</div>
          <div className="text-xl font-semibold text-black tracking-tight">${totalDebt.toLocaleString()}</div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-black/5 rounded-2xl border border-dashed border-black/10">
          <Shield className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-400 uppercase tracking-tighter">No active positions found</h3>
          <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">Enable protection to shield your assets</p>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((position) => {
            const currentRate = rates?.[position.currency as keyof typeof rates] as number || position.entryRate
            const isSafe = position.healthFactor > 1.2
            const isExpanded = expandedId === position.id
            
            return (
              <div 
                key={position.id} 
                className="group border border-black/5 bg-white hover:border-black/20 hover:shadow-lg transition-all rounded-2xl overflow-hidden shadow-sm"
              >
                <div 
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                  onClick={() => toggleExpand(position.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${
                      isSafe ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {position.currency.substring(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-black tracking-tight">{position.currency} Protection</span>
                        <span className="text-[9px] font-bold bg-black/5 text-slate-500 px-2 py-0.5 rounded-full tracking-wide uppercase">
                           {position.id}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <ShieldCheck className="w-3 h-3 text-green-600 mr-1.5" />
                        <span className="text-[10px] font-bold text-green-600 tracking-wide uppercase">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 md:ml-12 border-l border-black/5 pl-8">
                    <div>
                      <div className="text-[9px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Collateral</div>
                      <div className="text-xs font-bold text-black tracking-tight">{position.collateralAmount.toLocaleString()} RLO</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Entry rate</div>
                      <div className="text-xs font-bold text-black">1 {position.currency} = ${position.entryRate.toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Liability</div>
                      <div className="text-xs font-bold text-black tracking-tight">${position.borrowedAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-slate-400 tracking-wider mb-1 uppercase">Health factor</div>
                      <div className={`text-xs font-bold flex items-center ${isSafe ? 'text-green-600' : 'text-red-600'}`}>
                        {position.healthFactor.toFixed(2)}
                        {isSafe ? <TrendingUp className="w-3 h-3 ml-1.5" /> : <AlertCircle className="w-3 h-3 ml-1.5" />}
                      </div>
                    </div>
                  </div>

                  <div className="h-10 w-10 md:h-12 md:w-12 bg-black/5 group-hover:bg-black group-hover:text-[#E6E4D5] rounded-xl flex items-center justify-center transition-all shadow-sm">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 border-t border-black/5"
                    >
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Currency Visualizer</h4>
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Live Feed</span>
                        </div>
                        <PriceChart currency={position.currency} currentPrice={currentRate} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Visual health bar */}
                <div className="h-1.5 w-full bg-black/5">
                   <div 
                    className={`h-full transition-all duration-1000 ${isSafe ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(100, (position.healthFactor / 3) * 100)}%` }}
                   ></div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
