'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { fetchHistoricalRates, HistoricalPrice } from '@/lib/priceService'

interface PriceChartProps {
  currency: string
  currentPrice: number
}

export default function PriceChart({ currency, currentPrice }: PriceChartProps) {
  const [history, setHistory] = useState<HistoricalPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadHistory() {
      setIsLoading(true)
      const data = await fetchHistoricalRates(currency, 30) // Get 30 days of data
      if (data && data.length > 0) {
        setHistory(data)
      }
      setIsLoading(false)
    }
    loadHistory()
  }, [currency])

  // Formatting function for dates
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  // Final data to display (if loading, show a skeleton or the empty state)
  const displayData = useMemo(() => {
    if (history.length > 0) {
      return history.map(h => ({
        ...h,
        formattedDate: formatDate(h.date)
      }))
    }
    
    // Fallback if no history (can show mock as fallback during loading if desired)
    return []
  }, [history])

  const minPrice = displayData.length > 0 
    ? Math.min(...displayData.map(d => d.price)) * 0.99 
    : currentPrice * 0.95
    
  const maxPrice = displayData.length > 0 
    ? Math.max(...displayData.map(d => d.price)) * 1.01 
    : currentPrice * 1.05

  if (isLoading) {
    return (
      <div className="w-full h-[250px] mt-4 flex items-center justify-center bg-black/5 rounded-2xl border border-dashed border-black/10">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fetching Oracle History...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={displayData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000010" />
          <XAxis 
            dataKey="formattedDate" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#64748b' }}
            minTickGap={40}
          />
          <YAxis 
            hide={true} 
            domain={[minPrice, maxPrice]} 
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-black text-[#E6E4D5] p-3 rounded-xl shadow-2xl border border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">{payload[0].payload.date}</p>
                    <p className="text-sm font-black">${payload[0].value?.toLocaleString(undefined, { minimumFractionDigits: 4 })}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#000000"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPrice)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
