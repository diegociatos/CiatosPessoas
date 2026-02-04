
import { BusinessUnit } from './types';

export const COLORS = {
  NAVY: '#1a2b4b',
  GOLD: '#c5a059',
  BG_GRAY: '#f4f6f9',
  TEXT_MAIN: '#333333',
  SUCCESS: '#10b981',
  DANGER: '#ef4444',
  WARNING: '#f59e0b',
};

export const UNIT_DEPARTMENTS: Record<BusinessUnit, string[]> = {
  [BusinessUnit.CONTABILIDADE]: ['Fiscal', 'Contábil', 'Departamento Pessoal', 'Paralegal'],
  [BusinessUnit.JURIDICO]: ['Contencioso', 'Consultivo', 'Tributário', 'Trabalhista'],
  [BusinessUnit.CONSULTORIA]: ['Recepção', 'RH', 'Financeiro', 'Controladoria', 'Serviços Gerais'],
  [BusinessUnit.LOG]: ['Tecnologia', 'Comercial', 'Desenvolvimento', 'Suporte Técnico']
};

export const MOCK_CONTEXT = {
  company: 'Grupo Ciatos',
  totalEmployees: 45,
  activeVacancies: 12,
  mainRisk: 'Turnover no setor contábil devido à carga horária sazonal.',
  climaScore: 8.4
};
