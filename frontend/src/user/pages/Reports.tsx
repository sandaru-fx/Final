import React, { useState } from 'react';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('Fake Profile');
  const [reportDetails, setReportDetails] = useState('');
  const [feedbackTopic, setFeedbackTopic] = useState('Feature Request');
  const [feedbackText, setFeedbackText] = useState('');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Report submitted successfully. Our safety team will review it shortly.');
    setReportDetails('');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    setFeedbackText('');
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Main Forms */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em] text-text-main dark:text-white">Help &amp; Community Safety</h1>
              <p className="text-text-muted text-lg font-normal leading-normal">Your safety is our priority. All reports are anonymous and reviewed by our dedicated trust &amp; safety team.</p>
            </div>
            
            {/* Report Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border dark:border-[#3a2e24] p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500">
                  <span className="material-symbols-outlined">report_problem</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-text-main dark:text-white">Report a Concern</h2>
              </div>
              
              <form onSubmit={handleReportSubmit} className="flex flex-col gap-6">
                {/* User Selection */}
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-text-muted">Who are you reporting?</span>
                  <div className="relative">
                    <select className="w-full h-14 rounded-xl border border-border dark:border-[#3a2e24] bg-background-light dark:bg-background-dark text-text-main dark:text-white px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                      <option disabled value="">Select a recent match or search user...</option>
                      <option value="user1">Max &amp; Owner Sarah</option>
                      <option value="user2">Bella &amp; Owner John</option>
                      <option value="user3">Rocky &amp; Owner Mike</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">expand_more</span>
                  </div>
                </label>

                {/* Reason Selection */}
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-bold uppercase tracking-wider text-text-muted">Reason for report</span>
                  <div className="flex flex-wrap gap-3">
                    {['Fake Profile', 'Harassment', 'Spam / Scam', 'Underage Puppy Selling', 'Other'].map((reason) => (
                      <label key={reason} className="cursor-pointer">
                        <input 
                          className="peer sr-only" 
                          name="reason" 
                          type="radio" 
                          value={reason}
                          checked={reportType === reason}
                          onChange={() => setReportType(reason)}
                        />
                        <div className="px-4 py-2 rounded-full border border-border dark:border-[#3a2e24] bg-background-light dark:bg-background-dark text-text-main dark:text-white font-medium transition-all peer-checked:bg-red-50 peer-checked:border-red-500 peer-checked:text-red-600 dark:peer-checked:bg-red-900/20 dark:peer-checked:text-red-400 hover:bg-border/50">
                          {reason}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-text-muted">Details</span>
                  <textarea 
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    className="w-full min-h-[120px] rounded-xl border border-border dark:border-[#3a2e24] bg-background-light dark:bg-background-dark text-text-main dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y" 
                    placeholder="Please describe the incident with as much detail as possible..."
                  ></textarea>
                </label>

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-text-muted">Evidence (Optional)</span>
                  <div className="border-2 border-dashed border-border dark:border-[#3a2e24] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-background-light/50 dark:bg-background-dark/50 hover:bg-background-light dark:hover:bg-background-dark transition-colors cursor-pointer group">
                    <div className="size-12 rounded-full bg-border/30 dark:bg-[#3a2e24] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-text-muted">cloud_upload</span>
                    </div>
                    <p className="text-sm font-medium text-text-main dark:text-white">Click to upload or drag and drop</p>
                    <p className="text-xs text-text-muted mt-1">PNG, JPG or PDF (MAX. 5MB)</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button type="submit" className="w-full sm:w-auto px-8 h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-xl">send</span>
                    Submit Report
                  </button>
                </div>
              </form>
            </div>

            {/* Feedback Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-border dark:border-[#3a2e24] p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-full text-primary">
                  <span className="material-symbols-outlined">thumb_up</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-text-main dark:text-white">Feedback &amp; Suggestions</h2>
              </div>
              
              <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-6">
                <p className="text-text-muted">We build PawMate for you and your furry friend. Tell us what features you want next or how we can improve.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold uppercase tracking-wider text-text-muted">Topic</span>
                    <div className="relative">
                      <select 
                        value={feedbackTopic}
                        onChange={(e) => setFeedbackTopic(e.target.value)}
                        className="w-full h-14 rounded-xl border border-border dark:border-[#3a2e24] bg-background-light dark:bg-background-dark text-text-main dark:text-white px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option>Feature Request</option>
                        <option>Bug Report</option>
                        <option>General Praise</option>
                        <option>Other</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">expand_more</span>
                    </div>
                  </label>
                  
                  {/* Rating */}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold uppercase tracking-wider text-text-muted">Rate Experience</span>
                    <div className="flex items-center gap-1 h-14">
                      {[1, 2, 3, 4, 5].map((star) => (
                         <button key={star} type="button" className={`hover:scale-110 transition-transform ${star <= 4 ? 'text-primary' : 'text-border dark:text-[#3a2e24] hover:text-primary'}`}>
                           <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                         </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feedback Text */}
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-text-muted">Your Thoughts</span>
                  <textarea 
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full min-h-[100px] rounded-xl border border-border dark:border-[#3a2e24] bg-background-light dark:bg-background-dark text-text-main dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y" 
                    placeholder="Tell us more..."
                  ></textarea>
                </label>

                {/* Send Feedback Button */}
                <div className="pt-2">
                  <button type="submit" className="w-full sm:w-auto px-8 h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-xl">mark_email_unread</span>
                    Send Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Safety Tips Widget */}
            <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/10">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <span className="material-symbols-outlined">security</span>
                <h3 className="font-bold text-lg">Safety Tips</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Always meet in public dog parks for first dates.",
                  "Keep your conversations on the platform until you trust the person.",
                  "Trust your instincts. If something feels off, report it immediately."
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                    <p className="text-sm text-text-main dark:text-white font-medium leading-snug">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Widget */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border dark:border-[#3a2e24] p-6">
              <h3 className="font-bold text-lg mb-4 text-text-main dark:text-white">Resources</h3>
              <nav className="flex flex-col gap-2">
                {['Community Guidelines', 'Privacy Policy', 'Contact Support'].map((link) => (
                  <a key={link} className="flex items-center justify-between p-3 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors group" href="#">
                    <span className="text-sm font-medium text-text-main dark:text-white group-hover:text-primary">{link}</span>
                    <span className="material-symbols-outlined text-text-muted text-lg">arrow_forward_ios</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Decorative Image Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border dark:border-[#3a2e24] overflow-hidden relative min-h-[240px] flex items-end">
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBS6Yo0WW4k2L7WmWYQJAaGvl9IJhu3C-mKKQaz2LHqtHcWH9W5W_x2AYpvlfPfybrKzi3XGGUVH8R4E8gHUBRMHr_t_8XZnxXeiHyamZcBG8tIPgTPtiJxji-gcP2kLrHT3CXz_Xk_zv1fnLnuSeR5OWlw_bA1BFe05_fhIh_eAryL_glDCnV1p_Jff4MKfphQrEBGVG3SaJ6RDc5a-l-poQKqvx3AmgkLYM_WOBvlgbuVnvgRdV3KudByC1QAG2aJfrGypQwmrhI")'}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="relative z-10 p-6">
                <p className="text-white font-bold text-xl leading-tight mb-2">Building a safer community for every paw.</p>
                <button className="text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors">Read our Mission</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border dark:border-[#3a2e24] py-8 px-4 lg:px-10 mt-auto bg-surface-light dark:bg-surface-dark">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">© 2024 PawMate Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-sm text-text-muted hover:text-primary" href="#">Terms</a>
            <a className="text-sm text-text-muted hover:text-primary" href="#">Privacy</a>
            <a className="text-sm text-text-muted hover:text-primary" href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Reports;