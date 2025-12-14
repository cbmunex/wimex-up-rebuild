// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AvatarHero() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center animate-float">
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-full bg-wimex-blue/20 blur-xl animate-pulse-soft"></div>

      {/* Container Principal */}
      <div className="relative w-full h-full rounded-full bg-slate-800 flex items-center justify-center shadow-xl overflow-hidden z-10 border-4 border-wimex-blue/30 shadow-wimex-blue/20">
        {/*
          TODO: Substitua o src abaixo pela imagem do seu avatar 3D (ex: /images/avatar-3d.png)
          Você pode colocar a imagem na pasta 'public/images' e referenciar aqui.
        */}
        <img
          src="https://placehold.co/400x400/10b981/ffffff?text=Your+3D\nAvatar"
          alt="Avatar 3D"
          className="w-full h-full object-cover"
        />
      </div>
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
              <p className="text-wimex-blue text-xs font-semibold tracking-widest mb-3 uppercase">
                Inglês prático e direto ao ponto
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                O inglês que você{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wimex-blue via-blue-400 to-wimex-metallic">
                  usa na vida real
                </span>.
              </h1>

              <p className="text-slate-300 text-base mb-8 max-w-xl">
                Método focado em situações reais — viagem, trabalho, atendimento e cotidiano.
                Micro-aulas, diálogos, simulações e um tutor-avatar para treinar sempre que quiser.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/matricula")}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-wimex-blue to-wimex-blue-dark hover:from-wimex-blue-dark hover:to-wimex-blue text-white font-semibold text-sm shadow-lg shadow-wimex-blue/30 transition-all active:scale-95"
                >
                  Fazer matrícula
                </button>

                <button
                  onClick={() => navigate("/consultor")}
                  className="px-7 py-3 rounded-full border border-slate-700 hover:border-wimex-blue text-sm transition-colors hover:text-wimex-blue hover:shadow-[0_0_15px_rgba(0,102,255,0.3)]"
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

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 w-full md:w-80 text-center backdrop-blur-sm">
                <div className="text-wimex-blue font-semibold mb-1 drop-shadow-sm">
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
            <div className="mb-12">
              <h2 className="text-3xl font-semibold mb-4">Metodologia inspirada no seu crescimento</h2>
              <p className="text-slate-300 max-w-3xl">
                Aqui, você aprende o idioma aplicado na prática em situações reais de acordo com o tema do seu interesse.
                Nosso foco principal é o <strong className="text-wimex-metallic">Professional Personal Development</strong>:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-wimex-blue/50 transition-colors group">
                <h3 className="text-wimex-blue font-semibold mb-2 group-hover:text-blue-400 transition-colors">Coaching and Public Speaking</h3>
                <p className="text-slate-400 text-sm">
                  Aprimore sua comunicação e desenvolva sua oratória enquanto aprende inglês. Falar em público sem medo.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-wimex-blue/50 transition-colors group">
                <h3 className="text-wimex-blue font-semibold mb-2 group-hover:text-blue-400 transition-colors">Time management and negotiation</h3>
                <p className="text-slate-400 text-sm">
                  Gerencie seu tempo e aprenda sobre negociação para transformar seus resultados profissionais.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-wimex-blue/50 transition-colors group">
                <h3 className="text-wimex-blue font-semibold mb-2 group-hover:text-blue-400 transition-colors">Teamwork and Leadership</h3>
                <p className="text-slate-400 text-sm">
                  Aprenda a língua enquanto desenvolve habilidades de liderança e avança na sua carreira.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-wimex-blue/50 transition-colors group">
                <h3 className="text-wimex-blue font-semibold mb-2 group-hover:text-blue-400 transition-colors">Strategic Planning</h3>
                <p className="text-slate-400 text-sm">
                  Crie seu próprio plano estratégico em inglês e aprimore habilidades para o mundo dos negócios.
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
              O curso WIMEX-UP foi desenvolvido para adultos que querem aprender inglês de forma prática, independente do nível.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-wimex-blue/30 transition-colors">
                <h3 className="font-semibold text-wimex-blue mb-2">Iniciantes</h3>
                <p className="text-slate-300 text-sm">
                  Quem nunca estudou inglês e busca um método simples e direto ao ponto.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-wimex-blue/30 transition-colors">
                <h3 className="font-semibold text-wimex-blue mb-2">Profissionais</h3>
                <p className="text-slate-300 text-sm">
                  Quem precisa usar inglês no trabalho, reuniões e atendimento.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-wimex-blue/30 transition-colors">
                <h3 className="font-semibold text-wimex-blue mb-2">Quem já estudou</h3>
                <p className="text-slate-300 text-sm">
                  Pessoas que fizeram cursos mas ainda travam na hora de falar e precisam de confiança.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MÓDULOS CITIES */}
        <section className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <span className="bg-wimex-blue text-white px-3 py-1 text-xs font-bold rounded uppercase tracking-wider shadow-lg shadow-wimex-blue/40">
                Módulos Cities
              </span>
              <h2 className="text-3xl font-semibold mt-4 mb-2">Tour por grandes cidades</h2>
              <p className="text-slate-400">
                Estude inglês enquanto conhece pontos turísticos onde o idioma é nativo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-black p-5 rounded-2xl border border-slate-700 hover:border-wimex-blue transition-all cursor-pointer group hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                <div className="h-40 bg-slate-800 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80"
                    alt="New York"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <h4 className="font-bold text-white mb-1 group-hover:text-wimex-blue transition-colors">Nova York</h4>
                <p className="text-xs text-slate-500 mb-3">5 lições | 15 passos</p>
                <p className="text-slate-400 text-sm">
                  Conheça a Times Square e a Estátua da Liberdade enquanto aprende.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-black p-5 rounded-2xl border border-slate-700 hover:border-wimex-blue transition-all cursor-pointer group hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                <div className="h-40 bg-slate-800 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
                    alt="San Francisco"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <h4 className="font-bold text-white mb-1 group-hover:text-wimex-blue transition-colors">São Francisco</h4>
                <p className="text-xs text-slate-500 mb-3">5 lições | 15 passos</p>
                <p className="text-slate-400 text-sm">
                  Visite a Costa Oeste, Alamo Square e Alcatraz.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-black p-5 rounded-2xl border border-slate-700 hover:border-wimex-blue transition-all cursor-pointer group hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                <div className="h-40 bg-slate-800 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=600&q=80"
                    alt="Miami"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <h4 className="font-bold text-white mb-1 group-hover:text-wimex-blue transition-colors">Miami</h4>
                <p className="text-xs text-slate-500 mb-3">5 lições | 15 passos</p>
                <p className="text-slate-400 text-sm">
                  Aprenda descrições e narrações conhecendo Miami Beach.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-black p-5 rounded-2xl border border-slate-700 hover:border-wimex-blue transition-all cursor-pointer group hover:shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                <div className="h-40 bg-slate-800 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1569230516306-5a8cb5586399?auto=format&fit=crop&w=600&q=80"
                    alt="Philadelphia"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <h4 className="font-bold text-white mb-1 group-hover:text-wimex-blue transition-colors">Filadélfia</h4>
                <p className="text-xs text-slate-500 mb-3">5 lições | 15 passos</p>
                <p className="text-slate-400 text-sm">
                  História dos EUA e o Liberty Bell com narrações em inglês.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MÓDULOS TRAVEL */}
        <section className="py-20 bg-black border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10 text-right">
              <span className="bg-wimex-blue text-white px-3 py-1 text-xs font-bold rounded uppercase tracking-wider shadow-lg shadow-wimex-blue/40">
                Módulos Travel
              </span>
              <h2 className="text-3xl font-semibold mt-4 mb-2">Imersão em Viagens</h2>
              <p className="text-slate-400">
                Sinta segurança para falar inglês em qualquer etapa da sua viagem.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:bg-slate-900 hover:border-wimex-blue/50 transition-all group">
                <h4 className="text-wimex-blue font-bold mb-2 group-hover:text-blue-400 transition-colors">Aeroporto</h4>
                <p className="text-sm text-slate-300">Vocabulário de check-in, imigração e malas.</p>
              </div>
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:bg-slate-900 hover:border-wimex-blue/50 transition-all group">
                <h4 className="text-wimex-blue font-bold mb-2 group-hover:text-blue-400 transition-colors">Restaurantes</h4>
                <p className="text-sm text-slate-300">Faça pedidos, reservas e entenda o menu.</p>
              </div>
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:bg-slate-900 hover:border-wimex-blue/50 transition-all group">
                <h4 className="text-wimex-blue font-bold mb-2 group-hover:text-blue-400 transition-colors">Hotel</h4>
                <p className="text-sm text-slate-300">Check-in, reservas e resolver problemas na estadia.</p>
              </div>
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:bg-slate-900 hover:border-wimex-blue/50 transition-all group">
                <h4 className="text-wimex-blue font-bold mb-2 group-hover:text-blue-400 transition-colors">Compras</h4>
                <p className="text-sm text-slate-300">Interagir em lojas, pagar e pedir informações.</p>
              </div>
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:bg-slate-900 hover:border-wimex-blue/50 transition-all group">
                <h4 className="text-wimex-blue font-bold mb-2 group-hover:text-blue-400 transition-colors">Transportes</h4>
                <p className="text-sm text-slate-300">Usar metrô, ônibus, táxis e pedir direções.</p>
              </div>
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:bg-slate-900 hover:border-wimex-blue/50 transition-all group">
                <h4 className="text-wimex-blue font-bold mb-2 group-hover:text-blue-400 transition-colors">Dirigindo</h4>
                <p className="text-sm text-slate-300">Aluguel de carros, regras de trânsito e postos.</p>
              </div>
            </div>

            <div className="mt-8 text-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-white text-lg font-semibold mb-2">Tem muito mais!</h3>
              <p className="text-slate-400 text-sm mb-4">Parques Temáticos, Viajante, Esportes e Jogos, Pé na Estrada...</p>
              <button onClick={() => navigate('/matricula')} className="text-wimex-blue font-semibold hover:underline text-sm hover:text-blue-400 transition-colors">
                Ver todos os planos →
              </button>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10 text-center">O que nossos alunos dizem</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black p-8 rounded-3xl border border-slate-800 relative">
                <span className="text-6xl text-wimex-blue/20 absolute top-4 left-6">“</span>
                <p className="text-slate-300 text-sm relative z-10 pt-4 mb-6">
                  Eu tenho me surpreendido cada dia mais com a metodologia. Videoaulas de qualidade, exercícios práticos e objetivos. O inglês da Wimex-up está permitindo me projetar e concorrer no mercado internacional.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-wimex-blue font-bold shadow-lg shadow-wimex-blue/10">M</div>
                  <div>
                    <p className="font-semibold text-white text-sm">Marcelo Dias</p>
                    <p className="text-xs text-slate-500">Aluno Wimex-up</p>
                  </div>
                </div>
              </div>

              <div className="bg-black p-8 rounded-3xl border border-slate-800 relative">
                <span className="text-6xl text-wimex-blue/20 absolute top-4 left-6">“</span>
                <p className="text-slate-300 text-sm relative z-10 pt-4 mb-6">
                  Recomendo pela qualidade das aulas e pelo conteúdo rico que facilita o aprendizado. Sempre tive dificuldade com a língua, mas com esse curso eu estou evoluindo.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-wimex-blue font-bold shadow-lg shadow-wimex-blue/10">H</div>
                  <div>
                    <p className="font-semibold text-white text-sm">Carvalho da Silva</p>
                    <p className="text-xs text-slate-500">Aluno Wimex-up</p>
                  </div>
                </div>
              </div>

              <div className="bg-black p-8 rounded-3xl border border-slate-800 relative">
                <span className="text-6xl text-wimex-blue/20 absolute top-4 left-6">“</span>
                <p className="text-slate-300 text-sm relative z-10 pt-4 mb-6">
                  Sou professora de inglês. Recomendo a Wimex-up sobretudo para colegas, para aprendermos vocabulário na prática e estarmos sempre em contato com a língua.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-wimex-blue font-bold shadow-lg shadow-wimex-blue/10">E</div>
                  <div>
                    <p className="font-semibold text-white text-sm">Ester Queiroz</p>
                    <p className="text-xs text-slate-500">Professora</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLANOS resumo */}
        <section id="plans" className="py-20 bg-black border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="md:flex md:items-center md:justify-between mb-8 gap-6">
              <div>
                <h2 className="text-3xl font-semibold">Planos disponíveis</h2>
                <p className="text-slate-400 text-sm">Inicie seus estudos hoje mesmo.</p>
              </div>
            </div>

            {/* Simples repetição dos planos originais para manter funcionalidade */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700 flex flex-col">
                <h3 className="text-xl font-semibold text-wimex-blue mb-2">Plano Recorrente</h3>
                <p className="text-3xl font-bold">R$ 149,90</p>
                <p className="text-xs text-slate-400 mb-4">por mês • sem fidelidade</p>
                <ul className="text-slate-300 text-sm mb-4 space-y-1">
                  <li>• Acesso total à plataforma</li>
                  <li>• Todos os módulos (Travel, Cities, Business)</li>
                  <li>• Certificado a cada 50 horas</li>
                </ul>
                <button
                  onClick={() => navigate("/matricula?plan=recorrente")}
                  className="mt-auto w-full py-3 rounded-full bg-gradient-to-r from-wimex-blue to-wimex-blue-dark hover:from-wimex-blue-dark hover:to-wimex-blue text-white font-semibold shadow-lg shadow-wimex-blue/20"
                >
                  Assinar agora
                </button>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-3xl border border-wimex-blue flex flex-col relative overflow-hidden shadow-2xl shadow-wimex-blue/10">
                <div className="absolute top-0 right-0 bg-wimex-blue text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-md">MAIS VENDIDO</div>
                <h3 className="text-xl font-semibold text-wimex-blue mb-2">Plano Vitalício</h3>
                <p className="text-3xl font-bold">R$ 179,90</p>
                <p className="text-xs text-slate-400 mb-4">10x no cartão</p>
                <p className="text-slate-300 text-sm mb-4">
                  Pague uma única vez e tenha acesso para sempre a todas as atualizações.
                </p>
                <button
                  onClick={() => navigate("/matricula?plan=vitalicio")}
                  className="mt-auto w-full py-3 rounded-full bg-gradient-to-r from-wimex-blue to-wimex-blue-dark hover:from-wimex-blue-dark hover:to-wimex-blue text-white font-semibold shadow-lg shadow-wimex-blue/30 scale-105 active:scale-100 transition-all"
                >
                  Quero acesso vitalício
                </button>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700 flex flex-col">
                <h3 className="text-xl font-semibold text-wimex-blue mb-2">Teste seu inglês</h3>
                <p className="text-slate-300 text-sm mb-4 mt-2">
                  Não sabe por onde começar? Faça nosso teste gratuito e descubra seu nível.
                </p>
                <button
                  onClick={() => window.alert("Funcionalidade em desenvolvimento!")}
                  className="mt-auto w-full py-3 rounded-full border border-slate-600 hover:border-wimex-blue hover:text-wimex-blue text-white font-semibold transition-colors"
                >
                  Fazer teste
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10 text-center">Dúvidas frequentes</h2>

            <div className="space-y-4">
              <div className="bg-black/50 p-5 rounded-xl border border-slate-800">
                <p className="font-semibold text-wimex-blue mb-2">01. O curso é 100% online?</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Sim! A Wimex-up é um curso completo e independente, com conteúdos e metodologia adaptadas para o formato digital. Você estuda onde e quando quiser.
                </p>
              </div>

              <div className="bg-black/50 p-5 rounded-xl border border-slate-800">
                <p className="font-semibold text-wimex-blue mb-2">02. Como funcionam os módulos?</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Os módulos são agrupados por temas (Travel, Business, Cities). Em cada lição, você assiste a um episódio real, faz atividades de compreensão, aula de vocabulário e gramática.
                </p>
              </div>

              <div className="bg-black/50 p-5 rounded-xl border border-slate-800">
                <p className="font-semibold text-wimex-blue mb-2">03. Preciso seguir uma ordem?</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Você tem liberdade! Pode escolher o tema que mais te motiva. Se for iniciante, recomendamos seguir a ordem sugerida dentro dos módulos "Português-Inglês" para facilitar.
                </p>
              </div>

              <div className="bg-black/50 p-5 rounded-xl border border-slate-800">
                <p className="font-semibold text-wimex-blue mb-2">04. Tem certificado?</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Sim! A cada 50 horas de estudo comprovadas (módulos concluídos e atividades feitas), você recebe um certificado de progressão.
                </p>
              </div>

              <div className="bg-black/50 p-5 rounded-xl border border-slate-800">
                <p className="font-semibold text-wimex-blue mb-2">05. Terei acesso vitalício?</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Sim, se optar pelo Plano Vitalício. No plano recorrente, você tem acesso enquanto sua assinatura estiver ativa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO / CONSULTOR */}
        <section id="contato-section" className="py-20 bg-black border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Ainda com dúvidas?</h2>
              <p className="text-slate-300 mb-6">
                Fale com um de nossos consultores para entender qual o melhor plano para o seu perfil.
              </p>
              <ul className="text-slate-300 text-sm space-y-3">
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-wimex-blue shadow shadow-wimex-blue/50"></span> Atendimento personalizado via WhatsApp</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-wimex-blue shadow shadow-wimex-blue/50"></span> Ajuda para escolher seu plano</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-wimex-blue shadow shadow-wimex-blue/50"></span> Suporte para matrícula</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
              <form onSubmit={(e) => { e.preventDefault(); navigate("/consultor"); }}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold ml-1">Seu nome</label>
                    <input
                      type="text"
                      placeholder="Ex: Maria Silva"
                      className="w-full bg-black border border-slate-700 rounded-lg px-4 py-3 text-sm focus:border-wimex-blue focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase font-bold ml-1">WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full bg-black border border-slate-700 rounded-lg px-4 py-3 text-sm focus:border-wimex-blue focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-wimex-blue to-wimex-blue-dark hover:from-wimex-blue-dark hover:to-wimex-blue rounded-full text-white font-bold uppercase tracking-wide transition-all shadow-lg shadow-wimex-blue/20"
                  >
                    Falar com consultor
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-4 text-center">
                  Ao enviar, você concorda com nossa política de privacidade.
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
