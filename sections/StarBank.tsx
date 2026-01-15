
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Landmark, Star, TrendingUp, Zap, ShieldCheck, ArrowUpRight, 
  Fingerprint, Rocket, CreditCard, Loader2, Sparkles, Heart
} from 'lucide-react';
import { StarPackage, InvestmentNode } from '../types';

const PACKAGES: StarPackage[] = [
  { id: '1', name: 'Micro Nebulosa', amount: '10^10', price: '$4.99', bonus: '+2%', rarity: 'common' },
  { id: '2', name: 'Cúmulo Estelar', amount: '10^50', price: '$19.99', bonus: '+10%', rarity: 'rare' },
  { id: '3', name: 'Supernova Prime', amount: '10^200', price: '$99.99', bonus: '+25%', rarity: 'epic' },
  { id: '4', name: 'Singularidad Omega', amount: '∞', price: '$499.99', bonus: 'Status Divino', rarity: 'legendary' },
];

const StarBank: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMagic, setShowMagic] = useState(false);

  useEffect(() => {
    // Pequeño trigger de magia al entrar
    const timer = setTimeout(() => setShowMagic(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto pt-32 pb-48 px-6 animate-in fade-in duration-1000">
      <div className="relative mb-24 p-16 glass rounded-[5rem] border-amber-500/20 overflow-hidden text-center group">
         {showMagic && (
           <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute animate-pulse text-amber-400/40"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  <Sparkles size={Math.random() * 20 + 10} />
                </div>
              ))}
           </div>
         )}
         <div className="relative z-10">
           <div className="p-6 bg-amber-500/10 rounded-full w-fit mx-auto mb-8 border border-amber-500/30">
             <Heart size={64} className="text-amber-400 animate-bounce" />
           </div>
           <h1 className="text-7xl font-black tracking-tighter uppercase mb-6">Regalo <span className="gradient-text">Galáctico</span></h1>
           <p className="text-3xl text-slate-400 font-medium mb-10">Has inyectado una bendición de $10^{600}$ estrellas al sistema.</p>
           <div className="text-6xl font-black text-amber-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
             Satus: DEIDAD CREADORA
           </div>
         </div>
         <div className="absolute -bottom-20 -right-20 p-20 opacity-5 group-hover:opacity-10 transition-opacity">
           <Zap size={300} className="text-white" />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
           <h3 className="text-2xl font-black uppercase mb-10 tracking-widest flex items-center gap-4">
             <Landmark className="text-amber-400" /> Mercado de Energía
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {PACKAGES.map((pkg) => (
                <button 
                  key={pkg.id}
                  className="p-10 glass border-white/5 rounded-[3rem] hover:border-amber-500/40 transition-all group relative overflow-hidden text-left"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{pkg.rarity}</span>
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-amber-500/20 transition-colors"><Star size={24} className="text-amber-400" /></div>
                  </div>
                  <h4 className="text-3xl font-black uppercase mb-2">{pkg.name}</h4>
                  <p className="text-amber-400 text-xl font-black mb-8">{pkg.amount} Estrellas</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black">{pkg.price}</span>
                    <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </button>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4">
           <div className="glass p-12 rounded-[4rem] border-white/10 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all text-center">
              <Rocket size={64} className="text-emerald-400 mx-auto mb-8 animate-pulse" />
              <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Reinversión Mágica</h3>
              <p className="text-slate-400 mb-10 leading-relaxed">Usa tus estrellas para materializar nuevos destinos en el Atlas de Manatury.</p>
              <button className="w-full py-6 bg-emerald-600 rounded-[2rem] font-black text-white uppercase tracking-[0.4em] shadow-2xl hover:bg-emerald-500 transition-all">Expandir Realidad</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StarBank;
