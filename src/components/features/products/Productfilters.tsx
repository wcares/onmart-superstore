// src/components/features/products/ProductFilters.tsx
import { useState } from 'react';

interface ProductFiltersProps {
  categories: string[];
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (price: number) => void;
  maxPrice: number;
}

export const ProductFilters = ({
  categories,
  onCategoryChange,
  onPriceChange,
  maxPrice
}: ProductFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(maxPrice);

  const handleCategoryChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onCategoryChange(updated);
  };

  const handlePriceChange = (value: number) => {
    setPriceRange(value);
    onPriceChange(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${priceRange}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
