
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, Users, HeartPulse, Target, AlertTriangle, Building2, 
  ChevronDown, ShieldAlert, Sparkles, BrainCircuit, Activity,
  Briefcase, CheckCircle2, Info, Lightbulb, Zap, ShieldCheck
} from 'lucide-react';
import { BusinessUnit } from '../types';

const sentimentData = [
  { month: 'Jan', mood: 78, productivity: 82 },
  { month: 'Fev', mood: 72, productivity: 85 },
  { month: 'Mar', mood: 85, productivity: 88 },
  { month: 'Abr', mood: 80, productivity: 80 },
  { month: 'Mai', mood: 88, productivity: 92 },
  { month: 'Jun', mood: 82, productivity: 90 },
];

const riskRadarData = [
  { subject: 'Jurídico/Trabalhista', A: 20, fullMark: 100 },
  { subject: 'Turnover Predito', A: 45, fullMark: 100 },
  { subject: 'Engajamento/Clima', A: 85, fullMark: 100 },
  { subject: 'Produtividade', A: 92, fullMark: 100 },
  { subject: 'Conformidade DP', A: 98, fullMark: 100 },
];

const compositionData = [
  { name: 'Ciatos Contabilidade', value: 22, color: '#1a2b4b', productivity: 88, climate: 8.2, turnoverRisk: 'Moderado' },
  { name: 'Ciatos Jurídico', value: 12, color: '#c5a059', productivity: 94, climate: 8.8, turnoverRisk: 'Baixo' },
  { name: 'Ciatos Consultoria', value: 15, color: '#1e293b', productivity: 85, climate: 8.5, turnoverRisk: 'Baixo' },
  { name: 'Ciatoslog', value: 8, color: '#475569', productivity: 96, climate: 8.0, turnoverRisk: 'Moderado' },
];

const StatCard = ({ icon, label, value, trend, colorClass, risk }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all border-b-8 hover:border-b-ciatos-gold duration-500 group">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-5 rounded-2xl ${colorClass} bg-opacity-10 shadow-inner group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon, { className: colorClass.replace('bg-', 'text-'), size: 28 })}
      </div>
      {trend !== undefined ? (
        <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${trend > 0 ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'} flex items-center gap-1.5`}>
          {trend > 0 ? '+' : ''}{trend}%
          <TrendingUp size={12} />
        </span>
      ) : risk && (
        <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tighter border ${
          risk === 'Baixo' ? 'bg-green-50 text-green-700 border-green-100' : 
          risk === 'Moderado' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
          risk === 'Alto' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-black text-white'
        }`}>
          Risco {risk}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{label}</h3>
      <p className="text-4xl font-black text-ciatos-navy mt-2 tracking-tighter">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<BusinessUnit | 'Consolidado'>('Consolidado');

  const unitData = selectedUnit === 'Consolidado' 
    ? { employees: 57, productivity: 92, climate: 8.4, risk: 'Baixo' }
    : { 
        employees: compositionData.find(c => c.name === selectedUnit)?.value || 0,
        productivity: compositionData.find(c => c.name === selectedUnit)?.productivity || 0,
        climate: compositionData.find(c => c.name === selectedUnit)?.climate || 0,
        risk: compositionData.find(c => c.name === selectedUnit)?.turnoverRisk || 'Baixo'
      };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-16">
      {/* Executive Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32" />
        <div className="relative z-10 flex items-start gap-6">
          <div className="p-5 ciatos-navy rounded-[2rem] shadow-2xl text-ciatos-gold">
            <Target size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-ciatos-navy tracking-tight leading-none">Ciatos Strategic Control</h1>
            <p className="text-sm text-gray-500 font-medium max-w-xl">Inteligência de gestão, conformidade trabalhista e monitoramento de performance do Grupo Ciatos.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 relative z-10 w-full xl:w-auto">
          <div className="flex-1 xl:flex-none flex items-center gap-4 bg-gray-50/80 px-6 py-3 rounded-2xl border border-gray-200 shadow-inner group hover:bg-white hover:border-ciatos-gold transition-all">
            <Building2 size={20} className="text-ciatos-gold" />
            <select 
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value as any)}
              className="bg-transparent border-none outline-none text-[11px] font-black text-ciatos-navy uppercase tracking-widest cursor-pointer w-full"
            >
              <option value="Consolidado">Grupo Ciatos (Consolidado)</option>
              {Object.values(BusinessUnit).map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <button className="flex-1 xl:flex-none px-10 py-4 ciatos-navy text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-navy-900/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
            <Activity size={18} /> Diagnóstico Executivo
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          icon={<Users />} 
          label="Capital Humano Ativo" 
          value={unitData.employees} 
          trend={8}
          colorClass="bg-blue-600"
        />
        <StatCard 
          icon={<HeartPulse />} 
          label="Score de Clima (eNPS)" 
          value={unitData.climate} 
          trend={2}
          colorClass="bg-rose-500"
        />
        <StatCard 
          icon={<Target />} 
          label="Eficiência Operacional" 
          value={`${unitData.productivity}%`} 
          trend={4}
          colorClass="bg-emerald-500"
        />
        <StatCard 
          icon={<ShieldAlert />} 
          label="Exposição de Passivo" 
          value={unitData.risk} 
          risk={unitData.risk}
          colorClass="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Organization Matrix Radar */}
        <div className="lg:col-span-5 bg-white p-10 rounded-[3.5rem] shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-ciatos-gold/10 rounded-2xl">
                <BrainCircuit className="text-ciatos-gold" size={24} />
              </div>
              <div>
                <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em]">Matriz de Saúde Preventiva</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Análise por Dimensão</p>
              </div>
            </div>
            <button className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
               <Info size={16} className="text-gray-300" />
            </button>
          </div>
          <div className="h-[350px] mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskRadarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 9, fontWeight: 'bold', fill: '#94a3b8'}} />
                <Radar name="Grupo" dataKey="A" stroke="#c5a059" fill="#c5a059" fillOpacity={0.6} strokeWidth={3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4">
             <div className="p-5 bg-ciatos-gold/5 rounded-3xl border border-ciatos-gold/10 text-center">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Aderência Compliance</p>
                <p className="text-xl font-black text-ciatos-navy">98.4%</p>
             </div>
             <div className="p-5 bg-ciatos-navy/5 rounded-3xl border border-ciatos-navy/10 text-center">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Risco Predito</p>
                <p className="text-xl font-black text-amber-600">Baixo</p>
             </div>
          </div>
        </div>

        {/* Dynamic Analytics Chart */}
        <div className="lg:col-span-7 bg-white p-10 rounded-[3.5rem] shadow-sm border border-gray-100 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-ciatos-navy/10 rounded-2xl">
                <TrendingUp className="text-ciatos-navy" size={24} />
              </div>
              <div>
                <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em]">Evolução de Performance & Clima</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Série Histórica Semestral</p>
              </div>
            </div>
            <div className="flex gap-8 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
              <LegendItem color="#c5a059" label="Mood" />
              <LegendItem color="#1a2b4b" label="Performance" />
            </div>
          </div>
          <div className="h-[350px] mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c5a059" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#c5a059" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a2b4b" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#1a2b4b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px'}}
                   itemStyle={{fontSize: '11px', fontWeight: 'black', textTransform: 'uppercase', marginBottom: '4px'}}
                />
                <Area type="monotone" dataKey="mood" stroke="#c5a059" fillOpacity={1} fill="url(#colorMood)" name="Clima" strokeWidth={5} />
                <Area type="monotone" dataKey="productivity" stroke="#1a2b4b" fillOpacity={1} fill="url(#colorProd)" name="Performance" strokeWidth={5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Intelligence & Strategy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Strategic Risk Panel */}
        <div className="lg:col-span-2 bg-white rounded-[3.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-5">
               <div className="p-4 bg-ciatos-gold rounded-3xl shadow-xl shadow-amber-600/30">
                 <ShieldAlert className="text-ciatos-navy" size={28} />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-ciatos-navy uppercase tracking-widest">Painel de Mitigação de Riscos</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Diagnóstico Ciatos Advisor • Junho 2024</p>
               </div>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
               <Sparkles className="text-ciatos-gold" size={24} />
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { 
                unit: BusinessUnit.CONTABILIDADE, 
                title: 'Gargalo Operacional: Setor Fiscal', 
                detail: 'Sobrecarga de 22% identificada. Risco de fadiga e erros em fechamentos críticos.', 
                risk: 'Crítico',
                action: 'Ativar suporte paralegal para tarefas repetitivas.',
                icon: <AlertTriangle size={20} />
              },
              { 
                unit: BusinessUnit.LOG, 
                title: 'Turnover Predito: Time Comercial', 
                detail: 'Estagnação de performance e queda de eNPS em 15% nos últimos 30 dias.', 
                risk: 'Moderado',
                action: 'Realizar feedback consultivo e revisão de metas.',
                icon: <Activity size={20} />
              },
              { 
                unit: BusinessUnit.JURIDICO, 
                title: 'Conformidade de Onboarding', 
                detail: 'Curva de aprendizado acima do benchmark (22 dias vs 15 dias).', 
                risk: 'Baixo',
                action: 'Personalizar trilha técnica na Ciatos Academy.',
                icon: <Zap size={20} />
              },
            ].filter(a => selectedUnit === 'Consolidado' || a.unit === selectedUnit).map((item, i) => (
              <div key={i} className="p-10 flex items-start gap-8 hover:bg-slate-50 transition-all group cursor-default">
                <div className={`mt-1 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 shadow-sm ${
                  item.risk === 'Crítico' ? 'border-red-100 bg-red-50 text-red-600' :
                  item.risk === 'Moderado' ? 'border-amber-100 bg-amber-50 text-amber-600' :
                  'border-green-100 bg-green-50 text-green-600'
                }`}>
                   {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-3 py-1 bg-white border border-gray-100 rounded-lg shadow-sm">{item.unit}</span>
                     <h4 className="font-bold text-ciatos-navy text-lg tracking-tight">{item.title}</h4>
                     <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                        item.risk === 'Crítico' ? 'bg-red-500 text-white border-red-600' :
                        item.risk === 'Moderado' ? 'bg-amber-500 text-white border-amber-600' : 'bg-green-500 text-white border-green-600'
                     }`}>
                        {item.risk}
                     </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">{item.detail}</p>
                  <div className="bg-white p-5 rounded-2xl border border-dashed border-gray-200 flex items-center justify-between group-hover:border-ciatos-gold/50 transition-all">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-ciatos-gold" />
                        <span className="text-[11px] text-gray-700 font-bold italic leading-none">{item.action}</span>
                     </div>
                     <ChevronDown size={16} className="text-gray-300 -rotate-90 group-hover:text-ciatos-gold transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Group Composition & Insights */}
        <div className="space-y-10 lg:col-span-1">
          <div className="bg-ciatos-navy p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden flex flex-col justify-between h-full min-h-[500px]">
            <Sparkles className="absolute top-[-50px] left-[-50px] text-white/5 w-80 h-80 rotate-12" />
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-ciatos-gold rounded-[1.5rem] shadow-2xl shadow-amber-600/30">
                    <Briefcase size={28} className="text-ciatos-navy" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-ciatos-gold">Headcount Distribution</h3>
                </div>
                
                <div className="h-64 mb-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                          data={compositionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          {compositionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{backgroundColor: '#1a2b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '16px'}}
                          itemStyle={{color: '#fff', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'black'}}
                        />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-5">
                  {compositionData.map(c => (
                    <div key={c.name} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: c.color}} />
                          <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{c.name}</span>
                        </div>
                        <span className="text-sm font-black text-ciatos-gold">{c.value}</span>
                    </div>
                  ))}
                </div>
            </div>
            <div className="relative z-10 pt-10 mt-10 border-t border-white/10">
                <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-3">
                  Executive Reports <ChevronDown size={14} className="-rotate-90" />
                </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col gap-8">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-2xl">
                   <Lightbulb size={24} className="text-ciatos-gold" />
                </div>
                <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em]">Ciatos Advisor Insight</h3>
             </div>
             <div className="space-y-6">
                <InsightItem 
                  title="Expansão Administrativa" 
                  desc="O Ciatos Jurídico atingiu o platô de produtividade per capita. Recomenda-se reforço no time de suporte (Ciatos Consultoria)." 
                />
                <InsightItem 
                  title="Compliance Predictor" 
                  desc="O volume de horas extras no setor contábil gera risco de passivo trabalhista em 3 analistas. Alinhamento imediato sugerido." 
                />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-2.5">
    <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: color}} />
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
  </div>
);

const InsightItem = ({ title, desc }: any) => (
  <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group hover:border-ciatos-gold/30 transition-all cursor-default">
    <div className="flex items-center gap-3 mb-3">
       <ShieldCheck size={14} className="text-ciatos-gold" />
       <p className="text-[11px] font-black text-ciatos-navy uppercase tracking-widest">{title}</p>
    </div>
    <p className="text-[11px] text-gray-500 leading-relaxed font-medium italic">"{desc}"</p>
  </div>
);

export default Dashboard;
