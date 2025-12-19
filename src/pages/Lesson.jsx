import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

const ETAPAS = [
  "Diálogo em Português",
  "Diálogo em Inglês",
  "Speaking (voz)",
  "Gramática contextual"
];

export default function Lesson() {
  const { moduleId, lessonId } = useParams();
  const [etapaAtual, setEtapaAtual] = useState(0);

  function concluirEtapa() {
    if (etapaAtual < 3) {
      setEtapaAtual(etapaAtual + 1);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="h-20" />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">
          Módulo: {moduleId} | Lição {lessonId}
        </h1>

        {/* INDICADOR DE ETAPAS */}
        <div className="flex gap-2 mb-8">
          {ETAPAS.map((etapa, index) => (
            <div
              key={index}
              className={`flex-1 text-center py-2 rounded text-xs font-semibold
                ${
                  index === etapaAtual
                    ? "bg-wimex-blue text-black"
                    : "bg-slate-800 text-slate-400"
                }
              `}
            >
              {etapa}
            </div>
          ))}
        </div>

        {/* CONTEÚDO */}
        <div className="bg-[#071428] border border-slate-800 rounded-2xl p-6 min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4">
            {ETAPAS[etapaAtual]}
          </h2>

          <p className="text-slate-300 mb-6">
            Conteúdo da etapa {etapaAtual + 1} (vídeo, voz, exercícios).
          </p>

          <button
            onClick={concluirEtapa}
            className="bg-wimex-blue px-6 py-3 rounded-xl font-bold text-black"
          >
            Concluir etapa
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
