
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  Search as SearchIcon, Star, X, Globe, ExternalLink, 
  Sparkles, ArrowRight, Loader2, Play, Film,
  MapPin, Compass, BookOpen, Anchor, Mountain, Waves, Landmark as CaveIcon, Zap
} from 'lucide-react';
import { TravelDestination } from '../types';

const MOCK_DESTINATIONS: TravelDestination[] = [
  {
    id: 'col-cocuy',
    name: 'Sierra Nevada del Cocuy',
    country: 'Colombia',
    description: 'El corazón de los Andes. Glaciares eternos, lagunas de cristal y picos que desafían el cielo. Una experiencia de alta montaña mística.',
    imageUrl: 'https://images.unsplash.com/photo-1589148332120-0402e3b39221?auto=format&fit=crop&q=80&w=1200',
    rating: 5.0,
    sustainabilityScore: 99,
    priceLevel: '€€€'
  },
  {
    id: 'col-esplendor',
    name: 'Cueva del Esplendor',
    country: 'Colombia (Jardín)',
    description: 'Donde la roca se abre para dejar pasar la luz y una cascada subterránea. Un portal natural tallado por el agua durante milenios.',
    imageUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    sustainabilityScore: 95,
    priceLevel: '€€'
  },
  {
    id: 'col-cristales',
    name: 'Caño Cristales',
    country: 'Colombia (Meta)',
    description: 'El río que escapó del paraíso. Cascadas de terciopelo rojo y piscinas circulares de colores imposibles en el corazón de la Serranía.',
    imageUrl: 'https://images.unsplash.com/photo-1596438459194-f275f413d6ff?auto=format&fit=crop&q=80&w=1200',
    rating: 5.0,
    sustainabilityScore: 100,
    priceLevel: '€€€'
  },
  {
    id: 'col-guacharos',
    name: 'Cueva de los Guácharos',
    country: 'Colombia (Huila)',
    description: 'Laberintos milenarios habitados por aves nocturnas. Montañas que esconden catedrales de roca y sonidos ancestrales.',
    imageUrl: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    sustainabilityScore: 97,
    priceLevel: '€€'
  },
  {
    id: 'col-tequendama',
    name: 'Salto del Tequendama',
    country: 'Colombia (Cundinamarca)',
    description: 'Una caída de agua legendaria envuelta en neblina y mitos Muiscas. El poder de la naturaleza manifestado en un abismo sagrado.',
    imageUrl: 'https://images.unsplash.com/photo-1433086566045-f704bc34623f?auto=format&fit=crop&q=80&w=1200',
    rating: 4.7,
    sustainabilityScore: 85,
    priceLevel: '€'
  }
];

const VeoSimulationModal: React.FC<{ dest: TravelDestination; onClose: () => void }> = ({ dest, onClose }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating' | 'ready'>('idle');
  const [loadingMsg, setLoadingMsg] = useState('Sincronizando con el Núcleo...');

  const handleGenerate = async () => {
    try {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) await (window as any).aistudio.openSelectKey();
      setStatus('generating');
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic drone shot of ${dest.name}, Colombia. Majestic natural landscapes, 4k, travel documentary style, mystical lighting.`,
        config: { numberOfVideos: 1, resolution: '1080p', aspectRatio: '16:9' }
      });

      while (!operation.done) {
        await new Promise(r => setTimeout(r, 8000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setVideoUrl(URL.createObjectURL(blob));
      setStatus('ready');
    } catch (e) {
      console.error(e);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[400] bg-black/95 flex items-center justify-center p-6 backdrop-blur-3xl animate-in fade-in duration-500">
      <div className="glass max-w-5xl w-full rounded-[4rem] border-emerald-500/20 overflow-hidden relative">
        <button onClick={onClose} className="absolute top-8 right-8 p-4 glass rounded-full z-50 hover:bg-white/10"><X /></button>
        <div className="p-16">
          {status === 'idle' ? (
            <div className="text-center">
              <div className="p-10 bg-emerald-500/10 rounded-full mb-10 w-fit mx-auto border border-emerald-500/20"><Film size={72} className="text-emerald-400" /></div>
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">Realidad Veo: {dest.name}</h2>
              <p className="text-slate-400 mb-12 text-xl max-w-xl mx-auto">Materializando una ventana temporal hacia el destino sagrado.</p>
              <button onClick={handleGenerate} className="px-20 py-8 bg-emerald-600 rounded-[3rem] font-black text-white uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-3xl">Invocar Visión</button>
            </div>
          ) : status === 'generating' ? (
            <div className="flex flex-col items-center justify-center py-40 gap-10">
              <Loader2 size={100} className="text-emerald-500 animate-spin" strokeWidth={1} />
              <p className="text-2xl font-black text-emerald-400 uppercase tracking-widest animate-pulse">Destilando la magia de Colombia...</p>
            </div>
          ) : (
            <div className="animate-in zoom-in duration-1000">
              <video src={videoUrl || ''} autoPlay loop controls className="w-full aspect-video rounded-[3rem] object-cover shadow-2xl" />
              <div className="mt-12 text-center">
                <h3 className="text-4xl font-black uppercase tracking-tighter">{dest.name}</h3>
                <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] mt-2">Simulación de Grado Estelar v3.1</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [groundingInfo, setGroundingInfo] = useState<{text: string, sources: any[], maps: any[]} | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeVeo, setActiveVeo] = useState<TravelDestination | null>(null);

  const handleGroundingSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Explora mágicamente ${query}, Colombia. Enfócate en su naturaleza salvaje: cascadas, montañas y cuevas. Sé poético.`,
        config: { tools: [{ googleSearch: {} }, { googleMaps: {} }] },
      });
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setGroundingInfo({
        text: response.text || '',
        sources: chunks.map((c: any) => c.web).filter(Boolean),
        maps: chunks.map((c: any) => c.maps).filter(Boolean)
      });
    } catch (e) { console.error(e); }
    finally { setIsSearching(false); }
  };

  return (
    <div className="max-w-7xl mx-auto pt-32 pb-40 px-6">
      {activeVeo && <VeoSimulationModal dest={activeVeo} onClose={() => setActiveVeo(null)} />}
      
      <div className="mb-32 text-center">
        <div className="inline-flex items-center gap-4 px-8 py-3 glass rounded-full border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-[0.5em] mb-12 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
          <Sparkles size={16} /> Frecuencia de Magia: Infinita
        </div>
        <h1 className="text-7xl sm:text-[10rem] font-black mb-8 tracking-tighter uppercase leading-none">
          Mágica <span className="gradient-text">Colombia</span>
        </h1>
        <p className="text-slate-400 text-2xl sm:text-3xl max-w-4xl mx-auto font-medium opacity-70">
          Cascadas que susurran, montañas que respiran y cavernas que guardan el eco de los dioses.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-40 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-[5rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative glass rounded-[5rem] p-6 border-white/10 flex items-center gap-6">
           <SearchIcon className="text-emerald-400 ml-6" size={40} />
           <input 
              type="text"
              placeholder="Busca un tesoro escondido..."
              className="flex-1 bg-transparent py-8 text-3xl focus:outline-none font-black text-white placeholder:text-slate-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGroundingSearch()}
           />
           <button 
              onClick={handleGroundingSearch}
              disabled={isSearching}
              className="px-12 py-8 bg-emerald-600 rounded-[3.5rem] font-black text-white uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all flex items-center gap-4 shadow-2xl"
           >
             {isSearching ? <Loader2 className="animate-spin" /> : <Sparkles />}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {MOCK_DESTINATIONS.map((dest) => (
          <div key={dest.id} className="glass rounded-[4rem] overflow-hidden border-white/5 group hover:border-emerald-500/40 transition-all duration-700 hover:-translate-y-4 shadow-2xl">
            <div className="h-[25rem] relative overflow-hidden">
              <img src={dest.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-6 left-6 flex gap-2">
                 {dest.id.includes('cueva') && <div className="p-3 glass rounded-full border-amber-500/30 text-amber-400"><CaveIcon size={20} /></div>}
                 {dest.id.includes('cocuy') && <div className="p-3 glass rounded-full border-blue-500/30 text-blue-400"><Mountain size={20} /></div>}
                 {dest.id.includes('cristales') && <div className="p-3 glass rounded-full border-emerald-500/30 text-emerald-400"><Waves size={20} /></div>}
              </div>
              <button 
                onClick={() => setActiveVeo(dest)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md"
              >
                <div className="p-8 bg-white text-black rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform"><Play fill="black" /></div>
              </button>
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{dest.name}</h3>
              <p className="text-slate-400 text-lg leading-relaxed line-clamp-3 mb-8">{dest.description}</p>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-amber-400"><Star size={20} fill="currentColor" /><span className="font-black">{dest.rating}</span></div>
                <div className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em]">Magia Certificada</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
