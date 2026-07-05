import { useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import HazardSimulator from './components/HazardSimulator';
import Certificates from './components/Certificates';
import ContactDesk from './components/ContactDesk';
import { ShieldAlert, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Shield } from 'lucide-react';
import { PERSONAL_INFO } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('about');

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Header and Hero Banner */}
      <Header onNavClick={handleNavClick} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Professional Summary, Stats & Skills */}
        <div id="about">
          <About onNavClick={handleNavClick} />
        </div>

        {/* Work History and Education Timeline */}
        <div id="experience">
          <Experience />
        </div>

        {/* Interactive Hazard Site Assessment Simulator */}
        <div id="simulator">
          <HazardSimulator />
        </div>

        {/* Digital Credentials Cabinet */}
        <div id="credentials">
          <Certificates />
        </div>

        {/* Interactive Contact & Dispatch Desk */}
        <div id="contact">
          <ContactDesk />
        </div>

      </main>

      {/* Corporate Professional Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-900 pb-8 mb-8">
            
            {/* Left Brand Area */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-amber-500 p-2 rounded-lg text-slate-950 shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-sans font-bold text-base text-white tracking-tight block">HASEEN ULLAH</span>
                  <span className="font-mono text-[9px] text-amber-500 tracking-wider uppercase">Lead Safety Officer</span>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Certified Health, Safety, and Environment (HSE) professional dedicated to risk containment, site safety compliance, and translating standards into life-saving workplace protocols.
              </p>

              <div className="text-xs text-slate-500 font-mono">
                <span>Verified ID: {PERSONAL_INFO.socials.safetyRegister}</span>
              </div>
            </div>

            {/* Middle Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-2 text-xs">
                {['about', 'experience', 'simulator', 'credentials', 'contact'].map((sect) => (
                  <li key={sect}>
                    <button
                      onClick={() => handleNavClick(sect)}
                      className="hover:text-amber-400 transition-colors capitalize text-left cursor-pointer"
                    >
                      {sect === 'about' ? 'Professional Overview' : sect === 'simulator' ? 'Hazard Calculator' : sect}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Standard Regulations Panel */}
            <div className="md:col-span-4 space-y-3 bg-slate-900/50 p-5 rounded-xl border border-slate-900">
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>HSE Regulatory Alignment</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                All training methodologies, risk calculation multipliers, and safety audit frameworks presented in this portfolio strictly conform to standard OSHA Code of Federal Regulations (CFR 1926/1910) and ISO 45001 (Occupational Health & Safety) systems.
              </p>
              <div className="flex gap-2 text-[10px] text-amber-500 font-mono">
                <span>• OSHA CFR 1926</span>
                <span>• ISO 45001</span>
                <span>• NEBOSH IGC</span>
              </div>
            </div>

          </div>

          {/* Copyright, Location Details */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono">
            <div>
              <span>© {new Date().getFullYear()} Haseen Ullah. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Peshawar, KP, Pakistan</span>
              </span>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-amber-400 transition-colors">
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

