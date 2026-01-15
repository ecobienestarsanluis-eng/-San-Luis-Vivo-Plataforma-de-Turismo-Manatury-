
import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Activity, Globe2, Server, ShieldCheck, Zap, Network, Cloud, Rocket, 
  Cpu, Database, ArrowUpRight, CheckCircle2, Loader2, HardDrive, Clock,
  Terminal, Share2, Info, Cpu as CpuIcon
} from 'lucide-react';
import { ProcessStatus } from '../types';

const PROCESSES: ProcessStatus[] = [
  { tag: 'ID-SEC', label: 'Biometría/Ledger', status: 'active', load: 34, color: 'text-blue-400' },
  { tag: 'OPS-WORK', label: 'Operaciones Globales', status: 'active', load: 45, color: 'text-emerald-400' },
  { tag: 'AI-STRAT', label: 'Concierge Central', status: 'syncing', load: 78, color: 'text-purple-400' },
  { tag: 'ECO-DATA', label: 'Ecosistema Real-time', status: 'active', load: 22, color: 'text-amber-400' },
  { tag: 'EXP-VIS', label: 'Visualización XR', status: 'standby', load: 5, color: 'text-cyan-400' },
];

const BusinessHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'deployment' | 'system'>('analytics');
  const [deploying, setDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(["[SISTEMA] Núcleo OMEGA inicializado.", "[INFO] Conexión establecida con Google Cloud Singularity."]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-20), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const startDeployment = () => {
    if (deploying) return;
    setDeploying(true);
    setDeployProgress(0);
    addLog("INICIANDO DESPLIEGUE EN MOTOR CLOUD OMEGA...");
    
    const steps = [
      "Verificando cuotas de Google Cloud Quota...",
      "Compilando Micro-frontends con motor Turbo...",
      "Inyectando certificados SSL Cuánticos...",
      "Desplegando Contenedores en Cloud Run (southamerica-east1)...",
      "Sincronizando Secret Manager con llaves RSA-4096...",
      "Propagando a través de la Red Global de Google...",
      "¡SISTEMA EN LÍNEA A ESCALA GALÁCTICA!"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setDeployProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDeploying(false);
          return 100;
        }
        if (prev % 15 === 0 && currentStep < steps.length) {
          addLog(steps[currentStep]);
          currentStep++;
        }
        return prev + 1;
      });
    }, 40);
  };

  const chartData = [
    { name: '00h', traffic: 400, transactions: 240 },
    { name: '04h', traffic: 300, transactions: 139 },
    { name: '08h', traffic: 200, transactions: 980 },
    { name: '12h', traffic: 800, transactions: 390 },
    { name: '16h', traffic: 189, transactions: 480 },
    { name: '20h', traffic: 930, transactions: 380 },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-28 pb-40 px-6 animate-in fade-in duration-1000">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-emerald-500/10 rounded-2xl"><Globe2 size={24} className="text-emerald-400" /></div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Omega Cloud Node: southamerica-east1 [ESTABLE]</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter">Global <span className="gradient-text">Console</span></h2>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="glass px-8 py-5 rounded-[2rem] border-white/5 text-right hidden sm:block">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Carga del Motor</p>
            <p className="text-2xl font-black text-blue-400">0.0001%</p>
          </div>
          <button onClick={startDeployment} className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 rounded-3xl font-black text-xs uppercase tracking-[0.3em] text-white transition-all shadow-2xl shadow-emerald-600/30 active:scale-95 flex items-center gap-4">
            <Rocket size={20} /> {deploying ? 'Deploying...' : 'Subir al Motor Cloud'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { id: 'analytics', label: 'Telemetría', icon: Activity },
              { id: 'deployment', label: 'Cloud Nexus', icon: Cloud },
              { id: 'system', label: 'Seguridad', icon: ShieldCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  activeTab === tab.id ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-600/20' : 'glass text-slate-500 hover:text-white border-white/5'
                }`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="glass p-12 rounded-[4rem] border-white/5 h-[600px] relative overflow-hidden flex flex-col backdrop-blur-3xl bg-white/[0.01]">
            {activeTab === 'analytics' && (
              <div className="h-full flex flex-col animate-in fade-in duration-700">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="font-black text-2xl tracking-tighter flex items-center gap-4">
                    <Network size={28} className="text-emerald-400" /> Flujo de Datos Estelares
                  </h3>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" /> <span className="text-[10px] font-black text-slate-500 uppercase">Exploradores</span></div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" /> <span className="text-[10px] font-black text-slate-500 uppercase">Simulaciones</span></div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTrans" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #ffffff10', borderRadius: '24px', fontWeight: 'bold' }} />
                      <Area type="monotone" dataKey="traffic" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorTraffic)" />
                      <Area type="monotone" dataKey="transactions" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorTrans)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'deployment' && (
              <div className="h-full flex flex-col space-y-10 animate-in slide-in-from-bottom-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-2xl tracking-tighter flex items-center gap-4">
                    <Cloud size={28} className="text-blue-400" /> Estatus Cloud Run
                  </h3>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Sincronización</p>
                    <p className="text-3xl font-black text-emerald-400">{deployProgress}%</p>
                  </div>
                </div>

                <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.4)]" 
                    style={{ width: `${deployProgress}%` }} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto pr-4 scrollbar-hide">
                  {[
                    { l: "Build Engine", p: 20 },
                    { l: "Security Layer", p: 40 },
                    { l: "Artifact Reg", p: 60 },
                    { l: "Cloud Run", p: 80 },
                    { l: "Global CDN", p: 100 }
                  ].map((step, i) => (
                    <div key={i} className={`p-8 rounded-[2.5rem] border transition-all flex items-center justify-between ${deployProgress >= step.p ? 'bg-emerald-500/10 border-emerald-500/30' : deploying && deployProgress > step.p - 20 ? 'bg-white/5 border-blue-500 animate-pulse' : 'bg-white/[0.02] border-white/5 opacity-50'}`}>
                      <div className="flex items-center gap-5">
                        {deployProgress >= step.p ? <CheckCircle2 size={28} className="text-emerald-400" /> : <Clock size={28} className="text-slate-700" />}
                        <span className="text-sm font-black uppercase tracking-widest">{step.l}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95">
                <div className="p-12 bg-emerald-500/5 rounded-[4rem] border border-emerald-500/20 mb-10 relative">
                  <ShieldCheck size={100} className="text-emerald-400" />
                  <div className="absolute -inset-4 border-2 border-emerald-500/20 rounded-[4.5rem] animate-[ping_4s_infinite]" />
                </div>
                <h3 className="text-4xl font-black uppercase mb-6 tracking-[0.2em]">Sentinel OMEGA</h3>
                <p className="text-slate-400 max-w-md font-medium text-lg leading-relaxed">Protección de grado estelar activa. Todas las transacciones de $10^{600}$ estrellas están cifradas en el Ledger Cuántico.</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="glass p-10 rounded-[4rem] border-white/10 flex-1 flex flex-col bg-[#050b1a] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
               <CpuIcon size={80} className="text-emerald-400" />
             </div>
             <div className="flex items-center gap-4 mb-8">
                <Terminal size={24} className="text-emerald-400" />
                <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-500">Omega Kernel Logs</h3>
             </div>
             <div className="flex-1 bg-black/40 rounded-[2.5rem] p-8 font-mono text-[11px] text-emerald-400/90 overflow-y-auto space-y-4 shadow-inner border border-white/5">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="opacity-20 select-none">[{i.toString().padStart(2, '0')}]</span>
                    <span className="leading-relaxed">{log}</span>
                  </div>
                ))}
                <div ref={logEndRef} />
             </div>
          </div>

          <div className="glass p-10 rounded-[4rem] border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all">
            <h3 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 flex items-center gap-3 text-emerald-400">
              <Zap size={20} /> Cloud Intelligence
            </h3>
            <div className="space-y-8">
               <div>
                  <div className="flex justify-between text-[11px] font-black uppercase text-slate-500 mb-3">
                    <span>Eficiencia Energética</span>
                    <span className="text-emerald-400">100.00%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full shadow-[0_0_15px_#10b981]" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Latencia Global</p>
                    <p className="text-xl font-black text-blue-400">0.01ms</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Nodos Activos</p>
                    <p className="text-xl font-black text-purple-400">2,048</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHub;
