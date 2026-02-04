
import React from 'react';
import { PlayCircle, Clock, Award, CheckCircle } from 'lucide-react';

const courses = [
  { id: 1, title: 'Compliance LGPD no Ciatos Group', duration: '2h 30min', category: 'Legal', progress: 100 },
  { id: 2, title: 'Excel Avançado para Contadores', duration: '12h 00min', category: 'Technical', progress: 45 },
  { id: 3, title: 'Liderança e Gestão Humanizada', duration: '5h 15min', category: 'Behavioral', progress: 10 },
];

const Training: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ciatos-navy">Ciatos Academy</h2>
          <p className="text-sm text-gray-500">Desenvolvimento de competências técnicas e comportamentais.</p>
        </div>
        <div className="flex gap-4 items-center">
           <div className="text-right">
             <p className="text-[10px] font-bold text-gray-400 uppercase">Horas totais este mês</p>
             <p className="text-lg font-bold text-ciatos-navy">124 horas</p>
           </div>
           <Award size={32} className="text-ciatos-gold" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group transition-all hover:translate-y-[-4px] hover:shadow-xl">
            <div className={`h-28 flex items-center justify-center ${course.progress === 100 ? 'bg-green-500' : 'bg-ciatos-navy'}`}>
               {course.progress === 100 ? <CheckCircle size={48} className="text-white/40" /> : <PlayCircle size={48} className="text-white/20 group-hover:text-ciatos-gold transition-all" />}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-[9px] font-bold text-ciatos-gold uppercase tracking-widest mb-2">{course.category}</span>
              <h3 className="font-bold text-gray-800 leading-snug mb-4 h-10 overflow-hidden">{course.title}</h3>
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3 font-medium">
                  <div className="flex items-center gap-1.5"><Clock size={14} /> {course.duration}</div>
                  <div>{course.progress}%</div>
                </div>
                <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-1000 ${course.progress === 100 ? 'bg-green-500' : 'bg-ciatos-gold'}`} style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Training;
