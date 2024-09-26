// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Usuario from './pages/cadastro/usuario/index';
import Navbar from './componentes/navbar/index';
import Banco from './componentes/banco';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar para navegação entre as páginas */}
        <Navbar />
        
        {/* Definição das rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro/usuario" element={<Usuario />} />
          <Route path="/cadastro/banco" element={<Banco />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
