'use client';

export default function BookingCard({ pet, service, date, time, owner, note, status, isStaff, onDone }) {
  return (
    <div className="border-2 border-orange-300 rounded-xl p-4 w-full max-w-sm text-gray-800 shadow-sm flex flex-col justify-between">
      <div>
        <p><span className="font-semibold">Animal Name :</span> {pet}</p>
        <p><span className="font-semibold">Animal :</span> {service}</p>
        <p><span className="font-semibold">Schedule :</span> {date}</p>
        <p><span className="font-semibold">Time :</span> {time}</p>
        {isStaff && (
          <>
            <p><span className="font-semibold">Owner :</span> {owner}</p>
            <p><span className="font-semibold">Instructions :</span> {note || '-'}</p>
          </>
        )}
      </div>
      {isStaff && (
        <button
          onClick={onDone}
          className={`mt-4 py-1 px-4 text-sm rounded ${
            status === 'done' ? 'bg-gray-300 text-white cursor-default' : 'bg-orange-400 hover:bg-orange-500 text-white'
          }`}
          disabled={status === 'done'}
        >
          {status === 'done' ? 'Done' : 'Mark Done'}
        </button>
      )}
    </div>
  );
}
