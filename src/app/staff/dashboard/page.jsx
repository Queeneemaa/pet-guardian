'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StaffDashboardPage() {
    const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [selectedService, setSelectedService] = useState(null); // Tidak langsung pilih apa-apa
  // onClick={()=> router.push(`/staff/services/${service.name.toLowerCase().replace(' ', '-')}`);

  useEffect(() => {
    const data = localStorage.getItem('my-booking');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setBookings(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (err) {
        console.error('Gagal parsing booking:', err);
      }
    }
  }, []);

  const services = [
    {
      name: 'Grooming',
      image: '/image/anjing_poy-removebg-preview.png',
      color: 'bg-lime-100',
    },
    {
      name: 'Vaccine',
      image: '/image/anjing_vaksin-removebg-preview.png',
      color: 'bg-sky-100',
    },
    {
      name: 'Pet Hotel',
      image: '/image/kucing-removebg-preview.png',
      color: 'bg-purple-100',
    },
  ];

  const filteredBookings = selectedService
    ? bookings.filter((b) => b.service.toLowerCase() === selectedService.toLowerCase())
    : [];

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header className="bg-orange-500 text-white flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PetGuardian Staff</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Greeting */}
      <section className="px-10 py-6">
        <h2 className="text-xl text-orange-500 font-semibold">Hi, Petugas</h2>
        <p className="text-sm text-gray-500">Klik salah satu layanan untuk melihat booking-nya</p>
      </section>

      {/* Kartu Layanan */}
      <section className="bg-white mx-6 rounded-2xl shadow-sm px-10 py-6">
        <h3 className="text-lg font-bold mb-6 text-gray-800">Layanan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              onClick={() =>router.push(`/staff/services/${service.name.toLowerCase().replace(' ', '-')}`)} 
              className={`${service.color} p-6 rounded-xl flex flex-col items-center shadow hover:scale-105 transition cursor-pointer`}
            >
              <Image src={service.image} alt={service.name} width={100} height={100} />
              <p className="mt-4 font-semibold text-gray-700">{service.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section muncul setelah klik layanan */}
      {selectedService && (
        <section className="bg-white mx-6 mt-4 rounded-2xl shadow-sm px-10 py-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Booking Layanan: {selectedService}
          </h3>

          {filteredBookings.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada booking untuk layanan ini.</p>
          ) : (
            <table className="w-full text-sm text-gray-700 border border-orange-300 rounded-md overflow-hidden">
              <thead className="bg-orange-100 text-left">
                <tr>
                  <th className="py-2 px-3">Nama Hewan</th>
                  <th className="py-2 px-3">Tanggal</th>
                  <th className="py-2 px-3">Waktu</th>
                  <th className="py-2 px-3">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-3">{b.pet}</td>
                    <td className="py-2 px-3">{b.date}</td>
                    <td className="py-2 px-3">{b.time}</td>
                    <td className="py-2 px-3">{b.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
}
