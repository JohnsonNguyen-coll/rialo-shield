'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchExchangeRates, ExchangeRates } from './priceService'
import { useAccount } from 'wagmi'

export interface ShieldPosition {
  id: string
  currency: string
  collateralAmount: number
  protectionLevel: number
  borrowedAmount: number
  entryRate: number
  healthFactor: number
  active: boolean
  createdAt: number
}

export interface PoolMetrics {
  totalFunds: number
  availableFunds: number
  reservedFunds: number
  totalLPCapital: number
}

export interface UserLP {
  amount: number
  unlockDate: number
  rewards: number
  address: string
}

interface AppContextType {
  isConnected: boolean
  address: string | null
  rloBalance: number
  usdcBalance: number
  positions: ShieldPosition[]
  rates: ExchangeRates | null
  poolMetrics: PoolMetrics
  userLP: UserLP | null
  faucet: () => string | null
  activateProtection: (currency: string, collateralAmount: number, protectionLevel: number) => void
  addLiquidity: (rloAmount: number) => void
  refreshRates: () => Promise<void>
  faucetLimitReached: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { address: wagmiAddress, isConnected: wagmiIsConnected } = useAccount()
  const [rloBalance, setRloBalance] = useState(0)
  const [usdcBalance, setUsdcBalance] = useState(1000)
  const [positions, setPositions] = useState<ShieldPosition[]>([])
  const [rates, setRates] = useState<ExchangeRates | null>(null)
  const [userLP, setUserLP] = useState<UserLP | null>(null)
  const [poolMetrics, setPoolMetrics] = useState<PoolMetrics>({
    totalFunds: 5000000,
    availableFunds: 3200000,
    reservedFunds: 1800000,
    totalLPCapital: 4800000
  })

  // Persistence Logic
  useEffect(() => {
    if (wagmiIsConnected && wagmiAddress) {
      const storedData = localStorage.getItem(`rialo_user_${wagmiAddress}`)
      if (storedData) {
        const parsed = JSON.parse(storedData)
        setRloBalance(parsed.rloBalance || 0)
        setUsdcBalance(parsed.usdcBalance || 1000)
        setPositions(parsed.positions || [])
        setUserLP(parsed.userLP || null)
      } else {
        // New user default
        setRloBalance(0)
        setUsdcBalance(1000)
        setPositions([])
        setUserLP(null)
      }

      // Load Pool Metrics (Global persistence)
      const globalPool = localStorage.getItem('rialo_global_pool')
      if (globalPool) {
        setPoolMetrics(JSON.parse(globalPool))
      }
    }
  }, [wagmiAddress, wagmiIsConnected])

  // Save data on change
  useEffect(() => {
    if (wagmiIsConnected && wagmiAddress) {
      const userData = { rloBalance, usdcBalance, positions, userLP }
      localStorage.setItem(`rialo_user_${wagmiAddress}`, JSON.stringify(userData))
      localStorage.setItem('rialo_global_pool', JSON.stringify(poolMetrics))
    }
  }, [rloBalance, usdcBalance, positions, userLP, poolMetrics, wagmiAddress, wagmiIsConnected])

  const refreshRates = async () => {
    const newRates = await fetchExchangeRates()
    setRates(newRates)
  }

  useEffect(() => {
    refreshRates()
    const interval = setInterval(refreshRates, 60000)
    return () => clearInterval(interval)
  }, [])

  const faucet = (): string | null => {
    if (!wagmiAddress) return "Not connected"
    
    const now = Date.now()
    const faucetKey = `rialo_faucet_${wagmiAddress}`
    const faucetHistory = JSON.parse(localStorage.getItem(faucetKey) || '[]')
    
    // Filter history for last 24h
    const recentUsage = faucetHistory.filter((ts: number) => now - ts < 24 * 60 * 60 * 1000)
    
    if (recentUsage.length >= 2) {
      return "Faucet limit reached (2 per day)"
    }
    
    setRloBalance(prev => prev + 1000)
    localStorage.setItem(faucetKey, JSON.stringify([...recentUsage, now]))
    return null
  }

  const activateProtection = (currency: string, collateralAmount: number, protectionLevel: number) => {
    if (rloBalance < collateralAmount) return
    
    setRloBalance(prev => prev - collateralAmount)
    
    const currentRate = rates?.[currency as keyof ExchangeRates] as number || 1.0
    const borrowedAmount = collateralAmount * (protectionLevel / 100)
    
    const newPosition: ShieldPosition = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      currency,
      collateralAmount,
      protectionLevel,
      borrowedAmount,
      entryRate: currentRate,
      healthFactor: (collateralAmount / (borrowedAmount || 1)) * 0.8 + 1,
      active: true,
      createdAt: Date.now()
    }
    
    setPositions(prev => [newPosition, ...prev])
    
    setPoolMetrics(prev => ({
      ...prev,
      reservedFunds: prev.reservedFunds + borrowedAmount,
      availableFunds: prev.availableFunds - borrowedAmount
    }))
  }

  const addLiquidity = (rloAmount: number) => {
    if (rloBalance < rloAmount || rloAmount < 1000) return
    
    const now = Date.now()
    const unlockDate = now + 7 * 24 * 60 * 60 * 1000 // 7 days from now
    
    setRloBalance(prev => prev - rloAmount)
    
    const newLP: UserLP = {
      amount: (userLP?.amount || 0) + rloAmount,
      rewards: userLP?.rewards || 0,
      unlockDate: unlockDate,
      address: wagmiAddress || ''
    }
    
    setUserLP(newLP)
    
    setPoolMetrics(prev => ({
      ...prev,
      totalFunds: prev.totalFunds + rloAmount,
      availableFunds: prev.availableFunds + rloAmount,
      totalLPCapital: prev.totalLPCapital + rloAmount
    }))
  }

  return (
    <AppContext.Provider value={{
      isConnected: !!wagmiIsConnected,
      address: wagmiAddress || null,
      rloBalance,
      usdcBalance,
      positions,
      rates,
      poolMetrics,
      userLP,
      faucet,
      activateProtection,
      addLiquidity,
      refreshRates,
      faucetLimitReached: false // We use the return value of faucet() to show status
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
