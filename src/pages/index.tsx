import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Definição da interface para os benefícios (benefits)
interface Benefit {
    name: string;
    available: boolean;
  }
  
  // Definição da interface para as props do PlanCard
  interface PlanCardProps {
    title: string;
    price: string;
    benefits: Benefit[];
  }
  // Definição dos planos
  const plans = [
    {
      title: 'Controle',
      price: 'Free',
      benefits: [
        { name: 'Categorias Ilimitadas', available: true },
        { name: 'Compartilhado', available: true },
        { name: 'Investimentos', available: false },
        { name: 'Dashboards', available: false },
      ],
    },
    {
      title: 'Controle +',
      price: 'R$ 4,90',
      benefits: [
        { name: 'Categorias Ilimitadas', available: true },
        { name: 'Compartilhado', available: true },
        { name: 'Investimentos', available: true },
        { name: 'Dashboards', available: true },
      ],
    },
    {
      title: 'Controle View',
      price: 'R$ 9,90',
      benefits: [
        { name: 'Categorias Ilimitadas', available: true },
        { name: 'Compartilhado', available: true },
        { name: 'Investimentos', available: true },
        { name: 'Dashboards', available: true },
      ],
    },
  ];
  
  // Componente PlanCard, que exibe os cartões de planos
  const PlanCard: React.FC<PlanCardProps> = ({ title, price, benefits }) => (
    <Card
      sx={{
        maxWidth: 300,
        margin: '20px',
        textAlign: 'center',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#FFFFFF', // Fundo branco
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#5E2E91' }}> {/* Roxo */}
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#000' }}>
          {price}
        </Typography>
        <List>
          {benefits.map((benefit, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {benefit.available ? (
                  <CheckCircleIcon sx={{ color: '#5E2E91' }} /> // Roxo para check
                ) : (
                  <CancelIcon sx={{ color: '#9e9e9e' }} /> // Cinza para X
                )}
              </ListItemIcon>
              <ListItemText
                primary={benefit.name}
                sx={{
                  textDecoration: benefit.available ? 'none' : 'line-through',
                  color: benefit.available ? '#000' : '#9e9e9e',
                }}
              />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#5E2E91', // Roxo para botões
            color: '#fff',
            textTransform: 'uppercase',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#42196D', // Roxo mais escuro no hover
            },
          }}
        >
          Escolher Plano
        </Button>
      </CardContent>
    </Card>
  );
  
  // Componente principal da página
  const Home = () => (
    <Box sx={{ backgroundColor: '#6A0DAD', minHeight: '100vh', padding: '40px 20px' }}> {/* Fundo Roxo Vibrante */}
    <Typography
      variant="h2"
      sx={{
        fontFamily: 'Quicksand, sans-serif', // Fonte moderna
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFDD00', // Amarelo Vibrante para o logo
        mb: 3,
      }}
    >
      Winpy
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Quicksand, sans-serif',
        textAlign: 'center',
        color: '#FFFFFF', // Texto branco
        mb: 5,
      }}
    >
      Controle seus custos de forma eficiente!
    </Typography>
    <Grid container justifyContent="center" spacing={4}>
      {plans.map((plan, index) => (
        <Grid item key={index}>
          <PlanCard title={plan.title} price={plan.price} benefits={plan.benefits} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
  
  export default Home;
  