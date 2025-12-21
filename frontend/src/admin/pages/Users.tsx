import React from 'react';
import { User } from '../types';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Sarah Jones', email: 'sarah.jones@example.com', role: 'user', status: 'active', joinedDate: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=1', dogName: 'Buster', dogBreed: 'Golden Retriever' },
  { id: '2', name: 'Mike Kowalski', email: 'mike.k@example.com', role: 'user', status: 'suspended', joinedDate: 'Sep 12, 2023', avatar: 'https://i.pravatar.cc/150?u=2', dogName: 'Rocky', dogBreed: 'Bulldog' },
  { id: '3', name: 'Emma Lee', email: 'emma.lee88@example.com', role: 'user', status: 'pending', joinedDate: 'Jan 05, 2024', avatar: 'https://i.pravatar.cc/150?u=3', dogName: 'Bella', dogBreed: 'Poodle' },
  { id: '4', name: 'James Parker', email: 'james.p@example.com', role: 'user', status: 'active', joinedDate: 'Dec 15, 2023', avatar: 'https://i.pravatar.cc/150?u=4', dogName: 'Thor', dogBreed: 'Husky' },
  { id: '5', name: 'Linda West', email: 'linda.w@example.com', role: 'user', status: 'active', joinedDate: 'Nov 02, 2023', avatar: 'https://i.pravatar.cc/150?u=5', dogName: 'Max', dogBreed: 'Beagle' },
];

const Users = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
         <div className="flex items-center gap-4 flex-1">
             <div className="relative flex-1 max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="w-full bg-[#2d1b3d]/50 border border-white/10 text-white rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#7f13ec]"
                />
             </div>
             <select className="bg-[#2d1b3d]/50 border border-white/10 text-white rounded-xl py-2.5 px-4 outline-none">
               <option>All Statuses</option>
               <option>Active</option>
               <option>Suspended</option>
             </select>
         </div>
         <button className="bg-[#7f13ec] hover:bg-[#7f13ec]/90 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">person_add</span>
            Add User
         </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-xl border border-white/10">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#2d1b3d]/80 text-xs font-bold text-gray-400 uppercase tracking-wider">
           <div className="col-span-4">User / Dog Profile</div>
           <div className="col-span-3">Email Contact</div>
           <div className="col-span-2">Joined Date</div>
           <div className="col-span-2">Status</div>
           <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="flex flex-col">
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="group grid grid-cols-12 gap-4 px-6 py-4 items-center bg-white/[0.02] hover:bg-white/[0.05] border-t border-white/5 transition-colors">
               <div className="col-span-4 flex items-center gap-4">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="size-10 rounded-full object-cover border border-white/10" />
                    <div className={`absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-[#191022] ${user.status === 'active' ? 'bg-green-500' : user.status === 'suspended' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-[#7f13ec] text-xs font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">pets</span> {user.dogName} ({user.dogBreed})
                    </p>
                  </div>
               </div>
               
               <div className="col-span-3 text-gray-300 text-sm truncate">{user.email}</div>
               <div className="col-span-2 text-gray-400 text-sm">{user.joinedDate}</div>
               
               <div className="col-span-2">
                  <span className={`
                    inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border
                    ${user.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                    ${user.status === 'suspended' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                    ${user.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                  `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-400' : user.status === 'suspended' ? 'bg-red-400' : 'bg-yellow-400'}`}></span>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
               </div>
               
               <div className="col-span-1 flex justify-end gap-2">
                 <button className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                 </button>
                 <button className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
