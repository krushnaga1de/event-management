import { useState } from 'react';

const EventForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxSeats, setMaxSeats] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, date, time, maxSeats: Number(maxSeats) });
    // Reset form
    setName('');
    setDate('');
    setTime('');
    setMaxSeats('');
  };

  // Get today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Create New Event</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. AI Seminar"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Seats</label>
          <input
            type="number"
            required
            min="1"
            value={maxSeats}
            onChange={(e) => setMaxSeats(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. 50"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`bg-indigo-600 text-white font-medium py-2 px-6 rounded transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
