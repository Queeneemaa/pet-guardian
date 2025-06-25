// Simulasi login (belum ada database)
export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email dan password wajib diisi' }), {
      status: 400,
    });
  }

  // Dummy logic: role berdasarkan email
  let role = 'user';
  if (email.includes('admin')) role = 'admin';
  else if (email.includes('staff')) role = 'staff';

  // Cek user dari DB seharusnya di sini
  return new Response(JSON.stringify({ role }), { status: 200 });
}
