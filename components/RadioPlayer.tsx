
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Music, Radio } from 'lucide-react';
import { STREAM_URL } from '../constants';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [metadata, setMetadata] = useState({ title: 'Sintonizando...', artist: 'Web Rádio Figueiró' });
  const [imageError, setImageError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.load();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const tracks = [
        { title: 'Grandes Êxitos', artist: 'Artistas Nacionais' },
        { title: 'The Best Hits', artist: 'Web Rádio Figueiró' },
        { title: 'Sente a Música', artist: 'Em Directo' }
      ];
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      if (isPlaying) setMetadata(randomTrack);
    }, 15000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const logoUrl = "https://www.webradiofigueiro.pt/favicon.png";

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-10 shadow-2xl border border-white/10">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Radio size={120} />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        <div className="relative group">
          <div className={`w-44 h-44 rounded-full border-4 border-indigo-500/30 flex items-center justify-center p-1 transition-all duration-700 ${isPlaying ? 'rotate-180 scale-110 shadow-[0_0_60px_rgba(99,102,241,0.4)]' : ''}`}>
             <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden relative border border-white/5">
                {!imageError ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo Web Rádio Figueiró" 
                    className={`w-full h-full object-contain transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white">
                    <Radio size={48} />
                  </div>
                )}
                <button 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all text-white group"
                >
                  {isPlaying ? <Pause size={56} className="drop-shadow-xl" /> : <Play size={56} fill="currentColor" className="ml-2 drop-shadow-xl" />}
                </button>
             </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-12">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 bg-indigo-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-2 opacity-20'}`}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  height: isPlaying ? `${Math.random() * 40 + 10}px` : '4px'
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-5">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
              {isPlaying ? 'Em Emissão' : 'Pausado'}
            </span>
            <h2 className="text-3xl font-outfit font-bold mt-4 truncate max-w-xs md:max-w-md leading-tight">{metadata.title}</h2>
            <p className="text-slate-400 font-semibold flex items-center justify-center md:justify-start gap-3 mt-2">
              <Music size={18} className="text-indigo-400" /> {metadata.artist}
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-5 pt-4">
            <Volume2 size={24} className="text-slate-500" />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-full max-w-[150px] h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 shadow-inner"
            />
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={STREAM_URL} 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default RadioPlayer;
