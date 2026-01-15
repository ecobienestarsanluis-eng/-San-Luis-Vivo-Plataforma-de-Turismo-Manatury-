
import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, UserPlus, Zap } from 'lucide-react';
import { CommunityPost } from '../types';

const MOCK_POSTS: CommunityPost[] = [
  {
    id: '1',
    author: 'Elena Viajera',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    content: 'Acabo de descubrir este rincón escondido en los Alpes. La IA de Manatury me lo recomendó por mi amor a la fotografía de amaneceres. 🏔️✨',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    likes: 1240,
    comments: 89,
    tags: ['Adventure', 'Nature', 'Photography']
  },
  {
    id: '2',
    author: 'Marco Polo 2.0',
    avatar: 'https://i.pravatar.cc/150?u=marco',
    content: '¿Alguien para un trekking por Nepal en Octubre? Busco compañero de viaje con nivel intermedio. El algoritmo dice que conectamos bien! 🤝',
    likes: 450,
    comments: 120,
    tags: ['Nepal', 'Trekking', 'Co-Traveling']
  }
];

const Community: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pt-24 pb-32 px-6">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold">Comunidad Global</h2>
        <div className="flex gap-4">
          <button className="px-6 py-2 glass border-white/10 rounded-full text-sm font-medium hover:bg-white/5 transition-all">Trending</button>
          <button className="px-6 py-2 bg-emerald-600 rounded-full text-sm font-medium hover:bg-emerald-500 transition-all">Nueva Publicación</button>
        </div>
      </div>

      <div className="space-y-8">
        {MOCK_POSTS.map(post => (
          <div key={post.id} className="glass rounded-[2rem] border-white/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img src={post.avatar} className="w-12 h-12 rounded-full border-2 border-emerald-500/30" />
                  <div>
                    <h4 className="font-bold text-lg">{post.author}</h4>
                    <p className="text-xs text-slate-400">Hace 2 horas • <span className="text-emerald-400">Verified Explorer</span></p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><MoreHorizontal /></button>
              </div>

              <p className="text-slate-200 mb-6 leading-relaxed">{post.content}</p>

              {post.imageUrl && (
                <div className="rounded-2xl overflow-hidden mb-6">
                  <img src={post.imageUrl} className="w-full object-cover max-h-[500px]" />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-slate-400">#{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 hover:text-rose-500 transition-colors">
                    <Heart size={20} /> <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
                    <MessageCircle size={20} /> <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
                <button className="flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20">
                  <UserPlus size={16} /> Conectar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* AI Matchmaking Sidebar / Overlay (Simulated) */}
      <div className="fixed right-8 top-32 w-72 glass rounded-3xl p-6 border-white/10 hidden xl:block">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap size={18} className="text-emerald-400" /> Matchmaking IA
        </h3>
        <p className="text-xs text-slate-400 mb-6">Exploradores que coinciden con tus gustos y próximos viajes.</p>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer">
              <img src={`https://i.pravatar.cc/150?u=match${i}`} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-bold">Viajero {i}</p>
                <p className="text-[10px] text-emerald-400">98% Compatibilidad</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
