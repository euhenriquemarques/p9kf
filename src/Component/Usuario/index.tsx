import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const Usuario = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form); // Aqui você pode integrar com a API ou o backend
  };

  const handleReset = () => {
    setForm({
      nome: "",
      email: "",
      senha: "",
      dataNascimento: "",
    });
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: "90%",
          width: "100%",
          p: 3,
          boxShadow: 1,
          borderRadius: 3,
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumbs">
          <Typography>Cadastro</Typography>
          <Typography>Usuario</Typography>
        </Breadcrumbs>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "15px" }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Data de Nascimento"
                name="dataNascimento"
                type="date"
                value={form.dataNascimento}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "15px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "15px" }}
                required
              />{" "}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Senha"
                name="senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "15px" }}
                required
              />{" "}
            </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="button"
                onClick={handleReset}
                variant="outlined"
                color="secondary"
                sx={{ mr: 2 }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Salvar
              </Button>
            </Box>
        
        </form>
      </Card>
      {/* Snackbar para Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Usuario;
