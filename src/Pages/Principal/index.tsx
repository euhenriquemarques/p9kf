import React from "react";
import "@fontsource/anton";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

interface PrincipalProps {
  children?: React.ReactNode;
}

const Principal: React.FC<PrincipalProps> = ({ children }) => {
  return (
    <Box
      className="min-h-screen"
      sx={{
        backgroundColor: "#181818", // Fundo geral da página
      }}
    >
      {children} {/* Renderiza qualquer children passado para `Principal` */}
      <Outlet /> {/* Renderiza as sub-rotas */}
    </Box>
  );
};

export default Principal;
