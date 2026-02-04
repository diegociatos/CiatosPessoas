
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, Users, HeartPulse, Target, AlertTriangle, Building2, 
  ChevronDown, ShieldAlert, Sparkles, BrainCircuit, Activity,
  Briefcase, CheckCircle2, Info, Lightbulb
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
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all border-b-4 hover:border-b-ciatos-gold duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10 shadow-inner`}>
        {React.cloneElement(icon, { className: colorClass.replace('bg-', 'text-') })}
      </div>
      {trend !== undefined ? (
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} flex items-center gap-1`}>
          {trend > 0 ? '+' : ''}{trend}%
          <TrendingUp size={10} />
        </span>
      ) : risk && (
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
          risk === 'Baixo' ? 'bg-green-100 text-green-700' : 
          risk === 'Moderado' ? 'bg-amber-100 text-amber-700' : 
          risk === 'Alto' ? 'bg-red-100 text-red-700' : 'bg-black text-white'
        }`}>
          Risco {risk}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em]">{label}</h3>
      <p className="text-3xl font-bold text-ciatos-navy mt-1 tracking-tight">{value}</p>
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
    <div className="space-y-10 animate-in fade-in duration-700 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-8 bg-ciatos-gold rounded-full" />
             <h1 className="text-4xl font-bold text-ciatos-navy tracking-tight">Ciatos People Intelligence</h1>
          </div>
          <p className="text-sm text-gray-500 font-medium ml-4">Monitoramento analítico e suporte estratégico à diretoria do Grupo Ciatos.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
            <Building2 size={16} className="text-ciatos-gold" />
            <select 
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value as any)}
              className="bg-transparent border-none outline-none text-xs font-black text-ciatos-navy uppercase tracking-widest cursor-pointer"
            >
              <option value="Consolidado">Grupo Ciatos (Consolidado)</option>
              {Object.values(BusinessUnit).map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <button className="px-8 py-3 ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-navy-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Activity size={16} /> Relatório Diretivo
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          icon={<Users size={24} />} 
          label="Capital Humano Ativo" 
          value={unitData.employees} 
          trend={8}
          colorClass="bg-blue-600"
        />
        <StatCard 
          icon={<HeartPulse size={24} />} 
          label="eNPS (Clima Organizacional)" 
          value={unitData.climate} 
          trend={2}
          colorClass="bg-rose-500"
        />
        <StatCard 
          icon={<Target size={24} />} 
          label="Produtividade Média" 
          value={`${unitData.productivity}%`} 
          trend={4}
          colorClass="bg-emerald-500"
        />
        <StatCard 
          icon={<ShieldAlert size={24} />} 
          label="Exposição a Riscos" 
          value={unitData.risk} 
          risk={unitData.risk}
          colorClass="bg-amber-500"
        />
      </div>

      {/* Charts & Analytics Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Risk Radar */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-ciatos-gold" />
              <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em]">Radar de Saúde Organizacional</h3>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl">
               <Info size={14} className="text-gray-300" />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskRadarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 9, fontWeight: 'bold', fill: '#94a3b8'}} />
                <Radar name="Grupo" dataKey="A" stroke="#c5a059" fill="#c5a059" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-ciatos-gold/5 rounded-2xl border border-ciatos-gold/10 text-center">
             <p className="text-[10px] text-ciatos-navy font-bold uppercase tracking-widest">Aderência à Estratégia: <span className="text-ciatos-gold">89%</span></p>
          </div>
        </div>

        {/* Sentiment & Productivity Over Time */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-ciatos-gold" />
              <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em]">Tendência de Performance vs. Bem-Estar</h3>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-ciatos-gold shadow-sm" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Clima</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-ciatos-navy shadow-sm" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Produtividade</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c5a059" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#c5a059" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a2b4b" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#1a2b4b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}}
                   itemStyle={{fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase'}}
                />
                <Area type="monotone" dataKey="mood" stroke="#c5a059" fillOpacity={1} fill="url(#colorMood)" name="Clima" strokeWidth={4} />
                <Area type="monotone" dataKey="productivity" stroke="#1a2b4b" fillOpacity={1} fill="url(#colorProd)" name="Produtividade" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Intelligence & Risks Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Risk Classification Panel */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-ciatos-gold rounded-2xl shadow-lg shadow-amber-600/20">
                 <AlertTriangle className="text-ciatos-navy" size={24} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-ciatos-navy uppercase tracking-widest">Painel de Riscos Acionáveis</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Diagnóstico preditivo • Grupo Ciatos 2024</p>
               </div>
            </div>
            <button className="p-2 hover:bg-white rounded-xl transition-all">
               <Sparkles className="text-ciatos-gold" size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 divide-y divide-gray-50">
            {[
              { 
                unit: BusinessUnit.CONTABILIDADE, 
                title: 'Excesso de Carga em Período Sazonal', 
                detail: 'O setor Fiscal opera com 22% de sobrecarga média. Risco de Burnout identificado em 3 analistas seniores.', 
                risk: 'Crítico',
                action: 'Redistribuir demandas ou acionar suporte temporário.'
              },
              { 
                unit: BusinessUnit.LOG, 
                title: 'Gargalo de Liderança Técnica', 
                detail: 'Crescimento de 40% no time comercial sem aumento proporcional na supervisão técnica.', 
                risk: 'Moderado',
                action: 'Promover Lead técnico ou abrir vaga de Supervisor.'
              },
              { 
                unit: BusinessUnit.JURIDICO, 
                title: 'Atraso em Prazos de Onboarding', 
                detail: 'Novos advogados estão levando 15 dias a mais que o benchmark interno para a primeira entrega autônoma.', 
                risk: 'Baixo',
                action: 'Revisar trilha de treinamento da Ciatos Academy.'
              },
            ].filter(a => selectedUnit === 'Consolidado' || a.unit === selectedUnit).map((item, i) => (
              <div key={i} className="p-8 flex items-start gap-6 hover:bg-gray-50/80 transition-all group">
                <div className={`mt-1.5 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                  item.risk === 'Crítico' ? 'border-red-100 bg-red-50 text-red-600' :
                  item.risk === 'Alto' ? 'border-red-100 bg-red-50 text-red-600' :
                  item.risk === 'Moderado' ? 'border-amber-100 bg-amber-50 text-amber-600' :
                  'border-green-100 bg-green-50 text-green-600'
                }`}>
                   <ShieldAlert size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-2 py-0.5 bg-white border border-gray-100 rounded-md">{item.unit}</span>
                     <h4 className="font-bold text-ciatos-navy text-base">{item.title}</h4>
                     <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        item.risk === 'Crítico' ? 'bg-red-500 text-white' :
                        item.risk === 'Moderado' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
                     }`}>
                        {item.risk}
                     </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.detail}</p>
                  <div className="bg-white/60 p-3 rounded-xl border border-dashed border-gray-200">
                     <p className="text-[10px] font-bold text-ciatos-gold uppercase flex items-center gap-2">
                        <CheckCircle2 size={12} /> Sugestão de Melhoria
                     </p>
                     <p className="text-[11px] text-gray-600 mt-1 font-medium italic">{item.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Composition Panel & Suggestions */}
        <div className="space-y-8 lg:col-span-4">
          <div className="bg-ciatos-navy p-8 rounded-[3rem] shadow-2xl text-white relative overflow-hidden flex flex-col justify-between">
            <Sparkles className="absolute top-[-50px] left-[-50px] text-white/5 w-80 h-80" />
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-ciatos-gold rounded-2xl shadow-xl shadow-amber-600/20">
                    <Briefcase size={20} className="text-ciatos-navy" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-ciatos-gold">Distribuição do Grupo</h3>
                </div>
                
                <div className="h-64 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                          data={compositionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {compositionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{backgroundColor: '#1a2b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                          itemStyle={{color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold'}}
                        />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  {compositionData.map(c => (
                    <div key={c.name} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: c.color}} />
                          <span className="text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors">{c.name}</span>
                        </div>
                        <span className="text-xs font-black">{c.value}</span>
                    </div>
                  ))}
                </div>
            </div>
            <div className="relative z-10 pt-10 mt-10 border-t border-white/5">
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  Ver Mapa de Sucessão <ChevronDown size={14} className="-rotate-90" />
                </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <Lightbulb size={20} className="text-ciatos-gold" />
                <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Sugestões de Decisão</h3>
             </div>
             <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border-l-4 border-ciatos-gold">
                   <p className="text-xs font-bold text-ciatos-navy mb-1">Ciatos Jurídico</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed">Alta produtividade detectada. Excelente momento para expansão do time de suporte administrativo (Ciatos Consultoria).</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border-l-4 border-amber-500">
                   <p className="text-xs font-bold text-ciatos-navy mb-1">Ciatoslog</p>
                   <p className="text-[10px] text-gray-500 leading-relaxed">Risco Moderado de turnover comercial. Recomenda-se check-in individual com o time de vendas (Gente & Gestão).</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
