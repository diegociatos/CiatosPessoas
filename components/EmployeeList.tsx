
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeStatus } from '../types';
import { MoreVertical, Filter, Download, UserCircle } from 'lucide-react';

const employees = [
  { id: '1', name: 'Ricardo Mendes', role: 'Advogado Sênior', dept: 'Jurídico', status: EmployeeStatus.ACTIVE, mood: 88, prod: 95 },
  { id: '2', name: 'Carla Oliveira', role: 'Analista Fiscal', dept: 'Contábil', status: EmployeeStatus.ACTIVE, mood: 45, prod: 82 },
  { id: '3', name: 'Marcos Souza', role: 'Gestor de TI', dept: 'Operações', status: EmployeeStatus.ONBOARDING, mood: 92, prod: 70 },
  { id: '4', name: 'Fabiana Costa', role: 'Analista de RH', dept: 'RH', status: EmployeeStatus.VACATION, mood: 100, prod: 0 },
  { id: '5', name: 'Ana Silva', role: 'Assistente Jurídico', dept: 'Jurídico', status: EmployeeStatus.ACTIVE, mood: 32, prod: 88 },
];

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-ciatos-navy">Quadro de Colaboradores</h2>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white">
            <Filter size={18} className="text-gray-500" />
          </button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white">
            <Download size={18} className="text-gray-500" />
          </button>
          <button className="px-4 py-2 ciatos-navy text-white rounded-lg text-sm font-semibold">
            Cadastrar Colaborador
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Colaborador</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Saúde Emocional</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Produtividade</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp) => (
              <tr 
                key={emp.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/employees/${emp.id}`)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-ciatos-navy">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{emp.name}</p>
                      <p className="text-xs text-gray-500">{emp.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{emp.dept}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    emp.status === EmployeeStatus.ACTIVE ? 'bg-green-100 text-green-700' :
                    emp.status === EmployeeStatus.VACATION ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        emp.mood > 70 ? 'bg-green-500' : emp.mood > 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${emp.mood}%` }} 
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">{emp.mood}% Score</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-700">{emp.prod}%</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-1 h-3 rounded-full ${i <= (emp.prod/20) ? 'bg-ciatos-navy' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-ciatos-navy rounded-lg hover:bg-gray-100 transition-colors">
                    <UserCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
