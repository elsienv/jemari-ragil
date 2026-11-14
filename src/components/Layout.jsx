import { Outlet } from 'react-router-dom';
import Header from './HeaderItem/Header';
import Footer from './FooterItem/Footer';
export default function Layout() {
  return <div className="app-shell"><a className="skip-link" href="#main-content">Lewati ke konten</a><Header /><main id="main-content" tabIndex="-1"><Outlet /></main><Footer /></div>;
}
