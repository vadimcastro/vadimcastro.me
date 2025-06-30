// src/components/dashboard/CryptoPrice.tsx
'use client';

import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoData {
  price: number;
  change24h: number;
  symbol: string;
  name: string;
}

interface CryptoState {
  bitcoin: CryptoData;
  solana: CryptoData;
}

export const CryptoPrice = () => {
  const [cryptoData, setCryptoData] = useState<CryptoState>({
    bitcoin: { price: 0, change24h: 0, symbol: 'BTC', name: 'Bitcoin' },
    solana: { price: 0, change24h: 0, symbol: 'SOL', name: 'Solana' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        setCryptoData({
          bitcoin: {
            price: data.bitcoin.usd,
            change24h: data.bitcoin.usd_24h_change,
            symbol: 'BTC',
            name: 'Bitcoin'
          },
          solana: {
            price: data.solana.usd,
            change24h: data.solana.usd_24h_change,
            symbol: 'SOL',
            name: 'Solana'
          }
        });
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const renderCrypto = (crypto: CryptoData) => (
    <div key={crypto.symbol} className="flex items-center space-x-1 md:space-x-2">
      <div className="flex items-center space-x-1">
        <span className="text-xs font-semibold text-gray-700">{crypto.symbol}</span>
        <span className="text-xs md:text-sm font-bold text-gray-900">
          ${crypto.price.toLocaleString()}
        </span>
      </div>
      <div className={`flex items-center space-x-0.5 ${
        crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {crypto.change24h >= 0 ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        <span className="text-xs font-medium">
          {crypto.change24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );

  return (
    <section className="border rounded-lg bg-white shadow-sm">
      <div className="px-3 md:px-6 py-3 border-b border-gray-200 flex items-center bg-gray-50">
        <Wallet className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0" />
        
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto flex-1 justify-center">
          {loading ? (
            <div className="animate-pulse flex gap-2 md:gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-8 bg-gray-200 rounded"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
                <div className="h-3 w-8 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-8 bg-gray-200 rounded"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
                <div className="h-3 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              {renderCrypto(cryptoData.bitcoin)}
              {renderCrypto(cryptoData.solana)}
            </>
          )}
        </div>
      </div>
    </section>
  );
};