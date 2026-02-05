
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, ShieldAlert, BrainCircuit, Target, Users, 
  Briefcase, Scale, ChevronRight, Sparkles, AlertTriangle,
  Award, Zap, LayoutDashboard, Globe, Landmark, Clock,
  CheckCircle2, Search, Filter, MessageSquareQuote, History
} from 'lucide-react';
import { BusinessUnit } from '../types';

const TURNOVER_DATA = [
  { month: 'Jan', Contabil: 1.2, Juridico: 0.5, Log: 2.1 },
  { month: 'Fev', Contabil: 1.5, Juridico: 0.2, Log: 1.8 },
  { month: 'Mar', Contabil: 1.1, Juridico: 0.8, Log: 2.5 },
  { month: 'Abr', Contabil: 0.9, Juridico: 0.4, Log: 1.2 },
  { month: 'Mai', Contabil: 2.3, Juridico: 1.1, Log: 1.5 },
  { month: 'Jun', Contabil: 1.8, Juridico: 0.6, Log: 1.9 },
];

const ENPS_DATA = [
  { name: 'Contabilidade', value: 72, color: '#1a2b4b' },
  { name: 'Jurídico', value: 94, color: '#c5a059' },
  { name: 'Log', value: 81, color: '#475569' },
  { name: 'Consultoria', value: 88, color: '#94a3b8' },
];

const NINE_BOX_LEADERS = [
  { id: 1, name: 'Dr. João Mendes', pos: 'Top Talent (3,3)', unit: 'Jurídico' },
  { id: 2, name: 'Lidiane Silva', pos: 'Forte Desempenho (3,2)', unit: 'RH' },
  { id: 3, name: 'Ricardo Mendes', pos: 'Enigma (1,3)', unit: 'Jurídico' },
  { id: 4, name: 'Marcos Souza', pos: 'Eficaz (2,2)', unit: 'TI' },
  { id: 5, name: 'Carla Oliveira', pos: 'Questionável (1,1)', unit: 'Contábil' },
];

const ExecutiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'ninebox' | 'risk'>('kpis');

  return (
    <div className="space-y-10 animate-in fade-in pb-20">
      {/* Header Diretoria */}
      <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col xl:flex-row justify-between items-center gap-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-slate-50 rounded-full translate-x-48 -translate-y-48" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="p-6 ciatos-navy rounded-[2.5rem] text-ciatos-gold shadow-2xl border-4 border-white">
            <Landmark size={48} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-ciatos-navy tracking-tight leading-none">Visão Diretoria: Grupo Ciatos</h2>
            <p className="text-lg text-gray-500 font-medium italic mt-2">Inteligência de Board e Governança Corporativa.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="px-8 py-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 flex items-center gap-3">
              <CheckCircle2 size={24} />
              <div className="text-left">
                 <p className="text-[10px] font-black uppercase tracking-widest leading-none">Governança</p>
                 <p className="text-sm font-bold">100% Compliance</p>
              </div>
           </div>
        </div>
      </div>

      {/* Tabs Executivas */}
      <div className="flex gap-10 border-b border-gray-100 px-6">
        <TabBtn label="Visão Geral & KPIs" active={activeTab === 'kpis'} onClick={() => setActiveTab('kpis')} icon={<Globe size={18}/>} />
        <TabBtn label="Matriz Nine-Box (Lideranças)" active={activeTab === 'ninebox'} onClick={() => setActiveTab('ninebox')} icon={<Target size={18}/>} />
        <TabBtn label="Mapa de Risco Jurídico" active={activeTab === 'risk'} onClick={() => setActiveTab('risk')} icon={<Scale size={18}/>} />
      </div>

      {activeTab === 'kpis' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-4">
           {/* Primary Board KPIs */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <BoardStat label="eNPS Global" value="84" sub="Consolidado Grupo" trend={+4} />
              <BoardStat label="Turnover Médio" value="1.4%" sub="Acumulado Ano" trend={-0.2} />
              <BoardStat label="Custo Passivo Potencial" value="R$ 12k" sub="Mínimo Estimado" risk="Baixo" />
              <BoardStat label="Aderência Academy" value="92%" sub="Trilhas Obrigatórias" trend={+12} />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Gráfico de Turnover Comparativo */}
              <div className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
                 <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-ciatos-navy/5 text-ciatos-navy rounded-2xl"><TrendingUp size={24} /></div>
                       <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Benchmark de Turnover por Unidade</h3>
                    </div>
                    <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
                       <LegendItem color="#1a2b4b" label="Contábil" />
                       <LegendItem color="#c5a059" label="Jurídico" />
                    </div>
                 </div>
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={TURNOVER_DATA}>
                          <defs>
                             <linearGradient id="colorCont" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1a2b4b" stopOpacity={0.1}/><stop offset="95%" stopColor="#1a2b4b" stopOpacity={0}/></linearGradient>
                             <linearGradient id="colorJur" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c5a059" stopOpacity={0.1}/><stop offset="95%" stopColor="#c5a059" stopOpacity={0}/></linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                          <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                          <Area type="monotone" dataKey="Contabil" stroke="#1a2b4b" fillOpacity={1} fill="url(#colorCont)" strokeWidth={4} />
                          <Area type="monotone" dataKey="Juridico" stroke="#c5a059" fillOpacity={1} fill="url(#colorJur)" strokeWidth={4} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Gráfico de eNPS por Unidade */}
              <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
                 <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest mb-10">Pulso de Clima (eNPS)</h3>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={ENPS_DATA} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#1a2b4b'}} width={100} />
                          <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '15px', border: 'none'}} />
                          <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={25}>
                             {ENPS_DATA.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-[11px] text-gray-500 italic font-medium">"A unidade **Jurídica** mantém o eNPS mais alto do grupo devido à maturidade da gestão direta e rituais de feedback."</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'ninebox' && (
        <div className="animate-in slide-in-from-bottom-4 space-y-10">
           <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-16">
                 <div>
                    <h3 className="text-2xl font-black text-ciatos-navy uppercase tracking-tight">Matriz Nine-Box: Lideranças</h3>
                    <p className="text-sm text-gray-400 font-medium italic mt-1">Cruzamento automático de Performance (Timeline) vs Potencial (IA Assessment).</p>
                 </div>
                 <div className="p-4 bg-ciatos-gold/10 text-ciatos-gold rounded-2xl flex items-center gap-3">
                    <Sparkles size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Mapping Assistido por IA Advisor</span>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-4 h-[600px]">
                 {/* Top Row: High Potential */}
                 <NineBoxCell label="Enigma" color="bg-amber-50" />
                 <NineBoxCell label="Crescimento" color="bg-emerald-50" />
                 <NineBoxCell label="Top Talent" color="bg-ciatos-navy text-white" leaders={[NINE_BOX_LEADERS[0]]} />
                 
                 {/* Middle Row: Med Potential */}
                 <NineBoxCell label="Dilema" color="bg-red-50" />
                 <NineBoxCell label="Eficaz" color="bg-gray-50" leaders={[NINE_BOX_LEADERS[3]]} />
                 <NineBoxCell label="Forte Desempenho" color="bg-emerald-50" leaders={[NINE_BOX_LEADERS[1]]} />
                 
                 {/* Bottom Row: Low Potential */}
                 <NineBoxCell label="Questionável" color="bg-red-100" leaders={[NINE_BOX_LEADERS[4]]} />
                 <NineBoxCell label="Sólido" color="bg-gray-100" />
                 <NineBoxCell label="Especialista" color="bg-gray-50" />
              </div>

              <div className="grid grid-cols-3 text-center mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                 <span>Baixa Performance</span>
                 <span>Média Performance</span>
                 <span>Alta Performance</span>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'risk' && (
        <div className="animate-in slide-in-from-bottom-4 space-y-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
                 <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest mb-10 flex items-center gap-3">
                    <Clock size={20} className="text-ciatos-gold" /> Alerta de Jornada (Horas Extras)
                 </h3>
                 <div className="space-y-6">
                    <RiskItem label="Time Contábil - Setor Fiscal" risk="Alto" desc="3 colaboradores com > 20h extras acumuladas no mês." />
                    <RiskItem label="Time Jurídico - Contencioso" risk="Baixo" desc="Jornada controlada e dentro do budget." />
                    <RiskItem label="Operações Log" risk="Médio" desc="Picos de jornada identificados nas sextas-feiras." />
                 </div>
              </div>

              <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
                 <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest mb-10 flex items-center gap-3">
                    <Scale size={20} className="text-ciatos-gold" /> Conformidade de Exames (ASO)
                 </h3>
                 <div className="space-y-6">
                    <ComplianceCheck label="Exames Periódicos em Dia" value="98%" ok />
                    <ComplianceCheck label="Documentos Admissionais" value="100%" ok />
                    <ComplianceCheck label="Treinamentos de NR" value="85%" warning />
                 </div>
              </div>
           </div>

           <div className="bg-red-50 p-12 rounded-[4rem] border border-red-100 flex flex-col md:flex-row items-center gap-10">
              <div className="p-6 bg-red-600 text-white rounded-3xl shadow-xl">
                 <ShieldAlert size={40} />
              </div>
              <div className="flex-1">
                 <h4 className="text-2xl font-black text-red-900 tracking-tight">Risco de Passivo Trabalhista Detectado</h4>
                 <p className="text-sm font-medium text-red-800 leading-relaxed mt-2 italic">
                   "O Advisor identificou um padrão de supressão de intervalo intrajornada na unidade **Contábil**. Estimativa de risco financeiro anual: R$ 45.000,00 se não corrigido."
                 </p>
              </div>
              <button className="px-10 py-5 bg-red-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Ver Relatório Detalhado</button>
           </div>
        </div>
      )}

      {/* Ação de Diretoria: Ciatos Advisor Chat */}
      <div className="bg-ciatos-navy p-14 rounded-[5rem] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-14">
         <BrainCircuit className="absolute top-[-40px] left-[-40px] text-white/5 w-80 h-80" />
         <div className="flex-1 relative z-10 space-y-8">
            <div className="flex items-center gap-5">
               <div className="p-4 bg-ciatos-gold rounded-3xl text-ciatos-navy">
                  <Sparkles size={32} />
               </div>
               <h3 className="text-3xl font-black text-ciatos-gold tracking-tight">Ciatos Advisor: Strategic Board Assistant</h3>
            </div>
            <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-2xl italic">
              "Precisa decidir o sucessor para uma posição estratégica? Quer saber o impacto real de um aumento de turnover na rentabilidade da unidade? Pergunte ao seu Advisor."
            </p>
            <div className="flex gap-4">
               <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Quem é o melhor sucessor para o Jurídico?</button>
               <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Simular impacto de turnover no Fiscal</button>
            </div>
         </div>
         <div className="relative z-10 w-full md:w-auto">
            <button className="w-full md:w-auto px-16 py-8 bg-ciatos-gold text-ciatos-navy rounded-[3rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-white transition-all group flex items-center justify-center gap-4">
               <MessageSquareQuote size={28} /> Abrir Advisor Executive
            </button>
         </div>
      </div>
    </div>
  );
};

const TabBtn = ({ label, active, onClick, icon }: any) => (
  <button onClick={onClick} className={`pb-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all ${active ? 'text-ciatos-gold border-b-2 border-ciatos-gold scale-105' : 'text-gray-400 hover:text-ciatos-navy'}`}>
    {icon} {label}
  </button>
);

const BoardStat = ({ label, value, sub, trend, risk }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
     <div className="flex justify-between items-start mb-6">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        {trend && (
           <span className={`px-2 py-1 rounded-lg text-[9px] font-black ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}%
           </span>
        )}
        {risk && (
           <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[9px] font-black uppercase tracking-widest">Risco {risk}</span>
        )}
     </div>
     <p className="text-4xl font-black text-ciatos-navy tracking-tighter">{value}</p>
     <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{sub}</p>
  </div>
);

const NineBoxCell = ({ label, color, leaders }: any) => (
  <div className={`p-6 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center relative ${color}`}>
     <span className="absolute top-3 left-4 text-[8px] font-black uppercase tracking-widest opacity-40">{label}</span>
     <div className="flex -space-x-2">
        {leaders?.map((l: any) => (
           <div key={l.id} className="w-10 h-10 rounded-xl bg-white border-2 border-ciatos-gold flex items-center justify-center font-black text-ciatos-navy text-xs shadow-md group cursor-pointer hover:scale-110 transition-all" title={`${l.name} (${l.unit})`}>
              {l.name[0]}
           </div>
        ))}
     </div>
  </div>
);

const RiskItem = ({ label, risk, desc }: any) => (
  <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
     <div className="space-y-1">
        <p className="text-sm font-black text-ciatos-navy">{label}</p>
        <p className="text-[11px] text-gray-500 font-medium italic">{desc}</p>
     </div>
     <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
        risk === 'Alto' ? 'bg-red-50 text-red-700 border-red-100' : 
        risk === 'Médio' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
        'bg-emerald-50 text-emerald-700 border-emerald-100'
     }`}>
        Risco {risk}
     </span>
  </div>
);

const ComplianceCheck = ({ label, value, ok, warning }: any) => (
  <div className="flex justify-between items-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
     <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${ok ? 'bg-emerald-100 text-emerald-600' : warning ? 'bg-amber-100 text-amber-600' : ''}`}>
           <CheckCircle2 size={16} />
        </div>
        <span className="text-xs font-bold text-gray-700">{label}</span>
     </div>
     <span className={`text-sm font-black ${ok ? 'text-emerald-600' : 'text-amber-600'}`}>{value}</span>
  </div>
);

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-2">
     <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: color}} />
     <span>{label}</span>
  </div>
);

export default ExecutiveDashboard;
