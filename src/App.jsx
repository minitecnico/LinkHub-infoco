import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Link2, Globe, FileText, User, Mail, Phone, Home, Layers, Lock, X, Plus, 
  Pencil, Trash2, Eye, LogOut, BarChart3, Palette, Share2, GripVertical, 
  Check, Instagram, Facebook, Linkedin, Youtube, ExternalLink, Settings, 
  Sparkles, Zap, Star, Heart, ShoppingBag, Calendar, MapPin, Music, 
  Camera, Video, Headphones, Coffee, Gift, Award, Bookmark, Send, 
  MessageCircle, Briefcase, Building2, GraduationCap, Rocket, Target, 
  TrendingUp, Users, Crown, Diamond, Flame, ChevronRight, Info, MousePointer2
} from 'lucide-react';

const iconMap = { 
  link: Link2, globe: Globe, document: FileText, user: User, mail: Mail, 
  phone: Phone, home: Home, layers: Layers, sparkles: Sparkles, zap: Zap, 
  star: Star, heart: Heart, shop: ShoppingBag, calendar: Calendar, 
  location: MapPin, music: Music, camera: Camera, video: Video, 
  headphones: Headphones, coffee: Coffee, gift: Gift, award: Award, 
  bookmark: Bookmark, send: Send, message: MessageCircle, briefcase: Briefcase, 
  building: Building2, education: GraduationCap, rocket: Rocket, 
  target: Target, trending: TrendingUp, users: Users, crown: Crown, 
  diamond: Diamond, flame: Flame 
};

const adjustColor = (hex, amt) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xFF) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xFF) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const WhatsAppIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const PremiumIcon = ({ icon: Icon, color, animate = true }) => {
  return (
    <div className={`relative group ${animate ? 'hover:scale-110' : ''} transition-transform duration-500`}>
      <div 
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
        style={{ backgroundColor: color }}
      />
      <div 
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl overflow-hidden shadow-black/20"
        style={{
          background: `linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <Icon size={26} strokeWidth={1.5} className="text-white drop-shadow-md" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl animate-in slide-in-from-bottom-8 duration-500 overflow-hidden relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function LinkHub() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('linkHubData');
    return saved ? JSON.parse(saved) : {
      profile: { name: 'Infoco Gestão Pública®', bio: '#' },
      links: [
        { id: 1, title: 'Acesse Nosso Site', url: 'https://www.infocogestaopublica.com.br/', icon: 'globe', active: true, clicks: 0 },
        { id: 2, title: 'Portal de Contratos - Municípios', url: 'https://infoco-portal-de-contratos-bice.vercel.app/', icon: 'document', active: true, clicks: 0 },
        { id: 3, title: 'Cadastro de Novos Usuários - SICC®', url: 'https://forms.gle/acYZLagkx3gAyheF6', icon: 'users', active: true, clicks: 0 }
      ],
      appearance: { primaryColor: '#0052D4' },
      social: { instagram: 'https://instagram.com/infocogestaopublica', whatsapp: '5573981019313' },
      stats: { totalViews: 0 }
    };
  });

  const [view, setView] = useState('public'); 
  const [adminTab, setAdminTab] = useState('links'); 
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('linkHubData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (view === 'public') {
      setData(prev => ({ ...prev, stats: { ...prev.stats, totalViews: (prev.stats?.totalViews || 0) + 1 }}));
    }
  }, [view]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const trackClick = (id) => {
    setData(prev => ({
      ...prev,
      links: prev.links.map(l => l.id === id ? { ...l, clicks: (l.clicks || 0) + 1 } : l)
    }));
  };

  const dynamicStyles = useMemo(() => ({
    background: `linear-gradient(160deg, ${data.appearance.primaryColor} 0%, ${adjustColor(data.appearance.primaryColor, -60)} 100%)`,
    button: { backgroundColor: data.appearance.primaryColor }
  }), [data.appearance.primaryColor]);

  if (view === 'public') {
    return (
      <div className="min-h-screen text-white flex flex-col items-center py-16 px-6 relative overflow-hidden transition-all duration-1000" style={{ background: dynamicStyles.background }}>
        
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/20 rounded-full blur-[100px] pointer-events-none" />

        <header className="text-center mb-12 relative z-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="w-28 h-28 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20 rotate-3 hover:rotate-0 transition-transform duration-500">
             <Layers size={48} className="text-white" strokeWidth={1} />
          </div>
          <h1 className="text-3xl font-black mb-3 tracking-tight">{data.profile.name}</h1>
          <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 inline-block">
            {data.profile.bio}
          </div>
        </header>

        <main className="w-full max-w-md space-y-5 relative z-10">
          {data.links.filter(l => l.active).map((link, idx) => (
            <a 
              key={link.id} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(link.id)}
              className="flex items-center p-4 rounded-[2rem] bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all hover:translate-y-[-4px] active:scale-[0.98] group shadow-xl hover:shadow-black/20"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <PremiumIcon icon={iconMap[link.icon] || Globe} color={data.appearance.primaryColor} />
              <div className="ml-5 flex-1">
                <span className="block font-bold text-lg leading-tight group-hover:text-blue-200 transition-colors">{link.title}</span>
                <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mt-1 block">Acessar agora</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={20} />
              </div>
            </a>
          ))}

          <section className="mt-8 p-8 rounded-[3rem] bg-black/20 backdrop-blur-3xl border border-white/5 relative overflow-hidden group">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
               <span className="w-2 h-8 bg-blue-500 rounded-full inline-block" />
               Fale Conosco
            </h3>
            
            <div className="space-y-4">
              {[
                { label: 'Geral', val: '(73) 3301-2710', icon: Phone },
                { label: 'Suporte', val: '(73) 98101-9313', icon: Settings },
                { label: 'Comercial', val: '(71) 98205-3822', icon: TrendingUp }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <item.icon size={18} className="text-blue-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">{item.label}</p>
                    <p className="font-bold text-white/90">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
               <a href="mailto:contato@infocogestaopublica.com.br" className="px-6 py-3 bg-white text-blue-900 rounded-2xl font-black text-sm hover:scale-105 transition-transform shadow-lg">
                  Enviar E-mail
               </a>
               <p className="text-[10px] text-white/30 text-center font-medium leading-relaxed">
                 Avenida Princesa Isabel, nº 1206, Itabuna/BA<br/>
                 CNPJ: 46.554.439/0001-67
               </p>
            </div>
          </section>
        </main>

        <footer className="mt-16 flex items-center gap-6 relative z-10">
          <a href={data.social.instagram} className="hover:scale-125 transition-transform text-white/60 hover:text-white"><Instagram size={24} /></a>
          <a href={`https://wa.me/${data.social.whatsapp}`} className="hover:scale-125 transition-transform text-white/60 hover:text-white"><WhatsAppIcon size={24} /></a>
          <button onClick={() => setIsLoginOpen(true)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
            <Settings size={20} />
          </button>
        </footer>

        <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Acesso ao Painel">
           <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setView('admin'); setIsLoginOpen(false); }}>
             <input className="w-full p-5 bg-gray-100 rounded-[1.5rem] outline-none border-2 border-transparent focus:border-blue-500 transition-all font-mono" type="password" placeholder="Senha" />
             <button className="w-full p-5 text-white rounded-[1.5rem] font-black text-lg shadow-xl" style={dynamicStyles.button}>Entrar</button>
           </form>
        </Modal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans text-slate-900">
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-8 flex flex-col shadow-sm">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-lg" style={dynamicStyles.button}><Layers size={24} /></div>
          <span className="font-black text-2xl tracking-tighter">LinkHub<span className="text-blue-600">.</span></span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button onClick={() => setAdminTab('links')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${adminTab === 'links' ? 'bg-slate-100 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Link2 size={20}/> Links
          </button>
          <button onClick={() => setAdminTab('stats')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${adminTab === 'stats' ? 'bg-slate-100 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}>
            <BarChart3 size={20}/> Estatísticas
          </button>
        </nav>

        <button onClick={() => setView('public')} className="p-4 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center gap-3"><LogOut size={20} /> Sair</button>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        {adminTab === 'links' ? (
          <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <header className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">Links Ativos</h2>
                <p className="text-slate-400 font-medium">Gerencie sua árvore de links.</p>
              </div>
              <button 
                onClick={() => {
                  const newLink = { id: Date.now(), title: 'Novo Link', url: 'https://', icon: 'link', active: true, clicks: 0 };
                  setData(p => ({ ...p, links: [newLink, ...p.links] }));
                  showToast("Novo link criado! ✨");
                }}
                className="px-8 py-4 rounded-2xl text-white font-black flex items-center gap-3 shadow-xl hover:scale-105 transition-all" style={dynamicStyles.button}
              >
                <Plus size={24} /> Criar Link
              </button>
            </header>

            <div className="space-y-6">
              {data.links.map(link => (
                <div key={link.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                  <div className="flex-1 space-y-2">
                    <input className="w-full bg-transparent font-black text-xl text-slate-800 outline-none" value={link.title} onChange={(e) => setData(p => ({...p, links: p.links.map(l => l.id === link.id ? {...l, title: e.target.value} : l)}))} />
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                       <MousePointer2 size={14} className="text-blue-500" /> {link.clicks || 0} cliques
                    </div>
                  </div>
                  <button onClick={() => { setData(p => ({...p, links: p.links.filter(l => l.id !== link.id)})); showToast("Link removido."); }} className="w-12 h-12 flex items-center justify-center rounded-2xl text-slate-300 hover:text-red-500 transition-all"><Trash2 size={22} /></button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
             <h2 className="text-4xl font-black tracking-tight mb-8">Performance Analytics</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                   <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Views Totais</p>
                   <p className="text-5xl font-black text-slate-900">{data.stats?.totalViews || 0}</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                   <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Cliques nos Links</p>
                   <p className="text-5xl font-black text-blue-600">{data.links.reduce((acc, curr) => acc + (curr.clicks || 0), 0)}</p>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black mb-8">Ranking de Cliques</h3>
                <div className="space-y-8">
                   {data.links.sort((a,b) => (b.clicks || 0) - (a.clicks || 0)).map((link) => {
                      const totalClicks = data.links.reduce((acc, curr) => acc + (curr.clicks || 0), 0) || 1;
                      const percentage = Math.round(((link.clicks || 0) / totalClicks) * 100);
                      return (
                        <div key={link.id} className="space-y-3">
                           <div className="flex justify-between items-end">
                              <span className="font-bold text-slate-700">{link.title}</span>
                              <span className="text-sm font-black text-blue-500">{link.clicks || 0} clicks</span>
                           </div>
                           <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
                           </div>
                        </div>
                      )
                   })}
                </div>
             </div>
          </div>
        )}
      </main>

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 animate-in slide-in-from-bottom-10 duration-300 z-[200]">
           <Info size={20} className="text-blue-400" />
           {toast}
        </div>
      )}
    </div>
  );
}
