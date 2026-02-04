
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell
} from 'recharts';
import { 
  Download, Share2, Printer, Sparkles, BrainCircuit, 
  FileText, TrendingUp, AlertTriangle, Lightbulb, 
  CheckCircle, ChevronRight, RefreshCw, BarChart3,
  ShieldAlert, UserMinus, Target, GraduationCap, Map
} from 'lucide-react';
import { generateStrategicAnalysis } from '../services/geminiService';
import { MOCK_CONTEXT } from '../constants';

const PERFORMANCE_DATA = [
  { name: 'Jurídico', value: 92, status: 'Estável' },
  { name: 'Contábil', value: 78, status: 'Risco' },
  { name: 'RH', value: 85, status: 'Evolução' },
  { name: 'Operações', value: 88, status: 'Estável' },
  { name: 'TI', value: 95, status: 'Alta' },
];

const REPORT_TYPES = [
  { id: 'clima', label: 'Clima Organizacional', icon: <TrendingUp size={18} />, desc: 'Análise de engajamento e eNPS.' },
  { id: 'turnover', label: 'Risco de Turnover', icon: <UserMinus size={18} />, desc: 'Previsão de saídas e retenção.' },
  { id: 'performance', label: 'Performance por Equipe', icon: <BarChart3 size={18} />, desc: 'Métricas de produtividade e entrega.' },
  { id: 'comportamental', label: 'Evolução Comportamental', icon: <BrainCircuit size={18} />, desc: 'Progresso DISC e Soft Skills.' },
  { id: 'cultura', label: 'Aderência Cultural', icon: <Target size={18} />, desc: 'Alinhamento com valores Ciatos.' },
  { id: 'treinamento', label: 'Necessidade de Treinamento', icon: <GraduationCap size={18} />, desc: 'Gaps de competência técnica.' },
  { id: 'gestao', label: 'Gargalos de Gestão', icon: <ShieldAlert size={18} />, desc: 'Riscos de liderança e processos.' },
];

const StrategicReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleGenerateReport = async (type: string) => {
    setSelectedReport(type);
    setIsGenerating(true);
    setAnalysisResult(null);
    
    const label = REPORT_TYPES.find(r => r.id === type)?.label || type;
    const result = await generateStrategicAnalysis(label, MOCK_CONTEXT);
    
    setAnalysisResult(result);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 pb-12">
      {/* Header com context visual */}
      <div className="flex justify-between items-start bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-ciatos-navy">Ciatos Analytics & Strategy</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xl">
            Painel de inteligência de dados para suporte à decisão diretiva do Grupo Ciatos. 
            Análises geradas com base em performance, conformidade e clima.
          </p>
        </div>
        <div className="flex gap-3 relative z-10">
           <button className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-400 transition-all"><Printer size={20} /></button>
           <button className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-400 transition-all"><Share2 size={20} /></button>
           <button className="px-8 py-3 ciatos-navy text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:shadow-navy-900/30 transition-all">
             <Download size={18} /> Exportar Board-Deck
           </button>
        </div>
        <BarChart3 className="absolute right-[-20px] bottom-[-20px] text-gray-50 w-64 h-64 -rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Esquerdo: Menu de Relatórios */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Matrizes Estratégicas</h3>
            <div className="space-y-3">
              {REPORT_TYPES.map((report) => (
                <button
                  key={report.id}
                  onClick={() => handleGenerateReport(report.id)}
                  disabled={isGenerating}
                  className={`w-full text-left p-4 rounded-2xl border transition-all group flex items-start gap-4 ${
                    selectedReport === report.id 
                      ? 'bg-ciatos-navy border-ciatos-navy text-white shadow-lg' 
                      : 'bg-gray-50/50 border-gray-100 text-gray-600 hover:border-ciatos-gold/50'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${selectedReport === report.id ? 'bg-white/10 text-ciatos-gold' : 'bg-white text-gray-400 group-hover:text-ciatos-gold shadow-sm'}`}>
                    {report.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${selectedReport === report.id ? 'text-white' : 'text-gray-800'}`}>
                      {report.label}
                    </p>
                    <p className={`text-[10px] mt-1 leading-tight ${selectedReport === report.id ? 'text-gray-300' : 'text-gray-400'}`}>
                      {report.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-ciatos-gold/10 border border-ciatos-gold/20 p-8 rounded-[2rem]">
             <div className="flex items-center gap-2 text-ciatos-gold font-bold mb-4">
               <Lightbulb size={20} />
               <span className="text-xs uppercase tracking-widest">Insights Rápidos</span>
             </div>
             <p className="text-xs text-ciatos-navy leading-relaxed font-medium">
                O setor **Contábil** apresenta o maior risco de turnover (22%) devido à sazonalidade de carga horária. Recomendamos revisão do banco de horas.
             </p>
          </div>
        </div>

        {/* Lado Direito: Visualização do Relatório */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Gráfico de Contexto Base */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-ciatos-navy uppercase tracking-widest mb-8">Performance Consolidada por Departamento</h3>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={PERFORMANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                       {PERFORMANCE_DATA.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.status === 'Risco' ? '#ef4444' : entry.status === 'Alta' ? '#c5a059' : '#1a2b4b'} />
                       ))}
                    </Bar>
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Resultado da Análise IA */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative min-h-[400px]">
             {isGenerating ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-[3rem]">
                 <div className="p-4 bg-ciatos-navy rounded-full mb-6 animate-pulse">
                   <BrainCircuit className="text-ciatos-gold" size={40} />
                 </div>
                 <h4 className="text-xl font-bold text-ciatos-navy">Gerando Diagnóstico Estratégico...</h4>
                 <p className="text-sm text-gray-400 mt-2">Nossa IA está cruzando dados de 45 colaboradores para este relatório.</p>
                 <div className="flex gap-2 mt-8">
                   <div className="w-2 h-2 bg-ciatos-gold rounded-full animate-bounce" />
                   <div className="w-2 h-2 bg-ciatos-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-2 h-2 bg-ciatos-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                 </div>
               </div>
             ) : analysisResult ? (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                       <FileText className="text-ciatos-gold" size={24} />
                       <div>
                         <h4 className="text-lg font-bold text-ciatos-navy uppercase tracking-widest">
                           {REPORT_TYPES.find(r => r.id === selectedReport)?.label}
                         </h4>
                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Relatório Emitido em {new Date().toLocaleDateString('pt-BR')}</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100 flex items-center gap-1">
                          <CheckCircle size={10} /> Validado por IA
                       </span>
                    </div>
                 </div>

                 <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-8">
                    {/* Renderização Inteligente das Seções do Relatório */}
                    {analysisResult.split('\n\n').map((section, idx) => {
                      if (section.toUpperCase().includes('EXECUTIVO') || section.includes('1.')) {
                        return (
                          <div key={idx} className="bg-gray-50/50 p-6 rounded-2xl border-l-4 border-ciatos-navy">
                             <h5 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em] mb-4">I. Sumário Executivo</h5>
                             <p className="text-sm italic">{section.replace(/^[0-9.]+|EXECUTIVO:/gi, '').trim()}</p>
                          </div>
                        );
                      }
                      if (section.toUpperCase().includes('RISCOS') || section.includes('2.')) {
                        return (
                          <div key={idx} className="bg-red-50/50 p-6 rounded-2xl border-l-4 border-red-500">
                             <h5 className="text-xs font-black text-red-700 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                               <ShieldAlert size={14} /> II. Matriz de Riscos Críticos
                             </h5>
                             <div className="text-sm whitespace-pre-wrap">{section.replace(/^[0-9.]+|RISCOS CRÍTICOS:/gi, '').trim()}</div>
                          </div>
                        );
                      }
                      if (section.toUpperCase().includes('OPORTUNIDADES') || section.includes('3.')) {
                        return (
                          <div key={idx} className="bg-amber-50/50 p-6 rounded-2xl border-l-4 border-ciatos-gold">
                             <h5 className="text-xs font-black text-amber-700 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                               <Lightbulb size={14} /> III. Oportunidades de Alavancagem
                             </h5>
                             <div className="text-sm whitespace-pre-wrap">{section.replace(/^[0-9.]+|OPORTUNIDADES:/gi, '').trim()}</div>
                          </div>
                        );
                      }
                      if (section.toUpperCase().includes('AÇÃO') || section.includes('4.')) {
                        return (
                          <div key={idx} className="bg-ciatos-navy p-8 rounded-2xl text-white shadow-xl">
                             <h5 className="text-xs font-black text-ciatos-gold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                               <CheckCircle size={14} /> IV. Plano de Ação Estratégico (Próximos Passos)
                             </h5>
                             <div className="text-sm whitespace-pre-wrap text-gray-300">{section.replace(/^[0-9.]+|PLANO DE AÇÃO:/gi, '').trim()}</div>
                          </div>
                        );
                      }
                      return <p key={idx} className="text-sm whitespace-pre-wrap px-4">{section}</p>;
                    })}
                 </div>

                 <div className="mt-12 flex justify-end gap-4 pt-8 border-t border-gray-100">
                    <button className="px-6 py-2 bg-gray-100 text-gray-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">Descartar Análise</button>
                    <button className="px-8 py-2 ciatos-gold text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:shadow-amber-600/20 transition-all">Aprovar & Arquivar</button>
                 </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-40">
                  <div className="p-6 bg-gray-50 rounded-full mb-6">
                    <BarChart3 size={60} className="text-gray-300" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-500">Selecione uma Matriz Estratégica</h4>
                  <p className="text-sm text-gray-400 mt-2 max-w-md">Escolha um dos relatórios ao lado para iniciar a geração de inteligência assistida por IA.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicReports;
