import React, { useState, useEffect } from 'react';
import { Dog } from '../types';
import api from '../services/api';

const Dogs = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [loading, setLoading] = useState(true);

  const fetchDogs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/dogs', {
        params: { status: filter }
      });
      setDogs(data);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [filter]);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await api.put(`/admin/dogs/${id}/${status === 'approved' ? 'approve' : 'reject'}`);
      // Optimistic update or refetch
      fetchDogs();
    } catch (error) {
      console.error(`Error updating dog status to ${status}:`, error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold capitalize transition-all
              ${filter === status
                ? 'bg-[#7f13ec] text-white shadow-[0_0_10px_rgba(127,19,236,0.5)]'
                : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'}
            `}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-white text-center py-10">Loading dogs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dogs.map((dog) => (
            <div key={dog.id} className="glass-panel rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 group">
              {/* Image Section */}
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute top-3 right-3 z-10">
                  <span className={`
                       inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md border
                       ${dog.status === 'pending' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' : ''}
                       ${dog.status === 'approved' ? 'bg-green-500/20 border-green-500/30 text-green-300' : ''}
                       ${dog.status === 'rejected' ? 'bg-red-500/20 border-red-500/30 text-red-300' : ''}
                     `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dog.status === 'pending' ? 'bg-yellow-400' :
                        dog.status === 'approved' ? 'bg-green-400' : 'bg-red-400'
                      }`}></span>
                    {dog.status}
                  </span>
                </div>
                {/* Handle optional images array or single image property if your type differs. Using first image or placeholder */}
                <img src={dog.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'} alt={dog.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191022] via-transparent to-transparent opacity-90"></div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-black text-white leading-tight mb-1">{dog.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
                    <span className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded text-xs border border-white/10">{dog.breed}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{dog.age} Years</span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    {/* Owner info handling - relying on populate */}
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white overflow-hidden">
                      {/* @ts-ignore - Assuming populated owner object structure */}
                      {dog.owner?.avatar ? <img src={dog.owner.avatar} alt="Owner" /> : (dog.owner?.name?.[0] || 'U')}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Owner</span>
                      {/* @ts-ignore */}
                      <span className="text-sm font-semibold text-white">{dog.owner?.name || 'Unknown'}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">info</span>
                  </button>
                </div>

                {dog.status === 'pending' && (
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                      onClick={() => handleStatusChange(dog.id, 'rejected')}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600/10 border border-red-600/30 text-red-400 font-bold text-sm hover:bg-red-600 hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange(dog.id, 'approved')}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#7f13ec] text-white font-bold text-sm hover:bg-[#8e3df0] shadow-[0_4px_0_#5e0eb0] active:shadow-none active:translate-y-1 transition-all">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      Approve
                    </button>
                  </div>
                )}
                {dog.status !== 'pending' && (
                  <button className="w-full py-2.5 rounded-lg border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dogs;
