import React, { useState, useMemo } from 'react';

// Domain options for NextGen Buildathon
const DOMAINS = [
  'Artificial Intelligence & Machine Learning',
  'Web3, Blockchain & Decentralized Apps',
  'Cloud Architecture, DevOps & Serverless',
  'IoT, Embedded Systems & Robotics',
  'Cybersecurity, Privacy & Threat Defense',
  'FinTech, Digital Payments & Banking',
  'HealthTech & Bio-Informatics',
  'Smart City, Cleantech & Sustainability',
  'Open Innovation & Social Impact',
];

// Indian States and Union Territories list
const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry', 'Other'
];

const SEMESTERS = [
  '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
  '5th Semester', '6th Semester', '7th Semester', '8th Semester'
];

export default function NextGenRegistration() {
  // Section 1: Team & Project Overview
  const [teamOverview, setTeamOverview] = useState({
    teamName: '',
    teamSize: 3, // 2, 3, or 4
    domain: '',
    state: '',
  });

  // Section 2: Team Leader Details
  const [leader, setLeader] = useState({
    fullName: '',
    email: '',
    college: '',
    phone: '',
    semester: '',
  });

  // Section 3: Dynamic Members (Members 2, 3, 4)
  const [members, setMembers] = useState([
    { id: 2, fullName: '', college: '', email: '', phone: '', semester: '' },
    { id: 3, fullName: '', college: '', email: '', phone: '', semester: '' },
    { id: 4, fullName: '', college: '', email: '', phone: '', semester: '' },
  ]);

  // Section 4: Agreements & Consent
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    declaration: false,
  });

  // State search filter for dropdown
  const [stateSearch, setStateSearch] = useState('');
  const [isStateOpen, setIsStateOpen] = useState(false);

  // Form submission feedback
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  // Filter states based on search query
  const filteredStates = useMemo(() => {
    return STATES.filter(s => s.toLowerCase().includes(stateSearch.toLowerCase()));
  }, [stateSearch]);

  // All 3 agreements must be true to enable submit
  const isSubmitDisabled = !agreements.terms || !agreements.privacy || !agreements.declaration || status.submitting;

  // Active members to display (Leader is #1, so member indices start at #2)
  const activeMembers = members.slice(0, teamOverview.teamSize - 1);

  // Member field update handler
  const handleMemberChange = (id, field, value) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    // Construct the payload
    const submissionPayload = {
      teamName: teamOverview.teamName,
      teamSize: teamOverview.teamSize,
      domain: teamOverview.domain,
      state: teamOverview.state,
      leader,
      members: activeMembers,
      submittedAt: new Date().toISOString(),
    };

    try {
      // If posting to your Google Apps Script or custom API endpoint:
      /*
      const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_OR_API_URL';
      const formData = new FormData();
      formData.append('teamName', teamOverview.teamName);
      formData.append('teamSize', teamOverview.teamSize);
      formData.append('domain', teamOverview.domain);
      formData.append('state', teamOverview.state);
      formData.append('leaderName', leader.fullName);
      formData.append('leaderEmail', leader.email);
      formData.append('leaderCollege', leader.college);
      formData.append('leaderPhone', leader.phone);
      formData.append('leaderSemester', leader.semester);
      
      activeMembers.forEach(m => {
        formData.append(`member${m.id}Name`, m.fullName);
        formData.append(`member${m.id}Email`, m.email);
        formData.append(`member${m.id}College`, m.college);
        formData.append(`member${m.id}Phone`, m.phone);
        formData.append(`member${m.id}Semester`, m.semester);
      });

      await fetch(scriptURL, { method: 'POST', body: formData });
      */

      // Simulated network request
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Registration submitted successfully:', submissionPayload);
      setStatus({ submitting: false, success: true, error: '' });
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus({ submitting: false, success: false, error: 'Registration failed. Please verify your connection and try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Montserrat',sans-serif] relative overflow-hidden selection:bg-orange-500 selection:text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/50 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Branding */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm shadow-orange-500/10">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Presented by The Mind Mesh
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            NextGen <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Buildathon</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Forge breakthrough solutions. Complete the official registration below to secure your team&apos;s slot.
          </p>
        </header>

        {/* Success Banner */}
        {status.success ? (
          <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-8 text-center backdrop-blur-xl shadow-2xl shadow-emerald-500/10 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Team Registered Successfully!</h2>
            <p className="text-slate-300 max-w-md mx-auto mb-6 text-sm">
              Congratulations <strong className="text-orange-400">{teamOverview.teamName}</strong>. A confirmation email and buildathon packet have been dispatched to <span className="text-slate-200">{leader.email}</span>.
            </p>
            <button
              onClick={() => {
                setStatus({ submitting: false, success: false, error: '' });
                setTeamOverview({ teamName: '', teamSize: 3, domain: '', state: '' });
                setLeader({ fullName: '', email: '', college: '', phone: '', semester: '' });
                setMembers([
                  { id: 2, fullName: '', college: '', email: '', phone: '', semester: '' },
                  { id: 3, fullName: '', college: '', email: '', phone: '', semester: '' },
                  { id: 4, fullName: '', college: '', email: '', phone: '', semester: '' },
                ]);
                setAgreements({ terms: false, privacy: false, declaration: false });
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm hover:opacity-95 transition shadow-lg shadow-orange-500/20"
            >
              Register Another Team
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* SECTION 1: Team & Project Overview */}
            <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl relative group hover:border-slate-700/80 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Team &amp; Project Overview</h2>
                  <p className="text-xs text-slate-400">Establish your identity, squad size, and innovation track</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Team Name */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Team Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={teamOverview.teamName}
                    onChange={(e) => setTeamOverview({ ...teamOverview, teamName: e.target.value })}
                    placeholder="e.g. CyberVanguard"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Team Size Radio Selector */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Team Size <span className="text-orange-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[2, 3, 4].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setTeamOverview({ ...teamOverview, teamSize: size })}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
                          teamOverview.teamSize === size
                            ? 'bg-orange-500/15 border-orange-500 text-orange-400 shadow-md shadow-orange-500/20 ring-1 ring-orange-500/50'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span>{size} Members</span>
                        <span className="text-[10px] font-normal opacity-70">
                          {size === 2 ? 'Leader + 1' : size === 3 ? 'Leader + 2' : 'Leader + 3'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Domain Chosen */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Domain Chosen <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={teamOverview.domain}
                      onChange={(e) => setTeamOverview({ ...teamOverview, domain: e.target.value })}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select innovation domain</option>
                      {DOMAINS.map((d) => (
                        <option key={d} value={d} className="bg-slate-900 text-slate-200">
                          {d}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* State Dropdown (Searchable) */}
                <div className="sm:col-span-1 relative">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    State / Region <span className="text-orange-500">*</span>
                  </label>
                  
                  <div
                    onClick={() => setIsStateOpen(!isStateOpen)}
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/50 hover:border-slate-600 transition-all"
                  >
                    <span className={teamOverview.state ? 'text-slate-100' : 'text-slate-500'}>
                      {teamOverview.state || 'Select state or region'}
                    </span>
                    <span className="text-slate-400 text-xs">▼</span>
                  </div>

                  {/* Dropdown Menu */}
                  {isStateOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-30 overflow-hidden">
                      <div className="p-2 border-b border-slate-800">
                        <input
                          type="text"
                          value={stateSearch}
                          onChange={(e) => setStateSearch(e.target.value)}
                          placeholder="Search state..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredStates.length > 0 ? (
                          filteredStates.map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => {
                                setTeamOverview({ ...teamOverview, state: st });
                                setIsStateOpen(false);
                                setStateSearch('');
                              }}
                              className={`w-full text-left px-4 py-2 text-xs transition hover:bg-orange-500/10 hover:text-orange-400 ${
                                teamOverview.state === st ? 'text-orange-400 font-semibold bg-orange-500/5' : 'text-slate-300'
                              }`}
                            >
                              {st}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-xs text-slate-500 text-center">No states found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 2: Team Leader Details */}
            <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl relative group hover:border-slate-700/80 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                  2
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Team Leader Details</h2>
                  <p className="text-xs text-slate-400">Primary point of contact for communications and check-in</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Full Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={leader.fullName}
                    onChange={(e) => setLeader({ ...leader, fullName: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Active Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Active Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={leader.email}
                    onChange={(e) => setLeader({ ...leader, email: e.target.value })}
                    placeholder="alex.morgan@university.edu"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* College / Institute Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    College / Institute Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={leader.college}
                    onChange={(e) => setLeader({ ...leader, college: e.target.value })}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Phone Number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={leader.phone}
                    onChange={(e) => setLeader({ ...leader, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Semester */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Semester <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={leader.semester}
                      onChange={(e) => setLeader({ ...leader, semester: e.target.value })}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select leader current semester</option>
                      {SEMESTERS.map((sem) => (
                        <option key={sem} value={sem} className="bg-slate-900 text-slate-200">
                          {sem}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: Dynamic Member Details */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 px-1">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                  3
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Team Member Information</h2>
                  <p className="text-xs text-slate-400">
                    Dynamically rendered for {teamOverview.teamSize - 1} co-builder{teamOverview.teamSize > 2 ? 's' : ''}
                  </p>
                </div>
              </div>

              {activeMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl relative group hover:border-slate-700/80 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                    <span className="text-sm font-bold text-orange-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      Team Member {member.id}
                    </span>
                    <span className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                      Co-Participant #{member.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Full Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={member.fullName}
                        onChange={(e) => handleMemberChange(member.id, 'fullName', e.target.value)}
                        placeholder="e.g. Jordan Lee"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      />
                    </div>

                    {/* Active Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Active Email <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={member.email}
                        onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)}
                        placeholder="jordan.lee@university.edu"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      />
                    </div>

                    {/* College / Institution */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        College / Institution Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={member.college}
                        onChange={(e) => handleMemberChange(member.id, 'college', e.target.value)}
                        placeholder="e.g. Institute of Technology"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Phone Number <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={member.phone}
                        onChange={(e) => handleMemberChange(member.id, 'phone', e.target.value)}
                        placeholder="+91 91234 56789"
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      />
                    </div>

                    {/* Semester */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Semester <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={member.semester}
                          onChange={(e) => handleMemberChange(member.id, 'semester', e.target.value)}
                          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all cursor-pointer"
                        >
                          <option value="" disabled>Select current semester</option>
                          {SEMESTERS.map((sem) => (
                            <option key={sem} value={sem} className="bg-slate-900 text-slate-200">
                              {sem}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* SECTION 4: Agreements & Consent */}
            <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl relative group hover:border-slate-700/80 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                  4
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Agreements &amp; Consent</h2>
                  <p className="text-xs text-slate-400">All three affirmations are required prior to registration submission</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* 1. Terms and Conditions */}
                <label className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700/70 transition cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreements.terms}
                    onChange={(e) => setAgreements({ ...agreements, terms: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-950 accent-orange-500 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    I agree to the <span className="text-orange-400 font-medium underline underline-offset-2">Terms and Conditions</span> of the NextGen Buildathon.
                  </span>
                </label>

                {/* 2. Privacy Policy */}
                <label className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700/70 transition cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreements.privacy}
                    onChange={(e) => setAgreements({ ...agreements, privacy: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-950 accent-orange-500 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    I have read and acknowledge the <span className="text-orange-400 font-medium underline underline-offset-2">Privacy Policy.pdf</span>.
                  </span>
                </label>

                {/* 3. Declaration */}
                <label className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700/70 transition cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreements.declaration}
                    onChange={(e) => setAgreements({ ...agreements, declaration: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-950 accent-orange-500 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    I hereby declare that the information provided by me is true and accurate to the best of my knowledge. I agree to abide by the rules, guidelines, and Terms &amp; Conditions of NextGen Buildathon and consent to the use of my submitted information for registration, communication, verification, and other event-related purposes.
                  </span>
                </label>
              </div>
            </section>

            {/* Submission Error Banner */}
            {status.error && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs sm:text-sm">
                ⚠️ {status.error}
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitDisabled
                    ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/25 active:scale-[0.99] cursor-pointer'
                }`}
              >
                {status.submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Transmitting Registration Data...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Team Registration</span>
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
              
              {isSubmitDisabled && (
                <p className="text-center text-[11px] text-slate-500 mt-2 font-medium">
                  * Please review and check all three agreement boxes above to enable registration.
                </p>
              )}
            </div>

          </form>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-500 pb-8 border-t border-slate-900 pt-8">
          <p className="tracking-wide">
            NextGen Buildathon &bull; Presented by <span className="text-slate-400 font-semibold">The Mind Mesh</span> &bull; All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
