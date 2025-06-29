'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EyeOff } from 'lucide-react';
import supabase from '@/lib/supabaseBrowserClient';
import { getRoleFromEmail } from '@/lib/roleCheck';

export default function RegisterPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sign up user
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert('Gagal registrasi: ' + error.message);
      return;
    }

    // Dapatkan ID dan role dari email
    const userId = data.user?.id;
    const role = getRoleFromEmail(form.email);

    if (userId) {
      const { error: insertError } = await supabase.from('users').insert({
        id: userId,
        email: form.email,
        name: form.name,
        role, // gunakan hasil getRoleFromEmail
      });

      if (insertError) {
        alert('Gagal menyimpan data user: ' + insertError.message);
        return;
      }
    }

    alert('Registrasi berhasil! Silakan login.');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Panel Kiri */}
      <div className="w-1/2 bg-orange-400 text-white flex flex-col justify-center items-center px-10">
        <div className="mb-6">
          <img src="/image/logopaw.jpg" alt="logo" className="w-24 h-24" />
        </div>
        <h1 className="text-3xl font-bold">PetGuardian</h1>
        <p className="text-sm mt-2">"Your Pets' Lifelong Protector"</p>
      </div>

      {/* Panel Kanan */}
<div className="w-1/2 bg-white text-black flex flex-col justify-center px-16">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Input Text"
              className="w-full border border-orange-300 px-4 py-2 rounded-md focus:outline-none"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Input Text"
              className="w-full border border-orange-300 px-4 py-2 rounded-md focus:outline-none"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Input Text"
                className="w-full border border-orange-300 px-4 py-2 rounded-md pr-10 focus:outline-none"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-3 flex items-center text-orange-400 cursor-pointer"
              >
                <EyeOff className="w-5 h-5" />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Daftar
          </button>
        </form>
        <p className="text-sm mt-4">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-orange-500 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
