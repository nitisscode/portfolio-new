import { createContext, useContext, type ReactNode } from 'react'
import { getStaticPortfolio } from '../api/client'
import type { PortfolioPayload } from '../types/portfolio'

type PortfolioContextValue = PortfolioPayload & {
  loading: boolean
  fromApi: boolean
  error: string | null
  refresh: () => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const data = getStaticPortfolio()

  return (
    <PortfolioContext.Provider
      value={{
        ...data,
        loading: false,
        fromApi: false,
        error: null,
        refresh: async () => undefined,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) {
    throw new Error('usePortfolio must be used within PortfolioProvider')
  }
  return ctx
}
