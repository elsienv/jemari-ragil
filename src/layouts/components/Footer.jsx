import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => (
  <footer className="jr-footer">
    <div className="container">
      <div className="jr-footer__top">
        <div className="jr-footer__intro">
          <Link className="jr-footer__brand" to="/">
            jemari<span>ragil.</span>
          </Link>
          <p>
            Hadiah kecil. Cerita panjang.
            <br />
            Kenangan yang bisa kamu genggam.
          </p>
          <span className="jr-footer__demo-label">HADIAH PERSONAL · CETAK FOTO</span>
        </div>
        <nav className="jr-footer__links" aria-label="Koleksi di footer">
          <h2>Koleksi</h2>
          <Link to="/store?category=bouquet">Buket foto</Link>
          <Link to="/store?category=photo">Cetak kenangan</Link>
          <Link to="/store?category=accessories">Aksesori personal</Link>
          <Link to="/store?category=souvenir">Suvenir</Link>
          <Link to="/store">
            Lihat semua <FiArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
        <nav className="jr-footer__links" aria-label="Jelajahi situs">
          <h2>Jelajahi</h2>
          <Link to="/about">Tentang Jemari Ragil</Link>
          <Link to="/blogs">Cerita & inspirasi</Link>
          <Link to="/wishlist">Favorit kamu</Link>
          <Link to="/orders">Pesanan saya</Link>
          <Link to="/contact">Hubungi kami</Link>
        </nav>
        <div className="jr-footer__contact">
          <h2>Mari berbagi cerita</h2>
          <p>
            Hadiah personal dari Salatiga.
            <br />
            Untuk cerita yang ingin tinggal.
          </p>
          <Link to="/contact">
            Hubungi Jemari Ragil <FiArrowUpRight aria-hidden="true" />
          </Link>
          <p className="jr-footer__hours">Buket, cetak foto, suvenir, dan aksesori pilihan.</p>
        </div>
      </div>
      <div className="jr-footer__bottom">
        <p>
          © {new Date().getFullYear()} Jemari Ragil. Dibuat dengan <FiHeart aria-label="hati" /> di
          Salatiga.
        </p>
        <p>Hal kecil, kenangan yang berarti.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
