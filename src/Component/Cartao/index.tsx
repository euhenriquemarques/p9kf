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
import {  iCartao } from "../../Interface/interface";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const Cartao: React.FC = () => {
  const [formData, setFormData] = useState<iCartao>({
    id:0,
    descricao: "",
    dataVencimentoCartao: "",
    dataFechamento: "",
    usuario: {
      id: 1,
      descricao: "",
    },
  });
  const [openModal, setOpenModal] = useState(false);
  const [listaCartao, setListaCartao] = useState<iCartao[]>([]);
  const [tipoCartaoLista, setTipoCartaoLista] = useState<string[]>([]);

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

  const handleSelect = (event: React.SyntheticEvent, value: iCartao | null) => {
    if (value) {
      setFormData({
        id: value.id,
        dataVencimentoCartao: value.dataVencimentoCartao,
        dataFechamento: value.dataFechamento,
        descricao: value.descricao,
        usuario: value.usuario
      });
    }
  };

  const buscarCartao = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/cartao/todos",
        {
          params: {
            idUsuario: 1,
          },
        }
      );
      setListaCartao(response.data);
    } catch (error) {
      console.error("Erro ao buscar cartao:", error);
    }
  };

  // Buscar a lista de bancos ao abrir o modal
  useEffect(() => {
    if (openModal && listaCartao.length==0) {
      buscarCartao();
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


    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/cartao", {
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
          buscarCartao();
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
      dataVencimentoCartao: "",
      dataFechamento: "",
      usuario: {
        id: 1,
        descricao: "",
      },
    });
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
          <Typography>Cartao</Typography>
        </Breadcrumbs>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Grid item xs={12} md={8}>
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
        <Grid item xs={12} md={2}>
              <TextField
                label="Data Vencimento Fatura"
                name="dataVencimentoCartao"
                value={formData.dataVencimentoCartao}
                onChange={handleTextFieldChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
        <Grid item xs={12} md={2}>
              <TextField
                label="Data Fechamento Fatura"
                name="dataFechamento"
                value={formData.dataFechamento}
                onChange={handleTextFieldChange}
                fullWidth
                required
                variant="outlined"
              />
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
        <DialogTitle>Selecionar Cartao</DialogTitle>
        <DialogContent>
          <FormControl   fullWidth>
           <Autocomplete
            options={listaCartao}
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

export default Cartao;
