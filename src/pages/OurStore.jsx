import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/catalog';
import { filterProducts } from '../lib/shop';
import ProductCard from '../components/ProductCard';
import './OurStore.css';

export default function OurStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStock = searchParams.get('inStock') === 'true';
  const sort = searchParams.get('sort') || 'featured';
  const filtered = useMemo(() => filterProducts(products, {
    query, category, minPrice, maxPrice, inStock, sort,
  }), [query, category, minPrice, maxPrice, inStock, sort]);
  const hasFilters = Boolean(query || category || minPrice || maxPrice || inStock);

  function updateFilter(key, value) {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous);
      if (value === '' || value === false || value == null) next.delete(key);
      else next.set(key, String(value));
      return next;
    }, { replace: true });
  }

  function clearPrices() {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous);
      next.delete('minPrice');
      next.delete('maxPrice');
      return next;
    });
  }

  return (
    <div className="catalog-page">
      <header className="page-heading container catalog-heading">
        <div>
          <p className="eyebrow">Dibuat dengan rasa</p>
          <h1>Temukan yang <em>berarti.</em></h1>
          <p className="muted">Hadiah kecil, kenangan personal, dan hal-hal manis untuk dirayakan.</p>
        </div>
        <span className="catalog-heading-note">Koleksi Jemari Ragil<br />Untuk momen sehari-hari.</span>
      </header>

      <section className="container catalog-layout" aria-label="Katalog produk">
        <aside className="catalog-filters" aria-label="Saring koleksi">
          <div className="catalog-filter-heading">
            <h2>Saring koleksi</h2>
            <button type="button" className="button-quiet" onClick={() => setSearchParams({})} disabled={!hasFilters && sort === 'featured'}>Reset</button>
          </div>
          <label className="form-field catalog-search">
            <span>Cari sesuatu</span>
            <input type="search" value={query} onChange={event => updateFilter('q', event.target.value)} placeholder="Buket, polaroid, hadiah…" autoComplete="off" />
          </label>
          <fieldset className="catalog-fieldset">
            <legend>Kategori</legend>
            <label className="catalog-radio">
              <input type="radio" name="category" checked={!category} onChange={() => updateFilter('category', '')} />
              <span>Semua koleksi</span><small>{products.length}</small>
            </label>
            {categories.map(item => (
              <label className="catalog-radio" key={item.id}>
                <input type="radio" name="category" checked={category === item.id} onChange={() => updateFilter('category', item.id)} />
                <span>{item.name}</span><small>{products.filter(product => product.category === item.id).length}</small>
              </label>
            ))}
          </fieldset>
          <fieldset className="catalog-fieldset">
            <legend>Rentang harga</legend>
            <div className="catalog-price-range">
              <label className="form-field"><span>Minimum (Rp)</span><input type="number" min="0" step="1000" inputMode="numeric" value={minPrice} onChange={event => updateFilter('minPrice', event.target.value)} placeholder="0" /></label>
              <label className="form-field"><span>Maksimum (Rp)</span><input type="number" min="0" step="1000" inputMode="numeric" value={maxPrice} onChange={event => updateFilter('maxPrice', event.target.value)} placeholder="Bebas" /></label>
            </div>
            {minPrice !== '' && maxPrice !== '' && Number(minPrice) > Number(maxPrice) && <p className="catalog-filter-hint">Harga minimum melebihi maksimum. Sesuaikan rentangnya untuk melihat hasil.</p>}
          </fieldset>
          <label className="catalog-stock-check"><input type="checkbox" checked={inStock} onChange={event => updateFilter('inStock', event.target.checked ? 'true' : '')} /><span>Hanya yang tersedia</span></label>
          <p className="catalog-aside-note">Setiap pilihan punya cerita.<br />Mulai dari yang paling kamu suka.</p>
        </aside>

        <div className="catalog-results">
          <div className="catalog-toolbar">
            <p role="status" aria-live="polite"><strong>{filtered.length}</strong> dari {products.length} karya{query ? ` untuk “${query}”` : ''}</p>
            <label className="catalog-sort"><span>Urutkan</span><select value={sort} onChange={event => updateFilter('sort', event.target.value)}><option value="featured">Pilihan kami</option><option value="price-asc">Harga terendah</option><option value="price-desc">Harga tertinggi</option><option value="name-asc">Nama A–Z</option><option value="rating">Rating tertinggi</option></select></label>
          </div>
          {hasFilters && <div className="catalog-active-filters" aria-label="Filter aktif">
            {query && <button type="button" onClick={() => updateFilter('q', '')}>Pencarian: {query}<span aria-hidden="true"> ×</span><span className="sr-only">, hapus filter</span></button>}
            {category && <button type="button" onClick={() => updateFilter('category', '')}>{categories.find(item => item.id === category)?.name || category}<span aria-hidden="true"> ×</span><span className="sr-only">, hapus kategori</span></button>}
            {(minPrice || maxPrice) && <button type="button" onClick={clearPrices}>Rentang harga<span aria-hidden="true"> ×</span><span className="sr-only">, hapus filter</span></button>}
            {inStock && <button type="button" onClick={() => updateFilter('inStock', '')}>Tersedia<span aria-hidden="true"> ×</span><span className="sr-only">, hapus filter</span></button>}
          </div>}
          {filtered.length ? <div className="catalog-product-grid">{filtered.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state catalog-empty"><span className="eyebrow">Belum ketemu?</span><h2>Masih ada pilihan lainnya.</h2><p>Coba kata kunci yang lebih singkat atau longgarkan filter koleksimu.</p><button type="button" className="button" onClick={() => setSearchParams({})}>Lihat semua koleksi</button></div>}
        </div>
      </section>
    </div>
  );
}
