import { motion } from 'motion/react';
import { Shield, ShieldCheck, Mail, Phone, MapPin, Award, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavClick, activeSection }: HeaderProps) {
  const safetyAvatar = "/src/assets/images/safety_officer_avatar_1783258848009.jpg";
  const safetyHero = "/src/assets/images/safety_hero_1783258826428.jpg";

  const navItems = [
    { id: 'about', label: 'Overview' },
    { id: 'experience', label: 'HSE Career Timeline' },
    { id: 'simulator', label: 'Hazard Assessment Desk' },
    { id: 'credentials', label: 'Certifications' },
    { id: 'contact', label: 'Contact & Consulting' },
  ];

  return (
    <header className="relative w-full border-b border-slate-200 bg-white shadow-sm">
      {/* Top micro-bar with safety notice */}
      <div className="bg-amber-500 text-slate-900 text-xs py-2 px-4 font-mono font-medium flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 animate-pulse text-slate-950" />
          <span>OFFICIAL HSE PORTFOLIO • CERTIFIED SAFETY INSPECTOR</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span>OSHA Standard 1926 & ISO 45001 Compliant</span>
          <span>ID: {PERSONAL_INFO.socials.safetyRegister}</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavClick('about')}>
            <div className="bg-amber-500 p-2 rounded-lg text-slate-900 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-bold text-lg text-slate-900 tracking-tight block leading-none">HASEEN ULLAH</span>
              <span className="font-mono text-[10px] text-slate-500 tracking-wider">HSE PROFESSIONAL</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-amber-50 text-amber-800 font-semibold border-b-2 border-amber-500 rounded-b-none'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavClick('contact')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-md transition-all shadow-md flex items-center gap-2 border border-slate-800"
            >
              <span>Consultation Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative bg-slate-950 text-white overflow-hidden py-16 lg:py-24">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={safetyHero}
            alt="Safety Hero Banner"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-mono"
            >
              <Award className="w-3.5 h-3.5" />
              <span>NEBOSH IGC & OSHA-30 Certified Safety Officer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none"
            >
              Zero Incidents. <span className="text-amber-400">Total Compliance.</span> Safeguarding Every Life & Asset.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Hi, I'm <strong className="text-white">Haseen Ullah</strong>. I combine deep medical foundation awareness with precision HSE reporting and communication skills to lead safety programs that protect lives, enforce ISO 45001 compliance, and nurture a zero-harm site culture.
            </motion.p>

            {/* Quick Contact Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-lg hover:border-slate-700 transition-all">
                <div className="bg-amber-500/10 p-2 rounded-md text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Email Direct</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs text-slate-200 font-semibold hover:text-amber-400 block truncate">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-lg hover:border-slate-700 transition-all">
                <div className="bg-amber-500/10 p-2 rounded-md text-amber-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Duty Call</p>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs text-slate-200 font-semibold hover:text-amber-400 block">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-lg hover:border-slate-700 transition-all">
                <div className="bg-amber-500/10 p-2 rounded-md text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Location Base</p>
                  <span className="text-xs text-slate-200 font-semibold block truncate">
                    Peshawar, PK
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              <button
                onClick={() => onNavClick('simulator')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg transition-all shadow-lg flex items-center gap-2 text-sm"
              >
                <span>Launch Hazard Simulator</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavClick('experience')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-lg transition-all border border-slate-700 flex items-center gap-2 text-sm"
              >
                <span>Explore HSE Timeline</span>
              </button>
            </motion.div>
          </div>

          {/* Profile Photo / Avatar Column */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>

              {/* Main Avatar Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800 shadow-2xl flex items-center justify-center">
                <img
                  src={safetyAvatar}
                  alt="Haseen Ullah Safety Officer Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Verified badge badge */}
              <div className="absolute bottom-4 right-4 bg-slate-900 border-2 border-amber-500 text-amber-400 p-2.5 rounded-full shadow-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 animate-bounce" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
