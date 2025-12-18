
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { DAILY_SCHEDULE, WEEKLY_SCHEDULE } from '../constants';

const Schedule: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Daily Schedule */}
      <div className="bg-slate-900/50 rounded-3xl p-6 border border-white/5">
        <h3 className="text-xl font-outfit font-bold mb-6 flex items-center gap-2">
          <Calendar className="text-indigo-400" /> Programação Diária
        </h3>
        <div className="space-y-4">
          {DAILY_SCHEDULE.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">{item.time}</p>
                <h4 className="font-bold text-slate-200">{item.name}</h4>
                <p className="text-sm text-slate-400">{item.host}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Specials */}
      <div className="bg-slate-900/50 rounded-3xl p-6 border border-white/5">
        <h3 className="text-xl font-outfit font-bold mb-6 flex items-center gap-2">
          <Calendar className="text-pink-400" /> Destaques Semanais
        </h3>
        <div className="space-y-4">
          {WEEKLY_SCHEDULE.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-pink-500/50">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-200">{item.name}</h4>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-pink-500/20 text-pink-400">
                  {item.days}
                </span>
              </div>
              <p className="text-xs font-semibold text-pink-400 mb-2 flex items-center gap-1">
                <Clock size={12} /> {item.time}
              </p>
              <p className="text-sm text-slate-400 italic">"{item.description}"</p>
              <p className="text-xs text-slate-500 mt-2">— {item.host}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
