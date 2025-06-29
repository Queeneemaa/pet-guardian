'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [petugas, setPetugas] = useState([]);
  const [layanan, setLayanan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resStaff = await fetch('/api/staff');
        const resService = await fetch('/api/service');

        const dataStaff = await resStaff.json();
        const dataService = await resService.json();

        if (resStaff.ok) setPetugas(dataStaff);
        if (resService.ok) setLayanan(dataService);
      } catch (error) {
        console.error('Gagal fetch:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header className="bg-orange-500 text-white flex justify-between items-center px-8 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <img src="/image/Splash_Screen-removebg-preview.png" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PetGuardian</span>
        </div>
        <nav>
          <Link href="/login" className="hover:underline">
            Logout
          </Link>
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
            {petugas.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada petugas.</p>
            ) : (
              petugas.map((p, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{p.email} {p.role && `, ${p.role}`}</span>
                </li>
              ))
            )}
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
          <ol className="list-decimal list-inside mb-6 space-y-4">
            {layanan.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada layanan.</p>
            ) : (
              layanan.map((service, i) => (
                <li key={i} className="text-sm space-y-1">
                  <p><strong>Nama:</strong> {service.nama}</p>
                  <p><strong>Deskripsi:</strong> {service.deskripsi}</p>
                  {service.durasi && <p><strong>Durasi:</strong> {service.durasi}</p>}
                  {service.role && <p><strong>Role:</strong> {service.role}</p>}
                </li>
              ))
            )}
          </ol>
          <div className="text-center">
            <Link
              href="/admin/add-service"
              className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-md text-sm inline-flex items-center gap-2"
            >
              ➕ Tambah Layanan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
