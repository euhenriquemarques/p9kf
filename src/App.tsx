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
import Despesa from "./Component/Despesa";
import ExtratoDespesa from "./Component/ExtratoDespesa";
import Saldo from "./Component/Saldo";
import DashboardLayoutBasic from "./Component/Sidebar/sidebar";
import NotFound from "./Pages/404/notFound";
import HomePage from "./Component/Dashboard";
import Cartao from "./Component/Cartao";
import DespesaCartao from "./Component/DespesaCartao";
import ExtratoDespesaCartao from "./Component/ExtratoDespesaCartao";
import Receita from "./Component/Receita";
import ExtratoReceita from "./Component/ExtratoReceita";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Login from "./Component/Login";
import NotAuthorized from "./Pages/403/NotAuthorized";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Box sx={{ backgroundColor: "#0e0f15", minHeight: "100vh" }}>
          <Navbar />
          <hr />

          <Routes>
            {/* Rotas públicas */}
            <Route path="/price" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Rotas que utilizam o layout de dashboard */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Principal>
                    <DashboardLayoutBasic />
                  </Principal>
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<HomePage />} />
              {/* Sub-rotas dentro de Dashboard */}
              <Route
                path="/cadastro/adm"
                element={
                  <ProtectedRoute requiredRole="ROLE_ADM">
                    <>
                      <Banco />
                      <Usuario />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route path="/cadastro/categoria" element={<ProtectedRoute requiredRole="ROLE_ADM">
                <><Categoria />  </>
                </ProtectedRoute>} />
              <Route path="/cadastro/cartao" element={<Cartao />} />
              <Route path="/cadastro/conta" element={<Conta />} />
              <Route path="/cadastro/dadosPagamento" element={<DadosPagamento />} />
              <Route path="/cadastro/despesa" element={<Despesa />} />
              <Route path="/cadastro/receita" element={<Receita />} />
              <Route path="/cadastro/despesaCartao" element={<DespesaCartao />} />
              <Route path="/cadastro/despesa/extrato" element={<ExtratoDespesa />} />
              <Route path="/cadastro/despesa/extratoCartao" element={<ExtratoDespesaCartao />} />
              <Route path="/cadastro/receita/extratoReceita" element={<ExtratoReceita />} />
              <Route path="/saldo" element={<Saldo />} />
            </Route>
                  {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />

          </Routes>
        </Box>
      </div>
    </Router>
  );
};

export default App;
