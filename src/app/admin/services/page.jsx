'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('services') || '[]');
    setServices(data);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Daftar Layanan</h2>
      <Link href="/dashboard/admin/services/add">
        <button className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Tambah Layanan
        </button>
      </Link>
      <ul className="space-y-3">
        {services.map((service, index) => (
          <li key={index} className="bg-white p-4 rounded shadow">
            <p><strong>Nama Layanan:</strong> {service.name}</p>
            <p><strong>Deskripsi:</strong> {service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
