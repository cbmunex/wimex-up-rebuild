// src/pages/ConsultorAdmin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@aws-amplify/auth";

/*
  Fluxo:
  - As solicitações são salvas em localStorage no key 'wimex-consultor-requests'
  - Formato de cada item:
    { id, nome, email, mensagem, plan, addProfile, vitalPayment, createdAt, status }
  - Aqui o consultor pode: marcar como 'em andamento' ou 'atendida'
*/

function readRequests() {
  try {
    const raw = localStorage.getItem("wimex-consultor-requests");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRequests(list) {
  localStorage.setItem("wimex-consultor-requests", JSON.stringify(list));
}

export default function ConsultorAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch {
        navigate("/login");
      }

      setRequests(readRequests());
    }
    load();
  }, [navigate]);

  function toggleStatus(id) {
    const next = requests.map((r) =>
      r.id === id ? { ...r, status: r.status === "open" ? "doing" : r.status === "doing" ? "done" : "done" } : r
    );
    setRequests(next);
    saveRequests(next);
  }

  function removeRequest(id) {
    const next = requests.filter((r) => r.id !== id);
    setRequests(next);
    saveRequests(next);
  }

  function mockNewRequest() {
    // Gera uma solicitação de teste (apenas para o admin ver)
    const now = Date.now();
    const newReq = {
      id: `req-${now}`,
      nome: "Solicitante de Teste",
      email: "teste@exemplo.com",
      mensagem: "Preciso de ajuda para matricular no plano Vitalício à vista.",
      plan: "vitalicio",
      addProfile: false,
      vitalPayment: "avista",
      createdAt: now,
      status: "open",
    };
    const next = [newReq, ...requests];
    setRequests(next);
    saveRequests(next);
  }

  if (!user)
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Carregando...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Painel do Consultor</h1>
            <p className="text-slate-400 text-sm">Bem-vindo, {user.username ?? user.attributes?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={mockNewRequest}
              className="py-2 px-3 rounded bg-emerald-500 text-black font-semibold"
            >
              + Criar solicitação teste
            </button>
            <button
              onClick={() => { localStorage.removeItem("wimex-consultor-requests"); setRequests([]); }}
              className="py-2 px-3 rounded border border-slate-700 text-slate-300"
            >
              Limpar tudo
            </button>
          </div>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          {requests.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              Nenhuma solicitação no momento.
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((r) => (
                <div key={r.id} className="p-4 bg-slate-950/60 rounded-lg border border-slate-800 flex flex-col md:flex-row md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold">{r.nome} <span className="text-xs text-slate-400 ml-2">({r.email})</span></p>
                        <p className="text-xs text-slate-400">{new Date(r.createdAt).toLocaleString()}</p>
                      </div>

                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded ${r.status === 'open' ? 'bg-emerald-500 text-black' : r.status === 'doing' ? 'bg-yellow-400 text-black' : 'bg-slate-700 text-slate-300'}`}>
                          {r.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 mt-3 text-sm">{r.mensagem}</p>

                    <div className="mt-3 text-xs text-slate-400 space-y-1">
                      <p>Plano: {r.plan}</p>
                      <p>Pagamento vitalício: {r.vitalPayment ?? '-'}</p>
                      <p>Perfil extra: {r.addProfile ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                    <button onClick={() => toggleStatus(r.id)} className="py-2 px-3 rounded bg-emerald-500 text-black font-semibold">
                      {r.status === "open" ? "Iniciar" : r.status === "doing" ? "Marcar como atendido" : "Reabrir"}
                    </button>

                    <button onClick={() => removeRequest(r.id)} className="py-2 px-3 rounded border border-slate-700 text-slate-300">
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-4">
          Observação: este painel usa localStorage apenas para demonstração. Podemos integrar com um backend (DynamoDB/Lambda) quando desejar.
        </p>
      </div>
    </div>
  );
}
