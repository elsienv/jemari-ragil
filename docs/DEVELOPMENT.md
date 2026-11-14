# Catatan pengembangan

## Perubahan fondasi

- Create React App diganti Vite; entry berada di index.html dan src/main.jsx.
- Dependensi template yang tidak digunakan dihapus dari package.json.
- Katalog dan artikel lokal menggantikan JSON jarak jauh.
- Aset aktif tersedia pada public/images; koleksi asli tidak diubah.
- Request tulis GitHub dan token tertanam dihapus dari frontend.
- Tidak ada penerbitan atau push GitHub yang dilakukan oleh proses pengembangan ini.

## Pemeriksaan sebelum publikasi repo

- Cabut token GitHub lama jika masih aktif. Menghapus nilai dari source tidak mencabut token yang pernah terekspos.
- Jangan melacak node_modules, dist, file .env, atau data pribadi.
- Jalankan npm ci, npm test, dan npm run build.
- Coba katalog, produk habis, pencarian kosong, checkout sebagian barang, refresh antar tahap, dan riwayat pesanan.
- Isi README dengan screenshot terbaru dan identitas pengembang bila ingin ditambahkan.

## Batasan demo

Pesanan hanya tersimpan pada browser. Profil tidak memakai password atau verifikasi server. Ongkir tetap adalah contoh, stok bukan persediaan bersama, dan pembayaran tidak memindahkan uang. Form kontak tidak mengirim pesan. Backend proper direncanakan pada tahap selanjutnya.

## Hasil verifikasi perubahan awal

- 17 pengujian data, filter, cart, penyimpanan, dan checkout lulus.
- Build produksi Vite berhasil.
- 19 render halaman dengan state kosong/terisi lulus melalui npm run check:render.
- Pemeriksaan visual Chrome dihentikan kontrol computer-use karena URL browser Windows tidak dapat diverifikasi. Responsivitas dan interaksi browser belum diuji secara visual.

## Refactor struktur dan hooks

Kode dipisahkan ke app, features, layouts, pages, dan shared. URL, data katalog, kelas CSS, serta kunci penyimpanan demo dipertahankan. Panduan penambahan fitur tersedia dalam ARCHITECTURE.md. Formatter, lint hooks, dan pemeriksaan batas dependensi ditambahkan untuk menjaga struktur tetap konsisten.
