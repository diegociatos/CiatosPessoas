
import React, { useState } from 'react';
import { 
  Search, Briefcase, Plus, Star, Users, 
  Target, AlertTriangle, ChevronRight, Filter, 
  Download, Sparkles, BrainCircuit, X, CheckCircle,
  FileText, TrendingUp, Info, RefreshCw, Building2, BarChart3, Clock,
  Layout, MessageSquare, Code, Copy, ClipboardCheck, ListChecks,
  CheckCircle2
} from 'lucide-react';
import { Candidate, JobOpening, BusinessUnit } from '../types';
import { generateJobDescription, generateScreeningQuestions } from '../services/geminiService';

const MOCK_JOBS: JobOpening[] = [
  { 
    id: '1', 
    unit: BusinessUnit.CONTABILIDADE,
    title: 'Analista Fiscal', 
    department: 'Fiscal', 
    seniority: 'Pleno', 
    status: 'Aberto',
    requirements: { 
      tech: ['SPED Fiscal', 'Escrituração Contábil', 'Lucro Real'], 
      behavioral: ['Atenção a detalhes', 'Consistência', 'Responsabilidade'] 
    },
    matchProfile: 'Buscamos alguém com perfil estável e analítico para lidar com prazos rigorosos.'
  },
  { 
    id: '2', 
    unit: BusinessUnit.JURIDICO,
    title: 'Advogado Tributarista', 
    department: 'Jurídico', 
    seniority: 'Sênior', 
    status: 'Aberto',
    requirements: { tech: ['Compliance', 'Contencioso'], behavioral: ['Dominância', 'Influência'] },
    matchProfile: 'Foco em alguém com senioridade para sustentações orais e gestão de grandes contas.'
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
    dept: 'Fiscal',
    senioridade: 'Pleno',
    modelo: 'Híbrido'
  });

  const handleRequestJobAi = async () => {
    setAiLoading(true);
    setAiScreeningData(null);
    const details = {
      empresa: vagaForm.unit,
      senioridade: vagaForm.senioridade,
      modelo_trabalho: vagaForm.modelo,
      requisitos_obrigatorios: ["experiência com rotinas fiscais", "conhecimento em SPED/obrigações acessórias", "organização e atenção a prazos"],
      desejaveis: ["excel avançado", "experiência em escritório contábil", "boa comunicação com cliente"],
      competencias_comportamentais: ["atenção a detalhes", "consistência", "responsabilidade"],
      criterios_eliminatorios: ["ausência de experiência mínima exigida"]
    };
    
    // Gera a descrição estruturada
    const suggestion = await generateJobDescription(vagaForm.role, vagaForm.unit, vagaForm.dept, details);
    setAiVagaData(suggestion);

    // Gera as perguntas de triagem com o novo Especialista
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
    alert("Copiado para a área de transferência!");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Recrutamento Inteligente</h2>
          <p className="text-sm text-gray-500 font-medium italic">Gestão tática e curadoria de talentos para o Grupo Ciatos.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-3 px-8 py-4 ciatos-navy text-white rounded-2xl text-[10px] font-black shadow-xl hover:shadow-navy-900/40 transition-all uppercase tracking-[0.2em]"
           >
             <Plus size={18} /> Requisitar Talento
           </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-gray-100">
        <TabBtn label="Painel de Vagas" count={MOCK_JOBS.length} active={activeTab === 'vagas'} onClick={() => setActiveTab('vagas')} />
        <TabBtn label="Pipeline de Talentos" count={MOCK_CANDIDATES.length} active={activeTab === 'candidatos'} onClick={() => setActiveTab('candidatos')} />
      </div>

      {activeTab === 'vagas' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_JOBS.map(job => (
            <JobCard key={job.id} job={job} />
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
                      <h3 className="text-3xl font-black text-ciatos-navy">Estruturação de Vaga Elite</h3>
                      <p className="text-sm text-gray-400 mt-2 font-medium italic">Advisor auxiliando na criação de uma requisição sem vieses.</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-gray-100 rounded-full text-gray-400 transition-all"><X size={28}/></button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                   <FormGroup label="Unidade">
                      <select 
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-ciatos-navy"
                        value={vagaForm.unit}
                        onChange={(e) => setVagaForm({...vagaForm, unit: e.target.value as BusinessUnit})}
                      >
                         {Object.values(BusinessUnit).map(unit => <option key={unit} value={unit}>{unit}</option>)}
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
                         <option>Estágio</option><option>Júnior</option><option>Pleno</option><option>Sênior</option>
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
                         <h4 className="font-black text-ciatos-navy uppercase tracking-[0.2em] text-[10px]">Ciatos Job Advisor</h4>
                      </div>
                      <button 
                        onClick={handleRequestJobAi}
                        disabled={!vagaForm.role || aiLoading}
                        className="flex items-center gap-3 px-8 py-3 bg-ciatos-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                      >
                         {aiLoading ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                         Estruturar com IA
                      </button>
                   </div>

                   {aiVagaData ? (
                     <div className="space-y-6">
                        <div className="flex gap-4 border-b border-gray-200 pb-2 overflow-x-auto scrollbar-hide">
                           <button onClick={() => setActiveAiTab('visual')} className={`whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-t-xl transition-all ${activeAiTab === 'visual' ? 'bg-white border-x border-t border-gray-200 text-ciatos-gold' : 'text-gray-400'}`}><Layout size={14} className="inline mr-2"/> Visual</button>
                           <button onClick={() => setActiveAiTab('json')} className={`whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-t-xl transition-all ${activeAiTab === 'json' ? 'bg-white border-x border-t border-gray-200 text-ciatos-gold' : 'text-gray-400'}`}><Code size={14} className="inline mr-2"/> JSON</button>
                           <button onClick={() => setActiveAiTab('linkedin')} className={`whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-t-xl transition-all ${activeAiTab === 'linkedin' ? 'bg-white border-x border-t border-gray-200 text-ciatos-gold' : 'text-gray-400'}`}><MessageSquare size={14} className="inline mr-2"/> LinkedIn</button>
                           <button onClick={() => setActiveAiTab('screening')} className={`whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-t-xl transition-all ${activeAiTab === 'screening' ? 'bg-white border-x border-t border-gray-200 text-emerald-600' : 'text-gray-400'}`}><ClipboardCheck size={14} className="inline mr-2"/> Triagem Técnica</button>
                        </div>

                        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-y-auto max-h-[500px] custom-scrollbar">
                           {activeAiTab === 'visual' && (
                             <div className="prose prose-sm max-w-none whitespace-pre-wrap font-medium text-gray-700">
                                {aiVagaData.split('JSON_DATA')[0]}
                             </div>
                           )}
                           {activeAiTab === 'json' && (
                             <div className="relative">
                               <button onClick={() => copyToClipboard(aiVagaData)} className="absolute top-0 right-0 p-2 text-gray-400 hover:text-ciatos-gold transition-all"><Copy size={16}/></button>
                               <pre className="text-[10px] font-mono text-blue-600 bg-slate-50 p-4 rounded-xl overflow-x-auto">
                                  {aiVagaData.includes('JSON_DATA') ? aiVagaData.split('JSON_DATA')[1].split('TITULO_SUGERIDO')[0] : 'JSON em processamento...'}
                               </pre>
                             </div>
                           )}
                           {activeAiTab === 'linkedin' && (
                             <div className="relative">
                                <button onClick={() => copyToClipboard(aiVagaData.split('TEXTO_LINKEDIN')[1] || '')} className="absolute top-0 right-0 p-2 text-gray-400 hover:text-ciatos-gold transition-all"><Copy size={16}/></button>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-gray-200 text-sm italic text-ciatos-navy leading-relaxed whitespace-pre-wrap">
                                   {aiVagaData.split('TEXTO_LINKEDIN')[1] || 'Gerando texto persuasivo...'}
                                </div>
                             </div>
                           )}
                           {activeAiTab === 'screening' && (
                             <div className="relative space-y-8">
                                <div className="flex items-center justify-between mb-2">
                                   <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em]">
                                      <div className="p-2 bg-emerald-100 rounded-lg">
                                         <ListChecks size={18} />
                                      </div>
                                      Filtros de Qualificação Técnica (Especialista)
                                   </div>
                                   <div className="flex gap-2">
                                      <button onClick={() => copyToClipboard(aiScreeningData || '')} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all">
                                         <Copy size={12} /> Copiar Tudo
                                      </button>
                                   </div>
                                </div>

                                {aiScreeningData ? (
                                   <div className="space-y-6">
                                      <div className="bg-emerald-50/30 p-8 rounded-[2rem] border border-emerald-100">
                                         <p className="text-[11px] text-emerald-800 font-bold mb-6 italic leading-relaxed">
                                            "Estas perguntas foram desenhadas pelo Especialista em Triagem para validar os requisitos obrigatórios e detectar inconsistências logo na inscrição."
                                         </p>
                                         <div className="space-y-6">
                                            {aiScreeningData.split('\n').filter(l => l.match(/^\d\./)).map((q, i) => (
                                              <div key={i} className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex gap-4 group hover:border-emerald-400 transition-all">
                                                 <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                                                    {i + 1}
                                                 </div>
                                                 <div className="flex-1">
                                                    <p className="text-sm font-bold text-ciatos-navy mb-4 leading-tight">{q.replace(/^\d\.\s*/, '')}</p>
                                                    <div className="flex gap-3">
                                                       <button className="px-3 py-1 bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest rounded-lg border border-gray-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">Preview Campo</button>
                                                    </div>
                                                 </div>
                                              </div>
                                            ))}
                                         </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-3 p-4 bg-ciatos-navy rounded-2xl text-white">
                                         <CheckCircle2 size={18} className="text-ciatos-gold" />
                                         <p className="text-[10px] font-black uppercase tracking-widest">A pergunta de Pretensão Salarial e Disponibilidade foi incluída automaticamente.</p>
                                      </div>
                                   </div>
                                ) : (
                                   <div className="py-20 flex flex-col items-center justify-center opacity-30 text-center space-y-4">
                                      <RefreshCw size={48} className="animate-spin text-emerald-600" />
                                      <p className="text-[10px] font-black uppercase tracking-widest">O Especialista em Triagem está formulando as barreiras técnicas...</p>
                                   </div>
                                )}
                             </div>
                           )}
                        </div>
                     </div>
                   ) : (
                     <div className="text-center py-24 opacity-30 flex flex-col items-center">
                        <BarChart3 size={64} className="mb-6 text-gray-300" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Aguardando estruturação estratégica do Advisor...</p>
                     </div>
                   )}
                </div>

                <div className="flex gap-4">
                   <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all">Cancelar</button>
                   <button className="flex-1 py-5 ciatos-navy text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-navy-900/40 hover:scale-[1.02] transition-all">Publicar Requisição</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ label, count, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`pb-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
      active ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400'
    }`}
  >
    {label}
    <span className={`px-2 py-0.5 rounded-full text-[8px] border ${active ? 'bg-ciatos-gold/10 border-ciatos-gold text-ciatos-gold' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
      {count}
    </span>
  </button>
);

const FormGroup = ({ label, children }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    {children}
  </div>
);

// Fix: Explicitly typing JobCard as a React.FC to allow the reserved 'key' prop when used in lists.
const JobCard: React.FC<{ job: JobOpening }> = ({ job }) => (
  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:border-ciatos-gold/30 transition-all group relative overflow-hidden">
    <div className="flex justify-between items-start mb-8">
       <div>
          <div className="flex items-center gap-2 mb-2">
             <Building2 size={12} className="text-ciatos-gold" />
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{job.unit}</span>
          </div>
          <h3 className="text-2xl font-black text-ciatos-navy tracking-tight">{job.title}</h3>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">{job.department} • {job.seniority}</p>
       </div>
       <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest">
         {job.status}
       </span>
    </div>
    <div className="space-y-4 mb-8">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hard Skills Focadas</p>
      <div className="flex flex-wrap gap-2">
        {job.requirements.tech.map(t => (
          <span key={t} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-black text-gray-600 uppercase tracking-widest">{t}</span>
        ))}
      </div>
    </div>
    <div className="p-6 bg-ciatos-navy/5 rounded-2xl mb-8 border border-ciatos-navy/10">
       <p className="text-[10px] font-black text-ciatos-gold uppercase mb-3 flex items-center gap-2">
         <Target size={14} /> Mapeamento Advisor
       </p>
       <p className="text-xs text-ciatos-navy font-bold italic leading-relaxed">"{job.matchProfile}"</p>
    </div>
    <div className="flex justify-between items-center pt-8 border-t border-gray-100">
       <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-300" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Publicada há 4 dias</span>
       </div>
       <button className="text-xs font-black text-ciatos-gold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
         Ver Pipeline <ChevronRight size={16} />
       </button>
    </div>
  </div>
);

// Fix: Explicitly typing CandidatesTable as a React.FC for consistent Prop checking.
const CandidatesTable: React.FC<{ candidates: Candidate[] }> = ({ candidates }) => (
  <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-slate-50/50">
        <tr>
          <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Candidato</th>
          <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Match IA (Blind)</th>
          <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
          <th className="px-10 py-6"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {candidates.map(cand => (
          <tr key={cand.id} className="hover:bg-gray-50/50 transition-all group">
            <td className="px-10 py-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center font-black text-xl">
                  {cand.name[0]}
                </div>
                <div>
                  <p className="text-base font-black text-ciatos-navy">{cand.name}</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{cand.position}</p>
                </div>
              </div>
            </td>
            <td className="px-10 py-8">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-ciatos-gold/10 rounded-xl text-ciatos-gold font-black text-sm">
                    {cand.matchScore}%
                 </div>
                 <div className="flex-1 max-w-[200px]">
                    <p className="text-[9px] text-gray-500 font-medium leading-tight line-clamp-2 italic">"{cand.behavioralAlert}"</p>
                 </div>
              </div>
            </td>
            <td className="px-10 py-8">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-lg border border-blue-100 uppercase tracking-widest">
                {cand.stage}
              </span>
            </td>
            <td className="px-10 py-8 text-right">
              <button className="p-3 text-gray-300 hover:text-ciatos-gold transition-colors"><ChevronRight size={24}/></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Recruitment;
