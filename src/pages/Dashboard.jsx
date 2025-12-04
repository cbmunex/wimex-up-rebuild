import React from "react";
import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await Auth.signOut();
    localStorage.removeItem("pagamento_ok");
    navigate("/login");
  }

  const pagou = localStorage.getItem("pagamento_ok") === "true";

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        Painel do Aluno
      </h1>

      <p className="text-lg mb-6">
        Bem-vindo, <span className="font-semibold">{user?.attributes?.email}</span>!
      </p>

      {/* STATUS DO PAGAMENTO */}
      {!pagou ? (
        <div className="bg-yellow-200 text-yellow-800 p-4 rounded-xl mb-8">
          <p className="font-semibold">⚠ Matrícula pendente</p>
          <p className="text-sm">Finalize o pagamento para acessar o curso completo.</p>
          <Link
            to="/pagamento"
            className="inline-block mt-3 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Ir para pagamento
          </Link>
        </div>
      ) : (
        <div className="bg-green-200 text-green-800 p-4 rounded-xl mb-8">
          <p className="font-semibold">✔ Matrícula ativa</p>
          <p className="text-sm">Você já tem acesso aos módulos do curso!</p>
        </div>
      )}

      {/* CARDS DO PAINEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-2">📘 Seus Módulos</h2>
          {pagou ? (
            <p className="text-gray-600">Conteúdos desbloqueados.</p>
          ) : (
            <p className="text-gray-400">Bloqueado até pagamento.</p>
          )}
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-2">🤖 Avatar IA</h2>
          <p className="text-gray-600">Em breve.</p>
        </div>

      </div>

      {/* BOTÃO SAIR */}
      <div className="mt-10">
        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Sair da Conta
        </button>
      </div>

    </div>
  );
}
