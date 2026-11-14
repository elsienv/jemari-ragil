process.env.NODE_ENV = 'production';

const { createServer } = await import('vite');
const React = await import('react');
const { renderToString } = await import('react-dom/server');
const { MemoryRouter } = await import('react-router-dom');
const assert = (await import('node:assert/strict')).default;

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

globalThis.localStorage = memoryStorage();
globalThis.sessionStorage = memoryStorage();

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

try {
  const load = (file) => server.ssrLoadModule('/src/' + file);
  const { AppProviders } = await load('app/providers/AppProviders.jsx');
  const { AppRoutes } = await load('app/routes/AppRoutes.jsx');
  const { products } = await load('features/catalog/data/catalog.js');
  const { createDemoOrder, createEmptyDraft, ordersStorageKey, checkoutStorageKey } = await load(
    'features/checkout/lib/checkout.js',
  );
  const h = React.createElement;

  function render(url) {
    const router = h(MemoryRouter, { initialEntries: [url] }, h(AppRoutes));
    return renderToString(h(AppProviders, null, router));
  }

  const emptyCases = [
    ['/', 'Hal kecil,'],
    ['/store?q=foto', 'Temukan yang'],
    ['/product/1', 'Buket Foto'],
    ['/product/999', 'Karya tidak ditemukan'],
    ['/blogs', 'Cerita'],
    ['/blogs/hadiah-kecil-cerita-besar', 'Hadiah kecil, cerita yang besar'],
    ['/blogs/missing', 'Cerita tidak ditemukan'],
    ['/about', 'Berawal dari skripsi,'],
    ['/contact', 'Mulai dari'],
    ['/login', 'Siapa nama panggilanmu?'],
    ['/cart', 'Masih ada ruang untuk kenangan.'],
    ['/wishlist', 'Belum ada yang disimpan.'],
    ['/orders', 'Ceritanya belum dimulai.'],
    ['/halaman-tidak-ada', 'Sepertinya kamu salah belok.'],
  ];

  for (const [url, expected] of emptyCases) {
    const html = render(url);
    assert.ok(html.includes(expected), url + ' did not render its expected page: ' + expected);
    assert.ok(html.includes('jr-header') && html.includes('jr-footer'), url + ' lost its layout');
  }

  const cart = [
    { ...products[0], quantity: 2 },
    { ...products[12], quantity: 3 },
  ];
  localStorage.setItem('jemari-ragil:cart:v1', JSON.stringify(cart));
  localStorage.setItem('jemari-ragil:wishlist:v1', JSON.stringify([products[0]]));
  const draft = {
    ...createEmptyDraft(),
    id: 'JR-DEMO-RENDER',
    selectedIds: ['1'],
    contact: { name: 'Demo Visitor', email: 'demo@example.com', phone: '' },
  };
  sessionStorage.setItem(checkoutStorageKey('guest'), JSON.stringify(draft));

  for (const [url, expected] of [
    ['/cart', 'Buket Foto'],
    ['/wishlist', 'Buket Foto'],
    ['/checkout/info', 'Untuk siapa kenangan ini?'],
    ['/checkout/shipping', 'Antar ke mana?'],
    ['/checkout/payment', 'Satu langkah terakhir.'],
  ]) {
    assert.ok(render(url).includes(expected), url + ' did not preserve populated state');
  }

  const order = createDemoOrder({ ownerId: 'guest', draft, cart, paymentMethod: 'cod' });
  localStorage.setItem(ordersStorageKey('guest'), JSON.stringify([order]));
  assert.ok(render('/orders').includes('JR-DEMO-RENDER'), 'Saved order did not render');

  console.log(
    '20 route renders passed using the actual application routes, providers, and layout.',
  );
} finally {
  await server.close();
}
