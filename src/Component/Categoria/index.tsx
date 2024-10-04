import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Breadcrumbs,
  Link,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { iCategoria } from "../../Interface/interface";
import axios from "axios";


const Categoria: React.FC = () => {
  const [formData, setFormData] = useState<iCategoria>({
    id:0,
    descricao: "",
    movimentacao: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [listaCategoria, setListaCategoria] = useState<iCategoria[]>([]);
  const [tipoCategoriaLista, setTipoCategoriaLista] = useState<string[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (event: React.SyntheticEvent, value: iCategoria | null) => {
    if (value) {
      setFormData({
        id: value.id,
        movimentacao: value.movimentacao,
        descricao: value.descricao,
      });
    }
  };

  const buscarCategoria = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/categoria/todos",
        {
          params: {
            idUsuario: 1,
          },
        }
      );
      setListaCategoria(response.data);
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
    }
  };

  // Buscar a lista de bancos ao abrir o modal
  useEffect(() => {
    if (openModal && listaCategoria.length==0) {
      buscarCategoria();
    }
  }, [openModal]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!formData.descricao) {
      setSnackbarMessage("Descrição é obrigatória");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
    if (!formData.movimentacao) {
      setSnackbarMessage("Movimentaçao é obrigatória");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }

    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/categoria", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setSnackbarMessage("Cadastro realizado com sucesso!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          handleReset()
          buscarCategoria();
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
      descricao: "",
      movimentacao: "",
    });
  };

  async function buscarTipoCategoria() {
    try {
      const response = await fetch(
        "http://localhost:8080/categoria/tipoCategoria",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTipoCategoriaLista(data);
      } else {
        // Erro
        const errorText = await response.text();
        setSnackbarMessage("Erro ao buscar Tipo ");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }

  useEffect(
    () => {
      buscarTipoCategoria();
    },
    [ ]
  );

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
          <Typography>Categoria</Typography>
        </Breadcrumbs>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Grid item xs={12} md={9}>
              <TextField
                label="Descrição"
                name="descricao"
                value={formData.descricao}
                onChange={handleTextFieldChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="tipoCategoria-label">
                  Tipo de Categoria
                </InputLabel>
                <Select
                  labelId="tipoCategoria-label"
                  id="tipoCategoria"
                  name="movimentacao"
                  value={formData.movimentacao}
                  onChange={handleSelectChange}
                  label="Tipo de Categoria"
                >
                  {tipoCategoriaLista.map((tipo, index) => (
                    <MenuItem key={index} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={handleOpenModal}>
              Buscar 
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              variant="outlined"
              color="secondary"
              sx={{ mr: 2 ,ml: 1 }}
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
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { width: "80%", height: "40%" },
        }}
      >
        <DialogTitle>Selecionar Categoria</DialogTitle>
        <DialogContent>
          <FormControl   fullWidth>
           <Autocomplete
            options={listaCategoria}
            getOptionLabel={(option) => `${option.descricao}`}
            renderInput={(params) => (
              <TextField {...params} label="Buscar por Código ou Descrição" fullWidth margin="dense" />
            )}
            onChange={handleSelect}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained">
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar para Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
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

export default Categoria;
