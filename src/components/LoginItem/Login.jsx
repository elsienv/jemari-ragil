import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiUser } from 'react-icons/fi';
import { useDemoSession } from '../../context/DemoSessionContext';
import { useToast } from '../../context/ToastContext';
import './Login.css';
export default function Login() {
  const { profile, enterDemo, leaveDemo } = useDemoSession();
  const [name, setName] = useState(profile?.name || '');
  const { notify } = useToast();
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    if (enterDemo(name)) { notify('Selamat datang, ' + name.trim() + '!'); navigate('/store'); }
  };
  return <section className="container section demo-login">
    <div className="demo-login-story"><p className="eyebrow">Kenalan dulu, yuk</p><h1>Ruang kecil untuk<br /><em>cerita personalmu.</em></h1><p>Simpan favorit dan coba perjalanan belanja dengan namamu sendiri.</p><img src="/images/product-13-pht.jpeg" alt="Cetakan foto polaroid dalam koleksi Jemari Ragil" /></div>
    <div className="demo-login-card"><span className="demo-login-icon"><FiUser /></span><p className="eyebrow">Profil demo</p><h2>{profile ? 'Halo, ' + profile.name : 'Siapa nama panggilanmu?'}</h2><p>Ini profil lokal untuk mencoba portofolio. Tidak memerlukan password dan bukan autentikasi akun sungguhan.</p>
      <form onSubmit={submit}><div className="form-field"><label htmlFor="demo-name">Nama panggilan</label><input id="demo-name" name="name" value={name} onChange={(event) => setName(event.target.value)} maxLength={40} required autoComplete="nickname" placeholder="Contoh: Elsie" /></div><button className="button" type="submit">Mulai jelajahi <FiArrowRight /></button></form>
      {profile && <button className="button-quiet" onClick={() => { leaveDemo(); setName(''); notify('Kamu sekarang menjelajah sebagai tamu.'); }}>Gunakan mode tamu</button>}
      <Link className="text-link" to="/store">Lanjut tanpa profil</Link><div className="demo-login-note">Gunakan data contoh saat checkout. Data demo tersimpan pada browser ini.</div>
    </div>
  </section>;
}
