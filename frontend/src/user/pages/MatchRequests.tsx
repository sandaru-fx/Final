import React, { useState } from 'react';
import { MOCK_REQUESTS } from '../services/data';

const MatchRequests: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'incoming' | 'sent'>('incoming');
    
    const incomingRequests = MOCK_REQUESTS.filter(r => r.type === 'incoming');
    const sentRequests = MOCK_REQUESTS.filter(r => r.type === 'sent');

    return (
        <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tight mb-2">Match Requests</h1>
                    <p className="text-text-muted dark:text-[#b09882] text-lg font-medium">Review pending connections for your furry friends.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-border dark:border-[#4a3e35] text-sm font-bold text-text-main dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#4a3e35] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">tune</span>
                        Filter
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-8 border-b border-border dark:border-[#3a2e25]">
                <div className="flex gap-8">
                    <button 
                        onClick={() => setActiveTab('incoming')}
                        className={`relative pb-4 text-sm font-bold cursor-pointer transition-colors ${activeTab === 'incoming' ? 'text-primary' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        Incoming Requests ({incomingRequests.length})
                        {activeTab === 'incoming' && <span className="absolute bottom-0 left-0 h-1 w-full rounded-t-full bg-primary"></span>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('sent')}
                        className={`relative pb-4 text-sm font-bold cursor-pointer transition-colors ${activeTab === 'sent' ? 'text-primary' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        Sent Requests ({sentRequests.length})
                        {activeTab === 'sent' && <span className="absolute bottom-0 left-0 h-1 w-full rounded-t-full bg-primary"></span>}
                    </button>
                </div>
            </div>

            {/* Grid Content */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {activeTab === 'incoming' ? (
                        incomingRequests.length > 0 ? (
                            incomingRequests.map((req) => (
                                <div key={req.id} className="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border dark:border-[#3a2e25] shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-full sm:w-32 h-48 sm:h-32 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${req.dog.image}")` }}></div>
                                        {req.matchPercent && (
                                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-primary shadow-sm">
                                                {req.matchPercent}% Match
                                            </div>
                                        )}
                                        {req.isNew && (
                                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-500/90 backdrop-blur-sm text-[10px] font-bold text-white shadow-sm">
                                                New
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between gap-3">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight">{req.dog.name}</h3>
                                                    <p className="text-sm font-medium text-text-muted dark:text-[#b09882]">{req.dog.breed} • {req.dog.age} {req.dog.age === 1 ? 'yr' : 'yrs'}</p>
                                                </div>
                                                <span className={`text-xs font-semibold ${req.isNew ? 'text-primary font-bold' : 'text-gray-400'}`}>{req.timestamp}</span>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="size-5 rounded-full bg-gray-200 bg-cover" style={{ backgroundImage: `url("${req.owner?.image}")` }}></div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Owned by {req.owner?.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            <button className="flex-1 h-9 flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-bold transition-colors shadow-sm shadow-primary/20">
                                                <span className="material-symbols-outlined text-[18px]">check</span>
                                                Accept
                                            </button>
                                            <button className="h-9 px-4 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#3a2e25] dark:hover:bg-[#4a3e35] text-gray-700 dark:text-gray-300 text-sm font-bold transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                             <div className="col-span-1 lg:col-span-2">
                                <EmptyState />
                             </div>
                        )
                    ) : (
                        sentRequests.length > 0 ? (
                            sentRequests.map((req) => (
                                <div key={req.id} className="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border dark:border-[#3a2e25] shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-full sm:w-32 h-48 sm:h-32 rounded-xl bg-gray-100 shrink-0 overflow-hidden relative">
                                        <div className={`absolute inset-0 bg-cover bg-center ${req.status === 'pending' ? 'grayscale-[20%]' : ''}`} style={{ backgroundImage: `url("${req.dog.image}")` }}></div>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between gap-3">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight">{req.dog.name}</h3>
                                                    <p className="text-sm font-medium text-text-muted dark:text-[#b09882]">{req.dog.breed} • {req.dog.age} {req.dog.age === 1 ? 'yr' : 'yrs'}</p>
                                                </div>
                                                {req.status === 'pending' ? (
                                                    <div className="px-2.5 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold flex items-center gap-1">
                                                        <span className="size-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                                        Pending
                                                    </div>
                                                ) : (
                                                    <div className="px-2.5 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px]">favorite</span>
                                                        Matched!
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">{req.timestamp}</p>
                                        </div>
                                        {req.status === 'pending' ? (
                                            <button className="w-full h-9 flex items-center justify-center rounded-lg border border-border dark:border-[#4a3e35] text-gray-500 text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#3a2e25] transition-colors">
                                                Withdraw Request
                                            </button>
                                        ) : (
                                            <button className="w-full h-9 flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">chat</span>
                                                Send Message
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                             <div className="col-span-1 lg:col-span-2">
                                <EmptyState />
                             </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

const EmptyState = () => (
    <div className="mx-auto w-full max-w-lg rounded-2xl bg-surface-light dark:bg-surface-dark p-8 shadow-sm ring-1 ring-black/5 dark:ring-white/10 flex flex-col items-center gap-8 md:p-12 mt-4">
        {/* Illustration Area */}
        <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 scale-125 rounded-full bg-gradient-to-tr from-primary/20 to-orange-100/50 dark:from-primary/10 dark:to-transparent blur-2xl"></div>
            <div className="relative aspect-square size-48 md:size-64 overflow-hidden rounded-full bg-orange-50 dark:bg-orange-900/10 p-6 flex items-center justify-center">
                <img 
                    alt="Empty state illustration" 
                    className="h-full w-full object-contain opacity-90 mix-blend-multiply dark:mix-blend-normal" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvFgD90sCAdAgs4DelevExG5D9onMQqGpPWpvKSWWCCz7ZlQvq7AZAqFZDEqWP45nlSNcLwJS5Ht7Jx8QtPl2J2o1aQ6rq2HEMbh9XKRpr054-PilTHVBvBWxBeoB8bwIrEAgbVFWFVDvSXu6OQqO5DB5i-UwYz5q9Ra0NlP7RG9FxGNxHc5GotALh02UIf7KgUJQ2UCvyaIfafdlwWs0AK4HUhuIATH9ApWjID-zQ9zpPFcwaEpvwip3XoloRIcCZl6J98agdLas"
                />
            </div>
            {/* Status Badge */}
            <div className="absolute -right-2 top-4 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 p-2 shadow-lg ring-1 ring-black/5">
                <span className="material-symbols-outlined text-primary text-2xl">mark_email_read</span>
            </div>
        </div>
        
        {/* Text Content */}
        <div className="flex flex-col items-center text-center gap-3">
            <h3 className="text-xl font-bold text-text-main dark:text-white">No requests just yet!</h3>
            <p className="text-text-muted dark:text-gray-400 max-w-xs leading-relaxed">
                Your perfect match is out there. Try exploring more profiles or updating your dog's photos.
            </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-6 w-full">
            <button className="group flex w-full md:w-auto min-w-[200px] items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-primary/40 active:translate-y-0">
                <span className="material-symbols-outlined">explore</span>
                Browse Dogs
            </button>
            {/* Quick Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-border dark:border-gray-700 bg-transparent px-4 py-2 text-sm font-semibold text-text-main dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-gray-300">
                    <span className="material-symbols-outlined text-[18px] text-primary">edit</span>
                    Update Profile
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-border dark:border-gray-700 bg-transparent px-4 py-2 text-sm font-semibold text-text-main dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-gray-300">
                    <span className="material-symbols-outlined text-[18px] text-primary">rocket_launch</span>
                    Boost Visibility
                </button>
            </div>
        </div>
    </div>
);

export default MatchRequests;