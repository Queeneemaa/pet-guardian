'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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

  useEffect(() => {
    const serviceFromQuery = searchParams.get('service');
    if (serviceFromQuery) {
      setForm((prev) => ({ ...prev, service: serviceFromQuery }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('my-booking', JSON.stringify(form));
    router.push('/user/my-booking');
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] font-sans">
      {/* Header */}
      <header className="bg-orange-500 text-white flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-3">
          <img src="/image/logopaw.png" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PetGuardian</span>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link href="/dashboard/user/booking">Booking</Link>
          <Link href="/dashboard/user/my-booking">My Booking</Link>
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Greeting */}
      <section className="px-10 py-6">
        <h2 className="text-xl text-orange-500 font-semibold">Hi, Keykey</h2>
        <p className="text-sm text-gray-500">Take care of your pet !</p>
      </section>

      {/* Booking Form */}
      <section className="bg-white mx-6 rounded-2xl shadow-sm px-10 py-6">
        <h3 className="text-lg font-bold text-brown-800 mb-6">Booking</h3>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-orange-400 rounded-xl p-6 text-orange-500">
          <h4 className="text-center font-semibold mb-4">Book a Service</h4>
          {['service', 'pet', 'date', 'time', 'note'].map((field, i) => (
            <div key={i} className="mb-4">
              <label className="block text-sm capitalize">
                {field === 'note' ? 'Boarding Instruction' : field}
              </label>
              <input
                type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border border-orange-300 px-3 py-1 rounded-md"
                required
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-orange-200 hover:bg-orange-300 py-2 rounded text-orange-700 font-semibold">
            Book
          </button>
        </form>
      </section>
    </div>
  );
}