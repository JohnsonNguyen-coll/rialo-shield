import React from 'react'
import Link from 'next/link'
import { Shield, Zap, Globe, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-[#E6E4D5] pt-10 pb-6 px-6 w-full font-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-3 transition-transform hover:scale-105">
              <img src="/favicon.jpg" alt="Logo" className="w-[90px] h-[66px] object-contain invert brightness-200" />
            </Link>
            <p className="text-[#E6E4D5]/60 text-[11px] leading-relaxed mb-4">
              The first decentralized FX protection protocol. Safeguard your purchasing power with automated, collateral-backed hedging.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://x.com/Johson_Nguyen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5"
              >
                <MessageCircle className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Protocol Column */}
          <div>
            <h4 className="text-white font-bold text-base font-footer mb-5">Protocol</h4>
            <ul className="space-y-2 text-[12px] font-medium">
              <li><Link href="/#features" className="text-[#E6E4D5]/60 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#protection" className="text-[#E6E4D5]/60 hover:text-white transition-colors">Shield Mechanisms</Link></li>
              <li><Link href="/#liquidity" className="text-[#E6E4D5]/60 hover:text-white transition-colors">Liquidity Pools</Link></li>
              <li><Link href="/docs" className="text-[#E6E4D5]/60 hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Ecosystem Column */}
          <div>
            <h4 className="text-white font-bold text-base font-footer mb-5">Ecosystem</h4>
            <ul className="space-y-2 text-[12px] font-medium">
              <li><Link href="/dashboard" className="text-[#E6E4D5]/60 hover:text-white transition-colors">Launch App</Link></li>
              <li><a href="#" className="text-[#E6E4D5]/60 hover:text-white transition-colors">Governance</a></li>
              <li><a href="#" className="text-[#E6E4D5]/60 hover:text-white transition-colors">Incentives</a></li>
              <li><a href="#" className="text-[#E6E4D5]/60 hover:text-white transition-colors">Bug Bounty</a></li>
            </ul>
          </div>

          {/* Security Column */}
          <div>
            <h4 className="text-white font-bold text-base font-footer mb-5">Security</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-3 text-green-500" />
                </div>
                <span className="text-[10px] font-bold">On-Chain Verified</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Globe className="w-3 text-blue-500" />
                </div>
                <span className="text-[10px] font-bold">Decentralized Oracles</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Zap className="w-3 text-yellow-500" />
                </div>
                <span className="text-[10px] font-bold">Smart Resolution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] font-bold uppercase tracking-[0.2em] text-[#E6E4D5]/40">
          <p>© 2026 Rialo Shield Protocol • Built for Resilience</p>
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Term of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
