import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PagamentoSimulado() {
  const navigate = useNavigate();

  function handlePay() {
    localStorage.setItem("matricula-status", "pago");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 p-6 rounded-xl text-center">
          <h1 className="text-xl font-semibold mb-4">
            Finalizar pagamento
          </h1>

          <p className="text-slate-400 mb-6">
            Simulação de pagamento do plano escolhido
          </p>

          <button
            onClick={handlePay}
            className="w-full bg-emerald-500 py-3 rounded font-bold text-black"
          >
            Pagar agora
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
