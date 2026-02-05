
import React, { useState } from 'react';
import { 
  Plus, History, Sparkles, BrainCircuit, RefreshCw, 
  CheckCircle, X, Info, Award, ShieldCheck, 
  Target, GraduationCap, ClipboardCheck, MessageSquare,
  TrendingUp, BarChart3, AlertTriangle
} from 'lucide-react';
import { FeedbackEntry } from '../types';
import { suggestFeedbackApproach } from '../services/geminiService';

const MOCK_FEEDBACKS: FeedbackEntry[] = [
  { 
    id: '1', 
    date: '15 Mai 2024', 
    author: 'Dr. João Diretor', 
    type: 'Reconhecimento', 
    context: 'Condução do Caso Tributário X',
    behavior: 'Excelência técnica e resiliência em audiência crítica.',
    impactTechnical: 'Eliminação de risco trabalhista de R$ 450k.',
    impactBehavioral: 'Inspirou o time de júniors pela calma e precisão.',
    impactCultural: 'Reforçou o valor de Proatividade do Grupo Ciatos.',
    futureGuidance: 'Assumir liderança técnica em novos casos de alta complexidade.'
  }
];

const FeedbackPDI: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  
  // Fix: Corrected type for 'tipo' from FeedbackType (object) to string
  const [formData, setFormData] = useState({
    colaborador: 'Ricardo Mendes',
    tipo: 'Reconhecimento',
    contexto: '',
    comportamento: '',
    impactoTecnico: '',
    impactoComportamental: '',
    impactoCultural: '',
    futuro: ''
  });

  const handleAiHelp = async () => {
    setIsAiLoading(true);
    const suggestion = await suggestFeedbackApproach(
      formData.colaborador, 
      "Analista Sênior (DISC Conformidade)", 
      formData.tipo, 
      formData.comportamento || "Desempenho geral"
    );
    setAiSuggestion(suggestion);
    setIsAiLoading(false);
  };

  const handleFinalize = async () => {
    setShowSyncSuccess(true);
    setTimeout(() => {
      setShowSyncSuccess(false);
      setIsModalOpen(false);
      setAiSuggestion(null);
    }, 3000);
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-ciatos-navy tracking-tight">Gestão de Feedback & Ciclo de Desenvolvimento</h2>
          <p className="text-sm text-gray-500 font-medium">Acompanhamento multidimensional do capital humano Ciatos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 ciatos-navy text-white rounded-2xl text-xs font-bold shadow-xl hover:shadow-navy-900/40 transition-all uppercase tracking-widest"
        >
          <Plus size={18} /> Novo Feedback Estratégico
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-10">
              <History className="text-ciatos-gold" size={24} />
              <h3 className="font-bold text-ciatos-navy uppercase tracking-widest text-xs">Linha do Tempo de Crescimento</h3>
            </div>

            <div className="relative border-l-2 border-gray-100 ml-4 space-y-12 pb-4">
              {MOCK_FEEDBACKS.map((fb) => (
                <div key={fb.id} className="relative pl-12 group">
                  <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full border-4 border-white bg-ciatos-gold shadow-sm group-hover:scale-125 transition-transform" />
                  
                  <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 hover:bg-white hover:border-ciatos-gold/30 transition-all shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                          fb.type === 'Reconhecimento' ? 'bg-green-100 text-green-700' : 
                          fb.type === 'Desenvolvimento' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {fb.type}
                        </span>
                        <h4 className="font-bold text-gray-800 text-lg">{fb.context}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{fb.date}</p>
                        <p className="text-[10px] text-ciatos-navy font-black mt-1 uppercase tracking-tighter">Por {fb.author}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <ImpactBox label="Impacto Técnico" value={fb.impactTechnical} icon={<BarChart3 size={14}/>} />
                      <ImpactBox label="Impacto Comportamental" value={fb.impactBehavioral} icon={<TrendingUp size={14}/>} />
                      <ImpactBox label="Impacto Cultural" value={fb.impactCultural} icon={<Target size={14}/>} />
                    </div>

                    <div className="p-4 bg-ciatos-gold/5 border border-ciatos-gold/20 rounded-2xl">
                       <p className="text-[9px] font-black text-ciatos-gold uppercase tracking-widest flex items-center gap-2 mb-2">
                         <TrendingUp size={12} /> Próximos Passos (PDI)
                       </p>
                       <p className="text-xs text-ciatos-navy font-bold">{fb.futureGuidance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-ciatos-navy text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <Sparkles className="absolute top-[-30px] right-[-30px] text-white/5 w-48 h-48" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <BrainCircuit className="text-ciatos-gold" size={32} />
                <h3 className="font-bold text-xl text-ciatos-gold">Ciclo PDI Ativo</h3>
              </div>
              <div className="space-y-6">
                 <MetricRow label="Reconhecimento" val="65%" color="bg-green-500" />
                 <MetricRow label="Desenvolvimento" val="28%" color="bg-blue-500" />
                 <MetricRow label="Correção" val="7%" color="bg-red-500" />
              </div>
              <div className="mt-10 p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                 <ShieldCheck size={24} className="text-ciatos-gold" />
                 <p className="text-[10px] font-medium leading-relaxed uppercase tracking-widest">Garantia de integridade estratégica Ciatos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ciatos-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden flex h-[90vh]">
            <div className="flex-1 p-12 overflow-y-auto">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-bold text-ciatos-navy">Avaliação Multidimensional</h3>
                  <p className="text-sm text-gray-400 mt-2 font-medium italic">Registre o feedback alinhado à estratégia Ciatos.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-gray-100 rounded-full text-gray-400 transition-all"><X size={28}/></button>
              </div>

              {showSyncSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95">
                   <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-xl">
                      <CheckCircle size={56} />
                   </div>
                   <h4 className="text-2xl font-bold text-ciatos-navy">PDI e Trilha Academy Sincronizados!</h4>
                   <div className="flex gap-4">
                      <SyncTag icon={<ClipboardCheck/>} label="PDI Atualizado" />
                      <SyncTag icon={<GraduationCap/>} label="Treinamento Sugerido" />
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <FormSelect label="Colaborador" options={['Ricardo Mendes', 'Carla Oliveira']} />
                    <div className="grid grid-cols-1 gap-4">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Classificação Estratégica</label>
                       <div className="flex gap-2">
                          {['Reconhecimento', 'Desenvolvimento', 'Correção'].map(t => (
                            <button 
                              key={t}
                              // Fix: Removed unnecessary 'any' cast as 'tipo' is now correctly typed as string
                              onClick={() => setFormData({...formData, tipo: t})}
                              className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                formData.tipo === t ? 'bg-ciatos-gold text-white border-ciatos-gold shadow-lg' : 'bg-white text-gray-400 border-gray-100'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                       </div>
                    </div>
                    <FormTextArea label="Situação/Contexto" val={formData.contexto} setVal={v => setFormData({...formData, contexto: v})} />
                    <FormTextArea label="Comportamento Observado" val={formData.comportamento} setVal={v => setFormData({...formData, comportamento: v})} />
                  </div>

                  <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 space-y-6">
                     <h4 className="text-[10px] font-black text-ciatos-navy uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <BarChart3 size={14} className="text-ciatos-gold"/> Avaliação de Impacto
                     </h4>
                     <FormInput label="Impacto Técnico" val={formData.impactoTecnico} setVal={v => setFormData({...formData, impactoTecnico: v})} />
                     <FormInput label="Impacto Comportamental" val={formData.impactoComportamental} setVal={v => setFormData({...formData, impactoComportamental: v})} />
                     <FormInput label="Impacto Cultural" val={formData.impactoCultural} setVal={v => setFormData({...formData, impactoCultural: v})} />
                     <FormTextArea label="Combinado para o Futuro" val={formData.futuro} setVal={v => setFormData({...formData, futuro: v})} />
                  </div>

                  <div className="md:col-span-2 flex gap-4 pt-6 border-t border-gray-100">
                     <button className="flex-1 py-5 bg-gray-100 text-gray-600 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all">Cancelar Registro</button>
                     <button 
                       onClick={handleFinalize}
                       className="flex-1 py-5 ciatos-navy text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl shadow-navy-900/40 hover:scale-[1.02] active:scale-95 transition-all"
                     >
                       Finalizar & Atualizar Ciclo
                     </button>
                  </div>
                </div>
              )}
            </div>

            {!showSyncSuccess && (
              <div className="w-96 bg-gray-50 border-l border-gray-100 p-10 flex flex-col">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
                   <div className="flex items-center gap-3 text-ciatos-gold font-bold mb-4">
                     <BrainCircuit size={24} />
                     <span className="text-[11px] uppercase tracking-widest">Ciatos AI Support</span>
                   </div>
                   <p className="text-[11px] text-gray-500 leading-relaxed italic">
                      "Utilize tons socráticos para feedbacks de **{formData.tipo}**. Foque no impacto para a unidade do Grupo Ciatos."
                   </p>
                </div>

                <button 
                  onClick={handleAiHelp}
                  disabled={isAiLoading}
                  className="w-full py-5 bg-ciatos-gold text-ciatos-navy rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all border border-ciatos-gold mb-8 shadow-xl shadow-amber-600/20"
                >
                  {isAiLoading ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  Gerar Roteiro Estratégico
                </button>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  {aiSuggestion ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><ClipboardCheck size={14}/> Sugestão de IA Advisor</p>
                        <div className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap bg-white p-6 rounded-2xl border border-gray-100 shadow-sm font-medium">
                          {aiSuggestion}
                        </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <Info size={40} className="text-gray-300 mb-4" />
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Preencha o comportamento para receber análise assistida.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ImpactBox = ({ label, value, icon }: any) => (
  <div className="space-y-2">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </p>
    <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">{value}</p>
  </div>
);

const MetricRow = ({ label, val, color }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-70">
        <span>{label}</span>
        <span>{val}</span>
     </div>
     <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: val }} />
     </div>
  </div>
);

const SyncTag = ({ icon, label }: any) => (
  <div className="px-5 py-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
    <div className="text-ciatos-gold">{icon}</div>
    <span className="text-[10px] font-black text-ciatos-navy uppercase tracking-widest">{label}</span>
  </div>
);

const FormTextArea = ({ label, val, setVal }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <textarea 
      rows={3}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-ciatos-gold focus:bg-white transition-all resize-none shadow-inner"
      placeholder="..."
    />
  </div>
);

const FormInput = ({ label, val, setVal }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <input 
      type="text"
      value={val}
      onChange={(e) => setVal(e.target.value)}
      className="w-full p-4 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:border-ciatos-gold transition-all shadow-sm"
      placeholder="..."
    />
  </div>
);

const FormSelect = ({ label, options }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:border-ciatos-gold shadow-inner font-bold text-ciatos-navy">
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

export default FeedbackPDI;
