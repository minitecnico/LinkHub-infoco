const RemoverFundo = () => {
  const [imagemProcessada, setImagemProcessada] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const handleProcessar = async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    setCarregando(true);
    const formData = new FormData();
    formData.append("image_file", arquivo);
    formData.append("size", "auto");

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": "Y4z9YG8pYXfi9hLA3F2nqjNP" }, // Coloque sua chave aqui
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setImagemProcessada(URL.createObjectURL(blob));
      } else {
        alert("Erro na API. Verifique seu saldo de créditos.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
      <h3 className="text-xl font-bold mb-4">Remover Background de Imagem</h3>
      
      <input 
        type="file" 
        onChange={handleProcessar}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {carregando && <p className="mt-4 animate-pulse">Processando imagem... Aguarde.</p>}

      {imagemProcessada && (
        <div className="mt-6 text-center">
          <img src={imagemProcessada} className="max-h-64 mx-auto rounded-lg mb-4" />
          <a 
            href={imagemProcessada} 
            download="sem-fundo.png"
            className="bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition-all"
          >
            Baixar Imagem 
          </a>
        </div>
      )}
    </div>
  );
};

// --- ZONA DE FERRAMENTAS (APIS) ---

const FerramentaCard = ({ titulo, icone, children }) => (
  <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-xl hover:border-blue-500/50 transition-all group">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
        {icone}
      </div>
      <h3 className="font-black text-lg text-white">{titulo}</h3>
    </div>
    {children}
  </div>
);

// Aqui você vai adicionando as funções das ferramentas...
