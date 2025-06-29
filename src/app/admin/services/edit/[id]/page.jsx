'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    nama: '',
    deskripsi: '',
    durasi: '',
    role: '',
  });

  useEffect(() => {
    const fetchService = async () => {
      const res = await fetch(`/api/service/${id}`);
      const data = await res.json();
      if (res.ok) {
        setForm({
          nama: data.nama,
          deskripsi: data.deskripsi,
          durasi: data.durasi || '',
          role: data.role || '',
        });
      } else {
        alert('Gagal mengambil data layanan');
      }
    };
    fetchService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/service/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Layanan berhasil diperbarui');
      router.push('/admin/services'); // ganti sesuai path halaman daftar layananmu
    } else {
      alert('Gagal update layanan: ' + data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf5] font-sans">
      <div className="bg-white p-8 rounded-xl border-2 border-orange-300 w-full max-w-md shadow">
        <h2 className="text-xl text-orange-500 font-bold mb-6 text-center">Edit Layanan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Layanan"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full border border-orange-300 px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            className="w-full border border-orange-300 px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Durasi (misal: 30 menit)"
            value={form.durasi}
            onChange={(e) => setForm({ ...form, durasi: e.target.value })}
            className="w-full border border-orange-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Role (opsional)"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border border-orange-300 px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
