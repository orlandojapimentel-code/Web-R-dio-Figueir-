
import React, { useState, useEffect } from 'react';
import { 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  Radio, 
  Newspaper,
  TrendingUp,
  Globe
} from 'lucide-react';
import RadioPlayer from './components/RadioPlayer';
import Schedule from './components/Schedule';
import Partners from './components/Partners';
import { 
  SOCIAL_LINKS, 
  CONTACT_EMAIL, 
  CONTACT_PHONE, 
  SITE_URL, 
  BASE_VISITS 
} from './constants';
import { getGeminiNews } from './services/geminiService';
import { NewsItem } from './types';

const App: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number>(BASE_VISITS);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // Visit Counter Logic
  useEffect(() => {
    const storedVisits = localStorage.getItem('figueiro_visits');
    let current = storedVisits ? parseInt(storedVisits) : BASE_VISITS;
    
    // Check if this is a new session
    const lastSession = sessionStorage.getItem('has_counted');
    if (!lastSession) {
      current += 1;
      localStorage.setItem('figueiro_visits', current.toString());
      sessionStorage.setItem('has_counted', 'true');
    }
    setVisitCount(current);
  }, []);

  // Fetch News Logic
  useEffect(() => {
    const fetchNews = async () => {
      const geminiData = await getGeminiNews();
      if (geminiData) {
        setNews(geminiData);
      } else {
        // Fallback static news
        setNews([
          { id: '1', title: 'Novo Podcast!', content: 'Estreia de Prazeres Interrompidos já na próxima quarta.', date: 'Hoje' },
          { id: '2', title: 'Entrevista Exclusiva', content: 'Conversamos com DJ Durval sobre o futuro do Night Grooves.', date: 'Ontem' },
          { id: '3', title: 'Melhorias no Streaming', content: 'Agora com áudio HD para uma melhor experiência.', date: '2 dias atrás' }
        ]);
      }
      setLoadingNews(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30">
      {/* Header / Navigation - Simplified */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Radio className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-outfit font-black tracking-tighter">FIGUEIRÓ</h1>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block -mt-1">Web Rádio</span>
            </div>
          </a>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-1.5 rounded-full border border-white/10">
              <TrendingUp size={14} className="text-green-400" />
              <span className="text-xs font-mono font-bold text-slate-300">
                {visitCount.toLocaleString()} <span className="text-[10px] text-slate-500 ml-1 tracking-wider">VISITAS</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-24">
        
        {/* Hero Section with Player */}
        <section id="emissao" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest shadow-inner">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Directo de Portugal
            </div>
            <h2 className="text-5xl md:text-7xl font-outfit font-extrabold leading-tight text-white tracking-tight">
              A música que te <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">faz sentir em casa.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              Web Rádio Figueiró: a tua companhia diária com os melhores hits nacionais e internacionais, podcasts exclusivos e uma programação pensada para ti.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-indigo-600 transition-all shadow-lg hover:-translate-y-1"><Facebook size={24} /></a>
               <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-sky-500 transition-all shadow-lg hover:-translate-y-1"><Twitter size={24} /></a>
               <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-red-600 transition-all shadow-lg hover:-translate-y-1"><Youtube size={24} /></a>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <RadioPlayer />
          </div>
        </section>

        {/* Schedule Section */}
        <section id="programacao" className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-outfit font-bold">Nossa Programação</h2>
              <p className="text-slate-500 mt-2">Sintoniza-te com os nossos melhores momentos em direto.</p>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-transparent rounded-full hidden md:block mb-3"></div>
          </div>
          <Schedule />
        </section>

        {/* Partnerships & Promotion */}
        <Partners />

        {/* News Section */}
        <section id="novidades" className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-outfit font-bold flex items-center gap-4">
              <Newspaper className="text-indigo-400" /> Novidades
            </h2>
            <span className="px-3 py-1 rounded-full text-[10px] font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-[0.2em]">IA Insight</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingNews ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-56 rounded-3xl bg-slate-900 animate-pulse border border-white/5"></div>
              ))
            ) : (
              news.map((item, idx) => (
                <article key={idx} className="group p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-indigo-500/40 transition-all hover:bg-slate-900/60 shadow-xl">
                  <time className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{item.date}</time>
                  <h3 className="text-xl font-bold mt-3 group-hover:text-indigo-300 transition-colors leading-snug">{item.title}</h3>
                  <p className="text-slate-400 mt-4 line-clamp-3 text-sm leading-relaxed italic">"{item.content}"</p>
                  <div className="mt-6 pt-6 border-t border-white/5">
                     <span className="text-xs font-semibold text-slate-500 group-hover:text-indigo-400 transition-colors flex items-center gap-2">Ler Mais <TrendingUp size={12} /></span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Footer & Contacts */}
        <footer id="contactos" className="pt-20 pb-12 border-t border-white/5 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Radio size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-outfit font-black tracking-tighter">FIGUEIRÓ</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                A voz de Figueiró para o mundo. Levamos a melhor música e informação até ti, onde quer que estejas através da internet.
              </p>
              <div className="flex items-center gap-5">
                <a href={SOCIAL_LINKS.facebook} className="text-slate-500 hover:text-white transition-colors transform hover:scale-125 duration-300"><Facebook size={20} /></a>
                <a href={SOCIAL_LINKS.twitter} className="text-slate-500 hover:text-white transition-colors transform hover:scale-125 duration-300"><Twitter size={20} /></a>
                <a href={SOCIAL_LINKS.youtube} className="text-slate-500 hover:text-white transition-colors transform hover:scale-125 duration-300"><Youtube size={20} /></a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Navegação</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#emissao" className="hover:text-indigo-400 transition-colors">Directo Online</a></li>
                <li><a href="#programacao" className="hover:text-indigo-400 transition-colors">Grelha de Programas</a></li>
                <li><a href="#novidades" className="hover:text-indigo-400 transition-colors">Blog & Novidades</a></li>
                <li><a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><Globe size={16} /> Portal Figueiró</a></li>
              </ul>
            </div>

            <div className="space-y-6 col-span-1 md:col-span-2">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Linhas de Apoio</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href={`mailto:${CONTACT_EMAIL}`} className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all flex items-center gap-5 shadow-inner">
                  <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-lg shadow-indigo-500/10">
                    <Mail size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Email Direto</p>
                    <p className="text-sm font-bold truncate group-hover:text-white transition-colors">{CONTACT_EMAIL}</p>
                  </div>
                </a>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-all flex items-center gap-5 shadow-inner">
                  <div className="p-4 rounded-2xl bg-pink-500/10 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-lg shadow-pink-500/10">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Telefone / WhatsApp</p>
                    <p className="text-sm font-bold group-hover:text-white transition-colors">{CONTACT_PHONE}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-[11px] text-slate-600 font-bold uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Web Rádio Figueiró. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <span className="text-indigo-500/50">Sente a Música.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
              <span className="hover:text-slate-400 transition-colors cursor-default">Desenvolvido com IA em Portugal</span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
