'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const [petugas, setPetugas] = useState([]);
  const [layanan, setLayanan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staffRes, serviceRes] = await Promise.all([
          fetch('/api/staff'),
          fetch('/api/service'),
        ]);

        const staffData = await staffRes.json();
        const serviceData = await serviceRes.json();

        if (staffRes.ok) setPetugas(staffData);
        if (serviceRes.ok) setLayanan(serviceData);
      } catch (err) {
        console.error('Gagal fetch data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header className="bg-orange-500 text-white flex justify-between items-center px-8 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/image/logopaw.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold">PetGuardian</span>
        </div>
        <nav>
          <Link href="/login" className="hover:underline">Logout</Link>
        </nav>
      </header>

      {/* Title */}
      <section className="px-10 py-6">
        <h2 className="text-xl text-orange-500 font-semibold">Admin</h2>
      </section>

      {/* Content */}
      <section className="bg-white m-6 rounded-2xl shadow-sm px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daftar Petugas */}
        <div className="border-2 border-orange-300 rounded-xl p-6 text-orange-500">
          <h3 className="text-center font-bold text-lg mb-4">Daftar Petugas</h3>
          <ol className="list-decimal list-inside mb-6 space-y-2">
            {petugas.map((p, i) => (
              <li key={p.id || i} className="flex justify-between items-center">
                <span>{p.name || p.email}, {p.role}</span>
                {/* Tombol hapus bisa ditambahkan nanti jika ada DELETE API */}
              </li>
            ))}
          </ol>
          <div className="text-center">
            <Link
              href="/admin/add-staff"
              className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-md text-sm inline-flex items-center gap-2"
            >
              Tambah Petugas
            </Link>
          </div>
        </div>

        {/* Daftar Layanan */}
        <div className="border-2 border-orange-300 rounded-xl p-6 text-orange-500">
          <h3 className="text-center font-bold text-lg mb-4">Daftar Layanan</h3>
          <ol className="list-decimal list-inside mb-6 space-y-2">
            {layanan.map((l, i) => (
              <li key={l.id || i} className="flex justify-between items-start">
                <div>
                  <div>{l.nama}</div>
                  <div className="text-sm">{l.durasi}</div>
                  {l.role && <div className="text-sm">Role: {l.role}</div>}
                </div>
                {/* Tombol hapus bisa ditambahkan jika sudah punya endpoint DELETE */}
              </li>
            ))}
          </ol>
          <div className="text-center">
            <Link
              href="/admin/add-services"
              className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-md text-sm inline-flex items-center gap-2"
            >
              Tambah Layanan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
