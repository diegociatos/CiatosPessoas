
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Users, UserPlus, ShieldCheck, Settings, Bell, LogOut, Search,
  BrainCircuit, LayoutDashboard, Database, MessageSquareQuote,
  GraduationCap, BarChart3, ClipboardList, Home, ShieldAlert,
  Archive, Contact, UserCog, Landmark, RefreshCw
} from 'lucide-react';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole } from './types';

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
import BehavioralAssessments from './components/BehavioralAssessments';
import EmployeeHome from './components/EmployeeHome';
import AdminDashboard from './components/AdminDashboard';
import ComplianceManager from './components/ComplianceManager';
import RHOverview from './components/RHOverview';
import ManagerDashboard from './components/ManagerDashboard';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import Login from './components/Login';
import AuthHeader from './components/AuthHeader';

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
  const { user, logout } = useAuth();
  
  if (!user) return null;

  const menuItems = [
    { icon: <Home size={18} />, label: 'Minha Jornada', path: '/me' },
    { icon: <UserCog size={18} />, label: 'Visão Gestor', path: '/manager' },
    { icon: <Contact size={18} />, label: 'Visão RH', path: '/rh' },
    { icon: <Landmark size={18} />, label: 'Visão Diretoria', path: '/executive' },
    { icon: <Users size={18} />, label: 'Capital Humano', path: '/employees' },
    { icon: <Archive size={18} />, label: 'Conformidade & DP', path: '/compliance' },
    { icon: <UserPlus size={18} />, label: 'Recrutamento & Seleção', path: '/recruitment' },
    { icon: <Database size={18} />, label: 'Curadoria de Talentos', path: '/resumes' },
    { icon: <MessageSquareQuote size={18} />, label: 'Gestão de Feedback', path: '/feedbacks' },
    { icon: <ClipboardList size={18} />, label: 'Avaliações DISC', path: '/assessments' },
    { icon: <GraduationCap size={18} />, label: 'Ciatos Academy', path: '/training' },
    { icon: <BarChart3 size={18} />, label: 'Análise Estratégica', path: '/reports' },
    { icon: <ShieldAlert size={18} />, label: 'Visão Admin', path: '/admin' },
    { icon: <Settings size={18} />, label: 'Governança & LGPD', path: '/settings' },
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard Geral', path: '/' },
  ];

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-72 ciatos-navy text-white flex flex-col z-50 shadow-2xl border-r border-white/5">
      <nav className="flex-1 mt-6 overflow-y-auto custom-scrollbar px-6 pb-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase text-gray-500 font-black px-4 mb-4 tracking-[0.2em]">Pessoal</p>
          <MenuItem item={menuItems[0]} active={location.pathname === '/me'} />
          <MenuItem item={menuItems[9]} active={location.pathname === '/assessments'} />
        </div>

        {(user.role === UserRole.MANAGER || user.role === UserRole.ADMIN) && (
          <div className="mb-8">
            <p className="text-[10px] uppercase text-gray-500 font-black px-4 mb-4 tracking-[0.2em]">Liderança</p>
            <MenuItem item={menuItems[1]} active={location.pathname === '/manager'} />
            <MenuItem item={menuItems[4]} active={location.pathname === '/employees' || location.pathname.startsWith('/employees/')} />
            <MenuItem item={menuItems[8]} active={location.pathname === '/feedbacks'} />
          </div>
        )}

        {(user.role === UserRole.HR || user.role === UserRole.ADMIN) && (
          <div className="mb-8">
            <p className="text-[10px] uppercase text-gray-500 font-black px-4 mb-4 tracking-[0.2em]">Visão RH</p>
            <MenuItem item={menuItems[2]} active={location.pathname === '/rh'} />
            <MenuItem item={menuItems[5]} active={location.pathname === '/compliance'} />
            <MenuItem item={menuItems[6]} active={location.pathname === '/recruitment'} />
            <MenuItem item={menuItems[7]} active={location.pathname === '/resumes'} />
          </div>
        )}

        {user.role === UserRole.ADMIN && (
          <div className="mb-8">
            <p className="text-[10px] uppercase text-gray-500 font-black px-4 mb-4 tracking-[0.2em]">Diretoria & Board</p>
            <MenuItem item={menuItems[3]} active={location.pathname === '/executive'} />
            <MenuItem item={menuItems[11]} active={location.pathname === '/reports'} />
            <MenuItem item={menuItems[14]} active={location.pathname === '/'} />
            <MenuItem item={menuItems[12]} active={location.pathname === '/admin'} />
            <MenuItem item={menuItems[13]} active={location.pathname === '/settings'} />
          </div>
        )}

        <div className="mb-8">
          <p className="text-[10px] uppercase text-gray-500 font-black px-4 mb-4 tracking-[0.2em]">Educação</p>
          <MenuItem item={menuItems[10]} active={location.pathname === '/training'} />
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
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <LogOut size={14} /> Encerrar Sessão
        </button>
      </div>
    </aside>
  );
};

const Header = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-12 sticky top-14 z-40">
      <div className="flex items-center bg-gray-50/50 border border-gray-200 rounded-[1.25rem] px-5 py-3 w-full max-w-lg focus-within:border-ciatos-gold focus-within:bg-white focus-within:ring-4 focus-within:ring-ciatos-gold/5 transition-all">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Pesquisar no ecossistema..." 
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
};

// Fix: Made children optional in the props type definition to resolve TS error where children are not correctly detected in JSX Routes
const ProtectedRoute = ({ children, allowedRoles }: { children?: React.ReactNode, allowedRoles?: UserRole[] }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="h-screen w-full ciatos-navy flex items-center justify-center">
        <RefreshCw size={48} className="text-ciatos-gold animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/me" replace />;
  
  return <>{children}</>;
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AuthHeader />
      <Sidebar />
      <main className={`flex-1 ${user ? 'ml-72 pt-14' : ''} flex flex-col`}>
        <Header />
        <div className="p-12 max-w-[1700px] mx-auto w-full">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/me" replace /> : <Login />} />
            
            <Route path="/" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><Dashboard /></ProtectedRoute>} />
            <Route path="/me" element={<ProtectedRoute><EmployeeHome /></ProtectedRoute>} />
            <Route path="/manager" element={<ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.ADMIN]}><ManagerDashboard /></ProtectedRoute>} />
            <Route path="/rh" element={<ProtectedRoute allowedRoles={[UserRole.HR, UserRole.ADMIN]}><RHOverview /></ProtectedRoute>} />
            <Route path="/executive" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><ExecutiveDashboard /></ProtectedRoute>} />
            <Route path="/compliance" element={<ProtectedRoute allowedRoles={[UserRole.HR, UserRole.ADMIN]}><ComplianceManager /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]}><EmployeeList /></ProtectedRoute>} />
            <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDossier /></ProtectedRoute>} />
            <Route path="/recruitment" element={<ProtectedRoute allowedRoles={[UserRole.HR, UserRole.ADMIN]}><Recruitment /></ProtectedRoute>} />
            <Route path="/resumes" element={<ProtectedRoute allowedRoles={[UserRole.HR, UserRole.ADMIN]}><ResumeBank /></ProtectedRoute>} />
            <Route path="/feedbacks" element={<ProtectedRoute allowedRoles={[UserRole.MANAGER, UserRole.HR, UserRole.ADMIN]}><FeedbackPDI /></ProtectedRoute>} />
            <Route path="/assessments" element={<ProtectedRoute><BehavioralAssessments /></ProtectedRoute>} />
            <Route path="/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><StrategicReports /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><SettingsCompliance /></ProtectedRoute>} />
            <Route path="/ai-partner" element={<ProtectedRoute><StrategicAssistant /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to={user ? "/me" : "/login"} replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
