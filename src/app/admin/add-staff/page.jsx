'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddStaffPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        name: form.name,
      }),
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert('Gagal menambahkan petugas: ' + result.error);
      return;
    }

    alert('Petugas berhasil ditambahkan!');
    router.replace('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans flex justify-center items-center">
      <div className="bg-white border-2 border-orange-400 rounded-xl p-8 w-full max-w-md shadow-md">
        <h2 className="text-center text-lg font-bold text-orange-500 mb-6">
          Tambah Petugas
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-orange-500 mb-1">Nama</label>
            <input
              type="text"
              placeholder="Nama Petugas"
              className="w-full border border-orange-300 px-4 py-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-orange-500 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email Petugas"
              className="w-full border border-orange-300 px-4 py-2 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-orange-500 mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-orange-300 px-4 py-2 rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 text-sm"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Tambah Petugas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
