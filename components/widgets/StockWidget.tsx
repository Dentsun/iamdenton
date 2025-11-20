
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StockWidget: React.FC = () => {
  const stocks = [
    { symbol: 'BTC', price: '94,320', change: '+2.4%', up: true },
    { symbol: 'ETH', price: '3,120', change: '+1.1%', up: true },
    { symbol: 'S&P 500', price: '5,980', change: '+0.5%', up: true },
    { symbol: 'NVDA', price: '142.50', change: '+3.2%', up: true },
  ];

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
