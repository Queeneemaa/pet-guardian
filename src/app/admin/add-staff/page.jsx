'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddStaffPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('staffs') || '[]');
    const updated = [...existing, form];
    localStorage.setItem('staffs', JSON.stringify(updated));
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
              className="w-full border border-orange-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
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
              className="w-full border border-orange-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-orange-500 mb-1">Role</label>
            <input
              type="text"
              placeholder="Role (mis. Dokter, Groomer, etc)"
              className="w-full border border-orange-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 text-sm inline-flex items-center gap-2"
            >
              Tambah Petugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
