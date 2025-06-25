'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Higher-Order Component untuk proteksi halaman.
 * Halaman yang dibungkus dengan withAuth hanya bisa diakses jika auth tersimpan di localStorage.
 */
export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const isAuth = localStorage.getItem('auth');
      if (isAuth !== 'true') {
        router.replace('/login'); // redirect jika belum login
      }
    }, [router]);

    return <Component {...props} />;
  };
}