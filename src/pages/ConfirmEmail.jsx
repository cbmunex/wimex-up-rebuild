import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmSignUp } from "@aws-amplify/auth";

export default function ConfirmEmail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function handleConfirm(e) {
    e.preventDefault();
    setError("");

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      navigate("/login");
    } catch (err) {
      setError("Código inválido ou expirado.");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleConfirm}
        className="bg-[#071428] p-6 rounded w-96"
      >
        <h1 className="text-xl mb-4">Confirmar e-mail</h1>

        <input
          className="w-full bg-black border border-slate-700 rounded px-3 py-2"
          placeholder="Código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <button className="w-full mt-4 bg-[#00F7FF] text-black py-2 rounded">
          Confirmar
        </button>
      </form>
    </div>
  );
}
