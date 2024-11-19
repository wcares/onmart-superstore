// src/components/features/orders/OrdersPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Card } from '../../common/Card';
import { OrderType } from '../../../types';

export const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/orders' } });
      return;
    }

    // Load orders from localStorage
    const allOrders: OrderType[] = JSON.parse(localStorage.getItem('orders') || '[]');
    // Filter orders for current user
    const userOrders = allOrders.filter(order => order.userId === user.id);
    setOrders(userOrders);
  }, [user, navigate]);

  const handleDeleteOrder = (orderId: number) => {
    // Get all orders
    const allOrders: OrderType[] = JSON.parse(localStorage.getItem('orders') || '[]');
    // Remove the specific order
    const updatedOrders = allOrders.filter(order => order.id !== orderId);
    // Save back to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    // Update state
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-600">You haven't placed any orders yet</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex space-x-4 mb-2">
                    <span className="font-medium">Order #{order.id}</span>
                    <span className="text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map(item => (
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
                </div>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete Order
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};