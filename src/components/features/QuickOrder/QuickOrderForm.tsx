import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { MOCK_PRODUCTS } from '../../../utils/constant';
import { useState } from 'react';

export const QuickOrderForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('1');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      // Reset form
      setSelectedProduct('');
      setQuantity('1');
    };
  
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-4">Quick Order Form</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Product</label>
            <select 
              className="w-full border p-2 rounded transition-colors hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="">Select a product</option>
              {MOCK_PRODUCTS.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Quantity</label>
            <input 
              type="number" 
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-2 rounded transition-colors hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block mb-1">Delivery Address</label>
            <textarea 
              className="w-full border p-2 rounded transition-colors hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={3}
              disabled={isSubmitting}
            ></textarea>
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              'Place Order'
            )}
          </Button>
        </form>
      </Card>
    );
  };