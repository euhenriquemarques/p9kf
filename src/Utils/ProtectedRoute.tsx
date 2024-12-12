import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Nova prop para especificar a role necessária
}

interface DecodedToken {
  exp?: number;
  role?: string; // Certifique-se de que o token JWT contém a role
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);

    // Verificar a role, se necessário
    if (requiredRole && decodedToken.role !== requiredRole) {
      return <Navigate to="/not-authorized" />; // Redirecionar para uma página de "não autorizado"
    }
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
