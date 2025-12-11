// src/components/VoltarHome.jsx
import { useNavigate } from "react-router-dom";

export default function VoltarHome() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="mb-6 text-sm text-slate-300 hover:text-emerald-400 transition flex items-center gap-2"
    >
      <span className="text-lg">←</span> Voltar para a página inicial
    </button>
  );
}
