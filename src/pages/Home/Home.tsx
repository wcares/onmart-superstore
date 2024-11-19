import { ProductGrid } from "../../components/features/ProductGrid";
import { Sidebar } from "../../components/layout/Sidebar";

export const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-[250px_1fr] gap-8">
        <Sidebar />
        <ProductGrid />
      </div>
    </div>
  );
};