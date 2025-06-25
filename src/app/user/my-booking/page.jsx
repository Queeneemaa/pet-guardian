'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MyBookingPage() {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('my-booking');
    if (data) {
      setBooking(JSON.parse(data));
    }
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
        <h2 className="text-xl text-orange-500 font-semibold">Hi, Keykey</h2>
        <p className="text-sm text-gray-500">Take care of your pet !</p>
      </section>

      {/* My Booking Display */}
      <section className="bg-white mx-6 rounded-2xl shadow-sm px-10 py-6">
        <h3 className="text-lg font-bold mb-6 text-gray-800">My Booking</h3>
        {booking ? (
          <div className="border border-orange-400 p-4 rounded-md text-orange-600 max-w-sm">
            <div className="flex justify-between">
              <div>{booking.pet}</div>
              <div className="text-sm text-gray-700">Scheduled</div>
            </div>
            <div className="mt-1">{booking.service}</div>
            <div className="mt-1">{booking.date}</div>
            <div className="mt-1">{booking.time}</div>
          </div>
        ) : (
          <p className="text-gray-500">Belum ada booking.</p>
        )}
      </section>
    </div>
  );
}