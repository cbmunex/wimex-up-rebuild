// src/pages/Consultor.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Consultor() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("Brasil");
  const [ddi, setDdi] = useState("+55");
  const [telefone, setTelefone] = useState("");
  const [modalidade, setModalidade] = useState("online");
  const [mensagem, setMensagem] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function saveRequest() {
    const key = "wimex-consultor-requests";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const req = {
      id: "req-" + Date.now(),
      nome, email, pais, ddi, telefone, modalidade, mensagem, createdAt: new Date().toISOString(), status: "pendente"
    };
    stored.unshift(req);
    localStorage.setItem(key, JSON.stringify(stored));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !email || !telefone) {
      alert("Por favor preencha nome, e-mail e telefone.");
      return;
    }
    if (!consent) {
      alert("Você precisa concordar com a política para receber comunicações.");
      return;
    }
    saveRequest();
    setSubmitted(true);
    setNome(""); setEmail(""); setTelefone(""); setMensagem(""); setConsent(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <button onClick={() => navigate("/")} className="mb-6 text-slate-300 hover:text-[#00F7FF] flex items-center gap-2">
          <span className="text-xl">←</span> Voltar para a página inicial
        </button>

        <section className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-4xl font-bold mb-3">Fale com um consultor</h1>
            <p className="text-slate-300 mb-6">Preencha seus dados e um consultor fará sua matrícula, explicará planos e concluirá o pagamento se desejar.</p>

            <ul className="text-slate-300 space-y-2">
              <li>• Atendimento personalizado</li>
              <li>• Ajuda para escolher planos</li>
              <li>• Processamos sua matrícula para você</li>
            </ul>
          </div>

          <div>
            <div className="bg-[#071428] p-6 rounded-2xl border" style={{ borderColor: "rgba(0,168,232,0.06)" }}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-300">Nome completo*</label>
                    <input value={nome} onChange={(e)=>setNome(e.target.value)} className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm" required />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300">E-mail*</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm" required />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-slate-300">País</label>
                      <select value={pais} onChange={(e)=>setPais(e.target.value)} className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm">
                        <option>Brasil</option>
                        <option>Estados Unidos</option>
                        <option>Portugal</option>
                        <option>Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300">DDI</label>
                      <input value={ddi} onChange={(e)=>setDdi(e.target.value)} className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm" />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300">WhatsApp*</label>
                      <input value={telefone} onChange={(e)=>setTelefone(e.target.value)} className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300">Modalidade</label>
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={()=>setModalidade("online")} className={`px-3 py-1 rounded-full ${modalidade==="online" ? "bg-[#00A8E8] text-black" : "bg-slate-800"}`}>Online</button>
                      <button type="button" onClick={()=>setModalidade("presencial")} className={`px-3 py-1 rounded-full ${modalidade==="presencial" ? "bg-[#00A8E8] text-black" : "bg-slate-800"}`}>Presencial</button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300">Mensagem (opcional)</label>
                    <textarea value={mensagem} onChange={(e)=>setMensagem(e.target.value)} className="w-full bg-black border border-slate-700 rounded-lg px-3 py-2 text-sm h-20"></textarea>
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} />
                    <label className="text-xs text-slate-300">Concordo em receber comunicações da WiMEX-UP (Política de Privacidade)</label>
                  </div>

                  <div>
                    <button type="submit" className="w-full py-3 rounded-full font-semibold" style={{ background: "#00A8E8", color: "#000" }}>Quero que entrem em contato</button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">Solicitação enviada!</h3>
                  <p className="text-slate-300 mb-4">Em até 24 horas úteis um consultor entrará em contato.</p>
                  <button onClick={() => setSubmitted(false)} className="px-4 py-2 rounded-full border border-slate-700">Enviar nova solicitação</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
