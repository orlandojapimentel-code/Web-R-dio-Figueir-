
import React from 'react';
import { ExternalLink, Mail, ArrowRight, Globe } from 'lucide-react';
import { PARTNERS, CONTACT_EMAIL } from '../constants';

const Partners: React.FC = () => {
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Promotion Area */}
        <div className="flex-1 bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-indigo-500/20">
          <div className="relative z-10">
            <h3 className="text-3xl font-outfit font-extrabold mb-4">Seja um Parceiro</h3>
            <p className="text-indigo-100 mb-8 max-w-sm text-lg">
              Divulgue a sua marca na Web Rádio Figueiró e alcance milhares de ouvintes diários. Oferecemos pacotes personalizados.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10">
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg"
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
        <div className="md:w-1/3 bg-slate-900 rounded-3xl p-6 border border-white/5 shadow-xl">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Parceiros Premium</h4>
          <div className="space-y-6">
            {PARTNERS.map((p, idx) => (
              <a 
                key={idx} 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-indigo-500/40 shadow-inner"
              >
                <div className="aspect-video w-full rounded-xl bg-slate-800 mb-4 overflow-hidden border border-white/5">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xl md:text-2xl font-outfit font-extrabold text-white leading-tight group-hover:text-indigo-400 transition-colors">
                      {p.name}
                    </span>
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest pt-2 border-t border-white/5 group-hover:gap-4 transition-all">
                    <Globe size={14} />
                    <span>Clique para visitar o site oficial</span>
                    <ArrowRight size={14} className="ml-auto" />
                  </div>
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
