import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', users: 400, dogs: 240, matches: 240 },
  { name: 'Tue', users: 300, dogs: 139, matches: 221 },
  { name: 'Wed', users: 200, dogs: 980, matches: 229 },
  { name: 'Thu', users: 278, dogs: 390, matches: 200 },
  { name: 'Fri', users: 189, dogs: 480, matches: 218 },
  { name: 'Sat', users: 239, dogs: 380, matches: 250 },
  { name: 'Sun', users: 349, dogs: 430, matches: 210 },
];

const StatCard = ({ title, value, icon, trend, color, subValue }: any) => (
  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
    <div className={`absolute -right-6 -top-6 size-32 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-500`} style={{ backgroundColor: color }}></div>
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col gap-1">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>
      <div className="p-2 rounded-lg bg-white/5" style={{ color: color }}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded-md flex items-center">
        <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> {trend}
      </span>
      <span className="text-xs text-gray-500">{subValue}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    totalDogs: 0,
    activeMatches: 0,
    revenue: 0
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        // Dynamic import to avoid issues during initial load if file structure is in flux
        const api = (await import('../services/api')).default;
        const { data } = await api.get('/admin/stats');
        setStats({
          totalUsers: data.totalUsers,
          totalDogs: data.totalDogs,
          activeMatches: data.pendingDogs, // Using pendingDogs as proxy for Active Matches for now based on backend
          revenue: data.revenue
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback mock data for demo if backend is down
        setStats({
          totalUsers: 12450,
          totalDogs: 8200,
          activeMatches: 1105,
          revenue: 42500
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={loading ? "..." : stats.totalUsers.toLocaleString()}
          icon="group"
          trend="+5.2%"
          color="#0d46f2"
          subValue="vs last month"
        />
        <StatCard
          title="Total Dogs"
          value={loading ? "..." : stats.totalDogs.toLocaleString()}
          icon="pets"
          trend="+12.5%"
          color="#7f13ec"
          subValue="vs last month"
        />
        <StatCard
          title="Active Matches"
          value={loading ? "..." : stats.activeMatches.toLocaleString()}
          icon="favorite"
          trend="+8.1%"
          color="#e11d48"
          subValue="curr. active"
        />
        <StatCard
          title="Revenue"
          value={loading ? "..." : `$${(stats.revenue / 1000).toFixed(1)}k`}
          icon="payments"
          trend="+2.4%"
          color="#10b981"
          subValue="this month"
        />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Platform Growth</h3>
              <p className="text-sm text-gray-400">User vs Dog Registrations</p>
            </div>
            <select className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg p-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d46f2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0d46f2" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDogs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7f13ec" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7f13ec" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="users" stroke="#0d46f2" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="dogs" stroke="#7f13ec" strokeWidth={3} fillOpacity={1} fill="url(#colorDogs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
          <div className="flex flex-col gap-6 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className={`shrink-0 size-2 mt-2 rounded-full ${i % 2 === 0 ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                <div>
                  <p className="text-sm text-gray-200">
                    {i % 2 === 0
                      ? <span className="font-semibold">Sarah & Max</span>
                      : <span className="font-semibold">Mike & Rocky</span>}
                    {' '}{i % 2 === 0 ? 'found a match!' : 'registered a new account.'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{i * 15 + 2} mins ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-auto py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-gray-300 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
