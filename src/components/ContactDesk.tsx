import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Copy, Check, Send, AlertTriangle, ClipboardCheck, Terminal, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface LogItem {
  id: string;
  timestamp: string;
  type: 'consulting' | 'hazard';
  title: string;
  details: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function ContactDesk() {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | 'loc' | null>(null);
  const [activeForm, setActiveForm] = useState<'consulting' | 'hazard'>('consulting');

  // Local state holding the "active incident desk logs"
  const [logs, setLogs] = useState<LogItem[]>([
    {
      id: 'log_1',
      timestamp: '07/05/2026 04:12 AM',
      type: 'hazard',
      title: 'Scaffold structural displacement',
      details: 'Slight vibration observed on Anchor Lock B at West Building Site.',
      status: 'AUDITED • MONITORED',
      priority: 'medium'
    },
    {
      id: 'log_2',
      timestamp: '07/05/2026 05:40 AM',
      type: 'consulting',
      title: 'Structural Evacuation Consulting Request',
      details: 'Audit requested for Peshawar Commercial Center facilities (6 Floors).',
      status: 'QUOTE ISSUED • ASSIGNED',
      priority: 'high'
    }
  ]);

  // Form states
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [consultType, setConsultType] = useState('Safety Audit & Site Inspection');
  const [consultDetails, setConsultDetails] = useState('');

  const [hazardName, setHazardName] = useState('');
  const [hazardLocation, setHazardLocation] = useState('');
  const [hazardPriority, setHazardPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [hazardDetails, setHazardDetails] = useState('');

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone' | 'loc') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'critical': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getLogTypeBadge = (t: string) => {
    if (t === 'hazard') return 'bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded';
    return 'bg-blue-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded';
  };

  const handleConsultSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !consultDetails) return;

    const newLog: LogItem = {
      id: 'log_' + Date.now(),
      timestamp: new Date().toLocaleString(),
      type: 'consulting',
      title: `${consultType} - Req by ${clientName}`,
      details: `Client Contact: ${clientContact || 'N/A'}. Details: ${consultDetails}`,
      status: 'REGISTERED • ROUTED TO HASEEN ULLAH',
      priority: 'high'
    };

    setLogs(prev => [newLog, ...prev]);
    setSuccessMsg('Your consulting request has been filed in Haseen\'s active dispatch terminal.');
    
    // Clear Form
    setClientName('');
    setClientContact('');
    setConsultDetails('');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleHazardSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hazardName || !hazardDetails) return;

    const newLog: LogItem = {
      id: 'log_' + Date.now(),
      timestamp: new Date().toLocaleString(),
      type: 'hazard',
      title: `${hazardName} at [${hazardLocation || 'Unspecified Location'}]`,
      details: hazardDetails,
      status: 'PENDING INSPECTION BY HSE DEPT',
      priority: hazardPriority
    };

    setLogs(prev => [newLog, ...prev]);
    setSuccessMsg('hazard threat reported successfully to Haseen\'s control terminal.');

    // Clear Form
    setHazardName('');
    setHazardLocation('');
    setHazardDetails('');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <section id="contact" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-wider text-amber-600 uppercase mb-2 flex items-center justify-center gap-2">
            <ClipboardCheck className="w-4 h-4" />
            <span>Operational Control Desk</span>
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            HSE Dispatch Terminal & Contact Gateway
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Directly connect with Haseen Ullah for corporate consultation, professional site audits, emergency drill planning, or chemical safety assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Direct Contact Details & copy buttons */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-950 shadow-md space-y-6">
              <h4 className="font-sans font-extrabold text-base border-b border-slate-800 pb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Duty Contacts</span>
              </h4>

              {/* Email direct copy */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-wide">
                  <span>HSE Email (Primary)</span>
                  <span>Direct Duty</span>
                </div>
                <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-2.5 items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-200 truncate">{PERSONAL_INFO.email}</span>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                    className="text-slate-400 hover:text-amber-500 p-1 rounded hover:bg-slate-900 transition-all cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone copy */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-wide">
                  <span>Emergency Line</span>
                  <span>Active Callout</span>
                </div>
                <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-2.5 items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-200">{PERSONAL_INFO.phone}</span>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                    className="text-slate-400 hover:text-amber-500 p-1 rounded hover:bg-slate-900 transition-all cursor-pointer"
                    title="Copy Telephone"
                  >
                    {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location copy */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-wide">
                  <span>Location Base</span>
                  <span>HQ Territory</span>
                </div>
                <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-2.5 items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-200 truncate">Peshawar, KP, PK</span>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.location, 'loc')}
                    className="text-slate-400 hover:text-amber-500 p-1 rounded hover:bg-slate-900 transition-all cursor-pointer"
                    title="Copy Location"
                  >
                    {copiedType === 'loc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Verified Badge details */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
                <Terminal className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-[10px] text-slate-500 font-mono uppercase font-bold">Duty Register ID</p>
                  <p className="text-xs text-white font-bold font-mono">{PERSONAL_INFO.socials.safetyRegister}</p>
                </div>
              </div>
            </div>

            {/* Quick Consultation Quote calculation card */}
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl">
              <h5 className="font-sans font-bold text-slate-900 text-sm mb-1.5">Consultation Response SLA</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                As a standard professional policy, all emergency hazard reports and high-priority civil consulting inquiries receive a direct communication response within **2 hours of submission**. 
              </p>
              <div className="flex items-center gap-2 mt-3 text-[11px] font-mono text-amber-800 font-bold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                <span>DESK DISPATCH ACTIVE NOW</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Form tabs and live logs dashboard */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Form Switcher */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-xs">
              <div className="flex border-b border-slate-200 pb-3 mb-5 gap-3">
                <button
                  onClick={() => { setActiveForm('consulting'); setSuccessMsg(null); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeForm === 'consulting'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  Request Consultation Quote
                </button>
                <button
                  onClick={() => { setActiveForm('hazard'); setSuccessMsg(null); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeForm === 'hazard'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  File Incident/Hazard Report
                </button>
              </div>

              {/* Alert success banner */}
              <AnimatePresence>
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-lg mb-5 font-semibold flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form rendering */}
              <AnimatePresence mode="wait">
                {activeForm === 'consulting' ? (
                  <motion.form
                    key="consult-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleConsultSubmit}
                    className="space-y-4 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-700 text-xs font-semibold block">Your Name / Organization</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Indus Construction Group"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-700 text-xs font-semibold block">Contact Email or Phone</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. safety@indus.com"
                          value={clientContact}
                          onChange={(e) => setClientContact(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 text-xs font-semibold block">Safety Consulting Category</label>
                      <select
                        value={consultType}
                        onChange={(e) => setConsultType(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option value="Safety Audit & Site Inspection">Weekly Civil Safety Audit & Inspection</option>
                        <option value="Toolbox Talks (TBT) & Staff Induction">OSHA 10/30 Standard Toolbox Induction</option>
                        <option value="Emergency Response & Fire Safety Drill planning">Emergency Escape & Fire Safety Planning</option>
                        <option value="Industrial Hygiene & Chemical MSDS Survey">Industrial Hygiene & Chemical Hazmat Audits</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 text-xs font-semibold block">Project Scope & Location Details</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Please describe your active workforce, facility parameters, location, and desired safety objectives..."
                        value={consultDetails}
                        onChange={(e) => setConsultDetails(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase"
                    >
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Dispatch Consulting Request</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="hazard-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleHazardSubmit}
                    className="space-y-4 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-700 text-xs font-semibold block">Observed Hazard Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Unlocked scaffold platform"
                          value={hazardName}
                          onChange={(e) => setHazardName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-700 text-xs font-semibold block">Specific Site Location</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. North-East Storage Yard, Bay 3"
                          value={hazardLocation}
                          onChange={(e) => setHazardLocation(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 text-xs font-semibold block">Assessed Urgent Priority</label>
                      <select
                        value={hazardPriority}
                        onChange={(e) => setHazardPriority(e.target.value as any)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option value="low">Low Risk (General Site Tidyup)</option>
                        <option value="medium">Medium Risk (Mitigate within 24 Hours)</option>
                        <option value="high">High Risk (Urgent Site Threat)</option>
                        <option value="critical">CRITICAL THREAT (Imminent Threat to Life - STOP WORK)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 text-xs font-semibold block">Hazard Physical Details & Risks</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Describe the physical elements, what PPE or safety locks are missing, and any immediate hazard concerns..."
                        value={hazardDetails}
                        onChange={(e) => setHazardDetails(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase"
                    >
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Transmit Safe Site Incident Report</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* HSE Command Terminal Active Log list */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl shadow-inner text-left">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
                <h5 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-500" />
                  <span>HSE DISPATCH AUDIT LOG ({logs.length})</span>
                </h5>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold animate-pulse">
                  ONLINE TRANSMISSION
                </span>
              </div>

              <div className="space-y-3.5 max-h-[190px] overflow-y-auto pr-1 custom-scrollbar">
                {logs.map((log) => (
                  <div key={log.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={getLogTypeBadge(log.type)}>
                          {log.type === 'hazard' ? 'HAZARD REPORT' : 'CONSULTING REQ'}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500">{log.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] uppercase font-mono font-bold border px-2 py-0.5 rounded ${getPriorityBadge(log.priority)}`}>
                          {log.priority}
                        </span>
                        <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                          {log.status}
                        </span>
                      </div>
                    </div>

                    <p className="font-mono font-bold text-xs text-white leading-tight mb-1">{log.title}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{log.details}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
