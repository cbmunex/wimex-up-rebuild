// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    const raw = localStorage.getItem('wimex-user');
    if (!raw) {
      setErro('Nenhum cadastro encontrado. Crie sua conta primeiro.');
      return;
    }

    const user = JSON.parse(raw);

    if (user.email !== email || user.senha !== senha) {
      setErro('E-mail ou senha inválidos.');
      return;
    }

    setLoading(true);
    localStorage.setItem('wimex-auth', 'ok');

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h1 className="text-2xl font-semibold mb-2">Entrar</h1>
          <p className="text-sm text-slate-400 mb-6">
            Acesse sua conta WIMEX-UP.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                E-mail
              </label>
              <input
                type="email"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Senha
              </label>
              <input
                type="password"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && (
              <p className="text-xs text-red-400">{erro}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 font-semibold text-slate-900 text-sm disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-400">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="text-emerald-400 hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
