
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Info, BrainCircuit, ShieldAlert, TrendingUp, ChevronRight, MessageSquare, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';

const StrategicAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { 
      role: 'ai', 
      content: 'Bem-vindo, gestor. Sou o Ciatos Strategic Advisor. \n\nAtuo como seu consultor de elite para decisões de capital humano, conformidade estratégica e prevenção de riscos operacionais. \n\nComo posso apoiar Diego Garcia e sua liderança hoje? \n\nSugestões: "Analise o risco de burnout no setor Fiscal", "Prepare um diagnóstico de produtividade para o Jurídico" ou "Avalie o fit cultural do novo Controller".' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMessage, { 
      company: 'Grupo Ciatos', 
      user: 'Diretoria Executiva (Diego Garcia)',
      activeModule: 'Strategic AI Partner',
      protocol: 'Elite Advisor v5.0'
    });
    
    setMessages(prev => [...prev, { role: 'ai', content: response || "O Advisor não pôde consolidar o diagnóstico no momento." }]);
    setIsLoading(false);
  };

  const renderContent = (content: string) => {
    // Basic formatting for the structured response as requested in instructions
    const sections = [
      'CATEGORIZAÇÃO:', 'DIAGNÓSTICO:', 'RISCO:', 'RECOMENDAÇÃO:', 'INSIGHT ADVISOR:'
    ];
    
    let formattedContent = content;
    sections.forEach(section => {
      formattedContent = formattedContent.replace(new RegExp(section, 'g'), `\n\n**${section}**`);
    });

    return formattedContent.split('\n').map((line, i) => {
      if (line.startsWith('**')) {
        const title = line.replace(/\*\*/g, '');
        const isInsight = title.includes('INSIGHT');
        const isRisk = title.includes('RISCO');
        
        return (
          <div key={i} className={`mt-6 first:mt-0 p-4 rounded-xl border-l-4 ${
            isInsight ? 'bg-ciatos-gold/10 border-ciatos-gold' : 
            isRisk ? 'bg-red-50 border-red-500' : 
            'bg-gray-50 border-ciatos-navy'
          }`}>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-1 ${
              isInsight ? 'text-ciatos-gold' : 
              isRisk ? 'text-red-700' : 
              'text-ciatos-navy'
            }`}>
              {title}
            </span>
          </div>
        );
      }
      return <p key={i} className="mb-2 last:mb-0 text-sm font-medium leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in duration-500">
      {/* Advisor Header */}
      <div className="ciatos-navy p-10 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
        <Sparkles className="absolute right-[-40px] top-[-40px] text-white/5 w-64 h-64" />
        <div className="flex items-center gap-6 text-white relative z-10">
          <div className="p-5 bg-ciatos-gold/10 rounded-[2rem] border border-ciatos-gold/30 shadow-2xl">
            <BrainCircuit size={40} className="text-ciatos-gold" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ciatos Strategic Advisor</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Inteligência de Elite Ativa</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex gap-4 relative z-10">
          <HeaderTag icon={<ShieldCheck size={14}/>} label="Proteção LGPD" />
          <HeaderTag icon={<BarChart3 size={14}/>} label="Análise Preventiva" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-slate-50/40 custom-scrollbar" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-10 rounded-[3rem] shadow-sm relative ${
              msg.role === 'user' 
                ? 'bg-ciatos-navy text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-ciatos-navy rounded-tl-none border-l-[12px] border-l-ciatos-gold'
            }`}>
              <div className={`flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-60 ${msg.role === 'user' ? 'text-ciatos-gold' : 'text-gray-400'}`}>
                {msg.role === 'user' ? <><User size={12} /> Diretoria Executiva</> : <><Bot size={12} className="text-ciatos-gold"/> Strategic Advisor AI</>}
              </div>
              <div className="prose prose-slate max-w-none">
                {msg.role === 'ai' ? renderContent(msg.content) : (
                  <p className="text-base font-medium leading-relaxed">{msg.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-8 rounded-[3rem] flex gap-4 items-center shadow-md animate-pulse">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-ciatos-gold rounded-full animate-bounce" />
                <div className="w-2.5 h-2.5 bg-ciatos-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2.5 h-2.5 bg-ciatos-gold rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-2">Advisor está consolidando o diagnóstico estratégico...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-10 border-t border-gray-100 bg-white shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.05)] relative z-10">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-3 scrollbar-hide">
          {[
            { label: "Risco Trabalhista Fiscal", icon: <ShieldAlert size={14} /> },
            { label: "Gargalos Jurídicos", icon: <TrendingUp size={14} /> },
            { label: "Burnout Preventivo", icon: <AlertCircle size={14} /> },
            { label: "Plano de Sucessão", icon: <Zap size={14} /> }
          ].map((suggestion, i) => (
            <button 
              key={i} 
              onClick={() => setInput(suggestion.label)}
              className="whitespace-nowrap flex items-center gap-3 px-6 py-3 bg-gray-50 border border-gray-200 rounded-full text-[10px] font-black text-gray-600 hover:border-ciatos-gold hover:text-ciatos-navy hover:bg-white transition-all shadow-sm hover:shadow-md"
            >
              <div className="text-ciatos-gold">{suggestion.icon}</div>
              {suggestion.label}
            </button>
          ))}
        </div>
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Consulte o Advisor sobre decisões de pessoal ou riscos operacionais..."
            className="w-full pl-10 pr-24 py-7 bg-gray-50 rounded-3xl border border-gray-200 focus:ring-4 focus:ring-ciatos-gold/10 focus:border-ciatos-gold outline-none shadow-inner text-base font-medium transition-all group-focus-within:bg-white"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-4 top-4 p-4 rounded-2xl bg-ciatos-navy text-white hover:bg-navy-900 transition-all shadow-2xl disabled:opacity-50 hover:scale-105 active:scale-95 group-hover:shadow-navy-900/30"
          >
            <Send size={28} />
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
           <Info size={16} className="text-ciatos-gold" />
           Suporte à Decisão Gerencial • Grupo Ciatos Strategic Advisor 2024
        </div>
      </div>
    </div>
  );
};

const HeaderTag = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <span className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black flex items-center gap-3 uppercase tracking-widest hover:bg-white/10 transition-all cursor-default">
    <div className="text-ciatos-gold">{icon}</div>
    {label}
  </span>
);

export default StrategicAssistant;
