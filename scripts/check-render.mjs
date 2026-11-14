process.env.NODE_ENV = 'production';
const { createServer } = await import('vite');
const React = await import('react');
const { renderToString } = await import('react-dom/server');
const { MemoryRouter, Routes, Route } = await import('react-router-dom');
const assert = (await import('node:assert/strict')).default;
const memoryStorage = () => { const values = new Map(); return { getItem: key => values.get(key) ?? null, setItem: (key,value) => values.set(key,value), removeItem: key => values.delete(key) }; };
globalThis.localStorage = memoryStorage();
globalThis.sessionStorage = memoryStorage();
const server = await createServer({ server: { middlewareMode:true }, appType:'custom' });
try {
 const load = file => server.ssrLoadModule('/src/' + file);
 const { ToastProvider } = await load('context/ToastContext.jsx');
 const { DemoSessionProvider } = await load('context/DemoSessionContext.jsx');
 const { CartProvider } = await load('components/CartItem/CartContext.jsx');
 const { WishlistProvider } = await load('components/WishlistItem/WishlistContext.jsx');
 const { CheckoutProvider } = await load('context/CheckoutContext.jsx');
 const { products } = await load('data/catalog.js');
 const { createDemoOrder, createEmptyDraft, ordersStorageKey, checkoutStorageKey } = await load('lib/checkout.js');
 const h = React.createElement;
 const routes = [
  ['/', 'pages/Home.jsx'], ['/store?q=foto', 'pages/OurStore.jsx'],
  ['/product/1', 'pages/ProductDetail.jsx', '/product/:id'],
  ['/product/999', 'pages/ProductDetail.jsx', '/product/:id'],
  ['/blogs', 'pages/Blog.jsx'], ['/blogs/hadiah-kecil-cerita-besar', 'pages/ArticleDetail.jsx', '/blogs/:slug'],
  ['/blogs/missing', 'pages/ArticleDetail.jsx', '/blogs/:slug'],
  ['/about', 'pages/About.jsx'], ['/contact', 'pages/Contact.jsx'], ['/login', 'components/LoginItem/Login.jsx'],
  ['/cart', 'pages/CartPage.jsx'], ['/wishlist', 'pages/WishlistPage.jsx'], ['/orders', 'components/OrderItem/OrderPage.jsx'],
 ];
 const render = async (url,file,routePath) => {
  const Page = (await load(file)).default;
  const page = h(MemoryRouter,{initialEntries:[url]},h(Routes,null,h(Route,{path:routePath||url.split('?')[0],element:h(Page)})));
  const tree = [ToastProvider, DemoSessionProvider, CartProvider, WishlistProvider, CheckoutProvider].reduceRight((child, Provider) => h(Provider, null, child), page);
  return renderToString(tree);
 };
 for (const [url,file,pattern] of routes) {
  const html = await render(url,file,pattern);
  assert.ok(html.length > 200, url + ' did not render meaningful content');
 }
 const cart = [{...products[0],quantity:2},{...products[12],quantity:3}];
 localStorage.setItem('jemari-ragil:cart:v1',JSON.stringify(cart));
 localStorage.setItem('jemari-ragil:wishlist:v1',JSON.stringify([products[0]]));
 const draft = {...createEmptyDraft(),id:'JR-DEMO-RENDER',selectedIds:['1'],contact:{name:'Demo Visitor',email:'demo@example.com',phone:''}};
 sessionStorage.setItem(checkoutStorageKey('guest'),JSON.stringify(draft));
 for(const [url,file] of [
  ['/cart','pages/CartPage.jsx'],['/wishlist','pages/WishlistPage.jsx'],
  ['/checkout/info','components/CheckoutItem/CheckoutInfo.jsx'],
  ['/checkout/shipping','components/DeliveryItem/DeliveryMethod.jsx'],
  ['/checkout/payment','components/PaymentItem/PaymentMethod.jsx'],
 ]) assert.ok((await render(url,file)).length > 500,url + ' populated render failed');
 const order = createDemoOrder({ownerId:'guest',draft,cart,paymentMethod:'cod'});
 localStorage.setItem(ordersStorageKey('guest'),JSON.stringify([order]));
 assert.ok((await render('/orders','components/OrderItem/OrderPage.jsx')).includes('JR-DEMO-RENDER'),'order not rendered');
 console.log('19 route renders passed, including empty/populated states and all checkout steps.');
} finally { await server.close(); }
