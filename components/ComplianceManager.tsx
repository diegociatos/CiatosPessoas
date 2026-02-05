
import React, { useState } from 'react';
import { 
  FileUp, FileText, CheckCircle2, AlertTriangle, Search, 
  Filter, Building2, Calendar, ShieldCheck, Download,
  X, Plus, RefreshCw, Eye, MoreVertical, Archive,
  LayoutGrid, List, CheckSquare, Clock, ShieldAlert,
  ArrowUpRight, Users, Bell, UserX, Send, History,
  FileCheck, Shield
} from 'lucide-react';
import { BusinessUnit, MonthlyDocStatus } from '../types';

const COMPLIANCE_STATUS = [
  { unit: BusinessUnit.CONTABILIDADE, signed: 65, pending: 35, risk: 'Vermelho' },
  { unit: BusinessUnit.JURIDICO, signed: 98, pending: 2, risk: 'Verde' },
  { unit: BusinessUnit.CONSULTORIA, signed: 100, pending: 0, risk: 'Verde' },
  { unit: BusinessUnit.LOG, signed: 82, pending: 18, risk: 'Amarelo' },
];

const MOCK_PENDING_DOCS = [
  { id: '1', name: 'Ricardo Mendes', unit: BusinessUnit.JURIDICO, type: 'Holerite', competence: '06/2024', status: 'Pendente' },
  { id: '2', name: 'Carla Oliveira', unit: BusinessUnit.CONTABILIDADE, type: 'Folha de Ponto', competence: '06/2024', status: 'Atrasado' },
  { id: '3', name: 'Fernando Silva', unit: BusinessUnit.CONTABILIDADE, type: 'Holerite', competence: '06/2024', status: 'Pendente' },
];

const ComplianceManager: React.FC = () => {
  const [activeView, setActiveView] = useState<'audit' | 'jornada' | 'upload'>('audit');
  const [isUploading, setIsUploading] = useState(false);

  const handleBulkUpload = (type: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert(`${type} processados via IA. CPFs identificados e anexados aos dossiês funcionais.`);
    }, 2500);
  };

  const handleNotifyAll = () => {
    alert("Protocolo de cobrança enviado para todos os colaboradores com documentos pendentes.");
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
            <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Conformidade & Governança</h2>
            <p className="text-sm text-gray-400 font-medium italic mt-2">Gestão Documental Automática e Auditoria em Tempo Real.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <button 
            onClick={handleNotifyAll}
            className="px-8 py-4 bg-ciatos-gold text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
           >
             <Bell size={18} /> Cobrar Geral (Lote)
           </button>
        </div>
      </div>

      {/* SEMÁFORO DE CONFORMIDADE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {COMPLIANCE_STATUS.map(status => (
           <div key={status.unit} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative group overflow-hidden">
              <div className={`absolute top-0 right-0 w-12 h-12 flex items-center justify-center rounded-bl-3xl ${
                status.risk === 'Verde' ? 'bg-emerald-500/10 text-emerald-600' :
                status.risk === 'Amarelo' ? 'bg-amber-500/10 text-amber-600' :
                'bg-red-500/10 text-red-600'
              }`}>
                 <div className={`w-3 h-3 rounded-full ${
                    status.risk === 'Verde' ? 'bg-emerald-500' :
                    status.risk === 'Amarelo' ? 'bg-amber-500' :
                    'bg-red-500'
                 } animate-pulse`} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{status.unit}</p>
              <div className="flex items-end gap-3">
                 <p className="text-4xl font-black text-ciatos-navy tracking-tighter">{status.signed}%</p>
                 <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Assinado</p>
              </div>
              <div className="mt-6 w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                 <div className={`h-full ${
                    status.risk === 'Verde' ? 'bg-emerald-500' :
                    status.risk === 'Amarelo' ? 'bg-amber-500' :
                    'bg-red-500'
                 }`} style={{ width: `${status.signed}%` }} />
              </div>
           </div>
         ))}
      </div>

      <div className="flex gap-8 border-b border-gray-100 px-6">
        <TabBtn label="Auditoria de Assinaturas" active={activeView === 'audit'} onClick={() => setActiveView('audit')} />
        <TabBtn label="Semáforo de Jornada" active={activeView === 'jornada'} onClick={() => setActiveView('jornada')} />
        <TabBtn label="Central de Bulk Upload" active={activeView === 'upload'} onClick={() => setActiveView('upload')} />
      </div>

      {activeView === 'audit' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
           <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-slate-50/50">
                    <tr>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Empresa</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Documento</th>
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status IA</th>
                       <th className="px-10 py-6"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {MOCK_PENDING_DOCS.map(doc => (
                       <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-10 py-6 font-black text-ciatos-navy text-sm">{doc.name}</td>
                          <td className="px-10 py-6 text-[10px] font-black uppercase text-gray-400">{doc.unit}</td>
                          <td className="px-10 py-6 text-xs font-bold text-gray-600">{doc.type} <span className="opacity-40 italic">{doc.competence}</span></td>
                          <td className="px-10 py-6 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                doc.status === 'Atrasado' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                             }`}>
                                {doc.status}
                             </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                             <button className="p-3 text-gray-300 hover:text-ciatos-gold transition-all"><Send size={16}/></button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {activeView === 'upload' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
           <div className="bg-ciatos-navy p-12 rounded-[4rem] text-white flex flex-col items-center text-center space-y-12 relative overflow-hidden">
              <Shield className="absolute top-[-40px] left-[-40px] text-white/5 w-64 h-64 rotate-12" />
              <div className="p-6 bg-white/10 rounded-[2.5rem] border border-white/20"><FileUp size={48} className="text-ciatos-gold" /></div>
              <div className="space-y-3 relative z-10">
                 <h3 className="text-3xl font-black tracking-tight uppercase">Central de Execução em Massa</h3>
                 <p className="text-gray-400 font-medium max-w-2xl mx-auto italic">
                    Suba os arquivos consolidados do mês. Nossa IA lerá o CPF/Matrícula nos documentos e os distribuirá automaticamente nos dossiês corretos, auditando indícios de assinatura.
                 </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl relative z-10">
                 <UploadActionCard icon={<FileText size={32}/>} label="Holerites (PDF Único)" onClick={() => handleBulkUpload('Holerites')} />
                 <UploadActionCard icon={<Clock size={32}/>} label="Espelhos de Ponto" onClick={() => handleBulkUpload('Espelhos de Ponto')} />
                 <UploadActionCard icon={<FileCheck size={32}/>} label="Banco de Horas" onClick={() => handleBulkUpload('Banco de Horas')} />
              </div>

              {isUploading && (
                <div className="w-full max-w-xl space-y-4 animate-in zoom-in">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-ciatos-gold">
                      <span>Processando Auditoria IA...</span>
                      <span>85%</span>
                   </div>
                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-ciatos-gold animate-pulse" style={{ width: '85%' }} />
                   </div>
                </div>
              )}
           </div>
        </div>
      )}

      {activeView === 'jornada' && (
         <div className="bg-amber-50 p-10 rounded-[4rem] border border-amber-100 flex flex-col md:flex-row items-center gap-10 shadow-sm animate-in slide-in-from-bottom-4">
            <div className="p-6 bg-amber-600 text-white rounded-3xl shadow-xl"><ShieldAlert size={40} /></div>
            <div className="flex-1">
               <h4 className="text-2xl font-black text-amber-900 tracking-tight">Risco Preventivo: Acúmulo de Horas</h4>
               <p className="text-sm font-medium text-amber-800 leading-relaxed mt-2 italic">"⚠️ 5 colaboradores ultrapassaram o limite de 30h positivas este mês. Recomenda-se notificação aos gestores para escala de folgas táticas."</p>
            </div>
            <button className="px-8 py-4 bg-ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Notificar Gestores</button>
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
    className="p-10 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col items-center gap-6 hover:bg-white/10 hover:border-ciatos-gold transition-all group shadow-2xl"
  >
     <div className="text-ciatos-gold group-hover:scale-110 transition-transform">{icon}</div>
     <span className="text-xs font-black uppercase tracking-widest text-gray-200">{label}</span>
     <div className="px-4 py-2 bg-ciatos-gold/20 rounded-xl text-[8px] font-black text-ciatos-gold uppercase tracking-[0.2em]">Upload em Massa</div>
  </button>
);

export default ComplianceManager;
