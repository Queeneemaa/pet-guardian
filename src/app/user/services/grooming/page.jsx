'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GroomingPage() {
  const router = useRouter();

  const handleBookingClick = () => {
    router.push('/user/booking');
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header className="bg-orange-500 text-white flex justify-between items-center px-8 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={32} height={32} className="rounded-full" />
          <span className="text-xl font-bold">PetGuardian</span>
        </div>
        <nav className="flex gap-8 text-sm font-medium">
          <Link href="/user/booking">Booking</Link>
          <Link href="/user/my-booking">My Booking</Link>
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Greeting */}
      <section className="px-10 py-6">
        <h2 className="text-xl text-orange-500 font-semibold">
          Hi, <span className="text-orange-600">Keykey</span>
        </h2>
        <p className="text-sm text-gray-500">Take care of your pet!</p>
      </section>

      {/* Grooming Content */}
      <section className="bg-white m-6 rounded-2xl shadow-sm px-10 py-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Grooming</h3>

        <p className="font-medium mb-2">Rules :</p>
        <ol className="list-decimal list-inside text-gray-800 space-y-3">
          <li><strong>Jenis Hewan:</strong> Hanya untuk anjing dan kucing.</li>
          <li><strong>Kondisi Sehat:</strong> Tidak sakit, tidak punya kutu.</li>
          <li><strong>Perilaku Agresif:</strong> Beri keterangan saat booking.</li>
          <li><strong>Jadwal Booking:</strong> Minimal H-1.</li>
          <li><strong>Datang Tepat Waktu:</strong> 10 menit sebelum jadwal.</li>
          <li><strong>Pembatalan:</strong> Minimal 2 jam sebelum via sistem.</li>
        </ol>

        <div className="mt-8 text-center">
          <button
            onClick={handleBookingClick}
            className="bg-orange-500 text-white py-2 px-8 rounded-md hover:bg-orange-600 transition"
          >
            Booking
          </button>
        </div>
      </section>
    </div>
  );
}
