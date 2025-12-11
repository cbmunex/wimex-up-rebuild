import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("register");
  const [msg, setMsg] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await Auth.signUp({ username: email, password });
      setStep("confirm");
    } catch (err) {
      setMsg(err.message);
    }
  }

  async function handleConfirm(e) {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(email, code);
      navigate("/login");
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        {step === "register" && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
              Criar Conta
            </h1>

            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label>Email</label>
                <input
                  className="w-full border rounded p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>

              <div>
                <label>Senha</label>
                <input
                  className="w-full border rounded p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>

              {msg && <p className="text-red-500 text-sm">{msg}</p>}

              <button
                type="submit"
                className="bg-blue-600 text-white w-full rounded p-2 font-semibold"
              >
                Criar Conta
              </button>
            </form>
          </>
        )}

        {step === "confirm" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Verifique seu e-mail
            </h1>

            <form onSubmit={handleConfirm} className="space-y-3">
              <div>
                <label>Código recebido:</label>
                <input
                  className="w-full border rounded p-2"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  required
                />
              </div>

              {msg && <p className="text-red-500 text-sm">{msg}</p>}

              <button
                type="submit"
                className="bg-green-600 text-white w-full rounded p-2 font-semibold"
              >
                Confirmar
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

