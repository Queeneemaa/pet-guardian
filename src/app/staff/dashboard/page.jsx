'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import  supabase  from '@/lib/supabaseBrowserClient';

export default function StaffDashboardPage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select('*');
      if (error) console.error('Error fetching services:', error.message);
      else setServices(data);
    };
    fetchServices();
  }, []);

  const handleServiceClick = async (type) => {
    setSelectedService(type);

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('service_type', type)
      .eq('schedule', today);

    if (error) console.error('Error fetching bookings:', error.message);
    else setBookings(data);
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header style={{ backgroundColor: '#F59245' }} className="text-white flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-3">
          <img src="/image/logopaw.png" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PetGuardian Staff</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Greeting */}
      <section className="px-10 py-6">
        <h2 className="text-xl text-orange-500 font-semibold">Hi, Petugas</h2>
        <p className="text-sm text-gray-500">Klik salah satu layanan untuk melihat booking hari ini</p>
      </section>

      {/* Layanan */}
      <section className="bg-white mx-6 rounded-2xl shadow-sm px-10 py-6">
        <h3 className="text-lg font-bold mb-6 text-gray-800">Layanan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.type)}
              className="bg-orange-50 p-6 rounded-xl flex flex-col items-center shadow hover:scale-105 transition cursor-pointer"
            >
              <Image src={service.image_url} alt={service.name} width={100} height={100} />
              <p className="mt-4 font-semibold text-gray-700">{service.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking List */}
      {selectedService && (
        <section className="bg-white mx-6 mt-4 rounded-2xl shadow-sm px-10 py-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Booking untuk layanan: {selectedService}
          </h3>

          {bookings.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada booking hari ini.</p>
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
                {bookings.map((b, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-3">{b.animal_name}</td>
                    <td className="py-2 px-3">{b.schedule}</td>
                    <td className="py-2 px-3">{b.time}</td>
                    <td className="py-2 px-3">{b.note || '-'}</td>
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
