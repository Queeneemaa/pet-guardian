'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '@/lib/supabaseBrowserClient';

export default function MyBookingPage() {
  const [booking, setBooking] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;
      if (sessionError || !userId) return;

      // Ambil nama user
      const { data: bookingsRaw, error: bookingError } = await supabase
  .from('bookings')
  .select('*')
  .eq('user_id', userId)
  .order('date', { ascending: true });

if (bookingError) {
  console.error('Gagal ambil data booking:', bookingError.message);
  setBooking([]);
} else {
  // Ambil semua id layanan unik
  const serviceIds = [...new Set(bookingsRaw.map(b => b.service_id))];

  const { data: servicesData } = await supabase
    .from('services')
    .select('id, nama')
    .in('id', serviceIds);

  const bookingsWithService = bookingsRaw.map(b => ({
    ...b,
    services: servicesData?.find(s => s.id === b.service_id),
  }));

  setBooking(bookingsWithService);
}

    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
<header style={{ backgroundColor: '#F59245' }} className="text-white flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-3">
          <img src="/image/logopaw.png" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PetGuardian</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link href="/owner/booking">Pemesanan</Link>
          <Link href="/owner/my-booking">Pemesanan Saya</Link>
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Greeting */}
      <section className="px-10 py-6">
        <h2 className="text-xl text-orange-500 font-semibold">
          Hi, {userName || 'User'}
        </h2>
        <p className="text-sm text-gray-500">Take care of your pet!</p>
      </section>

      {/* Booking List */}
      <section className="bg-white mx-6 rounded-2xl shadow-sm px-10 py-6">
        <h3 className="text-lg font-bold mb-6 text-gray-800">Pesanan Saya</h3>

        {Array.isArray(booking) && booking.length === 0 ? (
          <p className="text-gray-500">Belum ada booking.</p>
        ) : (
          <div className="space-y-4 max-w-md">
            {booking.map((item) => (
              <div
                key={item.id}
                className="border border-orange-300 p-4 rounded-md text-orange-600 bg-orange-50"
              >
                <div className="flex justify-between items-center font-semibold text-base text-brown-600">
                  <div>{item.pet_name}</div>
                  <div className="text-sm text-gray-700">{item.status}</div>
                </div>
                <div className="mt-1 font-medium">{item.services?.nama}</div>
                <div className="mt-1">{item.date}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
