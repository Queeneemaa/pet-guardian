import { supabase } from '@/lib/supabaseBrowserClient';
import { NextResponse } from 'next/server';

// Ambil layanan berdasarkan ID
export async function GET(_, { params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// Update layanan berdasarkan ID
export async function PATCH(req, { params }) {
  const { id } = params;
  const { nama, deskripsi, durasi, role, image_url } = await req.json();

  if (!nama || !deskripsi) {
    return NextResponse.json({ error: 'Nama dan deskripsi wajib diisi' }, { status: 400 });
  }

  const type = nama.toLowerCase().replace(/\s+/g, '-');

  const { error } = await supabase
    .from('services')
    .update({
      nama,
      deskripsi,
      durasi,
      role,
      image_url,
      type,
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Layanan berhasil diupdate' }, { status: 200 });
}

// Hapus layanan berdasarkan ID
export async function DELETE(_, { params }) {
  const { id } = params;

  const { error } = await supabase.from('services').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Layanan berhasil dihapus' }, { status: 200 });
}
