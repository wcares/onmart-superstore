// src/components/features/cart/CartSummary.tsx
import { useCart } from '../../../context/CartContext';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

export const CartSummary = () => {
  const { total, items, clearCart } = useCart();

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Items:</span>
          <span>{items.length}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Button className="w-full">Checkout</Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>
    </Card>
  );
};