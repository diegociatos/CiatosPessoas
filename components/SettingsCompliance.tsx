
import React from 'react';
import { Shield, Key, Bell, Users, FileText, CheckCircle, Settings } from 'lucide-react';

const SettingsCompliance: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="p-4 bg-ciatos-navy rounded-2xl text-ciatos-gold">
          <Settings size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-ciatos-navy">Configurações & LGPD</h2>
          <p className="text-sm text-gray-500">Parâmetros de sistema e governança de dados sensíveis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Privacidade & Dados</h3>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
             <SettingItem icon={<Shield />} label="Consentimentos LGPD" desc="Gestão de termos aceitos pelos colaboradores." toggle />
             <SettingItem icon={<FileText />} label="Auditoria de Acesso" desc="Visualizar quem acessou dados sensíveis." link />
             <SettingItem icon={<Key />} label="Políticas de Retenção" desc="Prazo para exclusão de currículos antigos." />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Comunicação</h3>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
             <SettingItem icon={<Bell />} label="Notificações via Push" desc="Alertas de prazos e feedbacks." toggle />
             <SettingItem icon={<Users />} label="Acesso para Gestores" desc="Nível de visibilidade por departamento." link />
          </div>

          <div className="mt-8 bg-green-50 border border-green-100 p-6 rounded-2xl">
             <div className="flex items-center gap-3 mb-2 text-green-700 font-bold">
               <CheckCircle size={20} /> Conformidade Ativa
             </div>
             <p className="text-xs text-green-600 leading-relaxed">
               Seu ambiente está operando sob os protocolos de segurança Ciatos v4.2. Todos os dados são criptografados em repouso.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({ icon, label, desc, toggle, link }: any) => (
  <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="text-gray-400 group-hover:text-ciatos-gold transition-colors">{icon}</div>
      <div>
        <p className="text-sm font-bold text-gray-800">{label}</p>
        <p className="text-[11px] text-gray-400">{desc}</p>
      </div>
    </div>
    {toggle && (
      <div className="w-10 h-5 bg-green-500 rounded-full relative shadow-inner">
        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
      </div>
    )}
    {link && <div className="text-xs font-bold text-ciatos-gold">Gerenciar</div>}
  </div>
);

export default SettingsCompliance;
