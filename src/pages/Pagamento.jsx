import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pagamento() {
  const navigate = useNavigate();

  function simularPagamento() {
    // salva estado de pagamento concluído
    localStorage.setItem("pagamento_ok", "true");

    // redireciona para o dashboard
    navigate("/dashboard");
  }

  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Pagamento do Curso</h1>

      <p className="text-gray-600 mb-6 text-lg">
        Para fins de teste, este botão simula o pagamento real.
      </p>

      <button
        onClick={simularPagamento}
        className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-lg"
      >
        💳 Pagar agora (Simulado)
      </button>
    </div>
  );
}
