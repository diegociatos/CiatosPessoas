
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Heart, Sparkles, MessageSquare, Lightbulb, 
  Camera, CheckCircle2, ChevronRight, Brain, 
  Target, GraduationCap, Star, TrendingUp, 
  Zap, Smile, Frown, Meh, Angry,
  Camera as CameraIcon, Send, Rocket,
  ShieldCheck, Coffee, FileSignature, 
  FileText, Calendar, Quote, Archive, X,
  Coins, Trophy, Gift, ArrowUpRight, Crown,
  UserCheck, RefreshCw, Clock, History, BarChart3,
  CalendarCheck, AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { processEmployeeFeedback } from '../services/geminiService';

const WEEKLY_HOURS_DATA = [
  { day: 'Seg', hours: 8.5, target: 8 },
  { day: 'Ter', hours: 9.2, target: 8 },
  { day: 'Qua', hours: 8.0, target: 8 },
  { day: 'Qui', hours: 10.5, target: 8 },
  { day: 'Sex', hours: 7.8, target: 8 },
];

const EmployeeHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Gamificação: Pontos e Progresso
  const [points, setPoints] = useState(145);
  const [isPointsAnimating, setIsPointsAnimating] = useState(false);
  const [checklist, setChecklist] = useState({
    disc: true,
    valorizacao: false,
    expectativas: false,
    foto: false,
    docsSigned: 0 
  });

  // Jornada / Banco de Horas
  const [timeBalance, setTimeBalance] = useState({ hours: 12, mins: 30, isPositive: true });
  
  // Humor e Bem-estar
  const [mood, setMood] = useState<string | null>(null);
  const [moodStreak, setMoodStreak] = useState(0); 
  const [moodPointsClaimed, setMoodPointsClaimed] = useState(false);
  
  // Cultura
  const [showPraiseForm, setShowPraiseForm] = useState(false);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [praise, setPraise] = useState({ to: '', message: '' });
  const [suggestion, setSuggestion] = useState({ message: '', anonymous: false });
  const [isSending, setIsSending] = useState(false);

  // Cálculos de Status
  const dnaProgress = useMemo(() => {
    let progress = 0;
    if (checklist.disc) progress += 25;
    if (checklist.valorizacao) progress += 20;
    if (checklist.expectativas) progress += 20;
    if (checklist.foto) progress += 15;
    if (checklist.docsSigned > 0) progress += 20;
    return Math.min(progress, 100);
  }, [checklist]);

  const levelInfo = useMemo(() => {
    if (points >= 300) return { title: 'Nível 3: Especialista', icon: <Crown size={16}/>, color: 'text-amber-500', bg: 'bg-amber-50' };
    if (points >= 100) return { title: 'Nível 2: Engajado', icon: <Star size={16}/>, color: 'text-ciatos-gold', bg: 'bg-ciatos-gold/10' };
    return { title: 'Nível 1: Iniciante', icon: <UserCheck size={16}/>, color: 'text-gray-400', bg: 'bg-gray-100' };
  }, [points]);

  const addPoints = (amount: number) => {
    setIsPointsAnimating(true);
    setPoints(prev => prev + amount);
    setTimeout(() => setIsPointsAnimating(false), 800);
  };

  const handleMoodSelect = (moodType: string) => {
    setMood(moodType);
    if (!moodPointsClaimed) {
      addPoints(5);
      setMoodPointsClaimed(true);
    }
    if (moodType === 'Exausto' || moodType === 'Preocupado') {
      setMoodStreak(2);
    } else {
      setMoodStreak(0);
    }
  };

  const handleSignDoc = () => {
    setChecklist(prev => ({ ...prev, docsSigned: prev.docsSigned + 1 }));
    addPoints(10);
    alert("Documento assinado! +10 Ciatos Coins creditados.");
  };

  const handleSendPraise = async () => {
    setIsSending(true);
    await processEmployeeFeedback(praise.message, 'praise');
    addPoints(10);
    setIsSending(false);
    setShowPraiseForm(false);
    setPraise({ to: '', message: '' });
    alert("Reconhecimento enviado! +10 Ciatos Coins");
  };

  const handleSendSuggestion = async () => {
    setIsSending(true);
    await processEmployeeFeedback(suggestion.message, 'suggestion');
    addPoints(15);
    setIsSending(false);
    setShowSuggestionForm(false);
    setSuggestion({ message: '', anonymous: false });
    alert("Sugestão registrada! +15 Ciatos Coins");
  };

  const handleRequestCompensate = () => {
    alert("Solicitação de compensação enviada ao Gestor Carlos. Você receberá uma notificação em breve.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in pb-20">
      
      {/* 1. CABEÇALHO DE STATUS & GAMIFICAÇÃO */}
      <div className="bg-white rounded-[3.5rem] p-10 border border-gray-100 shadow-sm flex flex-col xl:flex-row justify-between items-center gap-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-slate-50 rounded-full translate-x-40 -translate-y-40" />
        
        <div className="flex items-center gap-8 relative z-10">
          <div className="relative group">
            <div className="w-28 h-28 rounded-[2.5rem] ciatos-navy text-ciatos-gold flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white overflow-hidden">
               {user?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <label className="absolute bottom-[-2px] right-[-2px] p-2.5 bg-ciatos-gold text-ciatos-navy rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-all border-4 border-white">
              <CameraIcon size={16} />
            </label>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-ciatos-navy tracking-tight leading-none">Olá, {user?.name.split(' ')[0]}!</h2>
            <p className="text-sm text-gray-400 font-medium max-w-xs leading-relaxed">Sua jornada na <span className="text-ciatos-navy font-bold">{user?.unit || 'Ciatos'}</span> é nossa prioridade.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <Quote size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest italic">"O mérito é a base da nossa excelência."</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-xl space-y-6 relative z-10">
           <div className="flex justify-between items-end">
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">DNA Ciatos (Perfil)</p>
                 <h4 className="text-lg font-black text-ciatos-navy">Nível de Completude</h4>
              </div>
              <span className="text-xl font-black text-ciatos-gold">{dnaProgress}%</span>
           </div>
           <div className="w-full h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-1">
              <div className="h-full bg-gradient-to-r from-ciatos-navy to-ciatos-gold rounded-full transition-all duration-1000" style={{ width: `${dnaProgress}%` }} />
           </div>
           <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-xl shadow-sm transition-transform duration-300 ${isPointsAnimating ? 'scale-125' : ''} bg-white text-ciatos-gold border border-ciatos-gold/20`}>
                    <Coins size={24} />
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Saldo Atual</p>
                    <p className="text-lg font-black text-ciatos-navy">{points} Ciatos Coins</p>
                 </div>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-xl shadow-sm ${levelInfo.bg} ${levelInfo.color}`}>
                    <Trophy size={24} />
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status de Carreira</p>
                    <p className={`text-xs font-black uppercase ${levelInfo.color}`}>{levelInfo.title}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. MÓDULO "COMO ESTÁ SEU HUMOR?" */}
      <div className={`bg-white p-10 rounded-[4rem] border border-gray-100 shadow-sm relative overflow-hidden transition-all duration-700 ${moodStreak >= 2 ? 'ring-4 ring-red-100 shadow-xl' : ''}`}>
        <div className="absolute top-[-40px] right-[-40px] text-gray-50 opacity-10 rotate-12"><Heart size={200} /></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-black text-ciatos-navy tracking-tight">Como você se sente para trabalhar hoje?</h3>
            <div className="flex items-center gap-2">
               <Coins size={14} className="text-ciatos-gold" />
               <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest">Ganhe +5 pontos pelo seu check-in diário!</p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <MoodBtn icon={<Angry size={28}/>} label="Exausto" active={mood === 'Exausto'} onClick={() => handleMoodSelect('Exausto')} color="hover:text-red-500" />
            <MoodBtn icon={<Frown size={28}/>} label="Preocupado" active={mood === 'Preocupado'} onClick={() => handleMoodSelect('Preocupado')} color="hover:text-orange-500" />
            <MoodBtn icon={<Meh size={28}/>} label="Neutro" active={mood === 'Neutro'} onClick={() => handleMoodSelect('Neutro')} color="hover:text-amber-500" />
            <MoodBtn icon={<Smile size={28}/>} label="Motivado" active={mood === 'Motivado'} onClick={() => handleMoodSelect('Motivado')} color="hover:text-emerald-500" />
            <MoodBtn icon={<Rocket size={28}/>} label="Engajado" active={mood === 'Engajado'} onClick={() => handleMoodSelect('Engajado')} color="hover:text-blue-500" />
          </div>
        </div>

        {moodStreak >= 2 && (
          <div className="mt-8 bg-red-50 p-8 rounded-[3rem] border border-red-100 flex items-center justify-between animate-in zoom-in shadow-inner">
             <div className="flex items-center gap-6">
                <div className="p-4 bg-red-600 text-white rounded-2xl shadow-lg">
                   <Coffee size={28} />
                </div>
                <div>
                   <h4 className="text-lg font-black text-red-900">Notamos que você não está nos seus melhores dias.</h4>
                   <p className="text-sm font-medium text-red-700">O Grupo Ciatos se importa com você. Quer agendar um café com o RH para conversar?</p>
                </div>
             </div>
             <button className="px-8 py-3 bg-white text-red-600 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">Solicitar Café de Apoio</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* 3. CENTRAL DE JORNADA & BANCO DE HORAS */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-ciatos-navy rounded-xl"><Clock size={18} className="text-ciatos-gold" /></div>
              <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-[0.2em]">Minha Jornada & Ponto</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Saldo de Horas Card */}
              <div className="md:col-span-5 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute right-[-20px] top-[-20px] text-gray-50 opacity-10"><History size={120} /></div>
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Saldo do Banco de Horas</p>
                    <h4 className={`text-4xl font-black tracking-tighter ${timeBalance.isPositive ? 'text-ciatos-gold' : 'text-red-500'}`}>
                       {timeBalance.isPositive ? '+' : '-'}{timeBalance.hours}h {timeBalance.mins}min
                    </h4>
                 </div>
                 
                 <div className="mt-10 space-y-4">
                    {timeBalance.hours >= 20 && (
                       <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3 animate-in fade-in">
                          <Sparkles size={16} className="text-ciatos-gold shrink-0 mt-0.5" />
                          <p className="text-[10px] text-amber-800 font-bold leading-relaxed italic">
                             "Você tem muitas horas acumuladas! Que tal sugerir um day-off ao seu gestor?"
                          </p>
                       </div>
                    )}
                    <button 
                       onClick={handleRequestCompensate}
                       className="w-full py-4 bg-ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                       <CalendarCheck size={14} /> Solicitar Compensação
                    </button>
                 </div>
              </div>

              {/* Gráfico Semanal */}
              <div className="md:col-span-7 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
                 <div className="flex justify-between items-center mb-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Atividade na Última Semana</p>
                    <div className="flex gap-4 text-[8px] font-black uppercase">
                       <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-ciatos-gold" /> Realizado</div>
                       <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-100" /> Padrão (8h)</div>
                    </div>
                 </div>
                 <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={WEEKLY_HOURS_DATA}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                          <YAxis hide />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                          <Bar dataKey="hours" radius={[6, 6, 0, 0]} barSize={24}>
                             {WEEKLY_HOURS_DATA.map((entry, index) => (
                                <Cell key={index} fill={entry.hours > 8 ? '#c5a059' : '#1a2b4b'} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* Central de Testes */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MissionCard 
                title="Mapeamento DISC" 
                points={50}
                status={checklist.disc ? 'Concluído' : 'Pendente'} 
                icon={<Target size={24} />} 
                onClick={() => navigate('/assessments')}
              />
              <MissionCard 
                title="Linguagens de Valorização" 
                points={30}
                status={checklist.valorizacao ? 'Concluído' : 'Pendente'} 
                icon={<Heart size={24} />} 
                onClick={() => navigate('/assessments')}
              />
              <MissionCard 
                title="Expectativas" 
                points={30}
                status={checklist.expectativas ? 'Concluído' : 'Pendente'} 
                icon={<Lightbulb size={24} />} 
                onClick={() => navigate('/assessments')}
              />
           </div>

           {/* 4. MEUS DOCUMENTOS (Conformidade DP) */}
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-8 px-2">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 text-ciatos-navy rounded-2xl"><Archive size={24} /></div>
                    <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Documentação & Ponto</h3>
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                       <tr>
                          <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Mês</th>
                          <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Documento</th>
                          <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                          <th className="px-6 py-4"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       <DocRow month="Junho 2024" type="Espelho de Ponto Mensal" status={checklist.docsSigned > 0 ? "Assinado" : "Aguardando (+10 pts)"} onSign={handleSignDoc} />
                       <DocRow month="Junho 2024" type="Extrato Banco de Horas" status="Visualizar" />
                       <DocRow month="Junho 2024" type="Holerite Mensal" status="Assinado" />
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="lg:col-span-4 space-y-10">
           
           {/* VITRINE DE RECOMPENSAS */}
           <div className="bg-ciatos-gold p-10 rounded-[3.5rem] text-ciatos-navy shadow-xl relative overflow-hidden group">
              <Gift className="absolute top-[-20px] right-[-20px] text-white/20 w-48 h-48 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/20 rounded-xl"><Trophy size={16} /></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Próxima Recompensa</span>
                 </div>
                 <h4 className="text-xl font-black tracking-tight leading-tight">Day-off de Aniversário ou Curso Premium</h4>
                 <div className="mt-8 space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                       <span>Progresso para 200 pts</span>
                       <span>Faltam {200 - points} pts</span>
                    </div>
                    <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                       <div className="h-full bg-ciatos-navy transition-all duration-1000" style={{ width: `${(points/200)*100}%` }} />
                    </div>
                 </div>
                 <p className="text-[10px] font-bold mt-6 opacity-60 uppercase">Faltam {200 - points} pontos para você subir de nível!</p>
              </div>
           </div>

           {/* 5. ESPAÇO COLABORATIVO (Cultura) */}
           <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Espaço Cultura Ciatos</h4>
              
              <button 
                onClick={() => setShowPraiseForm(true)}
                className="w-full p-6 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex items-center gap-5 hover:bg-emerald-100 transition-all text-left group"
              >
                 <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-500 group-hover:scale-110 transition-transform"><Star size={24} /></div>
                 <div>
                    <p className="text-sm font-black text-emerald-900 leading-none">Elogiar um Colega</p>
                    <p className="text-[9px] text-emerald-700 font-bold mt-1 uppercase">+10 Ciatos Coins</p>
                 </div>
              </button>

              <button 
                onClick={() => setShowSuggestionForm(true)}
                className="w-full p-6 bg-blue-50 border border-blue-100 rounded-[2.5rem] flex items-center gap-5 hover:bg-blue-100 transition-all text-left group"
              >
                 <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-500 group-hover:scale-110 transition-transform"><Lightbulb size={24} /></div>
                 <div>
                    <p className="text-sm font-black text-blue-900 leading-none">Sugestão de Melhoria</p>
                    <p className="text-[9px] text-blue-700 font-bold mt-1 uppercase">+15 Ciatos Coins</p>
                 </div>
              </button>
           </div>
        </div>
      </div>

      {/* MODAIS DE CULTURA */}
      {showPraiseForm && (
        <CultureModal title="Reconhecer um Talento" icon={<Star size={24}/>} onClose={() => setShowPraiseForm(false)}>
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Quem você quer elogiar?</label>
                 <input type="text" placeholder="Nome do colega..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500" value={praise.to} onChange={e => setPraise({...praise, to: e.target.value})} />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Mensagem de Reconhecimento</label>
                 <textarea placeholder="O que esse colega fez de incrível?" className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-xs font-medium italic min-h-[120px] outline-none focus:ring-2 focus:ring-emerald-500" value={praise.message} onChange={e => setPraise({...praise, message: e.target.value})} />
              </div>
              <button onClick={handleSendPraise} disabled={isSending || !praise.to || !praise.message} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                 {isSending ? <RefreshCw className="animate-spin" size={18}/> : <><Send size={18}/> Enviar e Ganhar +10 pts</>}
              </button>
           </div>
        </CultureModal>
      )}

      {showSuggestionForm && (
        <CultureModal title="Sugestão Estratégica" icon={<Lightbulb size={24}/>} onClose={() => setShowSuggestionForm(false)}>
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Sua Ideia de Melhoria</label>
                 <textarea placeholder="Como podemos evoluir processos ou o ambiente?" className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-xs font-medium italic min-h-[150px] outline-none focus:ring-2 focus:ring-blue-500" value={suggestion.message} onChange={e => setSuggestion({...suggestion, message: e.target.value})} />
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-gray-100">
                 <input type="checkbox" checked={suggestion.anonymous} onChange={e => setSuggestion({...suggestion, anonymous: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-blue-600" />
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enviar de forma anônima</label>
              </div>
              <button onClick={handleSendSuggestion} disabled={isSending || !suggestion.message} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                 {isSending ? <RefreshCw className="animate-spin" size={18}/> : <><Rocket size={18}/> Registrar e Ganhar +15 pts</>}
              </button>
           </div>
        </CultureModal>
      )}

    </div>
  );
};

const MoodBtn = ({ icon, label, active, onClick, color }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-3xl transition-all border-2 group ${
      active ? 'bg-ciatos-navy text-ciatos-gold border-ciatos-gold scale-110 shadow-xl' : 'bg-white border-gray-100 text-gray-300 ' + color
    }`}
  >
    {icon}
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const MissionCard = ({ title, points, status, icon, onClick }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group hover:border-ciatos-gold transition-all cursor-pointer relative" onClick={onClick}>
     <div className="absolute top-6 right-8 flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-ciatos-gold rounded-full border border-amber-100">
        <Coins size={12} />
        <span className="text-[9px] font-black">+{points}</span>
     </div>
     <div className={`p-4 rounded-2xl w-fit mb-6 transition-colors ${status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400 group-hover:bg-ciatos-gold group-hover:text-white'}`}>
        {icon}
     </div>
     <h4 className="text-sm font-black text-ciatos-navy leading-tight mb-2">{title}</h4>
     <div className="mt-auto flex items-center justify-between">
        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {status}
        </span>
        <ChevronRight size={18} className="text-ciatos-gold group-hover:translate-x-1 transition-transform" />
     </div>
  </div>
);

const DocRow = ({ month, type, status, onSign }: any) => {
  const isActionable = status.includes('Aguardando') || status.includes('Assinar');
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-6 py-5 text-xs font-bold text-gray-700">{month}</td>
      <td className="px-6 py-5">
         <div className="flex items-center gap-3">
            <FileText size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{type}</span>
         </div>
      </td>
      <td className="px-6 py-5">
         <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
           status === 'Assinado' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
           isActionable ? 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse' :
           'bg-gray-50 text-gray-400 border-gray-100'
         }`}>
           {status}
         </span>
      </td>
      <td className="px-6 py-5 text-right">
         <button 
           onClick={() => isActionable && onSign()}
           className={`p-2.5 rounded-xl transition-all ${
             !isActionable ? 'bg-gray-50 text-gray-300 cursor-default' : 'bg-ciatos-navy text-ciatos-gold shadow-lg hover:scale-110 active:scale-95'
           }`}
         >
            <FileSignature size={18} />
         </button>
      </td>
    </tr>
  );
};

const CultureModal = ({ title, icon, onClose, children }: any) => (
  <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-ciatos-navy/40 backdrop-blur-md animate-in fade-in duration-300">
    <div className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
      <div className="p-10 ciatos-navy text-white flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
           <div className="p-3 bg-white/10 rounded-2xl text-ciatos-gold">{icon}</div>
           <h3 className="text-xl font-black uppercase tracking-tight">{title}</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl relative z-10"><X size={24}/></button>
      </div>
      <div className="p-10">
        {children}
      </div>
    </div>
  </div>
);

export default EmployeeHome;
