'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddServicePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: '',
    deskripsi: '',
    durasi: '',
    role: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('File harus berupa JPG, JPEG, atau PNG');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 2MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nama || !form.deskripsi || !imageFile) {
      alert('Nama, deskripsi, dan gambar wajib diisi');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('nama', form.nama);
    formData.append('deskripsi', form.deskripsi);
    formData.append('durasi', form.durasi);
    formData.append('role', form.role);
    formData.append('image', imageFile);

    const res = await fetch('/api/services', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(`Gagal: ${result.error}`);
      return;
    }

    alert('Layanan berhasil ditambahkan!');
    router.push('/dashboard/admin/services');
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans flex justify-center items-center">
      <div className="bg-white border-2 border-orange-400 rounded-xl p-8 w-full max-w-md shadow-md">
        <h2 className="text-center text-lg font-bold text-orange-500 mb-6">
          Tambah Layanan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-orange-500 mb-1">Nama Layanan</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border border-orange-300 px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-orange-500 mb-1">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              className="w-full border border-orange-300 px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-orange-500 mb-1">Durasi</label>
            <input
              type="text"
              name="durasi"
              value={form.durasi}
              onChange={handleChange}
              className="w-full border border-orange-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-orange-500 mb-1">Role (opsional)</label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-orange-300 px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-orange-500 mb-1">Upload Gambar</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-md border border-orange-300"
              />
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 text-sm inline-flex items-center gap-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Menyimpan...' : 'Tambah Layanan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
