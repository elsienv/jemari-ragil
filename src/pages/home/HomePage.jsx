import { useScrollToSection } from '../../shared/hooks/useScrollToSection';
import { assetUrl } from '../../shared/lib/assets';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUpRight,
  FiGift,
  FiHeart,
  FiPackage,
  FiSun,
} from 'react-icons/fi';
import ProductCard from '../../features/catalog/components/ProductCard';
import { products, categories } from '../../features/catalog/data/catalog';
import { articles } from '../../features/stories/data/articles';
import { formatCurrency, formatDate } from '../../shared/lib/format';
import './HomePage.css';

const HomePage = () => {
  const scrollToCollection = useScrollToSection('koleksi');
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const selectedCategories = ['bouquet', 'photo', 'gift', 'accessories']
    .map((id) => categories.find((category) => category.id === id))
    .filter(Boolean)
    .map((category) => ({
      ...category,
      cover: products.find((product) => product.category === category.id)?.image || category.image,
    }));
  const bouquet = products.find((product) => product.category === 'bouquet');

  return (
    <div className="jr-home">
      <section className="jr-home__hero" aria-labelledby="jr-hero-title">
        <div className="container jr-home__hero-inner">
          <div className="jr-home__hero-copy">
            <p className="eyebrow">
              <span className="jr-home__tiny-line" /> Hadiah personal, cerita yang tinggal
            </p>
            <h1 id="jr-hero-title">
              Hal kecil,
              <br />
              <em>berarti</em>
              <br />
              begitu besar.
            </h1>
            <p className="jr-home__hero-description">
              Ubah foto dan momen favoritmu menjadi hadiah yang terasa dekat. Dirangkai dengan
              perhatian, untuk orang yang berarti.
            </p>
            <div className="jr-home__hero-actions">
              <Link to="/store" className="button">
                Temukan hadiahmu <FiArrowUpRight aria-hidden="true" />
              </Link>
              <Link to="/about" className="jr-home__text-link">
                Kenali cerita kami <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="jr-home__hero-footnote">
              <span className="jr-home__handwritten">a little gift, a lot of love.</span>
              <span>
                EST. SALATIGA
                <br />
                DIBUAT UNTUK DIKENANG
              </span>
            </div>
          </div>
          <div className="jr-home__hero-visual">
            <span className="jr-home__hero-orbit" aria-hidden="true" />
            <FiSun className="jr-home__hero-sun" aria-hidden="true" />
            <div className="jr-home__main-photo">
              <img
                src={assetUrl('/images/product-01.jpeg')}
                alt="Buket foto personal dengan balutan hitam putih dan pita"
                loading="eager"
                width="1080"
                height="1080"
              />
              <span>made for your favourite person.</span>
            </div>
            <div className="jr-home__small-photo">
              <img
                src={assetUrl('/images/product-15-pht.jpeg')}
                alt="Cetakan photo strip yang menyimpan rangkaian momen"
                width="1080"
                height="1080"
              />
              <span>keep the little moments ♡</span>
            </div>
            <Link
              className="jr-home__hero-product"
              to={bouquet ? '/product/' + bouquet.id : '/store?category=bouquet'}
            >
              <span>
                <small>DARI KOLEKSI KAMI</small>
                <strong>Buket penuh cerita</strong>
                <span>
                  {bouquet ? 'Mulai ' + formatCurrency(bouquet.price) : 'Jelajahi buket foto'}
                </span>
              </span>
              <span className="jr-home__circle-arrow">
                <FiArrowUpRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
        <a className="jr-home__scroll-cue" href="#koleksi" onClick={scrollToCollection}>
          <span>SCROLL UNTUK MENEMUKAN</span>
          <FiArrowDown aria-hidden="true" />
        </a>
      </section>

      <div className="jr-home__values" aria-label="Tentang koleksi kami">
        <div className="container jr-home__values-inner">
          <span>
            <FiHeart aria-hidden="true" /> Penuh sentuhan personal
          </span>
          <span>
            <FiGift aria-hidden="true" /> Untuk momen istimewa
          </span>
          <span>
            <FiPackage aria-hidden="true" /> Kenangan dalam bentuk nyata
          </span>
        </div>
      </div>

      <section
        className="section jr-home__categories"
        id="koleksi"
        aria-labelledby="jr-category-title"
      >
        <div className="container">
          <div className="jr-home__section-top">
            <div>
              <p className="eyebrow">01 / PILIH CERITAMU</p>
              <h2 className="section-heading" id="jr-category-title">
                Untuk setiap <em>versi sayang.</em>
              </h2>
            </div>
            <Link to="/store" className="jr-home__text-link">
              Semua koleksi <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="jr-home__category-grid">
            {selectedCategories.map((category, index) => (
              <Link
                to={'/store?category=' + category.id}
                className="jr-home__category"
                key={category.id}
              >
                <div className="jr-home__category-image">
                  <span className="jr-home__category-number">0{index + 1}</span>
                  <img
                    src={category.cover}
                    alt={category.name}
                    loading="lazy"
                    width="540"
                    height="540"
                  />
                  <span className="jr-home__category-arrow">
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section jr-home__featured" aria-labelledby="jr-featured-title">
        <div className="container">
          <div className="jr-home__section-top">
            <div>
              <p className="eyebrow">02 / PILIHAN JEMARI</p>
              <h2 className="section-heading" id="jr-featured-title">
                Hadiah yang bikin <em>tersenyum.</em>
              </h2>
            </div>
            <p className="jr-home__section-description">
              Dari ucapan sederhana sampai perayaan besar.
              <br />
              Temukan satu yang terasa paling mereka.
            </p>
          </div>
          <div className="jr-home__product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="jr-home__center">
            <Link to="/store" className="button-secondary">
              Jelajahi seluruh koleksi <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="jr-home__story" aria-labelledby="jr-story-title">
        <div className="container jr-home__story-inner">
          <div className="jr-home__story-visual">
            <span className="jr-home__story-word" aria-hidden="true">
              memories
            </span>
            <img
              src={assetUrl('/images/product-13-pht.jpeg')}
              alt="Sekumpulan foto polaroid yang dicetak untuk menyimpan kenangan"
              loading="lazy"
              width="1080"
              height="1080"
            />
            <span className="jr-home__story-caption">
              Momen berlalu.
              <br />
              <em>Kenangannya tinggal.</em>
            </span>
          </div>
          <div className="jr-home__story-copy">
            <p className="eyebrow">LEBIH DARI SEKADAR HADIAH</p>
            <h2 id="jr-story-title">
              Karena yang personal
              <br />
              selalu terasa
              <br />
              <em>lebih berarti.</em>
            </h2>
            <p>
              Kami percaya, hadiah terbaik tidak harus besar. Kadang, cukup satu foto, satu pesan,
              atau satu detail kecil yang bilang: “aku ingat kamu.”
            </p>
            <p>
              Jemari Ragil berangkat dari kecintaan pada hal-hal sederhana itu. Merayakan hubungan,
              menyimpan cerita, dan memberi ruang untuk kenangan.
            </p>
            <Link to="/about" className="jr-home__story-link">
              Cerita di balik Jemari Ragil <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section jr-home__journal" aria-labelledby="jr-journal-title">
        <div className="container">
          <div className="jr-home__section-top">
            <div>
              <p className="eyebrow">03 / CATATAN KECIL</p>
              <h2 className="section-heading" id="jr-journal-title">
                Cerita, ide, & <em>sedikit inspirasi.</em>
              </h2>
            </div>
            <Link to="/blogs" className="jr-home__text-link">
              Baca semua cerita <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="jr-home__article-grid">
            {articles.slice(0, 3).map((article) => (
              <article className="jr-home__article" key={article.slug}>
                <Link to={'/blogs/' + article.slug} className="jr-home__article-image">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    width="720"
                    height="540"
                  />
                  <span>
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                </Link>
                <p className="jr-home__article-meta">
                  CATATAN JEMARI <span>·</span>{' '}
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </p>
                <h3>
                  <Link to={'/blogs/' + article.slug}>{article.title}</Link>
                </h3>
                <p className="jr-home__article-excerpt">{article.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="jr-home__closing" aria-labelledby="jr-closing-title">
        <div className="container jr-home__closing-inner">
          <FiHeart className="jr-home__closing-heart" aria-hidden="true" />
          <p className="eyebrow">JANGAN TUNGGU MOMEN SEMPURNA</p>
          <h2 id="jr-closing-title">
            Buat hari seseorang
            <br />
            <em>sedikit lebih hangat.</em>
          </h2>
          <Link to="/store" className="button">
            Mulai dari hadiah kecil <FiArrowUpRight aria-hidden="true" />
          </Link>
          <p className="jr-home__closing-note">
            Untuk mereka. Untuk kamu. Untuk cerita berikutnya.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
