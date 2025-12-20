// src/components/Header.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "@aws-amplify/auth";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isAuth = !!user;

  function scrollToId(id) {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function handleLogout() {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  }

  return (
    <header className="fixed w-full z-40 border-b border-slate-800 bg-black/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToId("hero")}
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-wimex-blue shadow-lg shadow-wimex-blue/30 animate-logo-float">
            <img
              src="/images/logo.png"
              alt="WIMEX-UP"
              className="w-full h-full object-contain p-1"
            />
          </div>

          <div className="leading-tight">
            <span className="text-xs text-wimex-blue font-bold tracking-widest block">
              WIMEX-UP
            </span>
            <span className="text-xs font-semibold text-white">
              English Course
            </span>
          </div>
        </div>

        {/* MENU */}
        <nav className="hidden md:flex gap-6 text-sm text-slate-300">
          <button onClick={() => scrollToId("method")} className="hover:text-white">
            Método
          </button>
          <button onClick={() => scrollToId("who")} className="hover:text-white">
            Para quem é
          </button>
          <button onClick={() => scrollToId("plans")} className="hover:text-white">
            Planos
          </button>
          <button onClick={() => scrollToId("faq")} className="hover:text-white">
            Dúvidas
          </button>
        </nav>

        {/* AÇÕES */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/consultor")}
            className="text-sm text-slate-300 hover:text-white"
          >
            Fale com consultor
          </button>

          {!isAuth ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-slate-300 hover:text-white"
              >
                Já sou aluno
              </button>

              <button
                onClick={() => navigate("/matricula")}
                className="hidden sm:inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-wimex-blue to-wimex-blue-dark text-sm font-semibold text-white shadow-lg shadow-wimex-blue/30 transition-all"
              >
                Matricule-se
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-slate-300 hover:text-white"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
