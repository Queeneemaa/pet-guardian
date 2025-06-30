import { NextResponse } from 'next/server'
import  supabase  from '@/lib/supabaseBrowserClient'

// GET: Ambil semua petugas
export async function GET() {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, role') // tambahkan name
    .eq('role', 'staff')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}

// POST: Tambah petugas (oleh admin)
export async function POST(req) {
  const { email, password, name } = await req.json()

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Email, password, dan nama wajib diisi' }, { status: 400 })
  }

  // Buat akun Supabase Auth
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signupError) {
    return NextResponse.json({ error: signupError.message }, { status: 400 })
  }

  const user = signupData.user
  if (!user) {
    return NextResponse.json({ error: 'User tidak ditemukan setelah signup' }, { status: 500 })
  }

  // Masukkan ke tabel users dengan role 'staff' dan name
  const { error: insertError } = await supabase.from('users').insert([
    {
      id: user.id,
      email,
      name, // ← penting: pastikan kolom "name" ada di tabel Supabase
      role: 'staff',
    },
  ])

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Petugas berhasil ditambahkan' }, { status: 201 })
}
