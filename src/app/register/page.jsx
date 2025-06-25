'use client';
import Link from 'next/link';
import { useState } from 'react';
import { EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Panel Kiri */}
      <div className="w-1/2 bg-orange-400 text-white flex flex-col justify-center items-center px-10">
        <div className="bg-white p-6 rounded-full mb-6">
          <img src="/image/Splash_Screen-removebg-preview.png" alt="logo" className="w-24 h-24" />
        </div>
        <h1 className="text-3xl font-bold">PetGuardian</h1>
        <p className="text-sm mt-2">"Your Pets' Lifelong Protector"</p>
      </div>

      {/* Panel Kanan */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Register</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Input Text"
              className="w-full border border-orange-300 px-4 py-2 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Input Text"
              className="w-full border border-orange-300 px-4 py-2 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Input Text"
                className="w-full border border-orange-300 px-4 py-2 rounded-md pr-10 focus:outline-none"
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