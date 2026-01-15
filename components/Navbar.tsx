
import React from 'react';
import { Search, Heart, Users, Sparkles, Briefcase, LogIn, Landmark } from 'lucide-react';
import { AppSection } from '../types';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: AppSection.SEARCH, icon: Search, label: 'Descubre' },
    { id: AppSection.FAVORITES, icon: Heart, label: 'Atlas' },
    { id: AppSection.STAR_BANK, icon: Landmark, label: 'Star Bank' },
    { id: AppSection.AI_ASSISTANT, icon: Sparkles, label: 'Copiloto' },
    { id: AppSection.BUSINESS, icon: Briefcase, label: 'Negocios' },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-8 py-5 glass rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10 flex items-center gap-4 sm:gap-10 backdrop-blur-3xl">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`flex flex-col items-center group relative p-3 transition-all duration-500 ${
            activeSection === item.id ? 'text-emerald-400 scale-110' : 'text-slate-500 hover:text-white'
          }`}
        >
          <item.icon size={26} className="transition-transform group-hover:-translate-y-1" />
          <span className="text-[9px] mt-1.5 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
            {item.label}
          </span>
          {activeSection === item.id && (
            <div className="absolute -bottom-1 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981] animate-pulse" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
