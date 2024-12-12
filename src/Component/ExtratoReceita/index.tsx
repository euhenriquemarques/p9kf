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
  Autocomplete,
} from "@mui/material";
import {
  iCategoria,
  iConta,
  iReceitas,
  iExtratoReceita,
} from "../../Interface/interface";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

const ExtratoReceita: React.FC = () => {
  const [formData, setFormData] = useState<iExtratoReceita>({
    id: 0,
    valor: 0,
    valorJuros: 0,
    idConta: 0,
    dataPagamento: dayjs(),
    valorDesconto: 0,
    usuario: {
      id: 1,
      descricao: "",
    },
    dataProcessamento: "",
    receita: {
      id: 0,
      categoria: {
        id: 0,
        descricao: "",
        movimentacao: "",
        usuario: {
          id: 1,
          descricao: "",
        },
      },
      usuario: {
        id: 1,
        descricao: "",
      },
      dataProcessamento: "",
      recorrente: false,
      parcela: 1,
      parcelaTotais: 1,
      dataVencimentoParcela: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      ativo: true,
      valorParcela: 0,
      valorTotal: 0,
      descricao: "",
    },
  });

  const [receitasLista, setReceitaLista] = useState<iReceitas[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;

    const selecionado = receitasLista.find((item) => item.id === Number(value));
    setFormData((prevState) => ({
      ...prevState,
      [name]: selecionado,
    }));

    setFormData((prevState) => ({
      ...prevState,
      ["valor"]: Number(selecionado?.valorParcela),
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
        const response = await fetch("http://localhost:8080/extratoReceita", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // Adicionar o token no cabeçalho
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setSnackbarMessage("Cadastro realizado com sucesso!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setReceitaLista([]);
          handleReset();
          setSelectedConta(null); // Reseta o valor do Autocomplete
          buscarReceitasVigentes();
        } else {
          // Erro
          const errorText = await response.text();
          setSnackbarMessage("Validar todos os campos !");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error("Erro:", error);
        setSnackbarMessage("Validar todos os campos !");
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
      idConta: 0,
      dataPagamento: dayjs(),
      valorDesconto: 0,
      usuario: {
        id: 1,
        descricao: "",
      },
      dataProcessamento: "",
      receita: {
        id: 0,
        categoria: {
          id: 0,
          descricao: "",
          movimentacao: "",
          usuario: {
            id: 1,
            descricao: "",
          },
        },
        usuario: {
          id: 1,
          descricao: "",
        },
        dataProcessamento: "",
        recorrente: false,
        parcela: 1,
        parcelaTotais: 1,
        dataVencimentoParcela: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        ativo: true,
        valorParcela: 0,
        valorTotal: 0,
        descricao: "",
      },
    });
  };

  async function buscarReceitasVigentes() {
    try {
      const response = await axios.get(
        "http://localhost:8080/receita/vigente",
        {
          headers: {
            Authorization: `Bearer ${token}` // Adicionar o token no cabeçalho
        }
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        setReceitaLista(data);
      } else {
        // Erro
        const errorText = await response.status;
        setSnackbarMessage("Lista Vazia ou Nao Encontrada");
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
    buscarReceitasVigentes();
    buscarConta();
  }, []);

  const handleSelect = (event: React.SyntheticEvent, value: iConta | null) => {
    if (value) {
      setFormData((prevState) => ({
        ...prevState,
        ["idConta"]: value.id,
      }));
    }
  };
  const [listaConta, setListaConta] = useState<iConta[]>([]);
  const [selectedConta, setSelectedConta] = useState<iConta | null>(null);
  const token = localStorage.getItem("token"); 
  const buscarConta = async () => {
    try {
      const response = await axios.get("http://localhost:8080/conta", {
        headers: {
          Authorization: `Bearer ${token}` // Adicionar o token no cabeçalho
      }
      });
      setListaConta(response.data);
    } catch (error) {
      console.error("Erro ao buscar Contas:", error);
    }
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
          <Typography>Extrato Receita</Typography>
        </Breadcrumbs>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Grid item xs={12} md={8}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="receita-label">Receita</InputLabel>
                <Select
                  labelId="receita-label"
                  id="receita"
                  name="receita"
                  value={formData.receita.id}
                  onChange={handleSelectChange}
                  label="Receita"
                >
                  {receitasLista.map((tipo, index) => (
                    <MenuItem key={index} value={tipo.id}>
                      <span style={{ minWidth: "250px" }}>
                        {" "}
                        {tipo.descricao}
                      </span>{" "}
                      | <strong>Parcela:</strong>{" "}
                      <span style={{ minWidth: "80px" }}>
                        {tipo.parcela}/{tipo.parcelaTotais}
                      </span>{" "}
                      |<strong>Valor:</strong>{" "}
                      <span style={{ minWidth: "130px" }}>
                        {" "}
                        {formatCurrency(tipo.valorParcela)}
                      </span>{" "}
                      |<strong>Venc:</strong>{" "}
                      <span style={{ minWidth: "80px" }}>
                        {" "}
                        {formatData(dayjs(tipo.dataVencimentoParcela))}{" "}
                      </span>
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
                onChange={handleTextFieldChangeTotal}
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
                onChange={handleTextFieldChangeTotal}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={listaConta}
                value={selectedConta}
                getOptionLabel={(option) =>
                  `${option.banco.descricao} - Ag: ${option.agencia} : ${option.numero}: ${option.descricao}`
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {`${option.banco.descricao} - Ag: ${option.agencia} : ${option.numero} : ${option.descricao}`}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar por Banco, Agência ou Número"
                    fullWidth
                  />
                )}
                onChange={(event, value) => {
                  setSelectedConta(value);
                  handleSelect(event, value);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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

export default ExtratoReceita;
