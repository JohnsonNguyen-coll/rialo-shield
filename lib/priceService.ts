/**
 * Price Service - Fetch real-time FX rates from API
 */

const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/USD'
const FRANKFURTER_API = 'https://api.frankfurter.app'

export interface ExchangeRates {
  BRL: number // Brazilian Real
  MXN: number // Mexican Peso
  EUR: number // Euro
  lastUpdated: number
}

export interface HistoricalPrice {
  date: string
  price: number
}

/**
 * Fetch real-time exchange rates from ExchangeRate-API
 * Returns rates as USD per 1 unit of currency (e.g., 1 BRL = 0.2 USD)
 */
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch(EXCHANGE_RATE_API)
    const data = await response.json()

    // ExchangeRate-API returns rates as USD per 1 unit of foreign currency
    // We need to invert: 1 USD = X BRL, so 1 BRL = 1/X USD
    const usdToBRL = data.rates.BRL || 5.0 // Fallback
    const usdToMXN = data.rates.MXN || 17.0 // Fallback
    const usdToEUR = data.rates.EUR || 0.92 // Fallback

    return {
      BRL: 1 / usdToBRL, // 1 BRL = X USD
      MXN: 1 / usdToMXN, // 1 MXN = X USD
      EUR: 1 / usdToEUR, // 1 EUR = X USD
      lastUpdated: Date.now(),
    }
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error)
    // Return fallback rates
    return {
      BRL: 0.2, // 1 BRL = 0.2 USD
      MXN: 0.06, // 1 MXN = 0.06 USD
      EUR: 1.1, // 1 EUR = 1.1 USD
      lastUpdated: Date.now(),
    }
  }
}

/**
 * Fetch historical exchange rates from Frankfurter API
 * @param currency The currency to fetch (BRL, MXN, EUR)
 * @param days Number of days of history
 */
export async function fetchHistoricalRates(currency: string, days: number = 14): Promise<HistoricalPrice[]> {
  try {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - days)

    const startDateStr = start.toISOString().split('T')[0]
    const endDateStr = end.toISOString().split('T')[0]

    // Frankfurter format: /2024-01-01..2024-01-10?from=BRL&to=USD
    const url = `${FRANKFURTER_API}/${startDateStr}..${endDateStr}?from=${currency}&to=USD`
    const response = await fetch(url)
    const data = await response.json()

    if (!data.rates) return []

    return Object.entries(data.rates).map(([date, rates]: [string, any]) => ({
      date,
      price: rates.USD as number
    }))
  } catch (error) {
    console.error(`Failed to fetch historical rates for ${currency}:`, error)
    return []
  }
}

/**
 * Convert exchange rate to 8 decimals format (for smart contract)
 * @param rate Exchange rate (e.g., 0.2 for BRL/USD)
 * @returns Rate in 8 decimals (e.g., 20000000)
 */
export function rateTo8Decimals(rate: number): bigint {
  return BigInt(Math.floor(rate * 1e8))
}

/**
 * Convert 8 decimals rate back to decimal
 * @param rate8Decimals Rate in 8 decimals
 * @returns Exchange rate as decimal
 */
export function rateFrom8Decimals(rate8Decimals: bigint): number {
  return Number(rate8Decimals) / 1e8
}



























