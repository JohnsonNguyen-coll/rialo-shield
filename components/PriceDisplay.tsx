'use client'

import React from 'react'
import { useApp } from '@/lib/AppContext'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface PriceDisplayProps {
  currency: string
}

export default function PriceDisplay({ currency }: PriceDisplayProps) {
  const { rates } = useApp()
  
  const rate = rates ? rates[currency as keyof typeof rates] : null
  const isUp = Math.random() > 0.5

  if (rate === null || typeof rate !== 'number') {
    return (
      <div className="flex items-center justify-between p-3 bg-[#000000] rounded-xl animate-pulse border border-[#1F1F1F]">
        <div className="w-12 h-4 bg-[#0A0A0A] rounded" />
        <div className="w-20 h-4 bg-[#0A0A0A] rounded" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 bg-[#000000] border border-[#1F1F1F] rounded-xl hover:border-[#E6E4D5]/30 transition-all group">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#E6E4D5]/10 rounded-lg flex items-center justify-center font-bold text-[#E6E4D5]">
          {currency.substring(0, 1)}
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">{currency}</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">USD Oracle</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-base font-bold text-white">
          ${rate.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
        </div>
        <div className={`flex items-center justify-end text-[10px] font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {isUp ? 'UP' : 'DOWN'}
        </div>
      </div>
    </div>
  )
}
