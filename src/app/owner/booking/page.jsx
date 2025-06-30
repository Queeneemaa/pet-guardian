'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import supabase from '@/lib/supabaseBrowserClient';

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    service: '',
    pet: '',
    date: '',
    time: '',
    note: '',
  });

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const serviceFromQuery = searchParams.get('service');
    if (serviceFromQuery) {
      setForm((prev) => ({ ...prev, service: serviceFromQuery }));
    }

    // Ambil nama user dari Supabase
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;
      if (!userId) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', userId)
        .single();

      if (data?.name) setUserName(data.name);
    };

    fetchUser();
  }, [searchParams, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.id) {
      return alert('User belum login');
    }

    const user_id = session.user.id;

    // Ambil service_id dari nama layanan
    const serviceRes = await fetch(`/api/services?name=${form.service}`);
    const services = await serviceRes.json();
    const selected = services?.[0];
    if (!selected) return alert('Layanan tidak ditemukan');
    const service_id = selected.id;

    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        service_id,
        pet_name: form.pet,
        booking_date: form.date,
        time: form.time,
        notes: form.note,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/owner/my-booking');
    } else {
      alert(data.error);
    }
  };

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
        <h2 className="text-xl text-orange-500 font-semibold">Hi, {userName || '...'}</h2>
        <p className="text-sm text-gray-500">Take care of your pet!</p>
      </section>

      {/* Booking Form */}
      <section className="bg-white mx-6 rounded-2xl shadow-sm px-10 py-6">
        <h3 className="text-lg font-bold text-brown-800 mb-6">Booking</h3>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto border border-orange-400 rounded-xl p-6 text-orange-500"
        >
          <h4 className="text-center font-semibold mb-4">Book a Service</h4>
          {['service', 'pet', 'date', 'time', 'note'].map((field, i) => (
            <div key={i} className="mb-4">
              <label className="block text-sm capitalize mb-1">
                {field === 'note' ? 'Boarding Instruction' : field}
              </label>
              <input
                type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-orange-300 px-3 py-1 rounded-md"
                required={field !== 'note'}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-orange-200 hover:bg-orange-300 py-2 rounded text-orange-700 font-semibold"
          >
            Book
          </button>
        </form>
      </section>
    </div>
  );
}
