import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import {
  Users,
  FileText,
  MessageSquare,
  LayoutDashboard,
  Inbox as InboxIcon,
  Monitor,
  Type
} from 'lucide-react';
import Overview from './Overview';
import UserManagement from './UserManagement';
import BlogManager from './BlogManager';
import ReviewModeration from './ReviewModeration';
import ContentManager from './ContentManager';
import Inbox from './Inbox';
import BrandManager from './BrandManager';

const AdminDashboard = () => {
  const { fetchUsers, fetchContacts } = useData();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchUsers();
    fetchContacts();
  }, [fetchUsers, fetchContacts]);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText className="w-5 h-5" /> },
    { id: 'reviews', label: 'Reviews', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'inbox', label: 'Inbox', icon: <InboxIcon className="w-5 h-5" /> },
    { id: 'brands', label: 'Brands', icon: <Monitor className="w-5 h-5" /> },
    { id: 'content', label: 'Content', icon: <Type className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'blogs':
        return <BlogManager />;
      case 'reviews':
        return <ReviewModeration />;
      case 'inbox':
        return <Inbox />;
      case 'brands':
        return <BrandManager />;
      case 'content':
        return <ContentManager />;
      case 'overview':
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar for Admin Features */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-black text-sm transition-all ${
                  activeTab === item.id 
                   ? 'bg-navy-500 text-white' 
                   : 'text-navy-300 hover:bg-navy-50 hover:text-navy-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 space-y-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
