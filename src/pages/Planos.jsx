// src/pages/Planos.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Planos() {
  const navigate = useNavigate();
  const [addProfile, setAddProfile] = useState(false);
  const [vitalPayment, setVitalPayment] = useState("parcelado");

  const vitalTotalParcelado = 179.9 * 10;
  const vitalAvista = (vitalTotalParcelado * 0.9).toFixed(2);

  function openEscolha(planKey) {
    // envia o plano selecionado para a tela de escolha
    navigate("/escolher-matricula", { state: { plan: planKey, addProfile } });
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="pt-28 px-6 max-w-6xl mx-auto w-full">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-slate-300 hover:text-[#00F7FF] flex items-center gap-2"
        >
          <span className="text-xl">←</span> Voltar para a página inicial
        </button>

        <h1 className="text-4xl font-bold mb-2">Planos</h1>
        <p className="text-slate-400 mb-6">Escolha o plano ideal antes da matrícula.</p>

        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm text-slate-300 inline-flex items-center gap-2">
            <input type="checkbox" checked={addProfile} onChange={() => setAddProfile(!addProfile)} className="h-4 w-4" />
            Adicionar perfil extra (+R$40 por parcela / mês)
          </label>

          <div className="ml-auto text-sm text-slate-500">
            Opção Vitalício:
            <button onClick={() => setVitalPayment("parcelado")} className={`ml-3 px-3 py-1 rounded-full ${vitalPayment==="parcelado" ? "bg-[#00F7FF] text-black" : "bg-[#071428] border border-slate-700 text-slate-300"}`}>Parcelado</button>
            <button onClick={() => setVitalPayment("avista")} className={`ml-2 px-3 py-1 rounded-full ${vitalPayment==="avista" ? "bg-[#00F7FF] text-black" : "bg-[#071428] border border-slate-700 text-slate-300"}`}>À vista (10%)</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Plano Recorrente */}
          <div className="p-6 rounded-2xl bg-[#071428] border border-[rgba(0,167,232,0.06)] shadow-sm flex flex-col">
            <h3 className="text-slate-200 font-semibold">Plano Recorrente</h3>
            <p className="text-4xl font-bold mt-3 text-white">R$ 149,90</p>
            <p className="text-slate-400 text-sm mt-1 mb-4">10x • pague mensalmente</p>
            <ul className="text-slate-300 text-sm mb-4 space-y-1">
              <li>• Acesso enquanto pagar</li>
              <li>• Pode migrar para vitalício</li>
              <li>• + R$40/perfil</li>
            </ul>
            <button
              onClick={() => openEscolha("recorrente")}
              className="mt-auto w-full py-3 rounded-full bg-[#00F7FF] hover:bg-[#00CFFF] text-black font-semibold transition"
            >
              Matricular-se
            </button>
          </div>

          {/* Plano Vitalício */}
          <div className="p-6 rounded-2xl bg-[#071428] border border-[rgba(0,167,232,0.12)] shadow-md flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-[#00F7FF] font-semibold">Plano Vitalício</h3>
              <div className="text-xs text-slate-400 px-2 py-1 rounded bg-white/5">Mais popular</div>
            </div>

            <p className="text-4xl font-bold mt-3 text-white">R$ 179,90</p>
            <p className="text-slate-400 text-sm mt-1 mb-4">10x • ou à vista</p>
            <p className="text-slate-300 text-sm mb-4">À vista: R$ {vitalAvista.replace(".", ",")} (10% OFF)</p>

            <button
              onClick={() => openEscolha("vitalicio")}
              className="mt-auto w-full py-3 rounded-full bg-[#00F7FF] hover:bg-[#00CFFF] text-black font-semibold transition"
            >
              Matricular-se
            </button>
          </div>

          {/* Perfil Extra */}
          <div className="p-6 rounded-2xl bg-[#071428] border border-[rgba(0,167,232,0.06)] shadow-sm flex flex-col">
            <h3 className="text-slate-200 font-semibold">Perfil Extra</h3>
            <p className="text-4xl font-bold mt-3 text-white">+ R$ 40</p>
            <p className="text-slate-400 text-sm mt-1 mb-4">por parcela / mês</p>
            <button
              onClick={() => openEscolha("perfil")}
              className="mt-auto w-full py-3 rounded-full bg-[#00F7FF] hover:bg-[#00CFFF] text-black font-semibold transition"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-6">Observação: valores demonstrativos — integração de pagamento será ativada em breve.</p>
      </div>

      <Footer />
    </div>
  );
}
