
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, BrainCircuit, ClipboardList, Info, ChevronRight, 
  CheckCircle2, AlertTriangle, Sparkles, RefreshCw, BarChart3,
  User, Send, Award, Target, HelpCircle, ChevronLeft, ShieldAlert,
  Heart, Zap, Star, MessageSquareText, Handshake, Map, BookOpen,
  Coffee, Compass, FileText, LayoutDashboard, Brain, TrendingUp, Clock,
  Trophy, Lightbulb, Rocket, Users2, SearchCheck, CheckCircle
} from 'lucide-react';
import { calculateDISC, calculateAppreciationLanguages, calculateExpectationsMapping, generateManagementManual } from '../services/geminiService';

type TestType = 'DISC' | 'APPRECIATION' | 'EXPECTATIONS' | 'CONSOLIDATED' | null;

const DISC_QUESTIONS = [
  { id: "Q1", text: "Tomo decisões rápidas focadas em resultados.", vector: 'D' },
  { id: "Q2", text: "Assumo o comando naturalmente em situações de pressão.", vector: 'D' },
  { id: "Q3", text: "Enfrento problemas de forma direta e objetiva.", vector: 'D' },
  { id: "Q4", text: "Prefiro desafios e metas ousadas a rotinas calmas.", vector: 'D' },
  { id: "Q5", text: "Aceito riscos calculados para ganhar velocidade.", vector: 'D' },
  { id: "Q6", text: "Ganho energia interagindo e persuadindo pessoas.", vector: 'I' },
  { id: "Q7", text: "Consigo engajar o time com entusiasmo.", vector: 'I' },
  { id: "Q8", text: "Faço networking e novas conexões com facilidade.", vector: 'I' },
  { id: "Q9", text: "Prefiro comunicação verbal e reuniões dinâmicas.", vector: 'I' },
  { id: "Q10", text: "Adapto-me rapidamente a ambientes sociais e mutáveis.", vector: 'I' },
  { id: "Q11", text: "Mantenho a calma e a constância em períodos intensos.", vector: 'S' },
  { id: "Q12", text: "Valorizo a colaboração e relações de longo prazo.", vector: 'S' },
  { id: "Q13", text: "Prefiro planejar detalhadamente antes de mudar processos.", vector: 'S' },
  { id: "Q14", text: "Tenho paciência para ensinar e acompanhar a evolução alheia.", vector: 'S' },
  { id: "Q15", text: "Rendo mais em ambientes com rotina clara e previsível.", vector: 'S' },
  { id: "Q16", text: "Checo detalhes e padrões rigorosamente antes da entrega.", vector: 'C' },
  { id: "Q17", text: "Sigo regras e procedimentos para garantir a segurança.", vector: 'C' },
  { id: "Q18", text: "Decido com base em dados, evidências e lógica.", vector: 'C' },
  { id: "Q19", text: "Sinto desconforto quando faltam critérios técnicos claros.", vector: 'C' },
  { id: "Q20", text: "Reviso meu trabalho exaustivamente para evitar erros.", vector: 'C' },
];

const APPRECIATION_QUESTIONS = [
  { id: "A1", text: "No trabalho, eu me sinto mais valorizado quando:", optA: "Recebo um elogio claro e específico pelo que entreguei.", optB: "Meu gestor dedica um tempo para ouvir meu contexto e desafios." },
  { id: "A2", text: "No trabalho, eu me sinto mais valorizado quando:", optA: "Meu gestor remove um obstáculo técnico que estava me travando.", optB: "Recebo autonomia e confiança explícita para tomar decisões." },
  { id: "A3", text: "No trabalho, eu me sinto mais valorizado quando:", optA: "Tenho uma reunião 1:1 de qualidade, sem interrupções.", optB: "Recebo um bônus, curso pago ou prêmio por desempenho." },
];

const EXPECTATIONS_QUESTIONS = [
  {
    id: "E1",
    text: "ÂNCORA DE MOTIVAÇÃO: O que te faz brilhar os olhos no trabalho?",
    options: [
      { id: "autonomia", text: "Autonomia para criar meu próprio fluxo.", icon: <Compass size={18} /> },
      { id: "especialidade", text: "Ser referência técnica na minha área.", icon: <Zap size={18} /> },
      { id: "lideranca", text: "Liderar e desenvolver outras pessoas.", icon: <User size={18} /> },
      { id: "estabilidade", text: "Segurança, previsibilidade e estabilidade.", icon: <ShieldCheck size={18} /> },
    ]
  },
  {
    id: "E2",
    text: "ESTILO DE APRENDIZADO: Como você aprende mais rápido?",
    options: [
      { id: "manual", text: "Lendo manuais, livros ou documentação.", icon: <BookOpen size={18} /> },
      { id: "video", text: "Assistindo vídeos, cursos ou palestras.", icon: <BarChart3 size={18} /> },
      { id: "explicacao", text: "Ouvindo uma explicação direta de alguém.", icon: <MessageSquareText size={18} /> },
      { id: "pratica", text: "Fazendo na prática com alguém acompanhando.", icon: <Handshake size={18} /> },
    ]
  }
];

const BehavioralAssessments: React.FC = () => {
  const [activeTest, setActiveTest] = useState<TestType>(null);
  const [step, setStep] = useState<'intro' | 'consent' | 'quiz' | 'calculating' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [completedTests, setCompletedTests] = useState<Record<string, boolean>>({});
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const startTest = (type: TestType) => {
    setActiveTest(type);
    setStep('consent');
    setCurrentIdx(0);
    setAnswers({});
  };

  const handleConsent = () => setStep('quiz');

  const handleSelection = async (val: any) => {
    const questions = activeTest === 'DISC' ? DISC_QUESTIONS : activeTest === 'APPRECIATION' ? APPRECIATION_QUESTIONS : EXPECTATIONS_QUESTIONS;
    const qId = questions[currentIdx].id;
    const newAnswers = { ...answers, [qId]: val };
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finalizeAssessment(newAnswers);
    }
  };

  const finalizeAssessment = async (finalAnswers: Record<string, any>) => {
    setStep('calculating');
    setIsProcessing(true);
    
    const collaborator = { nome: "Ricardo Mendes", empresa: "Ciatos Jurídico", cargo: "Advogado Sênior" };

    let result = "";
    if (activeTest === 'DISC') {
      result = await calculateDISC(collaborator, finalAnswers);
      setCompletedTests(prev => ({ ...prev, disc: true }));
    } else if (activeTest === 'APPRECIATION') {
      result = await calculateAppreciationLanguages(collaborator, finalAnswers);
      setCompletedTests(prev => ({ ...prev, appreciation: true }));
    } else if (activeTest === 'EXPECTATIONS') {
      result = await calculateExpectationsMapping(collaborator, finalAnswers);
      setCompletedTests(prev => ({ ...prev, expectations: true }));
    }

    setAiResponse(result);
    setIsProcessing(false);
    setStep('result');
    
    // Simular notificação
    setNotification(`O RH e seu Gestor foram notificados sobre a conclusão do seu perfil de ${activeTest}.`);
    setTimeout(() => setNotification(null), 5000);
  };

  const generateFullManual = async () => {
    setStep('calculating');
    setIsProcessing(true);
    setActiveTest('CONSOLIDATED');

    const consolidatedData = {
      colaborador: { nome: "Ricardo Mendes", empresa: "Ciatos Jurídico", cargo: "Advogado Sênior" },
      resultados: completedTests
    };

    const manual = await generateManagementManual(consolidatedData);
    setAiResponse(manual);
    setIsProcessing(false);
    setStep('result');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20 relative">
      
      {/* Sistema de Notificação Flutuante */}
      {notification && (
        <div className="fixed top-8 right-8 z-[300] bg-ciatos-navy border-2 border-ciatos-gold p-6 rounded-2xl text-white shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-8">
           <div className="p-2 bg-ciatos-gold rounded-xl">
              <ShieldCheck size={20} className="text-ciatos-navy" />
           </div>
           <p className="text-[11px] font-black uppercase tracking-widest">{notification}</p>
        </div>
      )}

      {/* Header de Autoconhecimento */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-slate-50 rounded-full translate-x-40 -translate-y-40" />
        <div className="relative z-10 flex items-start gap-8">
          <div className="p-6 ciatos-navy rounded-[2.5rem] shadow-2xl text-ciatos-gold border-4 border-white">
            <Rocket size={48} />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black text-ciatos-navy tracking-tight leading-none">Minha Jornada Ciatos</h1>
            <p className="text-sm text-gray-500 font-medium max-w-xl italic">
              "Conhecer a si mesmo é o começo de toda sabedoria estratégica." – Central de Autoconhecimento.
            </p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Progresso da Jornada</span>
              <div className="flex gap-2">
                 <ProgressDot done={!!completedTests.disc} />
                 <ProgressDot done={!!completedTests.appreciation} />
                 <ProgressDot done={!!completedTests.expectations} />
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col relative">
        
        {step === 'intro' && (
          <div className="flex-1 p-16 lg:p-24 flex flex-col">
             <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
                <div>
                   <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Onde você deseja começar?</h2>
                   <p className="text-gray-400 font-medium mt-2">Cada pilar desbloqueia novas camadas da sua inteligência profissional.</p>
                </div>
                {Object.keys(completedTests).length >= 3 && (
                  <button 
                    onClick={generateFullManual}
                    className="px-10 py-5 bg-gradient-to-r from-ciatos-gold to-amber-400 text-navy-900 rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:scale-105 transition-all animate-pulse"
                  >
                    <Sparkles size={20} /> Meu Manual do Eu (Consolidado)
                  </button>
                )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <JourneyCard 
                   icon={<BrainCircuit size={40}/>}
                   title="Meu Perfil DISC"
                   desc="Como eu ajo e reajo sob pressão e no dia a dia."
                   done={!!completedTests.disc}
                   onClick={() => startTest('DISC')}
                />
                <JourneyCard 
                   icon={<Heart size={40}/>}
                   title="Minha Valorização"
                   desc="Como eu me sinto mais reconhecido e motivado."
                   done={!!completedTests.appreciation}
                   onClick={() => startTest('APPRECIATION')}
                />
                <JourneyCard 
                   icon={<Compass size={40}/>}
                   title="Minhas Expectativas"
                   desc="Meus gatilhos de estresse e estilo de aprendizado."
                   done={!!completedTests.expectations}
                   onClick={() => startTest('EXPECTATIONS')}
                />
             </div>

             <div className="mt-20 p-8 bg-slate-50 rounded-[2.5rem] flex items-center gap-6 border border-dashed border-gray-200">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-ciatos-gold">
                   <Info size={24} />
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed italic">
                  "Seus resultados são privados e usados exclusivamente para que seu gestor possa te oferecer feedbacks mais precisos e trilhas de desenvolvimento mais assertivas na Ciatos Academy."
                </p>
             </div>
          </div>
        )}

        {step === 'consent' && (
          <div className="flex-1 flex flex-col p-20 lg:p-32 space-y-12 items-center text-center">
             <div className="p-6 bg-amber-50 rounded-[2.5rem] text-ciatos-gold">
                <ShieldCheck size={64} />
             </div>
             <div className="space-y-6 max-w-2xl">
                <h3 className="text-3xl font-black text-ciatos-navy uppercase tracking-tight">Privacidade e Crescimento</h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                   Para garantir que o **Grupo Ciatos** apoie sua carreira de forma personalizada, seus dados serão processados pelo nosso Advisor de IA e compartilhados com o RH para suporte gerencial.
                </p>
             </div>
             <div className="flex gap-6">
                <button onClick={() => setStep('intro')} className="px-10 py-5 bg-gray-100 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">Agora não</button>
                <button onClick={handleConsent} className="px-16 py-6 ciatos-navy text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all">Aceito e Iniciar Jornada</button>
             </div>
          </div>
        )}

        {step === 'quiz' && (
          <div className="flex-1 p-16 lg:p-24 flex flex-col">
             <div className="flex justify-between items-center mb-16">
                <button onClick={() => currentIdx > 0 ? setCurrentIdx(currentIdx - 1) : setStep('intro')} className="flex items-center gap-3 text-gray-400 hover:text-ciatos-navy transition-all font-black text-[10px] uppercase tracking-widest">
                   <ChevronLeft size={20} /> Voltar
                </button>
                <div className="text-center">
                   <p className="text-[10px] font-black text-ciatos-gold uppercase tracking-[0.4em] mb-4">Pilar {activeTest} em descoberta</p>
                   <div className="w-96 h-2 bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-100">
                      <div className="h-full ciatos-navy transition-all duration-500" style={{ width: `${((currentIdx + 1) / (activeTest === 'DISC' ? DISC_QUESTIONS.length : activeTest === 'APPRECIATION' ? APPRECIATION_QUESTIONS.length : EXPECTATIONS_QUESTIONS.length)) * 100}%` }} />
                   </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                   <SearchCheck size={20} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Auditoria Ética</span>
                </div>
             </div>

             <div className="max-w-4xl mx-auto w-full space-y-16">
                {activeTest === 'DISC' && (
                  <div className="space-y-20">
                     <h2 className="text-3xl font-black text-ciatos-navy text-center leading-tight">{DISC_QUESTIONS[currentIdx].text}</h2>
                     <div className="flex justify-between items-center max-w-2xl mx-auto relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -z-10" />
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button key={val} onClick={() => handleSelection(val)} className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-black transition-all ${answers[DISC_QUESTIONS[currentIdx].id] === val ? 'bg-ciatos-navy border-ciatos-gold text-white shadow-2xl scale-125' : 'bg-white border-gray-100 text-gray-200 hover:border-ciatos-gold hover:text-ciatos-gold'}`}>
                            {val}
                          </button>
                        ))}
                     </div>
                     <div className="flex justify-between max-w-2xl mx-auto text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span>Discordo Totalmente</span>
                        <span>Concordo Totalmente</span>
                     </div>
                  </div>
                )}

                {activeTest === 'APPRECIATION' && (
                  <div className="space-y-12">
                     <h2 className="text-3xl font-black text-ciatos-navy text-center leading-tight">{APPRECIATION_QUESTIONS[currentIdx].text}</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <OptionBtn label="A" text={APPRECIATION_QUESTIONS[currentIdx].optA} onClick={() => handleSelection('A')} />
                        <OptionBtn label="B" text={APPRECIATION_QUESTIONS[currentIdx].optB} onClick={() => handleSelection('B')} />
                     </div>
                  </div>
                )}

                {activeTest === 'EXPECTATIONS' && (
                  <div className="space-y-12">
                     <h2 className="text-3xl font-black text-ciatos-navy text-center leading-tight">{EXPECTATIONS_QUESTIONS[currentIdx].text}</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {EXPECTATIONS_QUESTIONS[currentIdx].options.map((opt) => (
                           <button key={opt.id} onClick={() => handleSelection(opt.id)} className="p-8 bg-white border-2 border-gray-100 rounded-[2.5rem] hover:border-ciatos-gold hover:shadow-2xl transition-all flex items-center gap-8 group text-left">
                              <div className="w-16 h-16 rounded-3xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-ciatos-gold group-hover:text-white transition-all shadow-sm">
                                 {opt.icon}
                              </div>
                              <span className="text-lg font-black text-ciatos-navy">{opt.text}</span>
                           </button>
                        ))}
                     </div>
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 'calculating' && (
          <div className="flex-1 flex flex-col items-center justify-center p-20 space-y-12">
             <div className="relative">
                <div className="w-48 h-48 border-[12px] border-slate-50 border-t-ciatos-gold rounded-full animate-spin" />
                <Brain className="absolute inset-0 m-auto text-ciatos-gold animate-pulse" size={64} />
             </div>
             <div className="text-center space-y-4">
                <h3 className="text-3xl font-black text-ciatos-navy uppercase tracking-[0.4em]">Decifrando sua Essência</h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">O Advisor Ciatos está mapeando seus pontos fortes e gatilhos...</p>
             </div>
          </div>
        )}

        {step === 'result' && (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
             <div className="flex-1 p-16 lg:p-24 space-y-12 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start border-b border-gray-100 pb-12">
                   <div className="flex items-center gap-8">
                      <div className="p-6 bg-emerald-50 rounded-[2rem] text-emerald-600 border-2 border-emerald-100">
                        <Trophy size={48} />
                      </div>
                      <div>
                        <h2 className="text-4xl font-black text-ciatos-navy tracking-tight">Sua Descoberta Concluída!</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.5em] mt-2">Relatório de Autoconhecimento para Ricardo Mendes</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <button className="px-10 py-4 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all">Imprimir</button>
                   </div>
                </div>

                {aiResponse ? (
                   <div className="prose prose-slate max-w-none">
                      {aiResponse.split('\n\n').map((para, i) => {
                         const isStrengths = para.toUpperCase().includes('FORTE') || para.toUpperCase().includes('TALENTO');
                         const isGrowth = para.toUpperCase().includes('DESENVOLVIMENTO') || para.toUpperCase().includes('PDI');
                         const isAdvisor = para.toUpperCase().includes('ADVISOR') || para.toUpperCase().includes('MANUAL');

                         if (isStrengths) {
                            return (
                               <div key={i} className="my-10 p-12 bg-emerald-50 border-l-[12px] border-l-emerald-500 rounded-[3rem] shadow-sm">
                                  <div className="flex items-center gap-4 mb-6">
                                     <Star size={32} className="text-emerald-600 fill-emerald-600" />
                                     <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-800">Seus Pontos Fortes de Elite</span>
                                  </div>
                                  <p className="text-lg font-bold text-emerald-900 italic m-0 leading-relaxed">"{para.replace(/\*\*/g, '')}"</p>
                               </div>
                            );
                         }

                         if (isGrowth) {
                            return (
                               <div key={i} className="my-10 p-12 bg-blue-50 border-l-[12px] border-l-blue-500 rounded-[3rem] shadow-sm">
                                  <div className="flex items-center gap-4 mb-6">
                                     <TrendingUp size={32} className="text-blue-600" />
                                     <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-800">Sua Trilha de Evolução</span>
                                  </div>
                                  <p className="text-base font-bold text-blue-900 leading-relaxed m-0">{para.replace(/\*\*/g, '')}</p>
                               </div>
                            );
                         }

                         if (isAdvisor) {
                            return (
                               <div key={i} className="my-12 p-14 bg-ciatos-navy rounded-[4rem] shadow-2xl text-white relative overflow-hidden">
                                  <Sparkles className="absolute top-[-30px] right-[-30px] text-white/5 w-64 h-64" />
                                  <div className="flex items-center gap-6 mb-8 relative z-10">
                                     <Lightbulb size={32} className="text-ciatos-gold" />
                                     <span className="text-sm font-black uppercase tracking-[0.3em] text-ciatos-gold">Recado do seu Advisor AI</span>
                                  </div>
                                  <div className="text-lg text-gray-300 font-medium leading-relaxed m-0 italic relative z-10">{para.replace(/\*\*/g, '')}</div>
                               </div>
                            );
                         }

                         return <p key={i} className="text-base font-medium text-gray-600 leading-relaxed mb-8 px-6">{para.replace(/\*\*/g, '')}</p>
                      })}
                   </div>
                ) : (
                   <div className="py-24 flex flex-col items-center justify-center opacity-30">
                      <RefreshCw size={56} className="animate-spin mb-6 text-ciatos-gold" />
                      <p className="font-black uppercase tracking-[0.3em] text-[10px]">Consolidando sua jornada...</p>
                   </div>
                )}
             </div>
             <div className="p-10 border-t border-gray-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                   <ShieldCheck size={20} className="text-emerald-500" /> Perfil atualizado nos registros táticos Ciatos.
                </div>
                <button onClick={() => setStep('intro')} className="px-10 py-5 ciatos-gold text-navy-900 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all">
                   Finalizar e Voltar à Central <ChevronRight size={18} />
                </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

const JourneyCard = ({ icon, title, desc, done, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`bg-white p-12 rounded-[3.5rem] border-2 transition-all flex flex-col items-center text-center group relative overflow-hidden ${done ? 'border-emerald-100 shadow-sm' : 'border-gray-100 hover:border-ciatos-gold/30 hover:shadow-2xl'}`}
  >
     {done && (
       <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500 text-white flex items-center justify-center rounded-bl-[2.5rem] animate-in zoom-in">
          <CheckCircle size={32} />
       </div>
     )}
     <div className={`p-8 rounded-[2.5rem] mb-10 transition-all shadow-inner ${done ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-ciatos-navy group-hover:bg-ciatos-gold group-hover:text-white group-hover:scale-110'}`}>
        {icon}
     </div>
     <h3 className="text-xl font-black text-ciatos-navy mb-4 uppercase tracking-widest leading-tight">{title}</h3>
     <p className="text-sm text-gray-400 font-medium leading-relaxed mb-10">{desc}</p>
     <div className={`mt-auto text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${done ? 'text-emerald-600' : 'text-ciatos-gold group-hover:gap-5'}`}>
        {done ? 'Explorar Novamente' : 'Iniciar Descoberta'} <ChevronRight size={16} />
     </div>
  </button>
);

const OptionBtn = ({ label, text, onClick }: any) => (
  <button onClick={onClick} className="p-12 bg-white border-2 border-gray-100 rounded-[3rem] hover:border-ciatos-gold hover:shadow-2xl transition-all group flex flex-col items-center text-center gap-8 min-h-[250px] justify-center">
     <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 text-gray-400 font-black text-2xl flex items-center justify-center group-hover:bg-ciatos-gold group-hover:text-white transition-all shadow-inner border border-gray-100">
        {label}
     </div>
     <p className="text-lg font-black text-ciatos-navy leading-relaxed">{text}</p>
  </button>
);

const ProgressDot = ({ done }: { done: boolean }) => (
  <div className={`w-3 h-3 rounded-full border ${done ? 'bg-emerald-500 border-emerald-600 shadow-sm shadow-emerald-500/50' : 'bg-gray-100 border-gray-200'}`} />
);

export default BehavioralAssessments;
