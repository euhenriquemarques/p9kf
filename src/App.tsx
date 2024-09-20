// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Usuario from './pages/cadastro/usuario/index';
// import About from './pages/About';
// import Contact from './pages/Contact';
import Navbar from './componentes/index';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navbar para navegação entre as páginas */}
        <Navbar />
        
        {/* Definição das rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadatro/usuario" element={<Usuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
