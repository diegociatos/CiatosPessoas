
import React, { useState } from 'react';
import { 
  Search, Briefcase, Plus, Star, Users, 
  Target, AlertTriangle, ChevronRight, Filter, 
  Download, Sparkles, BrainCircuit, X, CheckCircle,
  FileText, TrendingUp, Info, RefreshCw, Building2, BarChart3, Clock,
  Layout, MessageSquare, Code, Copy, ClipboardCheck, ListChecks,
  CheckCircle2, Globe, ShieldCheck, Link2
} from 'lucide-react';
import { Candidate, JobOpening, BusinessUnit } from '../types';
import { generateJobDescription, generateScreeningQuestions } from '../services/geminiService';

const MOCK_JOBS: any[] = [
  { 
    id: '1', 
    unit: BusinessUnit.CONTABILIDADE,
    title: 'Analista Fiscal', 
    department: 'Fiscal', 
    seniority: 'Pleno', 
    status: 'Aberto',
    type: 'Grupo Ciatos',
    applicants: 24,
    requirements: { 
      tech: ['SPED Fiscal', 'Escrituração Contábil'], 
      behavioral: ['Atenção a detalhes'] 
    },
    matchProfile: 'Buscamos alguém com perfil estável e analítico.'
  },
  { 
    id: '2', 
    unit: 'Cliente Externo: Alpha S/A',
    title: 'Gerente Financeiro', 
    department: 'Financeiro', 
    seniority: 'Sênior', 
    status: 'Aberto',
    type: 'Externo',
    applicants: 12,
    requirements: { tech: ['Controladoria', 'M&A'], behavioral: ['Liderança'] },
    matchProfile: 'Foco em alguém com senioridade para reestruturação financeira.'
  }
];

const MOCK_CANDIDATES: Candidate[] = [
  { id: '1', name: 'Juliana Torres', position: 'Analista Fiscal Pleno', matchScore: 95, stage: 'Triagem', techSkills: ['SPED', 'Lucro Presumido'], lastActivity: 'Ontem', behavioralAlert: 'Altíssimo fit técnico com as obrigações acessórias da unidade.' },
  { id: '2', name: 'Fernando Lima', position: 'Contador Jr', matchScore: 82, stage: 'Entrevista', techSkills: ['Excel Avançado'], lastActivity: 'Hoje', behavioralAlert: 'Perfil promissor, necessita treinamento em SPED Contribuições.' },
];

const Recruitment: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'vagas' | 'candidatos'>('vagas');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiVagaData, setAiVagaData] = useState<string | null>(null);
  const [aiScreeningData, setAiScreeningData] = useState<string | null>(null);
  const [activeAiTab, setActiveAiTab] = useState<'visual' | 'json' | 'linkedin' | 'screening'>('visual');
  
  const [vagaForm, setVagaForm] = useState({ 
    role: 'Analista Fiscal', 
    unit: BusinessUnit.CONTABILIDADE, 
    type: 'Grupo Ciatos',
    dept: 'Fiscal',
    senioridade: 'Pleno',
    modelo: 'Híbrido'
  });

  const handleRequestJobAi = async () => {
    setAiLoading(true);
    setAiScreeningData(null);
    const details = {
      empresa: vagaForm.unit,
      tipo_vaga: vagaForm.type,
      senioridade: vagaForm.senioridade,
      modelo_trabalho: vagaForm.modelo,
      requisitos_obrigatorios: ["experiência com rotinas fiscais", "conhecimento em SPED", "organização"],
      desejaveis: ["experiência em escritório contábil"],
      competencias_comportamentais: ["atenção a detalhes", "responsabilidade"]
    };
    
    const suggestion = await generateJobDescription(vagaForm.role, vagaForm.unit, vagaForm.dept, details);
    setAiVagaData(suggestion);

    const screening = await generateScreeningQuestions({
      cargo: vagaForm.role,
      unidade: vagaForm.unit,
      requisitos_obrigatorios: details.requisitos_obrigatorios
    });
    setAiScreeningData(screening);

    setAiLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link de Inscrição/Texto copiado!");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Recrutamento Inteligente</h2>
          <p className="text-sm text-gray-500 font-medium italic">Painel Global de Talentos para o Grupo e Clientes Externos.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-3 px-8 py-4 ciatos-navy text-white rounded-2xl text-[10px] font-black shadow-xl hover:scale-105 transition-all uppercase tracking-[0.2em]"
           >
             <Plus size={18} /> Nova Vaga Estratégica
           </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-gray-100">
        <TabBtn label="Painel de Vagas" count={MOCK_JOBS.length} active={activeTab === 'vagas'} onClick={() => setActiveTab('vagas')} />
        <TabBtn label="Pipeline de Talentos (Ranking IA)" count={MOCK_CANDIDATES.length} active={activeTab === 'candidatos'} onClick={() => setActiveTab('candidatos')} />
      </div>

      {activeTab === 'vagas' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_JOBS.map(job => (
            <JobCard key={job.id} job={job} onCopyLink={() => copyToClipboard(`https://recrutamento.ciatos.com.br/vaga/${job.id}`)} />
          ))}
        </div>
      ) : (
        <CandidatesTable candidates={MOCK_CANDIDATES} />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ciatos-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden flex h-[85vh]">
             <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-12">
                   <div>
                      <h3 className="text-3xl font-black text-ciatos-navy">Abertura de Requisição</h3>
                      <p className="text-sm text-gray-400 mt-2 font-medium italic">Advisor auxiliando na criação de uma vaga persuasiva e técnica.</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-gray-100 rounded-full text-gray-400 transition-all"><X size={28}/></button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                   <FormGroup label="Empresa/Destino">
                      <select 
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-ciatos-navy"
                        value={vagaForm.type}
                        onChange={(e) => setVagaForm({...vagaForm, type: e.target.value})}
                      >
                         <option>Grupo Ciatos</option>
                         <option>Cliente Externo</option>
                      </select>
                   </FormGroup>
                   <FormGroup label="Cargo">
                      <input 
                        type="text" 
                        className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs font-bold"
                        value={vagaForm.role}
                        onChange={(e) => setVagaForm({...vagaForm, role: e.target.value})}
                      />
                   </FormGroup>
                   <FormGroup label="Senioridade">
                      <select className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs font-bold" value={vagaForm.senioridade} onChange={(e) => setVagaForm({...vagaForm, senioridade: e.target.value})}>
                         <option>Estágio</option><option>Júnior</option><option>Pleno</option><option>Sênior</option><option>Especialista</option>
                      </select>
                   </FormGroup>
                   <FormGroup label="Modelo">
                      <select className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs font-bold" value={vagaForm.modelo} onChange={(e) => setVagaForm({...vagaForm, modelo: e.target.value})}>
                         <option>Presencial</option><option>Híbrido</option><option>Remoto</option>
                      </select>
                   </FormGroup>
                </div>

                <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-gray-100 mb-10">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-ciatos-gold rounded-2xl shadow-xl shadow-amber-600/20">
                            <BrainCircuit className="text-ciatos-navy" size={24} />
                         </div>
                         <h4 className="font-black text-ciatos-navy uppercase tracking-[0.2em] text-[10px]">Ciatos Recruitment Advisor</h4>
                      </div>
                      <button 
                        onClick={handleRequestJobAi}
                        disabled={!vagaForm.role || aiLoading}
                        className="flex items-center gap-3 px-8 py-3 bg-ciatos-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
                      >
                         {aiLoading ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                         Estruturar com IA
                      </button>
                   </div>

                   {aiVagaData ? (
                     <div className="space-y-6">
                        <div className="flex gap-4 border-b border-gray-200 pb-2">
                           <button onClick={() => setActiveAiTab('visual')} className={`whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-t-xl transition-all ${activeAiTab === 'visual' ? 'bg-white border-x border-t border-gray-200 text-ciatos-gold' : 'text-gray-400'}`}>Visual</button>
                           <button onClick={() => setActiveAiTab('linkedin')} className={`whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-t-xl transition-all ${activeAiTab === 'linkedin' ? 'bg-white border-x border-t border-gray-200 text-ciatos-gold' : 'text-gray-400'}`}>Copy LinkedIn</button>
                           <button onClick={() => setActiveAiTab('screening')} className={`whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-t-xl transition-all ${activeAiTab === 'screening' ? 'bg-white border-x border-t border-gray-200 text-emerald-600' : 'text-gray-400'}`}>Triagem Técnica</button>
                        </div>

                        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-y-auto max-h-[400px]">
                           {activeAiTab === 'visual' && <div className="prose prose-sm max-w-none font-medium text-gray-700 whitespace-pre-wrap">{aiVagaData}</div>}
                           {activeAiTab === 'linkedin' && (
                             <div className="relative">
                                <button onClick={() => copyToClipboard(aiVagaData)} className="absolute top-0 right-0 p-2 text-gray-400 hover:text-ciatos-gold"><Copy size={16}/></button>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-gray-200 text-sm italic leading-relaxed whitespace-pre-wrap">{aiVagaData}</div>
                             </div>
                           )}
                           {activeAiTab === 'screening' && (
                             <div className="space-y-6">
                                {aiScreeningData ? aiScreeningData.split('\n').filter(l => l.match(/^\d\./)).map((q, i) => (
                                  <div key={i} className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-xs font-bold text-emerald-900">{q}</div>
                                )) : 'Gerando filtros de triagem...'}
                             </div>
                           )}
                        </div>
                     </div>
                   ) : (
                     <div className="text-center py-24 opacity-30 flex flex-col items-center">
                        <BarChart3 size={64} className="mb-6 text-gray-300" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Aguardando estruturação do Advisor...</p>
                     </div>
                   )}
                </div>

                <div className="flex gap-4">
                   <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-[10px]">Cancelar</button>
                   <button className="flex-1 py-5 ciatos-navy text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl">Publicar e Gerar Link</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ label, count, active, onClick }: any) => (
  <button onClick={onClick} className={`pb-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${active ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400'}`}>
    {label} <span className={`px-2 py-0.5 rounded-full text-[8px] border ${active ? 'bg-ciatos-gold/10 border-ciatos-gold text-ciatos-gold' : 'bg-gray-50 border-gray-100'}`}>{count}</span>
  </button>
);

const JobCard = ({ job, onCopyLink }: any) => (
  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:border-ciatos-gold/30 transition-all group relative overflow-hidden">
    <div className="flex justify-between items-start mb-8">
       <div>
          <div className="flex items-center gap-2 mb-2">
             <Building2 size={12} className="text-ciatos-gold" />
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{job.type}</span>
          </div>
          <h3 className="text-2xl font-black text-ciatos-navy tracking-tight">{job.title}</h3>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">{job.department} • {job.seniority}</p>
       </div>
       <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-1.5 rounded-full border border-emerald-100 uppercase">{job.status}</span>
    </div>
    
    <div className="flex items-center gap-6 mb-8 p-4 bg-slate-50 rounded-2xl border border-gray-100">
       <div className="flex flex-col">
          <span className="text-[8px] font-black text-gray-400 uppercase">Candidatos</span>
          <span className="text-xl font-black text-ciatos-navy">{job.applicants}</span>
       </div>
       <div className="h-8 w-px bg-gray-200" />
       <div className="flex flex-col">
          <span className="text-[8px] font-black text-gray-400 uppercase">Conversão</span>
          <span className="text-xl font-black text-emerald-600">92%</span>
       </div>
    </div>

    <div className="flex justify-between items-center pt-8 border-t border-gray-100">
       <button onClick={onCopyLink} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-ciatos-gold transition-all"><Link2 size={18} /></button>
       <button className="text-xs font-black text-ciatos-gold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Ver Pipeline <ChevronRight size={16} /></button>
    </div>
  </div>
);

const CandidatesTable = ({ candidates }: any) => (
  <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-slate-50/50">
        <tr>
          <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Candidato</th>
          <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Match Competências (IA)</th>
          <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
          <th className="px-10 py-6"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {candidates.map((cand: any) => (
          <tr key={cand.id} className="hover:bg-gray-50/50 transition-all group">
            <td className="px-10 py-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center font-black text-xl">{cand.name[0]}</div>
                <div>
                  <p className="text-base font-black text-ciatos-navy">{cand.name}</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{cand.position}</p>
                </div>
              </div>
            </td>
            <td className="px-10 py-8">
              <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-xl font-black text-sm ${cand.matchScore > 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-ciatos-gold/10 text-ciatos-gold'}`}>{cand.matchScore}%</div>
                 <div className="flex-1 max-w-[250px]">
                    <p className="text-[9px] text-gray-500 font-medium italic leading-tight line-clamp-2">"{cand.behavioralAlert}"</p>
                 </div>
              </div>
            </td>
            <td className="px-10 py-8"><span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-lg border border-blue-100 uppercase">{cand.stage}</span></td>
            <td className="px-10 py-8 text-right"><button className="p-3 text-gray-300 hover:text-ciatos-gold transition-colors"><ChevronRight size={24}/></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FormGroup = ({ label, children }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    {children}
  </div>
);

export default Recruitment;
