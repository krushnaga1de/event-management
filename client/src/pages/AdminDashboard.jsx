import { useState, useEffect } from 'react';
import API from '../api/axios';
import EventForm from '../components/EventForm';
import EventCard from '../components/EventCard';
import AttendeeModal from '../components/AttendeeModal';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ attendees: [], eventName: '', loading: false });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/events');
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (eventData) => {
    try {
      setActionLoading(true);
      setError('');
      await API.post('/events', eventData);
      fetchEvents(); // refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
    try {
      setError('');
      await API.delete(`/events/${id}`);
      setEvents(events.filter(e => e._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event');
    }
  };

  const handleViewAttendees = async (id, eventName) => {
    setIsModalOpen(true);
    setModalData({ attendees: [], eventName, loading: true });
    try {
      const { data } = await API.get(`/events/${id}/attendees`);
      setModalData({ attendees: data, eventName, loading: false });
    } catch (err) {
      setModalData({ attendees: [], eventName, loading: false });
      alert('Failed to load attendees');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Manage all college events and registrations.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      <EventForm onSubmit={handleCreateEvent} loading={actionLoading} />

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">All Events</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-100">
            <p className="text-gray-500">No events created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event._id} 
                event={event} 
                role="admin" 
                onDelete={handleDeleteEvent}
                onViewAttendees={handleViewAttendees}
              />
            ))}
          </div>
        )}
      </div>

      <AttendeeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attendees={modalData.attendees}
        eventName={modalData.eventName}
        loading={modalData.loading}
      />
    </div>
  );
};

export default AdminDashboard;
