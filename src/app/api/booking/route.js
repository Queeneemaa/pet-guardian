import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseBrowserClient';

// GET: Ambil semua booking
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');

  const query = supabase
    .from('bookings')
    .select('*, users(email), services(name)')
    .order('date', { ascending: true }); // Ganti 'schedule' ke 'date' jika kolom di DB memang 'date'

  if (user_id) query.eq('user_id', user_id);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// POST: Buat booking baru
export async function POST(req) {
  const { user_id, service_id, pet_name, booking_date, time, notes } = await req.json();

  if (!user_id || !service_id || !pet_name || !booking_date || !time) {
    return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
  }

  const { error } = await supabase.from('bookings').insert([
    {
      user_id,
      service_id,
      pet_name, // ✅ sudah sesuai kolom di DB
      date: booking_date, // ✅ pastikan ini nama kolom di DB, bukan 'schedule'
      time,
      notes, // ✅ disesuaikan dengan nama kolom 'notes' di DB
      status: 'pending',
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Booking berhasil dibuat' }, { status: 201 });
}

// PATCH: Update status booking
export async function PATCH(req) {
  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: 'ID dan status wajib diisi' }, { status: 400 });
  }

  const { error } = await supabase.from('bookings').update({ status }).eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Status booking berhasil diperbarui' }, { status: 200 });
}
