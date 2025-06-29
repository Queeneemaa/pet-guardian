/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aktifkan fitur eksperimental kalau kamu pakai Server Actions (opsional)
  experimental: {
  serverActions: {},
},

  // Kalau pakai image dari luar (opsional, hanya jika kamu pakai)
  images: {
    domains: ['aesoicujnotqhqttxksr.supabase.co'], // sesuaikan dengan URL image Supabase kamu
  },
};

export default nextConfig;
