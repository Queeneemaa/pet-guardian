'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ServiceCard({ service, role = 'user' }) {
  const router = useRouter();

  const handleClick = () => {
    if (role === 'staff') {
      router.push(`/staff/services/${service.type}`);
    } else if (role === 'owner') {
      router.push(`/services/${service.type}`);
    } else if (role === 'admin') {
      // misal nanti untuk admin
      router.push(`/admin/services/${service.type}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-orange-50 hover:bg-orange-100 p-6 rounded-xl flex flex-col items-center shadow hover:scale-105 transition cursor-pointer"
    >
      <Image
        src={service.image_url || '/image/default.png'}
        alt={service.name}
        width={100}
        height={100}
        className="object-contain"
      />
      <p className="mt-4 font-semibold text-gray-700">{service.name}</p>
    </div>
  );
}
