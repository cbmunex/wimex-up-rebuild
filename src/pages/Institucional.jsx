// src/pages/Institucional.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Institucional() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <button onClick={() => navigate("/")} className="mb-6 text-slate-300 hover:text-[#00F7FF] flex items-center gap-2">
          <span className="text-xl">←</span> Voltar para a página inicial
        </button>

        <h1 className="text-4xl font-bold mb-4">Quem somos</h1>
        <p className="text-slate-400 mb-8">WiMEX-UP: metodologia prática, IA e foco em resultados reais.</p>

        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl" style={{ background: "#071428", border: "1px solid rgba(0,168,232,0.05)" }}>
            <h3 className="text-[#00A8E8] font-semibold mb-2">Missão</h3>
            <p className="text-slate-300 text-sm">Capacitar pessoas para se comunicarem em inglês em contextos reais com confiança e autonomia.</p>
          </div>

          <div className="p-6 rounded-xl" style={{ background: "#071428", border: "1px solid rgba(0,168,232,0.05)" }}>
            <h3 className="text-[#00A8E8] font-semibold mb-2">Visão</h3>
            <p className="text-slate-300 text-sm">Ser referência nacional em ensino prático com tecnologia de IA aplicada ao aprendizado.</p>
          </div>

          <div className="p-6 rounded-xl" style={{ background: "#071428", border: "1px solid rgba(0,168,232,0.05)" }}>
            <h3 className="text-[#00A8E8] font-semibold mb-2">Valores</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Praticidade</li>
              <li>• Transparência</li>
              <li>• Inovação</li>
              <li>• Respeito</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Nossa metodologia</h2>
          <p className="text-slate-300">Módulos curtos, prática ativa, simulações reais e feedback automatizado para acelerar seu progresso.</p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
