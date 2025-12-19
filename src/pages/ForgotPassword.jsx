import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword, confirmResetPassword } from "@aws-amplify/auth";  // ← Mudança aqui

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = solicitar código, 2 = redefinir senha
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  // Solicitar código de redefinição de senha
  async function handleRequestCode(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!email) return setErro("Informe seu e-mail.");

    setLoading(true);
    try {
      await resetPassword({ username: email });  // ← Mudança aqui
      setSucesso("Código enviado para seu e-mail.");
      setStep(2);
    } catch (err) {
      console.error(err);
      setErro(err.message || "Erro ao solicitar código.");
    } finally {
      setLoading(false);
    }
  }

  // Redefinir a senha com o código enviado
  async function handleResetPassword(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!email || !codigo || !novaSenha)
      return setErro("Preencha todos os campos.");

    setLoading(true);
    try {
      await confirmResetPassword({ 
        username: email,           // ← Mudança aqui (username em vez de email)
        confirmationCode: codigo,  // ← confirmationCode em vez de codigo
        newPassword: novaSenha     // ← newPassword em vez de novaSenha
      });
      setSucesso("Senha alterada! Redirecionando para login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setErro(err.message || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  }

  // O resto do JSX permanece exatamente igual
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h1 className="text-2xl font-semibold mb-2 text-emerald-400">
            {step === 1 ? "Esqueci a senha" : "Redefinir senha"}
          </h1>

          {step === 1 ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">E-mail</label>
                <input
                  type="email"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {erro && <p className="text-xs text-red-400">{erro}</p>}
              {sucesso && <p className="text-xs text-emerald-400">{sucesso}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm transition disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar código"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Código de verificação</label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Nova senha</label>
                <input
                  type="password"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>

              {erro && <p className="text-xs text-red-400">{erro}</p>}
              {sucesso && <p className="text-xs text-emerald-400">{sucesso}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm transition disabled:opacity-60"
              >
                {loading ? "Redefinindo..." : "Redefinir senha"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}