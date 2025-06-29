import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseBrowserClient'

export async function GET(request) {
  // Ambil token dari header Authorization
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')

  // Validasi token dan ambil user
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 401 })
  }

  // Ambil data user dari tabel users
  const { data, error: userError } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('id', user.id)
    .single()

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 })
  }

  return NextResponse.json({ user: data }, { status: 200 })
}
