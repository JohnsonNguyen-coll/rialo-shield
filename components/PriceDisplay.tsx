'use client'

import React, { useState } from 'react'
import { useApp } from '@/lib/AppContext'
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PriceChart from './PriceChart'

interface PriceDisplayProps {
  currency: string
}

export default function PriceDisplay({ currency }: PriceDisplayProps) {
  const { rates } = useApp()
  const [isExpanded, setIsExpanded] = useState(false)
  
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
    <div className="flex flex-col bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-black/30 transition-all shadow-sm">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 w-full group text-left"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black text-[#E6E4D5] rounded-xl flex items-center justify-center font-black transition-transform group-hover:scale-110">
            {currency.substring(0, 1)}
          </div>
          <div>
            <h4 className="font-black text-black text-sm uppercase tracking-tighter">{currency}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center">
              USD Oracle
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-base font-black text-black tracking-tight">
            ${rate.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
          </div>
          <div className={`flex items-center justify-end text-[10px] font-black ${isUp ? 'text-green-600' : 'text-red-600'}`}>
            {isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {isUp ? 'UP' : 'DOWN'}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-black/5 px-4 pb-4"
          >
            <PriceChart currency={currency} currentPrice={rate} />
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">24H History</span>
              <button className="text-[10px] font-bold text-black border border-black/10 px-2 py-1 rounded-lg hover:bg-black hover:text-[#E6E4D5] transition-colors">
                Trade {currency}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
