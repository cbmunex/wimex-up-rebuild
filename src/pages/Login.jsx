// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "@aws-amplify/auth";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await signIn({
        username: email,
        password: senha,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      if (err.name === "UserNotConfirmedException") {
        navigate("/confirmar", { state: { email } });
      } else {
        setErro("E-mail ou senha inválidos.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center items-center px-4">
        <div className="max-w-md w-full bg-slate-900 p-6 rounded">
          <h1 className="text-xl mb-4">Login do Aluno</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded"
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded"
            />

            {erro && <p className="text-red-400 text-sm">{erro}</p>}

            <button className="w-full bg-emerald-500 py-2 rounded text-slate-900">
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="flex justify-between mt-4 text-sm">
            <Link to="/esqueci-senha">Esqueci a senha</Link>
            <Link to="/matricula">Não sou aluno</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
