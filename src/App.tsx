// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Usuario from "./Component/Usuario/index";
import Navbar from "./Component/Navbar/index";
import Banco from "./Component/Banco";
import { Box } from "@mui/material";
import LandingPage from "./Pages/Publico/LandingPage";
import Principal from "./Pages/Principal";
import Categoria from "./Component/Categoria";
import Conta from "./Component/Conta";
import DadosPagamento from "./Component/DadosPagamento";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Box sx={{ backgroundColor: "#0e0f15", minHeight: "100vh" }}>
          <Navbar />
          <hr />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cadastro" element={<Principal />}>
              <Route path="/cadastro/adm" element={ <> <Banco /> <Usuario />  </> } />
              <Route path="/cadastro/categoria" element={<Categoria />} />
              <Route path="/cadastro/conta" element={<Conta />} />
              <Route path="/cadastro/dadosPagamento" element={<DadosPagamento />} />
            </Route>
          </Routes>
        </Box>
      </div>
    </Router>
  );
};

export default App;
