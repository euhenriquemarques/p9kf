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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { iCategoria, iDespesas } from "../../Interface/interface";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { log } from "console";
import {
  descendingComparator,
  getComparator,
  stableSort,
} from "../../Utils/sortUtils";

const Despesa: React.FC = () => {
  const [formData, setFormData] = useState<iDespesas>({
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
    juros: false,
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

  const [tabelaLista, setTabelaLista] = useState<iDespesas[]>([
    {
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
      juros: false,
      ativo: true,
      valorParcela: 0,
      valorTotal: 0,
      descricao: "",
    },
  ]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof iDespesas>("descricao");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof iDespesas
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    console.log(formData);

    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/despesa", {
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
          handleReset();
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
      
    buscarDespesasVigentes();
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
      juros: false,
      ativo: true,
      valorParcela: 0,
      valorTotal: 0,
      descricao: "",
    });
  };

  async function buscarCategorias() {
    try {
      const response = await axios.get(
        "http://localhost:8080/categoria/despesa",
        {
          headers: {
            Authorization: `Bearer ${token}` // Adicionar o token no cabeçalho
        }
        }
      );
      if (response.status === 200) {
        const data = await response.data;
        setCategoriaLista(data);
      } else {
        // Erro
        const errorText = await response.status;
        setSnackbarMessage("Erro ao buscar Despesas ");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }
  const token = localStorage.getItem("token"); 
  async function buscarDespesasVigentes() {
    try {
      const response = await axios.get(
        "http://localhost:8080/despesa/todas",
        {
          headers: {
            Authorization: `Bearer ${token}` // Adicionar o token no cabeçalho
        }
        }
      );
      if (response.status === 200) {
        const data = await response.data;        
        setTabelaLista(data);
      } else {
        // Erro
        const errorText = await response.status;
        setSnackbarMessage("Erro ao buscar Despesas ");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }

  const formatarSaldo = (valor: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
      .format(valor)
      .replace("USD", "") // Remove o 'USD' e mantém apenas o símbolo $
      .replace(/\s/g, "") // Remove espaços extras, se existirem
      .replace("$", "$ "); // Adiciona um espaço após o símbolo $
  };

  useEffect(() => {
    buscarCategorias();
    buscarDespesasVigentes();
  }, []);

  const handleRowClick = (item: iDespesas) => {
    setFormData({
      ...item,
      dataVencimentoParcela: dayjs(item.dataVencimentoParcela).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
    });
  };

  return (
    <>
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
            <Typography>Despesa</Typography>
          </Breadcrumbs>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="despesa-label">Categoria</InputLabel>
                  <Select
                    labelId="categoria-label"
                    id="categoria"
                    name="categoria"
                    value={formData.categoria.id}
                    onChange={handleSelectChange}
                    label="Categoria"
                    disabled={formData.id !== 0}
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
                  disabled={formData.id !== 0}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  disabled={formData.id !== 0}
                >
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
                  disabled={formData.id !== 0}
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
                  disabled={formData.id !== 0}
                  inputProps={{ min: formData.parcela }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Valor Parcela Atual"
                  name="valorParcela"
                  disabled={formData.id !== 0}
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
                  disabled={formData.id !== 0}
                  type="text"
                  value={formatCurrency(formData.valorTotal)}
                  fullWidth
                  required
                  variant="outlined"
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {" "}
                {/* Alinhamento vertical */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Vencimento Parcela Atual"
                    disabled={formData.id !== 0}
                    value={dayjs(formData.dataVencimentoParcela)}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "dataVencimentoParcela")
                    }
                    format="DD/MM/YYYY" // Formato com data e hora
                    minDate={dayjs()}
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
              <Grid item xs={12} md={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  disabled={formData.id !== 0}
                >
                  <FormLabel id="juros-label">Juros Atraso</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="juros-label"
                    name="juros"
                    value={formData.juros}
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
      <Divider />
      {/* Tabela */}
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
            boxShadow: 1,
            borderRadius: 3,
          }}
        >
          <Paper sx={{ width: "100%", borderRadius: 3, padding: 1 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Categoria</TableCell>
                    <TableCell
                      sortDirection={orderBy === "descricao" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "descricao"}
                        direction={orderBy === "descricao" ? order : "asc"}
                        onClick={(event) =>
                          handleRequestSort(event, "descricao")
                        }
                      >
                        Descrição
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={orderBy === "valorParcela" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "valorParcela"}
                        direction={orderBy === "valorParcela" ? order : "asc"}
                        onClick={(event) =>
                          handleRequestSort(event, "valorParcela")
                        }
                      >
                        Valor Parcela
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Parcelas</TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "dataVencimentoParcela" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "dataVencimentoParcela"}
                        direction={
                          orderBy === "dataVencimentoParcela" ? order : "asc"
                        }
                        onClick={(event) =>
                          handleRequestSort(event, "dataVencimentoParcela")
                        }
                      >
                        Vencimento
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        orderBy === "ativo" ? order : false
                      }
                    >
                      <TableSortLabel
                        active={orderBy === "ativo"}
                        direction={
                          orderBy === "ativo" ? order : "asc"
                        }
                        onClick={(event) =>
                          handleRequestSort(event, "ativo")
                        }
                      >
                        Ativo
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(tabelaLista, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={item.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRowClick(item)} // Adicione esta linha
                        >
                          <TableCell>{item.categoria.descricao}</TableCell>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell>
                            {formatarSaldo(item.valorParcela)}
                          </TableCell>
                          <TableCell>
                            {item.parcela}/{item.parcelaTotais}
                          </TableCell>
                          <TableCell>
                            {dayjs(item.dataVencimentoParcela).format(
                              "DD/MM/YYYY"
                            )}
                          </TableCell>
                          <TableCell>{item.ativo ? "Sim" : "Não"}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tabelaLista.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      </Box>
    </>
  );
};

export default Despesa;
