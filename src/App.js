import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pagamento from "./pages/Pagamento";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Hook de autenticação
import { useAuth } from "./hooks/useAuth";

// Rota privada (somente usuários logados podem acessar)
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-100">

        {/* Header fixo */}
        <Header />

        {/* Conteúdo das páginas */}
        <main className="flex-1">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/pagamento" element={<Pagamento />} />

            {/* Rota Privada */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Rota desconhecida */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Rodapé fixo */}
        <Footer />
      </div>
    </Router>
  );
}
