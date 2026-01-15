
import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { 
  Fingerprint, Eye, EyeOff, ShieldCheck, Key, Lock, 
  ArrowRight, Smartphone, Mail, Scan, CheckCircle2,
  Chrome, Apple, Github, Twitter
} from 'lucide-react';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authStep, setAuthStep] = useState<'initial' | 'scanning' | 'recovery' | 'success'>('initial');
  const [recoveryMethod, setRecoveryMethod] = useState<'face' | 'token' | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep('success');
      setTimeout(onLogin, 1000);
    }, 1800);
  };

  const startPasskeyFlow = () => {
    setAuthStep('scanning');
    // Simular escaneo biométrico complejo
    setTimeout(() => {
      setAuthStep('success');
      setTimeout(onLogin, 1000);
    }, 3000);
  };

  if (authStep === 'scanning') {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent animate-pulse" />
        <div className="relative z-10 glass p-12 rounded-[3.5rem] border-emerald-500/30 text-center max-w-sm w-full shadow-[0_0_80px_rgba(16,185,129,0.15)]">
          <div className="relative mb-10">
            {/* Biometric Scan Animation */}
            <div className="w-32 h-32 mx-auto rounded-full border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-emerald-500/5 animate-[ping_3s_infinite]" />
               <div className="absolute inset-2 border border-emerald-500/40 rounded-full animate-[spin_4s_linear_infinite] border-t-transparent" />
               <Fingerprint className="text-emerald-400 relative z-10 animate-pulse" size={56} />
            </div>
            {/* Laser Line Simulation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-emerald-400/40 blur-sm animate-[bounce_2s_infinite]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Escaneo Biométrico</h3>
          <p className="text-emerald-400/70 text-sm font-medium animate-pulse">Analizando puntos de identidad...</p>
          <div className="mt-8 flex justify-center gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (authStep === 'success') {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="text-emerald-400 mx-auto mb-6" size={80} />
          <h2 className="text-3xl font-bold text-white">Identidad Verificada</h2>
          <p className="text-slate-400 mt-2">Bienvenido de nuevo, explorador.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background with higher quality blur and parallax feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-slate-950 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070" 
          alt="Destination" 
          className="w-full h-full object-cover scale-110"
        />
      </div>

      <div className="relative z-20 w-full max-w-md glass p-10 rounded-[3rem] border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col items-center mb-10 text-center">
          <Logo size="lg" />
          <h2 className="text-3xl font-bold mt-8 text-white tracking-tight">MANATURY <span className="text-emerald-400 font-light">2025</span></h2>
          <p className="text-slate-400 text-sm mt-2 max-w-[250px]">Acceso seguro a tu ecosistema global de viajes</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {/* Futuristic Login Method Selector */}
          <button 
            type="button"
            onClick={startPasskeyFlow}
            className="w-full py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-3 transition-all group active:scale-[0.98] relative overflow-hidden shadow-lg shadow-emerald-500/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Key className="text-emerald-400 group-hover:rotate-12 transition-transform" size={20} />
            <span className="font-bold text-emerald-400">Acceso Passkey</span>
          </button>

          <div className="relative py-2 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">o credenciales</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="space-y-4">
            <div className="group">
              <input 
                type="email" 
                required
                placeholder="Identificador o Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white/[0.07] transition-all text-sm group-hover:border-white/20"
              />
            </div>

            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="Contraseña Maestra"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white/[0.07] transition-all text-sm group-hover:border-white/20"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center px-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border border-white/20 bg-white/5 checked:bg-emerald-500 transition-all cursor-pointer" />
                <div className="absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none text-[10px] font-bold">✓</div>
              </div>
              <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Recordar sesión</span>
            </label>
            <button 
              type="button" 
              onClick={() => setAuthStep('recovery')}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              ¿Olvido de llave?
            </button>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl font-bold text-white shadow-xl shadow-blue-500/10 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.97] disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>Ingresar al Sistema <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <div className="mt-10 grid grid-cols-4 gap-4">
          {[Chrome, Apple, Github, Twitter].map((Icon, idx) => (
            <button key={idx} className="flex items-center justify-center py-4 glass hover:bg-white/10 rounded-2xl border-white/10 transition-all hover:-translate-y-1 active:scale-90 group">
              <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>

        <p className="text-center text-[10px] text-slate-500 mt-10 uppercase tracking-[0.3em] font-bold">
          Encrypted by <ShieldCheck className="inline text-emerald-500 mb-0.5 ml-1" size={12} /> Sentinel v4.0
        </p>
      </div>

      {/* Modern Recovery Modal */}
      {authStep === 'recovery' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass p-10 rounded-[3.5rem] border-white/10 max-w-sm w-full text-center shadow-2xl">
            {!recoveryMethod ? (
              <>
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Scan className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Seguridad Multimodal</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">Elige un método de verificación avanzado para restaurar tu acceso.</p>
                <div className="space-y-4">
                  <button 
                    onClick={() => setRecoveryMethod('face')}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Scan size={18} className="text-emerald-400" /> Verificación Facial
                  </button>
                  <button 
                    onClick={() => setRecoveryMethod('token')}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Smartphone size={18} className="text-blue-400" /> Token Cuántico (SMS)
                  </button>
                  <button onClick={() => setAuthStep('initial')} className="text-xs text-slate-500 hover:text-white transition-colors mt-6 underline underline-offset-4">Cancelar y volver</button>
                </div>
              </>
            ) : (
              <div className="animate-in slide-in-from-bottom duration-500">
                 <div className="w-24 h-24 mx-auto mb-8 relative">
                   <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl animate-pulse" />
                   <div className="absolute inset-0 border-2 border-emerald-500 border-t-transparent rounded-2xl animate-spin" />
                   <div className="flex items-center justify-center h-full">
                     {recoveryMethod === 'face' ? <Scan size={40} className="text-emerald-400" /> : <Mail size={40} className="text-blue-400" />}
                   </div>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Procesando Solicitud</h3>
                 <p className="text-slate-400 text-sm mb-8">Sincronizando con los servidores de Manatury...</p>
                 <button 
                   onClick={() => { setRecoveryMethod(null); setAuthStep('initial'); }}
                   className="w-full py-4 bg-emerald-600 rounded-2xl text-white font-bold active:scale-95 transition-all"
                 >
                   Confirmar
                 </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
