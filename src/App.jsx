import React, { useState, useEffect, useMemo } from 'react';
import { 
  Link2, Globe, FileText, User, Mail, Phone, Home, Layers, X, Plus, 
  Trash2, LogOut, Settings, ChevronRight, RefreshCw, 
  Image as ImageIcon, Instagram, TrendingUp, Users, Check, Palette
} from 'lucide-react';

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
    } catch (err) { alert("Erro ao processar imagem."); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem]">
      <div className="flex items-center gap-3 mb-4">
        <ImageIcon size={20} className="text-blue-400" />
        <h4 className="font-bold text-white">Remover Fundo</h4>
      </div>
      {!resultImage ? (
        <label className="block border-2 border-dashed border-white/10 rounded-2xl p-6 cursor-pointer text-center">
          <span className="text-sm text-white/40">{loading ? "Processando..." : "Selecionar Foto"}</span>
          <input type="file" className="hidden" onChange={handleProcessImage} accept="image/*" disabled={loading} />
        </label>
      ) : (
        <div className="text-center">
          <img src={resultImage} className="max-h-40 mx-auto mb-4 rounded-xl shadow-lg" alt="resultado" />
          <div className="flex gap-2">
            <a href={resultImage} download="sem-fundo.png" className="flex-1 bg-blue-600 py-3 rounded-2xl text-xs font-black text-white uppercase">Baixar</a>
            <button onClick={() => setResultImage(null)} className="p-3 bg-white/10 rounded-2xl text-white"><RefreshCw size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function LinkHub() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('linkHubData');
    if (saved) return JSON.parse(saved);
    return {
      profile: { name: 'Infoco Gestão Pública®', bio: 'Inovação e Transparência na Gestão Municipal' },
      links: [{ id: 1, title: 'Site Oficial', url: 'https://infocogestaopublica.com.br/', icon: 'globe', active: true }],
      appearance: { primaryColor: '#0052D4', background: THEMES.blue.bg },
      social: { instagram: 'https://instagram.com/infocogestaopublica', whatsapp: '5573981019313' }
    };
  });

  const [view, setView] = useState('public'); 
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    localStorage.setItem('linkHubData', JSON.stringify(data));
  }, [data]);

  const handleLogin = () => {
    if (passwordInput === MINHA_SENHA_MESTRA) {
      setView('admin');
      setIsLoginOpen(false);
    } else {
      alert("Senha incorreta!");
    }
  };

  if (view === 'public') {
    return (
      <div className="min-h-screen text-white flex flex-col items-center py-16 px-6" style={{ background: data.appearance.background }}>
        <header className="text-center mb-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[2.2rem] flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-2xl">
            <Layers size={40} />
          </div>
          <h1 className="text-3xl font-black mb-2">{data.profile.name}</h1>
          <p className="px-4 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">{data.profile.bio}</p>
        </header>

        <main className="w-full max-w-md space-y-4">
          {data.links.map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="flex items-center p-4 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-[1.02] transition-all shadow-lg group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10">
                {React.createElement(iconMap[link.icon] || Globe, { size: 24 })}
              </div>
              <div className="ml-5 flex-1 font-bold text-lg">{link.title}</div>
              <ChevronRight size={20} className="opacity-40" />
            </a>
          ))}
          <div className="mt-12"><ToolRemoveBg /></div>
        </main>

        <footer className="mt-12 flex items-center gap-8">
          <a href={data.social.instagram} className="opacity-60 hover:opacity-100"><Instagram size={24} /></a>
          <a href={`https://wa.me/${data.social.whatsapp}`} className="opacity-60 hover:opacity-100"><WhatsAppIcon size={24} /></a>
          <button onClick={() => setIsLoginOpen(true)} className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 opacity-60 hover:opacity-100"><Settings size={20} /></button>
        </footer>

        {isLoginOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6 text-slate-900">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm">
              <h2 className="text-2xl font-black mb-6">Admin</h2>
              <input className="w-full p-4 bg-slate-100 rounded-2xl mb-4 outline-none" type="password" placeholder="Senha" onChange={(e)=>setPasswordInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
              <button onClick={handleLogin} className="w-full p-4 bg-blue-600 text-white rounded-2xl font-black">Entrar</button>
              <button onClick={()=>setIsLoginOpen(false)} className="w-full mt-4 text-slate-400 font-bold">Voltar</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      <aside className="w-80 bg-white border-r p-8 flex flex-col">
        <h2 className="font-black text-2xl mb-12 flex items-center gap-2 text-blue-600"><Settings /> Painel</h2>
        <button onClick={() => setView('public')} className="mt-auto p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center gap-2"><LogOut size={20}/> Sair</button>
      </aside>
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-10">
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6">Temas</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(THEMES).map(k => (
                <button key={k} onClick={() => setData({...data, appearance: { primaryColor: THEMES[k].primary, background: THEMES[k].bg }})} className="p-3 border-2 rounded-2xl text-center">
                  <div className="h-10 w-full rounded-xl mb-2" style={{ background: THEMES[k].bg }} />
                  <span className="text-[10px] font-black uppercase">{THEMES[k].name}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6">Links</h3>
            <button onClick={() => setData({...data, links: [{id: Date.now(), title: 'Novo Link', url: 'https://', icon: 'link', active: true}, ...data.links]})} className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">+ Novo</button>
            {data.links.map(l => (
              <div key={l.id} className="flex gap-4 mb-4 items-center bg-slate-50 p-4 rounded-2xl">
                <div className="flex-1">
                  <input className="w-full font-bold bg-transparent outline-none" value={l.title} onChange={(e)=>setData({...data, links: data.links.map(x => x.id === l.id ? {...x, title: e.target.value} : x)})} />
                  <input className="w-full text-xs text-blue-500 bg-transparent outline-none" value={l.url} onChange={(e)=>setData({...data, links: data.links.map(x => x.id === l.id ? {...x, url: e.target.value} : x)})} />
                </div>
                <button onClick={()=>setData({...data, links: data.links.filter(x => x.id !== l.id)})} className="text-red-300"><Trash2 size={20}/></button>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
