// src/components/Header.jsx
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  function scrollToId(id) {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <header className="fixed w-full z-40 border-b border-slate-800 bg-black/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/70 flex items-center justify-center overflow-hidden">
            {/* substitua /logo.png pelo seu logo no public */}
            <img src="/logo.png" alt="WIMEX-UP" className="w-9 h-9 object-contain" />
          </div>
          <div className="leading-tight">
            <span className="text-xs text-emerald-400 font-semibold tracking-widest">WIMEX-UP</span>
            <div className="text-sm font-semibold text-white">English Course</div>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-slate-300">
          <button onClick={() => scrollToId("method")} className="hover:text-white transition-colors">Método</button>
          <button onClick={() => scrollToId("who")} className="hover:text-white transition-colors">Para quem é</button>
          <button onClick={() => scrollToId("plans")} className="hover:text-white transition-colors">Planos</button>
          <button onClick={() => scrollToId("faq")} className="hover:text-white transition-colors">Dúvidas</button>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/consultor")} className="text-sm text-slate-300 hover:text-white">Fale com consultor</button>
          <button onClick={() => navigate("/login")} className="text-sm text-slate-300 hover:text-white">Já sou aluno</button>

          <button
            onClick={() => navigate("/matricula")}
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-slate-900"
          >
            Matricule-se
          </button>
        </div>
      </div>
    </header>
  );
}
