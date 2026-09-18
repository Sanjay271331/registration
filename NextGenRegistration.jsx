import React, { useState, useMemo } from 'react';

// Domain options for NextGen Buildathon
const DOMAINS = [
  'Domain 1: NextGen — Building Tomorrow, Today',
  'Domain 2: Artificial Intelligence and Intelligent Systems',
  'Domain 3: IOT and Embedded System',
  'Domain 4: FinTech',
  'Domain 5: Sustainable innovation',
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

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/invite/nextgen-buildathon-2026';

// Official Terms & Conditions Sections
export const TERMS_CONDITIONS_SECTIONS = [
  {
    heading: '1. Event & Organizer Details',
    text: 'Event: NextGen Buildathon Chapter 2026 | Organizer: MindMesh (Student Club/Society)\nCollege: Vidyavardhaka College of Engineering | Location: Mysuru, Karnataka\nDates: 26th-27th November 2026 | Venue: Kempegowda Sports Complex, VVCE\nEmail: themindmeshvvce@gmail.com'
  },
  {
    heading: '2. Eligibility',
    text: 'Open to currently enrolled undergraduate and postgraduate college students, including engineering, BCA, MCA and other eligible degree programmes. Any year, branch or department may participate. Inter-college participation is allowed. Participants must be below 21 years of age.'
  },
  {
    heading: '3. Team Formation',
    text: 'Each team must have 2-4 members. A participant may belong to only one team. Team composition cannot be changed after registration; members cannot be added or removed. Each team shall nominate a Team Leader as its primary contact.'
  },
  {
    heading: '4. Registration',
    text: 'Registration opens 18th September 2026 and closes 18th October 2026. Registration is through the official NextGen Buildathon website. Initial registration is free; shortlisted teams may be required to pay the announced participation fee. Registration is complete only after official confirmation. Participants must provide accurate information.'
  },
  {
    heading: '5. Domain Selection',
    text: 'Teams must select an announced domain and develop their submission within it. Domain changes, if permitted, must be made within the announced deadline.'
  },
  {
    heading: '6. PPT/Idea Submission',
    text: 'Required PPT/idea materials must be submitted through the designated platform within the announced deadline. Format, slide limit, naming and required sections will be communicated officially. Late or incomplete submissions may not be evaluated.'
  },
  {
    heading: '7. Shortlisting',
    text: 'Submissions will be reviewed using the announced evaluation criteria. Shortlisted teams will be notified through official communication channels and must complete subsequent requirements within the stated deadlines.'
  },
  {
    heading: '8. Payment',
    text: 'Any fee applicable to shortlisted teams will be communicated with payment instructions and a deadline. Teams must retain transaction proof where requested. Refund and cancellation conditions will follow the official payment terms. Failure to complete required payment by the deadline may result in loss of participation eligibility.'
  },
  {
    heading: '9. Offline Hackathon',
    text: 'The offline hackathon will take place on 26th and 27th November 2026 at Kempegowda Sports Complex, VVCE, Mysuru. Participants must follow the reporting time, schedule and venue instructions and bring required personal equipment such as laptops and chargers unless otherwise specified.'
  },
  {
    heading: '10. Development Rules',
    text: 'Teams must follow all technical rules announced for the hackathon. Open-source libraries, APIs, datasets and AI-assisted tools may be used where permitted and must comply with applicable licenses and event rules.'
  },
  {
    heading: '11. Originality & Plagiarism',
    text: 'Submissions must represent the team\'s own work, subject to permitted third-party resources. Plagiarism, impersonation, unauthorized copying, misrepresentation and submission of another team\'s work are prohibited. Previously developed components must be disclosed where required.'
  },
  {
    heading: '12. Intellectual Property',
    text: 'Participants retain ownership of original intellectual property they create, subject to third-party rights and licenses. Participants must have the right to use all third-party materials. Organizers may showcase project names, descriptions, screenshots, photographs and demonstrations for event documentation or promotion where appropriate consent is provided.'
  },
  {
    heading: '13. Evaluation & Judging',
    text: 'Projects will be evaluated using criteria announced by the organizers and judges, which may include innovation, technical implementation, relevance, feasibility, presentation and impact. Teams may be required to present and demonstrate their project. Judges may ask questions.'
  },
  {
    heading: '14. Disqualification',
    text: 'A participant or team may be disqualified for false information, plagiarism, cheating, unauthorized access or manipulation, serious rule violations, harassment, deliberate disruption, failure to meet mandatory requirements or other conduct affecting fairness or safety. Violations may be identified at any stage.'
  },
  {
    heading: '15. Code of Conduct',
    text: 'Participants must behave respectfully toward organizers, judges, mentors, volunteers and other participants. Harassment, discrimination, threats, abusive conduct, vandalism and disruptive behaviour are prohibited. College and venue rules must also be followed. Any violation of the code of conduct will result in disqualification with immediate effect, and the organizers\' decision is final.'
  },
  {
    heading: '16. Safety & Responsibility',
    text: 'Participants are responsible for their belongings and equipment. Hardware and electrical equipment must be used safely. Participants must follow venue safety instructions and report safety concerns promptly. Travel and personal arrangements remain the participant\'s responsibility unless expressly provided by organizers.'
  },
  {
    heading: '17. Photography, Video & Media',
    text: 'Photography and video recording may occur during the event for documentation and promotional purposes. Participants may appear in event media. Where separate consent is required, an appropriate consent mechanism will be provided.'
  },
  {
    heading: '18. Privacy & Personal Data',
    text: 'Information collected during registration may be used for registration, communication, eligibility verification, shortlisting, payment verification, certificates and event administration. Handling of participant information will follow the event Privacy Policy.'
  },
  {
    heading: '19. Certificates & Prizes',
    text: 'Certificates will be issued to eligible participants according to the event policy. Prizes will be awarded subject to eligibility, verification and compliance with event rules. Prize details may be subject to official announcements and applicable sponsor or institutional conditions.'
  },
  {
    heading: '20. Event Changes / Cancellation',
    text: 'Organizers may make reasonable changes to schedules, venue, deadlines, judging or event arrangements when necessary. Significant changes will be communicated through official channels. In case of postponement or cancellation, applicable arrangements will be communicated separately.'
  },
  {
    heading: '21. Communication',
    text: 'Official communication may be sent through registered email, the official website and designated channels such as the event WhatsApp group. Team Leaders are responsible for receiving important information and communicating it to their teams. Participants must check official updates regularly.'
  },
  {
    heading: '22. Liability / Disclaimer',
    text: 'Participants are responsible for their belongings, devices, travel and equipment unless otherwise stated. Organizers are not responsible for interruptions caused by circumstances beyond reasonable control or third-party services. Nothing here excludes responsibilities that cannot legally be excluded.'
  },
  {
    heading: '23. Acceptance of Terms',
    text: 'By registering for NextGen Buildathon Chapter 2026, participants confirm that their information is accurate, have read and understood these Terms & Conditions and the Privacy Policy, and agree to follow official event rules and instructions.'
  }
];

// Official Privacy Policy Sections
export const PRIVACY_POLICY_SECTIONS = [
  {
    heading: 'Privacy Policy Overview (Last Updated: 13 Sep 2026)',
    text: 'We respect the privacy of all participants and are committed to protecting their personal information. This Privacy Policy explains what information we collect, how we use it, how we protect it, and the circumstances under which it may be shared.'
  },
  {
    heading: '1. Information We Collect',
    text: 'When participants register for or participate in the Next Gen Buildathon, we may collect: Full name, Email address, Phone number, College/institution name, Course, branch, or academic details, Team and registration details, Payment and transaction information (where applicable), and other information voluntarily provided during registration or participation.'
  },
  {
    heading: '2. How We Use Your Information',
    text: 'The collected information is utilized to: Process and manage participant registrations; Communicate important Buildathon information; Verify participant and team details; Shortlist participants or teams; Process registration fees or event payments; Provide event-related announcements, schedules, and instructions; Manage event operations; Improve organizer experience; and comply with applicable administrative or legal mandates.'
  },
  {
    heading: '3. Sharing of Information',
    text: 'We do not sell or rent participants\' personal information. Information may be shared strictly when necessary for conducting the Buildathon, such as with authorized event organizers, service providers, payment processors, hosting partners, or institutional partners involved in managing the event.'
  },
  {
    heading: '4. Data Security',
    text: 'We employ reasonable administrative, technical, and organizational measures to safeguard participants\' personal information against unauthorized access, loss, or disclosure. However, no transmission over the internet can be guaranteed 100% secure.'
  },
  {
    heading: '5. Data Retention',
    text: 'We retain participant records as long as reasonably necessary for registration, communication, event execution, record-keeping, and legal compliance.'
  },
  {
    heading: '6. Participant Rights',
    text: 'Participants may contact the Next Gen Buildathon organizers regarding their personal information to review, correct, or update inaccurate data.'
  },
  {
    heading: '7. Third-Party Services',
    text: 'Third-party tools used for hosting, analytics, communication, or payments process information subject to their respective terms and privacy standards.'
  },
  {
    heading: '8. Changes to This Privacy Policy',
    text: 'Updates may occur to reflect event operations. Notice of material changes will be announced on the event portal.'
  },
  {
    heading: '9. Contact Us',
    text: 'For questions or requests regarding your personal information, reach out to: themindmeshvvce@gmail.com'
  },
  {
    heading: '10. Participant Acknowledgement',
    text: 'By registering for or participating in the Next Gen Buildathon, participants acknowledge having read, understood, and consented to the collection, use, and handling of their information as outlined above.'
  }
];

// Helper to download PDF using jsPDF (dynamically imported or from window)
export const downloadDocumentPDF = async (docTitle, sections, filename) => {
  let jsPDF;
  if (typeof window !== 'undefined' && window.jspdf && window.jspdf.jsPDF) {
    jsPDF = window.jspdf.jsPDF;
  } else {
    const mod = await import('jspdf');
    jsPDF = mod.jsPDF || mod.default;
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const maxWidth = pageWidth - (margin * 2);
  let y = 36;

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 26, 'F');
  doc.setTextColor(249, 115, 22);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('NEXTGEN BUILDATHON CHAPTER 2026', margin, 11);
  doc.setTextColor(226, 232, 240);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Presented by MindMesh | Vidyavardhaka College of Engineering (VVCE), Mysuru', margin, 17);
  doc.setTextColor(249, 115, 22);
  doc.text(docTitle.toUpperCase(), margin, 23);

  doc.setTextColor(30, 41, 59);

  sections.forEach(sec => {
    if (y > pageHeight - 25) {
      doc.addPage();
      y = 20;
    }
    if (sec.heading) {
      doc.setFontSize(10.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(194, 65, 12);
      doc.text(sec.heading, margin, y);
      y += 5.5;
    }
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const lines = doc.splitTextToSize(sec.text, maxWidth);
    lines.forEach(line => {
      if (y > pageHeight - 15) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += 4.5;
    });
    y += 3.5;
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`NextGen Buildathon Chapter 2026 - Page ${i} of ${totalPages}`, margin, pageHeight - 8);
  }

  doc.save(filename);
};

export default function NextGenRegistration() {
  const [teamOverview, setTeamOverview] = useState({
    teamName: '',
    teamSize: 3, // 2, 3, or 4
    domain: '',
    state: '',
  });

  const [leader, setLeader] = useState({
    fullName: '',
    email: '',
    college: '',
    phone: '',
    semester: '',
  });

  const [members, setMembers] = useState([
    { id: 2, fullName: '', college: '', email: '', phone: '', semester: '' },
    { id: 3, fullName: '', college: '', email: '', phone: '', semester: '' },
    { id: 4, fullName: '', college: '', email: '', phone: '', semester: '' },
  ]);

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    declaration: false,
  });

  const [stateSearch, setStateSearch] = useState('');
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [modalDoc, setModalDoc] = useState(null); // 'terms' | 'privacy' | null
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const filteredStates = useMemo(() => {
    return STATES.filter(s => s.toLowerCase().includes(stateSearch.toLowerCase()));
  }, [stateSearch]);

  const isSubmitDisabled = !agreements.terms || !agreements.privacy || !agreements.declaration || status.submitting;
  const activeMembers = members.slice(0, teamOverview.teamSize - 1);

  const handleMemberChange = (id, field, value) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    try {
      // Simulate submission or post to Apps Script
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Trigger auto-download of documentation
      setTimeout(() => {
        downloadDocumentPDF('Terms & Conditions', TERMS_CONDITIONS_SECTIONS, 'NextGen_Buildathon_Terms_and_Conditions.pdf');
      }, 400);
      setTimeout(() => {
        downloadDocumentPDF('Privacy Policy', PRIVACY_POLICY_SECTIONS, 'NextGen_Buildathon_Privacy_Policy.pdf');
      }, 1200);

      setStatus({ submitting: false, success: true, error: '' });
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Montserrat',sans-serif] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Presented by The Mind Mesh
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            NextGen <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Buildathon</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Vidyavardhaka College of Engineering &bull; 26th-27th November 2026
          </p>
        </header>

        {status.success ? (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-12 text-center backdrop-blur-2xl shadow-2xl shadow-emerald-500/10 space-y-8">
            <div>
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl font-bold shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-500/10">
                ✓
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
                Registration Successful!
              </h2>
              <div className="inline-block px-4 py-2 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-sm font-semibold mb-4">
                Team: {teamOverview.teamName} &bull; {teamOverview.teamSize} Members
              </div>
              <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                You will be getting a formal confirmation mail through the team leader&apos;s registered email:
                <br />
                <span className="text-white font-semibold underline underline-offset-4 decoration-orange-500 mt-1 inline-block">
                  {leader.email}
                </span>
              </p>
            </div>

            {/* WhatsApp Block */}
            <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-emerald-950/60 border-2 border-emerald-500/50 rounded-2xl p-6 text-left shadow-xl shadow-emerald-500/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-emerald-500/30 shrink-0">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      Join Official WhatsApp Group
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono uppercase">
                        Mandatory
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Connect with organizers, mentors, and receive direct announcements &amp; schedule briefings.
                    </p>
                  </div>
                </div>
                <a
                  href={WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <span>Join WhatsApp Group</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>

            {/* Downloads */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 text-left">
              <h3 className="text-sm font-bold text-white mb-1">
                📥 Download Official Event Documentation
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Copies have been triggered for download automatically. Click below to re-download if needed:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => downloadDocumentPDF('Terms & Conditions', TERMS_CONDITIONS_SECTIONS, 'NextGen_Buildathon_Terms_and_Conditions.pdf')}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-orange-500 text-slate-200 transition"
                >
                  <div className="text-left">
                    <div className="text-xs font-semibold">Terms &amp; Conditions.pdf</div>
                    <div className="text-[10px] text-slate-400">Official rules &amp; guidelines</div>
                  </div>
                  <span className="text-orange-400 font-bold">&darr;</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadDocumentPDF('Privacy Policy', PRIVACY_POLICY_SECTIONS, 'NextGen_Buildathon_Privacy_Policy.pdf')}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-orange-500 text-slate-200 transition"
                >
                  <div className="text-left">
                    <div className="text-xs font-semibold">Privacy Policy.pdf</div>
                    <div className="text-[10px] text-slate-400">Data usage commitment</div>
                  </div>
                  <span className="text-orange-400 font-bold">&darr;</span>
                </button>
              </div>
            </div>

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
              className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition border border-slate-700"
            >
              Register Another Team
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Team & Project Overview */}
            <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Team &amp; Project Overview</h2>
                  <p className="text-xs text-slate-400">Establish your team identity, squad size, and innovation track</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Team Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={teamOverview.teamName}
                    onChange={(e) => setTeamOverview({ ...teamOverview, teamName: e.target.value })}
                    placeholder="e.g. CyberVanguard"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Team Size <span className="text-orange-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[2, 3, 4].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setTeamOverview({ ...teamOverview, teamSize: size })}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition flex flex-col items-center justify-center ${
                          teamOverview.teamSize === size
                            ? 'bg-orange-500/15 border-orange-500 text-orange-400 shadow-md shadow-orange-500/20 ring-1 ring-orange-500/50'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{size} Members</span>
                        <span className="text-[10px] opacity-70">
                          {size === 2 ? 'Leader + 1' : size === 3 ? 'Leader + 2' : 'Leader + 3'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Domain Chosen <span className="text-orange-500">*</span>
                  </label>
                  <select
                    required
                    value={teamOverview.domain}
                    onChange={(e) => setTeamOverview({ ...teamOverview, domain: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  >
                    <option value="" disabled>Select innovation domain</option>
                    {DOMAINS.map((d) => (
                      <option key={d} value={d} className="bg-slate-900 text-slate-200">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    State / Region <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={teamOverview.state}
                    onChange={(e) => setTeamOverview({ ...teamOverview, state: e.target.value })}
                    placeholder="e.g. Karnataka"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Team Leader Details */}
            <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
                  2
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Team Leader Details</h2>
                  <p className="text-xs text-slate-400">Primary contact for event correspondence and verification</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>

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
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    College / Institute Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={leader.college}
                    onChange={(e) => setLeader({ ...leader, college: e.target.value })}
                    placeholder="e.g. Vidyavardhaka College of Engineering"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>

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
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Semester <span className="text-orange-500">*</span>
                  </label>
                  <select
                    required
                    value={leader.semester}
                    onChange={(e) => setLeader({ ...leader, semester: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  >
                    <option value="" disabled>Select leader current semester</option>
                    {SEMESTERS.map((sem) => (
                      <option key={sem} value={sem} className="bg-slate-900 text-slate-200">
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Section 3: Dynamic Member Details */}
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
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl"
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
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      />
                    </div>

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
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      />
                    </div>

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
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      />
                    </div>

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
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Semester <span className="text-orange-500">*</span>
                      </label>
                      <select
                        required
                        value={member.semester}
                        onChange={(e) => handleMemberChange(member.id, 'semester', e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      >
                        <option value="" disabled>Select current semester</option>
                        {SEMESTERS.map((sem) => (
                          <option key={sem} value={sem} className="bg-slate-900 text-slate-200">
                            {sem}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Section 4: Agreements & Consent with Links & Downloads */}
            <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
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
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700/70 transition">
                  <div className="flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      id="termsBox"
                      checked={agreements.terms}
                      onChange={(e) => setAgreements({ ...agreements, terms: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500 accent-orange-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <label htmlFor="termsBox" className="text-xs sm:text-sm text-slate-300 leading-relaxed cursor-pointer block">
                        I agree to the <strong className="text-orange-400">Terms and Conditions</strong> of the NextGen Buildathon.
                      </label>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setModalDoc('terms')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-orange-500 text-orange-400 transition text-[11px] font-semibold cursor-pointer"
                        >
                          <span>👁️ View Full Terms</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadDocumentPDF('Terms & Conditions', TERMS_CONDITIONS_SECTIONS, 'NextGen_Buildathon_Terms_and_Conditions.pdf')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-400 transition text-[11px] font-semibold cursor-pointer"
                        >
                          <span>📥 Download Terms.pdf</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Privacy Policy */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700/70 transition">
                  <div className="flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      id="privacyBox"
                      checked={agreements.privacy}
                      onChange={(e) => setAgreements({ ...agreements, privacy: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500 accent-orange-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <label htmlFor="privacyBox" className="text-xs sm:text-sm text-slate-300 leading-relaxed cursor-pointer block">
                        I have read and acknowledge the <strong className="text-orange-400">Privacy Policy.pdf</strong>.
                      </label>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setModalDoc('privacy')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-orange-500 text-orange-400 transition text-[11px] font-semibold cursor-pointer"
                        >
                          <span>👁️ View Privacy Policy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadDocumentPDF('Privacy Policy', PRIVACY_POLICY_SECTIONS, 'NextGen_Buildathon_Privacy_Policy.pdf')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-400 transition text-[11px] font-semibold cursor-pointer"
                        >
                          <span>📥 Download Privacy Policy.pdf</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Declaration */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700/70 transition">
                  <div className="flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      id="declarationBox"
                      checked={agreements.declaration}
                      onChange={(e) => setAgreements({ ...agreements, declaration: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500 accent-orange-500 cursor-pointer"
                    />
                    <label htmlFor="declarationBox" className="text-xs sm:text-sm text-slate-300 leading-relaxed cursor-pointer block">
                      I hereby declare that the information provided by me is true and accurate to the best of my knowledge. I agree to abide by the rules, guidelines, and Terms &amp; Conditions of NextGen Buildathon and consent to the use of my submitted information for registration, communication, verification, and other event-related purposes.
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {status.error && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs sm:text-sm">
                ⚠️ {status.error}
              </div>
            )}

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
                  <span>Submitting Registration...</span>
                ) : (
                  <>
                    <span>Register Team &amp; Download Documentation</span>
                    <span className="text-lg">&rarr;</span>
                  </>
                )}
              </button>
              {isSubmitDisabled && (
                <p className="text-center text-[11px] text-slate-500 mt-2 font-medium">
                  * Please check all three agreement boxes above to enable registration.
                </p>
              )}
            </div>
          </form>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-slate-500 pb-8 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="tracking-wide">
            NextGen Buildathon &bull; Presented by <span className="text-slate-400 font-semibold">The Mind Mesh</span>
          </p>
          <a href="vanilla.html" className="text-slate-500 hover:text-orange-400 transition text-[11px]">
            Switch to Classic Form &rarr;
          </a>
        </footer>
      </div>

      {/* Modal Viewer */}
      {modalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalDoc('terms')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    modalDoc === 'terms'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Terms &amp; Conditions
                </button>
                <button
                  onClick={() => setModalDoc('privacy')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    modalDoc === 'privacy'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Privacy Policy
                </button>
              </div>
              <button
                onClick={() => setModalDoc(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {modalDoc === 'terms' ? (
                <>
                  <div className="text-center pb-4 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      NextGen Buildathon Chapter 2026
                    </h3>
                    <p className="text-xs text-orange-400 mt-0.5 font-semibold">Terms &amp; Conditions</p>
                  </div>
                  {TERMS_CONDITIONS_SECTIONS.map((sec, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="font-bold text-white text-xs uppercase tracking-wide text-orange-400">
                        {sec.heading}
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                        {sec.text}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="text-center pb-4 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      NextGen Buildathon
                    </h3>
                    <p className="text-xs text-orange-400 mt-0.5 font-semibold">Privacy Policy</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Last Updated: 13 Sep 2026</p>
                  </div>
                  {PRIVACY_POLICY_SECTIONS.map((sec, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="font-bold text-white text-xs uppercase tracking-wide text-orange-400">
                        {sec.heading}
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                        {sec.text}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
              <button
                type="button"
                onClick={() => {
                  if (modalDoc === 'terms') {
                    downloadDocumentPDF('Terms & Conditions', TERMS_CONDITIONS_SECTIONS, 'NextGen_Buildathon_Terms_and_Conditions.pdf');
                  } else {
                    downloadDocumentPDF('Privacy Policy', PRIVACY_POLICY_SECTIONS, 'NextGen_Buildathon_Privacy_Policy.pdf');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition flex items-center gap-1.5"
              >
                <span>📥 Download {modalDoc === 'terms' ? 'Terms.pdf' : 'Privacy.pdf'}</span>
              </button>
              <button
                onClick={() => setModalDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
