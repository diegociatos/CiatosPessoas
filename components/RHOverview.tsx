
import React, { useState } from 'react';
import { 
  ShieldAlert, Users, FileText, TrendingUp, AlertTriangle, 
  Target, Briefcase, ChevronRight, CheckCircle2, Clock, 
  Sparkles, BrainCircuit, BarChart3, GraduationCap, Thermometer,
  UserX, Coffee, Trophy, Coins, Activity, Search, Plus, Bell,
  ArrowUpRight, AlertCircle, FileCheck, UserPlus, FileBadge,
  ShieldCheck, Landmark, DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const MOOD_DATA = [
  { name: 'Contabilidade', score: 42, status: 'Crítico' },
  { name: 'Jurídico', score: 92, status: 'Excelente' },
  { name: 'Consultoria', score: 75, status: 'Estável' },
  { name: 'Ciatoslog', score: 68, status: 'Atenção' },
];

const COMPLIANCE_SEMAPHORE = [
  { unit: 'Ciatos Contabilidade', status: 'Red', label: 'Crítico (65%)', desc: 'Holerites pendentes' },
  { unit: 'Ciatos Jurídico', status: 'Green', label: 'OK (98%)', desc: 'Conformidade total' },
  { unit: 'Ciatoslog', status: 'Yellow', label: 'Atenção (82%)', desc: 'Exames vencendo' },
  { unit: 'Consultoria', status: 'Green', label: 'OK (100%)', desc: 'Documentação em dia' },
];

const RHOverview: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-10 animate-in fade-in pb-24">
      {/* HEADER DE EXECUÇÃO */}
      <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col xl:flex-row justify-between items-center gap-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-slate-50 rounded-full translate-x-40 -translate-y-40" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="p-6 ciatos-navy rounded-[2.5rem] text-ciatos-gold shadow-2xl border-4 border-white">
            <ShieldAlert size={40} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-ciatos-navy tracking-tight uppercase leading-none">Gestão Operacional: Lidiane</h2>
            <p className="text-lg text-gray-500 font-medium italic mt-2">Torre de Controle de Capital Humano & Governança.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <button 
             onClick={() => navigate('/employees')}
             className="px-8 py-4 bg-gray-50 text-ciatos-navy border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
           >
              <UserPlus size={16} /> Nova Admissão
           </button>
           <button 
             onClick={() => navigate('/recruitment')}
             className="px-8 py-4 ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2"
           >
              <Plus size={16} /> Criar Nova Vaga
           </button>
        </div>
      </div>

      {/* 1. RESUMO DE PENDÊNCIAS DO DIA (ACTIONABLE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <PendencyCard 
           count={5} 
           label="Currículos para avaliar" 
           unit="Recrutamento" 
           color="text-ciatos-gold" 
           onClick={() => navigate('/recruitment')}
         />
         <PendencyCard 
           count={10} 
           label="Holerites não assinados" 
           unit="Contabilidade" 
           color="text-red-500" 
           onClick={() => navigate('/compliance')}
         />
         <PendencyCard 
           count={2} 
           label="Alertas de Humor Crítico" 
           unit="Global" 
           color="text-red-600" 
           alert 
           onClick={() => {}}
         />
         <PendencyCard 
           count={5} 
           label="Exames Vencendo (30 dias)" 
           unit="Saúde Ocupacional" 
           color="text-amber-600" 
           onClick={() => navigate('/compliance')}
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* COLUNA ESQUERDA: BUSCA E CLIMA */}
         <div className="lg:col-span-8 space-y-10">
            
            {/* BUSCA GLOBAL DE DOSSIÊS */}
            <div className="bg-white p-10 rounded-[4rem] border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute right-[-20px] top-[-20px] text-slate-50 opacity-20"><Search size={150} /></div>
               <div className="relative z-10">
                  <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                     <Users size={18} className="text-ciatos-gold" /> Busca Global de Dossiês Funcionais
                  </h3>
                  <div className="relative group">
                     <Search className="absolute left-6 top-5 text-gray-400 group-focus-within:text-ciatos-gold transition-colors" size={24} />
                     <input 
                       type="text" 
                       placeholder="Digite nome, CPF ou Unidade do colaborador..." 
                       className="w-full pl-16 pr-8 py-6 bg-gray-50 border border-gray-200 rounded-[2.5rem] text-sm font-bold shadow-inner focus:ring-4 focus:ring-ciatos-gold/10 transition-all outline-none"
                     />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                     {['Ricardo Mendes', 'Carla Oliveira', 'Fernando Silva'].map(name => (
                       <button key={name} onClick={() => navigate('/employees/1')} className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-ciatos-gold hover:text-ciatos-gold transition-all shadow-sm">
                          {name}
                       </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* GRÁFICO CONSOLIDADO DE HUMOR */}
            <div className="bg-white p-10 rounded-[4rem] border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl shadow-sm"><Activity size={24} /></div>
                     <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Saúde Mental & Clima: Visão Grupo</h3>
                  </div>
                  <div className="bg-red-50 px-4 py-2 rounded-xl flex items-center gap-3 border border-red-100 animate-pulse">
                     <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                     <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">Alerta Crítico: Contabilidade</span>
                  </div>
               </div>
               
               <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={MOOD_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontStyle: 'italic', fontWeight: 'bold', fill: '#94a3b8'}} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="score" radius={[12, 12, 0, 0]} barSize={60}>
                           {MOOD_DATA.map((entry, index) => (
                              <Cell key={index} fill={entry.score < 50 ? '#ef4444' : entry.score < 75 ? '#c5a059' : '#1a2b4b'} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         {/* COLUNA DIREITA: SEMÁFORO E IA */}
         <div className="lg:col-span-4 space-y-10">
            {/* SEMÁFORO DE CONFORMIDADE */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
               <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest mb-8 flex items-center gap-3">
                  <ShieldCheck size={18} className="text-emerald-500" /> Semáforo de Conformidade DP
               </h3>
               <div className="space-y-6">
                  {COMPLIANCE_SEMAPHORE.map((item, idx) => (
                     <div key={idx} className="flex items-center justify-between group cursor-default">
                        <div className="flex items-center gap-4">
                           <div className={`w-3 h-3 rounded-full shadow-sm ${
                              item.status === 'Red' ? 'bg-red-500 animate-pulse' :
                              item.status === 'Yellow' ? 'bg-amber-400' : 'bg-emerald-500'
                           }`} />
                           <div>
                              <p className="text-[11px] font-black text-ciatos-navy leading-none uppercase">{item.unit}</p>
                              <p className="text-[9px] text-gray-400 font-bold mt-1 italic">{item.desc}</p>
                           </div>
                        </div>
                        <span className={`text-[10px] font-black ${
                           item.status === 'Red' ? 'text-red-600' :
                           item.status === 'Yellow' ? 'text-amber-600' : 'text-emerald-600'
                        }`}>{item.label}</span>
                     </div>
                  ))}
               </div>
               <button 
                 onClick={() => navigate('/compliance')}
                 className="mt-10 w-full py-4 bg-ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
               >
                  <FileBadge size={16} /> Central de Uploads
               </button>
            </div>

            {/* IA ADVISOR RECRUTAMENTO */}
            <div className="bg-ciatos-navy p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-l-[16px] border-l-ciatos-gold">
               <BrainCircuit className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
               <div className="flex items-center gap-4 mb-10">
                  <Sparkles className="text-ciatos-gold" size={24} />
                  <h3 className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em]">Recrutamento Advisor</h3>
               </div>
               <div className="space-y-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 relative">
                     <span className="absolute -top-3 left-6 px-3 py-1 bg-ciatos-gold text-ciatos-navy text-[8px] font-black rounded-full uppercase">Novo Match</span>
                     <p className="text-sm font-bold text-white leading-tight mb-2">Cliente Alpha S/A</p>
                     <p className="text-xs text-gray-300 italic leading-relaxed">"Lidiane, identifiquei **3 candidatos com 90%+ match** para a vaga de Gerente Financeiro."</p>
                     <button onClick={() => navigate('/recruitment')} className="mt-4 text-[9px] font-black text-ciatos-gold uppercase tracking-widest flex items-center gap-2">Triagem Direta <ArrowUpRight size={12}/></button>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-sm font-bold text-ciatos-gold leading-tight mb-2">ROI Externo (Receita)</p>
                     <p className="text-xs text-gray-300 italic leading-relaxed flex items-center gap-2">
                        <DollarSign size={14} className="text-emerald-400" /> 
                        "Estimativa de faturamento de R$ 12k para as 2 vagas externas fechadas este mês."
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const PendencyCard = ({ count, label, unit, color, alert, onClick }: any) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all relative group cursor-pointer active:scale-95"
  >
     {alert && <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full animate-ping" />}
     <div>
        <p className={`text-5xl font-black ${color} tracking-tighter`}>{count}</p>
        <p className="text-xs font-black text-ciatos-navy mt-1 leading-tight">{label}</p>
     </div>
     <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{unit}</span>
        <ChevronRight size={14} className="text-gray-300 group-hover:text-ciatos-gold group-hover:translate-x-1 transition-all" />
     </div>
  </div>
);

export default RHOverview;
