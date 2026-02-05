
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, User, History, ShieldCheck, 
  CheckCircle, AlertCircle, Clock, Calendar, AlertTriangle,
  Sparkles, Brain, MessageSquareText, Star, RefreshCw, 
  Trash2, X, Activity, ShieldAlert, Plus, Save,
  MoreVertical, ChevronRight, Eye, FileBadge, UserCog,
  Shield, BadgeCheck, Archive, Lock, CheckSquare, List,
  TrendingUp, DollarSign, Briefcase, HeartPulse, FileUp
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

const EmployeeDossier: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'timeline' | 'docs' | 'contratual' | 'saude'>('timeline');
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  // Estados para novas ações de execução
  const [isEditingContract, setIsEditingContract] = useState(false);
  const [contractData, setContractData] = useState({ role: 'Advogado Sênior', salary: 'R$ 12.500,00', unit: 'Ciatos Jurídico' });

  const negativePatternAlert = useMemo(() => {
    const warnings = timeline.filter(e => e.type === 'Advertência');
    if (warnings.length >= 3) return { level: 'Crítico', message: 'Risco Disciplinar: 3 advertências acumuladas.' };
    return null;
  }, [timeline]);

  const handleUpdateContract = () => {
    const event: TimelineEvent = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      type: 'Neutro',
      category: 'Compliance',
      description: `Alteração Contratual: Novo Cargo: ${contractData.role} | Salário atualizado.`,
      author: 'Lidiane Silva (RH)'
    };
    setTimeline([event, ...timeline]);
    setIsEditingContract(false);
    alert("Alteração contratual registrada com sucesso!");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in pb-20">
      
      {/* HEADER EXECUTIVO COM AÇÕES RÁPIDAS */}
      <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm flex flex-col xl:flex-row justify-between items-center gap-10 relative overflow-hidden">
        <div className="flex items-center gap-8 relative z-10">
          <button onClick={() => navigate('/employees')} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 text-gray-400 transition-all"><ArrowLeft size={24} /></button>
          <div className="w-24 h-24 rounded-[2.5rem] ciatos-navy text-ciatos-gold flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white">
            RM
          </div>
          <div>
            <h2 className="text-4xl font-black text-ciatos-navy tracking-tight">Ricardo Mendes</h2>
            <p className="text-lg font-bold text-ciatos-gold uppercase tracking-widest">{contractData.role} • {contractData.unit}</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <button 
             onClick={() => setIsEventModalOpen(true)}
             className="px-8 py-4 bg-gray-50 text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-200 hover:bg-white transition-all flex items-center gap-2 shadow-sm"
           >
              <FileUp size={16} /> Anexar Documento Histórico
           </button>
           <button 
             onClick={() => setActiveTab('contratual')}
             className="px-10 py-5 ciatos-navy text-white rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2"
           >
              <DollarSign size={18} /> Alterar Cargo / Salário
           </button>
        </div>
      </div>

      {/* TABS DE GESTÃO */}
      <div className="flex gap-8 border-b border-gray-100 px-6">
        <TabBtn label="Timeline & Mérito" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} icon={<History size={16}/>} />
        <TabBtn label="Execução Contratual" active={activeTab === 'contratual'} onClick={() => setActiveTab('contratual')} icon={<Briefcase size={16}/>} />
        <TabBtn label="Saúde Ocupacional" active={activeTab === 'saude'} onClick={() => setActiveTab('saude')} icon={<HeartPulse size={16}/>} />
        <TabBtn label="Documentos DP" active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} icon={<Archive size={16}/>} />
      </div>

      {/* CONTEÚDO DAS ABAS */}
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
             <div className="lg:col-span-8 space-y-8">
                {negativePatternAlert && (
                  <div className="p-8 bg-red-50 border border-red-200 rounded-[2.5rem] flex items-center gap-6 animate-pulse text-red-900 shadow-xl">
                     <ShieldAlert size={32} />
                     <p className="text-lg font-black">{negativePatternAlert.message}</p>
                  </div>
                )}
                <div className="bg-white p-10 rounded-[4rem] border border-gray-100 shadow-sm relative overflow-hidden">
                   <div className="flex justify-between items-center mb-12">
                      <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest flex items-center gap-3"><List size={18} /> Histórico Estratégico</h3>
                      <button onClick={() => setIsEventModalOpen(true)} className="text-[10px] font-black text-ciatos-gold uppercase tracking-widest">+ Novo Fato</button>
                   </div>
                   <div className="relative border-l-2 border-gray-50 ml-6 space-y-12 pb-8">
                      {timeline.map(event => (
                        <div key={event.id} className="relative pl-12">
                           <div className={`absolute left-[-11px] top-0 w-5 h-5 rounded-full border-4 border-white ${event.type === 'Elogio' ? 'bg-emerald-500' : event.type === 'Advertência' ? 'bg-red-500' : 'bg-ciatos-navy'}`} />
                           <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 hover:bg-white hover:border-ciatos-gold/30 transition-all shadow-sm">
                              <div className="flex justify-between mb-2">
                                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{event.date} • {event.category}</span>
                                 <span className="text-[9px] font-black uppercase text-ciatos-navy opacity-50">{event.author}</span>
                              </div>
                              <p className="text-sm font-bold text-ciatos-navy leading-relaxed italic">"{event.description}"</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
             <div className="lg:col-span-4">
                <div className="bg-ciatos-navy p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-l-[16px] border-l-ciatos-gold">
                   <Brain className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
                   <div className="flex items-center gap-4 mb-10">
                      <Sparkles className="text-ciatos-gold" size={24} />
                      <h4 className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em]">Pauta Advisor para Lidiane</h4>
                   </div>
                   <p className="text-xs text-gray-300 font-bold leading-relaxed italic">"Baseado na última alteração contratual e no elogio de 10/06, o colaborador está pronto para um aumento de responsabilidades técnica."</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'contratual' && (
          <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm max-w-4xl mx-auto space-y-12">
             <div className="flex justify-between items-start">
                <div>
                   <h3 className="text-2xl font-black text-ciatos-navy uppercase tracking-tight">Gestão de Remuneração & Cargo</h3>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 italic">Alterações geram registro automático na timeline do colaborador.</p>
                </div>
                <TrendingUp size={48} className="text-ciatos-gold/20" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormGroup label="Cargo Atual">
                   <input 
                     className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-ciatos-navy outline-none focus:ring-4 focus:ring-ciatos-gold/5"
                     value={contractData.role}
                     onChange={e => setContractData({...contractData, role: e.target.value})}
                   />
                </FormGroup>
                <FormGroup label="Salário Base">
                   <input 
                     className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-ciatos-navy outline-none focus:ring-4 focus:ring-ciatos-gold/5"
                     value={contractData.salary}
                     onChange={e => setContractData({...contractData, salary: e.target.value})}
                   />
                </FormGroup>
             </div>

             <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                <AlertCircle size={24} className="text-amber-600 shrink-0" />
                <p className="text-xs font-bold text-amber-800 leading-relaxed italic">
                  Atenção: Mudanças salariais devem respeitar a convenção coletiva do setor Jurídico vigente. O Advisor recomenda verificar o teto para o cargo de Sênior.
                </p>
             </div>

             <div className="flex justify-end gap-6 pt-10 border-t border-gray-50">
                <button className="px-10 py-5 bg-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest">Descartar</button>
                <button onClick={handleUpdateContract} className="px-12 py-5 ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Salvar & Registrar Evento</button>
             </div>
          </div>
        )}

        {activeTab === 'saude' && (
           <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm max-w-4xl mx-auto space-y-12">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-black text-ciatos-navy uppercase tracking-tight">Vencimento de Exames (ASO)</h3>
                 <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-4 py-2 rounded-full border border-amber-100">VENCE EM 32 DIAS</span>
              </div>
              <div className="space-y-6">
                 <div className="p-8 bg-gray-50 border border-gray-100 rounded-3xl flex items-center justify-between group hover:bg-white hover:border-ciatos-gold transition-all">
                    <div className="flex items-center gap-6">
                       <div className="p-4 bg-white rounded-2xl text-ciatos-navy shadow-sm group-hover:bg-ciatos-navy group-hover:text-ciatos-gold transition-colors"><HeartPulse size={24}/></div>
                       <div>
                          <p className="text-sm font-black text-ciatos-navy">Exame Periódico Anual</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Último: 15/07/2023 | Próximo: 15/07/2024</p>
                       </div>
                    </div>
                    <button className="px-6 py-3 bg-ciatos-gold text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Agendar Agora</button>
                 </div>
              </div>
           </div>
        )}
      </div>

      {/* MODAL NOVO REGISTRO / DOCUMENTO */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-ciatos-navy/40 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden p-12">
              <div className="flex justify-between items-start mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-ciatos-navy">Adicionar Registro / Documento</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 italic">Vincule documentos históricos ao dossiê funcional.</p>
                 </div>
                 <button onClick={() => setIsEventModalOpen(false)} className="p-3 text-gray-300 hover:text-red-500 transition-all"><X size={28}/></button>
              </div>

              <div className="space-y-8">
                 <FormGroup label="Arquivo do Documento">
                    <div className="border-4 border-dashed border-gray-100 rounded-3xl p-10 flex flex-col items-center justify-center group hover:border-ciatos-gold transition-all cursor-pointer bg-gray-50">
                       <FileUp size={48} className="text-gray-300 group-hover:text-ciatos-gold group-hover:scale-110 transition-all mb-4" />
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-ciatos-navy">Clique para selecionar PDF ou Imagem</span>
                    </div>
                 </FormGroup>
                 <FormGroup label="Descrição do Fato/Documento">
                    <textarea 
                      className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-xs font-medium italic min-h-[120px] outline-none focus:ring-2 focus:ring-ciatos-gold" 
                      placeholder="Ex: Entrega de certificado de pós-graduação ou advertência disciplinar..."
                    />
                 </FormGroup>
                 <button onClick={() => setIsEventModalOpen(false)} className="w-full py-6 ciatos-navy text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-105 transition-all">Registrar no Dossiê</button>
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

const FormGroup = ({ label, children }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    {children}
  </div>
);

export default EmployeeDossier;
