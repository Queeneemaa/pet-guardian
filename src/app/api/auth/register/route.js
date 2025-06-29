'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import supabase from '@/lib/supabaseBrowserClient';
import { getRoleFromEmail } from '@/lib/roleCheck';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = getRoleFromEmail(form.email);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert('Gagal registrasi: ' + error.message);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: insertError } = await supabase.from('users').insert({
        id: userId,
        name: form.name,
        email: form.email,
        role,
      });

      if (insertError) {
        alert('Gagal menyimpan data user: ' + insertError.message);
        return;
      }
    }

    alert('Registrasi berhasil, silakan login.');
    router.push('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Daftar</button>
    </form>
  );
}
