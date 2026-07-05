import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Calculator, FileCheck, Info, RefreshCw, PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { SAMPLE_HAZARDS } from '../data';
import { Hazard } from '../types';

export default function HazardSimulator() {
  const [hazards, setHazards] = useState<Array<Hazard & { customLikelihood: number; customSeverity: number; status: 'identified' | 'resolved' }>>(() => 
    SAMPLE_HAZARDS.map(h => ({
      ...h,
      customLikelihood: h.defaultLikelihood,
      customSeverity: h.defaultSeverity,
      status: 'identified'
    }))
  );

  const [selectedHazardId, setSelectedHazardId] = useState<string>(SAMPLE_HAZARDS[0].id);
  const [coSignName, setCoSignName] = useState<string>('');
  const [certificateIssued, setCertificateIssued] = useState<boolean>(false);

  // Form for adding custom hazard
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHazardName, setNewHazardName] = useState('');
  const [newHazardDesc, setNewHazardDesc] = useState('');
  const [newHazardCat, setNewHazardCat] = useState<'physical' | 'electrical' | 'chemical' | 'ergonomic'>('physical');
  const [newHazardLikelihood, setNewHazardLikelihood] = useState(3);
  const [newHazardSeverity, setNewHazardSeverity] = useState(3);
  const [newHazardRemediation, setNewHazardRemediation] = useState('');

  // Find the currently selected hazard details
  const selectedHazard = useMemo(() => {
    return hazards.find(h => h.id === selectedHazardId) || hazards[0];
  }, [hazards, selectedHazardId]);

  // Calculate overall Site Safety compliance percentage
  const safetyMetrics = useMemo(() => {
    const total = hazards.length;
    const resolvedCount = hazards.filter(h => h.status === 'resolved').length;
    const percentage = total > 0 ? Math.round((resolvedCount / total) * 100) : 100;
    
    // Average current risk score
    const avgRisk = total > 0 
      ? (hazards.reduce((acc, curr) => {
          return acc + (curr.status === 'resolved' ? 1 : curr.customLikelihood * curr.customSeverity);
        }, 0) / total).toFixed(1)
      : '0';

    return { percentage, resolvedCount, total, avgRisk };
  }, [hazards]);

  // Modify Likelihood & Severity for the selected hazard
  const updateMatrixValues = (likelihood: number, severity: number) => {
    setHazards(prev => prev.map(h => {
      if (h.id === selectedHazardId) {
        return { ...h, customLikelihood: likelihood, customSeverity: severity, status: h.status === 'resolved' ? 'identified' : h.status };
      }
      return h;
    }));
  };

  // Implement correct hazard remedy
  const resolveHazard = (id: string) => {
    setHazards(prev => prev.map(h => {
      if (h.id === id) {
        return { ...h, status: 'resolved' };
      }
      return h;
    }));
  };

  // Reset simulator
  const resetSimulator = () => {
    setHazards(SAMPLE_HAZARDS.map(h => ({
      ...h,
      customLikelihood: h.defaultLikelihood,
      customSeverity: h.defaultSeverity,
      status: 'identified'
    })));
    setSelectedHazardId(SAMPLE_HAZARDS[0].id);
    setCoSignName('');
    setCertificateIssued(false);
    setShowAddForm(false);
  };

  // Handle adding custom hazard
  const handleAddHazard = (e: FormEvent) => {
    e.preventDefault();
    if (!newHazardName || !newHazardDesc || !newHazardRemediation) return;

    const newH: Hazard & { customLikelihood: number; customSeverity: number; status: 'identified' | 'resolved' } = {
      id: 'custom_' + Date.now(),
      name: newHazardName,
      category: newHazardCat,
      description: newHazardDesc,
      defaultLikelihood: newHazardLikelihood,
      defaultSeverity: newHazardSeverity,
      remediation: newHazardRemediation,
      imageIcon: 'ShieldAlert',
      customLikelihood: newHazardLikelihood,
      customSeverity: newHazardSeverity,
      status: 'identified'
    };

    setHazards(prev => [...prev, newH]);
    setSelectedHazardId(newH.id);
    
    // Clear form
    setNewHazardName('');
    setNewHazardDesc('');
    setNewHazardRemediation('');
    setNewHazardLikelihood(3);
    setNewHazardSeverity(3);
    setShowAddForm(false);
  };

  const deleteHazard = (id: string) => {
    const updated = hazards.filter(h => h.id !== id);
    setHazards(updated);
    if (selectedHazardId === id && updated.length > 0) {
      setSelectedHazardId(updated[0].id);
    }
  };

  // Helper to determine risk classification
  const getRiskClassification = (score: number, status: string) => {
    if (status === 'resolved') return { label: 'Negligible (Safe)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', badgeColor: 'bg-emerald-500' };
    if (score >= 15) return { label: 'High Risk (Stop Work)', color: 'text-rose-600 bg-rose-50 border-rose-200', badgeColor: 'bg-rose-600' };
    if (score >= 5) return { label: 'Medium Risk (Mitigate)', color: 'text-amber-600 bg-amber-50 border-amber-200', badgeColor: 'bg-amber-500' };
    return { label: 'Low Risk (Vigilant)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', badgeColor: 'bg-emerald-500' };
  };

  // Generate matrix colors for 5x5 grid cells
  const getMatrixCellClass = (l: number, s: number, currentL: boolean, currentS: boolean) => {
    const score = l * s;
    let baseColor = '';
    if (score >= 15) baseColor = 'bg-rose-500/20 text-rose-700 border-rose-300';
    else if (score >= 5) baseColor = 'bg-amber-400/20 text-amber-700 border-amber-300';
    else baseColor = 'bg-emerald-400/20 text-emerald-700 border-emerald-300';

    const borderStyle = (currentL && currentS) 
      ? 'ring-4 ring-slate-900 border-slate-950 scale-105 z-20 font-bold shadow-md'
      : 'border-slate-100 hover:scale-102';

    return `h-10 w-10 sm:h-12 sm:w-12 border rounded-md flex flex-col items-center justify-center text-xs font-mono transition-all ${baseColor} ${borderStyle} cursor-pointer`;
  };

  const selectedScore = selectedHazard ? (selectedHazard.customLikelihood * selectedHazard.customSeverity) : 0;
  const classification = getRiskClassification(selectedScore, selectedHazard?.status);

  return (
    <section id="simulator" className="py-16 bg-slate-900 text-white border-b border-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Interactive HSE Simulator</span>
            </h2>
            <h3 className="text-3xl font-bold tracking-tight text-white">
              Risk Assessment Matrix & Site Inspection Tool
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Step into the role of an HSE Auditor. Review the simulated construction hazards, recalculate hazard levels using the dynamic 5x5 Likelihood x Severity matrix, and apply Haseen Ullah's targeted remediation procedures to secure the site.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetSimulator}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all border border-slate-700 flex items-center gap-1.5 shadow"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Board</span>
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Inject Custom Hazard</span>
            </button>
          </div>
        </div>

        {/* Live Site Safety Dashboard Gauge */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl mb-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-inner">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-full ${safetyMetrics.percentage === 100 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'} border border-current`}>
              {safetyMetrics.percentage === 100 ? (
                <ShieldCheck className="w-10 h-10 animate-bounce" />
              ) : (
                <ShieldAlert className="w-10 h-10 animate-pulse" />
              )}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Live Site Safety Index</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {safetyMetrics.resolvedCount} of {safetyMetrics.total} threats mitigated. Target: 100% compliance.
              </p>
              <div className="flex items-center gap-2 mt-2 font-mono text-xs text-slate-400">
                <span className="bg-slate-900 px-2 py-0.5 rounded">Avg Risk Coeff: <strong className="text-amber-400">{safetyMetrics.avgRisk}</strong></span>
                <span>•</span>
                <span>Standard: OSHA 1926.21</span>
              </div>
            </div>
          </div>

          {/* Compliance Meter */}
          <div className="w-full lg:w-96 flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span>HSE compliance meter</span>
              <span className={safetyMetrics.percentage === 100 ? 'text-emerald-400' : 'text-amber-400'}>
                {safetyMetrics.percentage}% SECURED
              </span>
            </div>
            <div className="w-full h-4 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-0.5 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${safetyMetrics.percentage}%` }}
                className={`h-full rounded-full transition-all duration-500 ${
                  safetyMetrics.percentage === 100 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-600'
                }`}
              ></motion.div>
            </div>
          </div>
        </div>

        {/* Main Work Station Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Hazards Directory List */}
          <div className="lg:col-span-4 space-y-3 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
            <span className="text-slate-500 font-mono text-[10px] uppercase block tracking-wider font-bold">Inspect Site Hazard Log ({hazards.length})</span>
            {hazards.map((hazard) => {
              const hazardScore = hazard.customLikelihood * hazard.customSeverity;
              const isSelected = hazard.id === selectedHazardId;
              const isResolved = hazard.status === 'resolved';

              return (
                <div
                  key={hazard.id}
                  onClick={() => setSelectedHazardId(hazard.id)}
                  className={`border text-left p-4 rounded-xl transition-all cursor-pointer relative group ${
                    isSelected 
                      ? 'bg-slate-800 border-amber-500 shadow-lg' 
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="font-sans font-bold text-sm text-slate-100 line-clamp-1 block pr-2">
                      {hazard.name}
                    </span>
                    {hazard.id.startsWith('custom_') && (
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteHazard(hazard.id); }}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full ${
                      isResolved 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : hazardScore >= 15
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {hazard.category}
                    </span>

                    {/* Score value indicator */}
                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      Risk Rating: <strong className={isResolved ? "text-emerald-400" : hazardScore >= 15 ? "text-rose-400" : "text-amber-400"}>
                        {isResolved ? '1' : hazardScore}
                      </strong>
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute bottom-4 right-4">
                    {isResolved ? (
                      <div className="bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="bg-slate-900 text-amber-500 border border-amber-500/30 p-1 rounded-full">
                        <AlertTriangle className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Calculator and Matrix Dashboard */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
            
            {/* Selected Hazard info and remediation */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 inline-block mb-3">
                  INSPECTION CASE: {selectedHazard?.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{selectedHazard?.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  {selectedHazard?.description}
                </p>
              </div>

              {/* Slider / Selection Controls */}
              {selectedHazard?.status !== 'resolved' ? (
                <div className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wide flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <span>Calculate Risk Index (Likelihood × Severity)</span>
                  </h4>
                  
                  {/* Likelihood controller */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Likelihood Probability (1-5)</span>
                      <span className="text-amber-400 font-bold">L: {selectedHazard?.customLikelihood}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={selectedHazard?.customLikelihood || 3}
                      onChange={(e) => updateMatrixValues(parseInt(e.target.value), selectedHazard?.customSeverity)}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-full cursor-pointer"
                    />
                  </div>

                  {/* Severity controller */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Severity/Impact Level (1-5)</span>
                      <span className="text-amber-400 font-bold">S: {selectedHazard?.customSeverity}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={selectedHazard?.customSeverity || 3}
                      onChange={(e) => updateMatrixValues(selectedHazard?.customLikelihood, parseInt(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-full cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex gap-3 items-start">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-sans font-bold text-emerald-400 text-xs uppercase">Remediation Implemented Successfully</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      This threat is verified as **CLEARED** under OSHA safety code guidelines. The hazard rating is reduced to a negligible baseline of 1.
                    </p>
                  </div>
                </div>
              )}

              {/* Remediation Procedure */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Targeted Corrective Action (Remedy Manual):</span>
                <p className="text-xs text-slate-300 leading-relaxed border-l-2 border-amber-500 pl-3 italic">
                  {selectedHazard?.reremedy || selectedHazard?.remediation}
                </p>
              </div>

              {/* Action Button */}
              {selectedHazard?.status !== 'resolved' && (
                <button
                  onClick={() => resolveHazard(selectedHazard.id)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-3.5 px-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 text-xs uppercase"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Execute Corrective Action Protocol</span>
                </button>
              )}
            </div>

            {/* Visual 5x5 Matrix Grid representer */}
            <div className="md:col-span-5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-6">
              <span className="text-slate-500 font-mono text-[9px] uppercase font-bold mb-4 text-center tracking-wider block">Risk Assessment Matrix (5x5)</span>
              
              <div className="grid grid-cols-5 gap-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                {/* 5 rows: severity index decreasing (5 to 1) */}
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="contents">
                    {/* 5 columns: likelihood index increasing (1 to 5) */}
                    {[1, 2, 3, 4, 5].map((l) => {
                      const isCurrentL = selectedHazard?.customLikelihood === l;
                      const isCurrentS = selectedHazard?.customSeverity === s;
                      const isActiveCell = isCurrentL && isCurrentS && selectedHazard?.status !== 'resolved';

                      return (
                        <div
                          key={`${l}-${s}`}
                          onClick={() => {
                            if (selectedHazard?.status !== 'resolved') {
                              updateMatrixValues(l, s);
                            }
                          }}
                          className={getMatrixCellClass(l, s, isCurrentL, isCurrentS)}
                          title={`Likelihood ${l}, Severity ${s} = Score ${l * s}`}
                        >
                          <span className="text-[9px] text-slate-400 opacity-60 font-mono font-semibold">L{l}S{s}</span>
                          <span className="text-xs font-mono leading-none">{l * s}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Y axis indicator */}
              <div className="flex justify-between w-full max-w-[240px] px-2 mt-2 text-[9px] text-slate-500 font-mono">
                <span>← Safe (1)</span>
                <span>Severity Axis</span>
                <span>Critical (5) →</span>
              </div>

              {/* Highlight Dashboard score details */}
              <div className={`mt-6 w-full p-4 rounded-xl border ${classification.color} text-center space-y-1`}>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wide">Calculated Threat Category</p>
                <div className="flex items-center justify-center gap-1.5 font-sans font-extrabold text-sm uppercase">
                  <span className={`w-2.5 h-2.5 rounded-full ${classification.badgeColor}`}></span>
                  <span>{classification.label}</span>
                </div>
                <p className="text-[10px] opacity-75 font-mono">
                  Calculated Score: {selectedHazard?.status === 'resolved' ? '1' : selectedScore} / 25
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Certificate issue action box */}
        {safetyMetrics.percentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 bg-gradient-to-r from-amber-500/15 via-yellow-600/15 to-amber-500/15 border-2 border-amber-500 p-8 rounded-2xl max-w-3xl mx-auto text-center space-y-6 shadow-2xl"
          >
            <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md text-slate-950">
              <FileCheck className="w-9 h-9" />
            </div>

            <div>
              <h4 className="text-2xl font-extrabold text-white">Full HSE Audit Compliance Achieved!</h4>
              <p className="text-xs text-slate-300 mt-2 max-w-lg mx-auto">
                Every hazard has been securely resolved according to health, safety, and environmental standards. You can now co-sign a safe-site compliance report with Haseen Ullah.
              </p>
            </div>

            {!certificateIssued ? (
              <form
                onSubmit={(e) => { e.preventDefault(); if (coSignName.trim()) setCertificateIssued(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center justify-center"
              >
                <input
                  type="text"
                  required
                  placeholder="Enter your name / title to sign..."
                  value={coSignName}
                  onChange={(e) => setCoSignName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wide shadow"
                >
                  Generate Safety Certificate
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white text-slate-900 p-8 rounded-xl border border-slate-200 shadow-2xl relative max-w-xl mx-auto"
              >
                {/* Decorative borders for certificate styling */}
                <div className="absolute inset-2 border-2 border-double border-amber-600 rounded"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center px-4">
                    <span className="font-mono text-[9px] text-slate-500 font-bold">CERTIFICATE ID: HSE-SF-{Math.floor(Math.random() * 90000 + 10000)}</span>
                    <ShieldCheck className="w-8 h-8 text-amber-500" />
                  </div>

                  <div className="text-center space-y-2">
                    <h5 className="font-serif font-extrabold text-xl text-slate-900 tracking-wide">SAFE SITE ASSESSMENT COMPLIANCE</h5>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Issued under standard ISO 45001 & OSHA 1926</p>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed px-4 text-center">
                    This is to certify that the project site has been audited and all identified chemical, physical, and electrical hazard profiles have been remediated to nominal levels.
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100 max-w-md mx-auto">
                    <div className="text-center font-serif">
                      <div className="font-bold text-slate-900 italic text-xs border-b border-slate-300 pb-1 font-mono">Haseen Ullah</div>
                      <p className="text-[9px] text-slate-400 font-sans font-semibold mt-1">Lead HSE Inspector</p>
                    </div>
                    <div className="text-center font-serif">
                      <div className="font-bold text-slate-900 italic text-xs border-b border-slate-300 pb-1 font-mono">{coSignName}</div>
                      <p className="text-[9px] text-slate-400 font-sans font-semibold mt-1">Authorized Auditor</p>
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold font-mono py-2 px-4 rounded transition-all"
                    >
                      Print Safety Report
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Modal form for injecting custom hazards */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-lg space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-amber-400" />
                  <span>Inject Custom Hazard Profile</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-400 hover:text-white font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddHazard} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-400 text-xs font-semibold block">Hazard Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Broken Fire Extinguisher Case"
                    value={newHazardName}
                    onChange={(e) => setNewHazardName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-semibold block">Category</label>
                    <select
                      value={newHazardCat}
                      onChange={(e) => setNewHazardCat(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option value="physical">Physical Threat</option>
                      <option value="electrical">Electrical Threat</option>
                      <option value="chemical">Chemical Threat</option>
                      <option value="ergonomic">Ergonomic Threat</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-slate-400 text-xs font-semibold block">Default L (1-5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        required
                        value={newHazardLikelihood}
                        onChange={(e) => setNewHazardLikelihood(Math.max(1, Math.min(5, parseInt(e.target.value) || 3)))}
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 text-center font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-xs font-semibold block">Default S (1-5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        required
                        value={newHazardSeverity}
                        onChange={(e) => setNewHazardSeverity(Math.max(1, Math.min(5, parseInt(e.target.value) || 3)))}
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 text-center font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-xs font-semibold block">Hazard Physical Description</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Describe how this hazard presents on site and its immediate dangers..."
                    value={newHazardDesc}
                    onChange={(e) => setNewHazardDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-xs font-semibold block">Remediation Action Plan</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide specific engineering controls, administrative directives or PPE rules to remedy this threat..."
                    value={newHazardRemediation}
                    onChange={(e) => setNewHazardRemediation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <div className="flex gap-3 justify-end pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs"
                  >
                    Inject Threat Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
