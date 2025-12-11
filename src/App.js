// src/App.js
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Matricula from './pages/Matricula';
import Dashboard from './pages/Dashboard';
import Planos from './pages/Planos';
import Consultor from './pages/Consultor';
import EscolherMatricula from './pages/EscolherMatricula';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/matricula" element={<Matricula />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="/consultor" element={<Consultor />} />
      <Route path="/escolher-matricula" element={<EscolherMatricula />} />
    </Routes>
  );
}

export default App;

