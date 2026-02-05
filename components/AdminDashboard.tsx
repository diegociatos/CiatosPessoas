
import React, { useState } from 'react';
import { 
  Settings, Users, ShieldCheck, Building2, Key, 
  History, Search, Plus, X, Save, RefreshCw, 
  Trash2, AlertCircle, ChevronRight, Lock, 
  Eye, FileText, Activity, ShieldAlert, Sparkles,
  BarChart3, Target, UserCog, Database, Fingerprint
} from 'lucide-react';
import { BusinessUnit, UserRole, SystemUser, AdminLog } from '../types';

const MOCK_USERS: SystemUser[] = [
  { id: '1', name: 'Diego Garcia', email: 'diego@ciatos.com.br', role: UserRole.ADMIN, isActive: true, lastLogin: '10/06/2024 09:15' },
  { id: '2', name: 'Lidiane Silva', email: 'lidiane@ciatos.com.br', role: UserRole.HR, isActive: true, lastLogin: '10/06/2024 08:30' },
  { id: '3', name: 'Dr. João Mendes', email: 'joao@ciatos.com.br', role: UserRole.MANAGER, unit: BusinessUnit.JURIDICO, isActive: true, lastLogin: '09/06/2024 17:45' },
];

const MOCK_LOGS: AdminLog[] = [
  { id: 'l1', timestamp: '10/06/2024 14:22:10', userId: '1', userName: 'Diego Garcia', action: 'Visualização de Holerite', resource: 'Ricardo Mendes (CPF: ***.***.888-**)', ipAddress: '177.34.12.90', severity: 'medium' },
  { id: 'l2', timestamp: '10/06/2024 13:05:04', userId: '2', userName: 'Lidiane Silva', action: 'Reset de Senha', resource: 'Carla Oliveira', ipAddress: '189.10.45.12', severity: 'low' },
  { id: 'l3', timestamp: '10/06/2024 11:30:55', userId: '1', userName: 'Diego Garcia', action: 'Acesso às Configurações DISC', resource: 'Sistema Global', ipAddress: '177.34.12.90', severity: 'high' },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'units' | 'users' | 'audit' | 'system'>('units');
  const [users, setUsers] = useState(MOCK_USERS);
  const [logs] = useState(MOCK_LOGS);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in pb-20">
      {/* Header Admin */}
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="p-5 ciatos-navy rounded-3xl text-ciatos-gold shadow-2xl">
            <Settings size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Administração Global</h2>
            <p className="text-sm text-gray-500 font-medium italic">Gestão de ecossistema, governança e conformidade Ciatos.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Master Security Ativo</span>
           </div>
        </div>
      </div>

      {/* Navegação Admin */}
      <div className="flex gap-8 border-b border-gray-100">
        <TabBtn label="Unidades de Negócio" active={activeTab === 'units'} onClick={() => setActiveTab('units')} icon={<Building2 size={16}/>} />
        <TabBtn label="Gestão de Usuários" active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users size={16}/>} />
        <TabBtn label="Auditoria LGPD" active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} icon={<History size={16}/>} />
        <TabBtn label="Configurações Sistema" active={activeTab === 'system'} onClick={() => setActiveTab('system')} icon={<Database size={16}/>} />
      </div>

      {/* Conteúdo Unidades */}
      {activeTab === 'units' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4">
          {Object.values(BusinessUnit).map(unit => (
            <div key={unit} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:border-ciatos-gold transition-all group">
               <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-gray-50 rounded-2xl text-ciatos-navy group-hover:bg-ciatos-navy group-hover:text-ciatos-gold transition-all">
                        <Building2 size={24} />
                     </div>
                     <h3 className="text-xl font-black text-ciatos-navy tracking-tight">{unit}</h3>
                  </div>
                  <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
               </div>
               <div className="grid grid-cols-3 gap-4 mb-8">
                  <UnitStat label="Colaboradores" value="12" />
                  <UnitStat label="Saúde" value="92%" />
                  <UnitStat label="Risco" value="Baixo" color="text-emerald-600" />
               </div>
               <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ultima auditoria: Ontem</span>
                  <button className="text-[10px] font-black text-ciatos-gold uppercase tracking-widest flex items-center gap-2">Configurar Unidade <ChevronRight size={14} /></button>
               </div>
            </div>
          ))}
          <button className="border-4 border-dashed border-gray-100 rounded-[3rem] p-12 flex flex-col items-center justify-center text-gray-300 hover:border-ciatos-gold hover:text-ciatos-gold transition-all group">
             <Plus size={48} className="mb-4 group-hover:scale-110 transition-transform" />
             <span className="text-sm font-black uppercase tracking-widest">Adicionar Nova Unidade</span>
          </button>
        </div>
      )}

      {/* Conteúdo Usuários */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4">
           <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <div className="relative w-96">
                 <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
                 <input type="text" placeholder="Buscar usuário..." className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-ciatos-gold transition-all" />
              </div>
              <button onClick={() => setIsUserModalOpen(true)} className="flex items-center gap-2 px-6 py-3 ciatos-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                 <UserCog size={16} /> Novo Usuário
              </button>
           </div>
           <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                 <tr>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome / Email</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nível de Acesso</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Unidade</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Último Acesso</th>
                    <th className="px-10 py-6"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                       <td className="px-10 py-6">
                          <p className="text-sm font-black text-ciatos-navy">{user.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold">{user.email}</p>
                       </td>
                       <td className="px-10 py-6">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                             {user.role}
                          </span>
                       </td>
                       <td className="px-10 py-6">
                          <p className="text-[10px] font-black text-ciatos-navy uppercase tracking-widest">{user.unit || 'Todas'}</p>
                       </td>
                       <td className="px-10 py-6">
                          <p className="text-[10px] text-gray-400 font-bold">{user.lastLogin || 'Nunca'}</p>
                       </td>
                       <td className="px-10 py-6 text-right space-x-2">
                          <button className="p-2 text-gray-300 hover:text-ciatos-gold transition-colors" title="Reset Senha (123456)"><Key size={18} /></button>
                          <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {/* Conteúdo Auditoria */}
      {activeTab === 'audit' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
           <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 flex items-center gap-6 shadow-sm">
              <div className="p-4 bg-amber-600 text-white rounded-2xl shadow-lg">
                 <ShieldAlert size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Relatório de Segurança LGPD</p>
                 <p className="text-sm font-bold text-amber-800 mt-1">
                    Todos os acessos a dados sensíveis (Holerites, Documentos e Avaliações) estão sendo registrados em tempo real com rastreamento de IP.
                 </p>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-slate-50/50">
                    <tr>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Usuário</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Ação / Evento</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recurso Acessado</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Severidade</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {logs.map(log => (
                       <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-10 py-6 text-[10px] font-mono text-gray-400">{log.timestamp}</td>
                          <td className="px-10 py-6">
                             <p className="text-[11px] font-black text-ciatos-navy uppercase">{log.userName}</p>
                             <p className="text-[9px] text-gray-400 font-bold">{log.ipAddress}</p>
                          </td>
                          <td className="px-10 py-6 text-[11px] font-bold text-gray-700">{log.action}</td>
                          <td className="px-10 py-6 text-[11px] font-medium text-gray-500 italic">{log.resource}</td>
                          <td className="px-10 py-6 text-center">
                             <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                log.severity === 'high' ? 'bg-red-100 text-red-700' :
                                log.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                             }`}>
                                {log.severity}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* Conteúdo Configurações Sistema */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-4">
           <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                 <div className="p-3 bg-ciatos-gold/10 text-ciatos-gold rounded-2xl"><Target size={24} /></div>
                 <h4 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Pesos do Perfil DISC</h4>
              </div>
              <div className="space-y-8">
                 <ConfigSlider label="Dominância (D)" val={25} />
                 <ConfigSlider label="Influência (I)" val={25} />
                 <ConfigSlider label="Estabilidade (S)" val={25} />
                 <ConfigSlider label="Conformidade (C)" val={25} />
              </div>
              <button className="w-full mt-10 py-5 bg-ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
                 <Save size={18} /> Salvar Pesos Globais
              </button>
           </div>

           <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                 <div className="p-3 bg-ciatos-navy/5 text-ciatos-navy rounded-2xl"><FileText size={24} /></div>
                 <h4 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Estrutura de Formulários</h4>
              </div>
              <div className="space-y-4">
                 <SystemFormItem label="Questionário de Admissão Digital" />
                 <SystemFormItem label="Teste de Linguagens de Valorização" />
                 <SystemFormItem label="Avaliação de Performance (Feedback)" />
                 <SystemFormItem label="Mapeamento de Expectativas" />
              </div>
              <p className="mt-10 text-[10px] text-gray-400 font-bold italic text-center">Qualquer alteração em formulários ativos afetará as coletas em andamento.</p>
           </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ label, active, onClick, icon }: any) => (
  <button onClick={onClick} className={`pb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all ${active ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400 hover:text-ciatos-navy'}`}>
    {icon} {label}
  </button>
);

const UnitStat = ({ label, value, color = "text-ciatos-navy" }: any) => (
  <div className="text-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
     <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
     <p className={`text-lg font-black ${color}`}>{value}</p>
  </div>
);

const ConfigSlider = ({ label, val }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
        <span>{label}</span>
        <span className="text-ciatos-navy">{val}%</span>
     </div>
     <input type="range" className="w-full accent-ciatos-gold" />
  </div>
);

const SystemFormItem = ({ label }: { label: string }) => (
  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl flex justify-between items-center group cursor-pointer hover:bg-white hover:border-ciatos-gold transition-all">
     <span className="text-xs font-bold text-gray-700">{label}</span>
     <button className="text-gray-300 group-hover:text-ciatos-gold"><Settings size={18} /></button>
  </div>
);

export default AdminDashboard;
