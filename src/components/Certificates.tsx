import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Eye, X, Calendar, BookOpen, GraduationCap, FileCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

interface CertMockup {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  description: string;
  skills: string[];
  type: 'safety' | 'academic';
  subTitle?: string;
}

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertMockup | null>(null);

  const certificates: CertMockup[] = [
    // Safety certifications
    ...CERTIFICATIONS.map(c => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      credentialId: c.credentialId || 'N/A',
      description: c.description,
      skills: c.skillsCovered,
      type: 'safety' as const
    })),
    // Academic transcripts from PDF
    {
      id: 'acad1',
      title: 'Bachelor of Science (BS)',
      subTitle: 'English Literature & Linguistics',
      issuer: 'University Of Peshawar',
      date: 'Jan 2022',
      credentialId: 'UOP-BS-201822',
      description: 'Awarded BS degree with distinction. Major modules on industrial communication, report drafting, rhetoric, and group training delivery.',
      skills: ['Technical Drafting', 'Workplace Briefings', 'Rhetoric Analysis', 'Communications'],
      type: 'academic'
    },
    {
      id: 'acad2',
      title: 'FSc Pre-Medical (HSSC)',
      subTitle: 'Medical & Health Sciences',
      issuer: 'Peshawar Model Degree College, Peshawar',
      date: 'Apr 2018',
      credentialId: 'BISEP-FSC-90511',
      description: 'Higher Secondary Certificate passed with grade A1. Academic courses in toxicology, organic chemistry, physiology, and pathology.',
      skills: ['Human Anatomy', 'Chemical Safety', 'Toxicology Basics', 'Hygiene Standards'],
      type: 'academic'
    },
    {
      id: 'acad3',
      title: 'Secondary School Certificate (Matric)',
      subTitle: 'Metric in Science',
      issuer: 'Government Higher Secondary School, Peshawar',
      date: 'March 2016',
      credentialId: 'BISEP-SSC-91711',
      description: 'Secondary Certificate passed with grade A1. Studied basic physics, organic chemistry, and safety protocols.',
      skills: ['Physical Sciences', 'Environmental Chemistry', 'Lab Safety Procedures'],
      type: 'academic'
    }
  ];

  return (
    <section id="credentials" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-wider text-amber-600 uppercase mb-2 flex items-center justify-center gap-2">
            <Award className="w-4 h-4" />
            <span>Verified Credentials Cabinet</span>
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            HSE Certifications & Academic Transcripts
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Haseen Ullah is fully certified to operate on high-risk sites. Click on any certificate card below to view a high-fidelity digital replica.
          </p>
        </div>

        {/* Categories split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Professional HSE Credentials */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h4 className="text-lg font-bold text-slate-900 font-sans">HSE Professional Certifications</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.filter(c => c.type === 'safety').map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-white border border-slate-200 hover:border-amber-500 rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="bg-amber-50 text-amber-600 p-2 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      <Award className="w-5 h-5" />
                    </div>
                    <h5 className="font-sans font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-700 transition-colors">
                      {cert.title}
                    </h5>
                    <p className="text-slate-500 text-[11px] font-mono">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
                    <span className="text-[10px] text-slate-400 font-mono">{cert.date}</span>
                    <span className="text-amber-600 text-xs font-semibold flex items-center gap-1">
                      <span>View Credential</span>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Degrees from CV */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              <h4 className="text-lg font-bold text-slate-900 font-sans">Academic Degrees & Science Transcripts</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.filter(c => c.type === 'academic').map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-white border border-slate-200 hover:border-amber-500 rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="bg-slate-50 text-slate-600 p-2 rounded-lg w-10 h-10 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-sans font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-700 transition-colors">
                        {cert.title}
                      </h5>
                      {cert.subTitle && (
                        <p className="text-slate-600 font-semibold text-xs mt-0.5">{cert.subTitle}</p>
                      )}
                    </div>
                    <p className="text-slate-500 text-[11px] font-mono">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
                    <span className="text-[10px] text-slate-400 font-mono">{cert.date}</span>
                    <span className="text-amber-600 text-xs font-semibold flex items-center gap-1">
                      <span>View Transcript</span>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Certificate high-fidelity modal view */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 text-white border border-slate-700 p-1 rounded-2xl w-full max-w-2xl relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-full z-30 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Certificate Inner Canvas */}
              <div className="bg-white text-slate-950 p-8 sm:p-12 rounded-xl relative overflow-hidden">
                {/* Vintage Double Border */}
                <div className="absolute inset-4 border-4 border-amber-600 rounded"></div>
                <div className="absolute inset-5 border border-dashed border-amber-500 rounded"></div>
                
                {/* Background Watermark icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                  <Award className="w-80 h-80 text-amber-900" />
                </div>

                <div className="relative z-10 space-y-6 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-full text-amber-600">
                      <Award className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-widest block">Official Credentials Audit</span>
                    <h4 className="font-serif font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-wide">
                      {selectedCert.type === 'safety' ? 'CERTIFICATE OF COMPETENCY' : 'ACADEMIC DEGREE AWARD'}
                    </h4>
                  </div>

                  <p className="text-xs font-serif text-slate-500 italic">This is proudly presented and verified to:</p>
                  
                  <div className="space-y-1">
                    <h3 className="font-serif font-extrabold text-2xl text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-8">
                      HASEEN ULLAH
                    </h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono pt-1">HSE SAFETY SPECIALIST</p>
                  </div>

                  <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                    Who has successfully satisfied all course modules, passed critical regulatory examinations, and demonstrated outstanding competency in the program:
                  </p>

                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg max-w-lg mx-auto">
                    <h5 className="font-sans font-bold text-slate-900 text-sm">
                      {selectedCert.title}
                    </h5>
                    {selectedCert.subTitle && (
                      <p className="text-slate-600 font-bold text-xs mt-0.5">{selectedCert.subTitle}</p>
                    )}
                    <p className="text-slate-500 text-[10px] font-mono mt-1">Verified and Issued by: {selectedCert.issuer}</p>
                  </div>

                  {/* Skills tags covered */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block tracking-wider">Endorsed Technical Capabilities:</span>
                    <div className="flex flex-wrap justify-center gap-1.5 max-w-md mx-auto">
                      {selectedCert.skills.map((skill, i) => (
                        <span key={i} className="bg-amber-50 text-amber-800 text-[9px] font-mono px-2 py-0.5 rounded border border-amber-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Seal & Signatures */}
                  <div className="grid grid-cols-3 gap-6 items-center pt-8 border-t border-slate-100 max-w-lg mx-auto">
                    {/* Left: Serial Date */}
                    <div className="text-left">
                      <p className="text-[9px] font-mono text-slate-400 uppercase">Issue Date</p>
                      <p className="text-xs font-bold text-slate-800 font-mono">{selectedCert.date}</p>
                    </div>

                    {/* Middle: Golden Seal SVG */}
                    <div className="flex justify-center">
                      <div className="relative w-14 h-14 bg-amber-500 rounded-full border-2 border-amber-600 flex items-center justify-center shadow-lg relative shrink-0">
                        <div className="absolute inset-1 border border-dashed border-amber-300 rounded-full"></div>
                        <ShieldCheck className="w-6 h-6 text-slate-950 relative z-10" />
                        {/* Ribbons */}
                        <div className="absolute -bottom-3 left-2 w-3 h-6 bg-amber-600 transform -rotate-12 rounded-b z-0"></div>
                        <div className="absolute -bottom-3 right-2 w-3 h-6 bg-amber-600 transform rotate-12 rounded-b z-0"></div>
                      </div>
                    </div>

                    {/* Right: ID code */}
                    <div className="text-right">
                      <p className="text-[9px] font-mono text-slate-400 uppercase">License ID</p>
                      <p className="text-xs font-bold text-amber-800 font-mono block truncate">{selectedCert.credentialId}</p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
