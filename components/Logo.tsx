
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dimensions = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-24 w-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-5xl'
  };

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className={`${dimensions[size]} relative flex items-center justify-center`}>
        {/* Stylized Globe/Wave SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" className="animate-[spin_20s_linear_infinite]" />
          <path d="M20 50 Q35 30 50 50 T80 50" fill="none" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M25 60 Q40 40 55 60 T85 60" fill="none" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <circle cx="50" cy="50" r="15" fill="url(#logoGrad)" className="animate-pulse" />
        </svg>
      </div>
      <span className={`${textSizes[size]} font-bold tracking-tighter transition-all duration-300 group-hover:tracking-widest`}>
        MANA<span className="text-emerald-400">TURY</span>
      </span>
    </div>
  );
};

export default Logo;
