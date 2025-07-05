'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseBrowserClient';

export default function ServiceDetailPage() {
  const params = useParams(); // perbaikan di sini
  const id = params?.id;
  const router = useRouter();

  const [service, setService] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;

      if (sessionError || !userId) {
        router.push('/login');
        return;
      }

      // Ambil nama user
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Gagal mengambil nama user:', userError.message);
      }

      setUserName(userData?.name || '');

      // Ambil detail layanan berdasarkan id
      const { data: serviceData, error: serviceError } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (serviceError) {
        console.error('Gagal mengambil data layanan:', serviceError.message);
      } else {
        setService(serviceData);
      }

      setLoading(false);
    };

    if (id) fetchData();
  }, [id, router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!service) return <p className="text-center mt-10 text-red-500">Layanan tidak ditemukan.</p>;

  return (
    <main className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow font-sans">
      <h2 className="text-xl font-semibold text-orange-500 mb-2">Hi, {userName}</h2>
      <p className="text-gray-500 mb-6">Take care of your pet!</p>


      <h3 className="text-2xl font-bold text-[#6b2c11] mb-2">{service.name}</h3>
      <p className="text-[#6b2c11] mb-4">{service.description}</p>
      <p className="text-[#6b2c11] font-medium mb-6">Durasi: {service.duration}</p>

      <button
        onClick={() => router.push(`/owner/booking?service=${id}`)}
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 text-sm"
      >
        Pesan Sekarang
      </button>
    </main>
  );
}
