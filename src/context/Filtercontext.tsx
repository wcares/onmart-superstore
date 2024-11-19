// src/context/FilterContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  selectedCategories: string[];
  priceRange: number;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setPriceRange: React.Dispatch<React.SetStateAction<number>>;
}

const FilterContext = createContext<FilterContextType | null>(null);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(1000);

  return (
    <FilterContext.Provider
      value={{
        selectedCategories,
        priceRange,
        setSelectedCategories,
        setPriceRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};