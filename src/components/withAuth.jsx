'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Higher-Order Component untuk proteksi halaman.
 * Halaman yang dibungkus dengan withAuth hanya bisa diakses jika auth tersimpan di localStorage.
 */
export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      const isAuth = localStorage.getItem('auth');
      if (isAuth !== 'true') {
        router.replace('/login'); // redirect jika belum login
      }
    }, [router]);

    // Hindari rendering di server saat cek auth
    if (!isClient) return null;

    return <Component {...props} />;
  };
}
