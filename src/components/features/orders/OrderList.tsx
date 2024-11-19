// src/components/features/orders/OrderList.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useOrders } from '../../../hooks/useOrders';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { CartItem } from '../../../types';

export const OrderList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orders, deleteOrder } = useOrders(user?.id || 0);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/orders' } });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      {orders.map(order => (
        <Card key={order.id} className="p-4">
          <div className="flex justify-between mb-4">
            <div>
              <span className="font-medium">Order #{order.id}</span>
              <span className="text-gray-600 ml-4">
                {new Date(order.date).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className={`px-2 py-1 rounded text-sm ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {order.items.map((item: CartItem) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={() => deleteOrder(order.id)}
            className="mt-4"
          >
            Delete Order
          </Button>
        </Card>
      ))}
    </div>
  );
};
