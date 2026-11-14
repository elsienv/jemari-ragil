import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { useCart } from '../CartItem/CartContext';
import { useWishlist } from '../WishlistItem/WishlistContext';
import { useDemoSession } from '../../context/DemoSessionContext';
import './Header.css';

const navigation = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/store', label: 'Koleksi' },
  { to: '/blogs', label: 'Cerita' },
  { to: '/about', label: 'Tentang' },
];

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { profile, leaveDemo } = useDemoSession();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const itemCount = cart.reduce((total, item) => total + Number(item.quantity || 0), 0);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery(new URLSearchParams(location.search).get('q') || '');
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(query.trim() ? '/store?q=' + encodeURIComponent(query.trim()) : '/store');
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="jr-header" onKeyDown={(event) => {
      if (event.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); }
    }}>
      <div className="jr-header__announcement">
        <div className="container jr-header__announcement-inner">
          <span>Untuk setiap cerita, ada hadiah istimewa.</span>
          <Link to="/about">Dari Salatiga, dengan hati <FiArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="container jr-header__main">
        <Link to="/" className="jr-header__brand" aria-label="Jemari Ragil — Beranda">
          jemari<span>ragil.</span><small>little things, lasting memories</small>
        </Link>
        <nav className="jr-header__desktop-nav" aria-label="Navigasi utama">
          {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>)}
        </nav>
        <div className="jr-header__actions">
          <button className="jr-header__icon" type="button" aria-label={searchOpen ? 'Tutup pencarian' : 'Cari hadiah'} aria-expanded={searchOpen} aria-controls="jr-header-panel" onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}>
            {searchOpen ? <FiX /> : <FiSearch />}
          </button>
          <Link className="jr-header__icon jr-header__wishlist" to="/wishlist" aria-label={'Favorit, ' + wishlist.length + ' produk'}>
            <FiHeart />{wishlist.length > 0 && <span className="jr-header__badge">{wishlist.length}</span>}
          </Link>
          {profile ? (
            <details className="jr-header__account">
              <summary className="jr-header__icon" aria-label={'Akun demo ' + profile.name}><FiUser /><span className="jr-header__session-dot" /></summary>
              <div className="jr-header__account-menu">
                <span>Halo, {profile.name}</span><small>Akun demo lokal</small>
                <Link to="/orders" onClick={(event) => event.currentTarget.closest('details').removeAttribute('open')}>Pesanan demo saya</Link>
                <button type="button" onClick={(event) => { event.currentTarget.closest('details').removeAttribute('open'); leaveDemo(); }}>Keluar dari demo</button>
              </div>
            </details>
          ) : <Link className="jr-header__icon jr-header__account-link" to="/login" aria-label="Masuk akun demo"><FiUser /></Link>}
          <Link className="jr-header__icon" to="/cart" aria-label={'Tas belanja, ' + itemCount + ' barang'}>
            <FiShoppingBag />{itemCount > 0 && <span className="jr-header__badge">{itemCount}</span>}
          </Link>
          <button className="jr-header__icon jr-header__menu-toggle" type="button" aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={menuOpen} aria-controls="jr-header-panel" onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {(menuOpen || searchOpen) && <div className="jr-header__panel" id="jr-header-panel">
        <div className="container jr-header__panel-inner">
          {menuOpen && <nav className="jr-header__mobile-nav" aria-label="Navigasi seluler" onClick={() => setMenuOpen(false)}>
            {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{item.label}<FiArrowRight aria-hidden="true" /></NavLink>)}
            <Link to="/wishlist">Favorit kamu ({wishlist.length})<FiArrowRight aria-hidden="true" /></Link>
            <Link to={profile ? '/orders' : '/login'}>{profile ? 'Pesanan demo saya' : 'Masuk akun demo'}<FiArrowRight aria-hidden="true" /></Link>
            <Link to="/contact">Hubungi kami<FiArrowRight aria-hidden="true" /></Link>
          </nav>}
          <form className="jr-header__search" role="search" onSubmit={handleSearch}>
            <label className="jr-header__sr-only" htmlFor="jr-product-search">Cari produk dalam koleksi</label>
            <FiSearch aria-hidden="true" />
            <input ref={searchInput} id="jr-product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari buket, polaroid, atau hadiah kecil..." />
            <button type="submit">Cari <FiArrowRight aria-hidden="true" /></button>
          </form>
          <p className="jr-header__search-note">Sesuatu untuk dirimu, atau seseorang yang berarti.</p>
        </div>
      </div>}
    </header>
  );
};

export default Header;

