import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import { iBanco } from "../../Interface/interface";


const Banco: React.FC = () => {
  const [formData, setFormData] = useState<iBanco>({
    id:0,
    codigo: "",
    descricao: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/banco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Sucesso
        setSnackbarMessage("Cadastro realizado com sucesso!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        // Limpar o formulário
        setFormData({
          id:0,
          codigo: "",
          descricao: "",
        });
      } else {
        // Erro
        const errorText = await response.text();
        setSnackbarMessage("Erro ao realizar o cadastro: " + errorText);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setSnackbarMessage("Erro ao realizar o cadastro.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
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

  const handleReset = () => {
    setFormData({
      id:0,
      codigo: "",
      descricao: "",
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
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
          <Typography>Banco</Typography>
        </Breadcrumbs>

        <form onSubmit={handleSubmit}>


          <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Código Banco"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

     
            <Grid item xs={12} md={9}>
              <TextField
                label="Descrição"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
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
      <Divider />
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

export default Banco;
