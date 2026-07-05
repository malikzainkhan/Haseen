import { motion } from 'motion/react';
import { Shield, Users, ClipboardCheck, Clock, Award, CheckCircle2, FileText, Activity } from 'lucide-react';
import { PERSONAL_INFO, SAFETY_STATS, TECHNICAL_SKILLS, SAFETY_MINDSET_QUOTES } from '../data';

interface AboutProps {
  onNavClick: (sectionId: string) => void;
}

export default function About({ onNavClick }: AboutProps) {
  // Map icons to the corresponding safety stats for high-fidelity representation
  const getStatIcon = (label: string) => {
    if (label.includes('LTI')) return <Clock className="w-6 h-6 text-amber-500" />;
    if (label.includes('Audits')) return <ClipboardCheck className="w-6 h-6 text-amber-500" />;
    if (label.includes('Workers')) return <Users className="w-6 h-6 text-amber-500" />;
    return <Shield className="w-6 h-6 text-amber-500" />;
  };

  return (
    <section id="about" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statistics Panels - Bento Grid style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SAFETY_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl font-extrabold font-mono text-slate-900 tracking-tight block">
                  {stat.value}
                </span>
                <div className="bg-amber-50 p-2 rounded-lg group-hover:bg-amber-100 transition-colors">
                  {getStatIcon(stat.label)}
                </div>
              </div>

              <h3 className="font-sans font-bold text-sm text-slate-800 mb-1">{stat.label}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Professional Bio & Skills Dual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: HSE Bio & Unique Assets */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xs font-mono font-bold tracking-wider text-amber-600 uppercase mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Professional Profile Summary</span>
              </h2>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
                Enforcing safety through vigilant observation & precise communication
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Strategic Background Synthesis Box (Science + Communications for HSE) */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h4 className="font-sans font-bold text-amber-900 text-base mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-600" />
                <span>The Dual-Engine Advantage for HSE Compliance</span>
              </h4>
              <p className="text-amber-800 text-xs leading-relaxed mb-4">
                Rather than standard engineering metrics alone, my professional competence is powered by two specialized academic disciplines:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-amber-100 p-4 rounded-lg shadow-sm">
                  <span className="font-mono text-[10px] font-bold text-amber-600 uppercase block mb-1">1. FSc Pre-Medical Foundation</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Direct academic study of human physiology, toxins, chemical hazards, and first-aid bioscience. This enables deep authority in industrial hygiene, ergonomics, and emergency medical triage.
                  </p>
                </div>
                <div className="bg-white border border-amber-100 p-4 rounded-lg shadow-sm">
                  <span className="font-mono text-[10px] font-bold text-amber-600 uppercase block mb-1">2. BS Linguistics Mastery</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Expertise in technical drafting and high-stakes audience briefings. This translates to absolute clarity in toolbox talks, flawless accident incident reporting, and easy-to-follow safety procedures.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values / Commitments Checklist */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-slate-800 text-sm">Primary Compliance Commitments:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Daily field surveys & perimeter threat audits',
                  '100% Personal Protective Equipment (PPE) enforcement',
                  'Rigorous Lock-Out / Tag-Out (LOTO) protocols',
                  'Incident analysis via root cause investigation (RCA)',
                  'Permit to Work (PTW) checks & verification',
                  'Liaising with regulatory inspectors and engineers'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive HSE Competencies Section */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="font-sans font-bold text-lg text-slate-900 mb-1">HSE Technical Competencies</h3>
            <p className="text-xs text-slate-500 mb-6">Quantifiable evaluation across critical safety operation spheres.</p>
            
            <div className="space-y-6">
              {TECHNICAL_SKILLS.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{skill.name}</span>
                    <span className="font-mono text-amber-600 font-bold">{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-slate-400">
                    <span>Scope: Field Operations</span>
                    <span>Category: {skill.category}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety Quote Carousel / Callout */}
            <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 p-4 rounded-lg">
              <span className="font-mono text-[9px] text-amber-600 font-bold block mb-1.5 uppercase">HSE Philosophy</span>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "{SAFETY_MINDSET_QUOTES[0]}"
              </p>
              <div className="flex items-center gap-2 mt-3 justify-end text-[10px] text-slate-500 font-bold">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>Haseen Ullah, Safety Creed</span>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="mt-6">
              <button
                onClick={() => onNavClick('simulator')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 px-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Test HSE Audit Simulator</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
