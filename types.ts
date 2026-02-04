
export enum BusinessUnit {
  CONTABILIDADE = 'Ciatos Contabilidade',
  JURIDICO = 'Ciatos Jurídico',
  CONSULTORIA = 'Ciatos Consultoria e Coworking',
  LOG = 'Ciatoslog'
}

export enum EmployeeStatus {
  ACTIVE = 'Ativo',
  ONBOARDING = 'Onboarding',
  VACATION = 'Férias',
  LEAVE = 'Afastado',
  OFFBOARDED = 'Desligado'
}

export type FeedbackType = 'Contínuo' | 'Formal' | 'Corretivo' | 'Reconhecimento';

export interface FeedbackEntry {
  id: string;
  date: string;
  author: string;
  type: FeedbackType;
  context: string;
  behavior: string;
  impact: string;
  futureGuidance: string;
}

export type DocumentCategory = 'Admissional' | 'Contratual' | 'Saúde' | 'Treinamentos' | 'Avaliações';
export type DocumentStatus = 'Válido' | 'Pendente' | 'Vencido';

export interface EmployeeDocument {
  name: string;
  category: DocumentCategory;
  status: DocumentStatus;
  date: string;
  expiryDate?: string;
  riskNote?: string;
}

export interface BehavioralProfile {
  disc: { d: number; i: number; s: number; c: number };
  appreciationLanguage: string;
  communicationStyle: string;
  learningStyle: string;
  motivationFactors: string[];
}

export interface ManagerGuide {
  howToCommunicate: string[];
  howToMotivate: string[];
  howToFeedback: string[];
}

export interface JobOpening {
  id: string;
  unit: BusinessUnit;
  title: string;
  department: string;
  seniority: 'Estágio' | 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista';
  status: 'Aberto' | 'Pausado' | 'Concluído';
  requirements: {
    tech: string[];
    behavioral: string[];
  };
  matchProfile: string;
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  matchScore: number;
  stage: 'Sourcing' | 'Triagem' | 'Entrevista' | 'Técnico' | 'Proposta';
  lastActivity: string;
  techSkills: string[];
  behavioralAlert?: string;
}

export interface Employee {
  id: string;
  unit: BusinessUnit;
  name: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  sentimentScore: number;
  productivityScore: number;
  hiringDate: string;
  email: string;
  phone: string;
  behavioral: BehavioralProfile;
  managerGuide: ManagerGuide;
  emotionalTrend: { day: string; val: number }[];
  documents: EmployeeDocument[];
  trainingHistory: { title: string; date: string; score: number }[];
  feedbackHistory: FeedbackEntry[];
  managerNotes: string;
  riskAlert?: string;
}
