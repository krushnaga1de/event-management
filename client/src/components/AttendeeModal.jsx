import { X } from 'lucide-react';

const AttendeeModal = ({ isOpen, onClose, attendees, eventName, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 truncate pr-4">
            Attendees: {eventName}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          {loading ? (
            <div className="flex justify-center py-8 text-indigo-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : attendees.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No attendees registered yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {attendees.map((attendee, index) => (
                <li key={attendee._id || index} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{attendee.name}</p>
                    <p className="text-sm text-gray-500">{attendee.email}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-white border border-gray-300 text-gray-700 py-1.5 px-4 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeModal;
