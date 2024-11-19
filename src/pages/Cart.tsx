import { CartItem } from '../components/features/cart/CartItem';
import { CartSummary } from '../components/features/cart/CartSummary';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { items } = useCart();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
      <div className="space-y-4">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
};
