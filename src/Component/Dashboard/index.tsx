import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { iHomeDto } from "../../Interface/interface";
import axios from "axios";
import dayjs from "dayjs";

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<iHomeDto>({
    valortotalParcelado: 0,
    valortotalRecorrente: 0,
    listaDespesaCartao: [{ valor: 0, cartao: "", ano: "", meses: [] }],
    listaDespesaCartao12Meses: [{ valor: 0, cartao: "", ano: "", meses: [] }],
    listaDespesa: [
      {
        parcela: 1,
        parcelaTotais: 1,
        dataVencimentoParcela: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        valorParcela: 0,
        descricao: "",
      },
    ],
    listaExtratoDespesa: [
      {
        parcela: 1,
        valor: 0,
        valorJuros: 0,
        valorDesconto: 0,
        dataVencimento: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        dataPagamento: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        despesa: "",
      },
    ],
    listaExtratoDespesaCartao: [
      {
        valor: 0,
        valorJuros: 0,
        valorDesconto: 0,
        dataPagamento: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        cartao: "",
      },
    ],
    listaSaldo: [
      {
        saldo: 0,
        banco: "",
        numero: "",
      },
    ],
  });

  async function buscarHome() {
    try {
      const response = await axios.get("http://localhost:8080/homepage", {
        params: {
          idUsuario: 1,
        },
      });
      if (response.status === 200) {
        const data = await response.data;
        setFormData(data);
        console.log(data);
      } else {
        // Erro
        const errorText = await response.status;
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  useEffect(() => {
    buscarHome();
  }, []);

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

  const calcularValorFaltante = () => {
    return formData.listaDespesa.reduce((total, despesa) => {
      return total + despesa.valorParcela;
    }, 0);
  };

  const calcularValorPagase = () => {
    return formData.listaExtratoDespesa.reduce((total, despesa) => {
      return (
        total + (despesa.valor + despesa.valorJuros) - despesa.valorDesconto
      );
    }, 0);
  };

  const calcularSaldos = () => {
    return formData.listaSaldo.reduce((total, despesa) => {
      return total + despesa.saldo;
    }, 0);
  };

  const valorFaltante = calcularValorFaltante();
  const valorSaldo = calcularSaldos();
  const valorTotalMes = calcularValorPagase();
  const valorReceitaMes = calcularValorPagase();

  return (
    <Box
      sx={{
        padding: 0,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#181818", // Fundo geral da página
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <Grid container spacing={2} sx={{ width: "90%" }}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Team Cards */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  padding: 3,
                  backgroundColor: "#1E1E1E", // Fundo do card principal
                  color: "#ffffff",
                  borderRadius: "16px",
                  height: "200px",
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <Typography variant="h6" marginBottom={3}>
                  Saldos
                </Typography>
                <div
                  className="scrollable-content"
                  style={{
                    overflowY: "auto",
                    maxHeight: "180px",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* Mapeamento da lista */}
                  {formData.listaSaldo.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        minWidth: "400px",
                        padding: "4px 0",
                        borderBottom: "1px solid #444", // Separador suti
                      }}
                    >
                      {/* Cada campo com tamanho fixo */}
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: "150px",
                          color: "#FFA500",
                        }}
                      >
                        {item.banco}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: "150px",
                          color: "#AAAAAA",
                        }}
                      >
                        C: {item.numero}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: "180px",
                          color: "#FFA500", // Verde para valor
                        }}
                      >
                        {formatarSaldo(item.saldo)}
                      </Typography>
                    </Box>
                  ))}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  padding: 3,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  height: "100px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundImage: "linear-gradient(45deg, #1D2671, #1E1E1E)", // Aplicação do gradiente azul
                }}
              >
                <Typography variant="h5" sx={{ color: "#FFFFFF" }}>
                  Total Parcelado
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
                  {formatarSaldo(formData.valortotalParcelado)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  padding: 3,
                  backgroundColor: "#E8CEB3",
                  borderRadius: "16px",
                  height: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundImage: "linear-gradient(45deg, #1D2671, #1E1E1E)", // Aplicação do gradiente azul
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="h5" sx={{ color: "#FFFFFF" }}>
                  Recorrente Mes
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
                  {formatarSaldo(formData.valortotalRecorrente)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: 3,
                  borderRadius: "16px",
                  height: "110px",
                  color: "#FFFFFF",
                  backgroundImage: "linear-gradient(45deg, #1D2671, #ff9e00)", // Aplicação do gradiente
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                  Despesas/Mes
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
                  {formatarSaldo(valorTotalMes + valorFaltante)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: 3,
                  borderRadius: "16px",
                  height: "110px",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundImage: "linear-gradient(45deg, #ff9e00, #1E1E1E)", // Aplicação do gradiente
                }}
              >
                <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                  Receita/Mes
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
                  {formatarSaldo(valorReceitaMes)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: 3,
                  borderRadius: "16px",
                  height: "110px",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundImage: "linear-gradient(90deg, #1D2671, #ff9e00)", // Aplicação do gradiente
                }}
              >
                <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                  Liquido/Mes
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FFFFFF" }}>
                  {formatarSaldo(
                    valorTotalMes + valorFaltante - valorReceitaMes
                  )}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right-Side Cards (Stacked on each other) */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Team Cards */}
            <Grid item xs={6} md={4}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#1C1C1C",
                  borderRadius: "16px",
                  height: "80px",
                  flexDirection: "column",
                  display: "flex",
                  color: "#FFFFFF",
                }}
              >
                <Typography variant="h6">Receita</Typography>
                <Typography variant="subtitle1" sx={{ color: "#66BB6A" }}>
                  {formatarSaldo(valorSaldo)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={4}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#1C1C1C",
                  borderRadius: "16px",
                  height: "80px",
                  flexDirection: "column",
                  display: "flex",
                  color: "#FFFFFF",
                }}
              >
                <Typography variant="h6">Despesas</Typography>
                <Typography variant="subtitle1" sx={{ color: "#FF0000" }}>
                  {formatarSaldo(valorFaltante)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#1C1C1C",
                  borderRadius: "16px",
                  height: "80px",
                  flexDirection: "column",
                  display: "flex",
                  color: "#FFFFFF",
                }}
              >
                <Typography variant="h6">Liquido</Typography>
                <Typography variant="subtitle1" sx={{ color: "#FFA500" }}>
                  {formatarSaldo(valorSaldo - valorFaltante)}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#1C1C1C",
                  borderRadius: "16px",
                  height: "350px",
                  flexDirection: "column",
                  display: "flex",
                  color: "#FFFFFF",
                }}
              >
                <Typography variant="h6" marginBottom={3}>
                  Despesas
                </Typography>
                <div
                  className="scrollable-content"
                  style={{
                    overflowY: "auto",
                    maxHeight: "280px",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* Mapeamento da lista */}
                  {formData.listaDespesa.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        minWidth: "500px",
                        padding: "4px 0",
                        borderBottom: "1px solid #444", // Separador suti
                      }}
                    >
                      {/* Cada campo com tamanho fixo */}
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: "200px",
                          color: "#FFA500", // Laranja para descrição
                        }}
                      >
                        {item.descricao}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: "90px",
                          color: "#FF6347",
                        }}
                      >
                        {item.parcela === 0 ? (
                          <>-</>
                        ) : (
                          <>
                            Parc: {item.parcela}/{item.parcelaTotais}
                          </>
                        )}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: "120px",
                          color: "#AAAAAA",
                        }}
                      >
                        Venc:{" "}
                        {dayjs(item.dataVencimentoParcela).format("DD/MM")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          minWidth: "150px",
                          color: "#AAAAAA",
                        }}
                      >
                        {formatarSaldo(item.valorParcela)}
                      </Typography>
                    </Box>
                  ))}
                </div>
              </Paper>
            </Grid>
            {/* Additional Cards */}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#1C1C1C",
                borderRadius: "16px",
                height: "300px",
                flexDirection: "column",
                display: "flex",
                color: "#FFFFFF",
              }}
            >
              <Typography variant="h6" marginBottom={3}>
                Despesas Pagas
              </Typography>
              <div
                className="scrollable-content"
                style={{
                  overflowY: "auto",
                  maxHeight: "250px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Mapeamento da lista */}
                {formData.listaExtratoDespesa.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      minWidth: "400px",
                      padding: "4px 0",
                      borderBottom: "1px solid #555",
                    }}
                  >
                    {/* Cada campo com tamanho fixo */}
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "200px",
                        color: "#FFA500", // Laranja para descrição
                      }}
                    >
                      {item.despesa}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "80px",
                        color: "#FF6347",
                      }}
                    >
                      {item.parcela === 0 ? <>-</> : <>Parc: {item.parcela}</>}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "150px",
                        color: "#AAAAAA",
                      }}
                    >
                      Valor: {formatarSaldo(item.valor)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "100px",
                        color: "#AAAAAA",
                      }}
                    >
                      Pago: {dayjs(item.dataPagamento).format("DD/MM")}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "100px",
                        color: "#AAAAAA",
                      }}
                    >
                      Venc: {dayjs(item.dataVencimento).format("DD/MM")}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "150px",
                        color: "#AAAAAA",
                      }}
                    >
                      Desc: {formatarSaldo(item.valorDesconto)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "150px",
                        color: "#AAAAAA",
                      }}
                    >
                      Juros: {formatarSaldo(item.valorJuros)}
                    </Typography>
                  </Box>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#1C1C1C",
                borderRadius: "16px",
                height: "300px",
                flexDirection: "column",
                display: "flex",
                color: "#FFFFFF",
              }}
            >
              <Typography variant="h6" marginBottom={3}>
                Cartão Mensal
              </Typography>

              {/* Cabeçalho com os meses */}
              <Box
              className="scrollable-content"
                sx={{
                  display: "flex",
                  borderBottom: "1px solid #555",
                  paddingBottom: "8px",
                  overflowY: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Coluna para o título "Cartão" */}
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: "250px",
                    minWidth: "200px",
                    color: "#FFFFFF",
                  }}
                >
                  Cartão
                </Typography>

                {/* Mapeamento dos meses para a linha de cabeçalho */}
                {formData.listaDespesaCartao12Meses.length > 0 &&
                  (() => {
                    const itemComMaisMeses =
                      formData.listaDespesaCartao12Meses.reduce((acc, item) => {
                        return Object.keys(item.meses).length >
                          Object.keys(acc.meses).length
                          ? item
                          : acc;
                      });

                    return Object.keys(itemComMaisMeses.meses).map(
                      (mesAno, i) => (
                        <Typography
                          key={i}
                          variant="body1"
                          sx={{
                            minWidth: "130px",
                            textAlign: "center",
                            color: "#FFFFFF",
                          }}
                        >
                          {mesAno}
                        </Typography>
                      )
                    );
                  })()}
              </Box>
              <div
                className="scrollable-content"
                style={{
                  overflowY: "auto",
                  maxHeight: "350px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Mapeamento da lista de cartões e valores */}
                {formData.listaDespesaCartao12Meses.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      minWidth: "500px",
                      padding: "4px 0",
                      borderBottom: "1px solid #555",
                    }}
                  >
                    {/* Coluna para o nome do cartão */}
                    <Typography
                      variant="body1"
                      sx={{
                        maxWidth: "200px",
                        minWidth: "200px",
                        color: "#FFA500", // Laranja para o nome do cartão
                      }}
                    >
                      {item.cartao}
                    </Typography>

                    {/* Exibe os meses e valores para cada cartão */}
                    {Object.entries(item.meses).map(([mesAno, valorMes], i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center", // Centraliza o texto
                          minWidth: "130px",
                        }}
                      >
                        <Typography
                          variant="body2" // Usando body2 para o valor
                          sx={{
                            color: "#AAAAAA", // Cor do valor
                          }}
                        >
                          {formatarSaldo(Number(valorMes))}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#1C1C1C",
                borderRadius: "16px",
                height: "300px",
                flexDirection: "column",
                display: "flex",
                color: "#FFFFFF",
              }}
            >
              <Typography variant="h6" marginBottom={3}>
                Cartoes Pendentes
              </Typography>
              <div
                className="scrollable-content"
                style={{
                  overflowY: "auto",
                  maxHeight: "250px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Mapeamento da lista */}
                {formData.listaDespesaCartao.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      minWidth: "400px",
                      padding: "4px 0",
                      borderBottom: "1px solid #555",
                    }}
                  >
                    {/* Cada campo com tamanho fixo */}
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "200px",
                        color: "#FFA500", // Laranja para descrição
                      }}
                    >
                      {item.cartao}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "150px",
                        color: "#AAAAAA",
                      }}
                    >
                      Valor: {formatarSaldo(item.valor)}
                    </Typography>
                  </Box>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#1C1C1C",
                borderRadius: "16px",
                height: "300px",
                flexDirection: "column",
                display: "flex",
                color: "#FFFFFF",
              }}
            >
              <Typography variant="h6" marginBottom={3}>
                Cartoes Pagos
              </Typography>
              <div
                className="scrollable-content"
                style={{
                  overflowY: "auto",
                  maxHeight: "250px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Mapeamento da lista */}
                {formData.listaExtratoDespesaCartao.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      minWidth: "400px",
                      padding: "4px 0",
                      borderBottom: "1px solid #555",
                    }}
                  >
                    {/* Cada campo com tamanho fixo */}
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "200px",
                        color: "#FFA500", // Laranja para descrição
                      }}
                    >
                      {item.cartao}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "150px",
                        color: "#AAAAAA",
                      }}
                    >
                      Valor: {formatarSaldo(item.valor)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "100px",
                        color: "#AAAAAA",
                      }}
                    >
                      Pago: {dayjs(item.dataPagamento).format("DD/MM")}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "150px",
                        color: "#AAAAAA",
                      }}
                    >
                      Desc: {formatarSaldo(item.valorDesconto)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "150px",
                        color: "#AAAAAA",
                      }}
                    >
                      Juros: {formatarSaldo(item.valorJuros)}
                    </Typography>
                  </Box>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>



        {/* Lower Cards */}
      </Grid>
    </Box>
  );
};

export default HomePage;
