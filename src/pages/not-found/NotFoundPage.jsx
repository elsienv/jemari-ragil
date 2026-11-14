import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="container section empty-state">
      <p className="eyebrow">404 · Halaman tidak ditemukan</p>
      <h1>Sepertinya kamu salah belok.</h1>
      <p>Masih banyak cerita kecil yang bisa kamu temukan di koleksi kami.</p>
      <Link className="button" to="/store">
        Jelajahi koleksi
      </Link>
    </section>
  );
}
