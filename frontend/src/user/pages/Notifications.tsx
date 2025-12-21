import React, { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../services/data';

const Notifications: React.FC = () => {
    const [filter, setFilter] = useState<'All' | 'Matches' | 'System' | 'Payments'>('All');

    const filteredNotifications = MOCK_NOTIFICATIONS.filter(n => filter === 'All' || n.category === filter);
    
    // Separate into "Today" (simulated by checking if string contains 'ago') and "Earlier" (yesterday/days ago)
    // For demo purposes with mock data strings:
    const todayNotifications = filteredNotifications.filter(n => n.timestamp.includes('ago'));
    const earlierNotifications = filteredNotifications.filter(n => !n.timestamp.includes('ago'));

    return (
        <div className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Column: Notifications Feed */}
                <main className="lg:col-span-8 flex flex-col gap-6">
                    {/* Page Heading & Filters */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h1 className="text-3xl font-black tracking-tight text-text-main dark:text-white">Notifications</h1>
                            <button className="group flex items-center gap-2 rounded-lg py-2 px-3 text-sm font-bold text-primary hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-[1.25rem]">done_all</span>
                                <span>Mark all as read</span>
                            </button>
                        </div>
                        {/* Filter Chips */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {['All', 'Matches', 'System', 'Payments'].map((f) => (
                                <button 
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold shadow-sm transition-transform active:scale-95 ${
                                        filter === f 
                                        ? 'bg-primary text-white shadow-primary/30' 
                                        : 'bg-surface-light dark:bg-surface-dark border border-border dark:border-[#3e342a] text-text-main dark:text-white hover:border-primary/50'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Feed Content */}
                    <div className="flex flex-col gap-8">
                        {/* Section: Today */}
                        {todayNotifications.length > 0 && (
                            <section>
                                <h3 className="mb-4 text-lg font-bold text-text-main dark:text-white">Today</h3>
                                <div className="flex flex-col gap-3">
                                    {todayNotifications.map(notification => (
                                        <NotificationCard key={notification.id} notification={notification} />
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {/* Section: Earlier */}
                        {earlierNotifications.length > 0 && (
                            <section>
                                <h3 className="mb-4 text-lg font-bold text-text-main dark:text-white">Earlier</h3>
                                <div className="flex flex-col gap-3">
                                    {earlierNotifications.map(notification => (
                                        <NotificationCard key={notification.id} notification={notification} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {filteredNotifications.length === 0 && (
                             <div className="mt-8 flex flex-col items-center justify-center py-12 text-center opacity-60">
                                <span className="material-symbols-outlined text-4xl text-text-muted mb-3">pets</span>
                                <p className="text-sm font-medium text-text-muted">No notifications found.</p>
                            </div>
                        )}
                    </div>
                    {/* Empty State / End of list */}
                    {filteredNotifications.length > 0 && (
                         <div className="mt-8 flex flex-col items-center justify-center py-12 text-center opacity-60">
                            <span className="material-symbols-outlined text-4xl text-text-muted mb-3">pets</span>
                            <p className="text-sm font-medium text-text-muted">You're all caught up!</p>
                        </div>
                    )}
                </main>
                {/* Right Column: Sidebar (Desktop) */}
                <aside className="hidden lg:col-span-4 lg:flex flex-col gap-6">
                    {/* Stats Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 border border-primary/10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                            <h3 className="text-lg font-bold text-text-main dark:text-white">This Week's Activity</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm">
                                <p className="text-3xl font-black text-text-main dark:text-white">24</p>
                                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mt-1">Profile Views</p>
                            </div>
                            <div className="rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm">
                                <p className="text-3xl font-black text-text-main dark:text-white">5</p>
                                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mt-1">New Matches</p>
                            </div>
                        </div>
                    </div>
                    {/* Promo Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm">
                        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAu2mJyIU6iB2c3hFPWNcoXZMnF-njU9Qh2FpLqtd3n5xQWxmmapHfY1u4DOjJlnffQQIuZK0bhEYRNE0I3YnCE8ZeDZdVt3fZl6KiDjZ4CdT6Ccat1Ar3wx90zQrDy9qK6MQVWAbPLc7Sp75drUwcKEgqFRxPQfaPzWVvX-CwLqo-JP9UJG43RLbrDzBp2iHZaS1T0Us6f_em-ykFbZnEhZSJeSCo7R1xMzbZ4qf_XrmG3L50DJ9pWAHZsES2rSJCxOJIuHSjsI_g')" }}></div>
                        <div className="relative z-10 p-6 flex flex-col items-center text-center">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-yellow-400 text-white shadow-lg shadow-yellow-400/30">
                                <span className="material-symbols-outlined text-2xl">diamond</span>
                            </div>
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Go Premium</h3>
                            <p className="mt-2 text-sm text-text-muted mb-6">See who liked your profile and get unlimited swipes!</p>
                            <button className="w-full rounded-xl bg-text-main dark:bg-white py-3 text-sm font-bold text-white dark:text-black transition-transform active:scale-95">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                    {/* Footer Links */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 px-2 text-xs font-medium text-text-muted">
                        <a className="hover:underline" href="#">Privacy Policy</a>
                        <a className="hover:underline" href="#">Terms of Service</a>
                        <a className="hover:underline" href="#">Help Center</a>
                        <span>© 2024 PawMate</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

const NotificationCard: React.FC<{ notification: any }> = ({ notification }) => {
    // 1. Match Request
    if (notification.type === 'match_request') {
        return (
            <div className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm transition-all hover:shadow-md border border-transparent hover:border-primary/20">
                {!notification.isRead && <div className="absolute right-4 top-4 size-2.5 rounded-full bg-primary"></div>}
                <div className="relative shrink-0">
                    <div className="size-16 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${notification.data.dogImage}")` }}></div>
                    <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-white dark:bg-surface-dark ring-2 ring-white dark:ring-surface-dark text-pink-500">
                        <span className="material-symbols-outlined text-sm font-bold">favorite</span>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <p className="text-base font-semibold text-text-main dark:text-white leading-snug">
                        <span className="font-black text-primary">{notification.data.dogName}</span> sent you a match request!
                    </p>
                    <p className="text-sm text-text-muted">{notification.data.dogBreed} • {notification.timestamp}</p>
                    <div className="mt-2 flex gap-3">
                        <button className="flex items-center justify-center rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white shadow-sm shadow-primary/30 transition-all hover:bg-primary-hover active:scale-95">Accept</button>
                        <button className="flex items-center justify-center rounded-lg border border-border dark:border-[#3e342a] bg-transparent px-6 py-2 text-sm font-semibold text-text-main dark:text-white transition-colors hover:bg-background-light dark:hover:bg-white/5">Decline</button>
                    </div>
                </div>
            </div>
        );
    }

    // 2. System Alert
    if (notification.type === 'system') {
        return (
            <div className="group relative flex items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm transition-all hover:shadow-md border border-transparent hover:border-primary/20">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div className="flex flex-1 flex-col">
                    <p className="text-base font-medium text-text-main dark:text-white">
                        Your profile has been <span className="font-bold text-green-600 dark:text-green-400">approved</span> by the admin team. You are now visible to other users!
                    </p>
                    <p className="text-xs text-text-muted mt-1">System • {notification.timestamp}</p>
                </div>
            </div>
        );
    }

    // 3. Match Accepted
    if (notification.type === 'match_accepted') {
        return (
            <div className="group relative flex items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm transition-all hover:shadow-md">
                <div className="relative shrink-0">
                    <div className="size-14 rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-300" style={{ backgroundImage: `url("${notification.data.dogImage}")` }}></div>
                    <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary ring-2 ring-white dark:ring-surface-dark text-white">
                        <span className="material-symbols-outlined text-[10px] font-bold">chat</span>
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <p className="text-base font-medium text-text-main dark:text-white">
                        <span className="font-bold">{notification.data.dogName}</span> accepted your match request. Start chatting now!
                    </p>
                    <p className="text-xs text-text-muted mt-1">{notification.timestamp}</p>
                </div>
                <button className="hidden sm:flex size-10 items-center justify-center rounded-full bg-background-light dark:bg-white/5 text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">send</span>
                </button>
            </div>
        );
    }

    // 4. Payment
    if (notification.type === 'payment') {
        return (
            <div className="group relative flex items-center gap-4 rounded-2xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm transition-all hover:shadow-md">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined text-2xl">receipt_long</span>
                </div>
                <div className="flex flex-1 flex-col">
                    <p className="text-base font-medium text-text-main dark:text-white">
                        Payment successful for <span className="font-bold">{notification.data.planName}</span>.
                    </p>
                    <p className="text-xs text-text-muted mt-1">Billing • {notification.timestamp}</p>
                </div>
                <a className="text-sm font-bold text-primary hover:underline whitespace-nowrap px-2" href="#">View Invoice</a>
            </div>
        );
    }

    // 5. Rejected
    if (notification.type === 'match_rejected') {
         return (
            <div className="group relative flex items-center gap-4 rounded-2xl bg-surface-light/50 dark:bg-surface-dark/50 p-4 shadow-sm transition-all hover:bg-surface-light dark:hover:bg-surface-dark">
                <div className="relative shrink-0">
                    <div className="size-14 rounded-full bg-cover bg-center opacity-70" style={{ backgroundImage: `url("${notification.data.dogImage}")` }}></div>
                </div>
                <div className="flex flex-1 flex-col">
                    <p className="text-base font-medium text-text-main/70 dark:text-white/70">
                        <span className="font-bold">{notification.data.dogName}</span> declined your match request.
                    </p>
                    <p className="text-xs text-text-muted/70 mt-1">{notification.timestamp}</p>
                </div>
            </div>
        );
    }

    return null;
};

export default Notifications;