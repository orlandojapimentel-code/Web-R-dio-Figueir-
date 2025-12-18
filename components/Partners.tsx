
import React from 'react';
import { ExternalLink, Mail, ArrowRight } from 'lucide-react';
import { PARTNERS, CONTACT_EMAIL } from '../constants';

const Partners: React.FC = () => {
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Promotion Area */}
        <div className="flex-1 bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h3 className="text-3xl font-outfit font-extrabold mb-4">Seja um Parceiro</h3>
            <p className="text-indigo-100 mb-8 max-w-sm">
              Divulgue a sua marca na Web Rádio Figueiró e alcance milhares de ouvintes diários. Oferecemos pacotes personalizados.
            </p>
          </div>
          <div className="flex gap-4 relative z-10">
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2"
            >
              <Mail size={18} /> Seja Parceiro
            </a>
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="px-6 py-3 bg-indigo-500/50 text-white font-bold rounded-xl hover:bg-indigo-400 transition-all flex items-center gap-2 border border-white/20"
            >
              Saber Mais <ArrowRight size={18} />
            </a>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Existing Partners */}
        <div className="md:w-1/3 bg-slate-900 rounded-3xl p-6 border border-white/5">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Parceiros Premium</h4>
          <div className="space-y-4">
            {PARTNERS.map((p, idx) => (
              <a 
                key={idx} 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-indigo-500/30"
              >
                <div className="aspect-video w-full rounded-xl bg-slate-800 mb-3 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-300 group-hover:text-white">{p.name}</span>
                  <ExternalLink size={16} className="text-slate-500 group-hover:text-indigo-400" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
