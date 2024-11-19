// src/components/layout/Sidebar.tsx

import { useFilters } from "../../../context/Filtercontext";
import { PRODUCT_CATEGORIES } from "../../../data/mockProducts";
import { Card } from "../../common/Card";

export const Sidebar = () => {
  const { 
    selectedCategories, 
    setSelectedCategories, 
    priceRange, 
    setPriceRange 
  } = useFilters();

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  };

  const handlePriceChange = (value: number) => {
    setPriceRange(value);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(1000);
  };

  return (
    <Card className="p-4 space-y-6 sticky top-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {PRODUCT_CATEGORIES.map(category => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min={0}
                max={1000}
                value={priceRange}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span>${priceRange}</span>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || priceRange < 1000) && (
            <div>
              <h3 className="font-medium mb-2">Active Filters</h3>
              <div className="space-y-2">
                {selectedCategories.map(category => (
                  <div
                    key={category}
                    className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2"
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {priceRange < 1000 && (
                  <div className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    Up to ${priceRange}
                    <button
                      onClick={() => setPriceRange(1000)}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};