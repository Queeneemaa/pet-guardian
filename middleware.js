import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();

  // Buat Supabase client khusus untuk Edge Middleware
  const supabase = createMiddlewareClient({ req, res });

  // Ambil user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Jika tidak login, redirect ke login
  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Cek role dari tabel `users`
  const { data: profile, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const pathname = req.nextUrl.pathname;

  // Validasi akses berdasarkan role
  if (pathname.startsWith('/admin') && profile.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/staff') && profile.role !== 'staff') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/owner') && profile.role !== 'owner') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

// Middleware hanya aktif untuk route tertentu
export const config = {
  matcher: ['/admin/:path*', '/staff/:path*', '/owner/:path*'],
};
