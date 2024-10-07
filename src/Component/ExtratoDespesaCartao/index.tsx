import React, { useEffect, useState } from "react";
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
  iCartao,
  iCategoria,
  iDespesas,
  iExtratoDespesaCartao,
} from "../../Interface/interface";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

const ExtratoDespesaCartao: React.FC = () => {
  const [formData, setFormData] = useState<iExtratoDespesaCartao>({
    id: 0,
    valor: 0,
    valorJuros: 0,
    dataPagamento: dayjs(),
    valorDesconto: 0,
    usuario: {
      id: 1,
      descricao: "",
    },
    dataProcessamento: "",
    cartao: {
      id: 0,
      descricao: "",
      dataVencimentoCartao: "",
      dataFechamento: "",
      usuario: {
        id: 1,
        descricao: "",
      },
    },
  });

  const [cartaoLista, setCartaoLista] = useState<iCartao[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;

    const selecionado = cartaoLista.find((item) => item.id === Number(value));
    setFormData((prevState) => ({
      ...prevState,
      [name]: selecionado,
    }));
  };

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    if (newValue) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue.format("YYYY-MM-DDTHH:mm:ss"),
      }));
    }
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
      .format(value)
      .replace("USD", "") // Remove o 'USD' e mantém apenas o símbolo $
      .replace(/\s/g, "") // Remove espaços extras, se existirem
      .replace("$", "$ "); // Adiciona um espaço após o símbolo $
  };


  const formatData = (value: Dayjs) => {
    return value.format("DD-MM");
  };

  const handleTextFieldChangeTotal = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const numericValue = Number(value.replace(/[^\d]/g, "")) / 100; // Divide por 100 para obter a formatação correta

    setFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    console.log(formData);

    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/extratoDespesaCartao", {
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
          setCartaoLista([]);
          handleReset();
          buscarCartoes();
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
      valor: 0,
      valorJuros: 0,
      dataPagamento: dayjs(),
      valorDesconto: 0,
      usuario: {
        id: 1,
        descricao: "",
      },
      dataProcessamento: "",
      cartao: {
        id: 0,
        descricao: "",
        dataVencimentoCartao: "",
        dataFechamento: "",
        usuario: {
          id: 1,
          descricao: "",
        },
      },
    });
  };

  async function buscarCartoes() {
    try {
      const response = await axios.get(
        "http://localhost:8080/cartao/todos",
        {
          params: {
            idUsuario: 1,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        setCartaoLista(data);
      } else {
        // Erro
        const errorText = await response.status;
        setSnackbarMessage("Erro ao buscar Cartao ");
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
    buscarCartoes();
  }, []);

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
          <Typography>Extrato Despesa Cartao</Typography>
        </Breadcrumbs>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Grid item xs={12} md={8}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="cartao-label">Cartao</InputLabel>
                <Select
                  labelId="cartao-label"
                  id="cartao"
                  name="cartao"
                  value={formData.cartao.id}
                  onChange={handleSelectChange}
                  label="Cartao"
                >
                  {cartaoLista.map((tipo, index) => (
                    <MenuItem key={index} value={tipo.id}>
                       <span > {tipo.descricao}</span> 
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Valor"
                name="valor"
                type="text"
                value={formatCurrency(formData.valor)} // Aplica formatação para exibição
                onChange={handleTextFieldChangeTotal}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Data Pagamento"
                  value={dayjs(formData.dataPagamento)}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "dataPagamento")
                  }
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Valor Juros"
                name="valorJuros"
                type="text"
                value={formatCurrency(formData.valorJuros)}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Valor Desconto"
                name="valorDesconto"
                type="text"
                value={formatCurrency(formData.valorDesconto)}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0 }}
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

export default ExtratoDespesaCartao;
