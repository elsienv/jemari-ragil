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
          Hadiah personal.
          <br />
          <em>Kenangan yang berarti.</em>
        </h1>
        <p className="muted">
          Buket, cetak foto, suvenir, dan aksesori untuk merayakan momen serta orang-orang yang
          berarti.
        </p>
      </header>
      <section className="container about-story" aria-labelledby="about-story-title">
        <div className="about-image">
          {visual && <img src={visual.image} alt={visual.title} width="700" height="800" />}
          <span>Jemari Ragil / hadiah personal dari Salatiga</span>
        </div>
        <div className="about-story-copy">
          <p className="eyebrow">Tentang toko kami</p>
          <h2 id="about-story-title">
            Dari hal sederhana,
            <br />
            menjadi kenangan berharga.
          </h2>
          <p>
            Jemari Ragil adalah toko hadiah personal berbasis di Salatiga. Pilihan buket, cetak
            foto, suvenir, dan aksesori hadir untuk menemani berbagai cerita, dari ucapan terima
            kasih sampai perayaan bersama orang terdekat.
          </p>
          <p>
            Kami percaya hadiah tidak harus besar untuk terasa istimewa. Foto yang menyimpan momen,
            pesan yang ditulis dengan tulus, atau benda kecil yang mengingatkan pada seseorang bisa
            membuat pemberian terasa lebih dekat.
          </p>
          <p className="about-honesty">
            Ada cerita di balik setiap pilihan. Temukan bentuk yang paling dekat dengan orang yang
            ingin kamu bahagiakan.
          </p>
          <Link to="/store" className="button-secondary">
            Jelajahi koleksi <span aria-hidden="true">↗</span>
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
              <h3>Merayakan kebersamaan.</h3>
              <p>
                Untuk ulang tahun, kelulusan, atau sekadar ucapan terima kasih. Setiap momen punya
                alasan untuk dirayakan bersama orang yang berarti.
              </p>
            </article>
            <article>
              <span aria-hidden="true">03 /</span>
              <h3>Menyimpan kenangan.</h3>
              <p>
                Beri tempat untuk foto dan cerita favoritmu, lewat cetakan, suvenir, serta aksesori
                yang bisa menjadi pengingat kecil dalam keseharian.
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
