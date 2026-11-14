import { Component, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import ProductDetail from './pages/ProductDetail';
import ArticleDetail from './pages/ArticleDetail';
import Login from './components/LoginItem/Login';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import Blog from './pages/Blog';
import CheckoutInfo from './components/CheckoutItem/CheckoutInfo';
import DeliveryMethod from './components/DeliveryItem/DeliveryMethod';
import PaymentMethod from './components/PaymentItem/PaymentMethod';
import OrderPage from './components/OrderItem/OrderPage';
import { CartProvider } from './components/CartItem/CartContext';
import { WishlistProvider } from './components/WishlistItem/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { DemoSessionProvider } from './context/DemoSessionContext';
import { CheckoutProvider } from './context/CheckoutContext';

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const titles = { '/': 'Hadiah kecil, cerita berarti', '/store': 'Koleksi', '/cart': 'Keranjang', '/wishlist': 'Favorit', '/about': 'Tentang', '/contact': 'Kontak', '/blogs': 'Cerita', '/orders': 'Pesanan demo', '/login': 'Profil demo' };
    document.title = (titles[pathname] || (pathname.startsWith('/checkout') ? 'Checkout demo' : 'Jelajahi koleksi')) + ' — Jemari Ragil';
  }, [pathname]);
  return null;
}
class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="container section empty-state"><p className="eyebrow">Ada yang terlewat</p><h1>Halaman belum bisa ditampilkan.</h1><p>Coba muat ulang untuk melanjutkan penjelajahanmu.</p><button className="button" onClick={() => window.location.reload()}>Muat ulang</button></main>;
    return this.props.children;
  }
}
function NotFound() {
  return <section className="container section empty-state"><p className="eyebrow">404 · Halaman tidak ditemukan</p><h1>Sepertinya kamu salah belok.</h1><p>Masih banyak cerita kecil yang bisa kamu temukan di koleksi kami.</p><Link className="button" to="/store">Jelajahi koleksi</Link></section>;
}
export default function App() {
  return <ErrorBoundary><ToastProvider><DemoSessionProvider><CartProvider><WishlistProvider><CheckoutProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RouteEffects />
      <Routes><Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="store" element={<OurStore />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="blogs/:slug" element={<ArticleDetail />} />
        <Route path="checkout/info" element={<CheckoutInfo />} />
        <Route path="checkout/shipping" element={<DeliveryMethod />} />
        <Route path="checkout/payment" element={<PaymentMethod />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="*" element={<NotFound />} />
      </Route></Routes>
    </BrowserRouter>
  </CheckoutProvider></WishlistProvider></CartProvider></DemoSessionProvider></ToastProvider></ErrorBoundary>;
}
