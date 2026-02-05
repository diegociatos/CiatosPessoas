
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { 
  TrendingUp, ShieldAlert, BrainCircuit, Target, Users, 
  Briefcase, Scale, ChevronRight, Sparkles, AlertTriangle,
  Award, Zap, LayoutDashboard, Globe, Landmark, Clock,
  CheckCircle2, Search, Filter, MessageSquareQuote, History,
  Coins, TrendingDown, DollarSign, ArrowUpRight, ShieldCheck,
  Flame, Thermometer, UserCheck
} from 'lucide-react';
import { BusinessUnit } from '../types';

const UNIT_HEATMAP = [
  { name: 'Contabilidade', humor: 65, dna: 40, liability: 'R$ 42k' },
  { name: 'Jurídico', humor: 92, dna: 88, liability: 'R$ 8k' },
  { name: 'Consultoria', humor: 85, dna: 75, liability: 'R$ 15k' },
  { name: 'Ciatoslog', humor: 78, dna: 60, liability: 'R$ 22k' },
];

const RECRUITMENT_ROI = [
  { name: 'Interno (Custo)', value: 4, color: '#1a2b4b' },
  { name: 'Externo (Receita)', value: 12, color: '#c5a059' },
];

const NINE_BOX_DATA = [
  { id: 1, name: 'Ricardo Mendes', unit: 'Jurídico', pos: 'Top Talent', disc: 'C/D', perf: 'Alta', pot: 'Alta' },
  { id: 2, name: 'Lidiane Silva', unit: 'RH', pos: 'Forte Desempenho', disc: 'I/S', perf: 'Alta', pot: 'Média' },
  { id: 3, name: 'Marcos Souza', unit: 'TI', pos: 'Eficaz', disc: 'D', perf: 'Média', pot: 'Média' },
  { id: 4, name: 'Carla Oliveira', unit: 'Contábil', pos: 'Risco de Performance', disc: 'S', perf: 'Baixa', pot: 'Baixa' },
];

const ExecutiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'board' | 'ninebox' | 'compliance'>('board');

  return (
    <div className="space-y-10 animate-in fade-in pb-24">
      
      {/* HEADER DIRETORIA: DIEGO GARCIA */}
      <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col xl:flex-row justify-between items-center gap-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-slate-50 rounded-full translate-x-48 -translate-y-48" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="p-6 ciatos-navy rounded-[2.5rem] text-ciatos-gold shadow-2xl border-4 border-white">
            <Landmark size={48} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-ciatos-navy tracking-tight leading-none uppercase">Visão Diretoria: Grupo Ciatos</h2>
            <p className="text-lg text-gray-500 font-medium italic mt-2">Logado como: <span className="text-ciatos-navy font-black">Diego Garcia</span> | Perfil: Gestor dos Gestores</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="px-8 py-4 bg-emerald-50 text-emerald-700 rounded-3xl border border-emerald-100 flex items-center gap-3">
              <ShieldCheck size={28} />
              <div className="text-left">
                 <p className="text-[10px] font-black uppercase tracking-widest leading-none">Status Global</p>
                 <p className="text-sm font-black uppercase">100% Governança</p>
              </div>
           </div>
        </div>
      </div>

      {/* INSIGHT DE OURO IA - SEMPRE NO TOPO */}
      <div className="bg-gradient-to-r from-ciatos-navy to-slate-900 p-1 bg-ciatos-gold rounded-[4rem] shadow-2xl overflow-hidden animate-pulse hover:animate-none transition-all">
         <div className="bg-ciatos-navy/90 backdrop-blur-md p-12 rounded-[3.8rem] flex flex-col md:flex-row items-center gap-10 border border-white/10">
            <div className="p-6 bg-ciatos-gold text-ciatos-navy rounded-3xl shadow-[0_0_40px_rgba(197,160,89,0.4)]">
               <Sparkles size={48} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-ciatos-gold font-black text-xs uppercase tracking-[0.4em] mb-3">Advisor: Insight de Ouro do Dia</h3>
               <p className="text-2xl font-medium text-white leading-relaxed italic">
                 "Diego, o excesso de horas extras no setor **Contábil** está derrubando o humor da equipe sistematicamente às sextas-feiras. Recomendo ativação imediata de escala flexível para evitar turnover de talentos-chave."
               </p>
            </div>
            <button className="px-10 py-5 bg-white text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-ciatos-gold transition-all shadow-xl">Ativar Recomendação</button>
         </div>
      </div>

      {/* TABS EXECUTIVAS */}
      <div className="flex gap-10 border-b border-gray-100 px-6 overflow-x-auto scrollbar-hide">
        <TabBtn label="Dashboard Consolidado" active={activeTab === 'board'} onClick={() => setActiveTab('board')} icon={<Globe size={18}/>} />
        <TabBtn label="Matriz Nine-Box IA" active={activeTab === 'ninebox'} onClick={() => setActiveTab('ninebox')} icon={<Target size={18}/>} />
        <TabBtn label="Radar de Risco & Compliance" active={activeTab === 'compliance'} onClick={() => setActiveTab('compliance')} icon={<ShieldAlert size={18}/>} />
      </div>

      {activeTab === 'board' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-4">
           {/* KPIs Consolidados do Grupo */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <BoardStat label="Média Humor Grupo" value="82%" sub="Mapa de Calor Ativo" icon={<Thermometer className="text-emerald-500" />} />
              <BoardStat label="DNA Ciatos (Testes)" value="64%" sub="Adesão à Gamificação" trend={+15} icon={<BrainCircuit className="text-ciatos-gold" />} />
              <BoardStat label="Passivo Estimado (HB)" value="R$ 87k" sub="Total de Horas do Grupo" risk="Médio" icon={<DollarSign className="text-red-500" />} />
              <BoardStat label="Receita Recrutamento" value="R$ 145k" sub="Vagas Clientes Externos" trend={+22} icon={<Coins className="text-emerald-600" />} />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Mapa de Calor por Unidade */}
              <div className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden relative">
                 <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-ciatos-navy text-ciatos-gold rounded-2xl shadow-lg"><Flame size={24} /></div>
                       <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Mapa de Calor: Clima vs Engajamento DNA</h3>
                    </div>
                    <div className="flex gap-6 text-[10px] font-black uppercase">
                       <LegendItem color="#1a2b4b" label="Energia/Humor" />
                       <LegendItem color="#c5a059" label="Conclusão DNA" />
                    </div>
                 </div>
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={UNIT_HEATMAP}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                          <YAxis hide />
                          <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                          <Bar dataKey="humor" fill="#1a2b4b" radius={[10, 10, 0, 0]} name="Humor (%)" barSize={40} />
                          <Bar dataKey="dna" fill="#c5a059" radius={[10, 10, 0, 0]} name="DNA Ciatos (%)" barSize={40} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* ROI Recrutamento */}
              <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col items-center">
                 <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest mb-10 w-full">ROI Recrutamento: Receita vs Custo</h3>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie
                            data={RECRUITMENT_ROI}
                            cx="50%" cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={10}
                            dataKey="value"
                          >
                             {RECRUITMENT_ROI.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                             ))}
                          </Pie>
                          <Tooltip />
                       </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="w-full space-y-4 mt-6">
                    <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <span className="text-[10px] font-black text-gray-400 uppercase">Receita (Clientes)</span>
                       <span className="text-sm font-black text-ciatos-gold">12 Vagas</span>
                    </div>
                    <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <span className="text-[10px] font-black text-gray-400 uppercase">Custo (Interno)</span>
                       <span className="text-sm font-black text-ciatos-navy">4 Vagas</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'ninebox' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-4">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Matriz Nine-Box IA */}
              <div className="lg:col-span-8 bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm">
                 <div className="flex justify-between items-center mb-16">
                    <div>
                       <h3 className="text-2xl font-black text-ciatos-navy tracking-tight uppercase">Talent Analytics: Matriz Nine-Box</h3>
                       <p className="text-sm text-gray-400 font-medium italic mt-1">Crossing: Performance (Real) vs Potencial (IA Prediction)</p>
                    </div>
                    <div className="p-4 bg-ciatos-gold/10 text-ciatos-gold rounded-2xl flex items-center gap-3">
                       <BrainCircuit size={24} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Mapping v5.0 Active</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-4 h-[600px] relative">
                    <NineBoxCell label="Enigma" color="bg-amber-50" />
                    <NineBoxCell label="Crescimento" color="bg-emerald-50" />
                    <NineBoxCell label="Top Talent" color="bg-ciatos-navy text-white shadow-xl" leaders={[NINE_BOX_DATA[0]]} />
                    
                    <NineBoxCell label="Dilema" color="bg-red-50" />
                    <NineBoxCell label="Eficaz" color="bg-gray-50" leaders={[NINE_BOX_DATA[2]]} />
                    <NineBoxCell label="Forte Desempenho" color="bg-emerald-50" leaders={[NINE_BOX_DATA[1]]} />
                    
                    <NineBoxCell label="Risco de Performance" color="bg-red-100" leaders={[NINE_BOX_DATA[3]]} />
                    <NineBoxCell label="Sólido" color="bg-gray-100" />
                    <NineBoxCell label="Especialista" color="bg-gray-50" />
                 </div>
              </div>

              {/* Insights de Sucessão */}
              <div className="lg:col-span-4 space-y-8">
                 <div className="bg-ciatos-navy p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-l-[16px] border-l-ciatos-gold">
                    <Sparkles className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
                    <h4 className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.2em] mb-8">Advisor: Talent Insight</h4>
                    <div className="space-y-8">
                       <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-sm font-black text-ciatos-gold mb-2 uppercase">Plano de Sucessão</p>
                          <p className="text-xs text-gray-300 italic leading-relaxed">
                            "O colaborador **Ricardo Mendes** (Jurídico) atingiu o quadrante Top Talent. Sugerido mapeamento imediato para cargo de Direção Técnica."
                          </p>
                       </div>
                       <div className="p-6 bg-red-900/40 rounded-2xl border border-red-500/20">
                          <p className="text-sm font-black text-red-400 mb-2 uppercase">Risco Crítico</p>
                          <p className="text-xs text-gray-300 italic leading-relaxed">
                            "**Carla Oliveira** está no quadrante de Risco. Baixa aderência ao DNA Ciatos e performance declinante. Requer intervenção ou offboarding."
                          </p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm text-center">
                    <Trophy size={48} className="text-ciatos-gold mx-auto mb-4" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Taxa de Retenção de High Pots</p>
                    <p className="text-4xl font-black text-ciatos-navy">96.8%</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* STRATEGIC ADVISOR: CHAT DE DECISÃO */}
      <div className="bg-white rounded-[5rem] border border-gray-100 shadow-2xl p-14 relative overflow-hidden">
         <div className="absolute right-[-40px] top-[-40px] text-slate-50 opacity-50"><BrainCircuit size={300} /></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-14">
            <div className="flex-1 space-y-8">
               <div className="flex items-center gap-6">
                  <div className="p-5 bg-ciatos-navy text-ciatos-gold rounded-3xl shadow-xl border-4 border-white"><MessageSquareQuote size={40} /></div>
                  <div>
                     <h3 className="text-3xl font-black text-ciatos-navy tracking-tight uppercase">Strategic Advisor Executive</h3>
                     <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1 italic">Inteligência de Suporte à Decisão de Board</p>
                  </div>
               </div>
               <p className="text-lg text-gray-600 font-medium leading-relaxed italic max-w-2xl">
                 "Diego, estou pronto para simular cenários. Pergunte-me sobre promoções, comparação de unidades ou riscos de passivo trabalhista."
               </p>
               <div className="flex flex-wrap gap-4">
                  <QuickQuestionBtn label="Quem promover para Gerente Contábil?" />
                  <QuickQuestionBtn label="Comparar Produtividade: Jurídico vs Fiscal" />
                  <QuickQuestionBtn label="Simular Risco de Saída do Ricardo" />
               </div>
            </div>
            <div className="w-full md:w-[450px]">
               <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Sua consulta estratégica aqui..." 
                    className="w-full pl-8 pr-24 py-8 bg-gray-50 border border-gray-200 rounded-[3rem] text-sm font-bold shadow-inner focus:ring-4 focus:ring-ciatos-gold/10 transition-all outline-none"
                  />
                  <button className="absolute right-4 top-4 p-5 bg-ciatos-navy text-ciatos-gold rounded-[2rem] shadow-xl hover:scale-105 active:scale-95 transition-all">
                     <Zap size={24} />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* FOOTER DE PROTEÇÃO BOARD */}
      <div className="text-center space-y-4 py-10 opacity-40">
         <ShieldCheck size={32} className="mx-auto text-ciatos-navy" />
         <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Protocolo Elite Advisor v7.2 | Criptografia End-to-End Ativa</p>
      </div>
    </div>
  );
};

const TabBtn = ({ label, active, onClick, icon }: any) => (
  <button onClick={onClick} className={`pb-6 flex items-center gap-4 text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'text-ciatos-gold border-b-2 border-ciatos-gold scale-105' : 'text-gray-400 hover:text-ciatos-navy'}`}>
    {icon} {label}
  </button>
);

const BoardStat = ({ label, value, sub, trend, risk, icon }: any) => (
  <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
     <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-gray-50 rounded-2xl shadow-sm">{icon}</div>
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
     <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">{label}</p>
     <p className="text-[9px] font-bold text-gray-300 uppercase mt-0.5">{sub}</p>
  </div>
);

const NineBoxCell = ({ label, color, leaders }: any) => (
  <div className={`p-6 rounded-3xl border border-gray-200 flex flex-col items-center justify-center text-center relative transition-all hover:scale-[1.02] ${color}`}>
     <span className="absolute top-4 left-5 text-[8px] font-black uppercase tracking-widest opacity-30">{label}</span>
     <div className="flex -space-x-3">
        {leaders?.map((l: any) => (
           <div key={l.id} className="w-14 h-14 rounded-2xl bg-white border-2 border-ciatos-gold flex flex-col items-center justify-center shadow-xl group cursor-pointer hover:z-20 hover:scale-110 transition-all">
              <span className="font-black text-ciatos-navy text-lg leading-none">{l.name[0]}</span>
              <span className="text-[7px] font-black text-ciatos-gold uppercase">{l.disc}</span>
           </div>
        ))}
     </div>
  </div>
);

const QuickQuestionBtn = ({ label }: { label: string }) => (
  <button className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[9px] font-black text-gray-500 uppercase tracking-widest hover:border-ciatos-gold hover:text-ciatos-navy transition-all">
     {label}
  </button>
);

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-2">
     <div className="w-3 h-3 rounded-full shadow-sm" style={{backgroundColor: color}} />
     <span>{label}</span>
  </div>
);

const Trophy = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
);

export default ExecutiveDashboard;
