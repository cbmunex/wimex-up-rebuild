import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🔹 Enquanto valida autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Verificando acesso...
      </div>
    );
  }

  // 🔹 Não logado
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔹 Verificação de pagamento (temporária)
  const status = localStorage.getItem("matricula-status");

  if (status !== "pago") {
    return <Navigate to="/pagamento" replace />;
  }

  return children;
}

