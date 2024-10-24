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
import { iCategoria, iReceitas } from "../../Interface/interface";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/pt-br';
const Receita: React.FC = () => {
  const [formData, setFormData] = useState<iReceitas>({
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
  });

  const [categoriaLista, setCategoriaLista] = useState<iCategoria[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;

    const selecionado = categoriaLista.find(
      (item) => item.id === Number(value)
    );
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

  const handleTextFieldChangeParcela = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormData((prevState) => ({
      ...prevState,
      ["parcelaTotais"]: Number(value),
    }));

    setFormData((prevState) => ({
      ...prevState,
      ["valorTotal"]: Number(value) * Number(formData.valorParcela),
    }));
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

    setFormData((prevState) => ({
      ...prevState,
      ["valorTotal"]: Number(formData.parcelaTotais) * Number(numericValue),
    }));
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


  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    if (newValue) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue.format("YYYY-MM-DDTHH:mm:ss"), 
      }));
  };
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    console.log(formData);

    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/receita", {
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
    });
  };

  async function buscarReceitasVigentes() {
    try {
      const response = await axios.get(
        "http://localhost:8080/categoria/receita",
        {
          params: {
            idUsuario: 1,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        setCategoriaLista(data);
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
    buscarReceitasVigentes();
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
          <Typography>Receita</Typography>
        </Breadcrumbs>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="receita-label">Categoria</InputLabel>
                <Select
                  labelId="categoria-label"
                  id="categoria"
                  name="categoria"
                  value={formData.categoria.id}
                  onChange={handleSelectChange}
                  label="Categoria"
                >
                  {categoriaLista.map((tipo, index) => (
                    <MenuItem key={index} value={tipo.id}>
                      {tipo.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <FormLabel id="recorrente-label">Recorrente</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="recorrente-label"
                  name="recorrente"
                  value={formData.recorrente}
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
              <TextField
                label="Parcela"
                name="parcela"
                type="number"
                value={formData.parcela || 1}
                onChange={handleTextFieldChangeParcela}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Parcela Totais"
                name="parcelaTotais"
                type="number"
                value={formData.parcelaTotais || formData.parcela}
                fullWidth
                onChange={handleTextFieldChangeParcela}
                aria-readonly
                required
                variant="outlined"
                inputProps={{ min: formData.parcela }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Valor Parcela Atual"
                name="valorParcela"
                type="text"
                value={formatCurrency(formData.valorParcela)} // Aplica formatação para exibição
                onChange={handleTextFieldChangeTotal}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Valor Total"
                name="valorTotal"
                type="text"
                value={formatCurrency(formData.valorTotal)}
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}> {/* Alinhamento vertical */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Vencimento Parcela Atual"
                    value={dayjs(formData.dataVencimentoParcela)}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "dataVencimentoParcela")
                    }
                    format="DD/MM/YYYY" // Formato com data e hora
                  
                  
                  />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth variant="outlined">
                <FormLabel id="ativo-label">Ativo</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="ativo-label"
                  name="ativo"
                  value={formData.ativo}
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

export default Receita;
