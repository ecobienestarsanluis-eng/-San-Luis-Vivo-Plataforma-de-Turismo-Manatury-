
import React, { useState, useEffect, useRef } from 'react';
import { AppSection } from './types';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import Login from './sections/Login';
import Search from './sections/Search';
import FavoritesMap from './sections/Map';
import Community from './sections/Community';
import AIAssistant from './sections/AIAssistant';
import BusinessHub from './sections/BusinessHub';
import StarBank from './sections/StarBank';
import { Bell, Heart, Star, Zap } from 'lucide-react';

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: {x: number, y: number, z: number, size: number, color: string}[] = [];
    const count = 3000;
    const speed = 4;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for(let i=0; i<count; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width/2,
          y: Math.random() * canvas.height - canvas.height/2,
          z: Math.random() * canvas.width,
          size: Math.random() * 2.5,
          color: Math.random() > 0.85 ? '#34d399' : '#ffffff'
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);

      for(let star of stars) {
        star.z -= speed;
        if(star.z <= 0) star.z = canvas.width;

        const x = (star.x / star.z) * canvas.width;
        const y = (star.y / star.z) * canvas.height;
        const s = (1 - star.z / canvas.width) * star.size * 3;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = 1 - star.z / canvas.width;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);
    
    const handleMouse = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (e.clientX - centerX) / 40;
      const moveY = (e.clientY - centerY) / 40;
      stars.forEach(s => {
        s.x += moveX * 0.15;
        s.y += moveY * 0.15;
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-1]" aria-hidden="true" />;
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [starCount, setStarCount] = useState("10^600");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveSection(AppSection.SEARCH);
  };

  const renderSection = () => {
    if (!isLoggedIn && activeSection !== AppSection.LOGIN) {
      setActiveSection(AppSection.LOGIN);
    }

    switch (activeSection) {
      case AppSection.LOGIN: return <Login onLogin={handleLogin} />;
      case AppSection.SEARCH: return <Search />;
      case AppSection.FAVORITES: return <FavoritesMap />;
      case AppSection.COMMUNITY: return <Community />;
      case AppSection.AI_ASSISTANT: return <AIAssistant />;
      case AppSection.BUSINESS: return <BusinessHub />;
      case AppSection.STAR_BANK: return <StarBank />;
      default: return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden text-slate-100 bg-[#020617] selection:bg-emerald-500/30">
      <Starfield />
      
      {activeSection !== AppSection.LOGIN && (
        <header className="fixed top-0 left-0 right-0 z-[100] px-10 sm:px-20 py-10 sm:py-12 glass border-b border-white/5 flex items-center justify-between backdrop-blur-3xl bg-black/20">
          <Logo size="md" />
          
          <div className="flex items-center gap-8 sm:gap-16">
             <div 
               onClick={() => setActiveSection(AppSection.STAR_BANK)}
               className="hidden xl:flex items-center gap-14 px-14 py-6 bg-white/5 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl relative group overflow-hidden cursor-pointer hover:border-amber-500/30 transition-all"
             >
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="flex items-center gap-5 relative z-10">
                 <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_#10b981]" />
                 <span className="text-[11px] font-black uppercase tracking-[0.6em] text-emerald-400">Omega Link</span>
               </div>
               <div className="h-10 w-[1px] bg-white/10 relative z-10" />
               <div className="flex items-center gap-6 relative z-10 group/stars">
                 <Star size={24} className="text-amber-400 fill-current animate-[spin_6s_linear_infinite]" />
                 <span className="text-[11px] font-black uppercase tracking-[0.6em] text-amber-400 group-hover/stars:scale-110 transition-transform">Estrellas: {starCount}</span>
                 <Zap size={14} className="text-amber-400 animate-pulse" />
               </div>
             </div>

             <div className="flex items-center gap-8">
               <button className="p-5 glass border-white/10 rounded-2xl relative hover:bg-emerald-500/10 transition-all group shadow-2xl active:scale-95" aria-label="Notificaciones">
                 <Bell size={32} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
                 <span className="absolute top-5 right-5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#020617] shadow-[0_0_10px_#10b981]" />
               </button>
               <div className="relative group cursor-pointer" onClick={() => setActiveSection(AppSection.AI_ASSISTANT)} role="button">
                  <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-[2.5rem] blur-md opacity-30 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
                  <img 
                    src="https://i.pravatar.cc/150?u=admin" 
                    className="relative w-16 h-16 rounded-[2.2rem] border-2 border-white/20 object-cover shadow-3xl hover:border-emerald-400 transition-colors"
                    alt="Avatar"
                  />
               </div>
             </div>
          </div>
        </header>
      )}

      <main className="relative z-0">
        {renderSection()}
      </main>

      {isLoggedIn && (
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      )}
    </div>
  );
};

export default App;
