
import React, { useState } from 'react';
import { 
  Search, Filter, UserCheck, Tag, Download, Eye, 
  Sparkles, Link as LinkIcon, Briefcase, ChevronRight, 
  Star, History, BrainCircuit, RefreshCw, MoreHorizontal,
  FileText, ShieldCheck, CheckCircle2
} from 'lucide-react';
import { classifyResume } from '../services/geminiService';

const MOCK_RESUMES = [
  { 
    id: 1, 
    name: 'Lucas Bertoli', 
    role: 'Advogado Tributarista', 
    seniority: 'Sênior',
    area: 'Jurídico',
    experience: '8 anos', 
    skills: ['Tributário', 'Compliance', 'Inglês'], 
    source: 'LinkedIn',
    matchScore: 92,
    techMatch: 95,
    behavioralMatch: 88,
    behavioralProfile: 'Analista/Conformidade',
    status: 'Disponível',
    aiExplanation: 'Forte aderência técnica em tributário. Perfil "C" do DISC equilibraria a dominância excessiva do time atual.'
  },
  { 
    id: 2, 
    name: 'Mariana Kuntz', 
    role: 'Analista de RH', 
    seniority: 'Pleno',
    area: 'RH',
    experience: '4 anos', 
    skills: ['R&S', 'Endomarketing', 'Folha'], 
    source: 'Indicação',
    matchScore: 85,
    techMatch: 80,
    behavioralMatch: 92,
    behavioralProfile: 'Influente/Estável',
    status: 'Em Processo',
    aiExplanation: 'Excelente fit cultural. Perfil relacional ideal para endomarketing no Grupo Ciatos.'
  },
  { 
    id: 3, 
    name: 'Roberto J.', 
    role: 'Contador Sênior', 
    seniority: 'Sênior',
    area: 'Contábil',
    experience: '12 anos', 
    skills: ['Audit', 'Lucro Real', 'IFRS'], 
    source: 'Banco Interno',
    matchScore: 78,
    techMatch: 98,
    behavioralMatch: 55,
    behavioralProfile: 'Analista Puro',
    status: 'Disponível',
    aiExplanation: 'Gênio técnico, porém com alto risco de turnover por preferir trabalho 100% isolado.'
  },
  { 
    id: 4, 
    name: 'Ana Cláudia Martins', 
    role: 'Controller', 
    seniority: 'Especialista',
    area: 'Contábil',
    experience: '15 anos', 
    skills: ['Gestão de Custos', 'Reporting', 'SAP'], 
    source: 'Headhunter',
    matchScore: 96,
    techMatch: 96,
    behavioralMatch: 96,
    behavioralProfile: 'Dominante/Analista',
    status: 'Silver Medalist',
    aiExplanation: 'Ranking #1: Candidata completa. Senioridade estratégica para o projeto de auditoria do Q4.'
  },
];

const ResumeBank: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [curatorMode, setCuratorMode] = useState(true);
  const [isClassifying, setIsClassifying] = useState<number | null>(null);
  const [detailedAiResponse, setDetailedAiResponse] = useState<Record<number, string>>({});

  const handleClassify = async (id: number) => {
    setIsClassifying(id);
    const resume = MOCK_RESUMES.find(r => r.id === id);
    if (resume) {
      // Passando contexto de vaga mockado para a classificação
      const jobContext = { title: resume.role, unit: resume.area };
      const response = await classifyResume(resume, jobContext);
      setDetailedAiResponse(prev => ({ ...prev, [id]: response }));
    }
    setIsClassifying(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Curator */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-ciatos-navy">Curadoria de Talentos (Banco Inteligente)</h2>
          <p className="text-sm text-gray-500 mt-1">Classificação por aderência técnica, comportamental e ranking explicável.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setCuratorMode(!curatorMode)}
             className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
               curatorMode ? 'bg-ciatos-gold text-white border-ciatos-gold shadow-lg shadow-amber-600/20' : 'bg-white text-gray-500 border-gray-200'
             }`}
           >
             <BrainCircuit size={16} /> {curatorMode ? 'Ranking Ativado' : 'Ativar Curadoria IA'}
           </button>
           <button className="px-6 py-2.5 ciatos-navy text-white rounded-xl text-xs font-bold shadow-lg shadow-navy-900/10 uppercase tracking-widest">
             Importar Currículos
           </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total no Banco</p>
           <p className="text-2xl font-bold text-ciatos-navy">1.284</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-b-4 border-b-ciatos-gold">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Silver Medalists</p>
           <p className="text-2xl font-bold text-ciatos-gold">42</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-b-4 border-b-green-500">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Top Ranking (> 90%)</p>
           <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-b-4 border-b-blue-500">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Aderência Média</p>
           <p className="text-2xl font-bold text-blue-600">74%</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 focus-within:bg-white focus-within:border-ciatos-gold transition-all">
           <Search size={18} className="text-gray-400" />
           <input 
             type="text" 
             placeholder="Filtrar por competência técnica, perfil comportamental ou senioridade..." 
             className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 hover:text-ciatos-navy transition-colors">
           <Filter size={18} />
        </button>
      </div>

      {/* Main Grid / List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_RESUMES.map(resume => (
          <div key={resume.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            
            {/* Background Accent for Score */}
            <div className={`absolute top-0 right-0 w-40 h-40 opacity-[0.03] flex items-center justify-center -rotate-12 translate-x-12 -translate-y-12`}>
               <Star size={160} className={resume.matchScore > 90 ? 'text-green-500' : 'text-ciatos-gold'} />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-3xl ciatos-navy text-ciatos-gold flex items-center justify-center text-2xl font-black shadow-lg">
                  {resume.name[0]}
                </div>
                <div>
                   <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-800">{resume.name}</h3>
                      {resume.status === 'Silver Medalist' && (
                        <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border border-amber-200">
                          Reaproveitamento Estratégico
                        </span>
                      )}
                   </div>
                   <p className="text-sm text-ciatos-gold font-bold flex items-center gap-2">
                     {resume.role} <span className="text-gray-300">•</span> {resume.seniority}
                   </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-black ${resume.matchScore > 90 ? 'text-green-600' : 'text-ciatos-gold'}`}>
                  {resume.matchScore}%
                </div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Aderência Total</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
               <CuratorTag label="Match Técnico" value={`${resume.techMatch}%`} highlight={resume.techMatch > 90} />
               <CuratorTag label="Match Cultural" value={`${resume.behavioralMatch}%`} highlight={resume.behavioralMatch > 80} />
               <CuratorTag label="Perfil DISC" value={resume.behavioralProfile} />
               <CuratorTag label="Experiência" value={resume.experience} />
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
               {resume.skills.map(skill => (
                 <span key={skill} className="text-[9px] font-bold text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">
                   {skill}
                 </span>
               ))}
            </div>

            {/* AI Explanation / Insights (Ranking Explicável) */}
            {curatorMode && (
              <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 animate-in slide-in-from-top-2 relative group-hover:bg-white transition-all">
                 <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-ciatos-gold" />
                    <span className="text-[10px] font-black text-ciatos-navy uppercase tracking-widest">Ranking Explicável IA</span>
                 </div>
                 <p className="text-xs text-gray-600 leading-relaxed font-medium italic">
                    {detailedAiResponse[resume.id] || `"${resume.aiExplanation}"`}
                 </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
               <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
                     <Eye size={14} /> Dossiê
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
                     <Download size={14} /> CV
                  </button>
               </div>
               <div className="flex gap-2">
                  <button 
                    onClick={() => handleClassify(resume.id)}
                    disabled={isClassifying === resume.id}
                    className="flex items-center gap-2 px-4 py-2 border border-ciatos-gold/30 text-ciatos-gold rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-ciatos-gold hover:text-white transition-all"
                  >
                     {isClassifying === resume.id ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                     Recalcular Ranking
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 ciatos-navy text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-navy-900/20 transition-all">
                     <LinkIcon size={14} /> Entrevista
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Recommendation Panel */}
      <div className="bg-ciatos-navy p-10 rounded-[3rem] shadow-2xl relative overflow-hidden text-white">
         <Sparkles className="absolute top-[-50px] left-[-50px] text-white/5 w-80 h-80" />
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-xl">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/10 rounded-2xl">
                     <ShieldCheck size={24} className="text-ciatos-gold" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-[0.2em]">Otimização de Pipeline</h3>
               </div>
               <p className="text-sm text-gray-300 leading-relaxed mb-8">
                 A IA identificou um padrão de alta aderência comportamental no banco para a unidade de **Contabilidade**. Sugerimos priorizar a triagem interna antes de investir em novas fontes externas.
               </p>
               <button className="flex items-center gap-2 px-8 py-4 bg-ciatos-gold text-ciatos-navy rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-white transition-all">
                 Acessar Dashboard de Aderência <ChevronRight size={18} />
               </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center">
                  <p className="text-3xl font-black text-ciatos-gold mb-1">15d</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Redução no Time-to-Fill</p>
               </div>
               <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center">
                  <p className="text-3xl font-black text-ciatos-gold mb-1">94%</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Aderência Cultural do Top 10</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const CuratorTag = ({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) => (
  <div className="flex flex-col">
    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">{label}</span>
    <span className={`text-[11px] font-bold truncate ${highlight ? 'text-green-600' : 'text-gray-700'}`}>{value}</span>
  </div>
);

export default ResumeBank;
