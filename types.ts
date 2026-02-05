
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
  OFFBOARDED = 'Desligado',
  PENDING_FIRST_ACCESS = 'Aguardando Primeiro Acesso'
}

export enum UserRole {
  ADMIN = 'Administrador Global',
  MANAGER = 'Gestor',
  HR = 'RH',
  EMPLOYEE = 'Colaborador'
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unit?: BusinessUnit;
  lastLogin?: string;
  isActive: boolean;
}

export interface AdminLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  ipAddress: string;
  severity: 'low' | 'medium' | 'high';
}

export interface FeedbackType {
  id: string;
  label: string;
  color: string;
}

export interface FeedbackEntry {
  id: string;
  date: string;
  author: string;
  type: string;
  context: string;
  behavior: string;
  impactTechnical: string;
  impactBehavioral: string;
  impactCultural: string;
  futureGuidance: string;
}

export interface MoodEntry {
  date: string;
  score: number;
  note?: string;
}

export type TimelineEventType = 'Positivo' | 'Negativo' | 'Neutro' | 'Advertência' | 'Elogio' | 'Feedback';
export type TimelineCategory = 'Comportamento' | 'Entrega' | 'Prazos' | 'Relacionamento' | 'Compliance';

export interface TimelineEvent {
  id: string;
  date: string;
  type: TimelineEventType;
  category: TimelineCategory;
  description: string;
  author: string;
  isPrivate?: boolean;
}

export interface MonthlyDocStatus {
  month: string;
  year: number;
  holerite: 'OK' | 'Pendente' | 'Atrasado';
  ponto: 'OK' | 'Pendente' | 'Atrasado';
  recibos: 'OK' | 'Pendente' | 'Atrasado';
  outros: 'OK' | 'N/A' | 'Pendente';
}

export type DocumentCategory = 'Admissional' | 'Contratual' | 'Saúde' | 'Treinamentos' | 'Avaliações' | 'Mensal';
export type DocumentStatus = 'Válido' | 'Pendente' | 'Vencido' | 'Em Analise';

export interface EmployeeDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  type: 'Holerite' | 'Ponto' | 'Recibo' | 'ASO' | 'Contrato' | 'Outro';
  competence?: string; // MM/YYYY
  status: DocumentStatus;
  uploadDate: string;
  fileUrl?: string;
  iaNotes?: string;
}

export interface BehavioralProfile {
  disc: { subject: string; A: number; fullMark: number }[];
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
  photoUrl?: string;
  
  personal: {
    cpf: string;
    rg: string;
    birthDate: string;
    address: {
      street: string;
      number: string;
      city: string;
      state: string;
      zip: string;
    }
  };
  banking: {
    bank: string;
    agency: string;
    account: string;
    pix?: string;
  };
  credentials: {
    tempLogin: string;
    tempPass: string;
    inviteLink: string;
    needsPasswordChange: boolean;
  };

  behavioral: BehavioralProfile;
  managerGuide: ManagerGuide;
  emotionalTrend: MoodEntry[];
  documents: EmployeeDocument[];
  monthlyCompliance: MonthlyDocStatus[];
  eventTimeline: TimelineEvent[];
  trainingHistory: { title: string; date: string; score: number }[];
  feedbackHistory: FeedbackEntry[];
  managerNotes: string;
  riskAlert?: string;
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
