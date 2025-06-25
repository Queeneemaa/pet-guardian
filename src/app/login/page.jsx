'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Login gagal');
    } else {
      const role = data.role;

      // Simpan role dan data ke localStorage (atau cookie jika perlu)
      localStorage.setItem('role', role);

      // Redirect berdasarkan role
      if (role === 'user') router.push('/user/dashboard');
      else if (role === 'staff') router.push('/staff/dashboard');
      else if (role === 'admin') router.push('/admin/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div className="w-1/2 bg-orange-400 text-white flex flex-col justify-center items-center px-10">
        <div className="mb-6">
  <img src="/image/logopaw.jpg" alt="logo" className="w-24 h-24" />
</div>
        <h1 className="text-3xl font-bold">PetGuardian</h1>
        <p className="text-sm mt-2">"Your Pets' Lifelong Protector"</p>
      </div>

      <div className="w-1/2 flex flex-col justify-center px-16">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-orange-300 px-4 py-2 rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={visible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-orange-300 px-4 py-2 rounded-md pr-10 focus:outline-none"
              />
              <span
                onClick={() => setVisible(!visible)}
                className="absolute inset-y-0 right-3 flex items-center text-orange-400 cursor-pointer"
              >
                <EyeOff className="w-5 h-5" />
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
            Masuk
          </button>
        </form>

        <p className="text-sm mt-4 text-gray-600">
          Belum punya akun?{' '}
          <Link href="/register" className="text-orange-500 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
