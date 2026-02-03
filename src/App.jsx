import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Link2, Globe, FileText, User, Mail, Phone, Home, Layers, X, Plus, 
  Trash2, LogOut, BarChart3, Settings, ChevronRight, Info, RefreshCw, 
  Image as ImageIcon, Instagram, TrendingUp, Users 
} from 'lucide-react';

// --- UTILITÁRIOS ---
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

const WhatsAppIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
      } else { alert("Erro na API."); }
    } catch (error) { alert("Erro de conexão."); } 
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl"><ImageIcon size={24}/></div>
        <h3 className="font-black text-white text-lg">Remover Background de imagens</h3>
      </div>
      {!resultImage ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:bg-white/5 transition-colors text-center p-4">
          <p className="text-sm text-slate-400 font-bold italic">{loading ? "Processando..." : "Arraste a imagem aqui"}</p>
          <input type="file" className="hidden" onChange={handleProcessImage} accept="image/*" disabled={loading} />
        </label>
      ) : (
        <div className="text-center">
          <img src={resultImage} className="max-h-40 mx-auto rounded-xl mb-4 border border-white/10" alt="Resultado" />
          <div className="flex gap-2">
            <a href={resultImage} download="linkhub.rem.bg.png" className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase text-center">Baixar</a>
            <button onClick={() => setResultImage(null)} className="p-3 bg-white/5 text-white rounded-2xl"><RefreshCw size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function LinkHub() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('linkHubData');
    return saved ? JSON.parse(saved) : {
      profile: { name: 'Infoco Gestão Pública®', bio: '' },
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
        <header className="text-center mb-12 z-10">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20">
             <Layers size={40} strokeWidth={1} />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">{data.profile.name}</h1>
          <p className="px-4 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">{data.profile.bio}</p>
        </header>

        <main className="w-full max-w-md space-y-4 z-10">
          {data.links.filter(l => l.active).map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-[2rem] bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all hover:translate-y-[-4px] group shadow-xl">
              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-white/10">
                {React.createElement(iconMap[link.icon] || Globe, { size: 24 })}
              </div>
              <div className="ml-5 flex-1">
                <span className="block font-bold text-lg">{link.title}</span>
                <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Acesso Oficial</span>
              </div>
              <ChevronRight size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}

          <div className="mt-12 space-y-4">
             <h2 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30"></h2>
             <div className="grid grid-cols-1 gap-4">
                <ToolRemoveBg />
                <div className="p-6 bg-white/5 border border-white/5 rounded-[2.5rem] opacity-30 flex items-center justify-center text-[10px] font-bold uppercase text-slate-400">carregando...</div>
             </div>
          </div>
        </main>

        <footer className="mt-12 flex items-center gap-6 z-10 opacity-60">
          <a href={data.social.instagram} target="_blank" rel="noreferrer"><Instagram size={22} /></a>
          <a href={`https://wa.me/${data.social.whatsapp}`} target="_blank" rel="noreferrer"><WhatsAppIcon size={22} /></a>
          <button onClick={() => setIsLoginOpen(true)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10"><Settings size={18} /></button>
        </footer>

        {isLoginOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm text-slate-900">
              <h2 className="text-2xl font-black mb-6">Login Admin</h2>
              <input className="w-full p-4 bg-slate-100 rounded-2xl mb-4 outline-none border-2 border-transparent focus:border-blue-500" type="password" placeholder="Senha" onChange={(e)=>setPasswordInput(e.target.value)} />
              <div className="flex gap-2">
                <button onClick={()=>setIsLoginOpen(false)} className="flex-1 p-4 font-bold text-slate-400">Cancelar</button>
                <button onClick={() => { if(passwordInput === "tpshow26") setView('admin'); else alert("Erro!"); }} className="flex-1 p-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg">Entrar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-8 flex flex-col shadow-sm">
        <div className="flex items-center gap-4 mb-12"><div className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-lg bg-blue-600"><Layers size={24} /></div><span className="font-black text-2xl tracking-tighter">LinkHub<span className="text-blue-600">.</span></span></div>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setAdminTab('links')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${adminTab === 'links' ? 'bg-slate-100 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}><Link2 size={20}/> Links & Perfil</button>
        </nav>
        <button onClick={() => setView('public')} className="p-4 rounded-2xl bg-red-50 text-red-600 font-bold flex items-center gap-3"><LogOut size={20} /> Sair</button>
      </aside>
      <main className="flex-1 p-8 md:p-16">
        <div className="max-w-3xl mx-auto space-y-12">
            <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-xl font-black flex items-center gap-2"><User size={20}/> Perfil</h3>
              <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200" placeholder="Nome" value={data.profile.name} onChange={(e) => setData({...data, profile: {...data.profile, name: e.target.value}})} />
              <input className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200" placeholder="Bio" value={data.profile.bio} onChange={(e) => setData({...data, profile: {...data.profile, bio: e.target.value}})} />
            </section>
            <section className="space-y-6">
               <button onClick={() => { const n = { id: Date.now(), title: 'Novo Link', url: 'https://', icon: 'link', active: true, clicks: 0 }; setData(p => ({ ...p, links: [n, ...p.links] })); }} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg hover:scale-[1.02] transition-transform">Adicionar Link</button>
               {data.links.map(link => (
                  <div key={link.id} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4">
                     <div className="flex-1 space-y-2">
                        <input className="w-full font-bold bg-transparent outline-none" value={link.title} onChange={(e) => setData(p => ({...p, links: p.links.map(l => l.id === link.id ? {...l, title: e.target.value} : l)}))} />
                        <input className="w-full text-xs text-blue-500 bg-transparent outline-none" value={link.url} onChange={(e) => setData(p => ({...p, links: p.links.map(l => l.id === link.id ? {...l, url: e.target.value} : l)}))} />
                     </div>
                     <button onClick={() => setData(p => ({...p, links: p.links.filter(l => l.id !== link.id)}))} className="text-red-400 hover:text-red-600"><Trash2 size={20} /></button>
                  </div>
               ))}
            </section>
        </div>
      </main>
    </div>
  );
}

// conversor de pdf-word abaixo

const ToolPdfToWord = () => {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzZlYTkyYzA3NDE2MjIzODdjNTJhMTEwYTk4OGJiN2I1NjA5YjkzNWI4OGJkNzMxZmIwOGVkNmE0MzAzMDI5MDVlMGQ4MjExMTk1YzY1NDIiLCJpYXQiOjE3NzAwODg3MDAuMzA5MTE3LCJuYmYiOjE3NzAwODg3MDAuMzA5MTE5LCJleHAiOjQ5MjU3NjIzMDAuMzAyMTUyLCJzdWIiOiI3NDE1MjY3NSIsInNjb3BlcyI6W119.Gdd-Il44MZx50a_5_9nccK-5SrGHawojVANVJYJ26XdaqHSB4BKZ-5x7IKx_Sxv_b1ulHBj9lDPXBIYjxUhkfiNrf6N-G_I9YlJoNw88LGyzBg6s3nb1jMODv3wboEab5eCN79cYt87V16QKvPOidI4cWQQZjc4VWfU3SHkLV5Ei9M6T6Cyr82PGEGYVHDuWtVVLJV3alkSHFV9inARCYgjz12a26ECkLLpv3lw7NJF3NoKgEXjlJL_P4-M5zqTXToGCb54UuHSplwUSuUR0kI9mtbFxHHU1_BJOs5g2oidMa738-M6OnsI_ewtk9OmW9y-0wRR9afHCM4O3YVwyOC5SuYfbH4rJfTh3fSdqKsWG59TTs6D8uiZ5PL4grsWlO9QnyBXGlpe-YD-XJJy90uq1l_8XV8jt5TDh_67xQvtLmE3LHbuoZgBVwEbtGrIv6OFHK2X4tNU0ooMgRJulyeHtKdVg_NarKevU9SpFzwsmAMEHx1gCz0uVouRj4jxilbzn3_QKeH3z5B3DwXdt00z4bETPjbo7Oh6MnJ5bIHYh6B3dhfdsCY4FhHdlecLYX_ir5366N6vaF-8g3QJkzU4NUdfgVmnU3AeC17jLTLtizV87ZQhO58BshazYcZOcFD5STOSSQAEipaLt7JZzhPZgEPRsGtMG2EYwsmgAHE0";

  const handleConvert = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      // 1. Criar o JOB na CloudConvert
      const response = await fetch("https://api.cloudconvert.com/v2/jobs", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tasks: {
            "import-1": { operation: "import/upload" },
            "task-1": {
              operation: "convert",
              input: "import-1",
              output_format: "docx",
              input_format: "pdf"
            },
            "export-1": { operation: "export/url", input: "task-1" }
          }
        })
      });

      const jobData = await response.json();
      const uploadTask = jobData.data.tasks.find(t => t.name === "import-1");

      // 2. Upload do arquivo real
      const formData = new FormData();
      Object.entries(uploadTask.result.form.parameters).forEach(([k, v]) => formData.append(k, v));
      formData.append("file", file);

      await fetch(uploadTask.result.form.url, { method: "POST", body: formData });

      // 3. Monitorar o status (Polling)
      const timer = setInterval(async () => {
        const statusRes = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobData.data.id}`, {
          headers: { "Authorization": `Bearer ${apiKey}` }
        });
        const statusData = await statusRes.json();
        const exportTask = statusData.data.tasks.find(t => t.name === "export-1");

        if (exportTask.status === "finished") {
          clearInterval(timer);
          setDownloadUrl(exportTask.result.files[0].url);
          setLoading(false);
        } else if (exportTask.status === "error") {
          clearInterval(timer);
          alert("Erro na conversão do PDF.");
          setLoading(false);
        }
      }, 3000);

    } catch (error) {
      console.error(error);
      alert("Falha ao conectar com CloudConvert.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl transition-all hover:border-blue-500/30">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl"><FileText size={24}/></div>
        <h3 className="font-black text-white text-lg tracking-tight">PDF para Word</h3>
      </div>
      
      {!downloadUrl ? (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:bg-white/5 transition-colors text-center p-4">
          <p className="text-sm text-slate-400 font-bold italic">
            {loading ? "Processando Documento..." : "Selecionar PDF"}
          </p>
          <input type="file" className="hidden" onChange={handleConvert} accept=".pdf" disabled={loading} />
        </label>
      ) : (
        <div className="text-center animate-in zoom-in duration-300">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} />
          </div>
          <div className="flex gap-2">
            <a href={downloadUrl} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase text-center shadow-lg shadow-blue-600/20">Baixar Word</a>
            <button onClick={() => setDownloadUrl(null)} className="p-3 bg-white/5 text-white rounded-2xl hover:bg-white/10 transition-all"><RefreshCw size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
};
{/* ... seus links acima ... */}

<section className="mt-12 space-y-4">
  <h2 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
    Ferramentas de Apoio
  </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ToolRemoveBg />  {/* Card de Remover Fundo */}
    <ToolPdfToWord /> {/* Card de PDF para Word - ADICIONE ESTA LINHA */}
  </div>
</section>

{/* ... seu footer abaixo ... */}






