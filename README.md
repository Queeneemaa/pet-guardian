# Pet Guardian: Web Platform for Pet Care Services

**Pet Guardian** adalah platform berbasis web yang membantu pemilik hewan memesan layanan grooming, vaksin, dan penitipan. Aplikasi juga mendukung pengelolaan data layanan dan penugasan staff oleh admin.

[📄 Dokumentasi lengkap](https://itsacid-my.sharepoint.com/:w:/g/personal/5053231029_student_its_ac_id/EZr6SRtXjaVOgiNmc1rfajkBmW7Sh03ZwJ2rdcxLRhXFGw)

---

## Goals

- Mempermudah booking layanan hewan peliharaan
- Memberikan kontrol ke admin untuk mengelola layanan & staff
- Memberikan kemudahan pelaporan status oleh petugas

---

## Fitur Utama

- Manajemen profil hewan
- Pemesanan layanan tanpa pembayaran
- Penugasan petugas oleh admin
- Dashboard status booking untuk semua role

---

## Arsitektur Sistem

Sistem dibangun dengan pendekatan modular berbasis **Next.js App Router** dan Supabase. Semua API ditangani via `API Routes` dan database menggunakan **Supabase client**.

**Stack:**
- Next.js (Frontend + API Routes)
- Supabase (DB + Auth)
- TailwindCSS (UI)
- Vercel (Deploy)

---

## Clean Architecture View

- **Entities:** User, Booking, Service
- **Use Cases:** Pemesanan, Penugasan, Update status
- **Adapters:** API Routes dan Komponen React
- **Drivers:** Next.js, Supabase

---

## Struktur Folder

```bash
/app            # Halaman per-role
/app/api        # API modular (booking, service, staff)
/components     # UI Reusable (Form, Card)
/lib            # Supabase client & helper
/styles         # Tailwind global
middleware.js   # Auth & Role-based protection
```

## Stakeholders

| Role  | Ekspektasi                           |
| ----- | ------------------------------------ |
| Owner | Booking mudah & status layanan jelas |
| Admin | Kelola layanan dan staff             |
| Staff | Lihat tugas & update status layanan  |

---

## Quality Attributes

| Attribute       | Deskripsi                      |
| --------------- | ------------------------------ |
| Usability       | UI sederhana, mobile-friendly  |
| Security        | Role-based auth via middleware |
| Maintainability | Struktur modular               |
| Performance     | Supabase dengan query indexed  |

---

## Risiko & Utang Teknis

| Risiko                   | Dampak | Mitigasi                            |
| ------------------------ | ------ | ----------------------------------- |
| Supabase dependency      | Sedang | Siapkan fallback                    |
| Belum ada notifikasi     | Sedang | Tambah WebSocket/Pusher             |
| Middleware auth terbatas | Rendah | Refactor ke HOC + middleware server |

---

## Glosarium

- Booking: Pemesanan layanan
- Supabase: Backend-as-a-service
- Middleware: Proteksi route berdasarkan role
- Staff: Petugas layanan hewan

---
