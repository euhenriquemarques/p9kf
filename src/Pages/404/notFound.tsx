import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f0f0f0"
    >
      <Typography variant="h1" component="h1" color="primary">
        404
      </Typography>
      <Typography variant="h4" component="h2" color="textSecondary" mb={3}>
        Oops! Página não encontrada.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Voltar para a Página Inicial
      </Button>
    </Box>
  );
};

export default NotFound;
