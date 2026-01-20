import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import Modal from '../../components/Modal';

const UserManagement = () => {
  const { users, updateUser, deleteUser } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      _id: editingUser._id,
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    };  
    
    const password = formData.get('password');
    if (password) {
      userData.password = password;
    }

    const result = await updateUser(userData);
    if (result.success) {
      showToast('User updated successfully', 'success');
      setShowUserModal(false);
      setEditingUser(null);
    } else {
      showToast(result.message || 'Failed to update user', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (await confirm('Delete User', 'Are you sure you want to delete this user?')) {
      const result = await deleteUser(id);
      if (result.success) {
        showToast('User deleted successfully', 'success');
      } else {
        showToast(result.message || 'Failed to delete user', 'error');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900">User Management</h2>
        <p className="text-gray-500">View and manage registered users.</p>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-50">
              <th className="px-8 py-4">User</th>
              <th className="px-8 py-4">Role</th>
              <th className="px-8 py-4">Email</th>
              <th className="px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-8 py-6 font-bold text-gray-900">{user.name}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                    user.role === 'vendor' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm text-gray-500">{user.email}</td>
                <td className="px-8 py-6 flex gap-2">
                  <button 
                    onClick={() => { setEditingUser(user); setShowUserModal(true); }}
                    className="p-2 text-gray-300 hover:text-navy-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(user._id)}
                    className="p-2 text-gray-300 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center text-gray-400">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="Edit User"
        size="max-w-2xl"
      >
        <form onSubmit={handleUserSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input name="name" required defaultValue={editingUser?.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 rounded-xl bg-navy-50/50 border-navy-100 transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Role</label>
              <select name="role" required defaultValue={editingUser?.role} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none font-bold">
                <option value="client">Client</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                <input name="email" type="email" required defaultValue={editingUser?.email} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 rounded-xl bg-navy-50/50 border-navy-100 transition-all" placeholder="john@example.com" />
            </div>
              <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">New Password (Optional)</label>
                <input name="password" type="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 rounded-xl bg-navy-50/50 border-navy-100 transition-all" placeholder="Leave blank to keep same" />
            </div>
          </div>
            <button type="submit" className="w-full py-5 bg-navy-500 text-white rounded-2xl font-black shadow-xl shadow-navy-900/20 hover:bg-navy-600 transition-all uppercase tracking-[0.2em] text-sm">
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
