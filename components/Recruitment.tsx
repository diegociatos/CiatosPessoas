
import React, { useState } from 'react';
import { 
  Search, Briefcase, Plus, Star, Users, 
  Target, AlertTriangle, ChevronRight, Filter, 
  Download, Sparkles, BrainCircuit, X, CheckCircle,
  FileText, TrendingUp, Info, RefreshCw, Building2, BarChart3, Clock,
  Layout, MessageSquare, Code, Copy, ClipboardCheck, ListChecks,
  CheckCircle2, Globe, ShieldCheck, Link2, UserCheck, ArrowUpRight,
  Handshake, LayoutGrid, DollarSign, Users2
} from 'lucide-react';
import { Candidate, JobOpening, BusinessUnit } from '../types';
import { useNavigate } from 'react-router-dom';

const MOCK_JOBS: any[] = [
  { 
    id: '1', 
    unit: BusinessUnit.CONTABILIDADE,
    title: 'Analista Fiscal Sênior', 
    department: 'Fiscal', 
    seniority: 'Sênior', 
    status: 'Aberto',
    type: 'Interno',
    category: 'Custo',
    applicants: 14,
    fee: 'N/A'
  },
  { 
    id: '2', 
    unit: 'Indústria Têxtil Alpha',
    title: 'Gerente Financeiro', 
    department: 'Financeiro', 
    seniority: 'Sênior', 
    status: 'Aberto',
    type: 'Cliente Externo',
    category: 'Receita (Fee)',
    applicants: 32,
    fee: 'R$ 15.000,00'
  }
];

const MOCK_CANDIDATES: any[] = [
  { id: '1', name: 'Juliana Torres', position: 'Gerente Financeiro', matchScore: 92, stage: 'Triagem', source: 'LinkedIn', unit: 'Alpha S/A' },
  { id: '2', name: 'Fernando Lima', position: 'Analista Fiscal Sênior', matchScore: 88, stage: 'Técnico', source: 'Indicação', unit: 'Ciatos Contabilidade' },
];

const Recruitment: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'vagas' | 'triagem'>('vagas');
  
  const [vagaForm, setVagaForm] = useState({ 
    role: '', 
    type: 'Grupo Ciatos',
    category: 'Interna',
    senioridade: 'Pleno',
  });

  return (
    <div className="space-y-10 animate-in fade-in pb-16">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-slate-50 rounded-full translate-x-40 -translate-y-40" />
        <div className="relative z-10 flex items-center gap-8">
           <div className="p-6 ciatos-navy rounded-3xl text-ciatos-gold shadow-2xl border-4 border-white">
              <Users2 size={40} />
           </div>
           <div>
              <h2 className="text-3xl font-black text-ciatos-navy tracking-tight uppercase leading-none">Curadoria & Talent Hub</h2>
              <p className="text-lg text-gray-500 font-medium italic mt-2">Gestão de Talentos Internos e Vagas de Recrutamento Externo.</p>
           </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-10 py-5 ciatos-navy text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3"
           >
             <Plus size={18} /> Criar Nova Vaga
           </button>
        </div>
      </div>

      {/* ADVISOR DE TRIAGEM ATIVA */}
      <div className="bg-ciatos-navy p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden border-l-[16px] border-l-ciatos-gold flex flex-col md:flex-row items-center gap-10">
         <Sparkles className="absolute top-[-20px] right-[-20px] text-white/5 w-64 h-64" />
         <div className="p-6 bg-ciatos-gold rounded-[2.5rem] shadow-xl relative z-10 shrink-0">
            <BrainCircuit className="text-ciatos-navy" size={48} />
         </div>
         <div className="relative z-10">
            <h4 className="text-ciatos-gold font-black text-[10px] uppercase tracking-[0.4em] mb-3">Advisor: Lidiane, Inteligência de Curadoria</h4>
            <p className="text-xl font-medium italic leading-relaxed text-gray-200">
               "Lidiane, identifiquei **3 candidatos com match acima de 90%** para a vaga do Cliente **Alpha S/A**. Recomendo movê-los para Entrevista para garantir a receita do mês."
            </p>
         </div>
         <button 
           onClick={() => setActiveTab('triagem')}
           className="px-10 py-4 bg-white text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-ciatos-gold transition-all relative z-10 whitespace-nowrap"
         >
           Avaliar Agora
         </button>
      </div>

      <div className="flex gap-10 border-b border-gray-100 px-6 overflow-x-auto">
        <TabBtn label="Painel de Vagas (Custo vs Receita)" count={MOCK_JOBS.length} active={activeTab === 'vagas'} onClick={() => setActiveTab('vagas')} />
        <TabBtn label="Pipeline de Triagem IA" count={MOCK_CANDIDATES.length} active={activeTab === 'triagem'} onClick={() => setActiveTab('triagem')} />
      </div>

      {activeTab === 'vagas' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {MOCK_JOBS.map(job => (
            <div key={job.id} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:border-ciatos-gold/30 transition-all group overflow-hidden relative">
               <div className="flex justify-between items-start mb-10">
                  <div>
                     <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block ${
                        job.category.includes('Receita') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                     }`}>Vaga {job.category}</span>
                     <h3 className="text-2xl font-black text-ciatos-navy tracking-tight leading-tight">{job.title}</h3>
                     <p className="text-sm font-bold text-gray-400 uppercase mt-1 italic">{job.unit}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-3xl font-black text-ciatos-navy">{job.applicants}</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Candidatos</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-3 gap-6 mb-10">
                  <JobStat label="Tipo" value={job.type} />
                  <JobStat label="Status" value={job.status} />
                  <JobStat label="Fee Estimado" value={job.fee} color={job.fee !== 'N/A' ? 'text-emerald-600' : 'text-gray-400'} />
               </div>

               <div className="flex justify-between items-center pt-10 border-t border-gray-50">
                  <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-ciatos-gold transition-all"><Link2 size={20} /></button>
                  <button onClick={() => navigate('/resumes')} className="text-xs font-black text-ciatos-gold uppercase tracking-widest flex items-center gap-3 group-hover:gap-5 transition-all">Ver Curadoria IA <ChevronRight size={18} /></button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4">
           <div className="p-8 bg-slate-50/50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest flex items-center gap-3"><LayoutGrid size={18}/> Talentos em Alta Aderência</h3>
              <div className="flex gap-4">
                 <button className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[9px] font-black text-gray-400 uppercase tracking-widest">Filtrar por Match</button>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-50/50">
                    <tr>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Candidato</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vaga / Unidade</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Match IA</th>
                       <th className="px-10 py-6">Ações Rápidas</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {MOCK_CANDIDATES.map(cand => (
                       <tr key={cand.id} className="hover:bg-gray-50/50 transition-all group">
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl ciatos-navy text-ciatos-gold flex items-center justify-center font-black text-lg">{cand.name[0]}</div>
                                <div>
                                   <p className="text-base font-black text-ciatos-navy leading-none">{cand.name}</p>
                                   <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5">{cand.source}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <p className="text-sm font-bold text-gray-700">{cand.position}</p>
                             <p className="text-[10px] font-black text-ciatos-gold uppercase">{cand.unit}</p>
                          </td>
                          <td className="px-10 py-8 text-center">
                             <div className={`text-2xl font-black ${cand.matchScore >= 90 ? 'text-emerald-600' : 'text-ciatos-gold'}`}>
                                {cand.matchScore}%
                             </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <div className="flex justify-end gap-3">
                                <button className="px-5 py-2.5 bg-gray-50 text-gray-400 rounded-xl text-[9px] font-black uppercase hover:text-red-500 transition-all">Banco</button>
                                <button className="px-8 py-2.5 bg-ciatos-navy text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 shadow-lg">
                                   <UserCheck size={14} /> Entrevista
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* MODAL: NOVA VAGA (Custo vs Receita) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-ciatos-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden p-14">
             <div className="flex justify-between items-start mb-12">
                <div>
                   <h3 className="text-3xl font-black text-ciatos-navy uppercase tracking-tight">Nova Requisição Estratégica</h3>
                   <p className="text-sm text-gray-400 mt-1 font-medium italic">Selecione o modelo de faturamento e governança da vaga.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 text-gray-300 hover:text-red-500 transition-all"><X size={28}/></button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <button 
                  onClick={() => setVagaForm({...vagaForm, category: 'Interna', type: 'Grupo Ciatos'})}
                  className={`p-12 rounded-[3rem] border-2 flex flex-col items-center gap-8 transition-all ${vagaForm.category === 'Interna' ? 'border-ciatos-gold bg-ciatos-gold/5 shadow-2xl scale-105' : 'border-gray-100 opacity-50'}`}
                >
                   <div className={`p-6 rounded-[2rem] ${vagaForm.category === 'Interna' ? 'bg-ciatos-gold text-ciatos-navy shadow-lg' : 'bg-gray-50 text-gray-400'}`}><Building2 size={48}/></div>
                   <div className="text-center">
                      <p className="text-xl font-black text-ciatos-navy uppercase">Grupo Ciatos</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Vaga Interna (Custo Operacional)</p>
                   </div>
                </button>

                <button 
                  onClick={() => setVagaForm({...vagaForm, category: 'Externa', type: 'Cliente Externo'})}
                  className={`p-12 rounded-[3rem] border-2 flex flex-col items-center gap-8 transition-all ${vagaForm.category === 'Externa' ? 'border-emerald-500 bg-emerald-50 shadow-2xl scale-105' : 'border-gray-100 opacity-50'}`}
                >
                   <div className={`p-6 rounded-[2rem] ${vagaForm.category === 'Externa' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}><Handshake size={48}/></div>
                   <div className="text-center">
                      <p className="text-xl font-black text-emerald-900 uppercase">Faturamento Externo</p>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-2">Recrutamento Especializado (Receita)</p>
                   </div>
                </button>
             </div>

             <div className="space-y-6 mb-12">
                <FormGroup label="Título do Cargo / Vaga">
                   <input type="text" placeholder="Ex: Analista Fiscal Sênior..." className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold shadow-inner" />
                </FormGroup>
                {vagaForm.category === 'Externa' && (
                  <FormGroup label="Valor do Fee (Faturamento)">
                    <div className="relative">
                       <DollarSign className="absolute left-6 top-6 text-emerald-600" size={20} />
                       <input type="text" placeholder="R$ 0,00" className="w-full pl-16 pr-8 py-6 bg-emerald-50 border border-emerald-100 rounded-3xl text-sm font-bold text-emerald-900" />
                    </div>
                  </FormGroup>
                )}
             </div>

             <div className="flex gap-6">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-6 bg-gray-100 text-gray-500 rounded-3xl font-black uppercase tracking-widest text-[11px]">Cancelar</button>
                <button className="flex-[2] py-6 ciatos-navy text-white rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl flex items-center justify-center gap-3">
                   <Plus size={20} /> Publicar Vaga & Gerar Link
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ label, count, active, onClick }: any) => (
  <button onClick={onClick} className={`pb-6 text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${active ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400 hover:text-ciatos-navy'}`}>
    {label} <span className={`px-2.5 py-0.5 rounded-full text-[9px] border ${active ? 'bg-ciatos-gold/10 border-ciatos-gold text-ciatos-gold' : 'bg-gray-50 border-gray-100'}`}>{count}</span>
  </button>
);

const JobStat = ({ label, value, color = "text-ciatos-navy" }: any) => (
  <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
     <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
     <p className={`text-xs font-bold truncate ${color}`}>{value}</p>
  </div>
);

const FormGroup = ({ label, children }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    {children}
  </div>
);

export default Recruitment;
