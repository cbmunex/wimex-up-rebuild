// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const isHosted = window.location.hostname !== "localhost";

  // 🔒 Dashboard fake no Amplify
  if (isHosted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
        <div className="bg-slate-900 border border-slate-700 p-10 rounded-lg max-w-md text-center">
          <h2 className="text-2xl font-bold mb-3">Ambiente de teste</h2>
          <p className="text-slate-300 mb-6">Você está visualizando uma simulação do painel do aluno.</p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-emerald-500 rounded-full text-black font-semibold"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  // 🔓 Dashboard real LOCAL
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">Dashboard do aluno (versão real)</h1>
    </div>
  );
}
