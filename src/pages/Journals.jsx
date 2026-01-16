import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Journals = () => {
  const navigate = useNavigate();
  const { blogs } = useData();

  return (
    <div className="bg-white font-sans selection:bg-lime-500 selection:text-white min-h-screen">
       <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-navy-900 transition-colors mb-8 font-bold text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-navy-900 mb-6 tracking-tight">
              Tech Insights & <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-600">Repair Guides</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Stay updated with the latest tips, tricks, and news from the world of technology repair.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-lime-200 transition-all duration-300 cursor-pointer h-full"
                onClick={() => navigate(`/journals/${blog.id}`)}
              >
                <div className="h-64 relative overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-xs font-black text-navy-900 uppercase tracking-widest shadow-sm">
                        {blog.category}
                    </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-xs font-bold text-gray-400 mb-4">{blog.date}</div>
                  <h3 className="text-2xl font-black text-navy-900 mb-4 leading-tight group-hover:text-lime-600 transition-colors">{blog.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-8 font-medium leading-relaxed flex-1">{blog.content}</p>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                      <span className="text-navy-900 font-bold text-sm group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                          Read Article <ArrowRight className="w-4 h-4 text-lime-500" />
                      </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
       </div>
    </div>
  );
};

export default Journals;
