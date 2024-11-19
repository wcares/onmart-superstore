// src/components/features/cart/CartPage.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { Button } from '../../common/Button';
import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { OrderType } from '../../../types';

export const CartPage = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    // Create new order
    const newOrder: OrderType = {
      id: Date.now(),
      userId: user.id,
      items: items,
      total,
      date: new Date().toISOString(),
      status: 'pending'
    };

    // Get existing orders from localStorage
    const existingOrders: OrderType[] = JSON.parse(localStorage.getItem('orders') || '[]');

    // Add new order
    const updatedOrders = [...existingOrders, newOrder];

    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Clear cart and navigate to success page
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
          <Link to="/" className="text-blue-600 hover:underline mt-2">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-4">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Items ({items.length})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full mt-4"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};