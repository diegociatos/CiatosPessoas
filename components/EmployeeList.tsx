
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeStatus, BusinessUnit } from '../types';
import { 
  MoreVertical, Filter, Download, UserCircle, Plus, 
  X, Save, UserPlus, Mail, Building2, Calendar, 
  CheckCircle2, Copy, ShieldCheck, Link as LinkIcon,
  Sparkles, RefreshCw, Briefcase, FileText, Bell, Brain,
  Smartphone, MapPin, CreditCard, Camera, FileUp, ChevronRight, ChevronLeft, Lock,
  AlertCircle, History, Clock
} from 'lucide-react';
import { generateOnboardingChecklist } from '../services/geminiService';

const INITIAL_EMPLOYEES = [
  { id: '1', name: 'Ricardo Mendes', role: 'Advogado Sênior', dept: 'Jurídico', status: EmployeeStatus.ACTIVE, mood: 88, prod: 95 },
  { id: '2', name: 'Carla Oliveira', role: 'Analista Fiscal', dept: 'Contábil', status: EmployeeStatus.ACTIVE, mood: 45, prod: 82 },
  { id: '3', name: 'Marcos Souza', role: 'Gestor de TI', dept: 'Operações', status: EmployeeStatus.ONBOARDING, mood: 92, prod: 70 },
];

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHistorical, setIsHistorical] = useState(false);
  const [importHistory, setImportHistory] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    rg: '',
    birthDate: '',
    address: { street: '', number: '', city: '', state: '', zip: '' },
    unit: BusinessUnit.CONTABILIDADE,
    dept: '',
    role: '',
    hiringDate: new Date().toISOString().split('T')[0],
    bank: '',
    agency: '',
    account: '',
    pix: '',
  });

  const [onboardingChecklist, setOnboardingChecklist] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<any>(null);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFinalizeAdmission = async () => {
    setIsSubmitting(true);
    const newId = `CIA-${Date.now().toString().slice(-6)}`;
    const cleanCpf = formData.cpf.replace(/\D/g, '');
    
    setCredentials({
      login: cleanCpf,
      pass: "123456",
      invite: `https://people.ciatos.com.br/access/${newId}`
    });

    const checklist = await generateOnboardingChecklist({
      name: formData.name,
      role: formData.role,
      unit: formData.unit,
      isHistorical: isHistorical
    });
    setOnboardingChecklist(checklist);

    const newEmp = {
      id: newId,
      name: formData.name,
      role: formData.role,
      dept: formData.dept,
      status: isHistorical ? EmployeeStatus.ACTIVE : EmployeeStatus.PENDING_FIRST_ACCESS,
      mood: 0,
      prod: 0
    };

    setEmployees([newEmp, ...employees]);
    setIsSubmitting(false);
    setCurrentStep(5);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setIsHistorical(false);
    setImportHistory(false);
    setFormData({
      name: '', email: '', phone: '', cpf: '', rg: '', birthDate: '',
      address: { street: '', number: '', city: '', state: '', zip: '' },
      unit: BusinessUnit.CONTABILIDADE, dept: '', role: '',
      hiringDate: new Date().toISOString().split('T')[0],
      bank: '', agency: '', account: '', pix: ''
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-ciatos-navy tracking-tight">Painel de Capital Humano</h2>
          <p className="text-sm text-gray-400 font-medium italic mt-1">Gestão ativa do ciclo de vida do colaborador.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus size={18} /> Cadastrar Colaborador
        </button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Cargo / Setor</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Performance</th>
              <th className="px-8 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-all cursor-pointer group" onClick={() => navigate(`/employees/${emp.id}`)}>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl ciatos-navy text-ciatos-gold flex items-center justify-center font-black text-sm shadow-lg">{emp.name[0]}</div>
                    <div>
                      <p className="text-base font-black text-ciatos-navy">{emp.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">ID: {emp.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <p className="text-sm font-bold text-gray-700">{emp.role}</p>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{emp.dept}</p>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    emp.status === EmployeeStatus.PENDING_FIRST_ACCESS ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${emp.prod}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-ciatos-navy w-8">{emp.prod}%</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-3 text-gray-300 hover:text-ciatos-gold rounded-xl transition-all"><ChevronRight size={24} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ciatos-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden flex h-[90vh]">
              
              <div className="w-80 ciatos-navy p-12 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden">
                 <Sparkles className="absolute top-[-40px] left-[-40px] text-white/5 w-64 h-64" />
                 <div className="relative z-10">
                    <div className="p-4 bg-ciatos-gold rounded-3xl w-fit mb-8 shadow-xl">
                       <UserPlus className="text-ciatos-navy" size={32} />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight leading-none mb-4">Motor de Admissão Digital</h3>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed italic">Ativando acesso estratégico e dossiê funcional.</p>
                 </div>
                 <div className="relative z-10 space-y-6">
                    <StepIndicator num={1} label="Contexto & ID" active={currentStep === 1} done={currentStep > 1} />
                    <StepIndicator num={2} label="Contratual" active={currentStep === 2} done={currentStep > 2} />
                    <StepIndicator num={3} label="Checklist Docs" active={currentStep === 3} done={currentStep > 3} />
                    <StepIndicator num={4} label="Ativação" active={currentStep === 4} done={currentStep > 4} />
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                 <div className="flex justify-between items-start mb-12">
                    <div>
                       <h4 className="text-2xl font-black text-ciatos-navy">
                          {currentStep === 5 ? 'Colaborador Integrado!' : 'Estruturação Cadastral'}
                       </h4>
                       <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Garantia de Mérito & Segurança</p>
                    </div>
                    <button onClick={resetForm} className="p-3 text-gray-300 hover:text-red-500 transition-all"><X size={28}/></button>
                 </div>

                 {currentStep === 1 && (
                   <div className="space-y-10 animate-in slide-in-from-right-4">
                      <div className="grid grid-cols-2 gap-4 p-2 bg-gray-50 rounded-2xl border border-gray-200">
                         <button 
                           onClick={() => setIsHistorical(false)}
                           className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isHistorical ? 'bg-ciatos-navy text-white shadow-lg' : 'text-gray-400 hover:text-ciatos-navy'}`}
                         >
                            Nova Admissão (Digital)
                         </button>
                         <button 
                           onClick={() => setIsHistorical(true)}
                           className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isHistorical ? 'bg-ciatos-navy text-white shadow-lg' : 'text-gray-400 hover:text-ciatos-navy'}`}
                         >
                            Antigo (Carga Histórica)
                         </button>
                      </div>

                      {isHistorical && (
                        <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-center gap-6 animate-in zoom-in">
                           <div className="p-4 bg-ciatos-gold rounded-2xl text-ciatos-navy shadow-lg">
                              <Brain size={24} />
                           </div>
                           <div className="flex-1">
                              <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Advisor Insight</p>
                              <p className="text-sm font-bold text-amber-800 italic mt-1">"Deseja importar o histórico de feedbacks anteriores para a Timeline deste colaborador?"</p>
                           </div>
                           <div className="flex items-center gap-3">
                              <button onClick={() => setImportHistory(true)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${importHistory ? 'bg-ciatos-navy text-white border-ciatos-navy' : 'bg-white text-gray-400 border-gray-200'}`}>Sim</button>
                              <button onClick={() => setImportHistory(false)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${!importHistory ? 'bg-ciatos-navy text-white border-ciatos-navy' : 'bg-white text-gray-400 border-gray-200'}`}>Não</button>
                           </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <InputField icon={<UserCircle size={18}/>} label="Nome Completo" value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} />
                         <InputField icon={<Smartphone size={18}/>} label="CPF (Login do Usuário)" value={formData.cpf} onChange={(e: any) => setFormData({...formData, cpf: e.target.value})} />
                      </div>
                      <NavBtns onNext={handleNext} />
                   </div>
                 )}

                 {currentStep === 2 && (
                   <div className="space-y-8 animate-in slide-in-from-right-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <FormGroup label="Unidade do Grupo">
                            <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-ciatos-navy" value={formData.unit} onChange={(e: any) => setFormData({...formData, unit: e.target.value as any})}>
                               {Object.values(BusinessUnit).map(u => <option key={u}>{u}</option>)}
                            </select>
                         </FormGroup>
                         <InputField label="Departamento" value={formData.dept} onChange={(e: any) => setFormData({...formData, dept: e.target.value})} />
                         <InputField label="Cargo Estratégico" value={formData.role} onChange={(e: any) => setFormData({...formData, role: e.target.value})} />
                      </div>
                      <InputField label="Data de Início" type="date" value={formData.hiringDate} onChange={(e: any) => setFormData({...formData, hiringDate: e.target.value})} />
                      <NavBtns onBack={handleBack} onNext={handleNext} />
                   </div>
                 )}

                 {currentStep === 3 && (
                   <div className="space-y-10 animate-in slide-in-from-right-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Checklist de Documentação Obrigatória</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <UploadCard title="RG / CNH" icon={<FileText size={20}/>} status="Pendente" />
                         <UploadCard title="CPF / PIS" icon={<FileText size={20}/>} status="Pendente" />
                         <UploadCard title="Carteira de Trabalho" icon={<Briefcase size={20}/>} status="Pendente" />
                         <UploadCard title="Contrato de Trabalho" icon={<Lock size={20}/>} status="Pendente" />
                         <UploadCard title="Exames Admissionais (ASO)" icon={<ShieldCheck size={20}/>} status="Pendente" />
                      </div>
                      <NavBtns onBack={handleBack} onNext={handleNext} />
                   </div>
                 )}

                 {currentStep === 4 && (
                   <div className="space-y-12 animate-in slide-in-from-right-4">
                      <div className="bg-ciatos-navy p-12 rounded-[3.5rem] text-white relative overflow-hidden">
                         <Sparkles className="absolute top-[-20px] right-[-20px] text-white/5 w-64 h-64" />
                         <div className="flex items-center gap-6 mb-8">
                            <div className="p-4 bg-ciatos-gold rounded-3xl"><Lock size={32} className="text-ciatos-navy" /></div>
                            <h3 className="text-2xl font-black text-ciatos-gold uppercase tracking-widest">Protocolo de Acesso</h3>
                         </div>
                         <p className="text-lg font-medium leading-relaxed italic text-gray-300">
                            "O login automático foi gerado via CPF ({formData.cpf}). A senha inicial padrão é '123456'. O sistema solicitará a alteração no primeiro acesso."
                         </p>
                      </div>
                      <NavBtns onBack={handleBack} onNext={handleFinalizeAdmission} />
                   </div>
                 )}

                 {currentStep === 5 && (
                   <div className="space-y-12 animate-in zoom-in-95">
                      <div className="bg-emerald-50 p-12 rounded-[4rem] border border-emerald-100 flex flex-col items-center text-center">
                         <div className="p-6 bg-white rounded-full shadow-2xl text-emerald-600 mb-8 scale-125">
                            <CheckCircle2 size={64} />
                         </div>
                         <h5 className="text-3xl font-black text-emerald-900 leading-none mb-3">Cadastro Concluído!</h5>
                         <p className="text-sm text-emerald-700 font-bold italic">Unidade: {formData.unit}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-8">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Lock size={14}/> Credenciais Geradas</p>
                            <div className="space-y-4">
                               <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center"><span className="text-[10px] font-black text-gray-400 uppercase">Login</span><span className="text-xs font-mono font-bold text-ciatos-navy">{credentials?.login}</span></div>
                               <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center"><span className="text-[10px] font-black text-gray-400 uppercase">Senha</span><span className="text-xs font-mono font-bold text-ciatos-navy">123456</span></div>
                            </div>
                            <button onClick={() => alert('Mensagem copiada!')} className="w-full py-5 bg-ciatos-gold text-ciatos-navy rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl">
                               <Copy size={18} /> Copiar Link de Boas-Vindas
                            </button>
                         </div>

                         <div className="bg-ciatos-navy p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border-l-[16px] border-l-ciatos-gold">
                            <Brain className="absolute top-[-20px] right-[-20px] text-white/5 w-48 h-48" />
                            <h5 className="text-[10px] font-black text-ciatos-gold uppercase tracking-widest mb-6">Próximos Passos Advisor</h5>
                            <div className="text-xs text-gray-300 font-bold leading-relaxed italic whitespace-pre-wrap">{onboardingChecklist}</div>
                         </div>
                      </div>
                      <div className="text-center"><button onClick={resetForm} className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] hover:text-ciatos-navy">Encerrar e Voltar ao Painel</button></div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const StepIndicator = ({ num, label, active, done }: any) => (
  <div className={`flex items-center gap-4 transition-all ${active ? 'opacity-100 scale-105' : 'opacity-30'}`}>
     <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${done ? 'bg-emerald-500 text-white' : active ? 'bg-ciatos-gold text-ciatos-navy shadow-lg' : 'bg-white/10 text-white'}`}>{done ? <CheckCircle2 size={18} /> : num}</div>
     <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </div>
);

const InputField = ({ icon, label, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">{icon} {label}</label>
    <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-700 outline-none focus:ring-2 focus:ring-ciatos-gold focus:bg-white transition-all shadow-inner" {...props} />
  </div>
);

const UploadCard = ({ title, icon, status }: any) => (
  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-ciatos-gold transition-all cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-ciatos-gold transition-colors">{icon}</div>
        <p className="text-xs font-black text-ciatos-navy uppercase tracking-tight">{title}</p>
     </div>
     <FileUp size={16} className="text-gray-300" />
  </div>
);

const NavBtns = ({ onNext, onBack }: any) => (
  <div className="pt-8 flex gap-4">
    {onBack && <button onClick={onBack} className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><ChevronLeft size={16}/> Voltar</button>}
    <button onClick={onNext} className="flex-[2] py-5 ciatos-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">Prosseguir <ChevronRight size={16}/></button>
  </div>
);

const FormGroup = ({ label, children }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{label}</label>
    {children}
  </div>
);

export default EmployeeList;
