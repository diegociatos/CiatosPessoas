
import React, { useState } from 'react';
import { 
  FileUp, FileText, CheckCircle2, AlertTriangle, Search, 
  Filter, Building2, Calendar, ShieldCheck, Download,
  X, Plus, RefreshCw, Eye, MoreVertical, Archive,
  LayoutGrid, List, CheckSquare, Clock, ShieldAlert,
  ArrowUpRight, Users, Bell, UserX, Send, History
} from 'lucide-react';
import { BusinessUnit, MonthlyDocStatus } from '../types';

const MOCK_PENDING_DOCS = [
  { id: '1', name: 'Ricardo Mendes', unit: BusinessUnit.JURIDICO, type: 'Holerite', competence: '06/2024', status: 'Pendente' },
  { id: '2', name: 'Carla Oliveira', unit: BusinessUnit.CONTABILIDADE, type: 'Folha de Ponto', competence: '06/2024', status: 'Atrasado' },
  { id: '3', name: 'Fernando Silva', unit: BusinessUnit.CONTABILIDADE, type: 'Holerite', competence: '06/2024', status: 'Pendente' },
];

const ComplianceManager: React.FC = () => {
  const [activeView, setActiveView] = useState<'pendencias' | 'jornada' | 'upload'>('pendencias');
  const [isUploading, setIsUploading] = useState(false);
  const [competence, setCompetence] = useState('06/2024');

  const handleBulkUpload = (type: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert(`${type} processados via IA. 42 colaboradores atualizados automaticamente.`);
    }, 2000);
  };

  const handleNotifyAll = () => {
    alert("Notificação enviada para todos os 12 colaboradores com pendências mensais.");
  };

  return (
    <div className="space-y-10 animate-in fade-in pb-12">
      {/* HEADER DP */}
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="p-5 ciatos-navy rounded-3xl text-ciatos-gold shadow-2xl">
            <Archive size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Conformidade & DP</h2>
            <p className="text-sm text-gray-400 font-medium italic mt-2">Gestão Documental Mensal e Monitoramento de Jornada.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <button 
            onClick={handleNotifyAll}
            className="px-8 py-4 bg-ciatos-gold text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
           >
             <Bell size={18} /> Cobrar Pendências Geral
           </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-gray-100 px-6">
        <TabBtn label="Pendências de Assinatura" active={activeView === 'pendencias'} onClick={() => setActiveView('pendencias')} />
        <TabBtn label="Gestão de Jornada (Ponto/Banco)" active={activeView === 'jornada'} onClick={() => setActiveView('jornada')} />
        <TabBtn label="Bulk Upload IA" active={activeView === 'upload'} onClick={() => setActiveView('upload')} />
      </div>

      {activeView === 'pendencias' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
           <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-slate-50/50">
                    <tr>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Unidade</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Documento</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Competência</th>
                       <th className="px-10 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                       <th className="px-10 py-6"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {MOCK_PENDING_DOCS.map(doc => (
                       <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-10 py-6 font-black text-ciatos-navy text-sm">{doc.name}</td>
                          <td className="px-10 py-6 text-[10px] font-black uppercase text-gray-400">{doc.unit}</td>
                          <td className="px-10 py-6 text-xs font-bold text-gray-600">{doc.type}</td>
                          <td className="px-10 py-6 text-xs font-mono">{doc.competence}</td>
                          <td className="px-10 py-6 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                doc.status === 'Atrasado' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                             }`}>
                                {doc.status}
                             </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                             <button className="text-[10px] font-black text-ciatos-gold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"><Send size={14}/> Cobrar</button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {activeView === 'jornada' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-4">
           <div className="bg-red-50 p-10 rounded-[4rem] border border-red-100 flex flex-col md:flex-row items-center gap-10 shadow-sm">
              <div className="p-6 bg-red-600 text-white rounded-3xl shadow-xl animate-pulse"><ShieldAlert size={40} /></div>
              <div className="flex-1">
                 <h4 className="text-2xl font-black text-red-900 tracking-tight">Risco Preventivo: Banco de Horas Crítico</h4>
                 <p className="text-sm font-medium text-red-800 leading-relaxed mt-2 italic">"⚠️ 5 colaboradores ultrapassaram o limite de 30h positivas. Recomenda-se notificar gestores imediatos para escala de folga compensatória."</p>
              </div>
              <button className="px-8 py-4 bg-white text-red-600 border border-red-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Notificar Gestores</button>
           </div>
        </div>
      )}

      {activeView === 'upload' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
           <div className="bg-ciatos-navy p-12 rounded-[4rem] text-white flex flex-col items-center text-center space-y-10">
              <div className="p-6 bg-white/10 rounded-[2.5rem] border border-white/20"><FileUp size={48} className="text-ciatos-gold" /></div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black tracking-tight">Processamento Inteligente de Documentos</h3>
                 <p className="text-gray-400 font-medium max-w-lg mx-auto italic">Nossa IA lê o CPF no arquivo e anexa automaticamente ao dossiê funcional de cada colaborador.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                 <UploadActionCard icon={<FileText/>} label="Holerites Mensais" onClick={() => handleBulkUpload('Holerites')} />
                 <UploadActionCard icon={<Clock/>} label="Espelhos de Ponto" onClick={() => handleBulkUpload('Espelhos de Ponto')} />
                 <UploadActionCard icon={<History/>} label="Extratos de Banco" onClick={() => handleBulkUpload('Extratos de Banco')} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ label, active, onClick }: any) => (
  <button onClick={onClick} className={`pb-5 text-[11px] font-black uppercase tracking-widest transition-all ${active ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400 hover:text-ciatos-navy'}`}>
    {label}
  </button>
);

const UploadActionCard = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center gap-4 hover:bg-white/10 hover:border-ciatos-gold transition-all group"
  >
     <div className="text-ciatos-gold group-hover:scale-110 transition-transform">{icon}</div>
     <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{label}</span>
     <div className="mt-2 px-4 py-2 bg-ciatos-gold/20 rounded-xl text-[8px] font-black text-ciatos-gold uppercase tracking-[0.2em]">Upload em Massa</div>
  </button>
);

export default ComplianceManager;
