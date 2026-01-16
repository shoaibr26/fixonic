import { Smartphone, Laptop, Tablet, Watch, Speaker, Monitor, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../data/mockData';

const Services = () => {
  const icons = {
      smartphone: <Smartphone className="w-12 h-12" />,
      laptop: <Laptop className="w-12 h-12" />,
      tablet: <Tablet className="w-12 h-12" />,
      watch: <Watch className="w-12 h-12" />,
      speaker: <Speaker className="w-12 h-12" />,
      monitor: <Monitor className="w-12 h-12" />
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Our Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-600">Services</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Choose from a wide range of specialized repair categories. 
              Our experts handle everything with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((service, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${service.color} group-hover:scale-110 transition-transform`}>
                  {icons[service.iconKey]}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center text-gray-500 gap-2">
                      <Check className="w-4 h-4 text-lime-500 font-bold" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                   <div className="font-black text-gray-900">{service.price}</div>
                   <Link to="/signup" className="p-2 bg-gray-50 text-navy-900 rounded-xl hover:bg-navy-900 hover:text-white transition-all shadow-sm">
                     <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-gradient-to-br from-navy-900 to-navy-800 rounded-[40px] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-navy-900/20">
             <div className="relative z-10">
               <h2 className="text-3xl font-black mb-4">Don't see your device listed?</h2>
               <p className="text-gray-400 mb-10 max-w-xl mx-auto font-medium">Fear not! Our technicians are versatile. Contact us and we'll see if we can help.</p>
               <Link to="/contact" className="px-10 py-5 bg-lime-500 text-navy-900 font-black rounded-2xl shadow-xl hover:bg-lime-400 transition-all uppercase tracking-widest text-sm">
                 Request Custom Quote
               </Link>
             </div>
             <div className="absolute top-0 right-0 p-20 opacity-5">
                <Smartphone className="w-64 h-64 rotate-12" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
