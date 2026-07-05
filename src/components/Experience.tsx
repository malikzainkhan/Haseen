import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, CheckSquare, Activity, FileText } from 'lucide-react';
import { WORK_EXPERIENCES, EDUCATION_BACKGROUND } from '../data';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  return (
    <section id="experience" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-wider text-amber-600 uppercase mb-2 flex items-center justify-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>Interactive Credentials Ledger</span>
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            Professional Experience & Scientific Foundations
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Explore Haseen Ullah's career as an HSE officer and the academic pathways that support his safety execution.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center mt-8">
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 border border-slate-200 shadow-inner">
              <button
                onClick={() => setActiveTab('work')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'work'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4 text-amber-500" />
                <span>Work Experience</span>
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'education'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>Education History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Content Display */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'work' ? (
              <motion.div
                key="work-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {WORK_EXPERIENCES.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-8 md:pl-12 border-l-2 border-slate-200 pb-2 last:border-b-0">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-[17px] top-0 bg-slate-900 border-4 border-amber-500 rounded-full p-1.5 text-white z-10 shadow-md">
                      <Briefcase className="w-4 h-4 text-amber-400" />
                    </div>

                    {/* Metadata Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          <span>{exp.role}</span>
                          <span className="hidden sm:inline bg-amber-100 text-amber-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase">
                            HSE
                          </span>
                        </h4>
                        <p className="text-sm font-semibold text-slate-700 mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500">
                        <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Core Responsibilities */}
                    <div className="space-y-3 text-sm text-slate-600 mb-5 leading-relaxed">
                      {exp.description.map((desc, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckSquare className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Safety Milestones & Metrics Container */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 h-full w-2 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                      <h5 className="font-sans font-bold text-slate-900 text-xs mb-3 flex items-center gap-2 uppercase tracking-wide">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Key Milestones & Safety Impact</span>
                      </h5>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></span>
                            <span className="leading-normal">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="education-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {EDUCATION_BACKGROUND.map((edu, idx) => (
                  <div key={edu.id} className="relative pl-8 md:pl-12 border-l-2 border-slate-200 pb-2">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-[17px] top-0 bg-slate-900 border-4 border-amber-500 rounded-full p-1.5 text-white z-10 shadow-md">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                    </div>

                    {/* Metadata Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">
                          {edu.degree}
                        </h4>
                        <p className="text-sm font-semibold text-slate-700 mt-0.5">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500">
                        <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{edu.period}</span>
                        </span>
                        {edu.gpaOrMarks && (
                          <span className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-md">
                            <Award className="w-3.5 h-3.5 text-amber-600" />
                            <span>{edu.gpaOrMarks}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Core Details */}
                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      {edu.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Custom HSE Relevance Box (synthesizing educational facts to Safety) */}
                    {edu.relevance && (
                      <div className="bg-amber-50/50 border border-dashed border-amber-200 rounded-xl p-4 flex gap-3 items-start">
                        <Activity className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-amber-900 mb-1">HSE Application & Competency Relevance</p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {edu.relevance}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
