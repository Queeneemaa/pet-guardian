import { NextResponse } from 'next/server'
import { createSupabaseRouteClient } from '@/lib/supabaseRouteClient'

export async function POST(req) {
  const supabase = createSupabaseRouteClient() // ✅ routeClient bukan serverClient

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const nama = formData.get('nama')
  const deskripsi = formData.get('deskripsi')
  const durasi = formData.get('durasi')
  const role = formData.get('role')
  const image = formData.get('image')

  if (!image || !nama || !deskripsi) {
    return NextResponse.json({ error: 'Nama, deskripsi, dan gambar wajib diisi' }, { status: 400 })
  }

  if (image.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'Ukuran gambar maksimal 2MB' }, { status: 400 })
  }

  const fileName = `${Date.now()}-${image.name}`
  const { error: uploadError } = await supabase.storage
    .from('service-images')
    .upload(fileName, image, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/service-images/${fileName}`

  const { error: insertError } = await supabase.from('services').insert([{
    name: nama,
    description: deskripsi,
    duration: durasi,
    role: role || null,
    image_url: imageUrl,
    type: nama.toLowerCase().replace(/\s+/g, '-'),
    user_id: user.id,
  }])

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Service berhasil ditambahkan' }, { status: 201 })
}
