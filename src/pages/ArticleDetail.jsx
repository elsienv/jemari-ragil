import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { articles } from '../data/catalog';
import { formatDate } from '../lib/format';
import './Blog.css';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find(item => item.slug === slug);
  if (!article) return <section className="container section empty-state"><p className="eyebrow">Cerita tidak ditemukan</p><h1>Masih ada cerita lainnya.</h1><p>Halaman yang kamu cari belum tersedia.</p><Link to="/blogs" className="button">Kembali ke cerita</Link></section>;
  const moreStories = articles.filter(item => item.slug !== slug).slice(0, 2);

  return (
    <div className="article-page">
      <header className="container article-heading">
        <Link to="/blogs" className="article-back-link"><span aria-hidden="true">←</span> Semua cerita</Link>
        <p className="eyebrow">Catatan dari Jemari</p>
        <h1>{article.title}</h1>
        <p className="article-excerpt">{article.excerpt}</p>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </header>
      <div className="container article-cover"><img src={article.image} alt="" width="1200" height="700" /></div>
      <article className="article-body">
        {article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        <div className="article-endmark" aria-hidden="true">✧</div>
        <aside className="article-shop-note"><p>Sudah menemukan inspirasi?</p><Link to="/store" className="button-secondary">Temukan hadiahmu <span aria-hidden="true">↗</span></Link></aside>
      </article>
      {moreStories.length > 0 && <section className="container article-more"><div className="article-more-heading"><p className="eyebrow">Lanjutkan membaca</p><h2 className="section-heading">Masih ada yang ingin diceritakan.</h2></div><div className="article-more-grid">{moreStories.map(item => <article className="journal-card" key={item.slug}><Link to={`/blogs/${item.slug}`} className="journal-card-image" aria-label={`Baca ${item.title}`}><img src={item.image} alt="" loading="lazy" width="800" height="600" /></Link><div className="journal-card-content"><p className="journal-card-meta"><time dateTime={item.date}>{formatDate(item.date)}</time></p><h3><Link to={`/blogs/${item.slug}`}>{item.title}</Link></h3><Link to={`/blogs/${item.slug}`} className="journal-read-link">Baca cerita <span aria-hidden="true">↗</span><span className="sr-only">: {item.title}</span></Link></div></article>)}</div></section>}
    </div>
  );
}
