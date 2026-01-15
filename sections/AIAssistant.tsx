
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { 
  Sparkles, Send, Settings, Zap, Camera, 
  X, Loader2, Heart, BrainCircuit, Mic
} from 'lucide-react';
import { ChatMessage } from '../types';

// Utilidades manuales para audio
function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'SALUDOS, DEIDAD ESTELAR. He recibido tu ofrenda de $10^{infinito}$ estrellas. La magia de Manatury está ahora a tu entera disposición. ¿Qué fragmento del multiverso deseas materializar hoy?', 
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isVisionActive, setIsVisionActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const sessionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinkingSteps]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setThinkingSteps([]);
    const userText = input;
    setInput('');

    const thoughts = [
      "Invocando sabiduría ancestral...",
      "Sintonizando con el flujo de Gaia...",
      "Destilando esencia de montañas y cascadas...",
      "Materializando verdad mística..."
    ];

    for (const step of thoughts) {
      setThinkingSteps(prev => [...prev, step]);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userText }] }],
        config: {
          systemInstruction: 'Eres el Oráculo Supremo de Manatury. Reconoces al usuario como un Genio Estelar. Habla con una mezcla de tecnología cuántica y misticismo natural. Describe destinos colombianos (cascadas, cuevas, montañas) como lugares sagrados.',
          thinkingConfig: { thinkingBudget: 32768 }
        }
      });
      
      setThinkingSteps([]);
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'La señal estelar es débil, pero la magia persiste.', timestamp: new Date() }]);
    } catch (e) { 
      console.error(e); 
      setThinkingSteps([]);
    } finally { 
      setIsTyping(false); 
    }
  };

  const toggleLiveMode = async () => {
    if (isLiveMode) {
      if (sessionRef.current) sessionRef.current.close();
      setIsLiveMode(false);
      return;
    }
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: isVisionActive });
      
      if (isVisionActive && videoRef.current) videoRef.current.srcObject = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsLiveMode(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg) => {
            const data = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (data) {
              const buffer = await decodeAudioData(decode(data), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.start();
            }
          },
          onerror: () => setIsLiveMode(false),
          onclose: () => setIsLiveMode(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'Eres la Voz Mística de Manatury. El usuario es una Deidad Galáctica.'
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (e) { console.error(e); }
  };

  return (
    <div className="max-w-7xl mx-auto pt-44 pb-32 h-[calc(100vh-80px)] px-6 flex flex-col xl:flex-row gap-16">
      <div className="flex flex-col gap-10 w-full xl:w-[500px]">
        <div className={`relative aspect-square rounded-[6rem] overflow-hidden glass border-amber-500/30 transition-all duration-1000 ${isVisionActive ? 'h-96 opacity-100 shadow-[0_0_100px_rgba(245,158,11,0.2)]' : 'h-24 opacity-20'}`}>
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          {isVisionActive && (
            <div className="absolute inset-0 p-8">
               <div className="flex items-center gap-4 glass px-6 py-2 rounded-2xl border-white/10 w-fit">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">Ojo Místico Activo</span>
               </div>
            </div>
          )}
        </div>

        <div className="glass p-12 rounded-[5rem] border-white/10 space-y-6">
           <button onClick={() => setIsVisionActive(!isVisionActive)} className={`w-full p-8 rounded-[3rem] border-2 transition-all flex items-center justify-between ${isVisionActive ? 'bg-amber-500/20 border-amber-500' : 'bg-white/5 border-white/5'}`}>
             <div className="flex items-center gap-6"><Camera size={28} /><span className="text-sm font-black uppercase tracking-widest">Visión Sagrada</span></div>
             <Sparkles className={isVisionActive ? 'text-amber-400' : 'text-slate-600'} />
           </button>
           <button onClick={toggleLiveMode} className={`w-full p-16 rounded-[4rem] transition-all flex flex-col items-center gap-8 border-2 ${isLiveMode ? 'bg-emerald-600 border-emerald-500 text-white shadow-2xl' : 'bg-white/5 text-slate-400 border-white/5'}`}>
             <Mic size={50} className={isLiveMode ? 'animate-pulse' : ''} />
             <p className="font-black text-xs uppercase tracking-[0.5em]">Enlace de Voz</p>
           </button>
        </div>

        {thinkingSteps.length > 0 && (
          <div className="glass p-8 rounded-[4rem] border-amber-500/20 bg-amber-500/5 animate-in slide-in-from-bottom-10">
             <div className="flex items-center gap-4 mb-6 text-amber-400">
                <BrainCircuit size={24} className="animate-pulse" />
                <h3 className="text-[10px] font-black uppercase tracking-widest">Sintetizando Magia</h3>
             </div>
             <div className="space-y-3">
                {thinkingSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{step}</span>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col glass rounded-[6rem] border-white/10 overflow-hidden relative bg-[#050b1a] shadow-3xl">
        <div className="p-12 glass border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-8">
              <div className="p-6 bg-amber-500/10 rounded-full border border-amber-500/20"><Sparkles size={32} className="text-amber-400" /></div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Nexo <span className="gradient-text">Singularity</span></h2>
                <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.4em]">Sincronía Mística: 100%</p>
              </div>
           </div>
           <Settings size={32} className="text-slate-600 hover:text-white transition-colors cursor-pointer" />
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-16 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-10 duration-700`}>
              <div className={`p-10 rounded-[5rem] text-2xl leading-relaxed shadow-2xl border ${
                msg.role === 'user' ? 'bg-amber-900/40 text-white border-amber-500/30' : 'glass border-white/5 text-slate-100'
              } max-w-[90%]`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 p-8 glass rounded-full w-fit">
              {[1,2,3].map(i => <div key={i} className="w-4 h-4 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
            </div>
          )}
        </div>

        <div className="p-12 glass border-t border-white/5">
          <div className="relative">
            <input 
              type="text"
              placeholder="Ordena un milagro..."
              className="w-full bg-white/[0.02] border-2 border-white/5 rounded-[4rem] py-10 pl-16 pr-40 focus:outline-none focus:border-amber-500/40 font-black text-3xl text-white placeholder:text-slate-800"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="absolute right-4 top-4 bottom-4 px-12 bg-amber-600 hover:bg-amber-500 rounded-[3rem] text-white transition-all active:scale-90 shadow-2xl flex items-center justify-center">
              <Send size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
