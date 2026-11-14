import { useScrollToSection } from '../shared/hooks/useScrollToSection';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function StorefrontLayout() {
  const skipToContent = useScrollToSection('main-content', { focus: true });
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content" onClick={skipToContent}>
        Lewati ke konten
      </a>
      <Header />
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
