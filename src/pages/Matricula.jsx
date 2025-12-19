import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "@aws-amplify/auth";

import Header from "../components/Header";
import Footer from "../components/Footer";

/* ===============================
   FUNÇÕES DE MÁSCARA
================================ */
function maskCPF(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function maskCEP(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
}

/* ===============================
   COMPONENTE
================================ */
export default function Matricula() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Dados pessoais
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  // Endereço
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // Plano
  const [plano, setPlano] = useState("recorrente");

  // Conta
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  /* ===============================
     BUSCA CEP (ViaCEP)
  ================================ */
  async function buscarCEP(valor) {
    const cepLimpo = valor.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    try {
      const res = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await res.json();

      if (!data.erro) {
        setRua(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setEstado(data.uf || "");
      }
    } catch (err) {
      console.error("Erro ao buscar CEP", err);
    }
  }

  /* ===============================
     SUBMIT — AJUSTE FINAL (D)
  ================================ */
  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (
      !nome ||
      !cpf ||
      !telefone ||
      !cep ||
      !rua ||
      !numero ||
      !email ||
      !senha
    ) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (senha !== confirmSenha) {
      setErro("As senhas não conferem.");
      return;
    }

    try {
      setLoading(true);

      /* 1️⃣ CRIA USUÁRIO NO COGNITO (SÓ AUTENTICAÇÃO) */
      await signUp({
        username: email,
        password: senha,
        options: {
          userAttributes: {
            email,
            name: nome,
          },
        },
      });

      /* 2️⃣ SALVA MATRÍCULA COMO PENDENTE (CONTROLE DE ACESSO) */
      localStorage.setItem("matricula-status", "pendente");

      localStorage.setItem(
        "matricula-dados",
        JSON.stringify({
          nome,
          cpf,
          telefone,
          endereco: {
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
          },
          plano,
          email,
          status: "pendente",
          criadoEm: new Date().toISOString(),
        })
      );

      /* 3️⃣ VAI PARA CONFIRMAÇÃO DE E-MAIL */
      navigate("/confirmar", { state: { email } });

    } catch (err) {
      console.error(err);

      if (err.name === "UsernameExistsException") {
        setErro("Este e-mail já está cadastrado.");
      } else {
        setErro("Erro ao realizar matrícula.");
      }
    } finally {
      setLoading(false);
    }
  }

  /* ===============================
     UI
  ================================ */
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="h-20" />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10">
        <div className="bg-[#071428] border border-slate-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">
            Matrícula no curso
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* DADOS PESSOAIS */}
            <section>
              <h2 className="text-lg font-semibold mb-4">
                Dados pessoais
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="input"
                />

                <input
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(maskCPF(e.target.value))}
                  className="input"
                />

                <input
                  placeholder="Telefone"
                  value={telefone}
                  onChange={(e) =>
                    setTelefone(maskPhone(e.target.value))
                  }
                  className="input md:col-span-2"
                />
              </div>
            </section>

            {/* ENDEREÇO */}
            <section>
              <h2 className="text-lg font-semibold mb-4">
                Endereço
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  placeholder="CEP"
                  value={cep}
                  onChange={(e) => {
                    const v = maskCEP(e.target.value);
                    setCep(v);
                    buscarCEP(v);
                  }}
                  className="input"
                />

                <input
                  placeholder="Rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  className="input md:col-span-2"
                />

                <input
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="input"
                />

                <input
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="input"
                />

                <input
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="input"
                />

                <input
                  placeholder="Estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="input"
                />
              </div>
            </section>

            {/* PLANO */}
            <section>
            <h2 className="text-lg font-semibold mb-4">Plano</h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* RECORRENTE */}
              <label
                className={`cursor-pointer border rounded-2xl p-5 transition-all ${
                  plano === "recorrente"
                    ? "border-wimex-blue shadow-lg shadow-wimex-blue/20"
                    : "border-slate-700 hover:border-slate-500"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={plano === "recorrente"}
                  onChange={() => setPlano("recorrente")}
                />

                <h3 className="text-wimex-blue font-semibold text-lg mb-1">
                  Plano Recorrente
                </h3>

                <p className="text-2xl font-bold mb-1">R$ 149,90</p>
                <p className="text-xs text-slate-400 mb-3">por mês • sem fidelidade</p>

                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Acesso total à plataforma</li>
                  <li>• Todos os módulos</li>
                  <li>• Cancelamento a qualquer momento</li>
                </ul>
              </label>

              {/* VITALÍCIO */}
              <label
                className={`cursor-pointer border rounded-2xl p-5 transition-all relative ${
                  plano === "vitalicio"
                    ? "border-wimex-blue shadow-xl shadow-wimex-blue/30"
                    : "border-slate-700 hover:border-slate-500"
                }`}
              >
                <span className="absolute top-3 right-3 text-[10px] bg-wimex-blue text-black font-bold px-2 py-1 rounded">
                  MAIS VENDIDO
                </span>

                <input
                  type="radio"
                  className="hidden"
                  checked={plano === "vitalicio"}
                  onChange={() => setPlano("vitalicio")}
                />

                <h3 className="text-wimex-blue font-semibold text-lg mb-1">
                  Plano Vitalício
                </h3>

                <p className="text-2xl font-bold mb-1">R$ 179,90</p>
                <p className="text-xs text-slate-400 mb-2">
                  10x no cartão
                </p>
                <p className="text-xs text-green-400 mb-3">
                  ou R$ 161,91 à vista (10% OFF no PIX ou cartão)
                </p>

                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Acesso vitalício</li>
                  <li>• Todas as atualizações futuras</li>
                  <li>• Certificados ilimitados</li>
                </ul>
              </label>

            </div>
          </section>
            {/* CONTA */}
            <section>
              <h2 className="text-lg font-semibold mb-4">
                Dados de acesso
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />

                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="input"
                />

                <input
                  type="password"
                  placeholder="Confirmar senha"
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  className="input"
                />
              </div>
            </section>

            {erro && (
              <p className="text-red-400 text-sm">{erro}</p>
            )}

            <button
              disabled={loading}
              className="w-full bg-wimex-blue py-3 rounded-xl font-bold text-black hover:opacity-90 transition"
            >
              {loading ? "Finalizando matrícula..." : "Confirmar matrícula"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
