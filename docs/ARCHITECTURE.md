# Struktur dan aturan pengembangan

Proyek ini memakai struktur berdasarkan fitur. Halaman tetap menggunakan URL yang sama; pemisahan folder bertujuan membuat UI, state React, dan aturan bisnis lebih mudah ditemukan dan diuji.

## Peta folder

```text
src/
  app/
    App.jsx
    config/routes.js
    hooks/usePageEffects.js
    providers/AppProviders.jsx
    routes/AppRoutes.jsx
  features/
    catalog/
      components/
      data/
      hooks/
      lib/
      pages/
    cart/
      context/
      hooks/
      lib/
      pages/
      providers/
    checkout/
      components/
      context/
      hooks/
      lib/
      pages/
      providers/
    contact/
      hooks/
      pages/
    orders/
      hooks/
      pages/
    session/
      context/
      hooks/
      pages/
      providers/
    stories/
      data/
      pages/
    wishlist/
      context/
      hooks/
      pages/
      providers/
  layouts/
    components/
    config/
    hooks/
    StorefrontLayout.jsx
  pages/
    about/
    home/
    not-found/
  shared/
    components/
    context/
    hooks/
    lib/
    providers/
    styles/
  main.jsx
```

Buat subfolder hanya ketika ada kode yang memerlukannya. Fitur baru tidak harus mempunyai seluruh jenis folder di atas.

## Tanggung jawab setiap lapisan

| Lapisan    | Isi                                                                     |
| ---------- | ----------------------------------------------------------------------- |
| `app`      | Komposisi aplikasi, daftar rute, pemasangan provider, dan efek navigasi |
| `features` | Perilaku dan tampilan yang terkait dengan satu fitur                    |
| `layouts`  | Header, footer, navigasi, dan kerangka halaman toko                     |
| `pages`    | Halaman informasi umum yang tidak memiliki state fitur sendiri          |
| `shared`   | Komponen dan utilitas umum tanpa pengetahuan tentang fitur tertentu     |

`shared` tidak boleh mengimpor `features`, `layouts`, `pages`, atau `app`. Fitur tidak boleh mengimpor lapisan komposisi `app`, `layouts`, atau halaman informasi umum. Jika fitur lain diperlukan, impor modul yang spesifik seperti consumer hook, komponen, data, atau pure helper; jangan mengimpor provider fitur lain.

## Pola hooks dan context

Contoh fitur keranjang:

- `context/CartContext.js`: deklarasi context dengan `createContext`.
- `hooks/useCartState.js`: state, aksi, dan sinkronisasi penyimpanan.
- `providers/CartProvider.jsx`: memasang state ke context.
- `hooks/useCart.js`: akses aman ke context untuk konsumen.
- `hooks/useCartPage.js`: pilihan barang, navigasi checkout, dan aksi halaman.
- `pages/CartPage.jsx`: markup yang menggunakan hasil hook.
- `lib/cart.js`: fungsi murni yang tidak membutuhkan React atau browser.

Custom hook hanya dibuat saat ada state, efek, atau interaksi yang memang perlu dikelola. Perhitungan murni diletakkan dalam `lib`; halaman yang hanya menampilkan data tidak memerlukan hook tambahan.

Provider dipasang satu kali melalui `app/providers/AppProviders.jsx`. Urutannya penting: notifikasi, profil demo, cart, wishlist, lalu checkout. Hooks konsumen akan memberi error yang jelas bila dipakai di luar provider yang sesuai.

## Menambahkan atau mengubah fitur

1. Tentukan fitur pemiliknya, lalu buat komponen/halaman di dalam fitur tersebut.
2. Pisahkan state, efek, validasi form yang berhubungan dengan React, dan aksi navigasi ke hook yang relevan.
3. Simpan aturan bisnis tanpa React dalam `lib` dan uji kasus perilaku yang penting.
4. Daftarkan halaman dan judulnya di `app/config/routes.js`.
5. Jika membutuhkan state global baru, pasang provider melalui `AppProviders`.
6. Jalankan formatter dan pemeriksaan proyek sebelum commit.

Nama komponen, halaman, dan provider menggunakan PascalCase dengan ekstensi `.jsx`. Hooks menggunakan nama `use...` dan ekstensi `.js`. Data, context, dan pure helper menggunakan `.js`.

CSS halaman/komponen tetap diletakkan di dekat pemiliknya. Token desain dan reset global berada di `shared/styles/global.css`, yang dimuat sebelum CSS komponen untuk menjaga urutan cascade.

## Data, gambar, dan penyimpanan

- Produk/kategori: `features/catalog/data/catalog.js`.
- Artikel: `features/stories/data/articles.js`.
- Gambar: `public/images/`, dipanggil lewat `/images/nama-file`.
- Format rupiah/tanggal: `shared/lib/format.js`.
- Pembacaan dan penulisan storage: `shared/lib/storage.js`.
- Validasi pesanan demo: `features/checkout/lib/checkout.js`.
- Perhitungan pengiriman/total: `features/checkout/lib/totals.js`.

Kunci storage dan format data demo dipertahankan agar cart, favorit, profil, draft checkout, dan pesanan yang sudah tersimpan tetap terbaca.

Backend adalah tahap terpisah. Ketika API tersedia, tambahkan adapter API pada fitur pemiliknya dan ganti sumber data melalui hook terkait. Endpoint, token, dan penulisan database tidak ditempatkan di komponen tampilan.

## Perintah untuk PowerShell

```powershell
npm.cmd run dev
npm.cmd run format
npm.cmd run format:check
npm.cmd run lint
npm.cmd run check
```

`check` menjalankan lint, tes perilaku, pemeriksaan batas dependensi folder, render rute aplikasi, dan build produksi. Pemeriksaan render menggunakan routing, provider, serta layout aplikasi yang sama untuk mengurangi risiko perbedaan antara tes dan aplikasi.

Pemeriksaan render tidak menggantikan pengujian interaksi dan tampilan pada browser.
