
import React, { useState } from 'react';
import { 
  Search, Filter, UserCheck, Tag, Download, Eye, 
  Sparkles, Link as LinkIcon, Briefcase, ChevronRight, 
  Star, History, BrainCircuit, RefreshCw, MoreHorizontal,
  FileText, ShieldCheck, CheckCircle2, TrendingUp, AlertTriangle, ShieldX, Lock,
  X, BadgeCheck, Activity, BarChart3, Fingerprint, Calendar, CheckSquare, Zap, Target,
  AlertCircle, ShieldAlert
} from 'lucide-react';
import { evaluateCandidateMatch, auditCandidateApplication } from '../services/geminiService';

const MOCK_RESUMES = [
  { 
    id: 1, 
    name: 'Juliana Torres (Blind Mode)', 
    role: 'Analista Fiscal Pleno', 
    seniority: 'Pleno',
    area: 'Fiscal',
    experience: '5 anos', 
    skills: ['SPED Fiscal', 'Lucro Real', 'SAP'], 
    source: 'LinkedIn',
    matchScore: 94,
    techMatch: 98,
    behavioralMatch: 90,
    behavioralProfile: 'Estável (Analítico)',
    status: 'Disponível',
    resumeContent: "Experiência de 3 anos na Empresa X com SPED Fiscal. Anteriormente 2 anos na Empresa Y como Assistente Fiscal. Formada em Ciências Contábeis.",
    formResponses: { nivel_sped: "Avançado", disponibilidade: "Imediata", pretensao: "R$ 6.000,00" },
    aiExplanation: 'Forte aderência aos requisitos obrigatórios. Demonstrou experiência sólida em obrigações acessórias complexas em passagens anteriores.'
  },
  { 
    id: 2, 
    name: 'Fernando Lima (Blind Mode)', 
    role: 'Analista Fiscal Pleno', 
    seniority: 'Pleno',
    area: 'Fiscal',
    experience: '3 anos', 
    skills: ['Lucro Presumido', 'Excel'], 
    source: 'Indicação',
    matchScore: 82,
    techMatch: 78,
    behavioralMatch: 85,
    behavioralProfile: 'Influente',
    status: 'Disponível',
    resumeContent: "Contador Junior com passagens curtas por 3 escritórios em 2 anos. Foco em Excel e rotinas básicas de DP.",
    formResponses: { nivel_sped: "Intermediário", disponibilidade: "15 dias", pretensao: "R$ 5.500,00" },
    aiExplanation: 'Bom perfil técnico, porém necessita de curva de aprendizado em Lucro Real conforme requisitado pela vaga.'
  }
];

const ResumeBank: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [curatorMode, setCuratorMode] = useState(true);
  const [blindEnabled, setBlindEnabled] = useState(true);
  const [isClassifying, setIsClassifying] = useState<number | null>(null);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [deepAnalysis, setDeepAnalysis] = useState<Record<number, any>>({});
  const [auditResult, setAuditResult] = useState<Record<number, string>>({});
  const [activeDossierTab, setActiveDossierTab] = useState<'match' | 'auditoria'>('match');

  const handleOpenDossier = async (candidate: any) => {
    setSelectedCandidate(candidate);
    setDossierOpen(true);
    
    if (!deepAnalysis[candidate.id]) {
      setIsClassifying(candidate.id);
      const jobData = { 
        cargo: candidate.role, 
        unidade: candidate.area, 
        requisitos_obrigatorios: ["SPED Fiscal", "Lucro Real", "Experiência 3 anos+", "Escritório Contábil"] 
      };
      
      const [match, audit] = await Promise.all([
        evaluateCandidateMatch(candidate.resumeContent, candidate.formResponses, jobData),
        auditCandidateApplication(candidate.resumeContent, candidate.formResponses, jobData)
      ]);

      setDeepAnalysis(prev => ({ ...prev, [candidate.id]: match }));
      setAuditResult(prev => ({ ...prev, [candidate.id]: audit }));
      setIsClassifying(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Curadoria Ética de Talentos</h2>
          <p className="text-sm text-gray-500 font-medium italic mt-2">Módulo de triagem assistida com eliminação de vieses e explicabilidade técnica.</p>
        </div>
        <div className="flex gap-4 relative z-10">
           <button 
             onClick={() => setBlindEnabled(!blindEnabled)}
             className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
               blindEnabled ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl' : 'bg-white text-gray-400 border-gray-200'
             }`}
           >
             <Lock size={18} /> {blindEnabled ? 'Blind Screening Ativo' : 'Desativar Blind Mode'}
           </button>
           <button 
             onClick={() => setCuratorMode(!curatorMode)}
             className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
               curatorMode ? 'bg-ciatos-gold text-white border-ciatos-gold shadow-xl' : 'bg-white text-gray-400 border-gray-200'
             }`}
           >
             <BrainCircuit size={18} /> {curatorMode ? 'IA Curator Ativa' : 'Ativar Curator'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Candidatos em Banco" value="128" sub="Pool Global" color="border-ciatos-navy" />
        <StatCard label="Matches de Elite" value="14" sub="Acima de 90%" color="border-ciatos-gold" />
        <StatCard label="Proteção LGPD" value="100%" sub="Compliance Ativo" color="border-emerald-500" />
        <StatCard label="Tempo Médio Triagem" value="48h" sub="SLA de Curadoria" color="border-slate-300" />
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus-within:bg-white focus-within:border-ciatos-gold transition-all">
           <Search size={20} className="text-gray-400" />
           <input 
             type="text" 
             placeholder="Pesquisar por competências técnicas (ex: SPED, Lucro Real, Inglês)..." 
             className="bg-transparent border-none outline-none text-sm w-full text-gray-700 font-medium"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <button className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 hover:text-ciatos-gold transition-colors">
           <Filter size={20} />
        </button>
      </div>

      <div className="space-y-8">
        {MOCK_RESUMES.map(resume => (
          <div key={resume.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-8">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl transition-all ${blindEnabled ? 'bg-slate-800 text-slate-600' : 'ciatos-navy text-ciatos-gold shadow-navy-900/20'}`}>
                    {blindEnabled ? <Lock size={32} /> : resume.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                        <h3 className={`text-2xl font-black tracking-tight transition-all ${blindEnabled ? 'text-gray-300 select-none blur-sm' : 'text-ciatos-navy'}`}>
                          {blindEnabled ? '•••••••• ••••••••' : resume.name}
                        </h3>
                        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase border border-emerald-100 flex items-center gap-2">
                          <ShieldCheck size={12} /> Compliance Ativo
                        </span>
                    </div>
                    <p className="text-lg font-bold text-ciatos-gold flex items-center gap-3">
                      {resume.role} <span className="text-gray-300">•</span> {resume.seniority}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <InfoItem label="Aderência Técnica" value={`${resume.techMatch}%`} high={resume.techMatch > 90} />
                  <InfoItem label="Fit Comportamental" value={`${resume.behavioralMatch}%`} high={resume.behavioralMatch > 85} />
                  <InfoItem label="Projeção DISC" value={resume.behavioralProfile} />
                  <InfoItem label="Experiência Total" value={resume.experience} />
                </div>

                <div className="flex flex-wrap gap-3">
                  {resume.skills.map(skill => (
                    <span key={skill} className="text-[9px] font-black text-gray-500 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl uppercase tracking-widest">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-96 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Score IA Advisors</p>
                      <div className={`text-5xl font-black tracking-tighter ${resume.matchScore > 90 ? 'text-emerald-600' : 'text-ciatos-gold'}`}>
                        {resume.matchScore}%
                      </div>
                   </div>
                   <button 
                      onClick={() => handleOpenDossier(resume)}
                      className="p-5 bg-gray-50 border border-gray-100 rounded-3xl text-ciatos-gold hover:bg-ciatos-gold hover:text-white transition-all shadow-sm active:scale-95 flex items-center gap-3"
                    >
                      <Fingerprint size={24} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Dossiê</span>
                    </button>
                </div>

                {curatorMode && (
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 animate-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-3 mb-4">
                        <Sparkles size={16} className="text-ciatos-gold" />
                        <span className="text-[10px] font-black text-ciatos-navy uppercase tracking-[0.2em]">Explicabilidade Advisor</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium italic">
                      "{resume.aiExplanation}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-10 mt-10 border-t border-gray-50 gap-6">
               <div className="flex gap-4">
                  <button className="flex items-center gap-3 px-8 py-3.5 bg-gray-50 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
                     <Eye size={16} /> Ver Histórico Completo
                  </button>
               </div>
               <div className="flex gap-4">
                  <button className="flex items-center gap-3 px-10 py-4 ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:shadow-navy-900/30 transition-all active:scale-95">
                     <UserCheck size={16} /> Aprovar para Entrevista
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: DOSSIÊ DE VERACIDADE & DEEP MATCH */}
      {dossierOpen && selectedCandidate && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ciatos-navy/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden flex h-[85vh]">
              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                 <div className="flex justify-between items-start mb-8 border-b border-gray-50 pb-8">
                    <div className="flex items-center gap-6">
                       <div className="p-4 bg-ciatos-navy rounded-3xl text-ciatos-gold">
                          <Fingerprint size={32} />
                       </div>
                       <div>
                          <h3 className="text-3xl font-black text-ciatos-navy tracking-tight">Dossiê de Inteligência Ciatos</h3>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mt-2">Relatório Estratégico para Lidiane (RH)</p>
                       </div>
                    </div>
                    <button onClick={() => setDossierOpen(false)} className="p-3 hover:bg-gray-100 rounded-full text-gray-400 transition-all"><X size={28}/></button>
                 </div>

                 {/* TAB NAVIGATION */}
                 <div className="flex gap-8 mb-10 border-b border-gray-100">
                    <button 
                      onClick={() => setActiveDossierTab('match')}
                      className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeDossierTab === 'match' ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400'}`}
                    >
                       Aderência & Match
                    </button>
                    <button 
                      onClick={() => setActiveDossierTab('auditoria')}
                      className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all ${activeDossierTab === 'auditoria' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-400'}`}
                    >
                       Auditoria de Veracidade & Riscos
                    </button>
                 </div>

                 {isClassifying === selectedCandidate.id ? (
                   <div className="h-full flex flex-col items-center justify-center py-20">
                      <div className="w-16 h-16 border-4 border-ciatos-gold border-t-transparent rounded-full animate-spin mb-6" />
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Cruzando dados e auditando histórico...</p>
                   </div>
                 ) : activeDossierTab === 'match' ? (
                   deepAnalysis[selectedCandidate.id] ? (
                     <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
                        {/* HEADER DE RESULTADO MATCH */}
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                           <div className="text-center">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Score de Match Ponderado</p>
                              <div className={`text-7xl font-black tracking-tighter ${deepAnalysis[selectedCandidate.id].score_final >= 90 ? 'text-emerald-600' : 'text-ciatos-gold'}`}>
                                 {deepAnalysis[selectedCandidate.id].score_final}%
                              </div>
                              <div className="mt-4">
                                 <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                    deepAnalysis[selectedCandidate.id].recomendacao === 'TRIAGEM' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    deepAnalysis[selectedCandidate.id].recomendacao === 'ENTREVISTA' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                    'bg-red-50 text-red-700 border-red-100'
                                 }`}>
                                    Recomendação: {deepAnalysis[selectedCandidate.id].recomendacao}
                                 </span>
                              </div>
                           </div>
                           <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                              <MatchMetric label="Fit Técnico" val={deepAnalysis[selectedCandidate.id].fit_tecnico} />
                              <MatchMetric label="Fit Experiência" val={deepAnalysis[selectedCandidate.id].fit_experiencia} />
                              <MatchMetric label="Fit Comportamental" val={deepAnalysis[selectedCandidate.id].fit_comportamental} />
                              <MatchMetric label="Clareza CV" val={deepAnalysis[selectedCandidate.id].fit_organizacao} />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                           {/* CHECKLIST DE REQUISITOS */}
                           <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                              <h4 className="text-[11px] font-black text-ciatos-navy uppercase tracking-widest mb-8 flex items-center gap-3">
                                 <CheckSquare size={16} className="text-ciatos-gold" /> Checklist de Barreira
                              </h4>
                              <div className="space-y-4">
                                 {deepAnalysis[selectedCandidate.id].requisitos.map((req: any, idx: number) => (
                                   <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                      <span className="text-[11px] font-bold text-gray-700">{req.item}</span>
                                      <span className="text-lg">{req.status}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>

                           {/* PONTOS FORTES E XEQUE-MATE */}
                           <div className="lg:col-span-2 space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
                                    <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-6 flex items-center gap-3">
                                       <Star size={16} /> Pontos Fortes (Elite)
                                    </h4>
                                    <ul className="space-y-4">
                                       {deepAnalysis[selectedCandidate.id].pontos_fortes.map((p: string, i: number) => (
                                         <li key={i} className="text-[11px] font-bold text-emerald-900 leading-snug flex gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> {p}
                                         </li>
                                       ))}
                                    </ul>
                                 </div>
                                 <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                                    <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-6 flex items-center gap-3">
                                       <AlertTriangle size={16} /> Pontos de Atenção
                                    </h4>
                                    <ul className="space-y-4">
                                       {deepAnalysis[selectedCandidate.id].pontos_atencao.map((p: string, i: number) => (
                                         <li key={i} className="text-[11px] font-bold text-amber-900 leading-snug flex gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> {p}
                                         </li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>

                              <div className="bg-ciatos-navy p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl border-l-[12px] border-l-ciatos-gold">
                                 <Sparkles className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
                                 <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-ciatos-gold rounded-2xl">
                                       <Target size={24} className="text-ciatos-navy" />
                                    </div>
                                    <h4 className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em]">Pergunta Xeque-Mate</h4>
                                 </div>
                                 <p className="text-lg font-bold text-white italic leading-relaxed">
                                    "{deepAnalysis[selectedCandidate.id].pergunta_entrevista}"
                                  </p>
                              </div>
                           </div>
                        </div>
                     </div>
                   ) : <NoDataView />
                 ) : (
                   /* ABA DE AUDITORIA DE VERACIDADE */
                   <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500 pb-10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <AuditMetric icon={<ShieldCheck size={24}/>} label="Score de Veracidade" value="95%" sub="Confiabilidade Form vs CV" color="text-emerald-600" />
                         <AuditMetric icon={<Activity size={24}/>} label="Estabilidade" value="2.8 anos" sub="Média por Empresa" color="text-ciatos-gold" />
                         <AuditMetric icon={<TrendingUp size={24}/>} label="Evolução Hierárquica" value="Ascendente" sub="Ganhos de Cargo" color="text-ciatos-navy" />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                         {/* RELATÓRIO DO MOTOR DE INTELIGÊNCIA */}
                         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute right-[-20px] top-[-20px] text-gray-50 opacity-10">
                               <Fingerprint size={120} />
                            </div>
                            <h4 className="text-xs font-black text-ciatos-navy uppercase tracking-widest mb-8 flex items-center gap-3">
                               <BrainCircuit size={18} className="text-ciatos-gold" /> Dossiê de Auditoria (Audit Result)
                            </h4>
                            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                               {auditResult[selectedCandidate.id] || "Analisando inconsistências..."}
                            </div>
                         </div>

                         {/* PAINEL DE RISCOS (RED FLAGS) */}
                         <div className="space-y-8">
                            <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100 shadow-sm">
                               <h4 className="text-xs font-black text-red-700 uppercase tracking-widest mb-8 flex items-center gap-3">
                                  <AlertCircle size={20} /> Alerta de "Red Flags" (Risco Preventivo)
                               </h4>
                               <div className="space-y-4">
                                  <RedFlagItem text="Inconsistência: Declarou 'Avançado' em SAP, mas currículo não cita passagens por empresas que utilizam o ERP." />
                                  <RedFlagItem text="Instabilidade: Três passagens curtas (menos de 6 meses) nos últimos 2 anos." />
                                  <RedFlagItem text="Inconsistência Temporal: Lacuna de 8 meses entre as passagens na Empresa X e Empresa Y." />
                               </div>
                            </div>

                            <div className="bg-ciatos-navy p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                               <ShieldAlert className="absolute bottom-[-20px] right-[-20px] text-white/5 w-40 h-40" />
                               <h4 className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em] mb-4">Parecer do Motor de Auditoria</h4>
                               <p className="text-sm font-medium italic text-gray-300 leading-relaxed">
                                 "Apesar das inconsistências técnicas detectadas na proficiência de softwares específicos, a evolução de cargos demonstra um crescimento legítimo de responsabilidades, sugerindo que as lacunas temporais foram dedicadas a especialização acadêmica."
                               </p>
                            </div>
                         </div>
                      </div>

                      <div className="flex justify-end gap-6 pt-10 border-t border-gray-100">
                         <button className="px-10 py-5 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">Rejeitar na Auditoria</button>
                         <button className="px-12 py-5 ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Aprovar Auditoria & Seguir</button>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

      <div className="bg-ciatos-navy p-12 rounded-[4rem] shadow-2xl relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-12">
         <ShieldX className="absolute top-[-50px] left-[-50px] text-white/5 w-80 h-80 rotate-12" />
         <div className="flex-1 relative z-10 space-y-8">
            <div className="flex items-center gap-4">
               <div className="p-4 bg-ciatos-gold rounded-3xl shadow-2xl shadow-amber-600/30">
                  <ShieldCheck size={32} className="text-ciatos-navy" />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-ciatos-gold">Recrutamento Ético Ciatos</h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl font-medium">
              Utilizamos curadoria assistida por IA para eliminar vieses de gênero, idade ou origem. Nosso foco é puramente técnico e comportamental, garantindo que o **mérito estratégico** seja o único critério de entrada nas unidades do Grupo Ciatos.
            </p>
         </div>
      </div>
    </div>
  );
};

const AuditMetric = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
     <div className={`p-4 bg-gray-50 rounded-2xl w-fit mb-6 ${color}`}>
        {icon}
     </div>
     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
     <p className={`text-3xl font-black tracking-tighter ${color}`}>{value}</p>
     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{sub}</p>
  </div>
);

const RedFlagItem = ({ text }: { text: string }) => (
  <div className="flex gap-4 items-start p-5 bg-white rounded-2xl border border-red-200">
     <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
     <p className="text-[11px] font-bold text-red-900 leading-relaxed">{text}</p>
  </div>
);

const NoDataView = () => (
  <div className="py-20 flex flex-col items-center justify-center opacity-30 text-center">
    <BarChart3 size={64} className="mb-6 text-gray-300" />
    <p className="text-[10px] font-black uppercase tracking-widest">Aguardando auditoria de match tático...</p>
  </div>
);

const MatchMetric = ({ label, val }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
     <p className="text-xl font-black text-ciatos-navy">{val}%</p>
     <div className="w-full h-1 bg-gray-50 rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-ciatos-gold" style={{ width: `${val}%` }} />
     </div>
  </div>
);

const StatCard = ({ label, value, sub, color }: any) => (
  <div className={`bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm border-b-8 ${color} transition-all hover:translate-y-[-5px]`}>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-3xl font-black text-ciatos-navy tracking-tighter mb-1">{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{sub}</p>
  </div>
);

const InfoItem = ({ label, value, high }: any) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">{label}</span>
    <span className={`text-sm font-bold truncate ${high ? 'text-emerald-600' : 'text-gray-800'}`}>{value}</span>
  </div>
);

export default ResumeBank;
