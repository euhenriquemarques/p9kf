import React from "react";
import "@fontsource/anton"; // Importa a fonte Anton
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Planos } from "../../../Interface/interface";
import { dataPlanos } from "./data";


const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const plans: Planos [] = dataPlanos;

  return (
    <>
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontFamily: "Anton",
            fontSize: isMobile ?"5rem" :"10rem"  ,
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          NestEgg
        </Typography>
        <Typography variant="h6" color="#ffffff">
          Seu Caderno Financeiro
        </Typography>
      </Box>

      <Grid
        container
        justifyContent="center"
        sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}
      >
        {plans.map((plan) => (
          <Grid item key={plan.id} xs={12} sm={6} md={4} padding={2} >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                boxShadow: plan.highlight
                  ? "0px 0px 20px rgba(0, 0, 0, 0.15)"
                  : "0px 4px 12px rgba(0, 0, 0, 0.1)",
                border: plan.highlight ? "2px solid #6c63ff" : "none",
                position: "relative",
              }}
            >
              {plan.highlight && (
                <Chip
                  label="Mais Procurado"
                  color="primary"
                  sx={{
                    marginTop: "4px",
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#6c63ff",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                />
              )}
              <CardContent sx={{ padding: "16px" }}>
                {/* Título e Preço */}
                <Typography
                  component="div"
                  gutterBottom
                  sx={{
                    fontFamily: "Anton",
                    fontSize: "1.8125rem",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {plan.title}
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  color="primary"
                  sx={{ textAlign: "center" }}
                >
                  {plan.price}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ textAlign: "center" }}
                >
                  {plan.description}
                </Typography>

                {/* Lista de Features */}
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  Inclui:
                </Typography>
                <List>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {feature.included ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.label}
                        primaryTypographyProps={{
                          sx: {
                            textDecoration: feature.included
                              ? "none"
                              : "line-through",
                            color: feature.included
                              ? "text.primary"
                              : "text.secondary",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ mt: "auto", padding: "24px" }}>
                <Button
                  variant={plan.highlight ? "contained" : "outlined"}
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: "24px",
                    backgroundColor: plan.highlight ? "#6c63ff" : "transparent",
                    color: plan.highlight ? "#fff" : "primary",
                    borderColor: "#6c63ff",
                    padding: "8px",
                  }}
                >
                  {plan.buttonLabel}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LandingPage;
