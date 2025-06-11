import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [strategies, setStrategies] = useState([
    { 
      id: 1, 
      name: 'MA Crossover Strategy', 
      pnl: 4250.75, 
      change: 2.35, 
      positive: true 
    },
    { 
      id: 2, 
      name: 'RSI Divergence', 
      pnl: -1250.50, 
      change: -0.85, 
      positive: false 
    },
    { 
      id: 3, 
      name: 'Bollinger Breakout', 
      pnl: 7820.25, 
      change: 5.12, 
      positive: true 
    },
    { 
      id: 4, 
      name: 'Momentum Scalping', 
      pnl: 1545.80, 
      change: 1.25, 
      positive: true 
    },
    { 
      id: 5, 
      name: 'Volume Profile Strategy', 
      pnl: -850.35, 
      change: -0.62, 
      positive: false 
    }
  ]);
  
  const refreshData = () => {
    // Simulate data refresh
    setLastUpdate(new Date());
    
    // Update some random values to simulate live data
    setStrategies(prev => 
      prev.map(strategy => ({
        ...strategy,
        pnl: strategy.pnl + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 100,
        change: strategy.change + (Math.random() > 0.5 ? 0.1 : -0.1) * Math.random(),
        positive: strategy.pnl > 0
      }))
    );
  };
  
  // Auto refresh every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(refreshData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Strategy PnL Dashboard</h1>
        
        <div className="flex items-center mt-4 md:mt-0 space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <button 
            onClick={refreshData}
            className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total PnL</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{strategies.reduce((sum, s) => sum + s.pnl, 0).toFixed(2)}
            </span>
            <span className={`ml-2 text-sm font-medium ${
              strategies.reduce((sum, s) => sum + s.pnl, 0) > 0 
                ? 'text-success-600 dark:text-success-400'
                : 'text-error-600 dark:text-error-400'
            }`}>
              {strategies.reduce((sum, s) => sum + s.change, 0).toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Winning Strategies</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {strategies.filter(s => s.positive).length}
            </span>
            <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              of {strategies.length} strategies
            </span>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Best Strategy</h3>
          {strategies.length > 0 && (
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {strategies.reduce((best, s) => best.pnl > s.pnl ? best : s, strategies[0]).name}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-success-600 dark:text-success-400">
                  ₹{strategies.reduce((best, s) => best.pnl > s.pnl ? best : s, strategies[0]).pnl.toFixed(2)}
                </span>
                <span className="ml-2 text-sm font-medium text-success-600 dark:text-success-400">
                  {strategies.reduce((best, s) => best.pnl > s.pnl ? best : s, strategies[0]).change.toFixed(2)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Strategy Performance</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search strategy"
              className="input py-1 px-3 text-sm w-56"
            />
          </div>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-head-cell">Strategy Name</th>
                <th className="table-head-cell text-right">PnL (₹)</th>
                <th className="table-head-cell text-right">Change (%)</th>
                <th className="table-head-cell text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {strategies.map((strategy) => (
                <tr key={strategy.id} className="table-row">
                  <td className="table-cell font-medium">{strategy.name}</td>
                  <td className={`table-cell text-right font-medium ${strategy.positive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
                    ₹{strategy.pnl.toFixed(2)}
                  </td>
                  <td className={`table-cell text-right ${strategy.positive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
                    {strategy.change.toFixed(2)}%
                  </td>
                  <td className="table-cell text-right">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-10 dark:bg-opacity-20 
                      ${strategy.positive 
                        ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300' 
                        : 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-300'
                      }">
                      {strategy.positive ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {strategy.positive ? 'Profitable' : 'Loss'}
                    </div>
                  </td>
                </tr>
              ))}
              
              {strategies.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500 dark:text-gray-400">
                    No strategies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;