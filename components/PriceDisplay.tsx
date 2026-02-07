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
      <div className="flex items-center justify-between p-3 bg-white rounded-xl animate-pulse border border-black/10">
        <div className="w-12 h-4 bg-black/5 rounded" />
        <div className="w-20 h-4 bg-black/5 rounded" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-black/10 rounded-xl hover:border-black transition-all group shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center font-black text-black">
          {currency.substring(0, 1)}
        </div>
        <div>
          <h4 className="font-black text-black text-sm uppercase tracking-tighter">{currency}</h4>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">USD Oracle</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-base font-black text-black">
          ${rate.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
        </div>
        <div className={`flex items-center justify-end text-[10px] font-black ${isUp ? 'text-green-600' : 'text-red-600'}`}>
          {isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {isUp ? 'UP' : 'DOWN'}
        </div>
      </div>
    </div>
  )
}
