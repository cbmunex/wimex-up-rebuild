// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
  const navigate = useNavigate();

  // Proteção simples de rota
  useEffect(() => {
    const isAuth = localStorage.getItem('wimex-auth') === 'ok';
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  const rawUser = localStorage.getItem('wimex-user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  function handleLogout() {
    localStorage.removeItem('wimex-auth');
    navigate('/');
  }

  const modules = [
    { id: 1, title: 'Módulo 1 - Aeroporto & Check-in', level: 'Básico', status: 'Em breve' },
    { id: 2, title: 'Módulo 2 - Imigração & Documentos', level: 'Básico', status: 'Em breve' },
    { id: 3, title: 'Módulo 3 - Hotel & Reservas', level: 'Intermediário', status: 'Em breve' },
    { id: 4, title: 'Módulo 4 - Restaurantes & Pedidos', level: 'Intermediário', status: 'Em breve' },
    { id: 5, title: 'Módulo 5 - Reuniões de Trabalho', level: 'Avançado', status: 'Em breve' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              Olá, {user?.nome || 'Aluno'}
            </h1>
            <p className="text-sm text-slate-400">
              Bem-vindo à sua área de estudos do WIMEX-UP.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start px-4 py-2 rounded-full border border-slate-700 text-xs text-slate-300 hover:border-red-400 hover:text-red-300"
          >
            Sair
          </button>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          {/* Lista de módulos */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
            <h2 className="text-lg font-semibold mb-3">Seus módulos</h2>
            <ul className="space-y-3 text-sm">
              {modules.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2"
                >
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-xs text-slate-400">Nível: {m.level}</p>
                  </div>
                  <span className="text-[11px] rounded-full px-2 py-1 bg-slate-800 text-slate-300">
                    {m.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Painel lateral */}
          <aside className="space-y-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm">
              <h3 className="font-semibold mb-2">Seu progresso</h3>
              <p className="text-slate-400 text-xs mb-3">
                Em breve você verá aqui seu progresso, tempo de estudo e módulos concluídos.
              </p>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full w-1/5 bg-emerald-500" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Progresso inicial (demo)</p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-sm">
              <h3 className="font-semibold mb-2">Seu avatar</h3>
              <p className="text-slate-400 text-xs mb-2">
                Em futuras versões, aqui você poderá configurar o avatar que vai te acompanhar nas aulas.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                  {user?.nome ? user.nome[0].toUpperCase() : 'A'}
                </div>
                <div className="text-xs text-slate-300">
                  <p>Avatar padrão ativo</p>
                  <p className="text-slate-500">Personalização em breve</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
