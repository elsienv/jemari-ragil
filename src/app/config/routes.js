import HomePage from '../../pages/home/HomePage';
import AboutPage from '../../pages/about/AboutPage';
import ContactPage from '../../features/contact/pages/ContactPage';
import CatalogPage from '../../features/catalog/pages/CatalogPage';
import ProductDetailPage from '../../features/catalog/pages/ProductDetailPage';
import WishlistPage from '../../features/wishlist/pages/WishlistPage';
import CartPage from '../../features/cart/pages/CartPage';
import DemoLoginPage from '../../features/session/pages/DemoLoginPage';
import StoriesPage from '../../features/stories/pages/StoriesPage';
import ArticlePage from '../../features/stories/pages/ArticlePage';
import ContactStepPage from '../../features/checkout/pages/ContactStepPage';
import ShippingStepPage from '../../features/checkout/pages/ShippingStepPage';
import PaymentStepPage from '../../features/checkout/pages/PaymentStepPage';
import OrdersPage from '../../features/orders/pages/OrdersPage';

export const routes = [
  { path: '/', Component: HomePage, title: 'Hadiah kecil, cerita berarti' },
  { path: '/store', Component: CatalogPage, title: 'Koleksi' },
  { path: '/product/:id', Component: ProductDetailPage, title: 'Jelajahi koleksi' },
  { path: '/wishlist', Component: WishlistPage, title: 'Favorit' },
  { path: '/cart', Component: CartPage, title: 'Keranjang' },
  { path: '/login', Component: DemoLoginPage, title: 'Profil demo' },
  { path: '/about', Component: AboutPage, title: 'Tentang' },
  { path: '/contact', Component: ContactPage, title: 'Kontak' },
  { path: '/blogs', Component: StoriesPage, title: 'Cerita' },
  { path: '/blogs/:slug', Component: ArticlePage, title: 'Jelajahi koleksi' },
  { path: '/checkout/info', Component: ContactStepPage, title: 'Checkout demo' },
  { path: '/checkout/shipping', Component: ShippingStepPage, title: 'Checkout demo' },
  { path: '/checkout/payment', Component: PaymentStepPage, title: 'Checkout demo' },
  { path: '/orders', Component: OrdersPage, title: 'Pesanan demo' },
];
