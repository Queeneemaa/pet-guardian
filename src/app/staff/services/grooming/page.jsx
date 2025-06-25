'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GroomingServicePage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('my-booking');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const all = Array.isArray(parsed) ? parsed : [parsed];
        const filtered = all.filter((b) =>b.service.toLowerCase().trim() === 'grooming');
        setBookings(filtered);
      } catch (err) {
        console.error('Error parsing bookings:', err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] p-8 font-sans">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">Booking Layanan: Grooming</h1>

      <button
        onClick={() => router.push('/staff/dashboard')}
        className="mb-6 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Kembali ke Dashboard
      </button>

      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada booking untuk layanan ini.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {bookings.map((b, idx) => (
            <div key={idx} className="bg-white border border-orange-200 rounded-xl p-4 shadow">
              <h4 className="font-bold text-orange-600 mb-2">Booking #{idx + 1}</h4>
              <p><strong>Hewan:</strong> {b.pet}</p>
              <p><strong>Tanggal:</strong> {b.date}</p>
              <p><strong>Waktu:</strong> {b.time}</p>
              {b.note && <p><strong>Catatan:</strong> {b.note}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
