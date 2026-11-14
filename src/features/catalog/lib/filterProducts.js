export function filterProducts(
  products,
  {
    query = '',
    category = '',
    minPrice = '',
    maxPrice = '',
    inStock = false,
    sort = 'featured',
  } = {},
) {
  const search = String(query).trim().toLocaleLowerCase('id');
  const hasMin = minPrice !== '' && minPrice != null && Number.isFinite(Number(minPrice));
  const hasMax = maxPrice !== '' && maxPrice != null && Number.isFinite(Number(maxPrice));
  const result = products.filter(
    (product) =>
      (!search ||
        `${product.title} ${product.categoryName} ${product.description}`
          .toLocaleLowerCase('id')
          .includes(search)) &&
      (!category || category === 'all' || product.category === category) &&
      (!hasMin || product.price >= Number(minPrice)) &&
      (!hasMax || product.price <= Number(maxPrice)) &&
      (!inStock || product.stock > 0),
  );
  const comparisons = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => a.title.localeCompare(b.title, 'id'),
    rating: (a, b) => b.rating - a.rating,
    featured: (a, b) => Number(b.featured) - Number(a.featured),
  };
  return result.sort(comparisons[sort] || comparisons.featured);
}
