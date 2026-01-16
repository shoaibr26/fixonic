import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Smartphone, Laptop, ShieldCheck, Clock, Star, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const { blogs, reviews } = useData();

  const services = [
    { title: 'Mobile Repair', icon: <Smartphone className="w-8 h-8" />, desc: 'Screen, Battery, Camera, and Motherboard repairs.', color: 'text-lime-500', bg: 'bg-lime-500/10', iconBg: 'bg-lime-500' },
    { title: 'Laptop Repair', icon: <Laptop className="w-8 h-8" />, desc: 'Hardware upgrades and liquid damage recovery.', color: 'text-blue-500', bg: 'bg-blue-500/10', iconBg: 'bg-blue-500' },
    { title: 'Doorstep Service', icon: <Clock className="w-8 h-8" />, desc: 'Our technicians come to you at your convenience.', color: 'text-purple-500', bg: 'bg-purple-500/10', iconBg: 'bg-purple-500' },
    { title: 'Certified Techs', icon: <ShieldCheck className="w-8 h-8" />, desc: 'Verified and experienced professionals only.', color: 'text-orange-500', bg: 'bg-orange-500/10', iconBg: 'bg-orange-500' },
  ];

  const stats = [
    { number: '50k+', label: 'Repairs Done' },
    { number: '98%', label: 'Success Rate' },
    { number: '24h', label: 'Avg. Turnaround' },
    { number: '4.9', label: 'Customer Rating' },
  ];

  return (
    <div className="bg-white font-sans selection:bg-lime-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative bg-navy-900 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elemets */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20">
            <div className="w-96 h-96 rounded-full bg-lime-500 blur-[100px] animate-pulse"></div>
        </div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 opacity-10">
            <div className="w-72 h-72 rounded-full bg-blue-500 blur-[80px]"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8 animate-fade-in-up">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                </span>
                <span className="text-lime-400 text-xs font-black uppercase tracking-widest">Available in your area</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                Fix Your Tech <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">At Speed of Life.</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Connect with top-rated technicians for instant repairs. From cracked screens to complex diagnostics, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup" className="group relative px-8 py-4 bg-lime-500 text-navy-900 font-black rounded-2xl hover:bg-lime-400 transition-all shadow-[0_0_40px_-10px_rgba(132,204,22,0.5)] flex items-center justify-center gap-2 uppercase tracking-widest text-sm overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">Book Repair <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                </Link>
                <Link to="/login" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center uppercase tracking-widest text-sm backdrop-blur-sm">
                  Vendor Portal
                </Link>
              </div>
            </div>
            <div className="relative lg:h-[600px] flex items-center justify-center">
               <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                 <div className="absolute inset-0 bg-gradient-to-tr from-lime-500 to-blue-500 rounded-[3rem] blur-2xl opacity-20 rotate-6 scale-95"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" 
                   alt="Modern Repair Service" 
                   className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] shadow-2xl border border-white/10 z-10"
                 />
                 
                 {/* Floating Cards */}
                 <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 max-w-[200px] animate-bounce-slow hidden md:block">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-full text-green-600"><ShieldCheck className="w-5 h-5" /></div>
                        <span className="font-bold text-navy-900">Warranty</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">All repairs come with a 30-day money-back guarantee.</p>
                 </div>
                 
                 <div className="absolute top-12 -right-8 bg-navy-800 p-4 rounded-2xl shadow-xl z-20 animate-float hidden md:flex items-center gap-3 border border-white/10">
                    <div className="flex -space-x-2">
                        {[
                          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
                          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                        ].map((src, i) => (
                            <img key={i} src={src} alt="Tech" className="w-8 h-8 rounded-full border-2 border-navy-800 object-cover" />
                        ))}
                    </div>
                    <div className="text-xs font-bold text-white">
                        <span className="text-lime-400">1k+</span> Techs
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.number}</div>
                        <div className="text-xs md:text-sm font-bold text-lime-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-lime-600 font-extrabold tracking-widest uppercase text-sm">Services</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-black text-navy-900">We Fix Everything</h2>
            <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">From vintage consoles to the latest flagships, our experts handle it all.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div key={i} className="group bg-white p-8 rounded-[2rem] hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-gray-100 relative overflow-hidden">
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${service.bg} blur-3xl group-hover:scale-150 transition-transform duration-500`}></div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white ${service.iconBg} shadow-lg`}>
                  {React.cloneElement(service.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-xl font-black text-navy-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">{service.desc}</p>
                <Link to="/services" className="inline-flex items-center text-sm font-bold text-navy-900 group-hover:text-lime-600 transition-colors">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-lime-600 font-extrabold tracking-widest uppercase text-sm">Resources</span>
              <h2 className="mt-2 text-4xl font-black text-navy-900">Tech Insights</h2>
            </div>
            <Link to="/journals" className="hidden md:flex items-center px-6 py-3 bg-navy-50 text-navy-900 font-bold rounded-xl hover:bg-navy-100 transition-colors">
              View Journal <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogs.slice(0, 2).map((blog) => (
              <div key={blog.id} className="group flex flex-col md:flex-row bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-lime-200 transition-all cursor-pointer">
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-black text-navy-900 uppercase tracking-wider">
                        {blog.category}
                    </div>
                </div>
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <div className="text-xs font-bold text-gray-400 mb-3">{blog.date}</div>
                  <h3 className="text-2xl font-black text-navy-900 mb-4 leading-tight group-hover:text-lime-600 transition-colors">{blog.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">{blog.content}</p>
                  <Link to={`/journals/${blog.id}`} className="text-navy-900 font-bold text-sm underline decoration-2 decoration-lime-500 underline-offset-4 group-hover:decoration-navy-900 transition-all">Read Article</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-navy-900 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-lime-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-lime-400 font-extrabold tracking-widest uppercase text-sm">Testimonials</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-black text-white mb-20">Loved by Thousands</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:border-lime-500/50 transition-all duration-300 group">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-5 h-5 ${j < review.stars ? 'text-lime-400 fill-lime-400' : 'text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-gray-300 mb-8 text-lg font-medium leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center font-black text-navy-900 text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{review.name}</div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-lime-500 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-lime-500/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-6 relative z-10">Ready to fix your device?</h2>
              <p className="text-navy-800/80 text-xl font-bold mb-10 max-w-2xl mx-auto relative z-10">Join thousands of satisfied customers who trust Fixonic for their tech repairs.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link to="/signup" className="px-10 py-5 bg-navy-900 text-white font-black rounded-2xl hover:bg-navy-800 transition-all shadow-xl flex items-center justify-center uppercase tracking-widest text-sm">
                    Get Started Today
                  </Link>
                  <Link to="/contact" className="px-10 py-5 bg-white text-navy-900 font-black rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center uppercase tracking-widest text-sm">
                    Contact Support
                  </Link>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default LandingPage;
