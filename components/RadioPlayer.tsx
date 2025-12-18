
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Music, Radio } from 'lucide-react';
import { STREAM_URL } from '../constants';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [metadata, setMetadata] = useState({ title: 'Sintonizando...', artist: 'Web Rádio Figueiró' });
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

  // Simulated Metadata Fetching (since direct CORS metadata extraction is complex without a proxy)
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real scenario, we'd fetch from a JSON stats endpoint if available.
      // For now, we simulate "Now Playing" updates.
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

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-8 shadow-2xl border border-white/10">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Radio size={120} />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Animated Visualizer Circle */}
        <div className="relative group">
          <div className={`w-40 h-40 rounded-full border-4 border-indigo-500/30 flex items-center justify-center p-2 transition-all duration-700 ${isPlaying ? 'rotate-180 scale-110 shadow-[0_0_50px_rgba(99,102,241,0.3)]' : ''}`}>
             <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden relative">
                <img 
                   src="https://picsum.photos/seed/radio/400/400" 
                   alt="Album Art" 
                   className={`w-full h-full object-cover opacity-60 transition-transform duration-1000 ${isPlaying ? 'scale-125' : 'scale-100'}`}
                />
                <button 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all text-white"
                >
                  {isPlaying ? <Pause size={48} className="drop-shadow-lg" /> : <Play size={48} fill="currentColor" className="ml-2 drop-shadow-lg" />}
                </button>
             </div>
          </div>
          
          {/* Animated Bars */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-12">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 bg-indigo-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-2 opacity-30'}`}
                style={{ 
                  animationDelay: `${i * 0.15}s`,
                  height: isPlaying ? `${Math.random() * 40 + 10}px` : '4px'
                }}
              />
            ))}
          </div>
        </div>

        {/* Metadata & Controls */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-400/10 border border-indigo-400/20">
              {isPlaying ? 'A Emitir Agora' : 'Sintonizada'}
            </span>
            <h2 className="text-3xl font-outfit font-bold mt-2 truncate max-w-xs md:max-w-md">{metadata.title}</h2>
            <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
              <Music size={16} /> {metadata.artist}
            </p>
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
              className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
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
