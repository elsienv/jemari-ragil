import { assetUrl } from '../../../shared/lib/assets';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUser } from 'react-icons/fi';
import { useDemoProfileForm } from '../hooks/useDemoProfileForm';
import './DemoLoginPage.css';
export default function DemoLoginPage() {
  const { profile, name, handleNameChange, submit, handleUseGuest } = useDemoProfileForm();
  return (
    <section className="container section demo-login">
      <div className="demo-login-story">
        <p className="eyebrow">Kenalan dulu, yuk</p>
        <h1>
          Ruang kecil untuk
          <br />
          <em>cerita personalmu.</em>
        </h1>
        <p>Simpan favorit dan temukan pilihan yang dekat dengan ceritamu.</p>
        <img
          src={assetUrl('/images/product-13-pht.jpeg')}
          alt="Cetakan foto polaroid dalam koleksi Jemari Ragil"
        />
      </div>
      <div className="demo-login-card">
        <span className="demo-login-icon">
          <FiUser />
        </span>
        <p className="eyebrow">Profil belanja</p>
        <h2>{profile ? 'Halo, ' + profile.name : 'Siapa nama panggilanmu?'}</h2>
        <p>Isi nama panggilan agar kami bisa menyapamu saat menjelajah koleksi.</p>
        <form onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="demo-name">Nama panggilan</label>
            <input
              id="demo-name"
              name="name"
              value={name}
              onChange={handleNameChange}
              maxLength={40}
              required
              autoComplete="nickname"
              placeholder="Contoh: Elsie"
            />
          </div>
          <button className="button" type="submit">
            Lanjut belanja <FiArrowRight />
          </button>
        </form>
        {profile && (
          <button className="button-quiet" onClick={handleUseGuest}>
            Jelajahi sebagai tamu
          </button>
        )}
        <Link className="text-link" to="/store">
          Lanjut tanpa profil
        </Link>
        <div className="demo-login-note">Pilihanmu tersimpan di perangkat ini.</div>
      </div>
    </section>
  );
}
