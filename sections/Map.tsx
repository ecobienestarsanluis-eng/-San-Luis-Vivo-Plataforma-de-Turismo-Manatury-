
import React from 'react';
import { MapPin, Globe, Compass, Bookmark, Share2, Layers } from 'lucide-react';

const FavoritesMap: React.FC = () => {
  return (
    <div className="h-screen w-full relative pt-20">
      {/* Simulation of a 3D Interactive Map */}
      <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2074" 
          alt="Satellite Map" 
          className="w-full h-full object-cover opacity-30 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        {/* Animated Pins */}
        <div className="absolute top-1/3 left-1/4 animate-bounce">
          <MapPin size={40} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" fill="currentColor" />
        </div>
        <div className="absolute top-1/2 left-2/3 animate-bounce delay-75">
          <MapPin size={40} className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" fill="currentColor" />
        </div>
        <div className="absolute bottom-1/4 left-1/2 animate-bounce delay-150">
          <MapPin size={40} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" fill="currentColor" />
        </div>
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col pointer-events-none">
        <div className="flex justify-between items-start pointer-events-auto">
          <div className="glass p-6 rounded-[2rem] border-white/10 max-w-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Compass className="text-emerald-400" /> Mi Atlas 2025
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg overflow-hidden"><img src="https://picsum.photos/100/100?random=1" className="w-full h-full object-cover" /></div>
                <div><h4 className="font-medium text-sm">Aventura en Islandia</h4><p className="text-xs text-slate-400">Próximo: Mayo 2025</p></div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg overflow-hidden"><img src="https://picsum.photos/100/100?random=2" className="w-full h-full object-cover" /></div>
                <div><h4 className="font-medium text-sm">Gastro-Tour Tokio</h4><p className="text-xs text-slate-400">8 lugares guardados</p></div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-emerald-600 rounded-xl text-sm font-bold">Planear Nueva Ruta con IA</button>
          </div>

          <div className="flex flex-col gap-3 pointer-events-auto">
            {[Layers, Globe, Bookmark, Share2].map((Icon, i) => (
              <button key={i} className="p-4 glass rounded-2xl border-white/10 hover:bg-white/10 transition-all">
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pointer-events-auto">
          <div className="glass p-4 rounded-3xl border-white/10 flex items-center gap-6 max-w-fit overflow-x-auto">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/20 whitespace-nowrap">
               <Globe size={16} /> <span>Vista Realidad Aumentada</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-400 rounded-xl border border-white/5 whitespace-nowrap hover:bg-white/10 cursor-pointer">
               <Compass size={16} /> <span>Cerca de Mí</span>
             </div>
             <div className="h-6 w-[1px] bg-white/10" />
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-8 h-8 rounded-full border-2 border-slate-900" />)}
               <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold border-2 border-slate-900">+3</div>
             </div>
             <p className="text-xs text-slate-400 italic">Planificando en tiempo real con amigos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesMap;
