// src/components/features/auth/AdminLoginForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

export const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      // Check if the logged-in user is an admin
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Access denied. Admin privileges required.');
        localStorage.removeItem('user');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Login as Admin
        </Button>
      </form>
    </Card>
  );
};