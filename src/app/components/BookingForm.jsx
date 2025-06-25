'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    service: '',
    pet: '',
    date: '',
    time: '',
    note: '',
  });

  // Prefill service dari query param (?service=Grooming)
  useEffect(() => {
    const serviceQuery = searchParams.get('service');
    if (serviceQuery) {
      setForm((prev) => ({ ...prev, service: serviceQuery }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('my-booking', JSON.stringify(form));
    router.push('/user/my-booking');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-orange-400 rounded-xl p-6 text-orange-500">
      <h4 className="text-center font-semibold mb-4">Book a Service</h4>
      {['service', 'pet', 'date', 'time', 'note'].map((field, i) => (
        <div key={i} className="mb-4">
          <label className="block text-sm capitalize mb-1">
            {field === 'note' ? 'Boarding Instruction' : field}
          </label>
          <input
            type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border border-orange-300 px-3 py-1 rounded-md"
            required
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-orange-200 hover:bg-orange-300 py-2 rounded text-orange-700 font-semibold">
        Book
      </button>
    </form>
  );
}
