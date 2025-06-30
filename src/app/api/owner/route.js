import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseBrowserClient'

// Ambil semua user dari tabel users
export async function GET() {
  const { data, error } = await supabase.from('users').select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}
