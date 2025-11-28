// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* HERO PRINCIPAL */}
        <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-emerald-400 text-xs font-semibold mb-2">
              INGLÊS PARA SITUAÇÕES REAIS
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Domine o inglês que você
              <span className="text-emerald-400"> realmente usa</span>.
            </h1>
            <p className="text-slate-300 mb-6 text-sm md:text-base">
              Check-in em aeroportos, imigração, leitura de manuais, telas de sistemas,
              reuniões de trabalho, filmes e vídeos em inglês. O WiMEX-UP é um curso
              100% online focado em situações reais, com um professor-avatar que prende
              sua atenção.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => navigate('/cadastro')}
                className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 font-semibold text-slate-900 text-sm"
              >
                Quero me matricular
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 rounded-full border border-slate-600 hover:border-emerald-400 text-sm"
              >
                Já sou aluno
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Acesso online, no seu ritmo, com módulos pensados para o seu dia a dia.
            </p>
          </div>

          {/* Card lateral – benefícios principais */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4">
            <p className="text-sm text-emerald-400 font-semibold">
              Por que o WiMEX-UP é diferente?
            </p>
            <ul className="space-y-3 text-sm text-slate-200">
              <li>
                <span className="text-emerald-400 mr-1">✓</span>
                Avatar de IA disponível 24h para treinar conversação e pronúncia.
              </li>
              <li>
                <span className="text-emerald-400 mr-1">✓</span>
                Foco total em situações reais: viagens, trabalho, reuniões e lazer.
              </li>
              <li>
                <span className="text-emerald-400 mr-1">✓</span>
                Plataforma simples, pensada para quem não tem tempo a perder.
              </li>
              <li>
                <span className="text-emerald-400 mr-1">✓</span>
                Conteúdos atualizados e acesso de qualquer dispositivo.
              </li>
            </ul>
            <div className="mt-4 text-xs text-slate-400">
              Assim que a matrícula é confirmada, você recebe login e senha para acessar
              todos os módulos disponíveis.
            </div>
          </div>
        </section>

        {/* SEÇÃO COMO FUNCIONA */}
        <section className="bg-slate-900/40 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-semibold mb-6">
              Como funciona o WiMEX-UP?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Matricule-se</h3>
                <p className="text-slate-300">
                  Faça seu cadastro em poucos minutos, escolha a forma de pagamento
                  e ative o acesso à plataforma de estudos.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Crie seu avatar</h3>
                <p className="text-slate-300">
                  Configure seu professor virtual e personalize sua experiência para
                  acompanhar seu estilo de aprendizado.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Estude no seu tempo</h3>
                <p className="text-slate-300">
                  Acesse os módulos quando quiser, do computador ou celular, com aulas
                  curtas, práticas e diretas ao ponto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO PLANOS / INVESTIMENTO */}
        <section className="border-t border-slate-800 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Um único investimento, acesso vitalício
              </h2>
              <p className="text-sm text-slate-300 mb-4">
                Você paga uma vez e pode revisar as aulas sempre que quiser. Sem mensalidade,
                sem pegadinha. Ideal para quem quer aprender com calma e revisar antes de
                viagens, entrevistas e momentos importantes.
              </p>
              <ul className="text-sm text-slate-300 space-y-2 mb-4">
                <li>• 30 módulos práticos divididos por níveis</li>
                <li>• Atualizações incluídas</li>
                <li>• Suporte ao aluno por e-mail</li>
                <li>• Certificado digital de conclusão</li>
              </ul>
            </div>

            <div className="bg-slate-900/80 border border-emerald-500/60 rounded-3xl p-6 text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-emerald-400 font-semibold mb-2">
                ACESSO VITALÍCIO
              </p>
              <p className="text-4xl font-bold mb-1">R$ 197</p>
              <p className="text-xs text-slate-400 mb-4">
                ou 12x de R$ 19,90 no cartão*
              </p>
              <p className="text-xs text-slate-400 mb-4">
                *Valores e formas de pagamento demonstrativos. Integração real será ativada
                em versões futuras da plataforma.
              </p>
              <button
                onClick={() => navigate('/cadastro')}
                className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 font-semibold text-slate-900 text-sm mb-2"
              >
                Quero começar hoje
              </button>
              <button
                onClick={() => {
                  const contatoSection = document.getElementById('contato-section');
                  if (contatoSection) {
                    contatoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-2.5 rounded-full border border-slate-700 hover:border-emerald-400 text-xs text-slate-200"
              >
                Falar com um consultor
              </button>
            </div>
          </div>
        </section>

        {/* SEÇÃO NÍVEIS / MÓDULOS */}
        <section className="bg-slate-900/40 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-semibold mb-6">
              30 módulos em 3 níveis
            </h2>

            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                <p className="text-xs text-emerald-400 font-semibold mb-1">BÁSICO</p>
                <p className="font-semibold mb-2">Comece do zero, sem medo</p>
                <ul className="text-slate-300 space-y-1">
                  <li>• Saudações e apresentações</li>
                  <li>• Rotina diária e horários</li>
                  <li>• Compras simples e pedidos básicos</li>
                  <li>• Primeiras viagens internacionais</li>
                </ul>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                <p className="text-xs text-emerald-400 font-semibold mb-1">INTERMEDIÁRIO</p>
                <p className="font-semibold mb-2">Ganhe confiança no dia a dia</p>
                <ul className="text-slate-300 space-y-1">
                  <li>• Hotéis e reservas</li>
                  <li>• Restaurantes e alimentação</li>
                  <li>• Transporte, trajetos e dúvidas de rota</li>
                  <li>• Conversas no ambiente de trabalho</li>
                </ul>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                <p className="text-xs text-emerald-400 font-semibold mb-1">AVANÇADO</p>
                <p className="font-semibold mb-2">Para ir além do básico</p>
                <ul className="text-slate-300 space-y-1">
                  <li>• Apresentações profissionais</li>
                  <li>• Reuniões e negociações</li>
                  <li>• Entrevistas e networking</li>
                  <li>• Cultura, filmes e debates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO CONTATO / FALE COM CONSULTOR */}
        <section
          id="contato-section"
          className="bg-slate-950 border-t border-slate-800"
        >
          <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Fale com um consultor
              </h2>
              <p className="text-sm text-slate-300 mb-4">
                Tem dúvida se o WiMEX-UP é para você? Envie seus dados e nossa equipe
                entra em contato para te orientar sobre o melhor caminho.
              </p>
              <p className="text-xs text-slate-500">
                Resposta em até 24h úteis, diretamente no seu WhatsApp ou e-mail.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
              {/* Formulário apenas visual por enquanto */}
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                    placeholder="Como você gostaria de ser chamado(a)?"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 font-semibold text-slate-900 text-sm"
                >
                  Enviar e receber contato em 24h
                </button>
                <p className="text-[11px] text-slate-500">
                  Este formulário é demonstrativo nesta versão. Em breve, os dados serão
                  enviados diretamente para nossa equipe de atendimento.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
