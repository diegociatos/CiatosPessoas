
import React, { useState } from 'react';
import { useAuth, PREDEFINED_USERS } from '../contexts/AuthContext';
import { User, LogOut, RefreshCw, ShieldCheck, ChevronDown, X, Star, Landmark, ShieldAlert } from 'lucide-react';

const AuthHeader: React.FC = () => {
  const { user, switchUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-14 ciatos-navy border-b-2 border-ciatos-gold z-[100] flex items-center justify-between px-8 shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-ciatos-gold" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Ciatos Strategic Engine</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">👤 Logado como:</span>
            <span className="text-xs font-black text-ciatos-gold uppercase tracking-tight">{user.name}</span>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">🔑 Perfil:</span>
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-black text-gray-300 uppercase tracking-widest">
              {user.name === 'Diego Garcia' ? 'GESTOR DOS GESTORES' : user.role}
            </span>
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 bg-ciatos-gold text-ciatos-navy rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg"
        >
          <RefreshCw size={12} /> Trocar Usuário / Simular
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8 ciatos-navy text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black tracking-tight uppercase">Mudar Contexto de Acesso</h3>
                <p className="text-[10px] text-ciatos-gold font-black uppercase tracking-widest mt-1">Ambiente de Simulação de Perfis Ciatos</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-4">
              {PREDEFINED_USERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u.cpf);
                    setIsOpen(false);
                  }}
                  className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between group transition-all ${
                    user.id === u.id ? 'border-ciatos-gold bg-ciatos-gold/5' : 'border-gray-100 hover:border-ciatos-navy'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all ${
                      user.id === u.id ? 'bg-ciatos-gold text-ciatos-navy' : 'bg-slate-100 text-ciatos-navy group-hover:bg-ciatos-navy group-hover:text-white'
                    }`}>
                      {u.name === 'Diego Garcia' ? <Landmark size={20}/> : u.name[0]}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-ciatos-navy">{u.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {u.name === 'Diego Garcia' ? 'GESTOR DOS GESTORES' : u.role}
                      </p>
                    </div>
                  </div>
                  {user.id === u.id ? <Star size={18} className="text-ciatos-gold fill-ciatos-gold" /> : <ChevronDown className="-rotate-90 text-gray-300" size={18} />}
                </button>
              ))}
              <div className="pt-6 border-t border-gray-100">
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full py-4 border-2 border-red-100 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={16} /> Encerrar Sessão Global
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthHeader;
