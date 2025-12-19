// src/App.js
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ConfirmEmail from "./pages/ConfirmEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Matricula from "./pages/Matricula";
import Planos from "./pages/Planos";
import Consultor from "./pages/Consultor";
import Module from "./pages/Module";
import Lesson from "./pages/Lesson";
import PagamentoSimulado from "./pages/PagamentoSimulado";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ====== PÚBLICAS ====== */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/matricula" element={<Matricula />} />
      <Route path="/pagamento" element={<PagamentoSimulado />} />
      <Route path="/confirmar" element={<ConfirmEmail />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="/consultor" element={<Consultor />} />

      {/* ====== PROTEGIDAS ====== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/module/:moduleId"
        element={
          <ProtectedRoute>
            <Module />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lesson/:moduleId/:lessonId"
        element={
          <ProtectedRoute>
            <Lesson />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
