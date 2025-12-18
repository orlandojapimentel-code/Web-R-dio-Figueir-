
import React from 'react';
import { ExternalLink, Mail, ArrowRight, Globe, MousePointerClick } from 'lucide-react';
import { PARTNERS, CONTACT_EMAIL } from '../constants';

const Partners: React.FC = () => {
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Promotion Area */}
        <div className="flex-1 bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-indigo-500/20">
          <div className="relative z-10">
            <h3 className="text-3xl font-outfit font-extrabold mb-4">Seja um Parceiro</h3>
            <p className="text-indigo-100 mb-8 max-w-sm text-lg leading-relaxed">
              Divulgue a sua marca na Web Rádio Figueiró e alcance milhares de ouvintes diários. Oferecemos pacotes personalizados de publicidade.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 relative z-10">
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="px-6 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
              <Mail size={18} /> Publicitar Agora
            </a>
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="px-6 py-4 bg-indigo-500/50 text-white font-bold rounded-2xl hover:bg-indigo-400 transition-all flex items-center gap-2 border border-white/20 active:scale-95"
            >
              Saber Mais <ArrowRight size={18} />
            </a>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Existing Partners */}
        <div className="md:w-1/3 bg-slate-900 rounded-3xl p-6 border border-white/5 shadow-xl">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
            Parceiro Principal
          </h4>
          <div className="space-y-6">
            {PARTNERS.map((p, idx) => (
              <a 
                key={idx} 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-4 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-indigo-500/50 shadow-2xl"
              >
                <div className="aspect-video w-full rounded-2xl bg-slate-800 mb-5 overflow-hidden border border-white/5 relative">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2 text-white bg-indigo-600/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      <MousePointerClick size={12} /> Visitar Website
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-2xl md:text-3xl font-outfit font-black text-white leading-[1.1] group-hover:text-indigo-400 transition-colors drop-shadow-sm">
                      {p.name}
                    </span>
                    <div className="mt-1 p-2.5 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 group-hover:scale-110 transition-transform">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.15em] pt-4 border-t border-white/5 group-hover:gap-4 transition-all">
                    <Globe size={14} />
                    <span>Clique para ver mais detalhes</span>
                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
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
