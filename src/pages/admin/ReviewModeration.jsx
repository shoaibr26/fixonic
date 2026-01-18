import { Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';

const ReviewModeration = () => {
  const { reviews, deleteReview } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const handleDelete = async (id) => {
     if (await confirm('Delete Review', 'Are you sure you want to delete this review?')) {
        deleteReview(id);
        showToast('Review deleted successfully', 'success');
     }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900">Review Moderation</h2>
        <p className="text-gray-500">View and remove inappropriate client feedback.</p>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-50">
              <th className="px-8 py-4">Client</th>
              <th className="px-8 py-4">Comment</th>
              <th className="px-8 py-4">Rating</th>
              <th className="px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reviews.map((rev) => (
              <tr key={rev.id}>
                <td className="px-8 py-6 font-bold text-gray-900">{rev.name}</td>
                <td className="px-8 py-6 text-sm text-gray-600 italic">"{rev.text}"</td>
                <td className="px-8 py-6 text-amber-500 font-bold">★ {rev.stars}</td>
                <td className="px-8 py-6">
                  <button 
                    onClick={() => handleDelete(rev.id)}
                    className="p-2 text-gray-300 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center text-gray-400">No reviews found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewModeration;
