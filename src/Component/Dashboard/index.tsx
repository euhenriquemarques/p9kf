import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { iHomeDto } from "../../Interface/interface";
import axios from "axios";
import dayjs from "dayjs";

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<iHomeDto>({
    listaDespesas: [
      {
        parcela: 1,
        parcelaTotais: 1,
        dataVencimentoParcela: dayjs().format("DD/MM/YYYY"),
        valorParcela: 0,
        descricao: "",
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

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2} sx={{ width: "90%" }}>
        {/* Main Text Card */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "#4A4A5A",
              color: "#ffffff",
              borderRadius: "16px",
              height: "300px",
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
                    borderBottom: "1px solid #ffffff30", // Separador opcional
                  }}
                >
                  {/* Cada campo com tamanho fixo */}
                  <Typography
                    variant="body1"
                    sx={{
                      width: "130px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.banco}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    C: {item.numero}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {formatarSaldo(item.saldo)}
                  </Typography>
                </Box>
              ))}
            </div>
          </Paper>
        </Grid>

        {/* Right-Side Cards (Stacked on each other) */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Top Collaborate Card */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  padding: 3,
                  backgroundColor: "#E3E6F3",
                  borderRadius: "16px",
                  height: "150px",
                }}
              >
                <Typography variant="h4">Collaborate Everywhere.</Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#8DF35C",
                    color: "#000000",
                  }}
                >
                  Download
                </Button>
              </Paper>
            </Grid>

            {/* Team Cards */}
            <Grid item xs={6}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  height: "150px",
                }}
              >
                <Typography variant="h6">Léa Herrera</Typography>
                <Typography variant="subtitle2">UX Designer</Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: "#DCE3F3",
                  borderRadius: "16px",
                  height: "150px",
                }}
              >
                <Typography variant="h6">Oliver Haller</Typography>
                <Typography variant="subtitle2">Co-Founder</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Lower Cards */}
        <Grid item xs={6} md={3}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "#E8CEB3",
              borderRadius: "16px",
              height: "150px",
            }}
          >
            <Typography variant="h4">Join us if you want!</Typography>
            <Button
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: "#B35C3F",
                color: "#FFFFFF",
              }}
            >
              Join Now
            </Button>
          </Paper>
        </Grid>

        {/* Additional Cards */}
        <Grid item xs={6} md={3}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              height: "150px",
            }}
          >
            <Typography variant="h6">Social Media Managers</Typography>
            <Typography variant="body2">Expert Level</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
