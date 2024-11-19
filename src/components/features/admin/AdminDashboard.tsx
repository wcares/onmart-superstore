// src/components/features/admin/AdminDashboard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Card } from '../../common/Card';
import { MOCK_PRODUCTS } from '../../../data/mockProducts';


export const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!user || user.role !== 'admin') {
        navigate('/');
      }
    }, [user, navigate]);
  
    if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Stock Management</h1>
      
      <div className="space-y-6">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
            <div className="space-y-4">
              {MOCK_PRODUCTS.map(product => (
                <div key={product.id} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">Category: {product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        product.stock < 10 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {product.stock} units in stock
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        product.stock < 10 
                          ? 'bg-red-500' 
                          : product.stock < 20 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(product.stock / 50) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Order Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">Pending Orders</h3>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">Completed Orders</h3>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="font-medium text-yellow-800">Low Stock Items</h3>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};