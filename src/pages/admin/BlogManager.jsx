import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import Modal from '../../components/Modal';

const BlogManager = () => {
  const { blogs, addBlog, updateBlog, deleteBlog, fetchBlogs } = useData();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const blogData = {
      title: formData.get('title'),
      category: formData.get('category'),
      content: formData.get('content'),
      image: formData.get('image'),
    };

    if (editingBlog) {
      const result = await updateBlog({ ...editingBlog, ...blogData });
      if (result.success) {
        showToast('Blog updated successfully', 'success');
      } else {
        showToast('Failed to update blog', 'error');
      }
    } else {
      const result = await addBlog(blogData);
      if (result.success) {
        showToast('Blog published successfully', 'success');
      } else {
        showToast('Failed to publish blog', 'error');
      }
    }
    setShowBlogModal(false);
    setEditingBlog(null);
  };

  const handleDelete = async (id) => {
    if (await confirm('Delete Blog', 'Delete this blog post?')) {
      const result = await deleteBlog(id);
      if (result.success) {
        showToast('Blog deleted successfully', 'success');
      } else {
        showToast('Failed to delete blog', 'error');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Blog Manager</h2>
          <p className="text-gray-500">Edit or publish new news articles.</p>
        </div>
         <button 
            onClick={() => { setEditingBlog(null); setShowBlogModal(true); }}
            className="flex items-center gap-3 px-8 py-4 bg-lime-500 text-navy-900 rounded-2xl font-black hover:bg-lime-400 transition-all uppercase tracking-widest text-xs"
          >
            <Plus className="w-5 h-5" /> New Blog
          </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-50">
              <th className="px-8 py-4">Blog Post</th>
              <th className="px-8 py-4">Category</th>
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-4">
                     <img src={blog.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                     <h3 className="font-bold text-gray-900 text-sm leading-tight max-w-xs">{blog.title}</h3>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className="text-[10px] font-black text-secondary-600 uppercase tracking-widest">{blog.category}</span>
                </td>
                <td className="px-8 py-6 text-sm text-gray-500 font-bold">{blog.date}</td>
                <td className="px-8 py-6 flex gap-2">
                  <button 
                    onClick={() => { setEditingBlog(blog); setShowBlogModal(true); }}
                    className="p-2 text-gray-300 hover:text-navy-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 text-gray-300 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center text-gray-400">No blog posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Blog Modal */}
      <Modal
        isOpen={showBlogModal}
        onClose={() => setShowBlogModal(false)}
        title={editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
        size="max-w-2xl"
      >
        <form onSubmit={handleBlogSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Title</label>
              <input name="title" required defaultValue={editingBlog?.title} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 rounded-xl bg-navy-50/50 border-navy-100 transition-all" placeholder="Ex: New iPhone Tips" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
              <select name="category" required defaultValue={editingBlog?.category} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none font-bold">
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input name="image" required defaultValue={editingBlog?.image} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 rounded-xl bg-navy-50/50 border-navy-100 transition-all" placeholder="https://unsplash.com/..." />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Content (Rich Text Mockup)</label>
            <textarea name="content" required defaultValue={editingBlog?.content} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 rounded-xl bg-navy-50/50 border-navy-100 transition-all h-40" placeholder="Write something amazing..." />
          </div>
           <button type="submit" className="w-full py-5 bg-navy-500 text-white rounded-2xl font-black shadow-xl shadow-navy-900/20 hover:bg-navy-600 transition-all uppercase tracking-[0.2em] text-sm">
            {editingBlog ? 'Save Changes' : 'Publish Blog'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default BlogManager;
