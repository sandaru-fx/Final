import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_DOGS } from '../services/data';
import { useAuth } from '../context/AuthContext';

const DogProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // In real app, fetch from API. Here find in mock data.
  // Fallback to first dog if id not found for demo stability
  const dog = MOCK_DOGS.find(d => d._id === id) || MOCK_DOGS[0];

  const isOwner = user?._id === dog.ownerId;

  // Mock owner data if not present (using design mockup data)
  const owner = {
    name: isOwner ? 'You' : (dog.ownerName || "Sarah Jenkins"),
    image: isOwner ? (user?.profileImage || "https://picsum.photos/200") : "https://lh3.googleusercontent.com/aida-public/AB6AXuDF_7ffVP_zMR3JOQZ9KMlV4tQ6kEWBuNM7JelKXIdOpwPXVznkGTRGLPmWHm1VHpjNKnJsBskqFYMfNH0eySsW_9267mxPStZ_YYD0DXD5nMMQkh5t9A7kandRTi017W2jPCZMgrazXG8OB99A42D4Di2KEsC_bYVbSDNLkE-ixjLYO0RDOUNBPFO-FYVYmaexgT_Eo6JEVuYHa09MYMtYIjtN_rYlxfXl_QH0bLCTNXWbapI2CmnlMrhDvaqZDOeYVoetEkZA7TI",
    replyTime: "Typically replies in 1 hr"
  };

  // Ensure we have enough images for the gallery demo
  const displayImages = dog.images.length > 0 
    ? (dog.images.length < 4 ? [...dog.images, ...Array(4 - dog.images.length).fill(dog.images[0])] : dog.images) 
    : [];

  const handleDeleteProfile = () => {
    // In a real app, delete via API
    console.log(`Deleting profile for dog ID: ${dog._id}`);
    setShowDeleteModal(false);
    navigate('/'); // Redirect to home after delete
  };

  return (
    <>
      <div className={`w-full px-4 py-6 md:px-10 lg:py-10 transition-all duration-300 ${showDeleteModal ? 'filter blur-[2px] opacity-60 pointer-events-none' : ''}`}>
        <div className="mx-auto max-w-6xl flex flex-col gap-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-medium text-text-muted">
            <Link to="/" className="hover:text-primary hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="hover:text-primary hover:underline cursor-pointer">Matches</span>
            <span className="mx-2">/</span>
            <span className="text-text-main dark:text-white font-semibold">{dog.breed}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Visuals (Carousel/Gallery) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Hero Image */}
              <div className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-800">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{backgroundImage: `url("${displayImages[activeImageIndex]}")`}}
                ></div>
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span> 
                  {activeImageIndex + 1}/{displayImages.length}
                </div>
              </div>

              {/* Thumbnails / Carousel Strip */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {displayImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-transparent hover:border-primary/50 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: `url("${img}")`}}></div>
                  </button>
                ))}
              </div>

              {/* About Section (Desktop: Below images) */}
              <div className="hidden lg:flex flex-col gap-3 mt-4">
                <h3 className="text-xl font-bold text-text-main dark:text-white">About {dog.name}</h3>
                <p className="text-text-muted leading-relaxed">
                  {dog.description || `${dog.name} is an energetic, friendly, and lovable ${dog.breed} who loves long walks on the beach and playing fetch at the park. Very social with other dogs and has a gentle temperament.`}
                </p>
              </div>
            </div>

            {/* Right Column: Info & Actions */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Header Card */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border dark:border-[#3e342a]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-4xl font-black text-text-main dark:text-white mb-1 flex items-center gap-2">
                      {dog.name}, {dog.age}
                      <span className="material-symbols-outlined text-blue-500 text-2xl" title="Verified Profile">verified</span>
                    </h1>
                    <p className="text-text-muted font-medium">{dog.breed} • {dog.location}</p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark text-text-muted transition-colors">
                    <span className="material-symbols-outlined text-3xl">favorite_border</span>
                  </button>
                </div>
                
                {/* Primary CTA Logic */}
                {isOwner ? (
                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                      <span className="material-symbols-outlined">edit</span>
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full bg-surface-light dark:bg-surface-dark border-2 border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold text-lg h-14 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <span className="material-symbols-outlined">delete</span>
                      Delete Profile
                    </button>
                  </div>
                ) : (
                  <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                    <span className="material-symbols-outlined">pets</span>
                    Request Match
                  </button>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Breed', val: dog.breed, icon: 'category' },
                  { label: 'Gender', val: dog.gender, icon: 'male' },
                  { label: 'Age', val: `${dog.age} Years`, icon: 'cake' },
                  { label: 'Weight', val: `${dog.weight} lbs`, icon: 'scale' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-border dark:border-[#3e342a] flex flex-col gap-1">
                    <div className="text-text-muted flex items-center gap-1 text-sm font-semibold">
                      <span className="material-symbols-outlined text-lg">{stat.icon}</span> {stat.label}
                    </div>
                    <div className="font-bold text-lg text-text-main dark:text-white truncate">{stat.val}</div>
                  </div>
                ))}
              </div>

              {/* Health & Status */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-[#3e342a]">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-main dark:text-white">
                  <span className="material-symbols-outlined text-primary">medical_services</span>
                  Health Status
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                    <span className="font-medium text-teal-700 dark:text-teal-300">Vaccinations Up-to-date</span>
                    <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">check_circle</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                    <span className="font-medium text-teal-700 dark:text-teal-300">Genetic Screening</span>
                    <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">check_circle</span>
                  </div>
                </div>
              </div>

              {/* Owner Profile */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border dark:border-[#3e342a]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">Managed By</h3>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-cover bg-center border-2 border-primary/20" style={{ backgroundImage: `url("${owner.image}")` }}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg text-text-main dark:text-white">{owner.name}</h4>
                      <span className="material-symbols-outlined text-blue-500 text-lg" title="Verified Owner">verified_user</span>
                    </div>
                    {!isOwner && <p className="text-xs text-text-muted">{owner.replyTime}</p>}
                  </div>
                  {!isOwner && (
                    <button className="bg-background-light dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-text-main dark:text-white p-3 rounded-lg transition-colors">
                      <span className="material-symbols-outlined">chat_bubble</span>
                    </button>
                  )}
                </div>
              </div>

              {/* About Section (Mobile Only) */}
              <div className="lg:hidden flex flex-col gap-3">
                <h3 className="text-xl font-bold text-text-main dark:text-white">About {dog.name}</h3>
                <p className="text-text-muted leading-relaxed">
                  {dog.description || `${dog.name} is an energetic, friendly, and lovable ${dog.breed} who loves long walks on the beach and playing fetch at the park. Very social with other dogs and has a gentle temperament.`}
                </p>
              </div>

              {/* Footer Actions */}
              {!isOwner && (
                <div className="flex justify-center pt-2 pb-6">
                  <button className="flex items-center gap-2 text-text-muted hover:text-red-500 dark:hover:text-red-400 text-sm font-medium transition-colors">
                    <span className="material-symbols-outlined text-[18px]">flag</span>
                    Report Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out_forwards]">
            <div className="relative bg-surface-light dark:bg-surface-dark w-full max-w-[440px] rounded-3xl shadow-2xl flex flex-col items-center overflow-hidden animate-[scaleUp_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] border border-white/50 dark:border-white/10">
                {/* Close Button */}
                <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="absolute top-4 right-4 p-2 rounded-full text-text-muted hover:bg-[#f3ede7] dark:hover:bg-[#3a3026] transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
                
                {/* Icon Area */}
                <div className="pt-10 pb-4">
                    <div className="size-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mb-2">
                        <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="px-8 text-center pb-6">
                    <h2 className="text-text-main dark:text-white text-2xl font-bold leading-tight mb-3">
                        Delete {dog.name}'s Profile?
                    </h2>
                    <p className="text-text-muted dark:text-[#b0b0b0] text-base font-normal leading-relaxed">
                        Are you sure you want to remove this profile? All matches and chat history will be permanently lost.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="w-full px-6 pb-8">
                    <div className="flex flex-col gap-3 w-full">
                        <button 
                            onClick={handleDeleteProfile}
                            className="w-full h-12 flex items-center justify-center rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-red-200 dark:shadow-none hover:shadow-lg active:scale-[0.98]"
                        >
                            Delete Profile
                        </button>
                        <button 
                            onClick={() => setShowDeleteModal(false)}
                            className="w-full h-12 flex items-center justify-center rounded-xl bg-background-light hover:bg-[#ebe5df] dark:bg-[#3a3026] dark:hover:bg-[#4a3e33] text-text-main dark:text-white font-bold text-sm tracking-wide transition-colors border border-border dark:border-transparent"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
      )}
    </>
  );
};

export default DogProfile;