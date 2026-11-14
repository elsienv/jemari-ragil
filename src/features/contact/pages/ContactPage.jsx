import React from 'react';
import { useContactForm } from '../hooks/useContactForm';
import { Link } from 'react-router-dom';
import '../../../shared/styles/content-pages.css';

export default function ContactPage() {
  const { submitted, submitMessage } = useContactForm();

  return (
    <div className="contact-page">
      <header className="container page-heading contact-heading">
        <p className="eyebrow">Mari bercerita</p>
        <h1>
          Mulai dari <em>sebuah sapaan.</em>
        </h1>
        <p className="muted">
          Punya ide hadiah atau ingin mencoba pengalaman mengirim pesan? Jelajahi formulir demo di
          bawah ini.
        </p>
      </header>
      <div className="container contact-layout">
        <aside className="contact-intro">
          <span className="contact-flower" aria-hidden="true">
            ✳
          </span>
          <h2>
            Ruang untuk
            <br />
            ide-ide kecil.
          </h2>
          <p>Di Jemari Ragil, perhatian kecil menjadi awal dari pemberian yang berarti.</p>
          <div className="contact-demo-note">
            <p className="eyebrow">Mode portofolio</p>
            <p>
              Formulir ini hanya simulasi. Pesan tidak terkirim dan tidak disimpan. Gunakan nama
              serta email contoh saat mencoba.
            </p>
          </div>
          <Link className="button-quiet" to="/about">
            Kenali proyek ini <span aria-hidden="true">↗</span>
          </Link>
        </aside>
        <section className="contact-form-section" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title">Tinggalkan pesan.</h2>
          <p className="contact-form-description">
            Coba isi dengan data contoh. Kolom bertanda * wajib diisi.
          </p>
          <form onSubmit={submitMessage} className="contact-demo-form">
            <div className="contact-form-row">
              <label className="form-field">
                <span>Nama *</span>
                <input
                  name="name"
                  type="text"
                  required
                  minLength="2"
                  maxLength="80"
                  autoComplete="off"
                  placeholder="Nama Contoh"
                />
              </label>
              <label className="form-field">
                <span>Email *</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength="120"
                  autoComplete="off"
                  placeholder="contoh@example.com"
                />
              </label>
            </div>
            <label className="form-field">
              <span>Apa yang ingin kamu ceritakan?</span>
              <select name="subject" defaultValue="gift">
                <option value="gift">Ide hadiah & koleksi</option>
                <option value="custom">Produk personal</option>
                <option value="project">Tentang proyek portofolio</option>
                <option value="other">Cerita lainnya</option>
              </select>
            </label>
            <label className="form-field">
              <span>Pesan *</span>
              <textarea
                name="message"
                required
                minLength="10"
                maxLength="1500"
                rows="6"
                placeholder="Tulis pesan contohmu di sini…"
              />
            </label>
            <button type="submit" className="button">
              Coba kirim pesan <span aria-hidden="true">↗</span>
            </button>
            <p className="contact-form-disclaimer">Simulasi saja — tidak ada pesan yang dikirim.</p>
            {submitted && (
              <div className="contact-submit-status" role="status" aria-live="polite">
                <strong>Simulasi selesai.</strong>
                <p>
                  Pesan tidak terkirim dan tidak disimpan. Terima kasih sudah mencoba formulir
                  Jemari Ragil.
                </p>
              </div>
            )}
          </form>
        </section>
      </div>
      <section className="container contact-faq" aria-labelledby="contact-faq-title">
        <div>
          <p className="eyebrow">Sebelum bertanya</p>
          <h2 className="section-heading" id="contact-faq-title">
            Beberapa hal yang
            <br />
            perlu kamu tahu.
          </h2>
        </div>
        <div className="contact-faq-list">
          <details>
            <summary>Apakah saya bisa membeli produk di sini?</summary>
            <p>
              Belum. Situs ini adalah portofolio interaktif. Kamu bisa mencoba keranjang dan
              checkout tanpa membuat transaksi sungguhan.
            </p>
          </details>
          <details>
            <summary>Apakah data yang saya isi akan dikirim?</summary>
            <p>
              Formulir kontak ini tidak mengirim atau menyimpan pesan. Gunakan data contoh ketika
              mencoba fitur-fitur demo.
            </p>
          </details>
          <details>
            <summary>Di mana saya bisa melihat ide hadiah?</summary>
            <p>
              Lihat <Link to="/store">koleksi</Link> untuk menjelajah produk atau baca{' '}
              <Link to="/blogs">cerita Jemari</Link> untuk inspirasi pemberian.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
