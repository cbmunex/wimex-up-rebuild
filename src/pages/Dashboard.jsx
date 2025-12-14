import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = "Aluno Wimex"; // Mock user name

  // 🔒 Proteção de Rota (Simples)
  useEffect(() => {
    const isLogged = localStorage.getItem("wimex_user");
    if (!isLogged) {
      navigate("/login");
    }
  }, [navigate]);

  const modules = [
    { title: "Travel", desc: "Inglês para viagens", color: "from-blue-600 to-indigo-600", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400" },
    { title: "Business", desc: "Negócios e Carreira", color: "from-slate-700 to-slate-900", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" },
    { title: "Cities", desc: "Cultura e Lugares", color: "from-wimex-blue to-blue-500", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400" },
  ];

  const continueWatching = {
    title: "Lesson 03: Asking for directions",
    module: "Travel - Module 1",
    progress: 45,
    img: "https://images.unsplash.com/photo-1570174006382-141baf6c90bf?auto=format&fit=crop&q=80&w=600"
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-wimex-blue selection:text-white pb-20">

      {/* Navbar simplificada */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 shadow-lg shadow-wimex-blue/10">
            <video src="/logo.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
          <span className="font-bold tracking-wider text-wimex-blue">WIMEX-UP</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300 hidden md:inline">Olá, {usuario}</span>
          <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-wimex-blue overflow-hidden">
            {/* Avatar do usuário (Placeholder) */}
            <img src="https://placehold.co/100x100/0066FF/FFFFFF/png?text=User" alt="User" />
          </div>
          <button onClick={() => { localStorage.removeItem("wimex_user"); navigate("/"); }} className="text-xs text-red-400 hover:text-red-300">Sair</button>
        </div>
      </nav>

      {/* Hero / Welcome */}
      <header className="pt-32 pb-10 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-wimex-blue to-white">{usuario}</span>.
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Continue sua jornada rumo à fluência. Você está indo muito bem!
            </p>

            {/* Continue Watching Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex gap-4 hover:border-wimex-blue/50 transition-colors cursor-pointer group">
              <div className="w-32 h-20 rounded-lg overflow-hidden relative">
                <img src={continueWatching.img} alt="Thumb" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-wimex-blue/80 flex items-center justify-center">
                    <span className="ml-1 text-white text-xs">▶</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs text-wimex-blue font-bold uppercase mb-1">Continue Watching</span>
                <h3 className="font-semibold text-white group-hover:text-blue-200">{continueWatching.title}</h3>
                <p className="text-xs text-slate-500 mb-2">{continueWatching.module}</p>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-wimex-blue" style={{ width: `${continueWatching.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar 3D Placeholder/Guide */}
          <div className="hidden md:block w-64 h-64 relative animate-float">
            <div className="absolute inset-0 bg-wimex-blue/20 blur-2xl rounded-full"></div>
            <img src="https://placehold.co/400x400/000000/FFFFFF/png?text=3D+Avatar" alt="Avatar Guide" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
          </div>
        </div>
      </header>

      {/* Scenarios / Modules */}
      <section className="px-6 max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-wimex-blue rounded-full"></span>
          Seus Módulos
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((mod, idx) => (
            <div key={idx} onClick={() => navigate('/module/1')} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-black/50 border border-slate-800 hover:border-wimex-blue transition-all hover:scale-[1.02]">
              <img src={mod.img} alt={mod.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
              <div className={`absolute inset-0 bg-gradient-to-t ${mod.color} opacity-20 group-hover:opacity-10 transition-opacity`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-wimex-blue transition-colors">{mod.title}</h3>
                <p className="text-slate-300 text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100 duration-300">
                  {mod.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Class */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 to-black border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-9xl font-bold text-wimex-blue">LIVE</span>
          </div>
          <div className="relative z-10">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-4 inline-block animate-pulse">AO VIVO AGORA</span>
            <h2 className="text-2xl font-bold mb-2">Conversation Club: Business English</h2>
            <p className="text-slate-400 mb-6 max-w-md">Junte-se a outros alunos e pratique sua conversação com o professor nativo. Tema: "Job Interviews".</p>
            <button className="px-8 py-3 bg-wimex-blue text-white font-bold rounded-full shadow-lg shadow-wimex-blue/30 hover:bg-blue-600 transition-colors">
              Entrar na Sala
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
