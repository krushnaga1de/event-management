import { useState, useEffect } from 'react';
import API from '../api/axios';
import EventCard from '../components/EventCard';

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsRes, regsRes] = await Promise.all([
        API.get('/events'),
        API.get('/registrations/my')
      ]);
      setEvents(eventsRes.data);
      setMyRegistrations(regsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      setError('');
      setSuccessMsg('');
      await API.post(`/events/${eventId}/register`);
      
      // Update local state instantly without full reload
      setEvents(events.map(ev => 
        ev._id === eventId 
          ? { ...ev, registeredCount: ev.registeredCount + 1, remainingSeats: ev.remainingSeats - 1, isRegistered: true }
          : ev
      ));
      
      // Optionally fetch my registrations again to update that section, or we can just append
      // Fetching is safer for full data consistency
      const regsRes = await API.get('/registrations/my');
      setMyRegistrations(regsRes.data);
      
      setSuccessMsg('Successfully registered for event!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
      setTimeout(() => setError(''), 4000);
      
      // If error was "Event is full", maybe refresh events to get latest counts
      if (err.response?.status === 409 || err.response?.status === 400) {
         const { data } = await API.get('/events');
         setEvents(data);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Student Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">Discover and register for upcoming campus events.</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-700 font-bold">&times;</button>
        </div>
      )}

      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-sm flex justify-between items-center">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg('')} className="text-green-700 font-bold">&times;</button>
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Upcoming Events</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-100">
            <p className="text-gray-500">No upcoming events available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event._id} 
                event={event} 
                role="student" 
                onRegister={handleRegister}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">My Registrations</h2>
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : myRegistrations.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded border border-gray-200">
            <p className="text-gray-500">You haven't registered for any events yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {myRegistrations.map((reg) => (
                <li key={reg._id} className="p-4 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-medium text-indigo-600">{reg.event?.name || 'Event Deleted'}</p>
                    {reg.event && (
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(reg.event.date).toLocaleDateString()} at {reg.event.time}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-0 text-xs text-gray-400">
                    Registered on: {new Date(reg.createdAt).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
