
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { 
  Users, TrendingUp, AlertTriangle, Sparkles, Brain, 
  MessageSquare, Zap, ShieldAlert, ChevronRight, 
  Smile, Frown, Meh, Plus, History, Lightbulb,
  CheckCircle2, UserCog, Target, FileText, Info,
  RefreshCw, Thermometer, UserX, Coffee, Send, 
  Search, Bell, Save, X, ClipboardList, ShieldCheck,
  Clock, CalendarCheck, Check, Ban, AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { prepareFeedbackBriefing, processEmployeeFeedback } from '../services/geminiService';
import { BusinessUnit, EmployeeStatus } from '../types';

const TEAM_MEMBERS = [
  { 
    id: '1', 
    name: 'Ricardo Mendes', 
    role: 'Advogado Sênior', 
    mood: 'Exausto', 
    moodStreak: 2,
    docStatus: 'Pendente', 
    lastFeedback: '15 dias atrás',
    disc: 'C (Conformidade)',
    valorizacao: 'Palavras de Afirmação',
    photo: 'RM',
    saldoHoras: '+24h 10min'
  },
  { 
    id: '2', 
    name: 'Carla Oliveira', 
    role: 'Analista Fiscal', 
    mood: 'Motivado', 
    moodStreak: 0,
    docStatus: 'OK', 
    lastFeedback: '42 dias atrás',
    disc: 'S (Estabilidade)',
    valorizacao: 'Atos de Serviço',
    photo: 'CO',
    saldoHoras: '+08h 45min'
  },
  { 
    id: '3', 
    name: 'Marcos Souza', 
    role: 'Gestor de TI', 
    mood: 'Neutro', 
    moodStreak: 0,
    docStatus: 'OK', 
    lastFeedback: '5 dias atrás',
    disc: 'D (Dominância)',
    valorizacao: 'Tempo de Qualidade',
    photo: 'MS',
    saldoHoras: '+32h 20min'
  },
];

const ManagerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Estados para Motor de Feedback
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pautaResult, setPautaResult] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'Positivo' | 'Negativo' | 'Desenvolvimento'>('Positivo');

  // Estados para Fatos Relevantes
  const [isFactModalOpen, setIsFactModalOpen] = useState(false);
  const [newFact, setNewFact] = useState({ memberId: '', type: 'Feedback', desc: '' });

  // Estado para Solicitações de Jornada
  const [pendingRequests, setPendingRequests] = useState([
    { id: 'req1', name: 'Ricardo Mendes', date: 'Sexta-feira (21/06)', hours: '4h', reason: 'Assuntos Pessoais', saldo: '+24h' },
    { id: 'req2', name: 'Carla Oliveira', date: 'Segunda-feira (24/06)', hours: '2h', reason: 'Consulta Médica', saldo: '+8h' },
  ]);

  const teamEnergy = 85;
  const teamExtraHours = 82; // Exemplo consolidado

  const handlePrepareFeedback = async () => {
    if (!selectedMember) return;
    setIsGenerating(true);
    setPautaResult(null);
    const result = await prepareFeedbackBriefing({
      name: selectedMember.name,
      disc: selectedMember.disc,
      mood: selectedMember.mood,
      type: feedbackType
    });
    setPautaResult(result);
    setIsGenerating(false);
  };

  const handleRequestAction = (id: string, action: 'approve' | 'reject') => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
    alert(action === 'approve' ? 'Solicitação aprovada!' : 'Solicitação recusada.');
  };

  const handleNotifyCompliance = () => {
    alert("Notificação enviada para Ricardo Mendes. Protocolo de cobrança registrado.");
  };

  return (
    <div className="space-y-10 animate-in fade-in pb-24">
      
      {/* 1. DASHBOARD "SAÚDE DO TIME" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Termômetro de Clima */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
           <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32 opacity-50" />
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl shadow-sm"><Thermometer size={24} /></div>
                    <div>
                       <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em]">Saúde Emocional do Time</h3>
                       <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Baseado no Check-in de Humor de Hoje</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-5xl font-black text-ciatos-navy tracking-tighter">{teamEnergy}%</p>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Energia Alta</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Alerta Específico */}
                 <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-start gap-4 animate-pulse">
                    <div className="p-2 bg-red-600 text-white rounded-xl shadow-lg"><UserX size={18} /></div>
                    <div>
                       <p className="text-[11px] font-black text-red-900 leading-tight">Atenção Prioritária</p>
                       <p className="text-xs font-bold text-red-800 mt-1 leading-relaxed">
                          Ricardo Mendes marcou "Exausto" pelo 2º dia seguido. Risco de queda técnica.
                       </p>
                    </div>
                 </div>

                 {/* Insight Advisor */}
                 <div className="bg-ciatos-navy p-6 rounded-3xl text-white relative overflow-hidden">
                    <Sparkles className="absolute top-[-10px] right-[-10px] text-white/10 w-24 h-24" />
                    <div className="flex items-center gap-3 mb-3">
                       <Brain size={16} className="text-ciatos-gold" />
                       <span className="text-[10px] font-black text-ciatos-gold uppercase tracking-widest">Advisor Climate Insight</span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed italic text-gray-300">
                       "O clima geral está 'Neutro'. Que tal um elogio público na reunião de hoje para elevar o engajamento coletivo?"
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Conformidade DP do Time */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
           <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><ShieldAlert size={20} /></div>
                 <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Conformidade DP</h3>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[11px] font-bold text-gray-600">Assinaturas Pendentes</p>
                    <span className="text-lg font-black text-amber-600">02</span>
                 </div>
                 <p className="text-[10px] text-gray-400 font-bold italic leading-relaxed px-1">
                    Ricardo e Fernando ainda não assinaram o holerite deste mês.
                 </p>
              </div>
           </div>
           <button 
             onClick={handleNotifyCompliance}
             className="mt-8 w-full py-4 bg-ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
           >
              <Bell size={14} /> Notificar Todos
           </button>
        </div>
      </div>

      {/* NOVO: GESTÃO DE JORNADA E ESCALA DO TIME */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Resumo Consolidado de Horas */}
         <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] text-gray-50 opacity-10"><Clock size={150} /></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-10">
                  <div className="p-3 bg-ciatos-navy rounded-2xl text-ciatos-gold shadow-lg"><Clock size={20} /></div>
                  <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Saldo do Time (Mês)</h3>
               </div>
               <div className="space-y-2">
                  <p className="text-5xl font-black text-ciatos-navy tracking-tighter">+{teamExtraHours}h</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                     Total de Horas Extras acumuladas pelo seu time neste período.
                  </p>
               </div>
               <div className="mt-10 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
                  <AlertCircle size={24} className="text-amber-600 shrink-0" />
                  <div>
                     <p className="text-[11px] font-black text-amber-900 leading-tight">Alerta de Gestão</p>
                     <p className="text-[10px] font-bold text-amber-800 mt-1">O colaborador **Marcos** está com 32h positivas. Considere dar uma folga para evitar burnout.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Central de Aprovações de Compensação */}
         <div className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm"><CalendarCheck size={20} /></div>
                  <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Solicitações de Compensação</h3>
               </div>
               <span className="bg-ciatos-navy text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{pendingRequests.length} PENDENTES</span>
            </div>
            
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 max-h-[350px]">
               {pendingRequests.length > 0 ? pendingRequests.map(req => (
                  <div key={req.id} className="p-6 bg-gray-50 border border-gray-100 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white hover:border-ciatos-gold/30 transition-all group">
                     <div className="flex items-center gap-5 flex-1">
                        <div className="w-12 h-12 rounded-2xl ciatos-navy text-ciatos-gold flex items-center justify-center font-black text-sm">{req.name[0]}</div>
                        <div>
                           <p className="text-sm font-black text-ciatos-navy">{req.name}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Saldo: <span className="text-ciatos-gold">{req.saldo}</span></p>
                        </div>
                     </div>
                     <div className="flex-1 text-center md:text-left">
                        <p className="text-xs font-bold text-gray-700">{req.date}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Compensação de {req.hours}</p>
                     </div>
                     <div className="flex gap-2">
                        <button 
                          onClick={() => handleRequestAction(req.id, 'reject')}
                          className="p-3 bg-white border border-gray-200 text-gray-400 rounded-xl hover:text-red-500 hover:border-red-200 transition-all"
                        >
                           <Ban size={18} />
                        </button>
                        <button 
                          onClick={() => handleRequestAction(req.id, 'approve')}
                          className="p-3 bg-ciatos-navy text-white rounded-xl shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2 px-5"
                        >
                           <Check size={18} />
                           <span className="text-[9px] font-black uppercase tracking-widest">Aprovar</span>
                        </button>
                     </div>
                  </div>
               )) : (
                  <div className="h-full flex flex-col items-center justify-center py-10 opacity-30 text-center">
                     <CheckCircle2 size={48} className="mb-4 text-emerald-500" />
                     <p className="text-[10px] font-black uppercase tracking-widest">Nenhuma solicitação pendente no momento.</p>
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* 2. QUADRO DE COLABORADORES (Meu Time) */}
      <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-5">
               <div className="p-4 bg-ciatos-navy rounded-3xl text-ciatos-gold shadow-lg"><Users size={28} /></div>
               <h3 className="text-2xl font-black text-ciatos-navy tracking-tight uppercase">Meu Time Estratégico</h3>
            </div>
            <div className="flex gap-4">
               <button 
                 onClick={() => setIsFactModalOpen(true)}
                 className="flex items-center gap-2 px-6 py-4 bg-gray-50 text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-white hover:border-ciatos-gold transition-all"
               >
                  <Plus size={16} /> Registrar Fato Relevante
               </button>
               <button 
                 onClick={() => { setSelectedMember(null); setIsFeedbackModalOpen(true); }}
                 className="flex items-center gap-2 px-8 py-4 bg-ciatos-gold text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
               >
                  <Zap size={16} /> Preparar Pauta de Feedback
               </button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead className="bg-slate-50/50">
                  <tr>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Saldo Banco</th>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Energia/Humor</th>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Documentos</th>
                     <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Último Feedback</th>
                     <th className="px-10 py-6"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {TEAM_MEMBERS.map(member => (
                    <tr key={member.id} className="hover:bg-gray-50/50 transition-all group">
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                             <div className="w-14 h-14 rounded-2xl ciatos-navy text-ciatos-gold flex items-center justify-center font-black text-xl shadow-lg border-2 border-white">{member.photo}</div>
                             <div>
                                <p className="text-base font-black text-ciatos-navy leading-none">{member.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">{member.role}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-center">
                          <span className={`text-xs font-mono font-black ${parseInt(member.saldoHoras) > 30 ? 'text-red-500' : 'text-ciatos-gold'}`}>
                             {member.saldoHoras}
                          </span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex flex-col items-center">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                member.mood === 'Exausto' ? 'bg-red-50 text-red-700 border-red-100' :
                                member.mood === 'Motivado' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                'bg-gray-50 text-gray-600 border-gray-100'
                             }`}>
                                {member.mood}
                             </span>
                             {member.moodStreak > 0 && (
                               <span className="text-[8px] text-red-500 font-black mt-1 uppercase">Padrão: {member.moodStreak} dias</span>
                             )}
                          </div>
                       </td>
                       <td className="px-10 py-8 text-center">
                          <div className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center ${
                             member.docStatus === 'OK' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                             {member.docStatus === 'OK' ? <CheckCircle2 size={18}/> : <FileText size={18}/>}
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <p className="text-xs font-bold text-gray-600">{member.lastFeedback}</p>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <button 
                             onClick={() => navigate(`/employees/${member.id}`)}
                             className="p-3 bg-gray-100 text-gray-400 rounded-xl hover:bg-ciatos-navy hover:text-ciatos-gold transition-all shadow-sm"
                             title="Ver Dossiê 360º"
                          >
                             <Search size={20} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* MODAL: MOTOR DE FEEDBACK ESTRATÉGICO */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-ciatos-navy/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-5xl rounded-[4rem] shadow-2xl overflow-hidden flex h-[85vh]">
              <div className="w-80 ciatos-navy p-12 text-white flex flex-col justify-between hidden lg:flex relative overflow-hidden">
                 <Sparkles className="absolute top-[-30px] left-[-30px] text-white/5 w-64 h-64" />
                 <div className="relative z-10">
                    <div className="p-4 bg-ciatos-gold rounded-3xl w-fit mb-8 shadow-2xl shadow-amber-600/20">
                       <Zap className="text-ciatos-navy" size={32} />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight leading-tight">Motor de Feedback Ciatos</h3>
                    <p className="text-xs text-gray-400 font-medium italic mt-4 leading-relaxed">
                       A IA cruzará DISC, Linguagens de Valorização e Timeline para criar a pauta perfeita.
                    </p>
                 </div>
                 <div className="relative z-10 p-6 bg-white/5 rounded-[2rem] border border-white/10">
                    <p className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em] mb-4">Lembrete do Advisor</p>
                    <p className="text-[11px] font-medium text-gray-300 leading-relaxed italic">
                       "O tom socrático ajuda o liderado a chegar nas próprias conclusões. Priorize perguntas a afirmações."
                    </p>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                 <div className="flex justify-between items-start mb-12">
                    <div>
                       <h4 className="text-3xl font-black text-ciatos-navy tracking-tight">Preparação de Pauta</h4>
                       <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Cruzamento de Dados 360º</p>
                    </div>
                    <button onClick={() => setIsFeedbackModalOpen(false)} className="p-3 text-gray-300 hover:text-red-500 transition-all"><X size={28}/></button>
                 </div>

                 <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Selecione o Liderado</label>
                          <select 
                             className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-sm font-bold text-ciatos-navy outline-none focus:ring-4 focus:ring-ciatos-gold/5"
                             onChange={(e) => setSelectedMember(TEAM_MEMBERS.find(m => m.id === e.target.value))}
                             value={selectedMember?.id || ''}
                          >
                             <option value="">Escolha um colaborador...</option>
                             {TEAM_MEMBERS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                          </select>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Intenção Estratégica</label>
                          <div className="flex gap-2">
                             {['Positivo', 'Negativo', 'Desenvolvimento'].map((t: any) => (
                               <button 
                                 key={t}
                                 onClick={() => setFeedbackType(t)}
                                 className={`flex-1 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                                    feedbackType === t ? 'bg-ciatos-navy text-white border-ciatos-navy shadow-lg' : 'bg-white text-gray-400 border-gray-100'
                                 }`}
                               >
                                  {t}
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    {/* ALERTA DE EMPATIA IA */}
                    {selectedMember?.mood === 'Exausto' && feedbackType === 'Negativo' && (
                       <div className="p-8 bg-red-50 border border-red-100 rounded-[2rem] flex items-center gap-6 animate-in zoom-in">
                          <div className="p-4 bg-red-600 text-white rounded-2xl shadow-lg">
                             <ShieldAlert size={32} />
                          </div>
                          <div>
                             <p className="text-base font-black text-red-900 leading-tight">Advisor Alerta: Momento Inoportuno</p>
                             <p className="text-sm font-bold text-red-800 mt-1 leading-relaxed">
                                Cuidado: O colaborador está em um momento de **baixa energia** (Exausto). Seja extra empático, foque em suporte ou adie a conversa se não for crítica.
                             </p>
                          </div>
                       </div>
                    )}

                    <button 
                       onClick={handlePrepareFeedback}
                       disabled={!selectedMember || isGenerating}
                       className="w-full py-6 bg-ciatos-gold text-ciatos-navy rounded-[1.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-white border-2 border-ciatos-gold transition-all flex items-center justify-center gap-3 disabled:opacity-30"
                    >
                       {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                       {isGenerating ? 'Consolidando Inteligência...' : 'Gerar Roteiro Estratégico'}
                    </button>

                    {pautaResult && (
                       <div className="bg-slate-50 p-10 rounded-[3rem] border border-gray-100 animate-in slide-in-from-bottom-4 relative">
                          <div className="flex items-center gap-4 mb-8">
                             <div className="p-2 bg-ciatos-navy rounded-lg text-ciatos-gold"><ClipboardList size={18}/></div>
                             <h5 className="text-[10px] font-black text-ciatos-navy uppercase tracking-[0.2em]">Roteiro Sugerido pelo Advisor</h5>
                          </div>
                          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-medium italic whitespace-pre-wrap">
                             {pautaResult}
                          </div>
                          <div className="mt-10 flex gap-4">
                             <button className="flex-1 py-4 bg-white border border-gray-200 text-gray-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-ciatos-navy hover:text-ciatos-navy transition-all">Imprimir Guia</button>
                             <button className="flex-1 py-4 bg-ciatos-navy text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">Registrar Feedback no Sistema</button>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: REGISTRAR FATO RELEVANTE */}
      {isFactModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-ciatos-navy/40 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden p-12">
              <div className="flex justify-between items-start mb-10">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-ciatos-gold/10 text-ciatos-gold rounded-2xl"><History size={20}/></div>
                    <div>
                       <h4 className="text-2xl font-black text-ciatos-navy tracking-tight">Fato Relevante</h4>
                       <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Alimente a Timeline para o Futuro</p>
                    </div>
                 </div>
                 <button onClick={() => setIsFactModalOpen(false)} className="p-2 text-gray-300 hover:text-red-500"><X size={24}/></button>
              </div>

              <div className="space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Colaborador</label>
                    <select 
                       className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-ciatos-navy"
                       value={newFact.memberId}
                       onChange={e => setNewFact({...newFact, memberId: e.target.value})}
                    >
                       <option value="">Selecione...</option>
                       {TEAM_MEMBERS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">O que aconteceu? (Fatos & Dados)</label>
                    <textarea 
                       className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-xs font-medium italic min-h-[150px] outline-none focus:ring-2 focus:ring-ciatos-gold transition-all"
                       placeholder="Ex: Entregou o relatório fiscal com erro de cálculo ou Ajudou um colega voluntariamente no projeto X..."
                       value={newFact.desc}
                       onChange={e => setNewFact({...newFact, desc: e.target.value})}
                    />
                 </div>

                 <button 
                   onClick={() => { alert('Fato registrado com sucesso!'); setIsFactModalOpen(false); }}
                   className="w-full py-5 bg-ciatos-navy text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-all"
                 >
                    <Save size={18} /> Salvar na Timeline do Liderado
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Banner de Proteção Final */}
      <div className="bg-slate-50 p-8 rounded-[3rem] border border-gray-100 text-center space-y-4">
         <ShieldCheck size={32} className="text-ciatos-gold mx-auto" />
         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-relaxed max-w-lg mx-auto">
            Advisor de Liderança operando sob os protocolos de Ética e Mérito do Grupo Ciatos. Dados protegidos por criptografia de ponta-a-ponta.
         </p>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-2">
     <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: color}} />
     <span>{label}</span>
  </div>
);

export default ManagerDashboard;
