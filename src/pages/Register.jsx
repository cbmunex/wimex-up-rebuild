// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// futuramente: import { Auth } from 'aws-amplify';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      // TODO: substituir pelo Auth.signUp() quando configurar Cognito
      // await Auth.signUp({ username: email, password, attributes: { name } });

      // Simulação: cadastro OK e manda pro login
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 800);
    } catch (error) {
      console.error(error);
      setErr('Erro ao cadastrar. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-7 text-white">
        <h1 className="text-2xl font-bold mb-2">Criar conta</h1>
        <p className="text-sm text-slate-400 mb-6">
          Comece seu acesso ao curso WIMEX-UP English.
        </p>

        {err && <div className="text-sm text-red-400 mb-3">{err}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Nome completo</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-emerald-400 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Seu nome"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">E-mail</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-emerald-400 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-emerald-400 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="mínimo 6 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 font-semibold text-sm text-slate-900 disabled:opacity-60"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-4">
          Já tem conta?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
