import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="container section empty-state">
          <p className="eyebrow">Ada yang terlewat</p>
          <h1>Halaman belum bisa ditampilkan.</h1>
          <p>Coba muat ulang untuk melanjutkan penjelajahanmu.</p>
          <button className="button" onClick={() => window.location.reload()}>
            Muat ulang
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
