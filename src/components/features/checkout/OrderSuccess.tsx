// src/components/features/checkout/OrderSuccess.tsx
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

export const OrderSuccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Card className="max-w-lg mx-auto mt-8 text-center p-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      <div className="space-x-4">
        <Link to="/orders">
          <Button>View Orders</Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">Continue Shopping</Button>
        </Link>
      </div>
    </Card>
  );
};
