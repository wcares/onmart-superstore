import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Sidebar } from '../../components/layout/Sidebar';
import { ProductGrid } from '../../components/features/ProductGrid';
import { StockLevelIndicator } from '../../components/features/StockLevel';
import { QuickOrderForm } from '../../components/features/QuickOrder';
import { MOCK_PRODUCTS } from '../../utils/constant';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-[250px_1fr] gap-6">
          <Sidebar />
          <div className="space-y-6">
            <ProductGrid />
            <StockLevelIndicator products={MOCK_PRODUCTS} />
            <QuickOrderForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};