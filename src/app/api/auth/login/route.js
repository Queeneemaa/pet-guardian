

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  const { email, password } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Auth
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log('Auth Data:', authData); 
  console.log('Auth Error:', error);   

  if (error || !authData?.user) {
    return NextResponse.json({ message: 'Email atau password salah.' }, { status: 401 });
  }

  const user = authData.user;

  // Ambil role user
  const { data: profile, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userError || !profile) {
    return NextResponse.json({ message: 'Gagal mengambil data pengguna.' }, { status: 401 });
  }

  return NextResponse.json({
    access_token: authData.session.access_token,
    refresh_token: authData.session.refresh_token,
    role: profile.role,
  });
}