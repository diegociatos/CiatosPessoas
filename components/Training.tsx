
import React, { useState } from 'react';
import { 
  PlayCircle, Clock, Award, CheckCircle, Sparkles, 
  BrainCircuit, RefreshCw, ChevronRight, Info,
  ShieldCheck, Zap, Star, Target, GraduationCap,
  ShieldAlert, BarChart3, TrendingUp, BookOpen
} from 'lucide-react';
import { suggestTrainings } from '../services/geminiService';

const COURSES = [
  { id: 1, title: 'Governança LGPD & Compliance Ciatos', duration: '4h 00min', category: 'Compliance', progress: 100, priority: 1 },
  { id: 2, title: 'Prática Jurídica: Tributação de Dividendos', duration: '8h 30min', category: 'Técnico', progress: 45, priority: 2 },
  { id: 3, title: 'Gestão de Pessoas: O Modelo de Liderança Ciatos', duration: '12h 00min', category: 'Liderança', progress: 15, priority: 3 },
];

const Training: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);

  const handleGeneratePath = async () => {
    setIsGenerating(true);
    const mockEmployee = {
      name: 'Ricardo Mendes',
      role: 'Advogado Sênior',
      unit: 'Ciatos Jurídico',
      productivityScore: 92,
      behavioral: { disc: { d: 85, i: 40, s: 60, c: 95 } },
      feedbacks: [{ type: 'Reconhecimento', context: 'Excelência Técnica' }]
    };
    const response = await suggestTrainings(mockEmployee);
    setAiSuggestions(response);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-ciatos-navy tracking-tight">Ciatos Academy</h2>
          <p className="text-sm text-gray-500 font-medium italic">Ecossistema de especialização e conformidade estratégica.</p>
        </div>
        <div className="flex gap-6 items-center bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
           <div className="text-right">
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Capacitação Global (Mês)</p>
             <p className="text-2xl font-black text-ciatos-navy tracking-tighter">14.8k <span className="text-[10px] text-gray-400">HORAS</span></p>
           </div>
           <div className="p-4 bg-ciatos-gold/10 rounded-2xl border border-ciatos-gold/20">
             <Award size={36} className="text-ciatos-gold" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-ciatos-navy rounded-xl">
               <GraduationCap size={20} className="text-ciatos-gold" />
            </div>
            <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em]">Trilhas Ativas por Prioridade</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COURSES.map(course => (
              <div key={course.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group transition-all hover:translate-y-[-8px] hover:shadow-2xl">
                <div className={`h-40 flex flex-col items-center justify-center relative ${course.progress === 100 ? 'bg-emerald-600' : 'bg-ciatos-navy'}`}>
                  <span className="absolute top-6 right-8 text-[8px] font-black text-white/40 uppercase tracking-widest">P{course.priority} Prioridade</span>
                  {course.progress === 100 ? 
                    <CheckCircle size={64} className="text-white/30" /> : 
                    <PlayCircle size={64} className="text-white/10 group-hover:text-ciatos-gold group-hover:scale-110 transition-all" />
                  }
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-black text-ciatos-gold uppercase tracking-[0.15em] px-3 py-1 bg-ciatos-gold/5 border border-ciatos-gold/20 rounded-lg">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-2">
                      <Clock size={14} className="text-ciatos-gold" /> {course.duration}
                    </span>
                  </div>
                  <h3 className="font-bold text-ciatos-navy leading-snug mb-8 text-lg">{course.title}</h3>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mb-3 font-black uppercase tracking-widest">
                      <span>Engajamento do Grupo</span>
                      <span className={course.progress === 100 ? 'text-emerald-600' : 'text-ciatos-navy'}>{course.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden shadow-inner">
                       <div className={`h-full transition-all duration-1000 ${course.progress === 100 ? 'bg-emerald-600' : 'bg-ciatos-gold'}`} style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-ciatos-navy p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden flex flex-col">
              <Sparkles className="absolute top-[-50px] right-[-50px] text-white/5 w-80 h-80 rotate-12" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-ciatos-gold rounded-3xl shadow-xl shadow-amber-600/30">
                    <BrainCircuit size={32} className="text-ciatos-navy" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ciatos-gold tracking-tight">Academy Advisor</h3>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Inteligência Educacional</p>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                   <PriorityItem icon={<ShieldAlert/>} label="1. Compliance & LGPD" active />
                   <PriorityItem icon={<BarChart3/>} label="2. Lacunas Técnicas" active />
                   <PriorityItem icon={<TrendingUp/>} label="3. Liderança Estratégica" active />
                </div>

                <button 
                  onClick={handleGeneratePath}
                  disabled={isGenerating}
                  className="w-full py-5 bg-ciatos-gold text-ciatos-navy rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  {isGenerating ? <RefreshCw size={20} className="animate-spin" /> : <Sparkles size={20} />}
                  {isGenerating ? 'Curando Trilhas...' : 'Gerar Trilha Priorizada'}
                </button>
              </div>
           </div>

           {aiSuggestions && (
             <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl animate-in slide-in-from-right-4 relative">
                <div className="flex items-center gap-3 mb-8">
                   <Zap size={24} className="text-ciatos-gold fill-ciatos-gold" />
                   <h4 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Recomendações IA</h4>
                </div>
                <div className="space-y-4">
                   {aiSuggestions.split('\n').filter(l => l.includes('-') || l.includes('*')).slice(0, 4).map((s, i) => (
                     <div key={i} className="p-5 bg-gray-50/50 rounded-2xl border-l-4 border-ciatos-gold group cursor-pointer hover:bg-white transition-all">
                        <p className="text-[11px] text-gray-600 font-bold leading-relaxed">
                          {s.replace(/^[*-\s]+/, '')}
                        </p>
                        <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[9px] font-black text-ciatos-gold uppercase tracking-widest">Ativar na Trilha</span>
                           <ChevronRight size={14} className="text-ciatos-gold" />
                        </div>
                     </div>
                   ))}
                </div>
                <div className="mt-8 p-5 bg-ciatos-navy text-white rounded-2xl flex items-start gap-4">
                   <Info size={18} className="text-ciatos-gold shrink-0 mt-0.5" />
                   <p className="text-[9px] text-gray-300 leading-relaxed font-medium">
                     A IA priorizou **Compliance Legal** devido à recente atualização das normas processuais para o setor Jurídico.
                   </p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const PriorityItem = ({ icon, label, active }: any) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl border ${active ? 'bg-white/5 border-ciatos-gold/30' : 'opacity-30 border-white/5'}`}>
    <div className="text-ciatos-gold">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-100">{label}</span>
  </div>
);

export default Training;
