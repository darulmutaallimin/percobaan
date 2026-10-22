# Website Pondok Pesantren Darul Mutaallimin

Buka index.html di browser. Tidak memerlukan instalasi, proses build, font daring, atau pustaka eksternal. Untuk hosting, unggah seluruh isi folder website ke direktori publik hosting. Pertahankan susunan folder.

- index.html: seluruh konten dan tautan.
- style.css: warna, tata letak, dan tampilan responsif.
- script.js: menu ponsel dan submenu program.
- assets/logo.png: salinan asli logo yang diberikan pengguna.

## Mengganti logo
Ganti assets/logo.png dengan logo baru dengan nama sama. Jika memakai nama atau format berbeda, ubah seluruh referensi assets/logo.png pada index.html, termasuk favicon. Logo asal bernama PT BERKAH TRININDO PRATAMA (3).png; isinya adalah logo pondok dan disalin tanpa perubahan.

## Mengganti foto pengurus
Simpan foto asli di assets/, misalnya foto-kiyai-saprudin.jpg. Di kartu pengurus yang sesuai pada index.html, ganti elemen div berkelas avatar dengan:

<img class="avatar" src="assets/foto-kiyai-saprudin.jpg" alt="Kiyai Saprudin" width="64" height="64" loading="lazy" style="object-fit:cover">

Gunakan foto yang benar dan diizinkan. Inisial saat ini hanya tempat foto sementara.

## Menambah berita
Pada index.html, temukan id="daftar-berita". Hapus div berkelas empty-state ketika berita nyata sudah tersedia. Tambahkan artikel dengan judul dan informasi yang telah diverifikasi, misalnya struktur berikut (ganti semua teks dalam kurung siku sebelum digunakan):

<article class="program-card">
  <p class="eyebrow">[Tanggal publikasi]</p>
  <h3>[Judul berita nyata]</h3>
  <p>[Isi berita yang telah diverifikasi]</p>
</article>

Jika ada beberapa artikel, tambahkan class program-grid pada wadah daftar-berita. Tidak ada berita contoh yang dipublikasikan dalam website ini.

## Catatan
Statistik: 50 total santri = 30 santriwan + 20 santriwati. Ubah ketiganya bersama jika data berubah. Tautan WhatsApp memuat pesan yang diberikan pengguna; email menggunakan mailto. Hero menampilkan jam WIB tanpa logo atau bingkai. Peta lokasi ditambahkan sesuai tautan pengguna. Situs statis ini tidak menyimpan data formulir; pesan konsultasi dibuka di WhatsApp untuk dikirim sendiri oleh pengunjung. Tombol kontak memerlukan aplikasi/layanan terkait dan koneksi internet.

## Navigasi tampilan
Beranda menampilkan sambutan singkat dan ringkasan Mengenal Pondok. Tombol Lihat selengkapnya membuka Profil. Setiap menu menampilkan kontennya sendiri dalam berkas index.html yang sama, melalui penanda URL seperti #profil dan #pengurus. Tombol Kembali/Maju browser tetap dapat digunakan. Kategori Mingguan/Bulanan/Tahunan tersedia di halaman Program Pondok. JavaScript diperlukan untuk pemisahan tampilan; jika dinonaktifkan, seluruh konten tetap terbaca.

## Pembaruan Beranda, kontak, dan peta
- Menu Tentang Pondok berisi Profil Darul Mutaallimin dan Pengurus Pondok.
- Jumlah santri ada di Beranda setelah Mengenal Pondok; angka bergerak sekitar 0,85 detik saat terlihat, dengan dukungan pengurangan animasi.
- Jam berjalan memakai zona Asia/Jakarta (WIB), mengikuti waktu perangkat pengunjung.
- Ganti setiap div berkelas photo-placeholder dengan img foto kegiatan asli; gunakan lebar 100%, aspect-ratio: 3/2 dan object-fit: cover. Perbarui judul sesuai foto. Saat ini tidak ada foto kegiatan rekaan.
- Formulir konsultasi menyusun pesan WhatsApp. Pengunjung menekan kirim di WhatsApp sendiri; data formulir tidak disimpan oleh situs.
- Peta menggunakan ID lokasi Google Maps yang ditemukan dari tautan yang diberikan pengguna (kgmid /g/11ssl8c6s8). Tautan asli tetap tersedia di bawah peta. Peta memerlukan internet.
- Bagian Mari terhubung (formulir konsultasi dan peta) tampil di Beranda dan Kontak. Footer tetap ada pada seluruh halaman.



## Foto pondok dan submenu program
Foto asli pengguna disalin tanpa perubahan ke assets/suasana-pondok.png dan digunakan di Beranda serta Profil. Ganti berkas tersebut untuk memperbarui kedua tampilan sekaligus. Pada desktop, foto Profil di kiri dan visi–misi di kanan; pada ponsel, keduanya tersusun vertikal. Menu Program Pondok memiliki submenu Mingguan, Bulanan, dan Tahunan. Kontak kini berupa tautan navigasi biasa.

## Struktur pengurus
Bagan terdiri atas satu pimpinan, empat pengasuh, dan dua lurah. Garis penghubung dibuat dengan CSS. Animasi masuk berjalan berurutan dari atas ke bawah saat halaman Pengurus dibuka dan dinonaktifkan jika pengunjung memilih pengurangan animasi pada perangkat.

## Animasi dan header
Setiap perpindahan halaman menggunakan animasi masuk halus. Submenu, tombol, kartu program, dan bagian Beranda memiliki transisi ringan. Header bersembunyi saat menggulir turun dan muncul kembali saat menggulir naik; header tetap terlihat ketika menu sedang dibuka atau digunakan dengan keyboard. Preferensi perangkat untuk mengurangi gerakan dihormati.

Animasi hero: judul tampil per kata dengan jeda 0,19–0,21 detik dan durasi 1,25 detik; teks dan tombol masuk dari kiri, jam dari kanan (dari atas pada ponsel). Seluruh urutan selesai sekitar 2,4 detik dan diputar ulang saat kembali ke Beranda. Preferensi pengurangan gerakan menonaktifkan efek ini.

## Latar hero
Foto latar tersimpan di assets/hero-santri.png. Foto asli disalin tanpa perubahan. Transparansi diatur melalui linear-gradient pada aturan .hero di bagian akhir style.css: nilai alpha .88/.75/.67 mengatur lapisan hijau gelap, dengan lapisan lebih rata pada ponsel. Teks hero berwarna putih dan kuning untuk keterbacaan.
