// src/components/Header.jsx
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <img
            src="/logo.png"
            alt="Logo WIMEX-UP"
            className="h-9 w-9 rounded-full"
          />
          <span className="font-semibold tracking-tight">
            WIMEX-UP ENGLISH
          </span>
        </button>

        {!isDashboard && (
          <>
            <nav className="hidden md:flex gap-6 text-sm text-slate-300">
              <button className="hover:text-white">Método</button>
              <button className="hover:text-white">Para quem é</button>
              <button className="hover:text-white">Planos</button>
              <button className="hover:text-white">Dúvidas</button>
            </nav>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-slate-300 hover:text-white"
              >
                Já sou aluno
              </button>
              <button
                onClick={() => navigate('/cadastro')}
                className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-slate-900"
              >
                Começar agora
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
