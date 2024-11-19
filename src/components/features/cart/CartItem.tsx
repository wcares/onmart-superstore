// src/components/features/cart/CartItem.tsx
import { useCart } from '../../../context/CartContext';
import { Button } from '../../common/Button';
import { CartItem as CartItemType } from '../../../types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded"></div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 border rounded p-1"
        />
        <Button
          variant="secondary"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
