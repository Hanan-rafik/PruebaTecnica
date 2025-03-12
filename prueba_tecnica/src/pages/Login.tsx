import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('http://localhost:5174/api/login', data);
      login(response.data.token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register('email', { required: 'Email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email no válido' } })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            {...register('password', { required: 'Contraseña es requerida' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Iniciar Sesión
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;