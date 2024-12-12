import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotAuthorized: React.FC = () => {
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
        403
      </Typography>
      <Typography variant="h4" component="h2" color="textSecondary" mb={3}>
      Acesso Negado
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Você não tem permissão para acessar esta página.
      </Button>
    </Box>
  );
};

export default NotAuthorized;
