// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "@aws-amplify/auth";

export default function Login() {
  const navigate = useNavigate();

  const isHosted = window.location.hostname !== "localhost";

  // 🔒 Bloqueia login no ambiente do Amplify
  if (isHosted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Login desativado</h2>
          <p className="text-slate-300 mb-6">
            O login real está disponível apenas quando o sistema é executado localmente.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-full bg-emerald-500 text-black font-semibold"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  // 🔓 Login real LOCALHOST
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      await signIn({ username: email, password: senha });
      navigate("/dashboard");
    } catch (error) {
      setErro("Credenciais inválidas.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-xl border border-slate-700 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login do aluno</h2>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 mb-3"
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <p className="text-red-400 text-sm mb-3">{erro}</p>}

        <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-full text-black font-semibold">
          Entrar
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-slate-400 text-sm hover:text-white"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
