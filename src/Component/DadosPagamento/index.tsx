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
} from "@mui/material";
import {
  iBanco,
  iCategoria,
  iConta,
  iDadosPagamento,
  iDespesas,
} from "../../Interface/interface";
import { log } from "console";
import axios from "axios";

const DadosPagamento: React.FC = () => {
  const [formData, setFormData] = useState<iDadosPagamento>({
    id: 0,
    descricao: "",
    dadosPagamento: "",
    despesa: {
      id: 0,
      categoria: {
        id: 0,
        descricao: "",
        movimentacao: "",
      },
      usuario: {
        id: 1,
        descricao: "",
      },
      dataProcessamento: "",
      recorrente: false,
      parcela: 0,
      parcelaTotais: 0,
      dataVencimentoParcela: "",
      juros: false,
      ativo: false,
      valorParcela: 0,
      valorTotal: 0,
      descricao: "",
    },
  });

  const [despesasLista, setDespesasLista] = useState<iDespesas[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;

    const selecionado = despesasLista.find((item) => item.id === Number(value));
    setFormData((prevState) => ({
      ...prevState,
      [name]: selecionado,
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
    console.log(formData);
    

    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/dadosPagamento", {
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
      descricao: "",
      dadosPagamento: "",
      despesa: {
        id: 0,
        categoria: {
          id: 0,
          descricao: "",
          movimentacao: "",
        },
        usuario: {
          id: 1,
          descricao: "",
        },
        dataProcessamento: "",
        recorrente: false,
        parcela: 0,
        parcelaTotais: 0,
        dataVencimentoParcela: "",
        juros: false,
        ativo: false,
        valorParcela: 0,
        valorTotal: 0,
        descricao: "",
      },
    });
  };

  async function buscarDespesasVigentes() {
    try {
      const response = await axios.get("http://localhost:8080/despesa/geralVigentes", {
        params: {
          idUsuario: 1,
        },
      });
      if (response.status === 200) {
        const data = await response.data;
        setDespesasLista(data);
      } else {
        // Erro
        const errorText = await response.status;
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
    buscarDespesasVigentes();
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
          <Typography>Dados Pagamento</Typography>
        </Breadcrumbs>

        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="despesa-label">Despesa</InputLabel>
              <Select
                labelId="despesa-label"
                id="despesa"
                name="despesa"
                value={formData.despesa?.id}
                onChange={handleSelectChange}
                label="Despesa"
              >
                {despesasLista.map((tipo, index) => (
                  <MenuItem key={index} value={tipo.id}>
                    {tipo.descricao}| Parcela - {tipo.parcela}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        
            <Grid item xs={12} md={3}>
              <TextField
                label="Descriçao"
                name="descricao"
                value={formData.descricao}
                onChange={handleTextFieldChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                label="Dados Pagamento"
                name="dadosPagamento"
                value={formData.dadosPagamento}
                onChange={handleTextFieldChange}
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

export default DadosPagamento;
