'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function DashboardPage() {
  const [role, setRole] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (!storedRole) {
      router.push('/login');
    } else {
      setRole(storedRole);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header className="bg-orange-500 text-white flex justify-between items-center px-8 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PetGuardian</span>
        </div>
        <nav className="flex gap-8 text-sm font-medium">
          {role === 'user' && <Link href="/user/booking">Booking</Link>}
          {role === 'user' && <Link href="/user/my-booking">My Booking</Link>}
          {role === 'admin' && <Link href="#">Admin Panel</Link>}
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Greeting */}
      <section className="px-10 py-6">
        <h2 className="text-xl text-orange-500 font-semibold">Hi, {role}</h2>
        <p className="text-sm text-gray-500">
          {role === 'admin' && 'Manage the system efficiently.'}
          {role === 'staff' && 'Check and handle incoming bookings.'}
          {role === 'user' && 'Take care of your pet!'}
        </p>
      </section>

      {/* Content Berdasarkan Role */}
      <section className="bg-white m-6 rounded-2xl shadow-sm px-10 py-6">
        {role === 'user' && (
          <>
            <h3 className="text-lg font-bold mb-6 text-gray-800">Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/user/services/grooming">
                <div className="bg-lime-100 p-6 rounded-xl flex flex-col items-center shadow hover:scale-105 transition cursor-pointer">
                  <Image src="/image/anjing_poy-removebg-preview.png" alt="Grooming" width={100} height={100} />
                  <p className="mt-4 font-semibold text-gray-700">Grooming</p>
                </div>
              </Link>
              <Link href="/user/services/vaccine">
                <div className="bg-sky-100 p-6 rounded-xl flex flex-col items-center shadow hover:scale-105 transition cursor-pointer">
                  <Image src="/image/anjing_vaksin-removebg-preview.png" alt="Vaccine" width={100} height={100} />
                  <p className="mt-4 font-semibold text-gray-700">Vaccine</p>
                </div>
              </Link>
              <Link href="/user/services/pet-hotel">
                <div className="bg-purple-100 p-6 rounded-xl flex flex-col items-center shadow hover:scale-105 transition cursor-pointer">
                  <Image src="/image/kucing-removebg-preview.png" alt="pet-hotel" width={100} height={100} />
                  <p className="mt-4 font-semibold text-gray-700">Pet Hotel</p>
                </div>
              </Link>
            </div>
          </>
        )}

        {role === 'staff' && (
          <div>
            <h3 className="text-lg font-bold mb-4">Daftar Booking Masuk</h3>
            <p>Contoh data booking pelanggan (dummy)</p>
            {/* Tambahkan table booking di sini */}
          </div>
        )}

        {role === 'admin' && (
          <div>
            <h3 className="text-lg font-bold mb-4">Admin Dashboard</h3>
            <p className="mb-4">Kelola pengguna, layanan, dan sistem.</p>
            <Link href="/dashboard/admin">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
                Masuk Halaman Admin
              </button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
