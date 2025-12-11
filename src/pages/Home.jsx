// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AvatarHero() {
  return (
    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-xl">
      <svg width="90" height="90" viewBox="0 0 24 24" fill="none" className="text-black">
        {/* Cabeça */}
        <circle cx="12" cy="8" r="3.2" fill="black" opacity="0.9" />
        {/* Corpo */}
        <path
          d="M4 20c0-4 4-6 8-6s8 2 8 6"
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="pt-28 flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-b from-black to-slate-900">
          <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

            {/* Texto principal */}
            <div>
              <p className="text-emerald-400 text-xs font-semibold tracking-widest mb-3">
                INGLÊS PRÁTICO E DIRETO AO PONTO
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                O inglês que você{" "}
                <span className="text-emerald-400">usa na vida real</span>.
              </h1>

              <p className="text-slate-300 text-base mb-8 max-w-xl">
                Método focado em situações reais — viagem, trabalho, atendimento e cotidiano.
                Micro-aulas, diálogos, simulações e um tutor-avatar para treinar sempre que quiser.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/matricula")}
                  className="px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm"
                >
                  Fazer matrícula
                </button>

                <button
                  onClick={() => navigate("/consultor")}
                  className="px-7 py-3 rounded-full border border-slate-700 hover:border-emerald-400 text-sm"
                >
                  Falar com consultor
                </button>
              </div>

              <div className="mt-6 text-xs text-slate-400">
                Aulas curtas, acesso vitalício no plano certo e prática com tutor-avatar 24h.
              </div>
            </div>

            {/* Avatar + porque escolher */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <AvatarHero />

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 w-full md:w-80 text-center">
                <div className="text-emerald-400 font-semibold mb-1">
                  Por que escolher WIMEX-UP?
                </div>
                <ul className="mt-2 text-slate-300 text-sm space-y-2 text-left">
                  <li>• Foco em comunicação e situações reais</li>
                  <li>• Micro-aulas (estude rápido)</li>
                  <li>• Tutor-avatar para treinar pronúncia</li>
                  <li>• Acesso vitalício nos planos selecionados</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* METODOLOGIA */}
        <section id="method" className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-6">Metodologia</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-2">Aprenda com contexto</h3>
                <p className="text-slate-300 text-sm">
                  Conteúdo baseado em situações reais — viagem, trabalho e cotidiano.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-2">Prática com tutor-avatar</h3>
                <p className="text-slate-300 text-sm">
                  Converse, repita e aperfeiçoe sua pronúncia com feedback imediato.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-2">Micro-aulas</h3>
                <p className="text-slate-300 text-sm">
                  Aulas pequenas para estudar no seu tempo — progrida sem pressão.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PARA QUEM É */}
        <section id="who" className="py-20 bg-black border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-6">Para quem é o curso?</h2>

            <p className="text-slate-300 text-base max-w-3xl mb-10">
              O curso WIMEX-UP foi desenvolvido para adultos que querem aprender inglês de forma prática,
              rápida e aplicada ao dia a dia. Ideal para:
            </p>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
                <h3 className="font-semibold text-emerald-400 mb-2">Iniciantes</h3>
                <p className="text-slate-300 text-sm">
                  Quem nunca estudou inglês e busca um método simples e direto ao ponto.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
                <h3 className="font-semibold text-emerald-400 mb-2">Profissionais</h3>
                <p className="text-slate-300 text-sm">
                  Quem precisa usar inglês no trabalho, reuniões e atendimento.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
                <h3 className="font-semibold text-emerald-400 mb-2">Quem já estudou, mas não fala</h3>
                <p className="text-slate-300 text-sm">
                  Pessoas que fizeram cursos mas ainda não conseguem conversar de verdade.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CITIES */}
        <section className="py-20 bg-black border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-6">Explore módulos temáticos</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                <h4 className="font-semibold text-emerald-400 mb-2">Travel — Aeroporto</h4>
                <p className="text-slate-300 text-sm mb-3">
                  Pratique check-in, imigração e vocabulário real.
                </p>
                <button onClick={() => navigate("/planos")} className="py-2 px-3 rounded-full border border-slate-700 text-sm">
                  Ver módulo
                </button>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                <h4 className="font-semibold text-emerald-400 mb-2">Business — Reuniões</h4>
                <p className="text-slate-300 text-sm mb-3">
                  Negociações, apresentações e diálogos profissionais.
                </p>
                <button onClick={() => navigate("/planos")} className="py-2 px-3 rounded-full border border-slate-700 text-sm">
                  Ver módulo
                </button>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                <h4 className="font-semibold text-emerald-400 mb-2">Everyday — Restaurante</h4>
                <p className="text-slate-300 text-sm mb-3">
                  Vocabulário e conversas reais do dia a dia.
                </p>
                <button onClick={() => navigate("/planos")} className="py-2 px-3 rounded-full border border-slate-700 text-sm">
                  Ver módulo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PLANOS resumo */}
        <section id="plans" className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="md:flex md:items-center md:justify-between mb-8 gap-6">
              <div>
                <h2 className="text-3xl font-semibold">Planos disponíveis</h2>
                <p className="text-slate-400 text-sm">Escolha antes da matrícula.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black p-6 rounded-3xl border border-slate-700 flex flex-col">
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">Plano Recorrente</h3>
                <p className="text-3xl font-bold">R$ 149,90</p>
                <p className="text-xs text-slate-400 mb-4">por mês • 10x</p>
                <ul className="text-slate-300 text-sm mb-4 space-y-1">
                  <li>• Acesso enquanto pagar</li>
                  <li>• Pode migrar para vitalício</li>
                </ul>
                <button
                  onClick={() => navigate("/matricula?plan=recorrente")}
                  className="mt-auto w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
                >
                  Escolher plano
                </button>
              </div>

              <div className="bg-black p-6 rounded-3xl border border-emerald-500 flex flex-col">
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">Plano Vitalício</h3>
                <p className="text-3xl font-bold">R$ 179,90</p>
                <p className="text-xs text-slate-400 mb-4">10x • ou à vista</p>
                <p className="text-slate-300 text-sm mb-4">
                  À vista: R$ {(179.9 * 10 * 0.9).toFixed(2)}
                </p>
                <button
                  onClick={() => navigate("/matricula?plan=vitalicio")}
                  className="mt-auto w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
                >
                  Escolher plano
                </button>
              </div>

              <div className="bg-black p-6 rounded-3xl border border-slate-700 flex flex-col">
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">Perfil Extra</h3>
                <p className="text-3xl font-bold">+ R$ 40</p>
                <p className="text-xs text-slate-400 mb-4">por mês (adicional)</p>
                <p className="text-slate-300 text-sm mb-4">Adicione outro perfil ao seu plano.</p>
                <button
                  onClick={() => navigate("/matricula")}
                  className="mt-auto w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-black border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-6">Dúvidas frequentes</h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <p className="font-semibold">O curso é 100% online?</p>
                <p className="text-slate-300 mt-1">
                  Sim! Aulas, exercícios, diálogos e tutor-avatar — tudo pelo seu celular ou computador.
                </p>
              </div>

              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <p className="font-semibold">Terei acesso vitalício?</p>
                <p className="text-slate-300 mt-1">Sim! No plano Vitalício você tem acesso para sempre.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO / CONSULTOR */}
        <section id="contato-section" className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Fale com um consultor</h2>
              <p className="text-slate-300 mb-3">
                Quer ajuda para escolher seu plano ou prefere que finalizemos sua matrícula?
                Envie seus dados e nossa equipe entra em contato.
              </p>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Atendimento personalizado</li>
                <li>• Ajuda para escolher plano</li>
                <li>• Matrícula feita pelo consultor</li>
              </ul>
            </div>

            <div className="bg-black p-6 rounded-xl border border-slate-700">
              <form onSubmit={(e) => { e.preventDefault(); navigate("/consultor"); }}>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-full text-black font-semibold"
                  >
                    Quero contato
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 mt-3">
                  Um consultor entrará em contato em até 24h úteis.
                </p>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
