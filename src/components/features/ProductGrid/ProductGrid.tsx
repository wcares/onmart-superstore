// src/components/features/products/ProductGrid.tsx
import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { ProductCard } from './ProductCard';
import { MOCK_PRODUCTS } from '../../../data/mockProducts';
import { useFilters } from '../../../context/Filtercontext';

export const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const { selectedCategories, priceRange } = useFilters();
  const productsPerPage = 25;

  useEffect(() => {
    let result = [...MOCK_PRODUCTS];

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Apply price filter
    result = result.filter(product => product.price <= priceRange);

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategories, priceRange]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900">No Products Found</h3>
        <p className="mt-2 text-gray-500">
          Try adjusting your filters or price range to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Featured Banner */}
      <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative mb-8">
        <img 
          src="https://picsum.photos/1200/400" 
          alt="Featured" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="text-white p-8">
            <h2 className="text-4xl font-bold mb-4">Special Offers</h2>
            <p className="text-xl mb-4">Get up to 50% off on selected items</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Sort by:</span>
          <select 
            className="border rounded-md px-2 py-1"
            onChange={(e) => {
              const products = [...filteredProducts];
              switch (e.target.value) {
                case 'price-asc':
                  products.sort((a, b) => a.price - b.price);
                  break;
                case 'price-desc':
                  products.sort((a, b) => b.price - a.price);
                  break;
                case 'name':
                  products.sort((a, b) => a.name.localeCompare(b.name));
                  break;
              }
              setFilteredProducts(products);
            }}
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded ${
                    currentPage === pageNum 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 transition-colors'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            Last
          </button>
        </div>
      )}

      {/* Results Count - Bottom */}
      <div className="text-center text-gray-600 mt-4">
        Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
      </div>
    </div>
  );
};