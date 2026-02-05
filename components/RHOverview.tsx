
import React from 'react';
import { 
  ShieldAlert, Users, FileText, TrendingUp, AlertTriangle, 
  Target, Briefcase, ChevronRight, CheckCircle2, Clock, 
  Sparkles, BrainCircuit, BarChart3, GraduationCap, Thermometer,
  UserX, Coffee, Trophy, Coins, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RHOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-in fade-in pb-16">
      {/* HEADER VISÃO RH */}
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="p-5 ciatos-navy rounded-3xl text-ciatos-gold shadow-2xl border-4 border-white">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Gestão Global: Lidiane</h2>
            <p className="text-sm text-gray-500 font-medium italic mt-2">Monitoramento de conformidade, jornada e cultura organizacional.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* COLUNA ESQUERDA: ALERTAS E CONFORMIDADE */}
         <div className="lg:col-span-8 space-y-10">
            {/* ALERTAS DE HUMOR */}
            <div className="bg-red-50 p-10 rounded-[4rem] border border-red-100 shadow-sm">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg"><UserX size={24} /></div>
                  <h3 className="text-xs font-black text-red-900 uppercase tracking-[0.2em]">Alertas de Saúde Mental (SIGILOSO)</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PrivateAlertItem name="Carla Oliveira" days={3} unit="Contábil" msg="Carla marcou 'Exausto' por 3 dias. Sugerida abordagem preventiva." />
                  <PrivateAlertItem name="Ricardo Mendes" days={2} unit="Jurídico" msg="Ricardo apresenta tendência de queda no humor após picos de jornada." />
               </div>
            </div>

            {/* RELATÓRIO DE ENGAJAMENTO */}
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Activity size={24} /></div>
                     <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Ranking de Engajamento (Ciatos Coins)</h3>
                  </div>
                  <button className="text-[10px] font-black text-ciatos-gold uppercase tracking-widest">Ver Todos</button>
               </div>
               <div className="space-y-6">
                  <EngagementItem name="Marcos Souza" score={245} unit="Tecnologia" active />
                  <EngagementItem name="Juliana Torres" score={210} unit="Jurídico" active />
                  <EngagementItem name="Fernando Silva" score={185} unit="Contábil" active />
               </div>
            </div>
         </div>

         {/* COLUNA DIREITA: INSIGHTS IA */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-ciatos-navy p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-l-[16px] border-l-ciatos-gold">
               <BrainCircuit className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
               <div className="flex items-center gap-4 mb-8">
                  <Sparkles className="text-ciatos-gold" size={24} />
                  <h3 className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em]">IA Advisor Insight</h3>
               </div>
               <div className="space-y-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-sm font-bold text-ciatos-gold leading-tight mb-2">Impacto Cultural</p>
                     <p className="text-xs text-gray-300 italic leading-relaxed">"O engajamento no **Ciatos Jurídico** subiu 15% após a implementação dos Ciatos Coins."</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-sm font-bold text-ciatos-gold leading-tight mb-2">Conformidade DP</p>
                     <p className="text-xs text-gray-300 italic leading-relaxed">"A taxa de assinatura de holerites na **Log** está 20% abaixo da meta. Recomendamos notificação direta."</p>
                  </div>
               </div>
               <button className="mt-8 w-full py-4 bg-ciatos-gold text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Consolidar Reporte de Board</button>
            </div>
            
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm text-center space-y-4">
               <Trophy size={48} className="text-ciatos-gold mx-auto" />
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta de Retenção (LTM)</p>
               <p className="text-4xl font-black text-ciatos-navy">94%</p>
               <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Superior ao Benchmark</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const PrivateAlertItem = ({ name, unit, msg }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-red-100 flex flex-col justify-between hover:shadow-lg transition-all group">
     <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 text-red-600 flex items-center justify-center font-black text-xs">{name[0]}</div>
        <div>
           <p className="text-xs font-black text-ciatos-navy leading-none">{name}</p>
           <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">{unit}</p>
        </div>
     </div>
     <p className="text-[11px] font-bold text-red-800 italic leading-relaxed">"{msg}"</p>
  </div>
);

const EngagementItem = ({ name, score, unit }: any) => (
  <div className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:bg-white transition-all">
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl ciatos-navy text-ciatos-gold flex items-center justify-center font-black text-xs">{name[0]}</div>
        <div>
           <p className="text-sm font-black text-ciatos-navy">{name}</p>
           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{unit}</p>
        </div>
     </div>
     <div className="flex items-center gap-3">
        <Coins size={14} className="text-ciatos-gold" />
        <span className="text-sm font-black text-ciatos-navy">{score} pts</span>
     </div>
  </div>
);

export default RHOverview;
