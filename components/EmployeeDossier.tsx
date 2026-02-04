
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, User, Heart, BarChart2, 
  MessageCircle, GraduationCap, Lightbulb, Shield,
  CheckCircle, AlertCircle, Clock, Calendar, AlertTriangle,
  ClipboardCheck, HardHat, FileBadge, Zap, Sparkles, Brain,
  MessageSquareText, Star, BookOpen, RefreshCw, TrendingUp,
  Briefcase, Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { EmployeeStatus, DocumentCategory, DocumentStatus } from '../types';
import { analyzeEmployeeDossier } from '../services/geminiService';

const getEmployeeData = (id: string) => ({
  id,
  name: 'Ricardo Mendes',
  role: 'Advogado Sênior',
  department: 'Jurídico',
  unit: 'Ciatos Jurídico',
  status: EmployeeStatus.ACTIVE,
  email: 'ricardo.mendes@ciatos.com.br',
  phone: '(11) 98765-4321',
  hiringDate: '12 Jan 2021',
  behavioral: {
    disc: [
      { subject: 'Dominância', A: 85, fullMark: 100 },
      { subject: 'Influência', A: 40, fullMark: 100 },
      { subject: 'Estabilidade', A: 60, fullMark: 100 },
      { subject: 'Conformidade', A: 95, fullMark: 100 },
    ],
    appreciationLanguage: 'Atos de Serviço / Palavras de Afirmação',
    communicationStyle: 'Direto e Analítico',
    learningStyle: 'Pragmático / Visual',
    motivationFactors: ['Desafios Técnicos', 'Autonomia Decisória', 'Reconhecimento de Especialista']
  },
  managerGuide: {
    howToCommunicate: [
      'Seja objetivo e foque em dados e fatos.',
      'Evite rodeios sociais excessivos no início de reuniões técnicas.',
      'Forneça documentação escrita para apoio.'
    ],
    howToMotivate: [
      'Delegue casos complexos que exijam alta precisão.',
      'Ofereça autonomia na estruturação da tese jurídica.',
      'Reconheça publicamente sua competência técnica.'
    ],
    howToFeedback: [
      'Foque na eficácia do processo e na qualidade técnica.',
      'Apresente evidências claras de onde a conformidade falhou.',
      'Construa o plano de melhoria em conjunto (colaborativo).'
    ]
  },
  emotionalTrend: [
    { day: 'Seg', val: 80 }, { day: 'Ter', val: 85 }, { day: 'Qua', val: 70 }, 
    { day: 'Qui', val: 90 }, { day: 'Sex', val: 88 }
  ],
  documents: [
    { name: 'Contrato Social - CLT', category: 'Contratual' as DocumentCategory, status: 'Válido' as DocumentStatus, date: '12/01/2021' },
    { name: 'ASO Periódico', category: 'Saúde' as DocumentCategory, status: 'Vencido' as DocumentStatus, date: '05/02/2024', expiryDate: '05/02/2025' },
    { name: 'NR-10 (Segurança)', category: 'Treinamentos' as DocumentCategory, status: 'Pendente' as DocumentStatus, date: '-' },
  ],
  performanceMetrics: [
    { label: 'Entrega de Prazos', value: 98 },
    { label: 'Qualidade Técnica', value: 92 },
    { label: 'Colaboração', value: 85 }
  ],
  feedbacks: [
    { date: '15 Mai 2024', author: 'Dr. João Diretor', type: 'Recognition', note: 'Excelente condução do caso X. Demonstrou alta senioridade técnica.' },
    { date: '02 Mar 2024', author: 'RH Ciatos', type: 'PDI', note: 'Definição de trilha de liderança para o próximo semestre.' }
  ],
  trainings: [
    { title: 'Compliance LGPD Avançado', date: 'Abr 2024', score: 100 },
    { title: 'Liderança de Alta Performance', date: 'Jan 2024', score: 92 }
  ],
  managerNotes: 'Ricardo é um pilar no setor jurídico. Possui forte tendência à liderança técnica.',
  classifications: {
    engagement: 'Alto',
    emotionalRisk: 'Baixo',
    growthPotential: 'Sênior / Especialista',
    jobFit: 'Ideal'
  }
});

const BlockHeader: React.FC<{ icon: React.ReactNode; title: string; color?: string; badge?: string }> = ({ icon, title, color = 'text-ciatos-navy', badge }) => (
  <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
    <div className="flex items-center gap-3">
      <div className={color}>{icon}</div>
      <h3 className={`text-sm font-bold uppercase tracking-[0.15em] ${color}`}>{title}</h3>
    </div>
    {badge && <span className="text-[9px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">{badge}</span>}
  </div>
);

const EmployeeDossier: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = getEmployeeData(id || '1');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    handleTriggerAnalysis();
  }, [id]);

  const handleTriggerAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeEmployeeDossier(data);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'Válido': return 'bg-green-100 text-green-700 border-green-200';
      case 'Vencido': return 'bg-red-100 text-red-700 border-red-200';
      case 'Pendente': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in pb-12">
      {/* 0. Header do Dossiê */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/employees')} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 text-gray-400"><ArrowLeft size={20} /></button>
          <div className="w-20 h-20 rounded-3xl ciatos-navy text-ciatos-gold flex items-center justify-center text-3xl font-bold shadow-lg">
            {data.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-ciatos-navy">{data.name}</h2>
              <span className="px-4 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {data.status}
              </span>
            </div>
            <p className="text-gray-500 font-medium">{data.role} • {data.unit}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 uppercase tracking-widest">Dossiê PDF</button>
          <button className="px-6 py-3 ciatos-navy text-white rounded-xl text-xs font-bold shadow-lg uppercase tracking-widest">Agendar 1:1</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bloco 1: Classificações de Inteligência */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <IntelligenceCard icon={<TrendingUp size={18} />} label="Engajamento" value={data.classifications.engagement} color="text-green-600" />
          <IntelligenceCard icon={<Heart size={18} />} label="Risco Emocional" value={data.classifications.emotionalRisk} color="text-emerald-600" />
          <IntelligenceCard icon={<Star size={18} />} label="Potencial de Crescimento" value={data.classifications.growthPotential} color="text-ciatos-gold" />
          <IntelligenceCard icon={<Target size={18} />} label="Adequação ao Cargo" value={data.classifications.jobFit} color="text-ciatos-navy" />
        </div>

        {/* Bloco 2: Dados Cadastrais */}
        <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <BlockHeader icon={<User size={18} />} title="1. Dados Cadastrais" />
          <div className="grid grid-cols-2 gap-6">
            <InfoRow label="Email" value={data.email} />
            <InfoRow label="Telefone" value={data.phone} />
            <InfoRow label="Admissão" value={data.hiringDate} />
            <InfoRow label="Empresa" value={data.unit} />
          </div>
        </div>

        {/* Bloco 3: Documentação */}
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <BlockHeader icon={<FileBadge size={18} />} title="2. Compliance Documental" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-gray-700 truncate">{doc.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-medium">{doc.category}</p>
                </div>
                <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bloco 4: Perfil Comportamental & Tendências (DISC) */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <BlockHeader icon={<Brain size={18} />} title="3. Perfil Comportamental" badge="DISC" />
          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.behavioral.disc}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10, fontWeight: 'bold'}} />
                <Radar name="Perfil" dataKey="A" stroke="#c5a059" fill="#c5a059" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl">
               <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Valorização</p>
               <p className="text-xs font-bold text-gray-700 leading-tight">{data.behavioral.appreciationLanguage}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
               <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Estilo Comunicação</p>
               <p className="text-xs font-bold text-gray-700 leading-tight">{data.behavioral.communicationStyle}</p>
            </div>
          </div>
        </div>

        {/* Bloco 5 & 6: Emocional e Performance */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <BlockHeader icon={<Heart size={18} />} title="4. Saúde Emocional" />
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.emotionalTrend}>
                  <Area type="monotone" dataKey="val" stroke="#c5a059" fill="#c5a05920" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <BlockHeader icon={<BarChart2 size={18} />} title="5. Produtividade & KPIs" />
            <div className="space-y-4">
              {data.performanceMetrics.map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase mb-1">
                    <span>{m.label}</span>
                    <span>{m.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full ciatos-navy" style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bloco 7: Guia Estratégico para o Gestor */}
        <div className="lg:col-span-12 bg-white p-10 rounded-[3rem] border border-ciatos-gold/20 shadow-xl border-l-[12px] border-l-ciatos-gold">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-ciatos-gold animate-pulse" size={28} />
            <h3 className="text-xl font-bold text-ciatos-navy uppercase tracking-widest">Guia Estratégico de Liderança</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-ciatos-gold font-bold mb-4">
                <MessageSquareText size={20} />
                <span className="text-sm uppercase tracking-wider">Como se Comunicar</span>
              </div>
              <ul className="space-y-3">
                {data.managerGuide.howToCommunicate.map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-3 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-ciatos-gold mt-1.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-ciatos-gold font-bold mb-4">
                <Zap size={20} />
                <span className="text-sm uppercase tracking-wider">Como Motivar</span>
              </div>
              <ul className="space-y-3">
                {data.managerGuide.howToMotivate.map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-3 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-ciatos-gold mt-1.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-ciatos-gold font-bold mb-4">
                <Star size={20} />
                <span className="text-sm uppercase tracking-wider">Abordagem de Feedback</span>
              </div>
              <ul className="space-y-3">
                {data.managerGuide.howToFeedback.map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-3 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-ciatos-gold mt-1.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bloco 8: Análise IA Ciatos (Otimizada) */}
        <div className="lg:col-span-12 bg-ciatos-navy p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
          <Sparkles className="absolute top-[-40px] right-[-40px] text-white/5 w-64 h-64" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-ciatos-gold rounded-2xl shadow-xl shadow-amber-600/20">
                  <Brain className="text-ciatos-navy" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-widest text-ciatos-gold">Ciatos Intelligence Engine</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Diagnóstico Preditivo Individual</p>
                </div>
              </div>
              <button 
                onClick={handleTriggerAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-2 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2"
              >
                {isAnalyzing ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />} 
                Recalcular Inteligência
              </button>
            </div>

            {isAnalyzing ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-ciatos-gold border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Cruzando dados históricos...</p>
              </div>
            ) : aiAnalysis ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 text-ciatos-gold font-black uppercase text-[10px] mb-4">
                      <Shield size={14} /> Alertas de Risco & DP
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {aiAnalysis.split('ALERTAS:')[1]?.split('DESENVOLVIMENTO:')[0] || "Nenhum risco crítico identificado nos últimos 30 dias."}
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 text-ciatos-gold font-black uppercase text-[10px] mb-4">
                      <TrendingUp size={14} /> Potencial & Sucessão
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {aiAnalysis.split('CLASSIFICAÇÃO:')[1]?.split('INSIGHTS:')[0] || "Dados insuficientes para mapeamento de sucessão."}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-ciatos-gold/10 border border-ciatos-gold/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-ciatos-gold font-black uppercase text-[10px] mb-4">
                      <Lightbulb size={14} /> Recomendações Estratégicas
                    </div>
                    <div className="text-xs text-gray-100 leading-relaxed whitespace-pre-wrap italic">
                      {aiAnalysis.split('INSIGHTS:')[1]?.split('ALERTAS:')[0] || "Aguardando geração de insights."}
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 text-ciatos-gold font-black uppercase text-[10px] mb-4">
                      <GraduationCap size={14} /> Trilhas Sugeridas
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {aiAnalysis.split('DESENVOLVIMENTO:')[1] || "Trilha padrão Ciatos Academy recomendada."}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center opacity-40">
                <Brain size={48} className="mx-auto mb-4 text-gray-500" />
                <p className="text-xs font-medium uppercase tracking-widest">Inicie a análise preditiva para este colaborador.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const IntelligenceCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
    <div className={`p-3 rounded-2xl bg-gray-50 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className={`text-sm font-bold mt-0.5 ${color}`}>{value}</p>
    </div>
  </div>
);

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">{label}</span>
    <span className="text-sm font-semibold text-gray-800 truncate">{value}</span>
  </div>
);

export default EmployeeDossier;
