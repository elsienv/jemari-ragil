import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/catalog';
import { filterProducts } from '../lib/filterProducts';

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStock = searchParams.get('inStock') === 'true';
  const sort = searchParams.get('sort') || 'featured';
  const filtered = useMemo(
    () =>
      filterProducts(products, {
        query,
        category,
        minPrice,
        maxPrice,
        inStock,
        sort,
      }),
    [query, category, minPrice, maxPrice, inStock, sort],
  );
  const hasFilters = Boolean(query || category || minPrice || maxPrice || inStock);

  function updateFilter(key, value) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value === '' || value === false || value == null) next.delete(key);
        else next.set(key, String(value));
        return next;
      },
      { replace: true },
    );
  }

  function clearPrices() {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.delete('minPrice');
      next.delete('maxPrice');
      return next;
    });
  }

  function resetFilters() {
    setSearchParams({});
  }

  return {
    query,
    category,
    minPrice,
    maxPrice,
    inStock,
    sort,
    filtered,
    hasFilters,
    updateFilter,
    clearPrices,
    resetFilters,
  };
}
