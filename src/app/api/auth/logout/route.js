import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseBrowserClient'

export async function POST() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Berhasil logout' }, { status: 200 })
}
