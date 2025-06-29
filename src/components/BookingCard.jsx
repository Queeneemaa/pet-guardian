'use client';

export default function BookingCard({ petName, serviceType, date, time, status }) {
  return (
    <div className="border-2 border-orange-300 p-4 rounded-md text-[#6b2c11] w-full max-w-xs">
      <div className="flex justify-between mb-1">
        <p className="font-semibold">{petName}</p>
        <span className="text-sm text-gray-500">{status}</span>
      </div>
      <p className="text-orange-500 font-semibold">{serviceType}</p>
      <p className="text-orange-500 text-sm">{date}</p>
      <p className="text-orange-500 text-sm">{time}</p>
    </div>
  );
}
