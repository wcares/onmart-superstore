// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { CartPage } from './components/features/cart/CartPage';
import { LoginForm } from './components/features/auth/LoginForm';
import { AdminLoginForm } from './components/features/auth/AdminLoginForm';
import { OrdersPage } from './components/features/orders/OrderPage';
import { OrderSuccess } from './components/features/checkout/OrderSuccess';
import { AdminDashboard } from './components/features/admin/AdminDashboard';
import { Link } from 'react-router-dom';
import { FilterProvider } from './context/Filtercontext';

// Protected Route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Layout component
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/admin-login" element={<AdminLoginForm />} />

                {/* Protected Routes */}
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <ProtectedRoute>
                      <OrderSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route
                  path="*"
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                      <p className="text-gray-600 mb-4">
                        The page you're looking for doesn't exist.
                      </p>
                      <Link to="/" className="text-blue-600 hover:underline">
                        Go back home
                      </Link>
                    </div>
                  }
                />
              </Routes>
            </Layout>
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;