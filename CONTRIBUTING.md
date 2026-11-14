# Berkontribusi ke Jemari Ragil

Repository tujuan: [elsienv/jemari-ragil](https://github.com/elsienv/jemari-ragil).

Kerjakan perubahan di komputer melalui VS Code, jalankan pemeriksaan, lalu kirim ke GitHub. Alur yang dipakai adalah **branch → commit → push → pull request (PR) → merge ke `main`**. Branch `main` menyimpan versi proyek yang stabil.

## Persiapan lokal

Jalankan perintah dari terminal VS Code di folder proyek yang memiliki `package.json`. Contoh di bawah menggunakan PowerShell Windows; `npm.cmd` menjalankan npm tanpa bergantung pada izin eksekusi skrip PowerShell.

Jika belum memiliki salinan lokal, setelah repository tersedia kamu bisa mengambilnya dengan:

```powershell
git clone https://github.com/elsienv/jemari-ragil.git
cd jemari-ragil
npm.cmd ci
```

Jika sudah memiliki folder proyek, buka folder tersebut di VS Code. Tidak perlu meng-clone ulang. Pastikan `origin` menunjuk ke repository tujuan dengan `git remote -v`.

## 1. Mulai dari `main`, lalu buat branch

Simpan pekerjaan yang sedang berjalan dan periksa `git status` sebelum berpindah branch. Untuk pekerjaan baru, mulai dari `main` yang sudah diperbarui:

```powershell
git switch main
git pull --ff-only origin main
git switch -c feat/pencarian-produk
```

Gunakan nama branch yang menjelaskan satu pekerjaan:

- `feat/nama-fitur` untuk fitur baru.
- `fix/nama-masalah` untuk perbaikan bug.
- `refactor/nama-bagian` untuk perubahan struktur tanpa mengubah perilaku.

Jangan mengerjakan perubahan baru langsung di `main`. Jika perpindahan branch atau pembaruan gagal, baca pesan Git dan selesaikan penyebabnya sebelum melanjutkan; hindari menghapus pekerjaan lokal untuk melewati error.

## 2. Edit dan periksa di VS Code

Edit file secara lokal, lalu jalankan aplikasi saat perlu mencoba perilakunya:

```powershell
npm.cmd run dev
```

Sebelum membuat PR, jalankan pemeriksaan proyek:

```powershell
npm.cmd run check
```

Perbaiki kegagalan pemeriksaan sebelum mengajukan perubahan. Untuk perubahan tampilan, coba juga halaman terkait pada ukuran desktop dan ponsel. Jika dependensi berubah, jalankan `npm.cmd ci` untuk memasang versi sesuai lockfile.

## 3. Buat commit lokal

Periksa daftar file dan isi perubahan sebelum memasukkannya ke commit:

```powershell
git status
git diff
git add .
git diff --cached
git commit -m "feat: tambahkan pencarian produk"
```

`git add .` memasukkan seluruh perubahan yang tidak diabaikan dalam folder saat ini. Pastikan file yang tampil memang bagian dari pekerjaanmu. Gunakan pesan commit singkat yang menjelaskan perubahan. **Commit menyimpan riwayat di komputer; perubahan belum dikirim ke GitHub.**

## 4. Push branch ke GitHub

```powershell
git push -u origin feat/pencarian-produk
```

Gunakan nama branch yang kamu buat pada langkah pertama. GitHub mungkin meminta autentikasi akun saat push pertama. Setelah hubungan branch tersimpan melalui `-u`, push berikutnya dari branch yang sama cukup memakai `git push`.

**Push mengirim commit ke GitHub, tetapi belum menggabungkannya ke `main`.**

## 5. Buka dan tinjau pull request

Buka repository di GitHub, pilih **Pull requests → New pull request**, lalu pilih:

- **base:** `main`, sebagai tujuan penggabungan.
- **compare:** branch pekerjaanmu, misalnya `feat/pencarian-produk`.

Isi judul dan template PR: masalah yang diselesaikan, perubahan yang dibuat, serta pemeriksaan yang benar-benar dijalankan beserta hasilnya. Tambahkan bukti tampilan jika relevan. Periksa tab **Files changed** untuk memastikan tidak ada file yang ikut tanpa sengaja.

Jika perlu revisi, lanjutkan mengedit di VS Code pada branch yang sama. Jalankan kembali pemeriksaan yang relevan, buat commit baru, lalu `git push`. PR akan mengikuti commit terbaru pada branch tersebut.

## 6. Merge ke `main`

Setelah perubahan selesai ditinjau dan pemeriksaan yang diwajibkan berhasil, gabungkan PR melalui tombol **Merge pull request** di GitHub. Hapus branch pekerjaan di GitHub jika sudah tidak dibutuhkan, lalu perbarui salinan lokal:

```powershell
git switch main
git pull --ff-only origin main
```

Branch lokal yang sudah selesai dapat dihapus setelah memastikan hasilnya sudah masuk ke `main`:

```powershell
git branch -d feat/pencarian-produk
```

Mulai pekerjaan berikutnya dari branch baru. Jika demo GitHub Pages sudah diaktifkan, pembaruan demo mengikuti workflow deployment setelah perubahan masuk ke `main` dan deployment berhasil.

## Repository, branch, dan GitHub Projects

- **Repository** menyimpan kode, riwayat commit, dan PR proyek ini.
- **Branch** memisahkan pekerjaan yang sedang dikembangkan dari versi stabil di `main`.
- **Pull request** adalah tempat membandingkan, mendiskusikan, dan menggabungkan perubahan branch.
- **GitHub Projects** adalah papan tugas opsional, misalnya untuk kolom _Todo_, _In progress_, dan _Done_. Projects dapat menghubungkan issue dan PR, tetapi tidak menggantikan repository atau menjadi tempat menyimpan kode. Kamu bisa memakai alur di atas tanpa membuat Projects.
