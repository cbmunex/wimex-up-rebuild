import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";

const API_URL = process.env.REACT_APP_API_URL || "/api";
const XP_POR_ACERTO = 10;

export default function Lesson() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [licao, setLicao] = useState(null);
  const [erroCarregamento, setErroCarregamento] = useState(false);
  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState(null);
  const [xpGanho, setXpGanho] = useState(0);
  const [concluida, setConcluida] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const modulo = await import(`../data/licoes/${moduleId}.json`);
        const licaoEncontrada = modulo.default.licoes.find(
          (l) => String(l.id) === String(lessonId)
        );

        if (!licaoEncontrada) {
          setErroCarregamento(true);
          return;
        }

        setLicao({ ...licaoEncontrada, moduloTitulo: modulo.default.titulo });
      } catch (err) {
        console.error(err);
        setErroCarregamento(true);
      }
    }

    carregar();
  }, [moduleId, lessonId]);

  async function responder(opcao, i) {
    if (selecionada !== null) return;
    setSelecionada(i);

    if (opcao.correta) {
      setXpGanho((xp) => xp + XP_POR_ACERTO);
    }

    setTimeout(async () => {
      if (indice < licao.cards.length - 1) {
        setIndice((idx) => idx + 1);
        setSelecionada(null);
      } else {
        await finalizarLicao();
      }
    }, 1100);
  }

  async function finalizarLicao() {
    setConcluida(true);
    setSalvando(true);

    try {
      const token = localStorage.getItem("wimexup_token");
      await fetch(`${API_URL}/gamificacao/xp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ xp_ganho: xpGanho || XP_POR_ACERTO }),
      });
      await refreshUser();
    } catch (err) {
      console.error("Erro ao salvar XP:", err);
    } finally {
      setSalvando(false);
    }
  }

  if (erroCarregamento) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col">
        <Header />
        <div className="h-20" />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Conteudo em producao</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Essa licao ainda esta sendo preparada pela nossa equipe. Volte em breve!
          </p>
          <button
            onClick={() => navigate(`/module/${moduleId}`)}
            className="px-6 py-3 rounded-xl bg-blue-600 font-semibold"
          >
            Voltar ao modulo
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!licao) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Carregando licao...</p>
      </div>
    );
  }

  if (concluida) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col">
        <Header />
        <div className="h-20" />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-4xl mb-6">
              🎉
            </div>
            <h1 className="text-2xl font-bold mb-2">Licao concluida!</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {licao.moduloTitulo} — {licao.titulo}
            </p>
            <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl px-6 py-4 mb-8 inline-block shadow-md dark:shadow-none">
              <p className="text-blue-400 font-bold text-lg">
                +{xpGanho || XP_POR_ACERTO} XP
              </p>
              {salvando && (
                <p className="text-xs text-slate-500 mt-1">Salvando progresso...</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate(`/module/${moduleId}`)}
                className="px-6 py-3 rounded-xl bg-blue-600 font-semibold"
              >
                Voltar ao modulo
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
              >
                Ir para o Dashboard
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const card = licao.cards[indice];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col">
      <Header />
      <div className="h-20" />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <h1 className="text-xl font-bold mb-1">
          {licao.moduloTitulo} — {licao.titulo}
        </h1>
        <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">
          Passo {indice + 1} de {licao.cards.length}
        </p>

        <div className="flex gap-1.5 mb-8">
          {licao.cards.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < indice
                  ? "bg-blue-500"
                  : i === indice
                  ? "bg-blue-500/50"
                  : "bg-slate-200 dark:bg-slate-800"
              }`}
            />
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-3xl p-5 mb-6 flex gap-4 items-start shadow-md dark:shadow-none">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold shrink-0">
            W
          </div>
          <p className="text-slate-800 dark:text-slate-100 text-base leading-relaxed pt-1">
            {card.professor}
          </p>
        </div>

        <div className="space-y-3">
          {card.opcoes.map((op, i) => {
            const mostrarCorreta = selecionada !== null && op.correta;
            const mostrarErrada = selecionada === i && !op.correta;

            return (
              <button
                key={i}
                onClick={() => responder(op, i)}
                disabled={selecionada !== null}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all ${
                  mostrarCorreta
                    ? "border-green-500 bg-green-500/10 text-green-300"
                    : mostrarErrada
                    ? "border-red-500 bg-red-500/10 text-red-300"
                    : "border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200"
                }`}
              >
                {op.texto}
              </button>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
