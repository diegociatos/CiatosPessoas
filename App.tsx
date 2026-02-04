
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Settings, 
  Bell, 
  LogOut, 
  Search,
  BrainCircuit,
  LayoutDashboard,
  Database,
  MessageSquareQuote,
  GraduationCap,
  BarChart3
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import Recruitment from './components/Recruitment';
import StrategicAssistant from './components/StrategicAssistant';
import ResumeBank from './components/ResumeBank';
import FeedbackPDI from './components/FeedbackPDI';
import Training from './components/Training';
import StrategicReports from './components/StrategicReports';
import SettingsCompliance from './components/SettingsCompliance';
import EmployeeDossier from './components/EmployeeDossier';

const MenuItem: React.FC<{ item: any; active: boolean }> = ({ item, active }) => (
  <Link
    to={item.path}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all mb-1 ${
      active 
        ? 'bg-white/10 text-ciatos-gold shadow-lg font-bold' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={active ? 'text-ciatos-gold' : ''}>{item.icon}</span>
    <span className="text-xs font-semibold tracking-wide">{item.label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard Inteligente', path: '/' },
    { icon: <Users size={18} />, label: 'Capital Humano', path: '/employees' },
    { icon: <UserPlus size={18} />, label: 'Recrutamento & Seleção', path: '/recruitment' },
    { icon: <Database size={18} />, label: 'Curadoria de Talentos', path: '/resumes' },
    { icon: <MessageSquareQuote size={18} />, label: 'Gestão de Feedback', path: '/feedbacks' },
    { icon: <GraduationCap size={18} />, label: 'Ciatos Academy', path: '/training' },
    { icon: <BarChart3 size={18} />, label: 'Análise Estratégica', path: '/reports' },
    { icon: <Settings size={18} />, label: 'Governança & LGPD', path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 ciatos-navy text-white flex flex-col z-50 shadow-2xl border-r border-white/5">
      <div className="p-10 border-b border-white/10 flex flex-col items-center">
        <div className="w-16 h-1 bg-ciatos-gold mb-6 rounded-full opacity-50" />
        <h1 className="text-3xl font-black tracking-tighter text-ciatos-gold">CIATOS</h1>
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mt-2 font-bold text-center">People Intelligence</p>
      </div>
      
      <nav className="flex-1 mt-6 overflow-y-auto custom-scrollbar px-6">
        <div className="mb-8">
          <p className="text-[10px] uppercase text-gray-500 font-black px-4 mb-4 tracking-[0.2em]">Operacional</p>
          {menuItems.slice(0, 3).map((item) => (
            <MenuItem key={item.path} item={item} active={location.pathname === item.path || (item.path === '/employees' && location.pathname.startsWith('/employees/'))} />
          ))}
        </div>

        <div className="mb-8">
          <p className="text-[10px] uppercase text-gray-500 font-black px-4 mb-4 tracking-[0.2em]">Desenvolvimento</p>
          {menuItems.slice(3, 6).map((item) => (
            <MenuItem key={item.path} item={item} active={location.pathname === item.path} />
          ))}
        </div>

        <div className="mb-8">
          <p className="text-[10px] uppercase text-gray-500 font-black px-4 mb-4 tracking-[0.2em]">Estratégia</p>
          {menuItems.slice(6).map((item) => (
            <MenuItem key={item.path} item={item} active={location.pathname === item.path} />
          ))}
        </div>

        <Link to="/ai-partner" className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-ciatos-gold/20 to-transparent border border-ciatos-gold/30 flex items-center gap-4 group hover:from-ciatos-gold/30 transition-all shadow-xl">
          <div className="p-2 bg-ciatos-gold rounded-xl shadow-lg shadow-amber-600/20 group-hover:scale-110 transition-transform">
            <BrainCircuit size={20} className="text-ciatos-navy" />
          </div>
          <div>
            <p className="text-xs font-black text-ciatos-gold uppercase tracking-widest">IA Advisor</p>
            <p className="text-[9px] text-gray-400 font-bold">Suporte à Decisão</p>
          </div>
        </Link>
      </nav>

      <div className="p-8 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl ciatos-gold flex items-center justify-center font-black text-navy-900 shadow-xl border-2 border-white/10">
            JD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate tracking-tight">João Diretor</p>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Grupo Ciatos</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
          <LogOut size={14} />
          Encerrar Sessão
        </button>
      </div>
    </aside>
  );
};

const Header = () => (
  <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-40">
    <div className="flex items-center bg-gray-50/50 border border-gray-200 rounded-[1.25rem] px-5 py-3 w-full max-w-lg focus-within:border-ciatos-gold focus-within:bg-white focus-within:ring-4 focus-within:ring-ciatos-gold/5 transition-all">
      <Search size={18} className="text-gray-400" />
      <input 
        type="text" 
        placeholder="Pesquisar no ecossistema de inteligência..." 
        className="bg-transparent border-none focus:ring-0 ml-4 text-sm w-full outline-none text-gray-700 font-medium"
      />
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden xl:flex items-center gap-2.5 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 shadow-sm">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm" />
        <span className="text-[10px] font-black uppercase tracking-[0.1em]">Protocolo LGPD Ativo</span>
      </div>
      <div className="flex gap-2">
        <button className="relative p-3 text-gray-400 hover:text-ciatos-navy hover:bg-gray-100 rounded-2xl transition-all group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
        </button>
        <button className="p-3 text-gray-400 hover:text-ciatos-navy hover:bg-gray-100 rounded-2xl transition-all">
          <Settings size={20} />
        </button>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-[#f8fafc]">
        <Sidebar />
        <main className="flex-1 ml-72 flex flex-col">
          <Header />
          <div className="p-12 max-w-[1700px] mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/:id" element={<EmployeeDossier />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/resumes" element={<ResumeBank />} />
              <Route path="/feedbacks" element={<FeedbackPDI />} />
              <Route path="/training" element={<Training />} />
              <Route path="/reports" element={<StrategicReports />} />
              <Route path="/settings" element={<SettingsCompliance />} />
              <Route path="/ai-partner" element={<StrategicAssistant />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
