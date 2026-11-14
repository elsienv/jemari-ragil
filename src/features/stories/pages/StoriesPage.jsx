import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { formatDate } from '../../../shared/lib/format';
import './StoriesPage.css';

export default function StoriesPage() {
  return (
    <div className="journal-page">
      <header className="container page-heading journal-heading">
        <p className="eyebrow">Catatan dari Jemari</p>
        <h1>
          Cerita di balik <em>pemberian.</em>
        </h1>
        <p className="muted">
          Sedikit inspirasi untuk memilih hadiah, merawat kenangan, dan merayakan yang sederhana.
        </p>
      </header>
      <section className="container journal-grid" aria-label="Kumpulan cerita">
        {articles.map((article, index) => (
          <article
            className={`journal-card${index === 0 ? ' journal-card-featured' : ''}`}
            key={article.slug}
          >
            <Link
              to={`/blogs/${article.slug}`}
              className="journal-card-image"
              aria-label={`Baca ${article.title}`}
            >
              <img
                src={article.image}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                width="800"
                height="600"
              />
            </Link>
            <div className="journal-card-content">
              <div className="journal-card-meta">
                <span>Inspirasi</span>
                <span aria-hidden="true">/</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </div>
              <h2>
                <Link to={`/blogs/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.excerpt}</p>
              <Link to={`/blogs/${article.slug}`} className="journal-read-link">
                Baca cerita <span aria-hidden="true">↗</span>
                <span className="sr-only">: {article.title}</span>
              </Link>
            </div>
          </article>
        ))}
      </section>
      <aside className="container journal-closing">
        <span aria-hidden="true">✧</span>
        <p>
          Yang istimewa sering kali dimulai
          <br />
          dari perhatian yang sederhana.
        </p>
      </aside>
    </div>
  );
}
