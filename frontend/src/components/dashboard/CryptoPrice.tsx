// src/components/dashboard/CryptoPrice.tsx
'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoData {
  price: number;
  change24h: number;
  symbol: string;
}

export const CryptoPrice = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData>({
    price: 0,
    change24h: 0,
    symbol: 'BTC'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        setCryptoData({
          price: data.bitcoin.usd,
          change24h: data.bitcoin.usd_24h_change,
          symbol: 'BTC'
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

  return (
    <section className="h-[400px] border rounded-lg bg-white shadow-sm">
      <div className="h-full flex flex-col">
        <h2 className="text-2xl font-semibold px-6 py-4 border-b flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Crypto Price
        </h2>
        <div className="flex-1 p-6 flex flex-col justify-center items-center">
          {loading ? (
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="h-8 w-40 bg-gray-200 rounded"></div>
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <>
              <div className="text-4xl font-bold mb-4">
                ${cryptoData.price.toLocaleString()}
              </div>
              <div className={`flex items-center ${
                cryptoData.change24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {cryptoData.change24h >= 0 ? (
                  <TrendingUp className="w-5 h-5 mr-2" />
                ) : (
                  <TrendingDown className="w-5 h-5 mr-2" />
                )}
                <span className="text-lg">
                  {cryptoData.change24h.toFixed(2)}%
                </span>
              </div>
              <div className="mt-2 text-gray-500">
                24h Change
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};