import React, { useState } from 'react';
import { MOCK_CHATS, MOCK_MESSAGES } from '../services/data';

const Messages: React.FC = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>("c1");
    const [newMessage, setNewMessage] = useState("");
    
    // Fallback to first chat if no selection, or keep as is.
    // In mobile view, selectedChatId being null means show list.
    // In desktop view, selectedChatId being null implies maybe empty state or auto-select first.
    
    const activeChat = MOCK_CHATS.find(c => c.id === selectedChatId);
    const messages = selectedChatId && MOCK_MESSAGES[selectedChatId] ? MOCK_MESSAGES[selectedChatId] : [];

    // Helper to toggle views on mobile
    const handleChatSelect = (id: string) => {
        setSelectedChatId(id);
    };

    const handleBackToList = () => {
        setSelectedChatId(null);
    };

    return (
        <div className="flex flex-1 overflow-hidden w-full max-w-[1600px] mx-auto p-0 md:p-6 md:gap-6 h-[calc(100vh-65px)]">
            {/* Sidebar: Match List */}
            <aside className={`flex-col w-full md:w-[360px] lg:w-[400px] bg-white dark:bg-[#2c2219] md:rounded-2xl border-r md:border border-border dark:border-[#3a2e24] h-full overflow-hidden flex-shrink-0 z-10 shadow-sm ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
                {/* Header & Search */}
                <div className="p-4 md:p-6 border-b border-border dark:border-[#3a2e24]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold tracking-tight text-text-main dark:text-white">Messages</h2>
                        <button className="text-primary hover:bg-primary/10 rounded-full p-2 transition-colors">
                            <span className="material-symbols-outlined">edit_square</span>
                        </button>
                    </div>
                    {/* Search Bar */}
                    <label className="flex flex-col w-full h-11 relative">
                        <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-input-bg dark:bg-[#3a2e24] overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <div className="flex items-center justify-center pl-4 pr-2 text-text-muted">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input className="flex w-full min-w-0 flex-1 bg-transparent border-none text-text-main dark:text-white focus:outline-0 focus:ring-0 placeholder:text-text-muted text-sm font-normal" placeholder="Search matches..."/>
                        </div>
                    </label>
                </div>
                {/* Matches List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {MOCK_CHATS.map((chat) => (
                        <div 
                            key={chat.id}
                            onClick={() => handleChatSelect(chat.id)}
                            className={`flex items-center gap-4 rounded-xl px-4 py-3 cursor-pointer border transition-colors group ${selectedChatId === chat.id ? 'bg-primary/10 dark:bg-primary/20 border-primary/20' : 'border-transparent hover:bg-background-light dark:hover:bg-[#342a20]'}`}
                        >
                            <div className="relative shrink-0">
                                <div className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 ${selectedChatId !== chat.id ? 'group-hover:scale-105 transition-transform' : ''}`} style={{ backgroundImage: `url("${chat.dogImage}")` }}></div>
                                {chat.isOnline && <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-[#2c2219] rounded-full"></span>}
                            </div>
                            <div className="flex flex-col justify-center flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <p className={`font-bold text-base line-clamp-1 ${selectedChatId === chat.id ? 'text-text-main dark:text-white' : 'text-text-main dark:text-gray-200'}`}>
                                        {chat.dogName} & {chat.ownerName}
                                    </p>
                                    <span className={`text-xs font-medium ${selectedChatId === chat.id ? 'text-primary' : 'text-text-muted'}`}>{chat.lastMessageTime}</span>
                                </div>
                                <p className={`text-sm line-clamp-1 font-medium ${selectedChatId === chat.id ? 'text-text-muted' : 'text-text-muted opacity-70'}`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Chat Area */}
            <main className={`flex-col flex-1 bg-white dark:bg-[#2c2219] md:rounded-2xl border border-border dark:border-[#3a2e24] overflow-hidden relative shadow-sm ${selectedChatId ? 'flex' : 'hidden md:flex'}`}>
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border dark:border-[#3a2e24] bg-white/90 dark:bg-[#2c2219]/90 backdrop-blur-md z-20 absolute top-0 w-full">
                            <div className="flex items-center gap-4">
                                <button onClick={handleBackToList} className="md:hidden p-2 -ml-2 text-text-muted hover:text-text-main">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </button>
                                <div className="relative">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 md:size-12 ring-2 ring-primary/10" style={{ backgroundImage: `url("${activeChat.dogImage}")` }}></div>
                                    {activeChat.isOnline && <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-[#2c2219]"></div>}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-main dark:text-white flex items-center gap-2">
                                        {activeChat.dogName} 
                                        {activeChat.dogBreed && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider hidden sm:inline-block">{activeChat.dogBreed}</span>}
                                    </h3>
                                    <p className="text-sm text-text-muted flex items-center gap-1">
                                        {activeChat.isOnline ? <><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</> : 'Offline'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="size-10 rounded-full flex items-center justify-center text-text-muted hover:bg-background-light dark:hover:bg-[#3a2e24] transition-colors" title="View Profile">
                                    <span className="material-symbols-outlined">info</span>
                                </button>
                                <button className="size-10 rounded-full flex items-center justify-center text-text-muted hover:bg-background-light dark:hover:bg-[#3a2e24] transition-colors" title="Options">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-24 pb-24 space-y-6 flex flex-col bg-background-light dark:bg-background-dark/50" id="chat-messages">
                            {/* Date Divider */}
                            <div className="flex justify-center">
                                <span className="px-3 py-1 bg-surface-light dark:bg-[#3a2e24] rounded-full text-xs font-medium text-text-muted">Today</span>
                            </div>
                            
                            {/* System Message */}
                            <div className="flex justify-center w-full">
                                <div className="px-6 py-2 bg-primary/5 border border-primary/10 rounded-lg text-center max-w-sm">
                                    <p className="text-sm text-text-main dark:text-white">You matched with <span class="font-bold text-primary">{activeChat.dogName}</span>! Start the conversation.</p>
                                </div>
                            </div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'me' ? 'ml-auto flex-row-reverse' : ''}`}>
                                    {msg.sender === 'them' && (
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 self-end mb-1" style={{ backgroundImage: `url("${activeChat.ownerImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOZ8iCqSzdhlABp519NCiEWZWJVVaGLYcoOJcS75i-DN50vinj2h7nVcN1xV5OAPtlvgkp-XLcG8wxaX9I9bZ64Bs3NhlxRy4YlN1v9Edyoy1mKyCddgW4T5LP8xcujPgBNwWtWQGXgjkXE7me4flMH29_yt6JVF6vnNmCPd5lxWyQmmFhipgU79rROyXnD9zVCt7ytp7RGIkQ7EGXT3gLzzZPXWHL5u2S3egj6H67Iw-DwIa2xzcwiVeL-cebU0LatOlVSfLwYOw'}")` }}></div>
                                    )}
                                    
                                    <div className={`flex flex-col gap-1 ${msg.sender === 'me' ? 'items-end' : ''}`}>
                                        <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'me' ? 'bg-primary text-white rounded-br-none shadow-md' : 'bg-white dark:bg-[#3a2e24] rounded-bl-none border border-border dark:border-none'}`}>
                                            <p className={`text-base ${msg.sender === 'me' ? 'text-white' : 'text-text-main dark:text-gray-100'}`}>{msg.text}</p>
                                        </div>
                                        <span className={`text-xs text-text-muted ${msg.sender === 'me' ? 'mr-1' : 'ml-1'}`}>{msg.timestamp}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator Demo */}
                            <div className="flex gap-3 max-w-[85%]">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 self-end mb-1" style={{ backgroundImage: `url("${activeChat.ownerImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOZ8iCqSzdhlABp519NCiEWZWJVVaGLYcoOJcS75i-DN50vinj2h7nVcN1xV5OAPtlvgkp-XLcG8wxaX9I9bZ64Bs3NhlxRy4YlN1v9Edyoy1mKyCddgW4T5LP8xcujPgBNwWtWQGXgjkXE7me4flMH29_yt6JVF6vnNmCPd5lxWyQmmFhipgU79rROyXnD9zVCt7ytp7RGIkQ7EGXT3gLzzZPXWHL5u2S3egj6H67Iw-DwIa2xzcwiVeL-cebU0LatOlVSfLwYOw'}")` }}></div>
                                <div className="flex flex-col gap-1">
                                    <div className="bg-white dark:bg-[#3a2e24] px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-border dark:border-none w-16 flex items-center justify-center gap-1">
                                        <div className="size-1.5 bg-text-muted rounded-full animate-bounce"></div>
                                        <div className="size-1.5 bg-text-muted rounded-full animate-bounce delay-100"></div>
                                        <div className="size-1.5 bg-text-muted rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-[#2c2219] border-t border-border dark:border-[#3a2e24] absolute bottom-0 w-full z-20">
                            <div className="flex items-end gap-2 bg-input-bg dark:bg-[#3a2e24] p-2 rounded-2xl border border-border dark:border-transparent focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                                <button className="p-2 text-text-muted hover:bg-white dark:hover:bg-white/10 rounded-xl transition-colors shrink-0">
                                    <span className="material-symbols-outlined">add_circle</span>
                                </button>
                                <textarea 
                                    className="w-full bg-transparent border-none text-text-main dark:text-white placeholder:text-text-muted focus:ring-0 resize-none py-3 max-h-32 leading-relaxed" 
                                    placeholder={`Type a message to ${activeChat.dogName}'s owner...`}
                                    rows={1}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                ></textarea>
                                <button className="p-2 text-text-muted hover:bg-white dark:hover:bg-white/10 rounded-xl transition-colors shrink-0">
                                    <span className="material-symbols-outlined">sentiment_satisfied</span>
                                </button>
                                <button className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 shrink-0 mb-0.5">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-text-muted">
                        Select a chat to start messaging
                    </div>
                )}
            </main>
        </div>
    );
};

export default Messages;