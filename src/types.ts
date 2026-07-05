export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string[];
  gpaOrMarks?: string;
  relevance?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  skillsCovered: string[];
}

export interface Hazard {
  id: string;
  name: string;
  category: 'electrical' | 'physical' | 'chemical' | 'ergonomic' | 'biological';
  description: string;
  defaultLikelihood: number; // 1-5
  defaultSeverity: number; // 1-5
  remediation: string;
  imageIcon: string;
}

export interface AuditReport {
  id: string;
  siteName: string;
  date: string;
  inspectorName: string;
  hazardsFound: Array<{
    hazardId: string;
    customLikelihood: number;
    customSeverity: number;
    status: 'identified' | 'resolved';
  }>;
  overallRiskScore: number;
}
