# Publikasi GitHub dan demo

Target repository: https://github.com/elsienv/jemari-ragil

Target demo: https://elsienv.github.io/jemari-ragil/

Link di atas adalah alamat tujuan. Ketersediaan demo ditentukan hasil deployment pada tab Actions dan Settings > Pages.

## Cara kerjanya

- Kode disimpan di repository, pada branch `main`.
- Pull request menjalankan formatter, lint, tes, render, build biasa, dan pemeriksaan build GitHub Pages.
- Push/merge ke `main` menjalankan pemeriksaan yang sama, lalu menerbitkan `dist/` ke GitHub Pages.
- Halaman dibuka lewat GitHub Pages; tab Projects tidak digunakan untuk hosting.

Di Settings > Pages, sumber publikasi harus **GitHub Actions**. Workflow ada di `.github/workflows/portfolio.yml` dan tidak memerlukan token manual dalam source.

## Build khusus Pages

```powershell
npm.cmd run build:pages
npm.cmd run check:pages
npm.cmd run preview -- --base=/jemari-ragil/
```

Build ini memakai base `/jemari-ragil/` serta mode `github-pages`. Router menggunakan hash agar halaman katalog/detail bisa dimuat ulang pada static hosting. Contoh alamat detail: `https://elsienv.github.io/jemari-ragil/#/product/1`.

Development lokal dengan `npm.cmd run dev` tetap memakai URL normal. Untuk build hosting pada root domain, gunakan `npm.cmd run build`.

Semua gambar memakai helper `shared/lib/assets.js` agar prefix repository diterapkan dengan benar. Katalog, favorit, dan pesanan tetap merupakan demonstrasi browser; GitHub Pages tidak menyediakan backend atau database.

## Menambah fitur

Ikuti [CONTRIBUTING.md](../CONTRIBUTING.md). Buat branch fitur dari main, kerjakan kode lokal, jalankan pemeriksaan, push branch, dan buka PR ke main. Setelah PR digabung, demo diperbarui oleh workflow.

Tidak perlu mengunggah `node_modules`, `dist`, atau file `.env`.
