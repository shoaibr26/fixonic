import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const JournalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs } = useData();

  const blog = blogs.find(b => b.id.toString() === id);

  if (!blog) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                  <h2 className="text-2xl font-black text-navy-900 mb-2">Article Not Found</h2>
                  <button onClick={() => navigate('/journals')} className="text-lime-600 font-bold hover:underline">Back to Journals</button>
              </div>
          </div>
      )
  }

  return (
    <div className="bg-white font-sans selection:bg-lime-500 selection:text-white min-h-screen pb-20">
       {/* Hero Image */}
       <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
           <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent"></div>
           
           <div className="absolute top-0 left-0 w-full pt-8 px-4 sm:px-6 lg:px-8">
               <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm bg-black/20 backdrop-blur-md px-4 py-2 rounded-full w-fit hover:bg-black/30"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
               </div>
           </div>

           <div className="absolute bottom-0 left-0 w-full pb-16 px-4 sm:px-6 lg:px-8">
               <div className="max-w-4xl mx-auto">
                   <div className="flex items-center gap-3 mb-6">
                       <span className="px-3 py-1 rounded-lg bg-lime-500 text-navy-900 text-xs font-black uppercase tracking-widest">{blog.category}</span>
                       <span className="flex items-center gap-2 text-white/80 text-sm font-bold bg-black/20 backdrop-blur-md px-3 py-1 rounded-lg uppercase tracking-wider">
                           <Calendar className="w-3 h-3" /> {blog.date}
                       </span>
                   </div>
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">{blog.title}</h1>
               </div>
           </div>
       </div>

       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
           <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100/50">
               
               {/* Content */}
               <div className="prose prose-lg prose-slate max-w-none">
                   <p className="text-xl text-gray-500 font-medium leading-relaxed mb-8 first-letter:text-6xl first-letter:font-black first-letter:text-navy-900 first-letter:mr-3 first-letter:float-left">
                       {blog.content}
                   </p>
                   <p className="text-gray-600 leading-relaxed mb-6">
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                   </p>
                   <h3 className="text-2xl font-black text-navy-900 mt-10 mb-4">Key Takeaways</h3>
                   <ul className="space-y-3 list-none pl-0">
                       {['Always backup your data first', 'Use static protection when opening devices', 'Keep screws organized'].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                               <div className="w-1.5 h-1.5 rounded-full bg-lime-500 shrink-0"></div>
                               {item}
                           </li>
                       ))}
                   </ul>
                   <p className="text-gray-600 leading-relaxed mt-6">
                       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>
               </div>

               {/* Share */}
               <div className="mt-16 pt-8 border-t border-gray-100">
                   <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                       <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share this article</div>
                       <div className="flex items-center gap-4">
                           {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                               <button key={i} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy-900 hover:bg-navy-900 hover:text-white transition-all transform hover:scale-110">
                                   <Icon className="w-4 h-4" />
                               </button>
                           ))}
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};

export default JournalDetail;
