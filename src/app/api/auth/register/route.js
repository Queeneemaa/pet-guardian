export async function POST(req) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return new Response(JSON.stringify({ message: 'Semua field wajib diisi' }), {
      status: 400,
    });
  }

  // Simpan user ke DB seharusnya di sini

  return new Response(JSON.stringify({ message: 'Registrasi berhasil' }), { status: 200 });
}
