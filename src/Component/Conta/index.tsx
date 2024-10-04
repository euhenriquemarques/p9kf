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
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { iBanco, iCategoria, iConta } from "../../Interface/interface";
import { log } from "console";
import axios from "axios";

const Conta: React.FC = () => {
  const [formData, setFormData] = useState<iConta>({
    id: 0,
    numero: "",
    agencia: "",
    banco: {
      id: 0,
      codigo: "",
      descricao: "",
    },
    compartilhado: false,
    status: true,
    nacional: true,
    usuario: {
      id: 1,
      descricao: "",
    },
  });

  const [bancosLista, setBancosListas] = useState<iBanco[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [listaConta, setListaConta] = useState<iConta[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );



  const handleSelect = (event: React.SyntheticEvent, value: iConta | null) => {
    if (value) {
      setFormData({
        id: value.id,
        numero: value.numero,
        agencia: value.agencia,
        banco: value.banco,
        compartilhado: value.compartilhado,
        status: value.status,
        nacional: value.nacional,
        usuario: value.usuario
      })
    }
  };

  const buscarConta = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/conta",
        {
          params: {
            idUsuario: 1,
          },
        }
      );
      setListaConta(response.data);
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
    }
  };

  // Buscar a lista de bancos ao abrir o modal
  useEffect(() => {
    if (openModal && listaConta.length==0) {
      buscarConta();
    }
  }, [openModal]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectChange = (e: SelectChangeEvent<string | number >) => {

   const { name, value } = e.target;

    const selectedBanco = bancosLista.find((banco) => banco.id === Number(value));
    
    setFormData((prevState) => ({
      ...prevState,
      [name]:  selectedBanco,
    }));
  };

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (formData.banco.id ===0 && formData.banco.descricao === "") {
      setSnackbarMessage("Banco é obrigatória");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      isValid=false
    }
    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/conta", {
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
          handleReset();
          buscarConta();
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
      id: 0,
      numero: "",
      agencia: "",
      banco: {
        id: 0,
        codigo: "",
        descricao: "",
      },
      compartilhado: false,
      status: true,
      nacional: true,
      usuario: {
        id: 1,
        descricao: "",
      },
    });
  };

  async function buscarBancos() {
    try {
      const response = await fetch("http://localhost:8080/banco", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBancosListas(data);
      } else {
        // Erro
        const errorText = await response.text();
        setSnackbarMessage("Erro ao buscar Bancos ");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }

  useEffect(() => {
    buscarBancos();
  }, []);

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
            <Grid item xs={12} md={2}>
              <TextField
                label="Agencia"
                name="agencia"
                value={formData.agencia}
                onChange={handleTextFieldChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Numero Conta"
                name="numero"
                value={formData.numero}
                onChange={handleTextFieldChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="banco-label">Banco</InputLabel>
                <Select
                  labelId="banco-label"
                  id="banco"
                  name="banco"
                  value={formData.banco?.id || ""} 
                  onChange={handleSelectChange}
                  label="Bancos"
                >
                  {bancosLista.map((tipo, index) => (
                    <MenuItem key={index} value={tipo.id}>
                      {tipo.codigo} - {tipo.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth variant="outlined">
                <FormLabel id="compartilhado-label">Compartilhado</FormLabel>
                <RadioGroup
                  row 
                  aria-labelledby="compartilhado-label"
                  name="compartilhado"
                  value={formData.compartilhado}
                  onChange={handleTextFieldChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            

            <Grid item xs={12} md={2}>
              <FormControl fullWidth variant="outlined">
                <FormLabel id="nacional-label">Conta Nacional</FormLabel>
                <RadioGroup
                 row 
                  aria-labelledby="nacional-label"
                  name="nacional"
                  value={formData.nacional}
                  onChange={handleTextFieldChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <FormLabel id="status-label">Status Conta</FormLabel>
                <RadioGroup
                row
                  aria-labelledby="Status-label"
                  name="status"
                  value={formData.status}
                  onChange={handleTextFieldChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Ativo"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Inativa"
                  />
                </RadioGroup>
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
        <DialogTitle>Selecionar Conta</DialogTitle>
        <DialogContent>
        <FormControl fullWidth>
      <Autocomplete
        options={listaConta}
        getOptionLabel={(option) =>
          `${option.banco.descricao} - Agência: ${option.agencia} - Número: ${option.numero}`
        }
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {`${option.banco.descricao} - Agência: ${option.agencia} - Número: ${option.numero}`}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar por Banco, Agência ou Número"
            fullWidth
            margin="dense"
          />
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

export default Conta;
