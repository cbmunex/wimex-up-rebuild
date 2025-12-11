// src/pages/Matricula.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Matricula() {
  const navigate = useNavigate();
  const location = useLocation();

  // se foi passado via navigate(..., { state: { plan: 'vitalicio' } })
  const prePlan = (location.state && location.state.plan) || null;
  const preAddProfile = (location.state && location.state.addProfile) || false;

  const [step, setStep] = useState(1);

  // Dados pessoais
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [telefone, setTelefone] = useState("");

  // Endereço
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // Plano
  const plans = {
    recorrente: { label: "Recorrente (10x R$149,90)", months: 10, price: 149.9, type: "recorrente" },
    vitalicio: { label: "Vitalício (10x R$179,90)", months: 10, price: 179.9, type: "vitalicio" },
    perfil: { label: "Perfil Extra (+R$40)", months: 1, price: 40.0, type: "perfil" },
  };
  const [plan, setPlan] = useState(prePlan || "recorrente");
  const extraValue = 40.0; // R$40 por perfil extra
  const [addProfile, setAddProfile] = useState(preAddProfile);
  const [extraName, setExtraName] = useState("");
  const [extraCpf, setExtraCpf] = useState("");
  const [extraNascimento, setExtraNascimento] = useState("");
  const [extraEmail, setExtraEmail] = useState("");

  // Conta
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Pagamento simulado
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'pix' | 'boleto'
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  // Calcula valores
  function calcValues() {
    const p = plans[plan] || plans.recorrente;
    const baseMonthly = p.price;
    let monthly = baseMonthly;
    let total = baseMonthly * p.months;

    if (plan === "recorrente") {
      if (addProfile) {
        monthly += extraValue;
        total = monthly * p.months;
      } else {
        monthly = baseMonthly;
        total = baseMonthly * p.months;
      }
    } else if (plan === "vitalicio") {
      total = baseMonthly * p.months;
      if (addProfile) {
        total += extraValue * p.months;
      }
      monthly = total / p.months;
    } else if (plan === "perfil") {
      monthly = baseMonthly;
      total = baseMonthly; // perfil adicional cobrado separado
    }

    const totalVista = (plan === "vitalicio") ? +(total * 0.9).toFixed(2) : +total.toFixed(2);

    return {
      monthly: monthly.toFixed(2),
      total: total.toFixed(2),
      installments: p.months,
      totalVista,
    };
  }

  const values = calcValues();

  useEffect(() => {
    if (prePlan) setPlan(prePlan);
    if (preAddProfile) setAddProfile(true);
    // eslint-disable-next-line
  }, [prePlan, preAddProfile]);

  // Navegação entre steps
  function handleNext() {
    setError("");

    if (step === 1) {
      if (!nome.trim() || !cpf.trim()) {
        setError("Por favor preencha Nome completo e CPF para continuar.");
        return;
      }
    }

    if (step === 3) {
      if (!email.trim() || !password) {
        setError("Por favor crie e confirme sua senha.");
        return;
      }
      if (password.length < 6) {
        setError("A senha deve ter ao menos 6 caracteres.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Senha e confirmação não batem.");
        return;
      }
    }

    setStep((s) => Math.min(s + 1, 4));
  }

  function handleBack() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  // Simula pagamento e finaliza matrícula
  function handlePay(e) {
    e.preventDefault();
    setError("");

    if (!paymentMethod) {
      setError("Escolha a forma de pagamento.");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      const matriculaNumber = `WMX-${Date.now().toString().slice(-6)}`;

      const aluno = {
        matricula: matriculaNumber,
        nome,
        cpf,
        rg,
        nascimento,
        telefone,
        endereco: { cep, rua, numero, complemento, bairro, cidade, estado },
        plan,
        addProfile,
        profileExtra: addProfile ? { nome: extraName, cpf: extraCpf, nascimento: extraNascimento, email: extraEmail } : null,
        account: { email },
        payment: {
          method: paymentMethod,
          installments: paymentMethod === "card" ? values.installments : 1,
          monthly: values.monthly,
          total: paymentMethod === "pix" && plan === "vitalicio" ? values.totalVista : values.total,
        },
        createdAt: new Date().toISOString(),
      };

      // salvar localmente para testes
      const storageKey = "wimex-matriculas";
      const prev = JSON.parse(localStorage.getItem(storageKey) || "[]");
      prev.unshift(aluno);
      localStorage.setItem(storageKey, JSON.stringify(prev));

      // autenticar localmente
      localStorage.setItem("wimex-auth", "ok");
      localStorage.setItem("wimex-user-email", email);

      navigate("/dashboard", { replace: true });
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="h-20" />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12">
        <div className="bg-[#071428] border border-[rgba(0,167,232,0.06)] rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-semibold">Matrícula — Inscrição</h1>
            <div className="text-sm text-slate-400">Passo {step} de 4</div>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-6">
            <div className={`flex-1 py-2 text-center rounded ${step >= 1 ? 'bg-[#00F7FF] text-black' : 'bg-slate-800 text-slate-400'}`}>1. Dados</div>
            <div className={`flex-1 py-2 text-center rounded ${step >= 2 ? 'bg-[#00F7FF] text-black' : 'bg-slate-800 text-slate-400'}`}>2. Plano</div>
            <div className={`flex-1 py-2 text-center rounded ${step >= 3 ? 'bg-[#00F7FF] text-black' : 'bg-slate-800 text-slate-400'}`}>3. Conta</div>
            <div className={`flex-1 py-2 text-center rounded ${step >= 4 ? 'bg-[#00F7FF] text-black' : 'bg-slate-800 text-slate-400'}`}>4. Pagamento</div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300">Nome completo</label>
                  <input value={nome} onChange={(e)=>setNome(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-300">CPF</label>
                  <input value={cpf} onChange={(e)=>setCpf(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-300">RG</label>
                  <input value={rg} onChange={(e)=>setRg(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Data de nascimento</label>
                  <input value={nascimento} onChange={(e)=>setNascimento(e.target.value)} type="date" className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-300">WhatsApp</label>
                  <input value={telefone} onChange={(e)=>setTelefone(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-300">CEP</label>
                  <input value={cep} onChange={(e)=>setCep(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Rua</label>
                  <input value={rua} onChange={(e)=>setRua(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Número</label>
                  <input value={numero} onChange={(e)=>setNumero(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-300">Complemento</label>
                  <input value={complemento} onChange={(e)=>setComplemento(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Bairro</label>
                  <input value={bairro} onChange={(e)=>setBairro(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Cidade</label>
                  <input value={cidade} onChange={(e)=>setCidade(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300">Estado</label>
                <input value={estado} onChange={(e)=>setEstado(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
              </div>

              {error && <p className="text-sm text-amber-400">{error}</p>}

              <div className="flex justify-between mt-4">
                <button onClick={handleBack} className="px-4 py-2 rounded bg-transparent border border-slate-700 text-slate-300">Voltar</button>
                <button onClick={handleNext} className="px-6 py-2 rounded bg-[#00F7FF] text-black font-semibold">Próximo</button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Escolha seu plano</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <label className={`p-4 rounded-2xl cursor-pointer ${plan==='recorrente' ? 'bg-[rgba(0,247,255,0.04)] border border-[rgba(0,167,232,0.12)]' : 'bg-[#071428]' }`}>
                  <div className="flex items-start gap-3">
                    <input type="radio" name="plan" checked={plan==='recorrente'} onChange={()=>setPlan('recorrente')} />
                    <div>
                      <div className="font-semibold text-white">Recorrente — 10x R$149,90</div>
                      <div className="text-sm text-slate-400">Pagamento mensal por 10 meses. Acesso enquanto pagar.</div>
                    </div>
                  </div>
                </label>

                <label className={`p-4 rounded-2xl cursor-pointer ${plan==='vitalicio' ? 'bg-[rgba(0,247,255,0.04)] border border-[rgba(0,167,232,0.12)]' : 'bg-[#071428]' }`}>
                  <div className="flex items-start gap-3">
                    <input type="radio" name="plan" checked={plan==='vitalicio'} onChange={()=>setPlan('vitalicio')} />
                    <div>
                      <div className="font-semibold text-white">Vitalício — 10x R$179,90 (ou à vista com 10% off)</div>
                      <div className="text-sm text-slate-400">Acesso permanente. À vista recebe 10% de desconto sobre o total.</div>
                    </div>
                  </div>
                </label>
              </div>

              <div className="mt-4">
                <label className="inline-flex items-center gap-3">
                  <input type="checkbox" checked={addProfile} onChange={(e)=>setAddProfile(e.target.checked)} />
                  <span className="text-sm text-slate-300">Adicionar 1 perfil extra (+ R$40,00 por mês)</span>
                </label>

                {addProfile && (
                  <div className="mt-3 grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-300">Nome do perfil</label>
                      <input value={extraName} onChange={(e)=>setExtraName(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300">CPF do perfil</label>
                      <input value={extraCpf} onChange={(e)=>setExtraCpf(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300">Data de nascimento</label>
                      <input value={extraNascimento} onChange={(e)=>setExtraNascimento(e.target.value)} type="date" className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-300">E-mail</label>
                      <input value={extraEmail} onChange={(e)=>setExtraEmail(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#071428] p-4 rounded-lg border border-[rgba(0,167,232,0.06)] mt-4 text-sm">
                <div className="flex justify-between">
                  <div>Parcelas</div>
                  <div className="text-white">{values.installments}x de R$ {values.monthly}</div>
                </div>
                <div className="flex justify-between text-slate-400 text-sm mt-1">
                  <div>Total</div>
                  <div>R$ {values.total}</div>
                </div>

                {plan === 'vitalicio' && (
                  <div className="mt-2 text-xs text-slate-400">
                    Valor à vista (10% desconto): R$ {values.totalVista}
                  </div>
                )}
              </div>

              {error && <p className="text-sm text-amber-400">{error}</p>}

              <div className="flex justify-between mt-4">
                <button onClick={handleBack} className="px-4 py-2 rounded bg-transparent border border-slate-700 text-slate-300">Voltar</button>
                <button onClick={handleNext} className="px-6 py-2 rounded bg-[#00F7FF] text-black font-semibold">Próximo</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Crie sua conta</h3>
              <p className="text-sm text-slate-400">Dados de acesso para entrar na plataforma.</p>

              <div>
                <label className="text-xs text-slate-300">E-mail</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300">Senha</label>
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Confirmar senha</label>
                  <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                </div>
              </div>

              {error && <p className="text-sm text-amber-400">{error}</p>}

              <div className="flex justify-between mt-4">
                <button onClick={handleBack} className="px-4 py-2 rounded bg-transparent border border-slate-700 text-slate-300">Voltar</button>
                <button onClick={handleNext} className="px-6 py-2 rounded bg-[#00F7FF] text-black font-semibold">Próximo</button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Pagamento (simulação)</h3>
              <p className="text-sm text-slate-400">Escolha a forma de pagamento — esta versão apenas simula o checkout.</p>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded border border-slate-700 bg-[#071428]">
                  <input type="radio" name="pay" checked={paymentMethod==='card'} onChange={()=>setPaymentMethod('card')} />
                  <div>
                    <div className="font-semibold text-white">Cartão de crédito</div>
                    <div className="text-sm text-slate-400">{values.installments}x de R$ {values.monthly}</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded border border-slate-700 bg-[#071428]">
                  <input type="radio" name="pay" checked={paymentMethod==='pix'} onChange={()=>setPaymentMethod('pix')} />
                  <div>
                    <div className="font-semibold text-white">PIX (à vista)</div>
                    <div className="text-sm text-slate-400">Pagamento à vista. Para Vitalício usamos valor com desconto se escolher vista.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded border border-slate-700 bg-[#071428]">
                  <input type="radio" name="pay" checked={paymentMethod==='boleto'} onChange={()=>setPaymentMethod('boleto')} />
                  <div>
                    <div className="font-semibold text-white">Boleto</div>
                    <div className="text-sm text-slate-400">Pagamento por boleto (simulado).</div>
                  </div>
                </label>
              </div>

              <form onSubmit={handlePay} className="space-y-4 mt-4">
                {paymentMethod === "card" && (
                  <>
                    <div>
                      <label className="text-xs text-slate-300">Nome no cartão</label>
                      <input required className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <input placeholder="Número do cartão" required className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                      <input placeholder="MM/AA" required className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                      <input placeholder="CVC" required className="w-full rounded-lg border border-slate-700 bg-black px-3 py-2 text-sm text-white" />
                    </div>
                  </>
                )}

                {paymentMethod === "pix" && (
                  <div className="bg-[#071428] p-4 rounded border border-[rgba(0,167,232,0.06)] text-sm">
                    <p>Ao confirmar, será exibida uma instrução de PIX (simulação).</p>
                    {plan === "vitalicio" && (
                      <p className="mt-2">Valor à vista com 10% de desconto: R$ {values.totalVista}</p>
                    )}
                    {plan !== "vitalicio" && <p className="mt-2">Valor total: R$ {values.total}</p>}
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="bg-[#071428] p-4 rounded border border-[rgba(0,167,232,0.06)] text-sm">
                    <p>Será gerado um boleto (simulado) com instruções de pagamento.</p>
                    <p className="mt-2">Valor total: R$ {values.total}</p>
                  </div>
                )}

                {error && <p className="text-sm text-amber-400">{error}</p>}

                <div className="flex justify-between items-center">
                  <button type="button" onClick={handleBack} className="px-4 py-2 rounded bg-transparent border border-slate-700 text-slate-300">Voltar</button>
                  <button type="submit" disabled={processing} className="px-6 py-2 rounded bg-[#00F7FF] text-black font-semibold">
                    {processing ? "Processando..." : "Confirmar pagamento"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 mt-4">
          Prefere que um consultor finalize sua matrícula? Volte para a página inicial e clique em "Fale com consultor".
        </p>
      </main>

      <Footer />
    </div>
  );
}
