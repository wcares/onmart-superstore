import { Product } from '../../../types';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <div className="bg-gray-200 h-40 mb-2 rounded group-hover:bg-gray-300"></div>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-blue-600">${product.price}</p>
        <div className="relative">
          <Button className="mt-2 w-full group">
            <span className="group-hover:hidden">Add to Cart</span>
            <span className="hidden group-hover:inline">🛒 Add to Cart</span>
          </Button>
          {product.stock < 10 && (
            <div className="absolute -top-2 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Low Stock!
            </div>
          )}
        </div>
      </Card>
    );
  };