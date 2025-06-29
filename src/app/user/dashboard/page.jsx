'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseBrowserClient';

export default function UserDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session || !session.user) {
        router.push('/login');
        return;
      }

      const userId = session.user.id;

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name')
        .eq('id', userId)
        .single();

      if (userError || !userData) {
        console.error('Gagal mengambil nama user');
        router.push('/login');
        return;
      }

      setUserName(userData.name);
    };

    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select('*');
      if (!error) setServices(data);
    };

    fetchUserData();
    fetchServices();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header className="bg-[#C87E4F] text-white flex justify-between items-center px-8 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <img src="/image/logopaw.png" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PetGuardian</span>
        </div>
        <nav className="flex gap-8 text-sm font-medium">
          <Link href="/user/booking">Booking</Link>
          <Link href="/user/my-booking">My Booking</Link>
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Greeting */}
      <section className="px-10 py-6 bg-[#fff5ea]">
        <h2 className="text-xl text-[#E1843A] font-semibold">
          Hi, {userName || '...'}</h2>
        <p className="text-sm text-gray-600">Take care of your pet !</p>
      </section>

      {/* Services */}
      <section className="bg-white mx-6 mt-4 rounded-2xl shadow px-10 py-6">
        <h3 className="text-xl font-bold text-[#5A3B1E] mb-6">Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.id} href={`/user/services/${service.type}`}>
              <div className="bg-[#fefcfb] p-6 rounded-xl flex flex-col items-center shadow hover:scale-105 transition cursor-pointer">
                <Image
                  src={service.image_url}
                  alt={service.nama}
                  width={100}
                  height={100}
                  className="rounded"
                />
                <p className="mt-4 font-semibold text-gray-700">{service.nama}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
