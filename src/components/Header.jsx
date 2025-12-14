// src/components/Header.jsx
import { useNavigate, useLocation } from "react-router-dom";
import logoVideo from "../assets/logo.mp4";

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
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToId("hero")}>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-wimex-blue shadow-lg shadow-wimex-blue/20">
            <video
              src={logoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/logo-frame.png"
            />
          </div>
          <div className="leading-tight">
            <span className="text-xs text-wimex-blue font-bold tracking-widest block drop-shadow-sm">WIMEX-UP</span>
            <span className="text-xs font-semibold text-white">English Course</span>
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
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-wimex-blue to-wimex-blue-dark hover:from-wimex-blue-dark hover:to-wimex-blue text-sm font-semibold text-white shadow-lg shadow-wimex-blue/30 transition-all active:scale-95"
          >
            Matricule-se
          </button>
        </div>
      </div >
    </header >
  );
}
