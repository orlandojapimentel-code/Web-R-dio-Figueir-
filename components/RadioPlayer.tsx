import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Music, Radio as RadioIcon, AlertCircle } from 'lucide-react';
import { STREAM_URL, LOGO_URL } from '../constants';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState({ title: 'Sintonizando...', artist: 'Web Rádio Figueiró' });
  const [imageError, setImageError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setError(null);
      // Forçar o recarregamento do SRC para evitar cache
      const freshUrl = STREAM_URL.includes('?') 
        ? `${STREAM_URL}&cb=${Date.now()}` 
        : `${STREAM_URL}?cb=${Date.now()}`;
      
      audioRef.current.src = freshUrl;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.error("Erro na reprodução:", err);
            setError("Erro ao carregar sinal.");
            setIsPlaying(false);
          });
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
    }
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
  }, [isPlaying, volume]);

  return (
    <div className="player-container relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-slate-950 to-black p-8 md:p-10 shadow-2xl border border-white/10">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <RadioIcon size={160} />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 relative z-10">
        <div className="relative">
          <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-indigo-500/20 flex items-center justify-center p-1.5 transition-all duration-1000 ${isPlaying ? 'shadow-[0_0_50px_rgba(99,102,241,0.3)] scale-105' : 'scale-100'}`}>
             <div className={`w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden relative border border-white/10 ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}>
                {!imageError ? (
                  <img 
                    src={LOGO_URL} 
                    alt="Logo Web Rádio Figueiró" 
                    className="w-full h-full object-contain p-2" 
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white">
                    <RadioIcon size={48} />
                  </div>
                )}
                
                <div className={`absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-all ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                    <button 
                        onClick={togglePlay}
                        className="text-white p-4 rounded-full bg-indigo-600/40 backdrop-blur-md border border-white/20 transition-transform active:scale-95 z-20"
                    >
                        {isPlaying ? <Pause size={48} /> : <Play size={48} fill="currentColor" className="ml-1" />}
                    </button>
                </div>
             </div>
          </div>
          
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 bg-indigo-400/60 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-1 opacity-20'}`}
                style={{ 
                  animationDelay: `${i * 0.05}s`,
                  height: isPlaying ? `${Math.random() * 24 + 4}px` : '4px'
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                {isPlaying ? 'No Ar Agora' : 'Em Espera'}
              </span>
            </div>
            
            {error ? (
              <div className="flex items-center justify-center md:justify-start gap-2 text-red-400 py-2">
                <AlertCircle size={16} />
                <span className="text-xs font-bold uppercase">{error}</span>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-outfit font-bold truncate leading-tight pt-2">
                    {metadata.title}
                </h2>
                <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
                  <Music size={16} className="text-indigo-500" /> {metadata.artist}
                </p>
              </>
            )}
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            <Volume2 size={20} className="text-slate-500" />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-full max-w-[140px] h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setError("Falha no streaming.");
          setIsPlaying(false);
        }}
      />
    </div>
  );
};

export default RadioPlayer;