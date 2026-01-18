import { useState, useEffect } from 'react';
import { Save, Loader, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

const ContentManager = () => {
  const { fetchContent, updateContent2 } = useData();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('landing');
  
  // Define structure for editable fields
  const [content, setContent] = useState({
      // Landing Page Defaults
      'landing-hero-title': 'Fix Your Tech At Speed of Life.',
      'landing-hero-subtitle': 'Connect with top-rated technicians for instant repairs.',
      'landing-services-title': 'We Fix Everything',
      'landing-services-tag': 'Services',
      'landing-reviews-title': 'Loved by Thousands',
      'landing-reviews-tag': 'Testimonials',
      // Journals Page
      'journals-hero-title': 'Tech Insights & Repair Guides',
      'journals-hero-subtitle': 'Stay updated with the latest tips, tricks, and news from the world of technology repair.',
      // About Page
      'about-hero-title': 'Who We Are',
      'about-hero-subtitle': 'Dedicated to bringing your devices back to life.',
      'about-mission-title': 'Our Mission',
      'about-mission-text': 'To provide fast, reliable, and transparent repair services for every home and office.',
      'about-community-title': 'Our Community',
      'about-community-text': 'We are more than just a repair shop; we are a platform that empowers local skilled technicians to grow their businesses while providing customers with a seamless, trustworthy experience they can depend on.',
      'about-values-title': 'What Drives Us',
      'about-values-subtitle': 'Core values that define Fixonic',
      // Services Page
      'services-hero-title': 'Our Expertise',
      'services-hero-subtitle': 'Professional repair services for all major brands and devices.',
      'services-list-title': 'What We Fix',
      // Contact Page
      'contact-hero-title': 'Get In Touch',
      'contact-hero-subtitle': 'We are here to help. Reach out to us for any queries or support.',
      'contact-form-title': 'Send us a message',
      'contact-email-label': 'Email Us',
      'contact-email-value': 'support@fixonic.com',
      'contact-phone-label': 'Call Us',
      'contact-phone-value': '+1 (800) REPAIR-NOW',
      'contact-location-label': 'HQ Location',
      'contact-location-value': 'Tech Plaza, 5th Avenue, NY 10001',
      // Global Settings
      'settings-site-name': 'Fixonic',
  });

  useEffect(() => {
    const loadContent = async () => {
        setLoading(true);
        try {
            // Load content for all supported pages
            const landingData = await fetchContent('landing');
            const journalsData = await fetchContent('journals');
            const aboutData = await fetchContent('about');
            const servicesData = await fetchContent('services');
            const contactData = await fetchContent('contact');
            const settingsData = await fetchContent('settings');
            
            // Merge into local state, keeping defaults if not set in DB
            setContent(prev => ({
                ...prev,
                ...landingData,
                ...journalsData,
                ...aboutData,
                ...servicesData,
                ...contactData,
                ...settingsData
            }));
        } catch (error) {
            console.error("Failed to load content", error);
        } finally {
            setLoading(false);
        }
    };
    loadContent();
  }, [fetchContent]);

  const handleSave = async () => {
      setLoading(true);
      try {
          // Split content back into pages for saving
          const landingPayload = {};
          const journalsPayload = {};
          const aboutPayload = {};
          const servicesPayload = {};
          const contactPayload = {};
          const settingsPayload = {};
          
          Object.keys(content).forEach(key => {
              if (key.startsWith('landing-')) landingPayload[key] = content[key];
              if (key.startsWith('journals-')) journalsPayload[key] = content[key];
              if (key.startsWith('about-')) aboutPayload[key] = content[key];
              if (key.startsWith('services-')) servicesPayload[key] = content[key];
              if (key.startsWith('contact-')) contactPayload[key] = content[key];
              if (key.startsWith('settings-')) settingsPayload[key] = content[key];
          });

          await updateContent2('landing', landingPayload);
          await updateContent2('journals', journalsPayload);
          await updateContent2('about', aboutPayload);
          await updateContent2('services', servicesPayload);
          await updateContent2('contact', contactPayload);
          await updateContent2('settings', settingsPayload);
          
          showToast('Content updated successfully', 'success');
      } catch (error) {
          showToast('Failed to update content', 'error');
      } finally {
          setLoading(false);
      }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setContent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Content Manager</h2>
          <p className="text-gray-500">Edit text and copy across the website.</p>
        </div>
        <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 bg-navy-900 text-white rounded-2xl font-black hover:bg-navy-800 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Changes
          </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
            <button 
                onClick={() => setActiveTab('landing')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider ${activeTab === 'landing' ? 'text-lime-600 border-b-2 border-lime-500 bg-lime-50' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Landing Page
            </button>
            <button 
                onClick={() => setActiveTab('journals')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider ${activeTab === 'journals' ? 'text-lime-600 border-b-2 border-lime-500 bg-lime-50' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Journals
            </button>
            <button 
                onClick={() => setActiveTab('about')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider ${activeTab === 'about' ? 'text-lime-600 border-b-2 border-lime-500 bg-lime-50' : 'text-gray-500 hover:text-gray-700'}`}
            >
                About
            </button>
            <button 
                onClick={() => setActiveTab('services')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider ${activeTab === 'services' ? 'text-lime-600 border-b-2 border-lime-500 bg-lime-50' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Services
            </button>
            <button 
                onClick={() => setActiveTab('contact')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider ${activeTab === 'contact' ? 'text-lime-600 border-b-2 border-lime-500 bg-lime-50' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Contact
            </button>
            <button 
                onClick={() => setActiveTab('settings')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider ${activeTab === 'settings' ? 'text-lime-600 border-b-2 border-lime-500 bg-lime-50' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Settings
            </button>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-8">
            {activeTab === 'landing' && (
                <>
                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6">Hero Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Title</label>
                            <input 
                                name="landing-hero-title" 
                                value={content['landing-hero-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Subtitle</label>
                            <textarea 
                                name="landing-hero-subtitle" 
                                value={content['landing-hero-subtitle']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all h-24" 
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6 mt-10">Sections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Services Tagline</label>
                            <input 
                                name="landing-services-tag" 
                                value={content['landing-services-tag']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Services Title</label>
                            <input 
                                name="landing-services-title" 
                                value={content['landing-services-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Testimonials Tagline</label>
                            <input 
                                name="landing-reviews-tag" 
                                value={content['landing-reviews-tag']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Testimonials Title</label>
                            <input 
                                name="landing-reviews-title" 
                                value={content['landing-reviews-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'journals' && (
                <>
                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6">Header Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Page Title</label>
                            <input 
                                name="journals-hero-title" 
                                value={content['journals-hero-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Page Subtitle</label>
                            <textarea 
                                name="journals-hero-subtitle" 
                                value={content['journals-hero-subtitle']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all h-24" 
                            />
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'about' && (
                <>
                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6">Hero Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Title</label>
                            <input 
                                name="about-hero-title" 
                                value={content['about-hero-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Subtitle</label>
                            <textarea 
                                name="about-hero-subtitle" 
                                value={content['about-hero-subtitle']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all h-24" 
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6 mt-10">Mission Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Mission Title</label>
                            <input 
                                name="about-mission-title" 
                                value={content['about-mission-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Mission Text</label>
                            <textarea 
                                name="about-mission-text" 
                                value={content['about-mission-text']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all h-32" 
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6 mt-10">Community Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Community Title</label>
                            <input 
                                name="about-community-title" 
                                value={content['about-community-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Community Text</label>
                            <textarea 
                                name="about-community-text" 
                                value={content['about-community-text']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all h-32" 
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6 mt-10">Values Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Values Title</label>
                            <input 
                                name="about-values-title" 
                                value={content['about-values-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Values Subtitle</label>
                            <input
                                name="about-values-subtitle" 
                                value={content['about-values-subtitle']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'services' && (
                <>
                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6">Hero Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Title</label>
                            <input 
                                name="services-hero-title" 
                                value={content['services-hero-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Subtitle</label>
                            <textarea 
                                name="services-hero-subtitle" 
                                value={content['services-hero-subtitle']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all h-24" 
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6 mt-10">Services List</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">List Title</label>
                            <input 
                                name="services-list-title" 
                                value={content['services-list-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'contact' && (
                <>
                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6">Hero Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Title</label>
                            <input 
                                name="contact-hero-title" 
                                value={content['contact-hero-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hero Subtitle</label>
                            <textarea 
                                name="contact-hero-subtitle" 
                                value={content['contact-hero-subtitle']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all h-24" 
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6 mt-10">Form Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                         <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Form Title</label>
                            <input 
                                name="contact-form-title" 
                                value={content['contact-form-title']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6 mt-10">Contact Info Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Label</label>
                            <input 
                                name="contact-email-label" 
                                value={content['contact-email-label']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Value</label>
                            <input 
                                name="contact-email-value" 
                                value={content['contact-email-value']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Label</label>
                            <input 
                                name="contact-phone-label" 
                                value={content['contact-phone-label']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Value</label>
                            <input 
                                name="contact-phone-value" 
                                value={content['contact-phone-value']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>

                        {/* Location */}
                         <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location Label</label>
                            <input 
                                name="contact-location-label" 
                                value={content['contact-location-label']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location Value</label>
                            <input 
                                name="contact-location-value" 
                                value={content['contact-location-value']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'settings' && (
                <>
                    <h3 className="text-lg font-black text-navy-900 border-b pb-2 mb-6">Global Settings</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Site Name</label>
                            <input 
                                name="settings-site-name" 
                                value={content['settings-site-name']} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-navy-500 focus:border-navy-500 transition-all" 
                            />
                            <p className="text-xs text-gray-500 mt-2 ml-1">This name will appear in the Header and Footer of the website.</p>
                        </div>
                    </div>
                </>
            )}
        </div>
      </div>
    
      <div className="flex items-center gap-3 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200 text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>Changes made here will be reflected immediately on the public website. Please double-check your spelling and grammar.</p>
      </div>

    </div>
  );
};

export default ContentManager;
