
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Stock {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
}

const StockWidget: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'BTC', price: '94,320', change: '+2.4%', up: true },
    { symbol: 'ETH', price: '3,120', change: '+1.1%', up: true },
    { symbol: 'S&P 500', price: '5,980', change: '+0.5%', up: true },
    { symbol: 'NVDA', price: '142.50', change: '+3.2%', up: true },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMarketData = async () => {
    try {
      // Fetch crypto prices from CoinGecko (free, no API key needed)
      const cryptoResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
      );
      const cryptoData = await cryptoResponse.json();

      // Fetch stock data from Financialmodelingprep (free tier)
      const stockResponse = await fetch(
        'https://financialmodelingprep.com/api/v3/quote/SPY,NVDA?apikey=demo'
      );
      const stockData = await stockResponse.json();

      const updatedStocks: Stock[] = [
        {
          symbol: 'BTC',
          price: cryptoData.bitcoin?.usd ? `${Math.round(cryptoData.bitcoin.usd).toLocaleString()}` : '94,320',
          change: cryptoData.bitcoin?.usd_24h_change
            ? `${cryptoData.bitcoin.usd_24h_change > 0 ? '+' : ''}${cryptoData.bitcoin.usd_24h_change.toFixed(1)}%`
            : '+2.4%',
          up: cryptoData.bitcoin?.usd_24h_change ? cryptoData.bitcoin.usd_24h_change > 0 : true
        },
        {
          symbol: 'ETH',
          price: cryptoData.ethereum?.usd ? `${Math.round(cryptoData.ethereum.usd).toLocaleString()}` : '3,120',
          change: cryptoData.ethereum?.usd_24h_change
            ? `${cryptoData.ethereum.usd_24h_change > 0 ? '+' : ''}${cryptoData.ethereum.usd_24h_change.toFixed(1)}%`
            : '+1.1%',
          up: cryptoData.ethereum?.usd_24h_change ? cryptoData.ethereum.usd_24h_change > 0 : true
        },
        {
          symbol: 'S&P 500',
          price: stockData[0]?.price ? `${Math.round(stockData[0].price).toLocaleString()}` : '5,980',
          change: stockData[0]?.changesPercentage
            ? `${stockData[0].changesPercentage > 0 ? '+' : ''}${stockData[0].changesPercentage.toFixed(1)}%`
            : '+0.5%',
          up: stockData[0]?.changesPercentage ? stockData[0].changesPercentage > 0 : true
        },
        {
          symbol: 'NVDA',
          price: stockData[1]?.price ? `${stockData[1].price.toFixed(2)}` : '142.50',
          change: stockData[1]?.changesPercentage
            ? `${stockData[1].changesPercentage > 0 ? '+' : ''}${stockData[1].changesPercentage.toFixed(1)}%`
            : '+3.2%',
          up: stockData[1]?.changesPercentage ? stockData[1].changesPercentage > 0 : true
        }
      ];

      setStocks(updatedStocks);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    // Update every hour
    const interval = setInterval(fetchMarketData, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[250px] bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-2xl p-6 flex flex-col pointer-events-auto hover:bg-white/80 transition-colors cursor-default select-none">
      <div className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b-2 border-gray-500/30 pb-2 text-center">Market Watch</div>
      <div className="flex flex-col gap-4">
        {stocks.map((s) => (
          <div key={s.symbol} className="flex flex-col border-b border-gray-300/50 pb-2 last:border-0">
            <div className="flex justify-between items-baseline">
               <span className="font-bold text-gray-900 text-xl">{s.symbol}</span>
               <span className={`text-sm font-bold flex items-center ${s.up ? 'text-green-700' : 'text-red-700'}`}>
                 {s.up ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                 {s.change}
               </span>
            </div>
            <span className="text-gray-800 font-mono text-lg">{s.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StockWidget;
