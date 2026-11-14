process.env.NODE_ENV = 'production';

const { createServer } = await import('vite');
const React = await import('react');
const { renderToString } = await import('react-dom/server');
const { MemoryRouter, HashRouter } = await import('react-router-dom');
const assert = (await import('node:assert/strict')).default;
const fs = await import('node:fs');
const path = await import('node:path');
const base = '/jemari-ragil/';
const server = await createServer({
  base,
  mode: 'github-pages',
  server: { middlewareMode: true },
  appType: 'custom',
});
try {
  const load = (file) => server.ssrLoadModule('/src/' + file);
  const { AppProviders } = await load('app/providers/AppProviders.jsx');
  const { AppRoutes } = await load('app/routes/AppRoutes.jsx');
  const { AppRouter } = await load('app/config/router.js');
  const { products, categories } = await load('features/catalog/data/catalog.js');
  const { articles } = await load('features/stories/data/articles.js');
  assert.equal(AppRouter, HashRouter, 'Pages build must use refresh-safe hash routing');

  for (const item of [...products, ...categories, ...articles]) {
    assert.ok(item.image.startsWith(base + 'images/'), item.image);
    assert.ok(fs.existsSync(path.join('dist', item.image.slice(base.length))), item.image);
  }
  const h = React.createElement;
  let imagesChecked = 0;
  for (const url of ['/', '/store', '/product/1', '/blogs', '/login']) {
    const html = renderToString(
      h(AppProviders, null, h(MemoryRouter, { initialEntries: [url] }, h(AppRoutes))),
    );
    for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      assert.ok(match[1].startsWith(base + 'images/'), url + ': ' + match[1]);
      imagesChecked++;
    }
  }
  const index = fs.readFileSync('dist/index.html', 'utf8');
  assert.ok(index.includes(base + 'brand-mark.svg'), 'Favicon must use the repository base path');
  assert.ok(index.includes(base + 'assets/'), 'Bundled assets must use the repository base path');
  assert.ok(!index.includes('src="/src/'), 'Production HTML must not load source modules');
  console.log(
    'GitHub Pages checks passed: hash routing, catalog assets, ' +
      imagesChecked +
      ' rendered images, and production HTML.',
  );
} finally {
  await server.close();
}
