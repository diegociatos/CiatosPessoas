
import React, { useState } from 'react';
import { useAuth, PREDEFINED_USERS } from '../contexts/AuthContext';
import { Lock, User, ShieldCheck, AlertCircle, RefreshCw, ChevronRight, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleLogin = async (e?: React.FormEvent, manualCpf?: string) => {
    if (e) e.preventDefault();
    setError(null);
    const success = await login(manualCpf || cpf, '123456');
    if (!success) {
      setError('CPF ou senha inválidos. Utilize CPF cadastrado e senha 123456.');
    }
  };

  const getProfileLabel = (id: string) => {
    switch(id) {
      case '1': return 'ADM';
      case '2': return 'GESTOR DE RH';
      case '3': return 'GESTOR';
      case '4': return 'GESTOR DOS GESTORES';
      case '5': return 'COLABORADOR';
      default: return 'PERFIL';
    }
  };

  return (
    <div className="min-h-screen ciatos-navy flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ciatos-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20">
          <div className="p-12 text-center border-b border-gray-50">
            <div className="w-20 h-20 bg-ciatos-navy rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl border-4 border-slate-50">
              <ShieldCheck size={40} className="text-ciatos-gold" />
            </div>
            <h1 className="text-3xl font-black text-ciatos-navy tracking-tighter">CIATOS PEOPLE</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-2 font-bold">Ecossistema de Inteligência</p>
          </div>

          <form onSubmit={handleLogin} className="p-10 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 animate-pulse">
                <AlertCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Login (CPF)</label>
                <div className="relative group">
                  <User className="absolute left-4 top-4 text-gray-300 group-focus-within:text-ciatos-gold transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="000.000.000-00" 
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-ciatos-gold/5 focus:border-ciatos-gold focus:bg-white transition-all shadow-inner"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between px-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Senha</label>
                  <button type="button" className="text-[10px] font-black text-ciatos-gold uppercase tracking-widest hover:underline">Esqueci a senha</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-4 text-gray-300 group-focus-within:text-ciatos-gold transition-colors" size={20} />
                  <input 
                    type="password" 
                    placeholder="••••••" 
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-ciatos-gold/5 focus:border-ciatos-gold focus:bg-white transition-all shadow-inner"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 ciatos-navy text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <><ShieldCheck size={20} /> Entrar no Sistema</>}
            </button>
          </form>

          <div className="p-10 bg-slate-50 border-t border-gray-100">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-8">Acesso Rápido para Simulação</p>
             <div className="grid grid-cols-2 gap-3">
                {PREDEFINED_USERS.map(u => (
                  <button 
                    key={u.id}
                    onClick={() => handleLogin(undefined, u.cpf)}
                    className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-left flex flex-col gap-1 hover:border-ciatos-gold hover:shadow-lg transition-all active:scale-95 group"
                  >
                    <span className="text-[9px] font-black text-ciatos-gold uppercase tracking-widest group-hover:text-ciatos-navy transition-colors">
                      {getProfileLabel(u.id)}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter truncate">
                      {u.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
             </div>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-4 text-white/40">
           <ShieldCheck size={16} />
           <p className="text-[9px] font-black uppercase tracking-[0.3em]">Ciatos Data Encryption & Privacy Protocol</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
