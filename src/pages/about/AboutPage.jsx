import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../features/catalog/data/catalog';
import '../../shared/styles/content-pages.css';

export default function AboutPage() {
  const visual = products.find((product) => product.category === 'bouquet') || products[0];
  return (
    <div className="about-page">
      <header className="container page-heading about-heading">
        <p className="eyebrow">Tentang Jemari Ragil</p>
        <h1>
          Hal kecil.
          <br />
          <em>Arti yang besar.</em>
        </h1>
        <p className="muted">
          Sebuah eksplorasi tentang hadiah personal, pengalaman berbelanja, dan karya yang terus
          bertumbuh.
        </p>
      </header>
      <section className="container about-story" aria-labelledby="about-story-title">
        <div className="about-image">
          {visual && <img src={visual.image} alt={visual.title} width="700" height="800" />}
          <span>Jemari Ragil / sebuah studi pengalaman</span>
        </div>
        <div className="about-story-copy">
          <p className="eyebrow">Di balik proyek ini</p>
          <h2 id="about-story-title">
            Berawal dari skripsi,
            <br />
            dirawat menjadi portofolio.
          </h2>
          <p>
            Jemari Ragil berawal sebagai proyek skripsi berupa antarmuka toko online untuk produk
            hadiah, cetak foto, souvenir, dan aksesori. Versi ini mengembangkan kembali gagasan
            tersebut menjadi studi portofolio yang bisa dijelajahi.
          </p>
          <p>
            Fokusnya sederhana: membantu orang menemukan sesuatu yang terasa personal. Dari
            menjelajah koleksi sampai mencoba alur checkout, setiap langkah dibuat agar lebih jelas,
            tenang, dan menyenangkan.
          </p>
          <p className="about-honesty">
            Situs ini adalah demonstrasi. Katalog menggunakan data contoh dan tidak menerima
            pemesanan, pembayaran, atau pengiriman sungguhan.
          </p>
          <Link to="/store" className="button-secondary">
            Jelajahi karya <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="about-principles" aria-labelledby="about-principles-title">
        <div className="container">
          <p className="eyebrow">Yang ingin kami hadirkan</p>
          <h2 className="section-heading" id="about-principles-title">
            Perhatian pada setiap detail.
          </h2>
          <div className="about-principle-grid">
            <article>
              <span aria-hidden="true">01 /</span>
              <h3>Terasa personal.</h3>
              <p>
                Koleksi terinspirasi dari pemberian yang penuh perhatian: foto, pesan kecil, dan
                benda yang menyimpan cerita.
              </p>
            </article>
            <article>
              <span aria-hidden="true">02 /</span>
              <h3>Mudah dijelajahi.</h3>
              <p>
                Cari, saring, simpan favorit, lalu coba alur belanja yang membantu menentukan
                pilihan.
              </p>
            </article>
            <article>
              <span aria-hidden="true">03 /</span>
              <h3>Jujur apa adanya.</h3>
              <p>
                Setiap interaksi demo diberi keterangan yang jelas. Tidak ada klaim penjualan atau
                ulasan pelanggan yang dibuat-buat.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="container about-invitation">
        <span aria-hidden="true">✧</span>
        <h2>
          Setiap momen punya cerita.
          <br />
          Apa ceritamu?
        </h2>
        <Link to="/blogs" className="button-quiet">
          Temukan inspirasi <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
