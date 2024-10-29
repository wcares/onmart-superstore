import { MOCK_PRODUCTS } from '../../../utils/constant';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {MOCK_PRODUCTS.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};