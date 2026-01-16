import { 
  Users, Wrench, DollarSign, ArrowUpRight, ArrowDownRight, ShieldCheck 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { useData } from '../../context/DataContext';

const Overview = () => {
  const { users } = useData();

  const clientCount = users.filter(u => u.role === 'client').length;
  const vendorCount = users.filter(u => u.role === 'vendor').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const userRoleData = [
    { name: 'Clients', value: clientCount, color: '#84cc16' }, 
    { name: 'Vendors', value: vendorCount, color: '#f97316' }, 
    { name: 'Admins', value: adminCount, color: '#8b5cf6' },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$84,230', icon: <DollarSign />, trend: '+12.5%', isUp: true },
    { label: 'Platform Users', value: clientCount.toString(), icon: <Users />, trend: '+4.2%', isUp: true },
    { label: 'Successful Repairs', value: '5,120', icon: <Wrench />, trend: '-2.1%', isUp: false },
    { label: 'Active Vendors', value: vendorCount.toString(), icon: <ShieldCheck />, trend: '+8.0%', isUp: true },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-navy-50 shadow-2xl shadow-navy-900/5">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-navy-50 text-navy-500 rounded-2xl">{stat.icon}</div>
              <div className={`flex items-center text-xs font-black ${stat.isUp ? 'text-lime-600' : 'text-red-500'}`}>
                {stat.trend} {stat.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>
            <p className="text-navy-200 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black text-navy-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 mb-6">Revenue Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip contentStyle={{backgroundColor: '#111827', border: 'none', borderRadius: '8px', color: '#fff'}} itemStyle={{color: '#fff'}} />
                  <Area type="monotone" dataKey="value" stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* User Distribution Chart */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-xl font-black text-gray-900 mb-6">User Distribution</h3>
            <div className="flex-1 min-h-[300px] relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userRoleData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userRoleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f3f4f6'}} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="text-center pb-8">
                       <div className="text-3xl font-black text-navy-900">{users.length}</div>
                       <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total</div>
                   </div>
               </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
