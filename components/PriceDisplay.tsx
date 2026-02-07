'use client'

import React from 'react'
import { useMock } from '@/lib/mockContext'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface PriceDisplayProps {
  currency: string
}

export default function PriceDisplay({ currency }: PriceDisplayProps) {
  const { rates } = useMock()
  
  const rate = rates ? rates[currency as keyof typeof rates] : null
  const isUp = Math.random() > 0.5 // Mock trend

  if (rate === null || typeof rate !== 'number') {
    return (
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl animate-pulse">
        <div className="w-12 h-4 bg-white/10 rounded" />
        <div className="w-20 h-4 bg-white/10 rounded" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all group">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center font-bold text-purple-400">
          {currency.substring(0, 1)}
        </div>
        <div>
          <h4 className="font-bold text-white">{currency}</h4>
          <p className="text-xs text-white/40 font-medium">USD Pair</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-black text-white">
          ${rate.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
        </div>
        <div className={`flex items-center justify-end text-xs font-bold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
          {isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {isUp ? '+' : '-'}{(Math.random() * 2).toFixed(2)}%
        </div>
      </div>
    </div>
  )
}
