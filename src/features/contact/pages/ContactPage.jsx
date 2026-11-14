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
          Ada pertanyaan tentang koleksi atau ide hadiah yang ingin kamu ceritakan? Mulai dari sini.
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
            <p className="eyebrow">Sentuhan yang personal</p>
            <p>
              Dari buket foto hingga aksesori manik, temukan cara sederhana untuk menyampaikan
              perhatianmu.
            </p>
          </div>
          <Link className="button-quiet" to="/about">
            Tentang Jemari Ragil <span aria-hidden="true">↗</span>
          </Link>
        </aside>
        <section className="contact-form-section" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title">Tinggalkan pesan.</h2>
          <p className="contact-form-description">
            Ceritakan kebutuhan atau pertanyaanmu. Kolom bertanda * wajib diisi.
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
                  autoComplete="name"
                  placeholder="Nama lengkap"
                />
              </label>
              <label className="form-field">
                <span>Email *</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength="120"
                  autoComplete="email"
                  placeholder="nama@email.com"
                />
              </label>
            </div>
            <label className="form-field">
              <span>Apa yang ingin kamu ceritakan?</span>
              <select name="subject" defaultValue="gift">
                <option value="gift">Ide hadiah & koleksi</option>
                <option value="custom">Produk personal</option>
                <option value="project">Tentang Jemari Ragil</option>
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
                placeholder="Ceritakan ide atau pertanyaanmu di sini…"
              />
            </label>
            <button type="submit" className="button">
              Kirim pesan <span aria-hidden="true">↗</span>
            </button>
            {submitted && (
              <div className="contact-submit-status" role="status" aria-live="polite">
                <strong>Pesan belum terkirim.</strong>
                <p>
                  Pengiriman melalui formulir belum tersedia. Pesanmu tetap ada di formulir ini.
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
            <summary>Apa saja koleksi Jemari Ragil?</summary>
            <p>
              Jelajahi buket foto, cetak foto, suvenir, aksesori, dan hadiah dengan sentuhan
              personal. Setiap kategori menghadirkan cara berbeda untuk menyimpan kenangan.
            </p>
          </details>
          <details>
            <summary>Bagaimana memilih hadiah yang personal?</summary>
            <p>
              Mulai dari momen yang ingin kamu rayakan, warna favorit, atau foto yang berarti.
              Lengkapi dengan kartu ucapan untuk menyampaikan pesanmu.
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
