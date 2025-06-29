'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseBrowserClient'
import dayjs from 'dayjs'

export default function StaffServicePage() {
  const { type } = useParams()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      const today = dayjs().format('YYYY-MM-DD')

      const { data, error } = await supabase
        .from('bookings')
        .select('*, users(name)')
        .eq('service_type', type)
        .eq('schedule', today)
        .order('time', { ascending: true })

      if (error) {
        console.error('Gagal mengambil data:', error.message)
        return
      }

      setBookings(data)
    }

    fetchBookings()
  }, [type])

  const handleDone = async (bookingId) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'done' })
      .eq('id', bookingId)

    if (!error) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'done' } : b
        )
      )
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-[#6b2c11] mb-2 capitalize">{type}</h1>
      <p className="text-[#6b2c11] mb-6">Perhari ini</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bookings.length === 0 ? (
          <p>Tidak ada booking hari ini.</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-orange-400 rounded-lg p-4"
            >
              <p><strong>Animal Name:</strong> {booking.animal_name}</p>
              <p><strong>Animal:</strong> {booking.animal_type}</p>
              <p><strong>Schedule:</strong> {dayjs(booking.schedule).format('MMMM D, YYYY')}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Owner:</strong> {booking.users?.name || '-'}</p>
              <p><strong>Instructions:</strong> {booking.note}</p>

              <button
                onClick={() => handleDone(booking.id)}
                className={`mt-4 px-4 py-2 rounded text-white text-sm ${
                  booking.status === 'done'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
                disabled={booking.status === 'done'}
              >
                Done
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
