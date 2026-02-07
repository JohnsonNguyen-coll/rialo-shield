'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { MockProvider } from '@/lib/mockContext'
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
  chains: [rialoNetwork, mainnet, sepolia],
  transports: {
    [rialoNetwork.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} modalSize="compact">
          <MockProvider>
            {children}
          </MockProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
