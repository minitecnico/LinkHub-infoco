import React, { useState, useEffect, useMemo } from 'react';
import { 
  Link2, Globe, FileText, User, Mail, Phone, Home, Layers, X, Plus, 
  Trash2, LogOut, Settings, ChevronRight, RefreshCw, 
  Image as ImageIcon, Instagram, TrendingUp, Users, Check, Palette
} from 'lucide-react';

// --- CONFIGURAÇÕES E TEMAS ---
const MINHA_SENHA_MESTRA = "tpshow26";

const THEMES = {
  blue: { primary: '#0052D4', bg: 'linear-gradient(160deg, #0052D4 0%, #002e7a 100%)', name: 'Standard Blue' },
  dark: { primary: '#D4AF37', bg: 'linear-gradient(160deg, #1a1a1a 0%, #000000 100%)', name: 'Luxury Gold' },
  ocean: { primary: '#00B4DB', bg: 'linear-gradient(160deg, #0083B0 0%, #00B4DB 100%)', name: 'Deep Ocean' },
  sunset: { primary: '#f12711', bg: 'linear-gradient(160deg, #f12711 0%, #f5af19 100%)', name: 'Hot Sunset' }
};

const iconMap = { 
  link: Link2, globe: Globe, document: FileText, user: User, 
  mail: Mail, phone: Phone, home: Home, layers: Layers,
  users: Users, settings: Settings, trending: TrendingUp
};

const WhatsAppIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

// --- COMPONENTE REMOVER FUNDO ---
const ToolRemoveBg = () => {
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);

  const handleProcessImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": "Y4z9YG8pYXfi9hLA3F2nqjNP" },
        body: formData,
      });
      if (response.ok) {
        const blob = await response.blob();
        setResultImage(URL.createObjectURL(blob));
      }
    } catch (e) { alert("Erro na API RemoveBg"); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <ImageIcon size={20} className="text-blue-400" />
        </div>
        <h4 className="font-bold text-base text-white">Remover Fundo</h4>
      </div>
      {!resultImage ? (
        <label className="block border-2 border-dashed border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/5 text-center transition-all group">
          <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors">
            {loading ? "Processando..." : "Selecionar Foto"}
          </span>
          <input type="file" className="hidden" onChange={handleProcessImage} accept="image/*" disabled={loading} />
        </label>
      ) : (
        <div className="text-center animate-in zoom-in duration-300">
          <img src={resultImage} className="max-h-40 mx-auto mb-4 rounded-xl border border-white/10 shadow-lg" alt="resultado" />
          <div className="flex gap-2">
            <a href={resultImage} download="sem-fundo.png" className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-colors">Baixar PNG</a>
            <button onClick={() => setResultImage(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
              <RefreshCw size={18} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function LinkHub() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('linkHubData');
    return saved ? JSON.parse(saved) : {
      profile: { name: 'Infoco Gestão Pública®', bio: 'Inovação e Transparência na Gestão Municipal' },
      links: [
        { id: 1, title: 'Site Oficial', url: 'https://infocogestaopublica.com.br/', icon: 'globe', active: true },
      ],
      appearance: { primaryColor: '#0052D4', background: THEMES.blue.bg },
      social: { instagram: 'https://instagram.com/infocogestaopublica', whatsapp: '5573981019313' }
    };
  });

  const [view, setView] = useState('public'); 
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => { localStorage.setItem('linkHubData', JSON.stringify(data)); }, [data]);

  const dynamicStyles = useMemo(() => ({
    background: data.appearance.background || THEMES.blue.bg,
    button: { backgroundColor: data.appearance.primaryColor }
  }), [data.appearance]);

  if (view === 'public') {
    return (
      <div className="min-h-screen text-white flex flex-col items-center py-16 px-6 relative overflow-hidden transition-all duration-700" style={{ background: dynamicStyles.background }}>
        <header className="text-center mb-12 z-10">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[2.2rem] flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-2xl">
            <Layers size={40} strokeWidth={1} />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">{data.profile.name}</h1>
          <p className="px-4 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">{data.profile.bio}</p>
        </header>

        <main className="w-full max-w-md space-y-4 z-10">
          {data.links.map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="flex items-center p-4 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:scale-[1.02] transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                {React.createElement(iconMap[link.icon] || Globe, { size: 24 })}
              </div>
              <div className="ml-5 flex-1 font-bold text-lg">{link.title}</div>
              <ChevronRight size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}

          <section className="mt-12 space-y-4">
             <h2 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Ferramentas SICC</h2>
             <ToolRemoveBg />
          </section>
        </main>

        {/* --- RODAPÉ ALINHADO --- */}
        <footer className="mt-12 flex items-center gap-8 z-10">
          <a href={data.social.instagram} target="_blank" rel="noreferrer" className="opacity-60 hover:opacity-100 transition-all">
            <Instagram size={24} />
          </a>
          
          <a href={`https://wa.me/${data.social.whatsapp}`} target="_blank" rel="noreferrer" className="opacity-60 hover:opacity-100 transition-all">
            <WhatsAppIcon size={24} />
          </a>

          <button 
            onClick={() => setIsLoginOpen(true)} 
            className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 opacity-60 hover:opacity-100 hover:bg-white hover:text-black transition-all shadow-lg"
          >
            <Settings size={20} />
          </button>
        </footer>

        {isLoginOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm text-slate-900 shadow-2xl">
              <h2 className="text-2xl font-black mb-6">Acesso Admin</h2>
              <input className="w-full p-4 bg-slate-100 rounded-2xl mb-4 outline-none border-2 border-transparent focus:border-blue-500 transition-all" type="password" placeholder="Senha" onChange={(e)=>setPasswordInput(e.target.value)} />
              <button onClick={() => { if(passwordInput === MINHA_SENHA_MESTRA) { setView('admin'); setIsLoginOpen(false); } else alert("Senha Incorreta!"); }} className="w-full p-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg">Entrar</button>
              <button onClick={()=>setIsLoginOpen(false)} className="w-full mt-4 text-slate-400 font-bold text-sm">Voltar</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- VIEW ADMIN ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      <aside className="w-80 bg-white border-r p-8 hidden md:flex flex-col shadow-sm">
        <h2 className="font-black text-2xl mb-12 flex items-center gap-2"><Settings className="text-blue-600" /> Painel</h2>
        <nav className="flex-1 space-y-4">
          <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl font-bold flex items-center gap-3 border border-blue-100"><Layers size={20}/> Gerenciar LinkHub</div>
        </nav>
        <button onClick={() => setView('public')} className="p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-100 transition-colors"><LogOut size={20}/> Sair</button>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-10">
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Palette className="text-blue-600" /> Temas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(THEMES).map(k => (
                <button key={k} onClick={() => setData({...data, appearance: { primaryColor: THEMES[k].primary, background: THEMES[k].bg }})} className="p-3 border-2 border-slate-100 rounded-2xl hover:border-blue-500 transition-all text-center">
                  <div className="h-12 w-full rounded-xl mb-2" style={{ background: THEMES[k].bg }} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">{THEMES[k].name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><User className="text-blue-600" /> Perfil</h3>
            <div className="space-y-4">
               <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all" value={data.profile.name} onChange={(e)=>setData({...data, profile: {...data.profile, name: e.target.value}})} placeholder="Nome" />
               <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all" value={data.profile.bio} onChange={(e)=>setData({...data, profile: {...data.profile, bio: e.target.value}})} placeholder="Bio" />
            </div>
          </section>

          <section className="space-y-4">
             <div className="flex justify-between items-center px-2">
                <h3 className="text-xl font-black">Links</h3>
                <button onClick={() => setData({...data, links: [{id: Date.now(), title: 'Novo Link', url: 'https://', icon: 'link', active: true}, ...data.links]})} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition-colors">+ Novo Link</button>
             </div>
             {data.links.map(l => (
               <div key={l.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                  <div className="flex-1 space-y-2">
                    <input className="w-full font-bold text-slate-800 outline-none" value={l.title} onChange={(e)=>setData({...data, links: data.links.map(x => x.id === l.id ? {...x, title: e.target.value} : x)})} />
                    <input className="w-full text-xs text-blue-500 outline-none" value={l.url} onChange={(e)=>setData({...data, links: data.links.map(x => x.id === l.id ? {...x, url: e.target.value} : x)})} />
                  </div>
                  <button onClick={()=>setData({...data, links: data.links.filter(x => x.id !== l.id)})} className="text-red-200 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
               </div>
             ))}
          </section>
        </div>
      </main>
    </div>
  );
}
