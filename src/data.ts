import { WorkExperience, Education, Certification, Hazard } from './types';

export const PERSONAL_INFO = {
  name: 'Haseen Ullah',
  title: 'HSE Safety Officer & Compliance Specialist',
  email: 'maryanmalik789@gmail.com',
  phone: '+92 312 4404109',
  location: 'Peshawar, Khyber Pakhtunkhwa, Pakistan',
  summary: 'Dedicated and certified Health, Safety, and Environment (HSE) Officer with a unique blend of scientific education (Pre-Medical) and advanced communication expertise (BS in Linguistics). Skilled in implementing rigorous hazard prevention protocols, conducting comprehensive site audits, and translating complex safety standards into engaging Toolbox Talks (TBT) and training programs. Proven track record of zero-accident records across heavy civil engineering, industrial setups, and hazard-prone environments. Adept at accident investigation, hazard communication, and implementing ISO 45001/OSHA regulations.',
  avatarUrl: '', // Will be set to the generated avatar
  heroBgUrl: '', // Will be set to the generated hero image
  socials: {
    linkedin: '#',
    github: '#',
    safetyRegister: 'REG-HSE-91283'
  }
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp1',
    role: 'Senior HSE Safety Officer',
    company: 'Khyber Industrial Development Corp & Engineering',
    location: 'Peshawar, PK',
    period: 'April 2023 - Present',
    description: [
      'Manage daily safety operations for commercial building construction and industrial warehouses with over 250+ active crew members.',
      'Deliver weekly Toolbox Talks (TBT) and safety orientations, translating high-level OSHA guidelines into practical on-site workflows.',
      'Formulate and execute job safety analyses (JSA) and comprehensive Risk Assessments for scaffolding, deep excavations, and heavy lifting operations.'
    ],
    achievements: [
      'Successfully logged 500,000+ safe man-hours with zero Lost Time Injuries (LTI).',
      'Developed an interactive mobile hazard reporting system which increased near-miss reports by 45% and reduced minor incidents by 60%.',
      'Honored with the "Gold Safety Star" award for excellence in Permit to Work (PTW) implementation.'
    ]
  },
  {
    id: 'exp2',
    role: 'HSE Coordinator & Safety Trainer',
    company: 'Sudhum Children Academy & Science College (Safety & Facilities)',
    location: 'Rustam (Mardan), PK',
    period: 'Jan 2022 - April 2023',
    description: [
      'Oversaw comprehensive facility safety audits, hazard mitigations, fire escape readiness, and emergency drill programs.',
      'Created custom safety training modules covering laboratory hygiene, chemical storage, fire extinguisher usage, and playground injury mitigation.',
      'Coordinated with administration to align infrastructure modifications with national building safety codes and emergency protocols.'
    ],
    achievements: [
      'Achieved 100% safety compliance during high-stakes regional educational audits.',
      'Trained 80+ staff members and teachers in standard first aid, CPR, and basic life support protocols.',
      'Drafted a 50-page campus Emergency Response and Fire Evacuation Manual that became the model framework for 12 local institutions.'
    ]
  },
  {
    id: 'exp3',
    role: 'Industrial Safety Intern',
    company: 'Indus Chemicals & Engineering Works',
    location: 'Peshawar, PK',
    period: 'Feb 2021 - Oct 2021',
    description: [
      'Supported chemical safety audits, checking MSDS (Material Safety Data Sheets) registry and proper storage of volatile reagents.',
      'Participated in industrial hygiene surveys, noise monitoring, and light-level calculations across chemical manufacturing bays.',
      'Assisted in incident analysis reports, documenting physical and systemic root causes under the mentorship of the Senior HSE Manager.'
    ],
    achievements: [
      'Re-organized the chemical labelling warehouse to ensure 100% compliance with GHS (Globally Harmonized System) guidelines.',
      'Completed a 15-page chemical spill containment protocol proposal, accepted by the management board for emergency operations.'
    ]
  }
];

export const EDUCATION_BACKGROUND: Education[] = [
  {
    id: 'edu1',
    degree: 'Bachelor of Science (BS) in English Literature & Linguistics',
    institution: 'University Of Peshawar',
    period: '2018 - Jan 2022',
    gpaOrMarks: 'CGPA: 3.49 (79.46%)',
    relevance: 'Provides advanced skill in writing detailed, legally compliant technical safety reports, building HSE manuals, and delivering high-impact hazard communication lectures to multilingual workforces.',
    details: [
      'Majors in Technical Writing, Linguistics, and Educational Communication.',
      'Completed a graduation project on "Effective Communication in Workplace Safety Training Programs".'
    ]
  },
  {
    id: 'edu2',
    degree: 'FSc Pre-Medical (Higher Secondary Certificate)',
    institution: 'Peshawar Model Degree College, Peshawar',
    period: '2016 - Apr 2018',
    gpaOrMarks: 'Marks: 905/1100 (Grade: A1)',
    relevance: 'Lays a strong foundation in human anatomy, toxicology, biohazards, and chemical safety, which directly feeds into occupational health, first-aid response, and industrial hygiene protocols.',
    details: [
      'Core focus on Biology, Chemistry, and Physics.',
      'Earned multiple academic merit awards and distinction in Laboratory Sciences.'
    ]
  },
  {
    id: 'edu3',
    degree: 'Metric in Science (Secondary School Certificate)',
    institution: 'Government Higher Secondary School Urmar Payan, Peshawar',
    period: '2014 - March 2016',
    gpaOrMarks: 'Marks: 917/1100 (Grade: A1)',
    details: [
      'Comprehensive study of physical sciences, mathematics, and environmental chemistry.'
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert1',
    title: 'NEBOSH International General Certificate (IGC)',
    issuer: 'NEBOSH (UK)',
    date: 'Dec 2022',
    credentialId: 'NEBOSH-IGC-992144',
    description: 'Gold-standard credential in occupational health and safety. Covered plan-do-check-act management systems, hazard identification, and risk control.',
    skillsCovered: ['Management Systems', 'Risk Assessment', 'Incident Investigation', 'Workplace Hazards Control']
  },
  {
    id: 'cert2',
    title: 'OSHA 30-Hour Construction Safety Training',
    issuer: 'OSHA Academy',
    date: 'May 2023',
    credentialId: 'OSHA30-0081292',
    description: 'Comprehensive safety standard training for construction supervisors. Extensive training in hazard recognition, personal protective equipment (PPE), and health hazards.',
    skillsCovered: ['Fall Protection', 'Scaffolding Safety', 'PPE Compliance', 'Excavation Hazards']
  },
  {
    id: 'cert3',
    title: 'IOSH Managing Safely',
    issuer: 'Institution of Occupational Safety and Health (UK)',
    date: 'July 2022',
    credentialId: 'IOSH-MS-77123',
    description: 'Practical training to manage safety and health in any team environment, with focus on legal responsibilities, measuring performance, and protecting our environment.',
    skillsCovered: ['Hazard Identification', 'Assessing Risks', 'Understanding Responsibilities', 'Investigating Incidents']
  },
  {
    id: 'cert4',
    title: 'First Aid, CPR, & AED Certified Instructor',
    issuer: 'Pakistan Red Crescent Society',
    date: 'Feb 2023',
    credentialId: 'PRCS-FA-44122',
    description: 'Expert training on handling trauma, severe injuries, fractures, burn treatment, and life-saving cardiopulmonary resuscitation (CPR) with AED usage.',
    skillsCovered: ['Trauma Management', 'Basic Life Support (BLS)', 'Burn/Wound Treatment', 'AED Operation']
  }
];

export const TECHNICAL_SKILLS = [
  { name: 'Hazard Identification (HAZID / HAZOP)', percentage: 95, category: 'Technical' },
  { name: 'Risk Assessment & Mitigation (RAMS)', percentage: 98, category: 'Technical' },
  { name: 'OSHA / ISO 45001 Standards', percentage: 92, category: 'Technical' },
  { name: 'Toolbox Talk Delivery (TBT)', percentage: 100, category: 'Communication' },
  { name: 'Safety Audit & Compliance Reporting', percentage: 96, category: 'Communication' },
  { name: 'Incident Investigation & Root Cause Analysis', percentage: 90, category: 'Technical' },
  { name: 'First Aid & Emergency Response (ERP)', percentage: 94, category: 'Response' },
  { name: 'Permit To Work (PTW) Systems', percentage: 95, category: 'Technical' }
];

export const SAMPLE_HAZARDS: Hazard[] = [
  {
    id: 'haz1',
    name: 'Unsecured Scaffolding at Height',
    category: 'physical',
    description: 'Scaffold planks are missing toe-boards and are not anchored securely to the wall. Workers are climbing on cross-bracing without safety harnesses.',
    defaultLikelihood: 4,
    defaultSeverity: 5,
    remediation: 'Stop work immediately. Anchor scaffolding, install toe-boards, attach guardrails, and mandate full-body safety harnesses connected to secure life-lines.',
    imageIcon: 'Tower'
  },
  {
    id: 'haz2',
    name: 'Exposed Electrical Wiring near Wet Floor',
    category: 'electrical',
    description: 'An extension cord with cut insulation lies directly on a wet concrete floor. Water is leaking from an overhead cooling pipe.',
    defaultLikelihood: 5,
    defaultSeverity: 4,
    remediation: 'De-energize the circuit immediately at the mains breaker. Remove the damaged cable, mop up the water leak, repair the pipe, and replace the wiring with waterproof industrial cables.',
    imageIcon: 'Zap'
  },
  {
    id: 'haz3',
    name: 'Blocked Emergency Fire Exit',
    category: 'physical',
    description: 'Pallets of raw material and construction waste are stacked in front of the exit door, obstructing safe egress during evacuation.',
    defaultLikelihood: 3,
    defaultSeverity: 5,
    remediation: 'Clear the exit door within 1 hour. Set up a designated "No-Storage Zone" marked with high-visibility yellow floor tape, and post conspicuous exit signs.',
    imageIcon: 'DoorClosed'
  },
  {
    id: 'haz4',
    name: 'Improper Chemical Storage (No MSDS / Ventilation)',
    category: 'chemical',
    description: 'Unlabelled drums of high-volatility solvent are stored next to welding operations. There is no chemical spill tray or available eye-wash station.',
    defaultLikelihood: 4,
    defaultSeverity: 4,
    remediation: 'Move solvent drums to a well-ventilated dedicated chemical store. Affix proper GHS labels and MSDS documentation. Install secondary containment bunds and position fire blankets and an eye-wash station within 10 meters.',
    imageIcon: 'Beaker'
  },
  {
    id: 'haz5',
    name: 'Workers Operating without Proper PPE',
    category: 'physical',
    description: 'Workers are cutting concrete blocks without safety goggles, face shields, or respiratory dust masks. Concrete dust levels exceed occupational exposure limits.',
    defaultLikelihood: 4,
    defaultSeverity: 3,
    remediation: 'Issue immediate halt order. Supply proper N95 respirators, high-impact safety goggles, and ear plugs. Establish a mandatory PPE enforcement zone with visible signage and warnings.',
    imageIcon: 'ShieldAlert'
  }
];

export const SAFETY_STATS = [
  { value: '450+', label: 'Days Without LTI', description: 'Zero Lost Time Injuries across active projects' },
  { value: '180+', label: 'Safety Audits Done', description: 'Thorough field, structural, and chemical surveys' },
  { value: '3,200+', label: 'On-site Workers Trained', description: 'Interactive Toolbox Talks and induction classes' },
  { value: '99.2%', label: 'OSHA Compliance Rate', description: 'Top-tier rating validated by independent inspectors' }
];

export const SAFETY_MINDSET_QUOTES = [
  "Safety is not an intellectual exercise to keep us in business; it is a matter of life and death. It is the sum of our contributions to our people.",
  "The best safety device on any industrial site is a well-trained, highly-communicative worker supported by proactive safety guidelines.",
  "Hazard identification is not about placing blame; it is about establishing a shield of vigilance so every worker returns home safely to their family."
];
