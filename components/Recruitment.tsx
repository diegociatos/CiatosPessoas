
import React, { useState } from 'react';
import { 
  Search, Briefcase, Plus, Star, Users, 
  Target, AlertTriangle, ChevronRight, Filter, 
  Download, Sparkles, BrainCircuit, X, CheckCircle,
  FileText, TrendingUp, Info, RefreshCw, Building2
} from 'lucide-react';
import { Candidate, JobOpening, BusinessUnit } from '../types';
import { generateJobDescription } from '../services/geminiService';
import { UNIT_DEPARTMENTS } from '../constants';

const MOCK_JOBS: JobOpening[] = [
  { 
    id: '1', 
    unit: BusinessUnit.JURIDICO,
    title: 'Advogado Tributarista', 
    department: 'Jurídico', 
    seniority: 'Sênior', 
    status: 'Aberto',
    requirements: { tech: ['Lucro Real', 'Compliance'], behavioral: ['Analítico', 'Resiliência'] },
    matchProfile: 'Buscamos um perfil executor/analista para complementar um time hoje muito influente/social.'
  },
  { 
    id: '2', 
    unit: BusinessUnit.LOG,
    title: 'Programador Fullstack', 
    department: 'Tecnologia', 
    seniority: 'Pleno', 
    status: 'Aberto',
    requirements: { tech: ['React', 'Node'], behavioral: ['Trabalho em Equipe'] },
    matchProfile: 'Perfil voltado a processos e organização técnica.'
  }
];

const MOCK_CANDIDATES: Candidate[] = [
  { id: '1', name: 'Juliana Torres', position: 'Advogada Tributarista', matchScore: 95, stage: 'Proposta', techSkills: ['Contencioso', 'Inglês'], lastActivity: 'Ontem' },
  { id: '2', name: 'Fernando Lima', position: 'Contador Jr', matchScore: 82, stage: 'Entrevista', techSkills: ['Excel Avançado'], lastActivity: 'Hoje', behavioralAlert: 'Risco: Perfil excessivamente independente para um time que exige alta colaboração.' },
  { id: '3', name: 'Patrícia Rocha', position: 'Analista de Sistemas', matchScore: 78, stage: 'Triagem', techSkills: ['React', 'PostgreSQL'], lastActivity: 'Há 2 dias' },
];

const Recruitment: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'vagas' | 'candidatos'>('vagas');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiVagaData, setAiVagaData] = useState<string | null>(null);
  
  const [vagaForm, setVagaForm] = useState({ 
    role: '', 
    unit: BusinessUnit.CONTABILIDADE, 
    dept: 'Contábil' 
  });

  const handleRequestJobAi = async () => {
    setAiLoading(true);
    // Exemplo de contexto de time para análise de lacunas
    const teamContext = {
      currentTeamSize: 5,
      dominantProfiles: ['Influente', 'Estável'],
      techGaps: ['Direito Digital', 'Automação Processual'],
      workload: 'Alta'
    };
    const suggestion = await generateJobDescription(vagaForm.role, vagaForm.unit, vagaForm.dept, teamContext);
    setAiVagaData(suggestion);
    setAiLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-ciatos-navy">Gestão Estratégica de Talentos</h2>
          <p className="text-sm text-gray-500 mt-1">Aquisição de capital humano para as unidades do Grupo Ciatos.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-2 px-6 py-3 ciatos-navy text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-navy-900/20 transition-all"
           >
             <Plus size={18} /> Solicitar Nova Vaga
           </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('vagas')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'vagas' ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400'}`}
        >
          Vagas por Unidade ({MOCK_JOBS.length})
        </button>
        <button 
          onClick={() => setActiveTab('candidatos')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'candidatos' ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400'}`}
        >
          Pipeline Ativo ({MOCK_CANDIDATES.length})
        </button>
      </div>

      {activeTab === 'vagas' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_JOBS.map(job => (
            <div key={job.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:border-ciatos-gold/30 transition-all group">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <Building2 size={12} className="text-ciatos-gold" />
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{job.unit}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-400 font-medium">{job.department} • {job.seniority}</p>
                 </div>
                 <span className="bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full border border-green-100 uppercase tracking-widest">
                   {job.status}
                 </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl mb-6 border border-gray-100">
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
                   <Target size={12} className="text-ciatos-gold" /> Perfil Ideal Ciatos
                 </p>
                 <p className="text-xs text-gray-600 leading-relaxed italic">"{job.matchProfile}"</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                 {job.requirements.tech.map(t => (
                   <span key={t} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">{t}</span>
                 ))}
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">C{i}</div>
                   ))}
                 </div>
                 <button className="text-xs font-bold text-ciatos-navy flex items-center gap-1 group-hover:gap-2 transition-all">
                   Acessar Gestão <ChevronRight size={14} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Candidato / Match</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vaga Alvo</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Etapa Atual</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_CANDIDATES.map(cand => (
                <tr key={cand.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl ciatos-navy text-ciatos-gold flex items-center justify-center font-black text-lg shadow-inner">
                        {cand.matchScore}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{cand.name}</p>
                        <div className="flex gap-1 mt-1">
                          {cand.techSkills.map(s => (
                             <span key={s} className="text-[8px] text-gray-400 font-bold uppercase">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-600 font-medium">{cand.position}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100 uppercase">
                      {cand.stage}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-gray-300 hover:text-ciatos-navy transition-colors"><Search size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Multi-tenant */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ciatos-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex h-[85vh]">
             <div className="flex-1 p-10 overflow-y-auto">
                <div className="flex justify-between items-start mb-10">
                   <div>
                      <h3 className="text-2xl font-bold text-ciatos-navy">Requisição de Pessoal</h3>
                      <p className="text-sm text-gray-400 mt-1">Defina os parâmetros técnicos para a unidade do grupo.</p>
                </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X /></button>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Empresa / Unidade</label>
                      <select 
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-ciatos-gold transition-all"
                        value={vagaForm.unit}
                        onChange={(e) => setVagaForm({...vagaForm, unit: e.target.value as BusinessUnit, dept: UNIT_DEPARTMENTS[e.target.value as BusinessUnit][0]})}
                      >
                         {Object.values(BusinessUnit).map(unit => (
                           <option key={unit} value={unit}>{unit}</option>
                         ))}
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Departamento</label>
                      <select 
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-ciatos-gold transition-all"
                        value={vagaForm.dept}
                        onChange={(e) => setVagaForm({...vagaForm, dept: e.target.value})}
                      >
                         {UNIT_DEPARTMENTS[vagaForm.unit].map(dept => (
                           <option key={dept} value={dept}>{dept}</option>
                         ))}
                      </select>
                   </div>
                </div>

                <div className="mb-10 space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Título do Cargo</label>
                   <input 
                     type="text" 
                     placeholder="Ex: Analista Fiscal Pleno"
                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-ciatos-gold transition-all"
                     value={vagaForm.role}
                     onChange={(e) => setVagaForm({...vagaForm, role: e.target.value})}
                   />
                </div>

                <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 mb-8">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <BrainCircuit className="text-ciatos-gold" size={24} />
                         <h4 className="font-bold text-ciatos-navy uppercase tracking-widest text-xs">Análise de Lacunas de Time</h4>
                      </div>
                      <button 
                        onClick={handleRequestJobAi}
                        disabled={!vagaForm.role || aiLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-ciatos-gold text-ciatos-gold rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-ciatos-gold hover:text-white transition-all disabled:opacity-50"
                      >
                         {aiLoading ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                         Analisar Gap & Sugerir Perfil
                      </button>
                   </div>

                   {aiVagaData ? (
                     <div className="prose prose-sm max-w-none text-gray-600 animate-in slide-in-from-bottom-2 duration-500">
                        <div className="whitespace-pre-wrap text-xs leading-relaxed font-medium p-6 bg-white rounded-2xl border border-gray-200 shadow-inner">
                          {aiVagaData}
                        </div>
                     </div>
                   ) : (
                     <div className="text-center py-10 opacity-30">
                        <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-xs font-medium">A IA analisará o time atual para sugerir o perfil complementar ideal.</p>
                     </div>
                   )}
                </div>

                <div className="flex gap-4">
                   <button className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Cancelar</button>
                   <button className="flex-1 py-4 ciatos-navy text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-navy-900/30 transition-all">Abrir Processo Seletivo</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recruitment;
