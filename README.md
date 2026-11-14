# Jemari Ragil

Portofolio aplikasi toko hadiah, cetak foto, souvenir, dan aksesori. Berawal dari proyek skripsi, lalu dikembangkan kembali dengan React + Vite dan alur belanja simulasi.

> **Demo nonkomersial.** Tidak menerima pembayaran, mengirim barang, ataupun menghubungi layanan toko. Gunakan data contoh saat checkout. Harga dan stok adalah data demonstrasi.

## Menjalankan

Prasyarat: Node.js 22.12 atau lebih baru (disarankan Node.js LTS), npm.

```sh
npm ci
npm run dev
```

Buka alamat yang ditampilkan terminal, biasanya http://127.0.0.1:5173.

```sh
npm test
npm run build
npm run preview
```

Hasil produksi berada dalam folder `dist/`. `npm start` juga menjalankan server pengembangan.

## Fitur

- Beranda dan navigasi responsif.
- Katalog lokal dengan pencarian, kategori, rentang harga, stok, dan pengurutan.
- Detail produk, pilihan jumlah, keranjang, serta favorit yang bertahan setelah reload.
- Checkout tiga tahap: kontak, pengiriman, dan pembayaran simulasi.
- Riwayat pesanan demo per profil lokal, lengkap dengan subtotal dan ongkir contoh.
- Halaman cerita, tentang proyek, kontak simulasi, dan penanganan URL yang tidak ditemukan.
- Profil demo tanpa password. Ini tidak menggantikan autentikasi backend.

## Struktur

```text
src/
  components/    # komponen UI, cart, wishlist, dan checkout
  context/       # profil demo, notifikasi, dan draft checkout
  data/          # katalog dan artikel contoh lokal
  lib/           # perhitungan, pencarian, format, dan penyimpanan
  pages/         # halaman aplikasi
public/images/   # aset lokal dari proyek asli
tests/           # pengujian perilaku data dan perhitungan
```

## Penyimpanan dan privasi

Keranjang, favorit, profil, serta pesanan demo memakai penyimpanan browser dengan awalan `jemari-ragil:`. Draft checkout memakai sessionStorage. Data tidak dikirim ke GitHub atau server lain. Menghapus site data pada browser akan menghapus data demonstrasi. Jangan memasukkan alamat, email, password, atau informasi pembayaran asli.

Harga dan stok divalidasi terhadap katalog lokal untuk konsistensi demo. Aplikasi ini belum memiliki jaminan keamanan server, autentikasi nyata, stok bersama, pengiriman, atau pembayaran riil. Nama profil bukan identitas akun yang terverifikasi.

## Pengembangan berikutnya

Backend Node.js + TypeScript dan PostgreSQL direncanakan sebagai tahap terpisah. Database akan menggantikan katalog lokal; autentikasi, harga, stok, dan pembuatan pesanan akan diverifikasi server.

## Aset dan asal proyek

Aset produk dan materi visual berasal dari koleksi proyek skripsi Jemari Ragil milik pengembang. Gambar asli di folder induk tetap dipertahankan. Kode frontend tidak bergantung pada repositori JSON GitHub atau CDN eksternal. Pastikan hak penggunaan aset sebelum memakai proyek ini untuk tujuan lain.

Lihat [catatan pengembangan](docs/DEVELOPMENT.md) untuk batasan dan pemeriksaan.
