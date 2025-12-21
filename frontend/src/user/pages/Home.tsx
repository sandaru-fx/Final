import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_DOGS } from '../services/data';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const searchSectionRef = useRef<HTMLElement>(null);

  const filteredDogs = MOCK_DOGS.filter(dog => 
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFindMatchClick = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex justify-center w-full px-4 md:px-6 py-6 lg:py-8">
      <div className="w-full max-w-[1200px] flex flex-col gap-8">
        
        {/* Hero & CTA */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-surface-light dark:bg-surface-dark p-6 md:p-10 rounded-xl shadow-sm border border-border dark:border-[#3e342a]">
          <div className="flex flex-col gap-2 max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-text-main dark:text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-text-muted dark:text-[#ccb094] text-lg font-medium">
              Ready to find the perfect playdate?
            </p>
          </div>
          <button 
            onClick={handleFindMatchClick}
            className="group flex items-center justify-center rounded-xl h-14 px-8 bg-primary hover:bg-primary-hover text-white gap-3 shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-2xl">favorite</span>
            <span className="text-lg font-bold">Find a Match</span>
          </button>
        </section>

        {/* Search & Filters */}
        <section ref={searchSectionRef} className="flex flex-col gap-4 sticky top-20 z-30 bg-background-light dark:bg-background-dark py-2">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted">search</span>
              </div>
              <input 
                className="block w-full pl-12 pr-4 py-3.5 rounded-xl border-none bg-surface-light dark:bg-surface-dark text-text-main dark:text-white shadow-sm ring-1 ring-inset ring-border dark:ring-[#3e342a] placeholder:text-text-muted/70 focus:ring-2 focus:ring-primary focus:bg-surface-light dark:focus:bg-surface-dark transition-all text-base" 
                placeholder="Search by breed, name, or keywords..." 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {['Breed', 'Age', 'Location'].map((filter) => (
                <button key={filter} className="flex h-[52px] shrink-0 items-center justify-center gap-x-2 rounded-xl bg-surface-light dark:bg-surface-dark px-4 shadow-sm border border-border dark:border-[#3e342a] hover:border-primary/50 transition-colors">
                  <span className="text-sm font-bold text-text-main dark:text-white">{filter}</span>
                  <span className="material-symbols-outlined text-lg text-text-main dark:text-white">expand_more</span>
                </button>
              ))}
              <button className="flex h-[52px] shrink-0 items-center justify-center gap-x-2 rounded-xl bg-surface-light dark:bg-surface-dark px-4 shadow-sm border border-border dark:border-[#3e342a] hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-lg text-text-main dark:text-white">tune</span>
                <span className="text-sm font-bold text-text-main dark:text-white">Filters</span>
              </button>
            </div>
          </div>
        </section>

        {/* Grid Content */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {filteredDogs.map((dog) => (
            <article 
              key={dog._id} 
              className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 border border-border dark:border-[#3e342a] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  alt={dog.name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  src={dog.images[0]} 
                />
                {/* Badges */}
                {dog.isNew && (
                  <div className="absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                    New
                  </div>
                )}
                {dog.healthStatus?.vaccinated && !dog.isNew && (
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm text-text-main dark:text-white">
                    <span className="material-symbols-outlined text-sm text-secondary">verified</span>
                    Verified
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-text-main dark:text-white">{dog.name}</h3>
                    <p className="text-sm text-text-muted font-medium">{dog.breed}</p>
                  </div>
                  <div className={`flex items-center justify-center size-8 rounded-full ${dog.gender === 'Male' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'} dark:bg-opacity-20`}>
                    <span className="material-symbols-outlined text-lg">{dog.gender.toLowerCase()}</span>
                  </div>
                </div>
                <div className="flex gap-3 text-sm text-[#5d4a3d] dark:text-[#a89b90]">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">cake</span>
                    {dog.age} Yrs
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    {dog.distance} miles
                  </div>
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <button 
                    onClick={() => navigate(`/dog/${dog._id}`)}
                    className="flex-1 h-10 rounded-lg bg-input-bg dark:bg-[#3e342a] text-text-main dark:text-white font-bold text-sm hover:bg-[#e6dfd8] dark:hover:bg-[#4d4135] transition-colors"
                  >
                    View Profile
                  </button>
                  <button className="size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
              </div>
            </article>
          ))}

          {/* Add Dog CTA Card */}
          <article 
            onClick={() => navigate('/create-dog')}
            className="group relative flex flex-col justify-center items-center bg-secondary/10 dark:bg-secondary/20 rounded-xl overflow-hidden border-2 border-dashed border-secondary/30 p-6 text-center gap-4 transition-all duration-300 hover:border-secondary hover:bg-secondary/20 cursor-pointer"
          >
            <div className="size-16 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center text-secondary shadow-sm">
              <span className="material-symbols-outlined text-3xl">add_a_photo</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main dark:text-white">Add Your Pet</h3>
              <p className="text-sm text-[#5d4a3d] dark:text-[#a89b90] mt-1">Create a profile for your furry friend to start matching.</p>
            </div>
            <button className="w-full mt-2 h-10 rounded-lg bg-secondary text-white font-bold text-sm hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20">
              Create Profile
            </button>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Home;