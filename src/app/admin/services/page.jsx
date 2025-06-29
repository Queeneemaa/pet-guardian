'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const router = useRouter();

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/service');
      const data = await res.json();

      if (res.ok) {
        setServices(data.services || []); // pastikan format response sesuai
      } else {
        console.error('Gagal fetch services:', data.error);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus layanan ini?');
    if (!confirm) return;

    const res = await fetch(`/api/service/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    if (res.ok) {
      alert('Layanan berhasil dihapus');
      fetchServices(); // refresh daftar layanan
    } else {
      alert('Gagal menghapus: ' + data.error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Daftar Layanan</h2>

      <Link href="/admin/add-service">
        <button className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Tambah Layanan
        </button>
      </Link>

      <ul className="space-y-3">
        {services.length === 0 ? (
          <p className="text-gray-500">Belum ada layanan.</p>
        ) : (
          services.map((service) => (
            <li
              key={service.id}
              className="bg-white p-4 rounded shadow border border-orange-200"
            >
              <p><strong>Nama Layanan:</strong> {service.nama}</p>
              <p><strong>Deskripsi:</strong> {service.deskripsi}</p>
              <p><strong>Durasi:</strong> {service.durasi}</p>
              {service.role && <p><strong>Role:</strong> {service.role}</p>}

              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => router.push(`/admin/edit-service/${service.id}`)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
