import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Link2, Globe, FileText, User, Mail, Phone, Home, Layers, X, Plus, 
  Trash2, LogOut, BarChart3, Settings, ChevronRight, Info, RefreshCw, 
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

const adjustColor = (hex, amt) => {
  const n = parseInt(hex?.replace('#', '') || '000000', 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xFF) + amt));
  const b = Math.min(255, Math.max(0, (n & 0xFF) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// --- COMPONENTES DE FERRAMENTAS ---

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
    <div className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem]">
      <div className="flex items-center gap-3 mb-4">
        <ImageIcon size={20} className="text-blue-400" />
        <h4 className="font-bold text-sm">Remover Fundo</h4>
      </div>
      {!resultImage ? (
        <label className="block border-2 border-dashed border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/5 text-center transition-all">
          <span className="text-xs text-white/40">{loading ? "Processando..." : "Subir Foto"}</span>
          <input type="file" className="hidden" onChange={handleProcessImage} accept="image/*" disabled={loading} />
        </label>
      ) : (
        <div className="text-center">
          <img src={resultImage} className="max-h-32 mx-auto mb-3 rounded-lg" alt="result" />
          <div className="flex gap-2">
            <a href={resultImage} download="bg-removed.png" className="flex-1 bg-blue-600 py-2 rounded-xl text-[10px] font-bold uppercase">Baixar</a>
            <button onClick={() => setResultImage(null)} className="p-2 bg-white/10 rounded-xl"><RefreshCw size={14}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

const ToolPdfToWord = () => {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzZlYTkyYzA3NDE2MjIzODdjNTJhMTEwYTk4OGJiN2I1NjA5YjkzNWI4OGJkNzMxZmIwOGVkNmE0MzAzMDI5MDVlMGQ4MjExMTk1YzY1NDIiLCJpYXQiOjE3NzAwODg3MDAuMzA5MTE3LCJuYmYiOjE3NzAwODg3MDAuMzA5MTE5LCJleHAiOjQ5MjU3NjIzMDAuMzAyMTUyLCJzdWIiOiI3NDE1MjY3NSIsInNjb3BlcyI6W119.Gdd-Il44MZx50a_5_9nccK-5SrGHawojVANVJYJ26XdaqHSB4BKZ-5x7IKx_Sxv_b1ulHBj9lDPXBIYjxUhkfiNrf6N-G_I9YlJoNw88LGyzBg6s3nb1jMODv3wboEab5eCN79cYt87V16QKvPOidI4cWQQZjc4VWfU3SHkLV5Ei9M6T6Cyr82PGEGYVHDuWtVVLJV3alkSHFV9inARCYgjz12a26ECkLLpv3lw7NJF3NoKgEXjlJL_P4-M5zqTXToGCb54UuHSplwUSuUR0kI9mtbFxHHU1_BJOs5g2oidMa738-M6OnsI_ewtk9OmW9y-0wRR9afHCM4O3YVwyOC5SuYfbH4rJfTh3fSdqKsWG59TTs6D8uiZ5PL4grsWlO9QnyBXGlpe-YD-XJJy90uq1l_8XV8jt5TDh_67xQvtLmE3LHbuoZgBVwEbtGrIv6OFHK2X4tNU0ooMgRJulyeHtKdVg_NarKevU9SpFzwsmAMEHx1gCz0uVouRj4jxilbzn3_QKeH3z5B3DwXdt00z4bETPjbo7Oh6MnJ5bIHYh6B3dhfdsCY4FhHdlecLYX_ir5366N6vaF-8g3QJkzU4NUdfgVmnU3AeC17jLTLtizV87ZQhO58BshazYcZOcFD5STOSSQAEipaLt7JZzhPZgEPRsGtMG2EYwsmgAHE0";

  const handleConvert = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.cloudconvert.com/v2/jobs", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: {
            "import-1": { operation: "import/upload" },
            "task-1": { operation: "convert", input: "import-1", output_format: "docx", input_format: "pdf" },
            "export-1": { operation: "export/url", input: "task-1" }
          }
        })
      });
      const job = await res.json();
      const upload = job.data.tasks.find(t => t.name === "import-1");
      const fd = new FormData();
      Object.entries(upload.result.form.parameters).forEach(([k, v]) => fd.append(k, v));
      fd.append("file", file);
      await fetch(upload.result.form.url, { method: "POST", body: fd });

      const timer = setInterval(async () => {
        const sRes = await fetch(`https://api.cloudconvert.com/v2/jobs/${job.data.id}`, { headers: { "Authorization": `Bearer ${apiKey}` } });
        const sData = await sRes.json();
        const exportT = sData.data.tasks.find(t => t.name === "export-1");
        if (exportT.status === "finished") {
          clearInterval(timer);
          setDownloadUrl(exportT.result.files[0].url);
          setLoading(false);
        }
      }, 3000);
    } catch (err) { setLoading(false); }
  };

  return (
    <div className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem]">
      <div className="flex items-center gap-3 mb-4">
        <FileText size={20} className="text-blue-400" />
        <h4 className="font-bold text-sm">PDF para Word</h4>
      </div>
      {!downloadUrl ? (
        <label className="block border-2 border-dashed border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/5 text-center transition-all">
          <span className="text-xs text-white/40">{loading ? "Convertendo..." : "Subir PDF"}</span>
          <input type="file" className="hidden" onChange={handleConvert} accept=".pdf" disabled={loading} />
        </label>
      ) : (
        <div className="text-center">
          <Check size={32} className="mx-auto text-green-400 mb-2" />
          <div className="flex gap-2">
            <a href={downloadUrl} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 py-2 rounded-xl text-[10px] font-bold uppercase">Baixar Docx</a>
            <button onClick={() => setDownloadUrl(null)} className="p-2 bg-white/10 rounded-xl"><RefreshCw size={14}/></button>
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
        { id: 1, title: 'Site Oficial', url: 'https://infocogestaopublica.com.br/', icon: 'globe', active: true, clicks: 0 },
      ],
      appearance: { primaryColor: '#0052D4', background: THEMES.blue.bg },
      social: { instagram: 'https://instagram.com/', whatsapp: '5573981019313' }
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
      <div className="min-h-screen text-white flex flex-col items-center py-16 px-6 relative overflow-hidden" style={{ background: dynamicStyles.background }}>
        <header className="text-center mb-12 z-10">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-2xl">
            <Layers size={40} strokeWidth={1} />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">{data.profile.name}</h1>
          <p className="px-4 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">{data.profile.bio}</p>
        </header>

        <main className="w-full max-w-md space-y-4 z-10">
          {data.links.filter(l => l.active).map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="flex items-center p-4 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10">
                {React.createElement(iconMap[link.icon] || Globe, { size: 24 })}
              </div>
              <div className="ml-5 flex-1 font-bold text-lg">{link.title}</div>
              <ChevronRight size={20} className="opacity-40" />
            </a>
          ))}

          <section className="mt-12 space-y-4">
             <h2 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Ferramentas de Apoio</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToolRemoveBg />
                <ToolPdfToWord />
             </div>
          </section>
        </main>

        <footer className="mt-12 flex gap-6 opacity-60">
          <a href={data.social.instagram}><Instagram size={22} /></a>
          <button onClick={() => setIsLoginOpen(true)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all"><Settings size={18} /></button>
        </footer>

        {isLoginOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm text-slate-900">
              <h2 className="text-2xl font-black mb-6">Acesso Admin</h2>
              <input className="w-full p-4 bg-slate-100 rounded-2xl mb-4 outline-none border-2 border-transparent focus:border-blue-500" type="password" placeholder="Senha" onChange={(e)=>setPasswordInput(e.target.value)} />
              <button onClick={() => { if(passwordInput === MINHA_SENHA_MESTRA) { setView('admin'); setIsLoginOpen(false); } else alert("Erro!"); }} className="w-full p-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg">Entrar</button>
              <button onClick={()=>setIsLoginOpen(false)} className="w-full mt-2 text-slate-400 font-bold text-sm">Cancelar</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- VIEW ADMIN ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      <aside className="w-80 bg-white border-r p-8 hidden md:flex flex-col">
        <h2 className="font-black text-2xl mb-12 flex items-center gap-2"><Settings className="text-blue-600" /> Admin</h2>
        <nav className="flex-1 space-y-4">
          <div className="p-4 bg-slate-100 rounded-2xl font-bold flex items-center gap-3"><Layers size={20}/> LinkHub Dashboard</div>
        </nav>
        <button onClick={() => setView('public')} className="p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center gap-2"><LogOut size={20}/> Sair</button>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-10">
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Palette className="text-blue-600" /> Temas Visuais</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(THEMES).map(k => (
                <button key={k} onClick={() => setData({...data, appearance: { primaryColor: THEMES[k].primary, background: THEMES[k].bg }})} className="p-3 border-2 border-slate-100 rounded-2xl hover:border-blue-500 transition-all text-center">
                  <div className="h-10 w-full rounded-lg mb-2" style={{ background: THEMES[k].bg }} />
                  <span className="text-[10px] font-black uppercase">{THEMES[k].name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><User className="text-blue-600" /> Perfil</h3>
            <div className="space-y-4">
               <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200" value={data.profile.name} onChange={(e)=>setData({...data, profile: {...data.profile, name: e.target.value}})} placeholder="Nome da Empresa" />
               <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200" value={data.profile.bio} onChange={(e)=>setData({...data, profile: {...data.profile, bio: e.target.value}})} placeholder="Bio/Descrição" />
            </div>
          </section>

          <section className="space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-black">Links Ativos</h3>
                <button onClick={() => setData({...data, links: [{id: Date.now(), title: 'Novo Link', url: '#', icon: 'link', active: true, clicks: 0}, ...data.links]})} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-all">+ Adicionar</button>
             </div>
             {data.links.map(l => (
               <div key={l.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <input className="w-full font-bold text-slate-800 outline-none" value={l.title} onChange={(e)=>setData({...data, links: data.links.map(x => x.id === l.id ? {...x, title: e.target.value} : x)})} />
                    <input className="w-full text-xs text-blue-500 outline-none" value={l.url} onChange={(e)=>setData({...data, links: data.links.map(x => x.id === l.id ? {...x, url: e.target.value} : x)})} />
                  </div>
                  <button onClick={()=>setData({...data, links: data.links.filter(x => x.id !== l.id)})} className="text-red-300 hover:text-red-500"><Trash2 size={20}/></button>
               </div>
             ))}
          </section>
        </div>
      </main>
    </div>
  );
}
