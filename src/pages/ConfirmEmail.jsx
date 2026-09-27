import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-[#071428] p-6 rounded w-96 text-center">
        <h1 className="text-xl mb-4">Tudo certo!</h1>
        <p className="text-slate-300 text-sm mb-6">
          Sua conta já está confirmada automaticamente — não é preciso nenhum código.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-[#00F7FF] text-black py-2 rounded font-semibold"
        >
          Ir para o login
        </button>
      </div>
    </div>
  );
}
