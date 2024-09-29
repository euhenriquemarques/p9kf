// src/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h6: {
      fontWeight: 700, // Bold para títulos
      fontSize: '1.25rem', // Ajuste do tamanho
    },
    button: {
      fontWeight: 500, // Semi-bold para botões
      fontSize: '1rem',
      textTransform: 'none', // Mantém o texto como está, sem transformação para maiúsculas
    },
    body1: {
      fontSize: '1rem',
    },
  },
  palette: {
    primary: {
      main: '#1976d2', // Azul padrão do MUI
    },
    secondary: {
      main: '#dc004e', // Cor secundária, se necessário
    },
  },
});

export default theme;
