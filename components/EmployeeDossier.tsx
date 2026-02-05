
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, User, History, ShieldCheck, 
  CheckCircle, AlertCircle, Clock, Calendar, AlertTriangle,
  Sparkles, Brain, MessageSquareText, Star, RefreshCw, 
  Trash2, X, Activity, ShieldAlert, Plus, Save,
  MoreVertical, ChevronRight, Eye, FileBadge, UserCog,
  Shield, BadgeCheck, Archive, Lock, CheckSquare, List
} from 'lucide-react';
import { EmployeeStatus, TimelineEvent, MonthlyDocStatus, EmployeeDocument, TimelineEventType, TimelineCategory } from '../types';
import { prepareFeedbackBriefing } from '../services/geminiService';

const MOCK_MONTHLY_DOCS: MonthlyDocStatus[] = [
  { month: 'Jun', year: 2024, holerite: 'OK', ponto: 'OK', recibos: 'OK', outros: 'N/A' },
  { month: 'Mai', year: 2024, holerite: 'OK', ponto: 'OK', recibos: 'OK', outros: 'OK' },
];

const INITIAL_TIMELINE: TimelineEvent[] = [
  { id: '1', date: '10/06/2024', type: 'Elogio', category: 'Entrega', description: 'Entrega excepcional do relatório tributário anual com 2 dias de antecedência.', author: 'Lidiane (RH)' },
  { id: '2', date: '05/06/2024', type: 'Feedback', category: 'Relacionamento', description: 'Feedback de alinhamento sobre comunicação interna com o time paralegal.', author: 'Dr. João (Gestor)' },
  { id: '3', date: '28/05/2024', type: 'Advertência', category: 'Prazos', description: 'Atraso na entrega do fechamento mensal sem justificativa prévia.', author: 'Dr. João (Gestor)' },
];

const getEmployeeData = (id: string) => ({
  id,
  name: 'Ricardo Mendes',
  role: 'Advogado Sênior',
  department: 'Jurídico',
  unit: 'Ciatos Jurídico',
  status: EmployeeStatus.ACTIVE,
  emotionalTrend: [{ day: 'Seg', val: 80 }, { day: 'Ter', val: 85 }],
  documents: [],
  monthlyCompliance: MOCK_MONTHLY_DOCS,
  behavioral: { disc: [{ subject: 'C', A: 95, fullMark: 100 }] },
  managerGuide: { howToCommunicate: [] }
});

const EmployeeDossier: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = getEmployeeData(id || '1');
  
  const [activeTab, setActiveTab] = useState<'docs' | 'perfil' | 'timeline'>('timeline');
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE);
  const [briefing, setBriefing] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  const [newEvent, setNewEvent] = useState({
    type: 'Feedback' as TimelineEventType,
    category: 'Comportamento' as TimelineCategory,
    description: '',
    isPrivate: false
  });

  // Lógica de Alertas de Padrão Negativo
  // Fix: useMemo is now imported from 'react' to resolve the undefined error
  const negativePatternAlert = useMemo(() => {
    const warnings = timeline.filter(e => e.type === 'Advertência');
    if (warnings.length >= 3) {
      return {
        level: 'Crítico',
        message: 'Atenção: Colaborador com 3 ou mais advertências acumuladas. Risco de desligamento ou medida disciplinar severa.'
      };
    }
    const recentNegative = timeline.filter(e => (e.type === 'Negativo' || e.type === 'Advertência')).length;
    if (recentNegative >= 2) {
      return {
        level: 'Moderado',
        message: 'Padrão de performance negativo detectado nos últimos registros. Recomenda-se reunião de alinhamento urgente.'
      };
    }
    return null;
  }, [timeline]);

  const handleAddEvent = () => {
    const event: TimelineEvent = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      type: newEvent.type,
      category: newEvent.category,
      description: newEvent.description,
      author: 'Diretoria (Logado)',
      isPrivate: newEvent.isPrivate
    };
    setTimeline([event, ...timeline]);
    setIsEventModalOpen(false);
    setNewEvent({ type: 'Feedback', category: 'Comportamento', description: '', isPrivate: false });
  };

  const handleGenerateBriefing = async () => {
    setIsAnalyzing(true);
    const result = await prepareFeedbackBriefing({
      ...data,
      eventTimeline: timeline,
      monthlyCompliance: data.monthlyCompliance
    });
    setBriefing(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in pb-12">
      
      {/* HEADER EXECUTIVO */}
      <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="flex items-center gap-8 relative z-10">
          <button onClick={() => navigate('/employees')} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 text-gray-400 transition-all"><ArrowLeft size={24} /></button>
          <div className="w-24 h-24 rounded-[2rem] ciatos-navy text-ciatos-gold flex items-center justify-center text-4xl font-black shadow-2xl">
            {data.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-4xl font-black text-ciatos-navy tracking-tight">{data.name}</h2>
            <p className="text-lg font-bold text-ciatos-gold">{data.role} • {data.unit}</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
          <button 
            onClick={handleGenerateBriefing}
            disabled={isAnalyzing}
            className="px-10 py-5 ciatos-navy text-ciatos-gold rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 transition-all"
          >
            {isAnalyzing ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
            Preparar Feedback Baseado em Dados
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-8 border-b border-gray-100 px-4">
        <TabBtn label="Fatos Relevantes (Timeline)" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} icon={<History size={16}/>} />
        <TabBtn label="Perfil Humano" active={activeTab === 'perfil'} onClick={() => setActiveTab('perfil')} icon={<Brain size={16}/>} />
        <TabBtn label="Conformidade & DP" active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} icon={<ShieldCheck size={16}/>} />
      </div>

      {/* ABA TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
          
          {/* PAINEL DE ALERTAS IA */}
          {negativePatternAlert && (
            <div className={`p-8 rounded-[2.5rem] border flex items-center gap-6 shadow-xl animate-pulse ${
              negativePatternAlert.level === 'Crítico' ? 'bg-red-50 border-red-200 text-red-900' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className={`p-4 rounded-2xl ${negativePatternAlert.level === 'Crítico' ? 'bg-red-600' : 'bg-amber-600'} text-white shadow-lg`}>
                <ShieldAlert size={32} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Alerta de Gestão Ciatos</p>
                <p className="text-lg font-black leading-tight mt-1">{negativePatternAlert.message}</p>
              </div>
              <button className="px-8 py-3 bg-white/20 hover:bg-white/40 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Ver Detalhes</button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LINHA DO TEMPO CRONOLÓGICA */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-ciatos-navy/5 rounded-2xl text-ciatos-navy"><List size={24} /></div>
                      <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Histórico de Eventos Estratégicos</h3>
                   </div>
                   <button 
                    onClick={() => setIsEventModalOpen(true)}
                    className="flex items-center gap-3 px-6 py-3 bg-ciatos-gold text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                   >
                     <Plus size={16} /> Novo Registro
                   </button>
                </div>

                <div className="relative border-l-2 border-gray-100 ml-6 space-y-12 pb-8">
                   {timeline.map((event) => (
                      <div key={event.id} className="relative pl-12 group">
                         <div className={`absolute left-[-11px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-md transition-transform group-hover:scale-125 ${
                            event.type === 'Elogio' ? 'bg-emerald-500' : 
                            event.type === 'Advertência' ? 'bg-red-500' : 
                            event.type === 'Feedback' ? 'bg-ciatos-navy' : 'bg-gray-300'
                         }`} />
                         
                         <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:border-ciatos-gold/30 transition-all shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-3">
                                  <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                     event.type === 'Elogio' ? 'bg-emerald-50 text-emerald-700' : 
                                     event.type === 'Advertência' ? 'bg-red-50 text-red-700' : 
                                     'bg-ciatos-navy text-white'
                                  }`}>
                                     {event.type}
                                  </span>
                                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{event.category}</span>
                               </div>
                               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{event.date}</p>
                            </div>
                            <p className="text-sm font-bold text-ciatos-navy leading-relaxed mb-6 italic">"{event.description}"</p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100/50">
                               <p className="text-[9px] text-gray-400 font-black uppercase">Registrado por: {event.author}</p>
                               {event.isPrivate && <Lock size={12} className="text-gray-300" />}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            </div>

            {/* COLUNA DE APOIO AO GESTOR */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-ciatos-navy p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-l-[16px] border-l-ciatos-gold">
                  <Brain className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
                  <div className="flex items-center gap-4 mb-8">
                     <Sparkles className="text-ciatos-gold" size={24} />
                     <h4 className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em]">IA Advisor: Pauta de Feedback</h4>
                  </div>
                  <div className="prose prose-sm prose-invert max-w-none text-gray-300 font-bold leading-relaxed italic text-xs whitespace-pre-wrap">
                     {briefing || "Clique em 'Preparar Feedback' para gerar um roteiro estratégico baseado no histórico acima."}
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <CheckSquare size={14} className="text-ciatos-gold" /> Próximos Passos Sugeridos
                  </h4>
                  <div className="space-y-4">
                     <NextStepItem text="Realizar feedback 1:1 de correção técnica." done={false} />
                     <NextStepItem text="Ativar curso de Comunicação Assertiva." done={true} />
                     <NextStepItem text="Revisar metas do próximo trimestre." done={false} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NOVO REGISTRO */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ciatos-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden p-12">
              <div className="flex justify-between items-start mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-ciatos-navy">Novo Registro na Timeline</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Garantia de Memória Institucional</p>
                 </div>
                 <button onClick={() => setIsEventModalOpen(false)} className="p-3 text-gray-300 hover:text-red-500 transition-all"><X size={28}/></button>
              </div>

              <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <FormGroup label="Tipo de Evento">
                       <select 
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-ciatos-navy"
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value as any})}
                       >
                          <option>Feedback</option>
                          <option>Elogio</option>
                          <option>Advertência</option>
                          <option>Ocorrência</option>
                       </select>
                    </FormGroup>
                    <FormGroup label="Categoria">
                       <select 
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-ciatos-navy"
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({...newEvent, category: e.target.value as any})}
                       >
                          <option>Comportamento</option>
                          <option>Entrega</option>
                          <option>Prazos</option>
                          <option>Relacionamento</option>
                       </select>
                    </FormGroup>
                 </div>

                 <FormGroup label="Descrição Detalhada (Fatos & Dados)">
                    <textarea 
                      className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-xs font-medium italic min-h-[150px] outline-none focus:ring-2 focus:ring-ciatos-gold transition-all"
                      placeholder="Descreva o evento com precisão, evitando adjetivos vazios..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    />
                 </FormGroup>

                 <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-gray-100">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-ciatos-gold focus:ring-ciatos-gold" 
                      checked={newEvent.isPrivate}
                      onChange={(e) => setNewEvent({...newEvent, isPrivate: e.target.checked})}
                    />
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tornar este registro confidencial (RH & Diretoria apenas)</label>
                 </div>

                 <div className="flex gap-4 pt-6">
                    <button onClick={() => setIsEventModalOpen(false)} className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">Cancelar</button>
                    <button onClick={handleAddEvent} className="flex-[2] py-5 ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                       <Save size={18} /> Salvar no Dossiê
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ label, active, onClick, icon }: any) => (
  <button onClick={onClick} className={`pb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all ${active ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400 hover:text-ciatos-navy'}`}>
    {icon} {label}
  </button>
);

const NextStepItem = ({ text, done }: { text: string; done: boolean }) => (
  <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${done ? 'bg-emerald-50 border-emerald-100 opacity-60' : 'bg-white border-gray-100'}`}>
     <div className={`p-1 rounded-lg ${done ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-300'}`}>
        <CheckCircle size={14} />
     </div>
     <span className={`text-[11px] font-bold ${done ? 'line-through text-gray-400' : 'text-ciatos-navy'}`}>{text}</span>
  </div>
);

const FormGroup = ({ label, children }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    {children}
  </div>
);

export default EmployeeDossier;