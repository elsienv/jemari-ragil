# Jemari Ragil

Portofolio aplikasi toko hadiah, cetak foto, souvenir, dan aksesori. Berawal dari proyek skripsi, lalu dikembangkan dengan React + Vite dan alur belanja simulasi.

> **Demo nonkomersial.** Tidak menerima pembayaran, mengirim barang, atau menghubungi layanan toko. Gunakan data contoh saat checkout. Harga dan stok adalah data demonstrasi.

## Menjalankan di Windows PowerShell

Prasyarat: Node.js LTS yang memenuhi `engines` pada `package.json`, serta npm. Proyek dikembangkan dengan Node.js 24.

```powershell
npm.cmd ci
npm.cmd run dev
```

Buka alamat yang ditampilkan terminal, biasanya http://127.0.0.1:5173. Launcher `npm.cmd` dapat digunakan ketika PowerShell memblokir `npm.ps1`. Pada terminal lain, perintah `npm` biasa juga dapat digunakan.

```powershell
npm.cmd run check
npm.cmd run preview
```

Hasil produksi berada dalam `dist/`. `npm.cmd start` juga menjalankan server pengembangan.

## Fitur

- Beranda dan navigasi responsif.
- Katalog lokal dengan pencarian, kategori, rentang harga, stok, dan pengurutan.
- Detail produk, pilihan jumlah, keranjang, serta favorit yang bertahan setelah reload.
- Checkout tiga tahap: kontak, pengiriman, dan pembayaran simulasi.
- Riwayat pesanan demo per profil lokal, lengkap dengan subtotal dan ongkir contoh.
- Halaman cerita, tentang proyek, kontak simulasi, dan penanganan URL yang tidak ditemukan.
- Profil demo tanpa password. Ini tidak menggantikan autentikasi backend.

## Struktur kode

```text
src/
  app/          # routing, judul halaman, dan komposisi provider
  features/     # katalog, cart, checkout, profil, cerita, favorit, kontak, pesanan
  layouts/      # kerangka toko, header/footer, dan hook navigasi
  pages/        # beranda, tentang, dan halaman 404
  shared/       # komponen umum, hooks, utilitas, context, dan CSS global
  main.jsx      # entry aplikasi
public/images/  # aset lokal dari proyek asli
tests/          # tes aturan bisnis dan penyimpanan
scripts/        # pemeriksaan render dan batas arsitektur
```

Lihat [panduan arsitektur](docs/ARCHITECTURE.md) untuk tanggung jawab folder, pola hooks, serta cara menambahkan fitur.

## Perintah pengembangan

| Perintah                         | Tujuan                                                    |
| -------------------------------- | --------------------------------------------------------- |
| `npm.cmd run dev`                | Menjalankan development server                            |
| `npm.cmd run format`             | Merapikan format kode dan dokumentasi                     |
| `npm.cmd run format:check`       | Memeriksa format tanpa mengubah file                      |
| `npm.cmd run lint`               | Memeriksa JavaScript, JSX, serta aturan/dependensi hooks  |
| `npm.cmd test`                   | Menguji aturan bisnis dan storage                         |
| `npm.cmd run check:architecture` | Memeriksa import dan batas lapisan                        |
| `npm.cmd run check:render`       | Memeriksa halaman melalui router/provider/layout aplikasi |
| `npm.cmd run build`              | Membuat hasil produksi                                    |
| `npm.cmd run check`              | Menjalankan seluruh pemeriksaan fungsional dan build      |

## Gambar dan data contoh

Simpan gambar dalam `public/images/`. Daftar produk/kategori berada di `src/features/catalog/data/catalog.js`, artikel di `src/features/stories/data/articles.js`, dan gambar hero di `src/pages/home/HomePage.jsx`.

## Penyimpanan dan privasi

Keranjang, favorit, profil, serta pesanan demo memakai storage browser dengan awalan `jemari-ragil:`. Draft checkout memakai sessionStorage. Data tidak dikirim ke GitHub atau server lain. Menghapus site data pada browser akan menghapus data demonstrasi. Jangan memasukkan alamat, email, password, atau informasi pembayaran asli.

Refactor folder mempertahankan kunci dan format storage yang sudah digunakan. Nama profil bukan identitas akun yang terverifikasi. Aplikasi belum memiliki autentikasi server, stok bersama, pengiriman, atau pembayaran riil.

## Pengembangan berikutnya

Backend Node.js + TypeScript dan PostgreSQL direncanakan sebagai tahap terpisah. Database akan menggantikan katalog lokal; autentikasi, harga, stok, dan pembuatan pesanan akan diverifikasi server.

## Aset dan asal proyek

Aset produk dan materi visual berasal dari koleksi proyek skripsi Jemari Ragil milik pengembang. Gambar asli di folder induk tetap dipertahankan. Kode frontend tidak bergantung pada repositori JSON GitHub atau CDN eksternal. Pastikan hak penggunaan aset sebelum memakai proyek untuk tujuan lain.

Lihat [catatan pengembangan](docs/DEVELOPMENT.md) untuk batasan dan pemeriksaan.
