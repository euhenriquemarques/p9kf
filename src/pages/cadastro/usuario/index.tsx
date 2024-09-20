import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

const CadastroUsuario = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    dataNascimento: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form); // Aqui você pode integrar com a API ou o backend
  };

  return (
    <Box
      sx={{
        backgroundColor: '#e8f5e9', // Fundo suave verde
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          backgroundColor: '#f9f9f9', // Fundo do card
          borderRadius: '16px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          padding: '20px',
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', color: '#4caf50' }}>
            Cadastro de Usuário
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: '15px' }}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: '15px' }}
              required
            />
            <TextField
              label="Senha"
              name="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: '15px' }}
              required
            />
            <TextField
              label="Data de Nascimento"
              name="dataNascimento"
              type="date"
              value={form.dataNascimento}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: '15px' }}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#4caf50',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
              }}
            >
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CadastroUsuario;
