import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

const modulosCidades = [
  {
    id: "new-york",
    titulo: "New York",
    descricao: "Times Square e Estátua da Liberdade"
  },
  {
    id: "san-francisco",
    titulo: "San Francisco",
    descricao: "Costa Oeste, Alamo Square e Alcatraz"
  },
  {
    id: "miami",
    titulo: "Miami",
    descricao: "Miami Beach, descrições e narrações"
  },
  {
    id: "philadelphia",
    titulo: "Philadelphia",
    descricao: "História dos EUA e Liberty Bell"
  }
];

const modulosTravel = [
  { id: "aeroporto", titulo: "Aeroporto", descricao: "Check-in e imigração" },
  { id: "restaurantes", titulo: "Restaurantes", descricao: "Pedidos e atendimento" },
  { id: "hotel", titulo: "Hotel", descricao: "Check-in e serviços" },
  { id: "compras", titulo: "Compras", descricao: "Lojas e pagamentos" },
  { id: "transportes", titulo: "Transportes", descricao: "Ônibus, metrô e táxi" },
  { id: "dirigindo", titulo: "Dirigindo", descricao: "Aluguel e trânsito" },
  { id: "parques-tematicos", titulo: "Parques Temáticos", descricao: "Atrações" },
  { id: "viajante", titulo: "Viajante", descricao: "Situações imprevistas" },
  { id: "esportes", titulo: "Esportes e Jogos", descricao: "Eventos esportivos" },
  { id: "pe-na-estrada", titulo: "Pé na Estrada", descricao: "Road trip" }
];

function Section({ title, items, navigate }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/module/${item.id}`)}
            className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-6 hover:border-wimex-blue transition shadow-md dark:shadow-none"
          >
            <h3 className="text-lg font-semibold">{item.titulo}</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              {item.descricao}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white">
      <Header />
      <div className="p-8 pt-28 max-w-7xl mx-auto">
        {user && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl px-6 py-4 shadow-md dark:shadow-none">
            <div>
              <p className="text-xl font-bold">Olá, {user.nome || user.email} 👋</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-orange-500 dark:text-orange-400 font-bold text-sm">
                🔥 {user.streak_atual || 0} {user.streak_atual === 1 ? "dia" : "dias"}
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-sm">
                ⚡ {user.xp || 0} XP
              </div>
              <span className="px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wide">
                Plano {user.plano || "gratuito"}
              </span>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-10">
          Sua jornada de aprendizado
        </h1>

      {/* CIDADES */}
      <Section
        title="🌆 Módulos por Cidades"
        items={modulosCidades}
        navigate={navigate}
      />

      {/* TRAVEL */}
      <Section
        title="✈️ Travel – Imersão em Viagens"
        items={modulosTravel}
        navigate={navigate}
      />
      </div>
    </div>
  );
}
