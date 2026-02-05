
import React from 'react';
import { 
  ShieldAlert, Users, FileText, TrendingUp, AlertTriangle, 
  Target, Briefcase, ChevronRight, CheckCircle2, Clock, 
  Sparkles, BrainCircuit, BarChart3, GraduationCap, Thermometer,
  UserX, Coffee
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
            <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Visão RH: Lidiane</h2>
            <p className="text-sm text-gray-500 font-medium italic mt-2">Sumário de conformidade e monitoramento de clima.</p>
          </div>
        </div>
      </div>

      {/* ALERTAS PRIVADOS DE CLIMA (SAÚDE MENTAL) */}
      <div className="bg-red-50 p-10 rounded-[4rem] border border-red-100 shadow-sm animate-in zoom-in">
         <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg"><UserX size={24} /></div>
            <h3 className="text-xs font-black text-red-900 uppercase tracking-[0.2em]">Alertas de Baixa Energia Persistente (Sigiloso)</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PrivateAlertItem 
              name="Carla Oliveira" 
              days={3} 
              cause="Interno (Gargalo em Processo)" 
              unit="Contábil" 
              msg="Atenção: Carla apresenta baixa energia por 3 dias seguidos. Sugerida abordagem preventiva."
            />
            <PrivateAlertItem 
              name="Ricardo Mendes" 
              days={4} 
              cause="Externo (Pessoal)" 
              unit="Jurídico" 
              msg="Atenção: Ricardo solicitou espaço. Monitorar se a performance técnica é impactada."
            />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-10">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><FileText size={24} /></div>
                     <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Conformidade: Documentos Faltantes</h3>
                  </div>
               </div>
               <div className="space-y-4">
                  <PendingItem name="Ricardo Mendes" unit="Jurídico" doc="Holerite" status="Urgente" />
                  <PendingItem name="Marcos Souza" unit="Log" doc="Holerite" status="Pendente" />
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-10">
            <div className="bg-ciatos-navy p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-l-[16px] border-l-ciatos-gold">
               <BrainCircuit className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
               <div className="flex items-center gap-4 mb-10">
                  <Sparkles className="text-ciatos-gold" size={24} />
                  <h3 className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em]">IA Advisor Insight</h3>
               </div>
               <p className="text-lg font-bold text-white leading-relaxed italic mb-8">
                 "O volume de documentos pendentes subiu 15%. Recomenda-se automação de lembretes."
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

const PrivateAlertItem = ({ name, days, unit, cause, msg }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-red-200 flex flex-col justify-between group hover:shadow-xl transition-all">
     <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 rounded-xl bg-gray-50 text-red-600 flex items-center justify-center font-black text-sm">{name[0]}</div>
           <div>
              <p className="text-sm font-black text-ciatos-navy">{name}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase">{unit} • Recorrência: {days} dias</p>
           </div>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-[8px] font-black uppercase">Crítico</span>
     </div>
     <p className="text-xs font-bold text-red-800 italic leading-relaxed mb-6">"{msg}"</p>
     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Causa: {cause}</span>
        <button className="p-2 bg-ciatos-navy text-white rounded-lg hover:scale-110 transition-all"><Coffee size={14}/></button>
     </div>
  </div>
);

const PendingItem = ({ name, unit, doc, status }: any) => (
  <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white transition-all">
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center font-black text-xs">{name[0]}</div>
        <div>
           <p className="text-sm font-black text-ciatos-navy">{name}</p>
           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{unit} • {doc}</p>
        </div>
     </div>
     <span className={`px-4 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${status === 'Urgente' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>{status}</span>
  </div>
);

export default RHOverview;
