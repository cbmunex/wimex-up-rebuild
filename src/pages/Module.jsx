import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { COURSE_MODULES } from "../data/courseStructure";

export default function Module() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const module = COURSE_MODULES[moduleId];

  if (!module) {
    return <p className="text-white p-10">Módulo não encontrado</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="h-20" />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">{module.titulo}</h1>

        <div className="space-y-4">
          {module.licoes.map((licao) => (
            <div
              key={licao.id}
              onClick={() =>
                navigate(`/lesson/${moduleId}/${licao.id}`)
              }
              className="cursor-pointer bg-[#071428] border border-slate-800 rounded-xl p-5 hover:border-wimex-blue transition"
            >
              <h2 className="text-lg font-semibold">
                Lição {licao.id} – {licao.titulo}
              </h2>
              <p className="text-sm text-slate-400">
                4 etapas • progresso obrigatório
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
