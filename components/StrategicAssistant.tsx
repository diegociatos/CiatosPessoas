
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Info, BrainCircuit, ShieldAlert, TrendingUp } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';

const StrategicAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { 
      role: 'ai', 
      content: 'Bem-vindo ao Ciatos Strategic Advisor. Atuo como seu parceiro estratégico em Inteligência Humana. \n\nPosso auxiliá-lo com diagnósticos de clima, estruturação de PDIs, mitigação de riscos trabalhistas ou análises de produtividade para as unidades do Grupo. Como posso servir à sua tomada de decisão hoje?' 
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

    const response = await getGeminiResponse(userMessage, { company: 'Grupo Ciatos', module: 'Strategic Advisor' });
    
    setMessages(prev => [...prev, { role: 'ai', content: response || "O sistema de inteligência não retornou dados. Por favor, reformule sua consulta estratégica." }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Premium */}
      <div className="ciatos-navy p-8 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-5 text-white">
          <div className="p-4 bg-ciatos-gold/10 rounded-2xl border border-ciatos-gold/20">
            <BrainCircuit size={32} className="text-ciatos-gold" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Ciatos Strategic Advisor</h2>
            <div className="flex items-center gap-2 mt-1 opacity-70">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs font-medium uppercase tracking-[0.1em]">Inteligência Organizacional Ativa</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex gap-3">
          <span className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-2">
            <ShieldAlert size={14} className="text-ciatos-gold" />
            GOVERNANÇA LGPD
          </span>
          <span className="bg-ciatos-gold text-ciatos-navy px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
            <TrendingUp size={14} />
            MÉTODO CIATOS
          </span>
        </div>
      </div>

      {/* Área de Chat */}
      <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/30 custom-scrollbar" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[75%] p-6 rounded-[2rem] shadow-sm ${
              msg.role === 'user' 
                ? 'bg-ciatos-navy text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-ciatos-navy rounded-tl-none border-l-[6px] border-l-ciatos-gold'
            }`}>
              <div className={`flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest opacity-60 ${msg.role === 'user' ? 'text-ciatos-gold' : 'text-gray-400'}`}>
                {msg.role === 'user' ? <><User size={12} /> Gestor / Diretoria</> : <><Bot size={12} className="text-ciatos-gold"/> Intelligence Engine</>}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white border border-gray-100 p-6 rounded-[2rem] flex gap-3 items-center shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-ciatos-gold rounded-full animate-bounce" />
                <div className="w-2.5 h-2.5 bg-ciatos-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2.5 h-2.5 bg-ciatos-gold rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Processando análise estratégica...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input de Comando */}
      <div className="p-8 border-t border-gray-100 bg-white shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { label: "Análise de Turnover", icon: <AlertCircle size={12} /> },
            { label: "Plano de Carreira Jurídico", icon: <TrendingUp size={12} /> },
            { label: "Checklist de Compliance DP", icon: <Info size={12} /> },
            { label: "Diagnóstico de Clima Mensal", icon: <Sparkles size={12} /> }
          ].map((suggestion, i) => (
            <button 
              key={i} 
              onClick={() => setInput(suggestion.label)}
              className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] font-bold text-gray-600 hover:border-ciatos-gold hover:text-ciatos-navy hover:bg-white transition-all shadow-sm"
            >
              {suggestion.icon}
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
            placeholder="Digite sua consulta estratégica para o Advisor..."
            className="w-full pl-8 pr-20 py-5 bg-gray-50 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-ciatos-gold focus:border-transparent outline-none shadow-inner text-sm font-medium transition-all group-focus-within:bg-white"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-3 p-3 rounded-xl bg-ciatos-navy text-white hover:bg-navy-900 transition-all shadow-xl disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            <Send size={24} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
           <ShieldAlert size={14} className="text-ciatos-gold" />
           IA Strategist • Suporte à Decisão Baseado em Dados • Grupo Ciatos 2024
        </div>
      </div>
    </div>
  );
};

export default StrategicAssistant;
