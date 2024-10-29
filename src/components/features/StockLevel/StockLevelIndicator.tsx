import { Product } from '../../../types';
import { Card } from '../../common/Card';
import { useState } from 'react';

interface StockLevelIndicatorProps {
  products: Product[];
}

export const StockLevelIndicator = ({ products }: StockLevelIndicatorProps) => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
  
    const getStockColor = (stock: number) => {
      if (stock < 10) return 'bg-red-600';
      if (stock < 20) return 'bg-yellow-600';
      return 'bg-green-600';
    };
  
    const getStockStatus = (stock: number) => {
      if (stock < 10) return 'Low Stock';
      if (stock < 20) return 'Moderate Stock';
      return 'Good Stock';
    };
  
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
        <div className="space-y-4">
          {products.map(product => (
            <div 
              key={product.id} 
              className="space-y-1 relative"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex justify-between">
                <span>{product.name}</span>
                <span className={`${
                  product.stock < 10 ? 'text-red-600 font-semibold' : ''
                }`}>
                  {product.stock} units
                </span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStockColor(product.stock)} transition-all duration-500`}
                  style={{ width: `${(product.stock / 30) * 100}%` }}
                />
              </div>
              {hoveredId === product.id && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  {getStockStatus(product.stock)}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    );
  };