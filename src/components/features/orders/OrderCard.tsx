// src/components/features/orders/OrderCard.tsx
import { Order, CartItem } from '../../../types';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

interface OrderCardProps {
  order: Order;
  onDelete: (orderId: number) => void;
}

export const OrderCard = ({ order, onDelete }: OrderCardProps) => {
  return (
    <Card className="mb-4">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h3 className="font-medium">Order #{order.id}</h3>
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
          </div>
          <Button
            variant="secondary"
            onClick={() => onDelete(order.id)}
            className="text-sm"
          >
            Delete Order
          </Button>
        </div>
        
        <div className="space-y-2">
          {order.items.map((item: CartItem) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} × {item.quantity}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
