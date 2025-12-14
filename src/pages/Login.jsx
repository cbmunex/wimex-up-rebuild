// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "@aws-amplify/auth";

export default function Login() {
  const navigate = useNavigate();

  const isHosted = window.location.hostname !== "localhost";

  // 🔒 (Removido bloqueio) Login agora acessível em todos os ambientes para demonstração

  // 🔓 Login real ou Mock
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      if (isHosted) {
        // Simulação de login no ambiente hospedado/Amplify (mock)
        if (email && senha) {
          localStorage.setItem("wimex_user", "true");
          navigate("/dashboard");
        } else {
          setErro("Preencha os campos (Simulação).");
        }
      } else {
        // Login real via Amplify (Localhost)
        await signIn({ username: email, password: senha });
        localStorage.setItem("wimex_user", "true");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro de login (ignorando para demonstração):", error);
      // 🔥 Permite entrada direta caso o backend falhe
      localStorage.setItem("wimex_user", "true");
      navigate("/dashboard");
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

        <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-wimex-blue hover:from-wimex-blue hover:to-blue-400 rounded-full text-white font-bold uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_25px_rgba(0,102,255,0.6)] border-2 border-white/20 hover:border-white">
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
