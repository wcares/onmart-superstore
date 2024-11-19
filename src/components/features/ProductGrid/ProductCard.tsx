// src/components/features/products/ProductCard.tsx
import { Product } from '../../../types';
import { useCart } from '../../../context/CartContext';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.stock < 10 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Low Stock!
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600 text-xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-600">
            {product.stock} in stock
          </span>
        </div>
        <Button
          onClick={() => addToCart(product)}
          className="w-full group"
          disabled={product.stock === 0}
        >
          <span className="group-hover:hidden">Add to Cart</span>
          <span className="hidden group-hover:inline">🛒 Add to Cart</span>
        </Button>
      </div>
    </Card>
  );
};
