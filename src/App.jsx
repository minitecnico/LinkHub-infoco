import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { 
  Link2, Globe, FileText, User, Mail, Phone, Home, Layers, X, Plus, 
  Trash2, LogOut, BarChart3, Settings, ChevronRight, Info, RefreshCw, 
  Image as ImageIcon, Instagram, TrendingUp
} from 'lucide-react';

// --- UTILITÁRIOS FORA DO COMPONENTE (MAIS RÁPIDO) ---
const iconMap = { 
  link: Link2, globe: Globe, document: FileText, user: User, 
  mail: Mail, phone: Phone, home: Home, layers: Layers,
  users: Users, settings: Settings, trending: TrendingUp
};

const adjustColor = (hex, amt) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xFF) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xFF) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// --- COMPONENTES ATÔMICOS ---
const WhatsAppIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const PremiumIcon = ({ icon: Icon, color }) => (
  <div className="relative group hover:scale-110 transition-transform duration-500">
    <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" style={{ backgroundColor: color }} />
    <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl overflow-hidden bg-white/10 backdrop-blur-md">
      <Icon size={26} className="text-white drop-shadow-md" />
    </div>
  </div>
);

// --- FERRAMENTA API REMOVE BG ---
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
      } else {
        alert("Erro na API de imagem.");
      }
    } catch (error) {
      alert("Erro de conexão.");
    } finally { setLoading(false); }
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl"><ImageIcon size={24}/></div>
        <h3 className="font-black text-white text-lg">Remover Fundo</h3>
      </div>
      {!resultImage ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:bg-white/5 transition-colors">
          <p className="text-sm text-slate-400 font-bold italic">{loading ? "Processando..." : "Subir Foto"}</p>
          <input type="file" className="hidden" onChange={handleProcessImage} accept="image/*" disabled={loading} />
        </label>
      ) : (
        <div className="text-center animate-in zoom-in duration-300">
          <img src={resultImage} className="max-h-40 mx-auto rounded-xl mb-4" />
          <div className="flex gap-2">
            <a href={resultImage} download="sem-fundo.png" className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase">Baixar</a>
            <button onClick={() => setResultImage(null)} className="p-3 bg-white/5 text-white rounded-2xl"><RefreshCw size={18}/></button>
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
        { id: 1, title: 'Acesse Nosso Site', url: 'https://www.infocogestaopublica.com.br/', icon: 'globe', active: true, clicks: 0 },
        { id: 2, title: 'Portal de Contratos', url: 'https://infoco-portal-de-contratos.vercel.app/', icon: 'document', active: true, clicks: 0 }
      ],
      appearance: { primaryColor: '#0052D4' },
      social: { instagram: 'https://instagram.com/infocogestaopublica', whatsapp: '5573981019313' },
      stats: { totalViews: 0 }
    };
  });

  const [view, setView] = useState('public'); 
  const [adminTab, setAdminTab] = useState('links'); 
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => { localStorage.setItem('linkHubData', JSON.stringify(data)); }, [data]);

  const dynamicStyles = useMemo(() => ({
    background: `linear-gradient(160deg, ${data.appearance.primaryColor} 0%, ${adjustColor(data.appearance.primaryColor, -60)} 100%)`,
    button: { backgroundColor: data.appearance.primaryColor }
  }), [data.appearance.primaryColor]);

  if (view === 'public') {
    return (
      <div className="min-h-screen text-white flex flex-col items-center py-16 px-6 relative overflow-hidden" style={{ background: dynamicStyles.background }}>
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

        <header className="text-center mb-12 z-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20 rotate-3">
             <Layers size={40} strokeWidth={1} />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">{data.profile.name}</h1>
          <p className="px-4 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">{data.profile.bio}</p>
        </header>

        <main className="w-full max-w-md space-y-4 z-10">
          {data.links.filter(l => l.active).map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-[2rem] bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all hover:translate-y-[-4px] group shadow-xl">
              <PremiumIcon icon={iconMap[link.icon] || Globe} color={data.appearance.primaryColor} />
              <div className="ml-5 flex-1">
                <span className="block font-bold text-lg">{link.title}</span>
                <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Oficial</span>
              </div>
              <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}

          {/* SEÇÃO DE FERRAMENTAS API */}
          <div className="mt-12 space-y-4">
             <h2 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Ferramentas de Apoio</h2>
             <div className="grid grid-cols-1 gap-4">
                <ToolRemoveBg />
                <div className="p-6 bg-white/5 border border-white/5 rounded-[2.5rem] opacity-30 flex items-center justify-center text-[10px] font-bold uppercase text-slate-400">
                  Breve: PDF para Word
                </div>
             </div>
          </div>

          {/* Contato Section */}
          <section className="mt-8 p-6 rounded-[2.5rem] bg-black/20 border border-white/5">
             <h3 className="font-black mb-4 flex items-center gap-2"><div className="w-1.5 h-5 bg-blue-500 rounded-full"/> Atendimento</h3>
             <div className="space-y-3 text-sm">
                <p className="flex justify-between"><span>Suporte:</span> <span className="font-bold">(73) 98101-9313</span></p>
                <p className="flex justify-between"><span>Geral:</span> <span className="font-bold">(73) 3301-2710</span></p>
             </div>
          </section>
        </main>

        <footer className="mt-12 flex items-center gap-6 z-10 opacity-60">
          <a href={data.social.instagram}><Instagram size={22} /></a>
          <a href={`https://wa.me/${data.social.whatsapp}`}><WhatsAppIcon size={22} /></a>
          <button onClick={() => setIsLoginOpen(true)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10"><Settings size={18} /></button>
        </footer>

        {/* Modal de Login Simplificado */}
        {isLoginOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm text-slate-900">
              <h2 className="text-xl font-black mb-6">Painel Admin</h2>
              <input className="w-full p-4 bg-slate-100 rounded-xl mb-4" type="password" placeholder="Senha" onChange={(e)=>setPasswordInput(e.target.value)} />
              <div className="flex gap-2">
                <button onClick={()=>setIsLoginOpen(false)} className="flex-1 p-4 font-bold text-slate-400">Fechar</button>
                <button onClick={() => { if(passwordInput === "tpshow26") setView('admin'); else alert("Erro!"); }} className="flex-1 p-4 bg-blue-600 text-white rounded-xl font-black">Entrar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- VIEW ADMIN SIMPLIFICADA ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-80 bg-white p-8 border-r border-slate-200">
        <h2 className="font-black text-2xl mb-12">ADMIN</h2>
        <nav className="space-y-2">
          <button onClick={()=>setAdminTab('links')} className="w-full text-left p-4 rounded-xl font-bold bg-slate-100">Links & Perfil</button>
          <button onClick={()=>setView('public')} className="w-full text-left p-4 text-red-500 font-bold">Sair</button>
        </nav>
      </aside>
      <main className="flex-1 p-12">
        <h1 className="text-4xl font-black mb-8">Gerenciar Conteúdo</h1>
        {/* Aqui você mantém os inputs de edição que já tinha */}
        <p className="text-slate-400">Modo de edição ativo. Altere os campos e salve.</p>
      </main>
    </div>
  );
}
