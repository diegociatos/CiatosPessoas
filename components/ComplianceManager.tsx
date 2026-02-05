
import React, { useState } from 'react';
import { 
  FileUp, FileText, CheckCircle2, AlertTriangle, Search, 
  Filter, Building2, Calendar, ShieldCheck, Download,
  X, Plus, RefreshCw, Eye, MoreVertical, Archive,
  LayoutGrid, List, CheckSquare, Clock, ShieldAlert,
  ArrowUpRight, Users, Bell, UserX
} from 'lucide-react';
import { BusinessUnit, MonthlyDocStatus } from '../types';

const MOCK_PENDING_DOCS = [
  { id: '1', name: 'Ricardo Mendes', unit: BusinessUnit.JURIDICO, type: 'Holerite', competence: '05/2024', status: 'Atrasado' },
  { id: '2', name: 'Carla Oliveira', unit: BusinessUnit.CONTABILIDADE, type: 'Folha de Ponto', competence: '06/2024', status: 'Pendente' },
  { id: '3', name: 'Marcos Souza', unit: BusinessUnit.LOG, type: 'Holerite', competence: '06/2024', status: 'Pendente' },
];

const MOCK_PONTO_AUDIT = [
  { id: 'p1', name: 'Fernando Silva', unit: 'Contábil', saldo: '+42h 15min', status: 'Pendente Assinatura', risk: 'Crítico' },
  { id: 'p2', name: 'Juliana Torres', unit: 'Fiscal', saldo: '+38h 00min', status: 'Assinado', risk: 'Alto' },
  { id: 'p3', name: 'Roberto Assis', unit: 'Jurídico', saldo: '-05h 20min', status: 'Pendente Assinatura', risk: 'Baixo' },
  { id: 'p4', name: 'Ana Paula', unit: 'Contábil', saldo: '+45h 50min', status: 'Pendente Assinatura', risk: 'Crítico' },
];

const ComplianceManager: React.FC = () => {
  const [activeView, setActiveView] = useState<'pendencias' | 'jornada' | 'upload'>('pendencias');
  const [isUploading, setIsUploading] = useState(false);
  const [competence, setCompetence] = useState('06/2024');

  const handleBulkUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert('Relatório de Banco de Horas processado. 45 saldos atualizados via IA.');
    }, 2000);
  };

  const handleNotifyPonto = () => {
    alert("Notificação enviada para todos os colaboradores com espelho de ponto pendente.");
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
            <p className="text-sm text-gray-400 font-medium italic mt-2">Monitoramento de obrigações mensais e gestão de jornada estratégica.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
           <button 
            onClick={() => setActiveView('upload')}
            className="px-8 py-4 bg-ciatos-gold text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
           >
             <Plus size={18} /> Upload de Documentos
           </button>
        </div>
      </div>

      {/* TABS DE GESTÃO */}
      <div className="flex gap-8 border-b border-gray-100 px-6">
        <TabBtn label="Documentos Pendentes" active={activeView === 'pendencias'} onClick={() => setActiveView('pendencias')} />
        <TabBtn label="Gestão de Jornada (Ponto)" active={activeView === 'jornada'} onClick={() => setActiveView('jornada')} />
        <TabBtn label="Central de Processamento IA" active={activeView === 'upload'} onClick={() => setActiveView('upload')} />
      </div>

      {/* VISÃO: GESTÃO DE JORNADA */}
      {activeView === 'jornada' && (
        <div className="space-y-10 animate-in slide-in-from-bottom-4">
           {/* Banner de Risco de Passivo */}
           <div className="bg-red-50 p-10 rounded-[4rem] border border-red-100 flex flex-col md:flex-row items-center gap-10 shadow-sm">
              <div className="p-6 bg-red-600 text-white rounded-3xl shadow-xl animate-pulse">
                 <ShieldAlert size={40} />
              </div>
              <div className="flex-1">
                 <h4 className="text-2xl font-black text-red-900 tracking-tight">Alerta de Passivo: Banco de Horas Crítico</h4>
                 <p className="text-sm font-medium text-red-800 leading-relaxed mt-2">
                    Atenção: **3 colaboradores** ultrapassaram o limite de 40h positivas no banco. Recomendamos compensação imediata ou pagamento em folha para mitigar riscos trabalhistas.
                 </p>
              </div>
              <div className="flex gap-4">
                 <button className="px-8 py-4 bg-white text-red-600 border border-red-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Ver Colaboradores</button>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Auditoria de Assinaturas (Espelho de Ponto) */}
              <div className="lg:col-span-8 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                 <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-ciatos-navy text-white rounded-2xl shadow-sm"><CheckSquare size={20} /></div>
                       <h3 className="text-xs font-black text-ciatos-navy uppercase tracking-widest">Auditoria de Assinaturas: Espelho de Ponto</h3>
                    </div>
                    <button 
                      onClick={handleNotifyPonto}
                      className="px-6 py-3 bg-ciatos-navy text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                    >
                       <Bell size={14} /> Notificar Pendentes
                    </button>
                 </div>
                 <table className="w-full text-left">
                    <thead className="bg-slate-50/30">
                       <tr>
                          <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
                          <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Saldo Atual</th>
                          <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                          <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Risco</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {MOCK_PONTO_AUDIT.map(row => (
                         <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-10 py-6">
                               <p className="text-sm font-black text-ciatos-navy">{row.name}</p>
                               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{row.unit}</p>
                            </td>
                            <td className="px-10 py-6">
                               <span className={`text-xs font-mono font-bold ${row.saldo.startsWith('+') ? 'text-ciatos-gold' : 'text-red-500'}`}>
                                  {row.saldo}
                               </span>
                            </td>
                            <td className="px-10 py-6 text-center">
                               <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                  row.status === 'Assinado' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                               }`}>
                                  {row.status}
                               </span>
                            </td>
                            <td className="px-10 py-6 text-right">
                               <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase ${
                                  row.risk === 'Crítico' ? 'bg-red-600 text-white shadow-sm' : 
                                  row.risk === 'Alto' ? 'bg-amber-500 text-white' : 
                                  'bg-gray-100 text-gray-400'
                               }`}>
                                  {row.risk}
                               </span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              {/* Upload do Relatório do Sistema de Ponto */}
              <div className="lg:col-span-4 space-y-8">
                 <div className="bg-ciatos-navy p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
                    <Clock className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
                    <div className="relative z-10">
                       <div className="flex items-center gap-4 mb-8">
                          <div className="p-4 bg-ciatos-gold rounded-3xl text-ciatos-navy"><FileUp size={28} /></div>
                          <h3 className="text-lg font-black text-ciatos-gold tracking-tight uppercase">Update de Jornada</h3>
                       </div>
                       <p className="text-sm text-gray-300 font-medium italic leading-relaxed mb-10">
                          "Arraste aqui o relatório de **Banco de Horas** do sistema de ponto (Fortes, Alterdata, etc). A IA irá atualizar o saldo de cada colaborador automaticamente."
                       </p>
                       
                       <div 
                         className="border-4 border-dashed border-white/10 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center group hover:border-ciatos-gold transition-all cursor-pointer bg-white/5"
                         onClick={handleBulkUpload}
                       >
                          {isUploading ? (
                             <RefreshCw className="text-ciatos-gold animate-spin mb-4" size={40} />
                          ) : (
                             <FileUp className="text-gray-500 group-hover:text-ciatos-gold transition-colors mb-4" size={40} />
                          )}
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white">Clique para Upload de Relatório</p>
                       </div>
                    </div>
                    <div className="mt-10 pt-8 border-t border-white/10">
                       <div className="flex items-center gap-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                          <ShieldCheck size={14} className="text-emerald-500" /> Processamento Criptografado
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeView === 'pendencias' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
          <div className="flex gap-4">
             <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Filtrar por nome ou unidade..." className="bg-transparent border-none outline-none text-xs font-bold w-full" />
             </div>
             <div className="w-48 bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                <Calendar size={18} className="text-ciatos-gold" />
                <input type="text" value={competence} onChange={e => setCompetence(e.target.value)} className="bg-transparent border-none outline-none text-xs font-bold w-full" />
             </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                   <tr>
                      <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
                      <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Unidade</th>
                      <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Documento</th>
                      <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Competência</th>
                      <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
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
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                               doc.status === 'Atrasado' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                               {doc.status}
                            </span>
                         </td>
                         <td className="px-10 py-6 text-right">
                            <button className="text-[10px] font-black text-ciatos-gold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">Solicitar <ChevronRight size={14}/></button>
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
           <div className="bg-ciatos-navy p-16 rounded-[4rem] text-white flex flex-col items-center text-center space-y-8 border-b-[16px] border-b-ciatos-gold">
              <div className="p-8 bg-white/10 border border-white/20 rounded-[3rem] shadow-2xl">
                 <FileUp size={64} className="text-ciatos-gold" />
              </div>
              <div className="space-y-3">
                 <h3 className="text-3xl font-black tracking-tight">Upload em Massa via Advisor (Holerites)</h3>
                 <p className="text-gray-400 font-medium max-w-xl mx-auto italic">
                    Arraste os PDFs de Holerites. Nossa IA identificará automaticamente o colaborador e a competência através do CPF contido no arquivo.
                 </p>
              </div>
              <div className="flex gap-6 pt-4">
                 <button 
                  onClick={handleBulkUpload}
                  disabled={isUploading}
                  className="px-12 py-6 bg-ciatos-gold text-ciatos-navy rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all flex items-center justify-center gap-3 min-w-[300px]"
                 >
                    {isUploading ? <RefreshCw size={20} className="animate-spin" /> : <ShieldCheck size={20} />}
                    {isUploading ? 'Analisando Documentos...' : 'Iniciar Processamento'}
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <UploadStatusCard label="Pendências Identificadas" value="22" color="text-amber-600" />
              <UploadStatusCard label="Processados com Sucesso" value="114" color="text-emerald-600" />
              <UploadStatusCard label="Erros de Leitura (OCR)" value="2" color="text-red-600" />
           </div>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ label, active, onClick }: any) => (
  <button 
    onClick={onClick} 
    className={`pb-5 text-[11px] font-black uppercase tracking-widest transition-all ${
      active ? 'text-ciatos-gold border-b-2 border-ciatos-gold' : 'text-gray-400 hover:text-ciatos-navy'
    }`}
  >
    {label}
  </button>
);

const UploadStatusCard = ({ label, value, color }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
     <p className={`text-4xl font-black ${color} tracking-tighter`}>{value}</p>
  </div>
);

const ChevronRight = ({ size }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);

export default ComplianceManager;
