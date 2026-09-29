import { Calendar, Clock, Users } from 'lucide-react';

const EventCard = ({ event, role, onRegister, onDelete, onViewAttendees }) => {
  const isStudent = role === 'student';
  const isAdmin = role === 'admin';
  const isFull = event.remainingSeats === 0;
  const isAlmostFull = !isFull && (event.remainingSeats / event.maxSeats) <= 0.2;

  let badgeColor = 'bg-green-100 text-green-800';
  if (isFull) badgeColor = 'bg-red-100 text-red-800';
  else if (isAlmostFull) badgeColor = 'bg-orange-100 text-orange-800';

  let seatText = `${event.remainingSeats} / ${event.maxSeats} seats left`;
  if (isFull) seatText = 'Full';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col h-full border border-gray-100 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 truncate pr-4" title={event.name}>{event.name}</h3>
        <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${badgeColor}`}>
          {seatText}
        </span>
      </div>

      <div className="space-y-2 mb-6 flex-grow">
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar size={16} className="mr-2 text-indigo-500" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock size={16} className="mr-2 text-indigo-500" />
          <span>{event.time}</span>
        </div>
        {isAdmin && (
          <div className="flex items-center text-gray-600 text-sm">
            <Users size={16} className="mr-2 text-indigo-500" />
            <span>Registered: {event.registeredCount}</span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
        {isStudent && (
          <button
            onClick={() => onRegister(event._id)}
            disabled={isFull || event.isRegistered}
            className={`w-full py-2 px-4 rounded font-medium transition-colors ${
              event.isRegistered 
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : isFull
                  ? 'bg-red-100 text-red-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {event.isRegistered ? 'Registered' : isFull ? 'Full' : 'Register'}
          </button>
        )}
        
        {isAdmin && (
          <>
            <button
              onClick={() => onViewAttendees(event._id, event.name)}
              className="flex-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 py-2 px-4 rounded font-medium transition-colors text-sm"
            >
              Attendees
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 py-2 px-4 rounded font-medium transition-colors text-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
