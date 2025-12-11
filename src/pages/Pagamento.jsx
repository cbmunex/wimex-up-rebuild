import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pagamento() {
  const navigate = useNavigate();

  const handlePagamento = () => {
    alert("Pagamento realizado com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
      <h1 className="text-2xl font-bold mb-4">Pagamento</h1>
      <p className="mb-6">Clique no botão para simular o pagamento e acessar o curso.</p>
      <button 
        onClick={handlePagamento} 
        className="px-6 py-3 bg-emerald-500 rounded hover:bg-emerald-400"
      >
        Pagar Agora
      </button>
    </div>
  );
}
