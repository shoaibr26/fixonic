import { Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';

const Inbox = () => {
  const { contacts, deleteContactMessage } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const handleDelete = async (id) => {
     if (await confirm('Delete Message', 'Are you sure you want to delete this message?')) {
         const result = await deleteContactMessage(id);
         if (result.success) {
             showToast('Message deleted successfully', 'success');
         } else {
             showToast(result.message || 'Failed to delete message', 'error');
         }
     }
  };

  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-black text-gray-900">Inbox</h2>
        <p className="text-gray-500">Read messages from the contact form.</p>
      </div>
       <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-50">
              <th className="px-8 py-4">Subject</th>
              <th className="px-8 py-4">Sender</th>
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(contacts || []).map((contact) => (
              <tr key={contact._id}>
                <td className="px-8 py-6">
                  <div className="font-bold text-navy-900">{contact.subject}</div>
                  <div className="text-xs text-gray-400 mt-1 max-w-sm truncate">{contact.message}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="font-bold text-gray-900 text-sm">{contact.name}</div>
                  <div className="text-xs text-gray-500">{contact.email}</div>
                </td>
                <td className="px-8 py-6 text-sm text-gray-500 font-bold">{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td className="px-8 py-6">
                  <button 
                    onClick={() => handleDelete(contact._id)}
                    className="p-2 text-gray-300 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {(contacts || []).length === 0 && (
               <tr>
                  <td colSpan="4" className="px-8 py-20 text-center text-gray-400">No messages found.</td>
               </tr>
            )}
          </tbody>
        </table>
       </div>
    </div>
  );
};

export default Inbox;
