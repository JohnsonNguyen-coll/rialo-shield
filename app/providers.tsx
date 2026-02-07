'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia, polygon, bsc, arbitrum, optimism, base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AppProvider } from '@/lib/AppContext'
import '@rainbow-me/rainbowkit/styles.css'

const rialoNetwork = {
  id: 1337,
  name: 'Rialo Network',
  nativeCurrency: { name: 'Rialo', symbol: 'RLO', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.rialo.network'] },
  },
  testnet: true,
} as const

const config = createConfig({
  chains: [rialoNetwork, mainnet, sepolia, polygon, bsc, arbitrum, optimism, base],
  transports: {
    [rialoNetwork.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#E6E4D5',
            accentColorForeground: 'black',
          })} 
          modalSize="compact"
        >
          <AppProvider>
            {children}
          </AppProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
