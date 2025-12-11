// src/pages/EscolherMatricula.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EscolherMatricula() {
  const navigate = useNavigate();
  const location = useLocation();
  // pode vir do Planos com state: { plan, addProfile, payment }
  const incoming = (location.state || {});

  function goSolo() {
    // encaminha para /matricula mantendo o state do plano, se houver
    navigate("/matricula", { state: { ...incoming } });
  }

  function goConsultor() {
    // encaminha para a página do consultor (ele faz a matrícula)
    navigate("/consultor", { state: { from: "escolher-matricula", ...incoming } });
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 pt-28 px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-300 hover:text-[#00F7FF] mb-6 flex items-center gap-2"
        >
          <span className="text-2xl">←</span> Voltar
        </button>

        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Como você prefere prosseguir?</h1>
            <p className="text-slate-300 mb-6">
              Você pode preencher sua matrícula agora mesmo ou solicitar que um de nossos consultores
              faça todo o processo e finalize o pagamento para você.
            </p>

            <div className="text-sm text-slate-400 mb-8">
              <p>
                Caso venha de "Planos" essa escolha irá manter a opção selecionada anteriormente.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={goSolo}
                className="px-6 py-3 rounded-full bg-[#00F7FF] hover:bg-[#00CFFF] text-black font-semibold transition"
              >
                Fazer matrícula sozinho
              </button>

              <button
                onClick={goConsultor}
                className="px-6 py-3 rounded-full border border-[#00F7FF] text-[#00F7FF] hover:bg-white/5 transition"
              >
                Falar com um consultor
              </button>
            </div>
          </div>

          <div>
            <div className="bg-[#071428] border border-[rgba(0,167,232,0.08)] rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[#00F7FF] mb-3">Por que escolher um consultor?</h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Atendimento personalizado.</li>
                <li>• Auxílio na escolha do plano ideal.</li>
                <li>• Processamos a matrícula e pagamento para você.</li>
                <li>• Suporte para documentos e perfil extra.</li>
              </ul>
              <div className="mt-4 text-xs text-slate-400">
                Importante: se escolher “Fazer sozinho”, você preencherá o cadastro e simulará o pagamento.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
