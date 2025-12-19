// src/pages/Cadastro.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "@aws-amplify/auth";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await signUp({
        username: email,
        password: senha,
        options: {
          userAttributes: {
            email,
            name: nome,
          },
        },
      });

      setSucesso("Conta criada! Confirme seu e-mail.");

      navigate("/confirmar", {
        state: { email },
      });
    } catch (err) {
      console.error(err);

      if (err.name === "UsernameExistsException") {
        setErro("Este e-mail já está cadastrado.");
      } else {
        setErro("Erro ao criar conta.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-emerald-400 mb-4">
            Criar conta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Nome completo"
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            {erro && <p className="text-red-400 text-sm">{erro}</p>}
            {sucesso && <p className="text-emerald-400 text-sm">{sucesso}</p>}

            <button
              disabled={loading}
              className="w-full bg-emerald-500 text-slate-900 py-2 rounded"
            >
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </form>

          <p className="text-sm mt-4">
            Já tem conta?
            <Link to="/login" className="ml-1 text-emerald-400">
              Entrar
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
