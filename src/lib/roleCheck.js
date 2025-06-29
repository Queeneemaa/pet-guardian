// lib/roleCheck.js

export function getRoleFromEmail(email) {
  if (email.endsWith('@admin.com')) return 'admin';
  if (email.endsWith('@petugas.com')) return 'staff';
  return 'owner'; // default jika bukan admin/petugas
}
