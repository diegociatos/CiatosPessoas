
import React, { useState } from 'react';
import { 
  MessageSquare, Calendar, ChevronRight, Target, 
  TrendingUp, Plus, History, Sparkles, User, 
  Info, CheckCircle, X, Send, BrainCircuit,
  Award, AlertCircle, RefreshCw
} from 'lucide-react';
import { FeedbackType, FeedbackEntry } from '../types';
import { suggestFeedbackApproach } from '../services/geminiService';

const MOCK_FEEDBACKS: FeedbackEntry[] = [
  { 
    id: '1', 
    date: '15 Mai 2024', 
    author: 'Dr. João Diretor', 
    type: 'Reconhecimento', 
    context: 'Condução do Caso Ciatos-Log',
    behavior: 'Demonstrou alto domínio técnico e resiliência em audiência complexa.',
    impact: 'Manutenção de contrato chave e redução de provisão passiva em 20%.',
    futureGuidance: 'Assumir liderança de equipe em novos casos de alta complexidade.'
  },
  { 
    id: '2', 
    date: '02 Abr 2024', 
    author: 'RH Ciatos', 
    type: 'Formal', 
    context: 'Revisão Trimestral Q1',
    behavior: 'Consistência nas entregas e pontualidade exemplar.',
    impact: 'Fluidez nos processos internos do departamento jurídico.',
    futureGuidance: 'Iniciar certificação em LGPD Avançado.'
  }
];

const FeedbackPDI: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    colaborador: 'Ricardo Mendes',
    tipo: 'Reconhecimento' as FeedbackType,
    contexto: '',
    comportamento: '',
    impacto: '',
    futuro: ''
  });

  const handleAiHelp = async () => {
    setIsAiLoading(true);
    const suggestion = await suggestFeedbackApproach(
      formData.colaborador, 
      "Analista/Conformidade (Alto DISC C)", 
      formData.tipo, 
      formData.comportamento || "Desempenho geral técnico"
    );
    setAiSuggestion(suggestion);
    setIsAiLoading(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ciatos-navy">Ecossistema de Feedback Estruturado</h2>
          <p className="text-sm text-gray-500">Gestão baseada no modelo SCI+F (Situação, Comportamento, Impacto e Futuro).</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 ciatos-navy text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-navy-900/20 transition-all"
        >
          <Plus size={18} /> Novo Registro de Feedback
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Esquerdo: Linha do Tempo de Feedbacks Recentes */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <History className="text-ciatos-gold" size={20} />
              <h3 className="font-bold text-ciatos-navy uppercase tracking-widest text-sm">Histórico Consolidado (Linha do Tempo)</h3>
            </div>

            <div className="relative border-l-2 border-gray-100 ml-4 space-y-12 pb-4">
              {MOCK_FEEDBACKS.map((fb, i) => (
                <div key={fb.id} className="relative pl-10 group">
                  <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full border-4 border-white bg-ciatos-gold shadow-sm group-hover:scale-125 transition-transform" />
                  
                  <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 hover:border-ciatos-gold/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                          fb.type === 'Reconhecimento' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {fb.type}
                        </span>
                        <h4 className="font-bold text-gray-800 mt-3 text-base">{fb.context}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{fb.date}</p>
                        <p className="text-[10px] text-ciatos-navy font-medium mt-1">Por {fb.author}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Comportamento</p>
                        <p className="text-xs text-gray-600 leading-relaxed italic">"{fb.behavior}"</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Impacto</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{fb.impact}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Orientação Futura</p>
                        <p className="text-xs font-bold text-ciatos-gold leading-relaxed">{fb.futureGuidance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lado Direito: Insights e Board */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-ciatos-navy text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
            <Sparkles className="absolute top-[-20px] right-[-20px] text-white/5 w-40 h-40" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="text-ciatos-gold" />
                <h3 className="font-bold text-lg">Ciatos AI Advisor</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed italic mb-8">
                "O volume de feedbacks de **Reconhecimento** subiu 15% este mês. Isso está correlacionado à estabilidade do clima organizacional no Grupo."
              </p>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                 <h4 className="text-[10px] font-bold text-ciatos-gold uppercase mb-3">Destaque de Liderança</h4>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-ciatos-gold/20 flex items-center justify-center text-ciatos-gold font-bold text-xs">JD</div>
                    <span className="text-xs font-medium">Dr. João é o gestor mais ativo em feedbacks contínuos.</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Award size={18} className="text-ciatos-gold" />
              <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Métricas de Desenvolvimento</h4>
            </div>
            <div className="space-y-6">
               <MetricItem label="Feedback vs Meta" value={85} />
               <MetricItem label="Eficácia dos PDIs" value={72} />
               <MetricItem label="Retenção pós-Feedback" value={98} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Novo Feedback */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ciatos-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex h-[85vh]">
            
            {/* Lado Esquerdo do Modal: Formulário */}
            <div className="flex-1 p-10 overflow-y-auto">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-2xl font-bold text-ciatos-navy">Novo Feedback Estruturado</h3>
                  <p className="text-sm text-gray-400 mt-1">Siga o framework SCI+F para maior eficácia.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X /></button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Colaborador</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-ciatos-gold">
                    <option>Ricardo Mendes</option>
                    <option>Carla Oliveira</option>
                    <option>Ana Silva</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Tipo de Interação</label>
                  <select 
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value as FeedbackType})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-ciatos-gold"
                  >
                    <option>Contínuo</option>
                    <option>Formal</option>
                    <option>Corretivo</option>
                    <option>Reconhecimento</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <FormTextArea 
                  label="1. Situação/Contexto" 
                  placeholder="Onde e quando aconteceu? (Ex: Na reunião técnica de ontem...)" 
                  value={formData.contexto}
                  onChange={(v) => setFormData({...formData, contexto: v})}
                />
                <FormTextArea 
                  label="2. Comportamento Observado" 
                  placeholder="O que exatamente foi feito ou dito? Foque em fatos." 
                  value={formData.comportamento}
                  onChange={(v) => setFormData({...formData, comportamento: v})}
                />
                <FormTextArea 
                  label="3. Impacto Gerado" 
                  placeholder="Qual foi a consequência para o time ou para a Ciatos?" 
                  value={formData.impacto}
                  onChange={(v) => setFormData({...formData, impacto: v})}
                />
                <FormTextArea 
                  label="4. Orientação Futura" 
                  placeholder="Qual o combinado para os próximos passos?" 
                  value={formData.futuro}
                  onChange={(v) => setFormData({...formData, futuro: v})}
                />
              </div>

              <div className="mt-10 flex gap-4">
                <button className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Salvar como Rascunho</button>
                <button className="flex-1 py-4 ciatos-navy text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-navy-900/30 transition-all flex items-center justify-center gap-2">
                   <CheckCircle size={16} /> Finalizar & Registrar
                </button>
              </div>
            </div>

            {/* Lado Direito do Modal: IA Support */}
            <div className="w-80 bg-gray-50 border-l border-gray-100 p-8 flex flex-col">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
                 <div className="flex items-center gap-2 text-ciatos-gold font-bold mb-3">
                   <BrainCircuit size={16} />
                   <span className="text-[10px] uppercase tracking-wider">Dica de Abordagem</span>
                 </div>
                 <p className="text-[11px] text-gray-500 leading-relaxed italic">
                    "O colaborador alvo possui perfil **Conformidade**. Ao dar o feedback, seja específico com dados e evite subjetividades."
                 </p>
              </div>

              <button 
                onClick={handleAiHelp}
                disabled={isAiLoading}
                className="w-full py-3 bg-ciatos-gold text-ciatos-navy rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all border border-ciatos-gold mb-6"
              >
                {isAiLoading ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Pedir Sugestão de Roteiro
              </button>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {aiSuggestion ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Roteiro Sugerido</p>
                    <div className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      {aiSuggestion}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <Info size={32} className="text-gray-300 mb-3" />
                    <p className="text-[10px] text-gray-400 font-medium">Preencha o comportamento para receber apoio da IA Advisor.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

const FormTextArea = ({ label, placeholder, value, onChange }: { label: string, placeholder: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase px-1">{label}</label>
    <textarea 
      rows={2}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-ciatos-gold focus:bg-white transition-all resize-none"
      placeholder={placeholder}
    />
  </div>
);

const MetricItem = ({ label, value }: { label: string, value: number }) => (
  <div>
    <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1.5 uppercase">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
      <div className="h-full bg-ciatos-gold" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default FeedbackPDI;
