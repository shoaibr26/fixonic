import { useState } from 'react';
import { Briefcase, Clock, CheckCircle2, AlertCircle, Smartphone, Laptop, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

const VendorDashboard = () => {
  const { repairs, updateRepairStatus } = useData();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRepair, setSelectedRepair] = useState(null);

  const updateStatus = (id, newStatus) => {
    updateRepairStatus(id, newStatus);
    if (selectedRepair && selectedRepair.id === id) {
        setSelectedRepair({ ...selectedRepair, status: newStatus });
    }
  };

  const stats = [
    { label: 'Pending Requests', value: repairs.filter(r => r.status === 'Pending').length, icon: <Briefcase className="w-8 h-8" />, color: 'bg-lime-500', text: 'text-navy-900' },
    { label: 'Active Repairs', value: repairs.filter(r => r.status === 'In Process').length, icon: <Clock className="w-8 h-8" />, color: 'bg-navy-900', text: 'text-lime-400' },
    { label: 'Completed Jobs', value: repairs.filter(r => r.status === 'Completed').length, icon: <CheckCircle2 className="w-8 h-8" />, color: 'bg-white', text: 'text-navy-900' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Premium Header */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-navy-100 overflow-hidden border border-gray-100 relative">
        <div className="bg-navy-900 px-10 py-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                <img 
                   src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
                   alt="Modern Repair Service" 
                   className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
                 />
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-lime-500/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">Vendor Portal</h2>
                <p className="text-gray-400 font-medium text-lg">Manage your repair queue and track performance.</p>
            </div>

            {/* Stats Cards - Floating */}
            <div className="flex gap-4 relative z-10">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center min-w-[100px] hover:bg-white/20 transition-all cursor-default">
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-lime-400">{stat.label.split(' ')[0]}</span>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Main Stats Row */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] shadow-xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden ${stat.color === 'bg-white' ? 'bg-white border border-gray-100 shadow-gray-100' : 'shadow-lg ' + (stat.color === 'bg-lime-500' ? 'shadow-lime-500/20' : 'shadow-navy-900/20') + ' ' + stat.color}`}>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className={`text-xs font-black uppercase tracking-widest mb-2 ${stat.color === 'bg-white' ? 'text-gray-400' : 'text-white'}`}>{stat.label}</p>
                <h3 className={`text-5xl font-black ${stat.text}`}>{stat.value}</h3>
              </div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.color === 'bg-white' ? 'bg-navy-50 text-navy-900 group-hover:scale-110' : 'bg-white/20 text-white backdrop-blur-sm group-hover:rotate-12 group-hover:scale-110'} transition-all`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Management Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
           <div>
             <h2 className="text-2xl font-black text-navy-900">Repair Queue</h2>
             <p className="text-gray-500 font-medium mt-1">Filter and manage your active jobs</p>
           </div>
           
            <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto max-w-full">
              {['All', 'Pending', 'In Process', 'Completed'].map(tab => (
                <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                   activeTab === tab ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20' : 'text-gray-400 hover:text-navy-900 hover:bg-white/50'
                 }`}
                >
                  {tab}
                </button>
              ))}
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/30">
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] border-b border-gray-100">
                <th className="px-8 py-6">Customer Details</th>
                <th className="px-8 py-6">Device Info</th>
                <th className="px-8 py-6">Issue & Location</th>
                <th className="px-8 py-6">Current Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {repairs.filter(r => activeTab === 'All' || r.status === activeTab).map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-navy-900/10 group-hover:scale-110 transition-transform duration-300">
                        {req.customer.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-navy-900 text-lg">{req.customer}</div>
                        <div className="inline-flex items-center gap-2 mt-1 px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-wider">
                            #{req.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-start gap-3">
                       <div className={`p-2 rounded-lg ${req.device === 'Mobile' ? 'bg-lime-100 text-lime-700' : 'bg-blue-50 text-blue-600'}`}>
                           {req.device === 'Mobile' ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                       </div>
                       <div>
                         <div className="font-bold text-navy-900">{req.brand}</div>
                         <div className="text-sm text-gray-500 font-medium">{req.model}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 max-w-xs">
                    <p className="text-sm font-bold text-navy-900 truncate mb-1.5" title={req.issue}>{req.issue}</p>
                    <div className="flex items-start gap-2 text-gray-400">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <p className="text-xs font-medium truncate leading-relaxed" title={req.address}>{req.address}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="relative group/select w-40">
                        <select
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className={`w-full appearance-none text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl border outline-none cursor-pointer transition-all ${
                            req.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' :
                            req.status === 'Accepted' ? 'bg-navy-50 text-navy-700 border-navy-200 hover:bg-navy-100' :
                            req.status === 'In Process' ? 'bg-navy-900 text-white border-navy-900 shadow-md shadow-navy-900/20' :
                            req.status === 'Ready' ? 'bg-lime-500 text-navy-900 border-lime-500 shadow-md shadow-lime-500/20' :
                            req.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' :
                            'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                        }`}
                        >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="In Process">In Process</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                        </select>
                         <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${req.status === 'In Process' || req.status === 'Ready' ? 'text-white' : 'text-gray-500'}`}>
                             <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                         </div>
                    </div>
                    <div className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">
                        Since {req.date}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                      <button 
                          onClick={() => setSelectedRepair(req)}
                          className="px-6 py-3 bg-white border border-gray-200 text-navy-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all shadow-sm"
                      >
                        View Details
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {repairs.filter(r => activeTab === 'All' || r.status === activeTab).length === 0 && (
            <div className="py-32 text-center bg-gray-50/30">
               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertCircle className="w-10 h-10 text-gray-400" />
               </div>
               <h3 className="text-xl font-black text-navy-900 mb-2">No {activeTab} Jobs Found</h3>
               <p className="text-gray-500 max-w-xs mx-auto">Waiting for new repair requests to arrive.</p>
            </div>
          )}
        </div>
      </div>

      {/* Repair Detail Modal */}
      {selectedRepair && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
             <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up relative">
                 <div className="absolute top-0 right-0 p-8">
                     <button 
                        onClick={() => setSelectedRepair(null)}
                        className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                     >
                         <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                 </div>
                 
                 <div className="p-10 pb-0">
                     <div className="inline-flex items-center gap-3 px-4 py-2 bg-navy-50 rounded-2xl mb-6">
                         <span className="text-[10px] font-black text-navy-400 uppercase tracking-widest">Repair ID</span>
                         <span className="text-sm font-black text-navy-900">#{selectedRepair.id}</span>
                     </div>
                     <h2 className="text-4xl font-black text-navy-900 mb-2">{selectedRepair.customer}</h2>
                     <p className="text-gray-500 font-medium flex items-center gap-2">
                         <MapPin className="w-4 h-4 text-lime-500" /> {selectedRepair.address}
                     </p>
                 </div>

                 <div className="p-10 space-y-8">
                     <div className="grid grid-cols-2 gap-6">
                         <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Device Info</div>
                             <div className="flex items-center gap-4">
                                 <div className={`p-4 rounded-2xl ${selectedRepair.device === 'Mobile' ? 'bg-navy-900 text-white' : 'bg-lime-500 text-navy-900'}`}>
                                     {selectedRepair.device === 'Mobile' ? <Smartphone className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
                                 </div>
                                 <div className="min-w-0">
                                     <div className="font-black text-lg text-navy-900 truncate">{selectedRepair.brand}</div>
                                     <div className="font-medium text-gray-500 text-sm truncate">{selectedRepair.model}</div>
                                 </div>
                             </div>
                         </div>
                         <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Reported Issue</div>
                             <div className="font-bold text-navy-900 text-lg leading-tight mb-2">{selectedRepair.issue}</div>
                             <div className="text-xs text-gray-500 font-bold bg-white px-3 py-1 rounded-lg inline-block border border-gray-100">
                                 Submitted: {selectedRepair.date}
                             </div>
                         </div>
                     </div>

                     <div>
                         <div className="flex items-center justify-between mb-4">
                             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status / Action</div>
                         </div>
                         <div className="flex gap-4">
                             <div className="flex-1 relative">
                                <select 
                                    value={selectedRepair.status} 
                                    onChange={(e) => updateStatus(selectedRepair.id, e.target.value)}
                                    className="w-full appearance-none p-5 bg-navy-900 text-white font-bold rounded-2xl outline-none border-0 cursor-pointer hover:bg-navy-800 transition-colors"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="In Process">In Process</option>
                                    <option value="Ready">Ready</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </div>
                             </div>
                             <button className="px-8 py-5 bg-lime-500 text-navy-900 font-black rounded-2xl hover:bg-lime-400 transition-all shadow-xl shadow-lime-500/20">
                                 Update
                             </button>
                         </div>
                     </div>
                 </div>
                 
                 <div className="bg-gray-50 px-10 py-8 border-t border-gray-100 text-center">
                     <button onClick={() => setSelectedRepair(null)} className="text-gray-400 font-bold hover:text-navy-900 transition-colors text-sm uppercase tracking-widest">
                         Close Details
                     </button>
                 </div>
             </div>
          </div>
      )}
    </div>
  );
};

export default VendorDashboard;
