'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseBrowserClient';

export default function MyBookingPage() {
  const [booking, setBooking] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;

      if (!userId) return;

      // Ambil nama user
      const { data: userData } = await supabase
        .from('users')
        .select('name')
        .eq('id', userId)
        .single();
      setUserName(userData?.name || '');

      // Ambil data booking user
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*, services(nama)')
        .eq('user_id', userId)
        .order('date', { ascending: true });

      setBooking(bookings);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header className="bg-orange-500 text-white flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-3">
          <img src="/image/logopaw.png" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PetGuardian</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link href="/user/booking">Booking</Link>
          <Link href="/user/my-booking">My Booking</Link>
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Greeting */}
      <section className="px-10 py-6">
        <h2 className="text-xl text-orange-500 font-semibold">Hi, {userName || 'User'}</h2>
        <p className="text-sm text-gray-500">Take care of your pet!</p>
      </section>

      {/* Booking List */}
      <section className="bg-white mx-6 rounded-2xl shadow-sm px-10 py-6">
        <h3 className="text-lg font-bold mb-6 text-gray-800">My Booking</h3>

        {booking?.length === 0 ? (
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
