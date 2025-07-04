## 🐾 Pet Guardian: Web Platform for Pet Care Services
===
Pet Guardian adalah platform berbasis web yang dirancang untuk membantu pemilik hewan peliharaan dalam memesan layanan perawatan seperti grooming, vaksinasi, dan penitipan. Sistem ini juga memfasilitasi admin dalam mengelola jenis layanan dan staf, serta memungkinkan staf untuk menerima dan menyelesaikan tugas layanan.

🎯 Goals
Pet Guardian bertujuan untuk:

Memberikan sistem manajemen layanan hewan yang efisien dan terstruktur.

Mempermudah pemilik hewan dalam melakukan booking layanan tanpa proses transaksi online.

Memberikan visibilitas dan kontrol kepada admin atas layanan dan staf.

Memberikan akses mudah bagi staf untuk menyelesaikan tugas layanan berdasarkan penugasan.

🛠️ Fitur Utama
Manajemen profil hewan (nama, jenis, umur, foto)

Form booking layanan tanpa pembayaran

Tampilan tugas harian untuk staff

Riwayat layanan oleh owner

Penugasan staff oleh admin

Dashboard monitoring layanan (admin)

🧱 Arsitektur Sistem
Aplikasi menggunakan arsitektur modular berbasis Next.js App Router dengan pendekatan clean separation antara halaman UI, route API, dan logika database.

🧅 Clean Architecture View (Model Bawang)
Entities: Model seperti User, Booking, Service, dan Staff

Use Cases: Pemesanan layanan, penugasan staff, perubahan status layanan

Interface Adapters: Halaman Next.js dan API Routes (/app/api)

Frameworks & Drivers: Next.js, Supabase, Tailwind CSS

🔄 Data Flow Context
👤 User Journey (Booking Layanan)
Pemilik hewan membuka dashboard dan memilih layanan.

Mengisi formulir booking → dikirim ke API Booking.

Sistem menyimpan data ke tabel bookings di Supabase.

Admin akan melihat daftar booking dan menetapkan petugas.

Status layanan diperbarui oleh staff dari "pending" → "diproses" → "selesai".

🧑‍💼 Admin Journey (Manajemen Layanan & Staff)
Admin login dan membuka dashboard.

Menambahkan layanan baru via add-service.

Menambahkan atau mengelola data petugas via add-staff.

Menetapkan petugas ke booking yang masuk.

Memantau riwayat dan status booking di dashboard.

🧩 Rangkuman Komponen
Komponen	Fungsi
PetForm	Menambahkan data hewan peliharaan
BookingForm	Mengirim permintaan layanan
BookingCard	Menampilkan daftar booking untuk user atau staff
StaffDashboard	Menampilkan daftar tugas layanan
AdminPanel	Kelola layanan, data staff, dan lihat booking
API Routes	auth, booking, service, staff (GET, POST, PATCH)
Supabase Client	Autentikasi dan koneksi database

🎯 Quality Objectives
Quality Attribute	Deskripsi
Usability	UI sederhana, bisa digunakan semua peran (admin/user/staff) dari mobile
Security	Auth & proteksi role via middleware & JWT
Maintainability	Struktur modular, logic terpisah antara UI dan data
Scalability	Mudah ditambah fitur (misal notifikasi, pembayaran, dsb.)

⛓️ Constraints
Framework: Next.js (App Router) + TypeScript

Database: Supabase (PostgreSQL)

Auth: Supabase Auth

Deployment: Vercel

UI Tools: Tailwind CSS

ORM: Native Supabase client (bukan Prisma)

👥 Stakeholders
Peran	Ekspektasi
Owner (User)	Booking mudah, dapat melihat status layanan
Admin	Dapat kelola layanan, petugas, dan memantau proses
Staff	Tugas layanan terlihat jelas dan bisa update status
Developer	Kode rapi dan modular, mudah di-maintain dan scalable

📁 Struktur Folder Utama
pgsql
Copy
Edit
/app — halaman UI per role (admin, owner, staff)
/app/api/* — endpoint backend modular (booking, service, staff)
/components — reusable React components
/lib — Supabase client dan utilitas
/styles — global styling (Tailwind)
middleware.js — proteksi route berbasis role
📌 Contoh Skenario Kualitas
Usability: Staff bisa ubah status layanan hanya dalam 2 klik

Security: Owner tidak bisa akses halaman staff atau admin

Performance: Response booking <300ms karena caching dan indexing di Supabase

Reliability: Jika 2 admin tetapkan petugas yang sama, sistem update terakhir yang berlaku

⚠️ Risiko & Utang Teknis
Risiko	Dampak	Mitigasi
Ketergantungan penuh pada Supabase	Sedang	Dokumentasikan opsi fallback (misalnya backend custom)
Tidak ada notifikasi real-time	Sedang	Rencana ekspansi ke push notification via Pusher
Middleware role kurang fleksibel	Rendah	Refactor sistem auth lebih modular

📚 Glosarium
Booking: Pemesanan layanan oleh user

Supabase: Layanan backend all-in-one (auth + DB)

API Route: Endpoint backend di Next.js (mirip controller)

Middleware: Logic proteksi route di Next.js

Staff: Petugas layanan seperti groomer atau penjaga hotel hewan

